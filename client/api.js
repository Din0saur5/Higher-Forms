// create supabase client and run all fetches through here

import { createClient } from "@supabase/supabase-js";
import { validate, parse } from 'uuid'

const supabase = createClient(
  import.meta.env.VITE_URL, 
  import.meta.env.VITE_ANON 
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



  //SignUp
  export const SignUp = async (email, password, name) => {

    let { data:user, error:error1 } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if (error1) {
      console.log("Error adding to auth table row:", error1.message);
      return null; // Or handle the error as appropriate
    } else {
      console.log(user.user)
      
      
      

      const { data, error } = await supabase
          .from('users')
          .update({ display_name: name })
          .eq('id', user.user.id)
          .select()
          if (error) {
            console.log("Error adding to public table row:", error.message);
            return null; 
          }else {
              return data
            }
     }
    
   
  }

//Login
  export const LogIn = async (email, password) =>{
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      console.log("Error logging user in", error.message);
      return null; 
    }else {
      const { data:user, error:error1 } = await supabase
      .from('users')
      .eq('id', data.id)
      .select()
      if (error) {
        console.log("Error patching row:", error.message);
        return null; 
      }else {
          return data
        }
      }
  }