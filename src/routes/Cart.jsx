import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchCartProds, removeFromCart } from "../../api";
import { FaCoins, FaTrash, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const Cart = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
      return;
    }
  
    const fetchCart = async () => {
      setLoading(true);
      
  
      try {
        const cartData = await fetchCartProds(userData.cart);
        console.log("Fetched Cart Data:", cartData);
  
        if (!cartData || cartData.length === 0) {
          setCartItems([]);
          setCartTotal(0);
          setLoading(false);
          return;
        }
  
        
        

        const calculateCartTotal = (cart) => {
          if (!Array.isArray(cart) || cart.length === 0) {
            console.warn("Cart is empty or invalid.");
            return 0;
          }

          const total = cart.reduce((sum, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 1);
            return sum + itemTotal;
          }, 0);

          return total;
        };

        const total = await calculateCartTotal(cartData) 
        console.log(total)
        
  
        setCartItems(cartData);
        setCartTotal(total);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
        setCartTotal(0);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  }, [userData?.cart]);
  

  return (
    <div className="container mt-24 min-h-screen mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Your Cart</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your cart is empty.{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/rewards")}>
            Go back to shop
          </span>
        </p>
      ) : (
        <>
          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
              <FaShoppingCart /> Cart Summary
            </h2>

            {cartItems.map((item, index) => (
  <motion.div
    key={`${item.id}-${index}`} // ✅ Ensure unique key
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex justify-between items-center border-b py-3"
  >
    <div>
      <p className="font-semibold text-black">{item.productName}</p>
      <p className="text-gray-500">
        Price:{" "}
        <span className="font-bold text-lg text-yellow-500">
          {item.price} Coins
        </span>
      </p>
      <p className="text-gray-600">
        Quantity:{" "}
        <span className="font-bold text-lg">{item.quantity}</span>
      </p>
    </div>
    
    {/* ✅ Remove Item Button */}
    <button
     onClick={async () => {
      if (!userData) return;
    
      try {
        // ✅ Optimistically update UI (optional)
        setCartItems((prev) =>
          prev.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ).filter((cartItem) => cartItem.quantity > 0)
        );
    
        // ✅ Call backend to remove or decrease quantity
        const response = await removeFromCart(userData.id, item.id); 
    
        if (response.success) {
          console.log("✅ Successfully removed/updated item in cart.");
    
          // ✅ Update userData context with backend response
          setUserData((prev) => ({
            ...prev,
            cart: response.cart, // Use the updated cart from backend
          }));
        } else {
          console.error("❌ Failed to remove item:", response.message);
    
          // 🔄 Revert optimistic update if the backend fails
          setCartItems((prev) => [...prev]); // Reload cart or fetch again
        }
      } catch (error) {
        console.error("🔥 Unexpected error removing item:", error);
      }
    }}
    
      className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1"
    >
      <FaTrash /> Remove
    </button>
  </motion.div>
))}

            <div className="mt-6 text-center">
              <p className="text-2xl font-bold text-black">
                Total: <span className="text-yellow-500">{cartTotal} Coins</span>
              </p>
              <p className="text-lg text-black">
                Your balance after purchase:{" "}
                <span
                  className={`${
                    (userData.form_coins_total|| 0) - (cartTotal || 0) < 0
                      ? "text-red-600"
                      : "text-green-600"
                  } font-bold`}
                >
                  {(userData.form_coins_total|| 0) - (cartTotal || 0)} Coins
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/rewards")}
              className="w-1/2 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className={`w-1/2 py-2 ${userData.form_coins_total>cartTotal?  ('bg-green-600 hover:bg-green-700'):('btn-disabled bg-gray-500')}  text-white font-bold rounded-lg transition`}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
