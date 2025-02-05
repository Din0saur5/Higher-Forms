import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="/HFhero.png" 
          alt="Higher Forms Banner"
          className="hero-banner"
        />
      </section>

      {/* Mission Section */}
      <section id="mission" className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Mission</h2>
            <p className="mission-quote">
              "Not Mixed or adulterated with any other substances or material"
            </p>
            <p>
              At Higher Forms, this definition of purity is at the core of
              everything we do. Our mission is to deliver a truly pure
              experience by offering premium Category 3 Distillate housed in
              cutting-edge ceramic cartridges. These cartridges ensure smooth,
              large clouds and bold, strain-specific flavors, setting a new
              standard for quality and satisfaction in every product we create.
            </p>
          </div>
          <div className="mission-image">
            <img src="/Missions.png" alt="Mission" />
          </div>
        </div>
      </section>

      {/* Cartridge Technology Section */}
      <section id="technology" className="technology-section">
        <div className="technology-content">
          <h2>Cartridge Technology</h2>
          <p>
            Higher Forms uses cartridges equipped with No-Burn technology™ that
            delivers unprecedented terpene flavors without sacrificing on the
            big hit.
          </p>
        </div>
      </section>

      <section className="banner-section">
  <video className="smoke-video" autoPlay loop muted>
    <source src="/assets/smoke-effect.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="banner-overlay"></div>
</section>


    
    </div>
  );
};

export default Home;
