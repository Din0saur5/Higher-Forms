import { createContext, useContext, useEffect, useState } from "react";
import { 
  getLoggedInUser, 
  LogOut, 
  updateFormCoins, 
  addToCart, 
  removeFromCart, 
  fetchCartProds 
} from "../../api";
import { supabase } from "../../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [formCoins, setFormCoins] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

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
    
        // ✅ Ensure cart is valid, but only update if it's actually incorrect
        let validCart = Array.isArray(user.cart) 
          ? user.cart.filter(id => typeof id === "string" && id.length === 36) 
          : [];
    
        // 🛠️ Only update the cart if the old cart had **invalid entries**
        if (validCart.length === 0 && user.cart.length > 0) { 
          console.warn("⚠️ Cart contains only invalid items. Resetting.");
          await supabase.from("users").update({ cart: [] }).eq("id", user.id);
        }
        
    
          // ✅ Refresh the user data after fixing the cart
          const updatedUser = await getLoggedInUser();
          setUserData(updatedUser);
          validCart = updatedUser.cart;
        
        // ✅ Set states correctly
        setUserData(user);
        setFormCoins(user.form_coins_total || 0);
        setCart(validCart);
        updateCartTotal(validCart);
    
      } catch (error) {
        console.error("❌ Error fetching user:", error);
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
    setCart([]);
    setCartTotal(0);
    setFormCoins(0);
  };

  // Update cart total dynamically
  const updateCartTotal = async (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      setCartTotal(0);
      return;
    }
    console.log("🚀 Checking cart before fetching products:", cartItems); // 🛠️ Debugging step
  
    try {
      const cartDetails = await fetchCartProds(cartItems);
      console.log("🛒 Fetched Cart Details:", cartDetails); // 🛠️ Debugging step
  
      const total = cartDetails.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      setCartTotal(total);
    } catch (error) {
      console.error("🔥 Error updating cart total:", error);
    }
  };
  
  // Modify Form Coins
  const modifyFormCoins = async (amount) => {
    if (!userData) return;

    const newBalance = Math.max(formCoins + amount, 0);
    setFormCoins(newBalance);

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
    setCart(newCart);
    updateCartTotal(newCart);

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

    setCart([]);
    setCartTotal(0);

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
        loading,
        handleLogout,
        formCoins,
        modifyFormCoins,
        cart,
        cartTotal,
        handleAddToCart, 
        handleRemoveFromCart, 
        clearCart,
        updateCartTotal,
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
