import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-24 min-h-screen mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You for Your Purchase!</h1>
      <p className="text-gray-600">Your order has been successfully processed.</p>

      <div className="mt-6">
        <p className="text-lg font-semibold text-gray-700">Your rewards will be available in your account shortly.</p>
      </div>

      <button
        onClick={() => navigate("/rewards")}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
      >
        Return to Rewards Shop
      </button>
    </div>
  );
};

export default Confirmation;
