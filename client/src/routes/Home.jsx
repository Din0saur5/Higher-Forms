import React from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { Flame, Thermometer, Heart, Coffee } from "lucide-react";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section
        className="hero bg-black text-white flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <img
            src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/Hero1500.png"
            alt="Higher Forms Banner"
            className="max-w-full h-auto object-cover mx-auto"
          />
        </div>
      </motion.section>

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
            src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/DFHero800.png"
            alt="Mission"
            className="h-auto w-2/3 md:w-1/2 object-contain "
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

       {/* Smoke Effect Banner Section with Cards */}
       <Parallax bgImage="/assets/smoke-effect.jpg" strength={300}>
        <section className="banner-section relative h-80 overflow-hidden flex items-center justify-center">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="/assets/smoke-effect.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-6">
            <h2 className="text-4xl font-bold uppercase text-primary gradient-text mb-8">
              Experience Purity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl">
              {[
                {
                  icon: <Coffee size={40} />, 
                  title: "Proprietary Ceramic Core",
                  text: "All cartridges feature a proprietary ceramic core. The result of thousands of hours of R&D and testing. The porous core has a unique design of microscopic inlets. Smoothly absorbing oil for consistent vaporization, even heating, and flavor retention."
                },
                {
                  icon: <Flame size={40} />, 
                  title: "Heating Element",
                  text: "By embedding the heating coil in the center of the ceramic core, hot wires are not directly exposed to your oils. Instead, heat is evenly transmitted throughout the core. No overheating, burnt flavors, or dry hits. The cartridges are never pre-coated with harmful substances such as glycols or glycerin."
                },
                {
                  icon: <Heart size={40} />, 
                  title: "SmartPulse Power Control",
                  text: "The longer the session, the hotter cartridges run degrading your oil. The solution? SmartPulse.™ An advanced algorithm designed to stabilize the temperature by sending short intermittent power-pulses to the cartridge. Overheating is avoided and your consumers get to enjoy your full flavor profile. No matter whether they take a single puff, or fifteen."
                },
                {
                  icon: <Thermometer size={40} />, 
                  title: "Consistent Temperature",
                  text: "For best flavors you need a cartridge that consistently regulates temperature. Our cartridges are set at 1.4 ohms with an industry leading variance of no more than 0.05 ohms. By keeping ohms consistent in our specifically formulated coil, our cartridges prevent heat spikes, maintaining a consistent temperature for flavor preservation."
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4 text-black">{item.icon}</div>
                  <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Parallax>
    </div>
  );
};

export default Home;
