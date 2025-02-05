import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
      <>
        <section id="contact" className="contact-section">
          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info">
              <h3>HIGHER FORMS</h3>
              <p>
                <img src="/HFemail.png" alt="Email Icon" />
                <span>sales@higher-forms.com</span>
              </p>
              <p>
                <img src="/HFIG.png" alt="Instagram Icon" />
                <a
                  href="https://instagram.com/higherforms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @higherforms
                </a>
              </p>
              <div className="contact-logo">
                <img src="/HFCC.png" alt="Higher Forms Cannabis Logo" />
              </div>
            </div>

            {/* Contact Form */}
            <form className="contact-form">
              <label htmlFor="first-name">First Name*</label>
              <input id="first-name" type="text" placeholder="Enter your first name" />

              <label htmlFor="last-name">Last Name*</label>
              <input id="last-name" type="text" placeholder="Enter your last name" />

              <label htmlFor="email">Email*</label>
              <input id="email" type="email" placeholder="Enter your email" />

              <label htmlFor="subject">Subject*</label>
              <input id="subject" type="text" placeholder="Enter subject" />

              <label htmlFor="message">Message*</label>
              <textarea id="message" placeholder="Enter your message"></textarea>

              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
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
    </>
  );
};

export default Footer;
