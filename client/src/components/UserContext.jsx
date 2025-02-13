import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser, LogOut, updateFormCoins, updateCart } from "../../api"; // Ensure correct imports

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [formCoins, setFormCoins] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          setUserData(user);
          setFormCoins(user.form_coins || 0);
          setCart(user.cart || []);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Update Form Coins
  const modifyFormCoins = async (amount) => {
    if (!userData) return;
    
    const newBalance = Math.max(formCoins + amount, 0); // Prevents negative balance
    setFormCoins(newBalance);

    try {
      await updateFormCoins(userData.id, newBalance);
      setUserData((prev) => ({ ...prev, form_coins: newBalance }));
    } catch (error) {
      console.error("Error updating form coins:", error);
    }
  };

  // ✅ Add item to cart
  const addToCart = async (item) => {
    if (!userData) return;

    const newCart = [...cart, item];
    setCart(newCart);

    try {
      await updateCart(userData.id, newCart);
      setUserData((prev) => ({ ...prev, cart: newCart }));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!userData) return;

    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);

    try {
      await updateCart(userData.id, newCart);
      setUserData((prev) => ({ ...prev, cart: newCart }));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // ✅ Empty cart after checkout
  const clearCart = async () => {
    if (!userData) return;

    setCart([]);

    try {
      await updateCart(userData.id, []);
      setUserData((prev) => ({ ...prev, cart: [] }));
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // ✅ Handle logout globally
  const handleLogout = async () => {
    await LogOut();
    setUserData(null);
    setCart([]);
    setFormCoins(0);
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
        addToCart,
        removeFromCart,
        clearCart
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
