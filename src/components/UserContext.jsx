import { createContext, useContext, useEffect, useState } from "react";
import { 
  getLoggedInUser,
  supabase
} from "../../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;
  
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await getLoggedInUser();
    
        if (!user) {
          console.warn("⚠️ No active user session. Resetting state.");
          resetUserState();
          return;
        }
    
        console.log("Raw Cart Data Before Processing:", user.cart);
    
        // Ensure cart is always an array
      
    
        // Ensure each cart item has an ID and quantity
      
    
        setUserData(user);
        
        console.log(user.cart)
      } catch (error) {
        console.error("Error fetching user:", error);
        resetUserState();
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        fetchUser();
      } else if (event === "SIGNED_OUT") {
        resetUserState();
      } else if (!session) {
        console.warn("No active session. Logging out.");
        resetUserState();
      }
    });
  
    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  
  // Helper function to reset user state
  const resetUserState = () => {
    setUserData(null);
   
  };

  // Update cart total dynamically
  
  
  // Modify Form Coins
  const modifyFormCoins = async (amount) => {
    if (!userData) return;

    const newBalance = Math.max(formCoins + amount, 0);
  

    try {
      await updateFormCoins(userData.id, newBalance);
      setUserData((prev) => ({
        ...prev,
        form_coins_total: newBalance,
      }));
    } catch (error) {
      console.error("Error updating form coins:", error);
    }
  };

  // Add item to cart
  const handleAddToCart = async (variantId) => {
    if (!userData) return;

    const newCart = [...cart, variantId].filter(id => typeof id === "string" && id.length === 36);


    try {
      const response = await addToCart(userData.id, variantId);
      if (response.success) {
        setUserData((prev) => ({
          ...prev,
          cart: newCart,
        }));
      } else {
        console.error("Error adding to cart:", response.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (userId, productVariantId) => {
    if (!userId || !productVariantId) {
      console.error("Invalid parameters for handleRemoveFromCart.");
      return { success: false, message: "Invalid parameters." };
    }
  
    try {
      // Fetch current cart from Supabase
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
      const updatedCart = cart.filter((id) => id !== productVariantId); 
  
      console.log("🛒 Cart before removal:", cart);
      console.log("Updated Cart after removal:", updatedCart);
  
      // Update local state first
      setUserData((prev) => ({
        ...prev,
        cart: updatedCart,
      }));
  
      // Also update Supabase to persist the change
      await supabase.from("users").update({ cart: updatedCart }).eq("id", userId);
  
      return { success: true, message: "Item removed from cart.", cart: updatedCart };
    } catch (error) {
      console.error("Unexpected error removing from cart:", error);
      return { success: false, message: "An error occurred while removing the item." };
    }
  };
  
  // Clear cart after checkout
  const clearCart = async () => {
    if (!userData) return;

    try {
      await supabase.from("users").update({ cart: [] }).eq("id", userData.id);
      setUserData((prev) => ({
        ...prev,
        cart: [],
      }));
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await LogOut();
      localStorage.removeItem("supabase.auth.token");
      sessionStorage.removeItem("supabase.auth.token");
      resetUserState();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        
      }}
    >
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-infinity loading-lg">Loading...</span>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
