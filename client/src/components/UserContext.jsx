import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser, LogOut } from "../../api"; // Ensure correct imports

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          setUserData(user);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle logout globally to prevent stale session issues
  const handleLogout = async () => {
    await LogOut();
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, handleLogout }}>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-infinity loading-lg">Loading...</span>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
