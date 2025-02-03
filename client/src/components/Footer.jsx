import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/HFlogo.png" alt="Higher Forms Logo" className="footer-logo-img" />
        </div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Higher Forms. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
