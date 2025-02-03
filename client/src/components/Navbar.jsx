import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleSubscribe = () => setShowSubscribe(!showSubscribe);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          {/* Logo Section */}
          <div className="navbar-logo">
            <img src="/HFlogo.png" alt="Higher Forms Logo" className="logo-img" />
            <div className="logo-text">
              <span>HIGHER</span>
              <span>FORMS</span>
            </div>
          </div>
          <div className="menu-icon" onClick={handleClick}>
            {click ? "X" : "☰"}
          </div>
          {/* Navigation Links */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " activated" : "")
                }
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/verify"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Verify
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/strains"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Strains
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/lab-results"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Lab Results
              </NavLink>
            </li>
          </ul>
          <button className="subscribe-btn" onClick={toggleSubscribe}>
            Subscribe
          </button>
        </div>
      </nav>
      {showSubscribe && (
        <div className="subscribe-modal">
          <div className="subscribe-content">
            <button className="close-btn" onClick={toggleSubscribe}>
              ✕
            </button>
            <h2>SUBSCRIBE</h2>
            <p>Sign up to receive Higher Forms news and updates.</p>
            <form>
              <input type="email" placeholder="Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
