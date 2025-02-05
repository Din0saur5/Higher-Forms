import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "./Navbar.css";
import { useUserContext } from '../components/UserContext';

const Navbar = ({ user }) => {
  const [click, setClick] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const {userData, setUserData} = useUserContext()
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleSubscribe = () => setShowSubscribe(!showSubscribe); 
  
  //notes for Matt
  // switch Subscribe to Login, don't change the css though they like bubble button look
// use tailwind break points to make more responsive, stuff is cutting off on mobile simulator
//dont worry about hooking up anything other than the state changes and basic routing I will wire up the login logic and the session handling



  return (
    <>
 <nav className="navbar bg-base-100 px-4">
      {/* Navbar Start - Logo */}
      <div className="navbar-start flex items-center space-x-2">
        <img src="/HFlogo.png" alt="Higher Forms Logo" className="h-10 w-auto" />
        <a className="text-xl font-bold font-roboto ">Higher <br></br>Forms</a>
      </div>
      
      {/* Navbar Center - Navigation Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal font-roboto px-1 space-x-4">
          <li className="max-lg:hidden"><a href="/">Home</a></li>
          <li><a href="/verify">Verify</a></li>
          <li><a href="/strains">Strains</a></li>
          <li>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}>
              Contact Us
            </a>
          </li>
          <li><a href="/lab-results">Lab Results</a></li>
          <li><a href="/rewards">Rewards Shop</a></li>
        </ul>
      </div>
      <div className="md:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
      <ul
        tabIndex={0}
        className="menu font-roboto menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       <li><a href="/">Home</a></li>
          <li><a href="/verify">Verify</a></li>
          <li><a href="/strains">Strains</a></li>
          <li>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}>
              Contact Us
            </a>
          </li>
          <li><a href="/lab-results">Lab Results</a></li>
          <li><a href="/rewards">Rewards Shop</a></li>
      </ul>
    </div>
      </div>
      {/* Navbar End - Login Button */}
      <div className="navbar-end">
        <a href="/login" className="btn">Login</a>
      </div>
    </nav>
      
      

    </>
  );
};

export default Navbar;
