import React, { useState, useEffect } from "react";
import { useUserContext } from "../components/UserContext";
import { supabase } from "../../api";
import { useNavigate } from "react-router-dom";
import { uploadProfilePicture } from "../../api";
const Profile = () => {
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
    await supabase.auth.signOut();
    setUserData(null);
    navigate("/login");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 mt-24 px-4 py-8">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-700">
        {/* Welcome Message (White Text) */}
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
            <span className="mt-2 text-sm text-primary hover:underline">Change Avatar</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
        </div>


        {/* User Info (Updated Format) */}
        <div className="mt-4 text-gray-300 text-left w-full px-4">
          <p className="text-lg"><strong>User:</strong> {userData?.display_name || "Guest"}</p>
          <p className="text-lg"><strong>Email:</strong> {userData?.email}</p>
        </div>
        
        
      {/* Reward Points */}
      <div className="mt-4 p-4 bg-gray-800 text-primary rounded-md w-full text-center border border-gray-700">
          <h3 className="text-lg text-gray-500 font-bold">Your Form Coins:</h3>
          <div className="flex flex-row items-end justify-center"> <p className="text-2xl text-white font-semibold">{userData?.form_coins_total || 0}</p> <img className="w-[5%] mb-1 ml-2" src="/assets/formCoin.png"/> </div>
        </div>
       {/* Rank */}
       <div className="mt-4 text-gray-300 text-left w-full px-4">
            <p className="text-lg"><strong>Rank:</strong> {userData?.Rank || "Unranked"}</p>
            </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
