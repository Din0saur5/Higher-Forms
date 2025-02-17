import React, { useEffect, useState } from "react";
import { useUserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchProducts, addToCart, fetchCartProds } from "../../api";
import { FaCoins, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const RewardShop = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    handleFetchProducts();
  }, []);

  useEffect(() => {
    updateCartTotal();
  }, [userData.cart]); 

  // Fetch products from Supabase
  const handleFetchProducts = async () => {
    const productsF = await fetchProducts();
    setProducts(productsF);
  };

  // Fetch cart items and update total
  const updateCartTotal = async () => {
    if (!userData || !userData.cart || userData.cart.length === 0) {
      setCartTotal(0);
      setCartError(null);
      return;
    }

    const cartItems = await fetchCartProds(userData.cart);

    if (!cartItems || cartItems.length === 0) {
      setCartTotal(0);
      setCartError(null);
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);

    if (total > userData.form_coins_total) {
      setCartError("Not enough Form Coins to redeem all items in your cart.");
    } else {
      setCartError(null);
    }
  };

  // Handle adding an item to the cart
  const handleAddToCart = async (productId, variantId) => {
    if (!userData) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const response = await addToCart(userData.id, variantId);
    if (response.success) {
      // Update the cart state instantly
      setUserData((prevUserData) => ({
        ...prevUserData,
        cart: [...prevUserData.cart, variantId],
      }));

      updateCartTotal(); 

      //Success message
      setSuccessMessage("Item added successfully to your cart!");
      setTimeout(() => setSuccessMessage(null), 2000);
    }
  };

  return (
    <div className="reward-shop-container bg-black text-white font-roboto min-h-screen mt-24 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gold">Rewards Shop</h1>
        <p className="text-lg mt-4">
          {userData ? "Browse exclusive rewards!" : "Please log in or register to access the Rewards Shop."}
        </p>
        <hr className="mt-4 border-t border-gray-600 mx-auto w-3/4" />
      </div>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          {successMessage}
        </motion.div>
      )}

      {/* If user is not logged in, show login/register message */}
      {!userData ? (
        <div className="flex flex-col items-center text-center mt-10">
          <p className="text-xl font-semibold text-gray-300">
            Please log in or register to view and redeem rewards.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary px-6 py-3 rounded-lg text-lg mt-6"
          >
            Log In
          </button>
        </div>
      ) : (
        <>
          {/* User Form Coins Display */}
          <div className="text-center mb-8 flex flex-col justify-center items-center gap-3 text-2xl font-semibold">
            <div className="flex items-center gap-3">
              <FaCoins className="text-yellow-400 text-3xl" />
              <span className="bg-gray-800 px-4 py-2 rounded-lg shadow-md text-yellow-300">
                Your Balance: <span className="font-bold">{userData.form_coins_total} Coins</span>
              </span>
            </div>

            {/* Cart Total Display */}
            <div className="bg-gray-700 px-6 py-3 rounded-lg shadow-md mt-3">
              <p className="text-lg font-semibold text-white">
                Cart Total: <span className="text-yellow-300">{cartTotal} Coins</span>
              </p>
            </div>

            {/* Error Message when Cart Exceeds Coins */}
            {cartError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md mt-3 flex items-center gap-2"
              >
                <FaExclamationTriangle />
                <span>{cartError}</span>
              </motion.div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const selectedVariant =
                product.product_variants.find((v) => v.id === selectedVariants[product.id]) ||
                product.product_variants[0];

              return (
                <div key={product.id} className="card bg-gray-800 p-4 rounded-lg shadow-lg">
                  <img src={product.image_url} alt={product.name} className="rounded-lg mb-4 object-cover w-full h-40" />
                  <h2 className="text-lg font-bold mb-2">{product.name}</h2>

                  {/* Price Display */}
                  <p className="text-lg font-bold text-yellow-400 mb-2">{selectedVariant.price} Coins</p>

                  {/* Size Selection Dropdown */}
                  {product.product_variants.length > 1 && (
                    <select
                      className="w-full mb-3 p-2 bg-gray-700 rounded text-white border border-gray-500"
                      value={selectedVariants[product.id] || product.product_variants[0].id}
                      onChange={(e) => setSelectedVariants({ ...selectedVariants, [product.id]: e.target.value })}
                    >
                      {product.product_variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.size} {variant.stock === 0 ? "(Out of Stock)" : ""}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product.id, selectedVariant.id)}
                    className={`btn w-full text-sm p-3 rounded-full transition-all ${
                      selectedVariant.stock === 0
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    disabled={
                      selectedVariant.stock === 0 || userData.form_coins_total < selectedVariant.price
                    }
                  >
                    {selectedVariant.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default RewardShop;
