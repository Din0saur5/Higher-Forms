import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
  const token = sessionData?.session?.access_token;
  
  if (!token) {
    console.error("User authentication failed.");
    return { success: false, message: "User authentication failed. Please log in again." };
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

  // Ensure cart is properly formatted
  let validCart = [];
  if (Array.isArray(userData?.cart)) {
    validCart = userData.cart.map(item => ({
      productId: item.productId, 
      quantity: item.quantity ?? 1, 
    }));
  }

  return { ...user, ...userData, cart: validCart };
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

  let cart = Array.isArray(user?.cart) ? user.cart : [];

// Check if item already exists in cart
const existingItem = cart.find((item) => item.product_id === productVariantId);

if (existingItem) {
  // Increase quantity if item exists
  existingItem.quantity += 1;
} else {
  // Add new item with quantity = 1
  cart.push({ product_id: productVariantId, quantity: 1 });
}

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

  // Find the item in the cart
  const itemIndex = cart.findIndex(item => item.product_id === productVariantId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      // Decrease quantity instead of removing it
      cart[itemIndex].quantity -= 1;
    } else {
      // Remove item completely if quantity is 1
      cart.splice(itemIndex, 1);
    }
  }

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
  if (!Array.isArray(cart)) {
    console.error("⚠️ Cart is not an array:", cart);
    return [];
  }

  if (cart.length === 0) {
    console.error("⚠️ Cart is empty.");
    return [];
  }

  console.log("Fetching products for cart:", cart);

  const validCart = cart.filter(id => typeof id === "string" && id.length === 36);
  if (validCart.length === 0) {
    console.error("Cart contains invalid or empty product IDs.");
    return [];
  }

  try {
    const { data: products, error } = await supabase
      .from("product_variants")
      .select("id, product_id, size, stock, price, products(name, image_url)")
      .in("id", validCart);

    if (error) {
      console.error("Error fetching cart products:", error.message);
      return [];
    }

    console.log("Fetched Product Data:", products);

    return products.map((item) => ({
      ...item,
      price: item.price ?? 0,
      quantity: 1,
    }));
  } catch (error) {
    console.error("Unexpected error fetching cart products:", error);
    return [];
  }
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
export const placeOrder = async (userId, name, shippingInfo, cart, cartTotal) => {
  try {
    // Ensure `cart` is an array
    if (!Array.isArray(cart) || cart.some(item => !item.productId)) {
      console.error("⚠️ Cart is empty or invalid:", cart);
      return { success: false, message: "Cart is empty or invalid." };
    }

    console.log("Cart at Checkout:", cart);

    // Fetch authentication session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;

    if (!token) {
      console.error("⚠️ User authentication failed.");
      return { success: false, message: "User authentication failed. Please log in again." };
    }

    // Fetch product details from the cart
    const cartProducts = await fetchCartProds(cart);
    if (cartProducts.length === 0) {
      console.error("⚠️ Invalid cart data. No matching products found.");
      return { success: false, message: "Invalid cart data." };
    }

    console.log("Fetched Cart Products:", cartProducts);

    // Format product summary
    const productSummary = cartProducts.map((p) => ({
      name: p.products.name,
      quantity: cart.find(ci => ci.productId === p.id)?.quantity || 1, // Match correct quantity
      size: p.size,
      price: p.price,
    }));

    console.log("Product Summary:", productSummary);

    // Calculate total price accurately
    const totalPrice = cartProducts.reduce((sum, p) => {
      const cartItem = cart.find(ci => ci.productId === p.id);
      return sum + (p.price * (cartItem?.quantity || 1));
    }, 0);

    console.log("Total Price Calculated:", totalPrice);

    // Fetch user balance
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("form_coins_total")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError.message);
      return { success: false, message: "Failed to fetch user data." };
    }

    console.log("User Form Coins Balance:", user.form_coins_total);

    // Check if user has enough Form Coins
    if (user.form_coins_total < totalPrice) {
      return { success: false, message: "Insufficient Form Coins." };
    }

    // Format shipping info (makes `apt` optional)
    const formattedAddress = JSON.stringify({
      address: shippingInfo.address,
      apt: shippingInfo.apt?.trim() || null,  // If `apt` is empty, set to `null`
      city: shippingInfo.city,
      state: shippingInfo.state,
      zipcode: shippingInfo.zipcode,
      country: shippingInfo.country,
    });

    console.log("📦 Shipping Info:", formattedAddress);

    // ✅ Insert order into Supabase
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          name: name,
          address: formattedAddress,
          product_summary: JSON.stringify(productSummary),
          total_price: totalPrice,
          status: "pending",
        },
      ])
      .select()
      .single();

    console.log("🔍 Supabase Order Response:", order, orderError);

    if (orderError || !order) {
      console.error("⚠️ Order creation failed:", orderError?.message || "No order returned.");
      return { success: false, message: "Failed to create order." };
    }

    const orderId = order.id;
    console.log("Order Created! Order ID:", orderId);

    // Insert items into `order_items` table
    for (const item of cartProducts) {
      await supabase
        .from("order_items")
        .insert([
          {
            order_id: orderId,
            product_id: item.product_id,
            variant_size: item.size || "One Size",
            quantity: cart.find(ci => ci.productId === item.id)?.quantity || 1,
            price: item.price,
          },
        ]);

      // Update stock for the product variant
      await supabase
        .from("product_variants")
        .update({ stock: item.stock - (cart.find(ci => ci.productId === item.id)?.quantity || 1) })
        .eq("id", item.id);
    }

    console.log("Order Items Inserted & Stock Updated");

    // Deduct Form Coins and clear the cart
    const { error: balanceError } = await supabase
      .from("users")
      .update({ form_coins_total: user.form_coins_total - totalPrice, cart: [] })
      .eq("id", userId);

    if (balanceError) {
      console.error("Error updating user balance:", balanceError.message);
      return { success: false, message: "Failed to update user balance." };
    }

    console.log("Form Coins Deducted & Cart Cleared");

    return { success: true, message: "Order placed successfully!", orderId };
  } catch (error) {
    console.error("Unexpected error in placeOrder:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
};


// Fix missing LogOut function
export const LogOut = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("supabase.auth.token");
  sessionStorage.removeItem("supabase.auth.token");
  console.log("User logged out.");
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

  // Get Public URL
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

export const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file || !userData) return;

  setUploading(true);
  const newUrl = await uploadProfilePicture(userData.id, file);

  if (newUrl.success) {
    setAvatarUrl(newUrl.avatarUrl);
    setUserData({ ...userData, avatar_url: newUrl.avatarUrl }); 
  } else {
    alert("Error uploading profile picture. Please try again.");
  }

  setUploading(false);
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
    return { v1Cartridges: [], duoStrains: [] };
  }

  return {
    v1Cartridges: data.filter((strain) => strain.category === "v1"),
    duoStrains: data.filter((strain) => strain.category === "duos"),
  };
};

export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Fetch historical points for a user
export const getHistoricalPoints = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("historical_points")
      .select("points, date")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching historical points:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, data }; 
  } catch (error) {
    console.error("Unexpected error fetching historical points:", error);
    return { success: false, message: "Failed to fetch historical points." };
  }
};
