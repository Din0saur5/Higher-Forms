// create supabase client and run all fetches through here

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
    process.env.VITE_URL,
    process.env.VITE_ANON
  );

//get the auth user table data from currently logged in user:
export const getLoggedInUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log("Error fetching user:", error.message);
    } else {
      return data;
    }
  };
  
  //change user email
  export const changeUserEmail = async (newEmail) => {
    const { data, error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log("Error changing email:", error.message);
    } else {
      return data;
    }
  };

  export const getPublicUserById = async (id) => {
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
  
    if (error) {
      console.log("Error fetching row:", error.message);
    } else {
      return userData;
    }
  };


  //Patch
  export const PatchUser = async (
    id,newUserObject
  ) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...newUserObject, // Correctly spread the properties of newUserObject here
      })
      .eq("id", id)
      .select();
  
    if (error) {
      console.log("Error patching row:", error.message);
      return null; // Or handle the error as appropriate
    } else {
      return data;
    }
  };