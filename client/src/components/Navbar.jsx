import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import ProfilePop from "./ProfilePop";

const Navbar = () => {
  const { userData, setUserData, formCoins, handleLogout } = useUserContext();
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleClick = () => setClick((prev) => !prev);
  const closeMobileMenu = () => setClick(false);

  const scrollToBottom = (e) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

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

        <div className="flex items-center">
          <NavLink to="/" className="flex items-center hover:opacity-80 transition duration-300">
            <img
              src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_gold_stacked.svg"
              alt="Higher Forms Logo"
              className="h-12 w-auto"
            />
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-roboto space-x-6">
            {[
              { name: "Verify", path: "/verify" },
              { name: "Strains", path: "/strains" },
              { name: "Lab Results", path: "/lab-results" },
              { name: "Rewards Shop", path: "/rewards" },
              { name: "Cart", path: "/cart" }
            ].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={scrollToBottom}
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          {userData && (
            <span className="text-sm font-bold text-gray-400">💰 {formCoins} Coins</span>
          )}

          {!userData ? (
            <NavLink
              to="/login"
              className="btn bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300"
            >
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300"
              >
                Profile
              </div>
              <div className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow" tabIndex={0}>
                <ProfilePop />
                <button
                  onClick={handleLogout}
                  className="text-red-400 mt-2 text-sm hover:text-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
