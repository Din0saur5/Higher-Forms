import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { LogOut } from "../../api";

const Navbar = () => {
  const { userData, setUserData } = useUserContext();
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await LogOut();
    setUserData(null);
    setClick(false); // Ensure menu closes on logout
    navigate("/login");
  };

  const handleClick = () => setClick((prev) => !prev);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    document.body.style.overflow = click ? "hidden" : "auto";
  }, [click]);

  return (
    <>
      <nav className="navbar bg-base-100 px-4 py-3 fixed top-0 left-0 w-full z-50 shadow-md flex justify-between items-center">
        {/* Hamburger Menu (Left Side) */}
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

        {/* Logo (Centered on Mobile) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0">
          <NavLink to="/" className="flex items-center hover:opacity-80 transition duration-300">
            <img
              src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/HFlogo.png"
              alt="Higher Forms Logo"
              className="h-10 w-auto md:h-12"
            />
            <span className="text-lg md:text-xl font-bold font-roboto ml-2 hidden md:inline">
              Higher <br className="hidden lg:block" /> Forms
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation Links (Hidden on Mobile) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-roboto space-x-4">
            <li><NavLink to="/verify" className="hover:text-primary transition duration-300">Verify</NavLink></li>
            <li><NavLink to="/strains" className="hover:text-primary transition duration-300">Strains</NavLink></li>
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
            <li><NavLink to="/lab-results" className="hover:text-primary transition duration-300">Lab Results</NavLink></li>
            <li><NavLink to="/rewards" className="hover:text-primary transition duration-300">Rewards Shop</NavLink></li>
          </ul>
        </div>

        {/* Login/Profile Button (Right Side) */}
        <div className="navbar-end">
          {!userData ? (
            <NavLink to="/login" className="btn btn-primary px-4 py-2 rounded-md hover:bg-primary-focus transition duration-300">
              Login
            </NavLink>
          ) : (
            <NavLink to="/profile" className="btn btn-primary px-4 py-2 rounded-md hover:bg-primary-focus transition duration-300">
              Profile
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 transition-transform duration-300 ease-in-out ${
          click ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-50`}
      >
        <div className="bg-base-100 w-64 h-full shadow-lg p-4">
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
            <li><NavLink to="/lab-results" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Lab Results</NavLink></li>
            <li><NavLink to="/rewards" onClick={closeMobileMenu} className="hover:text-primary transition duration-300">Rewards Shop</NavLink></li>

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
      </div>

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
