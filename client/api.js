// ✅ Create Supabase client and export it properly
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_URL, 
  import.meta.env.VITE_ANON 
);

// ✅ Get currently logged-in user from auth
export const getLoggedInUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
  
  const user = data?.user;
  if (!user) return null;

  // ✅ Fetch user data from "users" table
  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching user details:", fetchError.message);
    return user; // Return basic auth user if table data is unavailable
  }

  return { ...user, ...userData };
};

// ✅ Change user email
export const changeUserEmail = async (newEmail) => {
  const { data, error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) {
    console.error("Error changing email:", error.message);
    return null;
  }
  return data;
};

// ✅ Get public user data from "users" table
export const getPublicUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
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

    // ✅ Insert or update "users" table
    const { data, error } = await supabase
      .from("users")
      .upsert([{ id: userId, display_name: displayName, points: 0 }], { onConflict: ["id"] });

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

    // ✅ Fetch user details from "users" table
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching user data:", fetchError.message);
      return { ...data.user, display_name: "", points: 0 };
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

// ✅ Upload user avatar to storage
export const uploadUserAvatar = async (userId, file) => {
  try {
    const filePath = `avatars/${userId}/${file.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    // ✅ Retrieve public URL
    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Avatar upload failed:", error.message);
    return null;
  }
};

// ✅ Get user avatar
export const getUserAvatar = async (userId) => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(`avatars/${userId}`);

    if (error) {
      console.error("Error fetching avatar:", error.message);
      return "https://via.placeholder.com/150";
    }

    if (data.length === 0) {
      return "https://via.placeholder.com/150";
    }

    return supabase.storage.from("avatars").getPublicUrl(`avatars/${userId}/${data[0].name}`).publicUrl;
  } catch (error) {
    console.error("Avatar fetch failed:", error.message);
    return "https://via.placeholder.com/150";
  }
};
