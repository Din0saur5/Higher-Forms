import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";

const Checkout = () => {
  const { cart, removeFromCart, formCoins, modifyFormCoins, clearCart } = useUserContext();
  const navigate = useNavigate();

  // Calculate total cost
  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

  // Handle order confirmation
  const handleConfirmPurchase = async () => {
    if (formCoins < totalCost) {
      alert("Insufficient Form Coins for this purchase.");
      return;
    }

    // Deduct form coins and clear the cart
    await modifyFormCoins(-totalCost);
    await clearCart();

    // Navigate to confirmation page
    navigate("/confirmation");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/cart")}>Go back to cart</span>.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">{item.price} Form Coins</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold">Total: {totalCost} Form Coins</p>
            <p className="text-sm text-gray-500">Available Balance: {formCoins} Form Coins</p>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="w-1/2 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition"
            >
              Modify Cart
            </button>

            <button
              onClick={handleConfirmPurchase}
              className={`w-1/2 py-2 rounded-lg text-white font-bold ${
                totalCost > formCoins
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 transition"
              }`}
              disabled={totalCost > formCoins}
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
