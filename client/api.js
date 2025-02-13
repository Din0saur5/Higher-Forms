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
    .select("id, display_name, avatar_url, form_coins_total")
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
    .select("id, display_name, avatar_url")
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
      .select("id, display_name, avatar_url, form_coins_total")
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
