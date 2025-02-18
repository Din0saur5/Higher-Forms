import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_ANON;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Supabase environment variables are missing.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// User Login Function
export const LogIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Login failed:", error.message);
      return { success: false, message: "Invalid email or password." };
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Unexpected login error:", error);
    return { success: false, message: "Login error. Please try again." };
  }
};

// Get logged-in user, including Form Coins and Cart
export const getLoggedInUser = async () => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData.session) {
    console.error("Error fetching session:", sessionError?.message || "No active session found.");
    return null;
  }

  const user = sessionData.session.user;
  if (!user) {
    console.error("User session missing.");
    return null;
  }

  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("id, display_name, avatar_url, form_coins_total, cart, rank")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching user details:", fetchError.message);
    return user;
  }

  return { ...user, ...userData };
};

// Fetch all products with their variants
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, category, image_url, product_variants(id, size, stock, price)");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data;
};

// Add item to cart using `product_variants.id`
export const addToCart = async (userId, productVariantId) => {
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("cart")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching cart:", fetchError.message);
    return { success: false, message: "Failed to fetch cart." };
  }

  let cart = user?.cart || [];

  cart.push(productVariantId);

  const { error: updateError } = await supabase
    .from("users")
    .update({ cart })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating cart:", updateError.message);
    return { success: false, message: "Failed to update cart." };
  }

  return { success: true, message: "Item added to cart!", cart };
};

// Remove item from cart
export const removeFromCart = async (userId, productVariantId) => {
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("cart")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching cart:", fetchError.message);
    return { success: false, message: "Failed to fetch cart." };
  }

  let cart = user?.cart || [];
  cart = cart.filter((item) => item !== productVariantId);

  const { error: updateError } = await supabase
    .from("users")
    .update({ cart })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating cart:", updateError.message);
    return { success: false, message: "Failed to update cart." };
  }

  return { success: true, message: "Item removed from cart.", cart };
};

// Fetch full product details of cart items
export const fetchCartProds = async (cart) => {
  if (!cart || cart.length === 0) return [];

  const productCount = cart.reduce((acc, variantId) => {
    acc[variantId] = (acc[variantId] || 0) + 1;
    return acc;
  }, {});

  const { data: products, error } = await supabase
    .from("product_variants")
    .select("id, product_id, size, stock, price, products(name, image_url)")
    .in("id", Object.keys(productCount));

  if (error) {
    console.error("Error fetching cart products:", error.message);
    return [];
  }

  return products.map((product) => ({
    ...product,
    quantity: productCount[product.id] || 1,
  }));
};
// Update user's Form Coins balance
export const updateFormCoins = async (userId, newBalance) => {
  const { error } = await supabase
    .from("users")
    .update({ form_coins_total: newBalance })
    .eq("id", userId);

  if (error) {
    console.error("Error updating Form Coins:", error.message);
    return { success: false, message: "Failed to update Form Coins." };
  }

  return { success: true, message: "Form Coins updated successfully!" };
};

