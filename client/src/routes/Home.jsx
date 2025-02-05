import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero bg-black text-white flex justify-center items-center">
        <div className="text-center">
          <img
            src="/HFhero.png"
            alt="Higher Forms Banner"
            className="max-w-full h-auto object-cover mx-auto"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="flex flex-col md:flex-row items-stretch w-full"
      >
        {/* Left Side - Off White Background */}
        <div className="flex-1 bg-gray-100 p-8 md:p-12">
          <h2 className="text-sm font-bold uppercase text-gray-600 tracking-widest mb-4">
            Mission
          </h2>
          <h3 className="text-4xl font-extrabold text-black mb-2">pure</h3>
          <p className="italic text-lg text-gray-500 mb-4">/pyʊər/ (adj.)</p>
          <p className="italic text-lg text-gray-700 mb-4">
            "Not Mixed or adulterated with any other substances or material"
          </p>
          <p className="text-base text-gray-800 leading-relaxed">
            At Higher Forms, this definition of purity is at the core of
            everything we do. Our mission is to deliver a truly pure experience
            by offering premium Category 3 Distillate housed in cutting-edge
            ceramic cartridges. These cartridges ensure smooth, large clouds
            and bold, strain-specific flavors, setting a new standard for
            quality and satisfaction in every product we create.
          </p>
        </div>

        {/* Right Side - Black Background with Image */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <img
            src="/Missions.png"
            alt="Mission"
            className="h-auto w-2/3 md:w-1/2 object-contain"
          />
        </div>
      </section>

      {/* Cartridge Technology Section */}
      <section id="technology" className="py-16 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="pl-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">
              Cartridge Technology
            </h2>
            <p className="text-lg leading-relaxed">
              Higher Forms uses cartridges equipped with No-Burn technology™
              that delivers unprecedented terpene flavors without sacrificing on
              the big hit.
            </p>
          </div>
        </div>
      </section>

      {/* Smoke Effect Banner Section */}
      <section className="banner-section relative h-80 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/assets/smoke-effect.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-4xl font-bold uppercase text-primary">
            Experience Purity
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
