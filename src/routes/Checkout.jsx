import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { supabase,fetchCartProds, placeOrder } from "../../api"; 
import { FaShoppingCart } from "react-icons/fa"; 
import { motion } from "framer-motion"; 
import SEO from "../components/SEO";

const Checkout = () => {
  const { userData, setUserData } = useUserContext();
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
    email: ""
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
    setCartItems(cartData)
    setCartTotal(total)
    setLoading(false)
  };

 
    
  
  const handleConfirmPurchase = async () => {  
    setCheckoutError(null);
    // Pass the full `shippingInfo` object to `placeOrder`
    const response = await placeOrder(
      userData.id,
      shippingInfo.email,
      shippingInfo.fullName,
      shippingInfo, 
      userData.cart,
      cartTotal,
      
    );
  
    if (!response.success) {
      setCheckoutError(response.message);
      return;
    }
  
    ;
   
  
    setUserData((prev) => ({
      ...prev,
      cart: [],
      form_coins_total: prev.form_coins_total - cartTotal,
    }));
  
    navigate("/confirmation");
  };

  return (
    <div className="container mt-24 min-h-screen mx-auto px-4 py-6">
      <SEO
        title="Checkout"
        description="Confirm your Higher Forms reward order and shipping details."
        path="/checkout"
      />
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
<div className="bg-white shadow-md rounded-lg p-6 mb-6">
  <h2 className="text-xl font-bold mb-4 text-black">Shipping Address</h2>

  <div className="mb-4">
    <input
      type="text"
      placeholder="Email"
      value={shippingInfo.email || ""}
      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
      className="w-full p-3 mb-4 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      required
    />
  <input
    type="text"
    placeholder="Full Name"
    value={shippingInfo.fullName || ""}
    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
    className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
    required
  />
</div>


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
                  <p className="font-semibold text-black">{item.productName} (x{item.quantity})</p>
                  <p className="text-black">{item.price * item.quantity} Form Coins</p>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <p className="text-lg font-bold text-black">
                Total: <span className="text-yellow-500">{cartTotal} Form Coins</span>
              </p>
              <p className="text-lg text-black">
                Available Balance: <span className="text-green-600 font-bold">{userData.form_coins_total} Form Coins</span>
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
              onClick={()=>handleConfirmPurchase()}
              className={`w-1/2 py-2 rounded-lg text-white font-bold ${
                cartTotal > userData.form_coins_total
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 transition"
              }`}
              disabled={cartTotal > userData.form_coins_total}
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
