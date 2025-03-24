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
    .select("id, display_name, avatar_url, form_coins_total, cart, rank, form_coins_historical_total")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching user details:", fetchError.message);
    return user;
  }

  // Ensure cart is properly formatted
  

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

  let cart = Array.isArray(user?.cart) ? user.cart : [];

  // Find and remove one occurrence of the item
  const itemIndex = cart.findIndex(item => item === productVariantId);

  if (itemIndex === -1) {
    console.warn("⚠️ Item not found in cart:", productVariantId);
    return { success: false, message: "Item not found in cart." };
  }

  // Remove one instance
  cart.splice(itemIndex, 1);
  console.log(`🗑️ Removed one instance of item ${productVariantId} from cart.`);

  // Update cart in Supabase
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
  if (!Array.isArray(cart) || cart.length === 0) {
    console.error("⚠️ Cart is empty or invalid:", cart);
    return [];
  }

  console.log("Fetching products for cart:", cart);

  // Step 1: Count quantities
  const quantityMap = cart.reduce((acc, productId) => {
    acc[productId] = (acc[productId] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Get unique product IDs
  const uniqueProductIds = Object.keys(quantityMap);

  try {
    // Step 3: Fetch product details from Supabase
    const { data: products, error } = await supabase
      .from("product_variants")
      .select("id, product_id, size, stock, price, products(name, image_url)")
      .in("id", uniqueProductIds);

    if (error) {
      console.error("Error fetching cart products:", error.message);
      return [];
    }

    console.log("Fetched Product Data:", products);

    // Step 4: Combine product details with quantities
    const finalCart = products.map((product) => ({
      id: product.id,
      product_id: product.product_id,
      size: product.size,
      stock: product.stock,
      price: product.price ?? 0,
      productName: product.products?.name || "Unknown",
      image_url: product.products?.image_url || "",
      quantity: quantityMap[product.id] || 1, // Add quantity from cart
    }));

    console.log("Final Cart with Product Details:", finalCart);

    return finalCart;
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
export const placeOrder = async (userId, email, name, shippingInfo, cart, cartTotal) => {
  try {
    // Ensure `cart` is an array
   
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

    // Format product summar

    

    console.log("Total Price Calculated:", cartTotal);

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
    if (user.form_coins_total < cartTotal) {
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
          email: email,
          name: name,
          address: formattedAddress,
          product_summary: cartProducts,
          total_price: cartTotal,
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
            product_id: item.id,
            variant_size: item.size || "One Size",
            quantity: item.quantity,
            price: item.price,
          },
        ]);

      // Update stock for the product variant
      await supabase
        .from("product_variants")
        .update({ stock: item.stock - item.quantity})
        .eq("id", item.id);
    }

    console.log("Order Items Inserted & Stock Updated");

    // Deduct Form Coins and clear the cart
    const { error: balanceError } = await supabase
      .from("users")
      .update({ form_coins_total: user.form_coins_total - cartTotal, cart: [] })
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
    .update({ 
      display_name: displayName, 
      form_coins_total: 100, 
      cart: [] 
    })
    .eq("id", userId);
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



export const AddCoins = async (product_id, userId) => {
  console.log('Working on adding coins...');

  // Step 1: Retrieve product points and check if it is already redeemed
  let { data: productData, error: productError } = await supabase
    .from('product_validations')
    .select('points, been_redeemed')
    .eq('product_id', product_id)
    .single();

  if (productError) {
    console.error("Error fetching product:", productError);
    return { error: "Product not found or database error." };
  }

  if (!productData || productData.been_redeemed) {
    console.error("Product already redeemed or does not exist.");
    return { error: "Product already redeemed or does not exist." };
  }

  const productPoints = productData.points;

  // Step 2: Mark product as redeemed
  const { error: updateProductError } = await supabase
    .from('product_validations')
    .update({ been_redeemed: true })
    .eq('product_id', product_id);

  if (updateProductError) {
    console.error("Error updating product as redeemed:", updateProductError);
    return { error: "Failed to mark product as redeemed." };
  }

  // Step 3: Update user coins
  const { data: userData, error: userUpdateError } = await supabase
    .from('users')
    .update({
      form_coins_total: supabase.raw(`form_coins_total + ${productPoints}`),
      form_coins_historical_total: supabase.raw(`form_coins_historical_total + ${productPoints}`)
    })
    .eq('id', userId)
    .select('form_coins_total, form_coins_historical_total')
    .single();

  if (userUpdateError) {
    console.error("Error updating user coins:", userUpdateError);
    return { error: "User update failed." };
  }

  console.log("Coins updated successfully:", userData);
  return { success: true, userData };
};

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




export const sendContactEmail = async ({ firstName, lastName, email, subject, message }) => {
  try {
    const response = await fetch("https://hf-mail-server-9l7f.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: "sales@higher-forms.com", // Replace with actual recipient email
        subject: `New contact - ${subject}`,
        html: `
          <h3>New Contact Request!</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
    });

    const data = await response.json();
    return data; // Returns Resend's response
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { error: "Failed to send email" };
  }
};
