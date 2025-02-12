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
export async function uploadProfilePicture(userId, file, currentAvatarUrl) {
  // Define the new file path
  const filePath = `profile-pics/${userId}/${file.name}`;

  // If there's an existing profile picture, delete it
  if (currentAvatarUrl != 'https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/profile-pics/AvatarTemplate.png') {
      // Extract the file path from the URL (remove the base URL part)
      const urlParts = new URL(currentAvatarUrl);
      const pathToDelete = urlParts.pathname.replace('/storage/v1/object/public/profile-pics/', '');
      console.log(pathToDelete)
      const { error: deleteError } = await supabase.storage
          .from('profile-pics')
          .remove([pathToDelete]);

      if (deleteError) {
          console.error('Error deleting old profile picture:', deleteError);
      }
  }

  // Upload the new profile picture (overwriting if necessary)
  const { data, error: uploadError } = await supabase.storage
      .from('profile-pics')
      .upload(filePath, file, { upsert: true });

  if (uploadError) {
      console.error('Error uploading profile picture:', uploadError);
      return null;
  }

  // Get the public URL of the new profile picture
  const newAvatarUrl = supabase.storage.from('profile-pics').getPublicUrl(filePath).data.publicUrl;


console.log(newAvatarUrl)
  // Update the user's avatar_url in the users table
  const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: newAvatarUrl })
      .eq('id', userId);

  if (updateError) {
      console.error('Error updating avatar URL in database:', updateError);
      return null;
  }

  return newAvatarUrl;
}


