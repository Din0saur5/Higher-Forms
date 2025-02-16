import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_URL, 
  import.meta.env.VITE_ANON 
);

// ✅ Get currently logged-in user, including avatar URL, form coin balance, and cart
export const getLoggedInUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.error("Error fetching user or session missing:", error?.message || "No session found");
    return null;
  }

  const user = data.user;

  // ✅ Fetch user data (Updated: Removed 'email' and used 'form_coins_total')
  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("id, display_name, avatar_url, form_coins_total, cart")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching user details:", fetchError.message);
    return user; // Return basic auth user if table data is unavailable
  }

  return { ...user, ...userData };
};

// ✅ Get public user data from "users" table
export const getPublicUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, display_name, avatar_url, form_coins_total, cart")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
  return data;
};

// ✅ Update user data in "users" table
export const PatchUser = async (id, newUserObject) => {
  const { data, error } = await supabase
    .from("users")
    .update(newUserObject)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating user:", error.message);
    return null;
  }
  return data;
};

// ✅ Sign Up function (creates user in Auth and updates "users" table)
export const SignUp = async (email, password, displayName) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Signup error:", authError.message);
      throw new Error(authError.message);
    }

    const userId = authData.user?.id;
    if (!userId) throw new Error("User ID not found after signup.");

    // ✅ Insert or update "users" table with default form coins
    const { data, error } = await supabase
      .from("users")
      .upsert([{ id: userId, display_name: displayName, form_coins_total: 100 }], { onConflict: ["id"] });

    if (error) {
      console.error("Error saving display name:", error.message);
      throw new Error("Failed to save display name.");
    }

    return { ...authData.user, ...data };
  } catch (error) {
    console.error("Signup failed:", error.message);
    throw error;
  }
};

// ✅ Login function (authenticates user and fetches their data)
export const LogIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Login failed:", error.message);
      throw new Error("Invalid email or password.");
    }

    const userId = data.user?.id;
    if (!userId) throw new Error("User ID not found.");

    // ✅ Fetch user details (Updated: Removed 'email' and used 'form_coins_total')
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("id, display_name, avatar_url, form_coins_total, cart")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching user data:", fetchError.message);
      return { ...data.user, display_name: "", form_coins_total: 0 };
    }

    return { ...data.user, ...userData };
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

// ✅ Logout function
export const LogOut = async () => {
  await supabase.auth.signOut();
};

// ✅ Function to update Form Coin balance (Updated: 'form_coins' → 'form_coins_total')
export const updateFormCoins = async (userId, newBalance) => {
  const { data, error } = await supabase
    .from("users")
    .update({ form_coins_total: newBalance })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("Error updating form coins:", error.message);
    return null;
  }
  return data;
};

// ✅ Function to update user cart
export const updateCart = async (userId, cartItems) => {
  const { error } = await supabase
    .from("users")
    .update({ cart: cartItems })
    .eq("id", userId);

  if (error) {
    console.error("Error updating cart:", error.message);
    return null;
  }
  return cartItems;
};

// export const getCart = async (userId) => {
//   const {data, error} = await supabase
//   .from("users"
//     .
//   )
// }

// ✅ Upload user avatar to storage (Fixed URL retrieval)
export async function uploadProfilePicture(userId, file, currentAvatarUrl) {
  try {
    if (!file) {
      console.error("No file selected.");
      return null;
    }

    // ✅ Define new file path
    const filePath = `profile-pics/${userId}/${file.name}`;

    // ✅ Delete old profile picture if it exists
    if (currentAvatarUrl && !currentAvatarUrl.includes("AvatarTemplate.png")) {
      try {
        const urlParts = new URL(currentAvatarUrl);
        const pathToDelete = urlParts.pathname.split("/profile-pics/")[1];
        if (pathToDelete) {
          await supabase.storage.from("profile-pics").remove([pathToDelete]);
        }
      } catch (urlError) {
        console.warn("Error parsing URL for deletion:", urlError);
      }
    }

    // ✅ Upload new profile picture
    const { data, error: uploadError } = await supabase.storage
      .from("profile-pics")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Error uploading profile picture:", uploadError);
      return null;
    }

    // ✅ Get public URL correctly
    const { data: publicUrlData } = supabase.storage.from("profile-pics").getPublicUrl(filePath);
    if (!publicUrlData) {
      console.error("Error retrieving uploaded file URL.");
      return null;
    }

    const newAvatarUrl = publicUrlData.publicUrl;

    // ✅ Update avatar URL in database
    const { error: updateError } = await supabase
      .from("users")
      .update({ avatar_url: newAvatarUrl })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating avatar URL in database:", updateError);
      return null;
    }

    return newAvatarUrl;
  } catch (error) {
    console.error("Unexpected error uploading profile picture:", error);
    return null;
  }
}

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_variants(size, stock, price, id)");

  if (error) {
    console.error("Error fetching products with variants:", error.message);
    return [];
  }

  return data.map(product => ({
    ...product,
    product_variants: product.product_variants.length > 0 
      ? product.product_variants 
      : [{ size: "One Size", stock: 0, price: product.price }] // Default variant
  }));
};


