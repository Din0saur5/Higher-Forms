import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Confirmation = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-24 min-h-screen mx-auto px-4 py-10 text-center flex flex-col items-center">
      {/* Success Icon Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-green-600 text-6xl"
      >
        <FaCheckCircle />
      </motion.div>

      <h1 className="text-4xl font-bold text-black mt-4">Thank You for Your Purchase!</h1>
      <p className="text-lg text-white-700 mt-2">Your order has been successfully processed.</p>

      <div className="mt-6 bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-lg">
        <p className="text-lg font-semibold text-black">
          Your rewards will be sent to your address as soon as possible!
        </p>
        <p className="text-gray-600 text-sm mt-2">
          If you have any issues, please contact our support team.
        </p>

        {/* Display the tracking number */}
        {order?.tracking_number && (
          <p className="text-lg font-semibold text-black mt-4">
            Tracking Number: {order.tracking_number}
          </p>
        )}
      </div>

      {/* Navigation Button */}
      <button
        onClick={() => navigate("/rewards")}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg transition shadow-md"
      >
        Return to Rewards Shop
      </button>
    </div>
  );
};

export default Confirmation;
