
import { UserContext } from './UserContext';
import { Outlet, useLoaderData, useNavigate  } from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";
import { useEffect, useState } from 'react';

const AppLayout = () => { 
  const navigate = useNavigate();
  const data = useLoaderData();
  let user =null
if (data?.user){
    user = data.user
}
  const [userData, setUserData] = useState(user);


//this is acting as our session handling portal.

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <Navbar /> 
      <Outlet  />
      <Footer />
    </UserContext.Provider>
  
);
}
export default AppLayout;