import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchCartProds, placeOrder } from "../../api"; 
import { FaShoppingCart } from "react-icons/fa"; 
import { motion } from "framer-motion"; 

const Checkout = () => {
  const { userData, setUserData, formCoins, modifyFormCoins, clearCart } = useUserContext();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkoutError, setCheckoutError] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    apt: "",
    city: "",
    state: "",
    zipcode: "",
    country: "United States",
  });

  useEffect(() => {
    if (!userData) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [userData?.cart]);

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

  const handleConfirmPurchase = async () => {
    if (formCoins < cartTotal) {
      setCheckoutError("You do not have enough Form Coins to complete this purchase.");
      return;
    }
  
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipcode) {
      setCheckoutError("Please fill in all required shipping details.");
      return;
    }
  
    setCheckoutError(null);
  
    const batchId = "your-generated-batch-id";  // Generate or fetch your batch ID
    const batchDate = new Date().toISOString();  // Use the current date for batch date
  
    const response = await placeOrder(
      userData.id,
      userData.email,
      shippingInfo.fullName,
      `${shippingInfo.address}, ${shippingInfo.apt ? shippingInfo.apt + ", " : ""}${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipcode}, ${shippingInfo.country}`,
      userData.cart,
      batchId,  // Add batchId
      batchDate  // Add batchDate
    );
  
    if (!response.success) {
      setCheckoutError(response.message);
      return;
    }
  
    await modifyFormCoins(-cartTotal);
    await clearCart();
  
    setUserData((prev) => ({
      ...prev,
      cart: [],
      form_coins_total: prev.form_coins_total - cartTotal,
    }));
  
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
          {/* Shipping Address Form */}
          {/* Shipping Address Form */}
<div className="bg-white shadow-md rounded-lg p-6 mb-6">
  <h2 className="text-xl font-bold mb-4 text-black">Shipping Address</h2>

  {/* Full Name Field */}
  <input
    type="text"
    placeholder="Full Name"
    value={shippingInfo.fullName}
    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
    className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
    required
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Address"
      value={shippingInfo.address}
      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
      className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      required
    />
    <input
      type="text"
      placeholder="Apt / Unit / Suite (optional)"
      value={shippingInfo.apt}
      onChange={(e) => setShippingInfo({ ...shippingInfo, apt: e.target.value })}
      className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="text"
      placeholder="City"
      value={shippingInfo.city}
      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
      className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      required
    />
    <input
      type="text"
      placeholder="State"
      value={shippingInfo.state}
      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
      className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      required
    />
    <input
      type="text"
      placeholder="Zipcode"
      value={shippingInfo.zipcode}
      onChange={(e) => setShippingInfo({ ...shippingInfo, zipcode: e.target.value })}
      className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      required
    />
    <input
      type="text"
      value="United States"
      disabled
      className="w-full p-3 bg-gray-200 text-gray-600 rounded-lg border border-gray-300 cursor-not-allowed"
    />
  </div>
</div>


          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black">
              <FaShoppingCart /> Order Summary
            </h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-semibold text-black">{item.products.name} (x{item.quantity})</p>
                  <p className="text-black">{item.price * item.quantity} Form Coins</p>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <p className="text-lg font-bold text-black">
                Total: <span className="text-yellow-500">{cartTotal} Form Coins</span>
              </p>
              <p className="text-lg text-black">
                Available Balance: <span className="text-green-600 font-bold">{formCoins} Form Coins</span>
              </p>
            </div>
          </div>

          {/* Error Message */}
          {checkoutError && (
            <motion.div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md mt-3 flex items-center justify-center">
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
