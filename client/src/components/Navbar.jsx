import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { LogOut } from "../../api";
import ProfilePop from "./ProfilePop";

const Navbar = () => {
  const { userData, setUserData } = useUserContext();
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await LogOut();
    setUserData(null);
    setClick(false); // Ensure menu closes on logout
    navigate("/login");
  };

  const handleClick = () => setClick((prev) => !prev);
  const closeMobileMenu = () => setClick(false);

  const scroll2Top = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Close menu when clicking outside of it
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

  return (
    <>
      <nav className="navbar bg-base-100 px-4 py-3 fixed top-0 left-0 w-full z-50 shadow-md flex justify-between items-center">
        
        {/* Left Side: Hamburger Menu for Mobile */}
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

        {/* Center: Logo - Always Visible on Large Screens */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center hover:opacity-80 transition duration-300">
            <img
              src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/HFlogo.png"
              alt="Higher Forms Logo"
              className="h-10 w-auto md:h-12"
            />
            <span className="text-lg md:text-xl font-bold font-roboto ml-2">
              Higher Forms
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-roboto space-x-4">
            <li><NavLink to="/verify" className="hover:text-primary transition duration-300">Verify</NavLink></li>
            <li><NavLink to="/strains" className="hover:text-primary transition duration-300">Strains</NavLink></li>
            <li><NavLink to="/lab-results" className="hover:text-primary transition duration-300">Lab Results</NavLink></li>
            <li><NavLink to="/rewards" className="hover:text-primary transition duration-300">Rewards Shop</NavLink></li>
            <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              
              }}
              className="hover:text-primary transition duration-300"
            >
              Contact Us
            </a>
          </li>
          </ul>
        </div>

        {/* & Login/Profile (Right Side) */}
        <div className="navbar-end flex items-center space-x-4">
          
          
          {!userData ? (
            <NavLink to="/login" className="btn btn-primary px-4 py-2 rounded-md hover:bg-primary-focus transition duration-300">
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-primary px-4 py-2 rounded-md hover:bg-primary-focus transition duration-300">
              Profile
            </div>
            <div className="dropdown-content menu bg-base-100 rounded-box z-[1]  p-2 shadow" tabIndex={0}>
            <ProfilePop/>
            </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu (Closes on Click Outside) */}
      {click && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-base-100 shadow-lg p-4 transition-transform duration-300 ease-in-out ${
          click ? "translate-x-0 z-50" : "-translate-x-full"
        } lg:hidden`}
        ref={menuRef}
      >
        {/* Close Button */}
        <button
          onClick={handleClick}
          className="absolute top-4 right-4 text-black focus:outline-none"
        >
          ✕
        </button>

        {/* Mobile Menu Items */}
        <ul className="menu menu-compact p-2">
          <li><NavLink to="/verify" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Verify</NavLink></li>
          <li><NavLink to="/strains" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Strains</NavLink></li>
          <li><NavLink to="/lab-results" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Lab Results</NavLink></li>
          <li><NavLink to="/rewards" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Rewards Shop</NavLink></li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                closeMobileMenu();
              }}
              className="hover:text-primary transition duration-300"
            >
              Contact Us
            </a>
          </li>
          {!userData ? (
            <li><NavLink to="/login" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Login</NavLink></li>
          ) : (
            <>
              <li><NavLink to="/profile" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Profile</NavLink></li>
              <li>
                <button onClick={handleLogout} className="hover:text-red-500 text-error transition duration-300">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
