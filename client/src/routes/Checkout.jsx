import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchCartProds, placeOrder } from "../../api"; 
import { FaCoins, FaShoppingCart } from "react-icons/fa"; 
import { motion } from "framer-motion"; 

const Checkout = () => {
  const { userData, setUserData, formCoins, modifyFormCoins, clearCart } = useUserContext();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkoutError, setCheckoutError] = useState(null);

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
    if (!userData || !userData.cart || userData.cart.length === 0) {
      setCartItems([]);
      setCartTotal(0);
      setLoading(false);
      return;
    }

    const cartData = await fetchCartProds(userData.cart);
    if (cartData.length === 0) {
      setCartItems([]);
      setCartTotal(0);
      setLoading(false);
      return;
    }

    const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartItems(cartData);
    setCartTotal(total);
    setLoading(false);
  };

  // Handle order confirmation
  const handleConfirmPurchase = async () => {
    if (formCoins < cartTotal) {
      setCheckoutError("You do not have enough Form Coins to complete this purchase.");
      return;
    }

    setCheckoutError(null);

    const response = await placeOrder(
      userData.id,
      userData.email,
      userData.display_name,
      "Default Address",
      userData.cart
    );

    if (!response.success) {
      setCheckoutError(response.message);
      return;
    }

    // Deduct Form Coins and clear cart
    await modifyFormCoins(-cartTotal);
    await clearCart();

    setUserData((prev) => ({
      ...prev,
      cart: [],
      form_coins_total: prev.form_coins_total - cartTotal,
    }));

    // Navigate to confirmation page
    navigate("/confirmation");
  };

  return (
    <div className="container mt-24 min-h-screen mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Checkout</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your cart is empty.{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/rewardshop")}>
            Go back to shop
          </span>
          .
        </p>
      ) : (
        <>
          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black">
              <FaShoppingCart /> Order Summary
            </h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-semibold text-black">
                    {item.products.name} (x{item.quantity})
                  </p>
                  <p className="text-black">{item.price * item.quantity} Form Coins</p>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <p className="text-lg font-bold text-black">
                Total: <span className="text-yellow-500">{cartTotal} Form Coins</span>
              </p>
              <p className="text-lg text-black">
                Available Balance:{" "}
                <span className="text-green-600 font-bold">{formCoins} Form Coins</span>
              </p>
            </div>
          </div>

          {/* Error Message */}
          {checkoutError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md mt-3 flex items-center justify-center"
            >
              {checkoutError}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="w-1/2 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition"
            >
              Modify Cart
            </button>

            <button
              onClick={handleConfirmPurchase}
              className={`w-1/2 py-2 rounded-lg text-white font-bold ${
                cartTotal > formCoins
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 transition"
              }`}
              disabled={cartTotal > formCoins}
            >
              Confirm Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
