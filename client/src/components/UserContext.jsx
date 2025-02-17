import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser, LogOut, updateFormCoins, addToCart, removeFromCart, fetchCartProds } from "../../api";
import { supabase } from "../../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [formCoins, setFormCoins] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await getLoggedInUser();
        if (user) {
          setUserData(user);
          setFormCoins(user.form_coins_total || 0);
          setCart(user.cart || []);
          updateCartTotal(user.cart || []);
        } else {
          setUserData(null);
          setCart([]);
          setCartTotal(0);
          setFormCoins(0);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Listen for Supabase Auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        fetchUser();
      } else if (event === "SIGNED_OUT") {
        setUserData(null);
        setCart([]);
        setCartTotal(0);
        setFormCoins(0);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Update cart total dynamically
  const updateCartTotal = async (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      setCartTotal(0);
      return;
    }

    const cartDetails = await fetchCartProds(cartItems);
    const total = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
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

  // ✅ Add item to cart
  const handleAddToCart = async (variantId) => {
    if (!userData) return;

    const newCart = [...cart, variantId];
    setCart(newCart);
    updateCartTotal(newCart);

    try {
      const response = await addToCart(userData.id, variantId);
      if (response.success) {
        setUserData((prev) => ({
          ...prev,
          cart: newCart,
        }));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from cart (Fix: Reference `removeFromCart` correctly)
  const handleRemoveFromCart = async (variantId) => {
    if (!userData) return;

    const newCart = cart.filter((item) => item !== variantId);
    setCart(newCart);
    updateCartTotal(newCart);

    try {
      const response = await removeFromCart(userData.id, variantId);
      if (response.success) {
        setUserData((prev) => ({
          ...prev,
          cart: newCart,
        }));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
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

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await LogOut();
      localStorage.removeItem("supabase.auth.token");
      sessionStorage.removeItem("supabase.auth.token");

      setUserData(null);
      setCart([]);
      setCartTotal(0);
      setFormCoins(0);
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
