import { UserProvider } from "./UserContext"; // ✅ Correct import
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const AppLayout = () => { 
  const navigate = useNavigate();
  const data = useLoaderData();
  let user = null;

  if (data?.user) {
    user = data.user;
  }

  const [userData, setUserData] = useState(user);

  return (
    <UserProvider> {/* ✅ Wrap the entire layout in UserProvider */}
      <Navbar />
      <Outlet />
      <Footer />
    </UserProvider>
  );
};

export default AppLayout;
