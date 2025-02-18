import React, { useState, useEffect } from "react";
import { useUserContext } from "../components/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, uploadProfilePicture } from "../../api";
import { motion } from "framer-motion";

export default function ProfilePop() {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(userData?.avatar_url || "https://via.placeholder.com/150");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const handleLogout = async () => {
    await LogOut();
    setUserData(null);
    navigate("/");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !userData) return;

    setUploading(true);
    const newUrl = await uploadProfilePicture(userData.id, file, avatarUrl);

    if (newUrl) {
      setAvatarUrl(newUrl);
      setUserData({ ...userData, avatar_url: newUrl });
    } else {
      alert("Error uploading profile picture. Please try again.");
    }

    setUploading(false);
  };

  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-700 font-roboto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold text-white">Welcome, {userData?.display_name || "Guest"}!</h1>
      <p className="text-gray-400 text-sm mt-1">
        Member since: {new Date(userData?.created_at).toLocaleDateString()}
      </p>

      {/* Profile Image Upload */}
      <div className="relative mt-6">
        <label className="cursor-pointer flex flex-col items-center">
          <motion.img
            src={avatarUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-600 object-cover hover:scale-105 transition-transform duration-300"
          />
          <span className="mt-2 text-sm text-yellow-400 hover:underline">Change Avatar</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
      </div>

      {/* User Info Section */}
      <div className="mt-6 text-left text-gray-300 space-y-2">
        <p className="text-lg"><strong>User:</strong> {userData?.display_name || "Guest"}</p>
        <p className="text-lg"><strong>Email:</strong> {userData?.email}</p>
      </div>

      {/* Reward Points Section */}
      <motion.div
        className="mt-6 p-4 bg-gray-800 text-yellow-400 rounded-md w-full text-center border border-gray-700"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-bold text-gray-400">Your Form Coins:</h3>
        <div className="flex items-center justify-center mt-1">
          <p className="text-2xl font-semibold">{userData?.form_coins_total || 0}</p>
          <img
            className="w-6 h-6 ml-2"
            src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/formcoin.svg"
            alt="Form Coin"
          />
        </div>
      </motion.div>

      {/* Rank Section */}
      <div className="mt-4 text-gray-300 text-left">
        <p className="text-lg"><strong>Rank #:</strong> {userData?.rank || "Unranked"}</p>
      </div>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition w-full font-bold text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </motion.button>
    </motion.div>
  );
}
