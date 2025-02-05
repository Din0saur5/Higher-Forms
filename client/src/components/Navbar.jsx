import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../components/UserContext";

const Navbar = ({ user }) => {
  const [click, setClick] = useState(false);
  const { userData } = useUserContext();

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  // Fix for Safari touch events
  useEffect(() => {
    document.body.style.overflow = click ? "hidden" : "auto";
  }, [click]);

  return (
    <>
      <nav className="navbar bg-base-100 px-6 py-3 fixed top-0 left-0 w-full z-50 shadow-md">
        {/* Navbar Start - Logo */}
        <div className="navbar-start flex items-center space-x-2">
          <a href="/" className="flex items-center hover:opacity-80 transition duration-300">
            <img src="/HFlogo.png" alt="Higher Forms Logo" className="h-12 w-auto" />
            <span className="text-xl font-bold font-roboto ml-2">
              Higher <br /> Forms
            </span>
          </a>
        </div>

        {/* Navbar Center - Navigation Links (Desktop) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal font-roboto px-4 space-x-6">
            <li>
              <NavLink to="/verify" className="hover:text-primary transition duration-300">
                Verify
              </NavLink>
            </li>
            <li>
              <NavLink to="/strains" className="hover:text-primary transition duration-300">
                Strains
              </NavLink>
            </li>
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
            <li>
              <NavLink to="/lab-results" className="hover:text-primary transition duration-300">
                Lab Results
              </NavLink>
            </li>
            <li>
              <NavLink to="/rewards" className="hover:text-primary transition duration-300">
                Rewards Shop
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Dropdown (Safari Fixes Applied) */}
        <div className="navbar-end md:hidden">
          <div className="relative">
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

            {/* Mobile Menu */}
            <div
              className={`absolute right-0 mt-3 w-48 bg-base-100 rounded-lg shadow-lg transform ${
                click ? "translate-y-0 opacity-100" : "translate-y-[-10px] opacity-0"
              } transition-all duration-300 ease-in-out pointer-events-auto`}
              style={{ zIndex: 1000 }}
            >
              {click && (
                <ul className="menu menu-compact p-2" onClick={closeMobileMenu}>
                  <li>
                    <NavLink to="/verify" className="hover:text-primary transition duration-300">
                      Verify
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/strains" className="hover:text-primary transition duration-300">
                      Strains
                    </NavLink>
                  </li>
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
                  <li>
                    <NavLink to="/lab-results" className="hover:text-primary transition duration-300">
                      Lab Results
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/rewards" className="hover:text-primary transition duration-300">
                      Rewards Shop
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Navbar End - Login Button */}
        <div className="navbar-end">
          <a href="/login" className="btn btn-primary px-6 py-2 rounded-md hover:bg-primary-focus transition duration-300">
            Login
          </a>
        </div>
      </nav>

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
