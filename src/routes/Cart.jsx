import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchCartProds } from "../../api";
import { FaCoins, FaTrash, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion"; 

const Cart = () => {
  const { userData, setUserData, formCoins, modifyFormCoins, clearCart, handleRemoveFromCart } = useUserContext();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [userData?.cart]);

  // Fetch cart details and calculate total price
  const fetchCart = async () => {
    setLoading(true);
    if (!userData || !Array.isArray(userData.cart) || userData.cart.length === 0) {
      setCartItems([]);
      setCartTotal(0);
      setLoading(false);
      return;
    }
  
    try {
      const cartData = await fetchCartProds(userData.cart);
      console.log("Fetched Cart Data:", cartData);
  
      if (!cartData || cartData.length === 0) {
        setCartItems([]);
        setCartTotal(0);
        setLoading(false);
        return;
      }
  
      // ✅ Fix: Ensure valid price & quantity values
      const total = cartData.reduce((sum, item) => {
        const itemPrice = item.price ?? 0; // Ensure price is a number
        const itemQuantity = item.quantity ?? 1; // Default to 1 if missing
        return sum + itemPrice * itemQuantity;
      }, 0);
  
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

  // Handle item removal
  const handleRemoveItem = async (variantId) => {
    if (!userData) return;
  
    // Optimistically update the UI first
    setCartItems((prev) => prev.filter((item) => item.id !== variantId));
    setUserData((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item !== variantId),
    }));
  
    // Call the API to remove from Supabase
    const response = await handleRemoveFromCart(userData.id, variantId);
  
    if (response.success) {
      // Only refetch the cart if API confirms deletion
      setUserData((prev) => ({ ...prev, cart: response.cart }));
    } else {
      console.error("Failed to remove item from cart:", response.message);
    }
  };
  

  return (
    <div className="container mt-24 min-h-screen mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Your Cart</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your cart is empty. <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/rewards")}>Go back to shop</span>.
        </p>
      ) : (
        <>
          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
              <FaShoppingCart /> Cart Summary
            </h2>

            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-semibold text-black">{item.products.name}</p>
                  <p className="text-gray-500">
                    Price: <span className="font-bold text-lg text-yellow-500">{item.price} Coins</span>
                  </p>
                  <p className="text-gray-600">
                    Quantity: <span className="font-bold text-lg">{item.quantity}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
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
  <span className={`${(formCoins || 0) - (cartTotal || 0) < 0 ? "text-red-600" : "text-green-600"} font-bold`}>
    {(formCoins || 0) - (cartTotal || 0)} Coins
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
              className="w-1/2 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
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
