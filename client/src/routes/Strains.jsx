import React from "react";
import "./Strains.css";

const Strains = () => {
  return (
    <div className="strains-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="animated-title">Meet Our Strains</h1>
      </section>

      {/* 2g Duel Chamber Duo-Flare™ Section */}
      <section className="label-section">
        <h2 className="label-title">2g Duel Chamber Duo-Flare™</h2>
      </section>

      {/* Product Cards Section */}
      <section className="product-section">
        <div className="product-card">
          <div className="card-left">
            <video autoPlay loop muted className="product-video">
              <source src="/assets/citrus-fusion.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
          <div className="card-right">
            <h3>Citrus Fusion</h3>
            <p>
              A tangy and creamy citrus blend offering an uplifting buzz and a
              smooth, serene comedown.
            </p>
          </div>
        </div>
        <div className="product-card">
          <div className="card-left">
            <video autoPlay loop muted className="product-video">
              <source src="/assets/dessert-delight.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
          <div className="card-right">
            <h3>Dessert Delight</h3>
            <p>
              Indulgent, dessert-inspired pairing with euphoric effects and a
              soothing, mellow finish.
            </p>
          </div>
        </div>
        {/* Add more cards here */}
      </section>

      {/* 1g Cartridge Section */}
      <section className="label-section">
        <h2 className="label-title">1g Cartridge V1</h2>
      </section>
      <section className="cartridge-section">
        <div className="cartridge-grid">
          <div className="cartridge-card">
            <img src="/assets/strawnana.png" alt="Strawnana" />
            <p>Strawnana</p>
          </div>
          <div className="cartridge-card">
            <img src="/assets/gelato.png" alt="Gelato" />
            <p>Gelato</p>
          </div>
          {/* Add more cartridges here */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
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
    </div>
  );
};

export default Strains;
