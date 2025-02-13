import React from "react";
import { useUserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const RewardShop = () => {
  const { userData, formCoins, addToCart, removeFromCart, cart, modifyFormCoins, clearCart } = useUserContext();
  const navigate = useNavigate();

  // Mock product data (Prices in Form Coins)
  const products = [
    { id: 1, name: "Premium Strain Sample", price: 100, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Merch T-Shirt", price: 200, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Exclusive Access Pass", price: 500, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Gift Voucher", price: 300, image: "https://via.placeholder.com/150" },
  ];

  // Checkout handler
  const handleCheckout = async () => {
    const totalCost = cart.reduce((total, item) => total + item.price, 0);

    if (formCoins < totalCost) {
      alert("Not enough Form Coins to complete the checkout.");
      return;
    }

    // Deduct Form Coins and clear the cart
    await modifyFormCoins(-totalCost);
    await clearCart();

    // Navigate to Confirmation Page
    navigate("/confirmation");
  };

  return (
    <div className="reward-shop-container bg-black text-white font-roboto min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gold">Rewards Shop</h1>
        <p className="text-lg mt-4">
          {userData ? "Browse exclusive rewards!" : "Please log in or register to access the Rewards Shop."}
        </p>
        <hr className="mt-4 border-t border-gray-600 mx-auto w-3/4" />
      </div>

      {/* If user is not logged in, show login/register message and buttons */}
      {!userData ? (
        <div className="flex flex-col items-center text-center mt-10">
          <p className="text-xl font-semibold text-gray-300">
            Please log in or register to view and redeem rewards.
          </p>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary px-6 py-3 rounded-lg text-lg"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-secondary px-6 py-3 rounded-lg text-lg"
            >
              Register
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* User Form Coins Display */}
          <div className="text-center mb-8">
            <p className="text-xl font-semibold">
              Your Balance: <span className="text-gold">{formCoins} Form Coins</span>
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card bg-gray-800 p-4 rounded-lg shadow-lg">
                <img src={product.image} alt={product.name} className="rounded-lg mb-4 object-cover w-full h-40" />
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-sm text-gray-400 mb-4">Price: {product.price} Form Coins</p>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary w-full text-sm"
                  disabled={cart.some((item) => item.id === product.id) || formCoins < product.price}
                >
                  {cart.some((item) => item.id === product.id)
                    ? "In Cart"
                    : formCoins >= product.price
                    ? "Add to Cart"
                    : "Insufficient Coins"}
                </button>
              </div>
            ))}
          </div>

          {/* Cart Section */}
          <div className="mt-12 bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-400">Price: {item.price} Form Coins</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-secondary text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <p className="text-lg font-semibold mt-4">
                  Total: {cart.reduce((total, item) => total + item.price, 0)} Form Coins
                </p>

                <button
                  onClick={handleCheckout}
                  className={`btn btn-primary mt-6 w-full ${
                    cart.reduce((total, item) => total + item.price, 0) > formCoins
                      ? "bg-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={cart.reduce((total, item) => total + item.price, 0) > formCoins}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RewardShop;
