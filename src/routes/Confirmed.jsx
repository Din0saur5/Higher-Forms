import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import SEO from "../components/SEO";

export default function Confirmed() {
  return (
    <div className="mt-24 min-h-screen bg-black text-white px-6 py-16 flex items-center justify-center">
      <SEO
        title="Email Confirmed"
        description="Your Higher Forms account email has been confirmed. You can now sign in and access your profile."
        path="/confirmed"
        robots="noindex, nofollow"
      />
      <div className="w-full max-w-xl text-center bg-gray-950 border border-gray-800 rounded-2xl p-10 shadow-2xl">
        <motion.div
          className="text-green-500 text-6xl flex justify-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <FaCheckCircle />
        </motion.div>

        <h1 className="text-4xl font-bold mt-6">Email Confirmed</h1>
        <p className="text-gray-300 mt-4 text-lg">
          Your account is verified. Sign in to access your profile, rewards, and orders.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
          >
            Continue to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
