import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import ProfilePop from "./ProfilePop";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { getLoggedInUser, LogOut} from "../../api";

const Navbar = () => {
  const { userData, setUserData } = useUserContext();
  const [click, setClick] = useState(false);
  const menuRef = useRef(null);

 
  console.log(userData?.cart)
  const handleClick = () => setClick((prev) => !prev);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClick(false);
      }
    };

    if (click) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [click]);

const handleFetchUpdate = async ()=>{
    const user = await getLoggedInUser()
    setUserData(user)
    
  }

  


  return (
    <>
      <nav className="navbar bg-base-100 px-4 py-3 fixed top-0 left-0 w-full z-50 shadow-md flex justify-between items-center">
        {/* Left Side: Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={handleClick}
            className="btn btn-ghost btn-circle focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center pr-8">
          <NavLink to="/" className="flex items-center hover:opacity-80 transition  duration-300">
            <img
              src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_gold_stacked.svg"
              alt="Higher Forms Logo"
              className="h-12 w-auto"
            />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal font-roboto space-x-6">
            {[
              { name: "Verify", path: "/verify" },
              { name: "Strains", path: "/strains" },
              { name: "Lab Results", path: "/lab-results" },
              { name: "Rewards Shop", path: "/rewards" },
              
            ].map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className="text-gray-300 hover:text-white rounded transition duration-300">
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }} className="text-gray-300 hover:text-white rounded transition duration-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side: Profile/Login */}
        <div className="navbar-end flex items-center space-x-4">
          {userData && (
            <div className="indicator">
              <span className={`indicator-item badge rounded-xl badge-secondary ${userData?.cart?.length? (''):('hidden')}`}>{ userData?.cart?.length}</span>
            <NavLink to={"/cart"} className="text-sm font-bold btn rounded-full text-xl hover:shadow-inner hover:shadow-gray-500 text-gray-400"><HiOutlineShoppingCart /></NavLink>
              </div>
          )}

          {!userData ? (
            <NavLink to="/login" className="btn bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300">
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className=" avatar"
              >
                <div onClick={()=> handleFetchUpdate()} className="w-8 border border-white rounded-full">
                  <img src={userData.avatar_url}/>
                </div>    
              </div>
              <div className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow" tabIndex={0}>
                <ProfilePop />
                
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {click && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}></div>
      )}

      <div ref={menuRef} className={`fixed top-0 left-0 w-64 h-full bg-base-100 shadow-lg p-4 transition-transform duration-300 ease-in-out ${click ? "translate-x-0 z-50" : "-translate-x-full"} lg:hidden`}>
        {/* Close Button */}
        <button onClick={handleClick} className="absolute top-4 right-4 text-white focus:outline-none">
          ✕
        </button>

        {/* Mobile Navigation */}
        <ul className="menu menu-compact p-2 py-16">
          {[
            { name: "Verify", path: "/verify" },
            { name: "Strains", path: "/strains" },
            { name: "Lab Results", path: "/lab-results" },
            { name: "Rewards Shop", path: "/rewards" },
            
          ].map((item, index) => (
            <li key={index}>
              <NavLink to={item.path} onClick={closeMobileMenu} className="text-gray-300 text-xl hover:text-white transition duration-300 py-2 my-2">
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); closeMobileMenu(); }} className="text-xl py-2 my-2 text-gray-300 hover:text-white transition duration-300">
              Contact Us
            </a>
          </li>
          {!userData && (
            <li>
              <NavLink to="/login" onClick={closeMobileMenu} className="text-gray-300 hover:text-white transition duration-300">
                Login
              </NavLink>
            </li>
          ) }
        </ul>
      </div>
    </>
  );
};

export default Navbar;