export const addToCart = async (userId, productId) => {
  // Fetch the current cart
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

  // Check if product is already in cart
  if (!cart.includes(productId)) {
    cart.push(productId);
  }

  // Update the cart in the database
  const { error: updateError } = await supabase
    .from("users")
    .update({ cart })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating cart:", updateError.message);
    return { success: false, message: "Failed to update cart." };
  }

  return { success: true, message: "Added to cart.", cart };
};



export const removeFromCart = async (userId, productId) => {
  // Fetch the current cart
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

  // Remove the product from the cart
  cart = cart.filter((item) => item !== productId);

  // Update the cart in the database
  const { error: updateError } = await supabase
    .from("users")
    .update({ cart })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating cart:", updateError.message);
    return { success: false, message: "Failed to update cart." };
  }

  return { success: true, message: "Removed from cart.", cart };
};

export const fetchCartProds = async (cart) => {
  if (!cart || cart.length === 0) return [];

  // Count occurrences of each product ID in the cart
  const productCount = cart.reduce((acc, productId) => {
    acc[productId] = (acc[productId] || 0) + 1;
    return acc;
  }, {});

  // Fetch products that match the IDs in the cart
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("id", Object.keys(productCount));

  if (error) {
    console.error("Error fetching cart products:", error.message);
    return [];
  }

  // Add quantity field to each product
  return products.map((product) => ({
    ...product,
    quantity: productCount[product.id] || 1, // Default to 1 if missing
  }));
};

export const placeOrder = async (userId, email, name, address, cart) => {
  if (!cart || cart.length === 0) return { success: false, message: "Cart is empty." };

  // Fetch cart products with quantity
  const cartProducts = await fetchCartProds(cart);
  if (cartProducts.length === 0) return { success: false, message: "Invalid cart data." };

  // Generate product summary for the order
  const productSummary = cartProducts.map((p) => `${p.name} (x${p.quantity})`);
  const totalPrice = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  // Fetch user to check form_coin_total
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("form_coin_total")
    .eq("id", userId)
    .single();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return { success: false, message: "Failed to fetch user data." };
  }

  if (user.form_coin_total < totalPrice) {
    return { success: false, message: "Insufficient Form Coins." };
  }

  // Begin Transaction
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        email,
        name,
        address,
        product_summary: productSummary,
        total_price: totalPrice
      }
    ])
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError.message);
    return { success: false, message: "Failed to create order." };
  }

  const orderId = order.id;

  // Insert each cart item into order_items & reduce inventory
  for (const item of cartProducts) {
    await supabase
      .from("order_items")
      .insert([
        {
          order_id: orderId,
          product_id: item.id,
          variant_size: item.size || "One Size",
          quantity: item.quantity,
          price: item.price
        }
      ]);

    // Reduce stock in product_variants
    await supabase
      .from("product_variants")
      .update({ stock: item.stock - item.quantity })
      .eq("product_id", item.id)
      .eq("size", item.size || "One Size");
  }

  // Deduct Form Coins from user balance
  const { error: balanceError } = await supabase
    .from("users")
    .update({ form_coin_total: user.form_coin_total - totalPrice, cart: [] }) // Also clears cart
    .eq("id", userId);

  if (balanceError) {
    console.error("Error updating user balance:", balanceError.message);
    return { success: false, message: "Failed to update user balance." };
  }

  return { success: true, message: "Order placed successfully!", orderId };
};
