import React, { useState, useEffect } from "react";
import { useUserContext } from "../components/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, uploadProfilePicture } from "../../api";

export default function ProfilePop() {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(userData?.avatar_url || "https://via.placeholder.com/150");
  const [uploading, setUploading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  
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
    <div className="bg-base-100 p-6 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-700">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold text-white">
        Welcome, {userData?.display_name || "Guest"}!
      </h1>
      <p className="text-sm text-gray-400">Member since: {new Date(userData?.created_at).toLocaleDateString()}</p>

      {/* Profile Image Upload */}
      <div className="relative mt-4">
        <label className="cursor-pointer flex flex-col items-center">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-600 object-cover"
          />
          <span className="mt-2 text-sm text-white hover:underline">Change Avatar</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
      </div>

      {/* User Info */}
      <div className="mt-4 text-gray-300 text-left w-full px-4">
        <p className="text-lg"><strong>User:</strong> {userData?.display_name || "Guest"}</p>
        <p className="text-lg"><strong>Email:</strong> {userData?.email}</p>
      </div>

      {/* Reward Points */}
      <div className="mt-4 p-4 bg-gray-800 text-primary rounded-md w-full text-center border border-gray-700">
        <h3 className="text-lg text-gray-400 font-bold">Your Form Coins:</h3>
        <div className="flex flex-row items-end justify-center">
          <p className="text-2xl text-white font-semibold">{userData?.form_coins_total || 0}</p>
          <img className="w-[10%] mb-1.5 ml-2" src='https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/formcoin.svg' alt="Form Coins"/>
        </div>
      </div>


      {/* Purchase History Section (Can Be Enabled Later) */}
      {/* {purchaseHistory.length > 0 ? (
        <div className="mt-6 w-full text-left">
          <h3 className="text-lg font-bold text-primary">Purchase & Rewards History</h3>
          <ul className="mt-2 space-y-2">
            {purchaseHistory.map((purchase, index) => (
              <li key={index} className="bg-gray-800 p-3 rounded-md shadow-sm text-sm border border-gray-700">
                <span className="font-medium text-primary">{purchase.item_name}</span> - {purchase.status}
                <br />
                <span className="text-gray-400 text-xs">
                  {new Date(purchase.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-2">No purchases or redeemed rewards yet.</p>
      )} */}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full"
      >
        Logout
      </button>
    </div>
  );
}
