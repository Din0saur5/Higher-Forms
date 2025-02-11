import React, { useState, useEffect } from "react";
import { useUserContext } from "../components/UserContext";
import { supabase } from "../../api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(userData?.avatar_url || "https://via.placeholder.com/150");
  const [uploading, setUploading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      fetchPurchaseHistory();
    }
  }, [userData, navigate]);

  const fetchPurchaseHistory = async () => {
    if (!userData?.id) return;
    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", userData.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching purchase history:", error.message);
    } else {
      setPurchaseHistory(data || []);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
    navigate("/login");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const filePath = `avatars/${userData.id}/${file.name}`;

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
    } else {
      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      if (data.publicUrl) {
        setAvatarUrl(data.publicUrl);
        await supabase
          .from("users")
          .update({ avatar_url: data.publicUrl })
          .eq("id", userData.id);

        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar_url: data.publicUrl,
        }));
      }
    }
    setUploading(false);
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 py-8">
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
          <h3 className="text-lg font-bold">Reward Points</h3>
          <p className="text-2xl font-semibold">{userData?.points || 0}</p>
        </div>

        {/* Purchase History Section */}
        <div className="mt-6 w-full text-left">
          <h3 className="text-lg font-bold text-primary">Purchase & Rewards History</h3>
          {purchaseHistory.length > 0 ? (
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
          ) : (
            <p className="text-gray-500 text-sm mt-2">No purchases or redeemed rewards yet.</p>
          )}
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