// Place order and deduct Form Coins
export const placeOrder = async (userId, email, name, address, cart) => {
  if (!cart || cart.length === 0) return { success: false, message: "Cart is empty." };

  const cartProducts = await fetchCartProds(cart);
  if (cartProducts.length === 0) return { success: false, message: "Invalid cart data." };

  const productSummary = cartProducts.map((p) => ({
    name: p.products.name,
    quantity: p.quantity,
    size: p.size,
    price: p.price,
  }));

  const totalPrice = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  // Fetch user Form Coins
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("form_coins_total")
    .eq("id", userId)
    .single();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return { success: false, message: "Failed to fetch user data." };
  }

  if (user.form_coins_total < totalPrice) {
    return { success: false, message: "Insufficient Form Coins." };
  }

  // Insert order into Supabase
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        email,
        name,
        address: JSON.stringify(address),  // Store as JSON object
        product_summary: JSON.stringify(productSummary), // Store summary as JSON
        total_price: totalPrice,
        status: "pending", // Default status
      },
    ])
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError.message);
    return { success: false, message: "Failed to create order." };
  }

  const orderId = order.id;

  // Insert items into order_items table
  for (const item of cartProducts) {
    await supabase
      .from("order_items")
      .insert([
        {
          order_id: orderId,
          product_id: item.product_id,
          variant_size: item.size || "One Size",
          quantity: item.quantity,
          price: item.price,
        },
      ]);

    // Update stock for the product variant
    await supabase
      .from("product_variants")
      .update({ stock: item.stock - item.quantity })
      .eq("id", item.id);
  }

  // Deduct Form Coins and clear the cart
  const { error: balanceError } = await supabase
    .from("users")
    .update({ form_coins_total: user.form_coins_total - totalPrice, cart: [] })
    .eq("id", userId);

  if (balanceError) {
    console.error("Error updating user balance:", balanceError.message);
    return { success: false, message: "Failed to update user balance." };
  }

  return { success: true, message: "Order placed successfully!", orderId };
};

// Fix missing LogOut function
export const LogOut = async () => {
  try {
    await supabase.auth.signOut();

    localStorage.removeItem("supabase.auth.token");
    sessionStorage.removeItem("supabase.auth.token");

    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

// Upload Profile Picture to Supabase Storage
export const uploadProfilePicture = async (userId, file) => {
  if (!userId || !file) {
    console.error("Invalid user ID or file.");
    return { success: false, message: "Invalid user ID or file." };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from("profile-pics")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (error) {
    console.error("Error uploading profile picture:", error.message);
    return { success: false, message: "Failed to upload profile picture." };
  }

  // ✅ Get Public URL
  const { data } = supabase.storage.from("profile-pics").getPublicUrl(filePath);

  // Update User Profile in Database
  const { error: updateError } = await supabase
    .from("users")
    .update({ avatar_url: data.publicUrl })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating user avatar URL:", updateError.message);
    return { success: false, message: "Failed to update avatar." };
  }

  return { success: true, message: "Profile picture uploaded successfully!", avatarUrl: data.publicUrl };
};

// User Sign Up Function
export const SignUp = async (email, password, displayName) => {
  try {
    // Create new user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Signup error:", authError.message);
      return { success: false, message: authError.message };
    }

    const userId = authData.user?.id;
    if (!userId) return { success: false, message: "User ID not found after signup." };

    // Insert new user into "users" table
    const { error: dbError } = await supabase
      .from("users")
      .insert([{ id: userId, display_name: displayName, form_coins_total: 100, cart: [] }]);

    if (dbError) {
      console.error("Error saving user details:", dbError.message);
      return { success: false, message: "Failed to save user details." };
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error("Signup failed:", error);
    return { success: false, message: "Signup error. Please try again." };
  }
};

// Update user data in "users" table
export const PatchUser = async (id, newUserObject) => {
  const { data, error } = await supabase
    .from("users")
    .update(newUserObject)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating user:", error.message);
    return { success: false, message: "Failed to update user." };
  }

  return { success: true, message: "User updated successfully!", data };
};



export const AddCoins = async (product_id, userId) =>{
  console.log('workind')
  const { data, error } = await supabase
  .rpc('redeem_product', { 
    input_product_id: product_id, 
    input_user_id: userId 
  });

if (error) {
  console.error("Error redeeming product:", error);
} else {
  console.log("Updated form_coins_total:", data);
  return data
}

}

export const fetchStrains = async () => { 
  const { data, error } = await supabase
    .from("strains")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching strains:", error);
    return { v1Cartridges: [], duoStrains: [] }; // Return empty arrays if error
  }

  return {
    v1Cartridges: data.filter((strain) => strain.category === "v1"),
    duoStrains: data.filter((strain) => strain.category === "duos"),
  };
};
