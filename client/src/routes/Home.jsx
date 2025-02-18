import React from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";

const Home = () => {
  return (
    <div className="mt-24 min-h-screen home-container">
      {/* Hero Section */}
<motion.section
  className="hero bg-black flex justify-center items-center px-4 pt-20 pb-10 md:pb-20"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="relative w-full max-w-7xl mx-auto">
    <div className="w-full flex justify-center">
      <img
        src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/Hero1500.png"
        alt="Higher Forms Banner"
        className="w-auto max-w-full md:max-w-5xl h-auto object-contain mx-auto"
      />
    </div>
  </div>
</motion.section>

      {/* Mission Section */}
      <section id="mission" className="flex flex-col md:flex-row items-stretch w-full">
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
            At Higher Forms, this definition of purity is at the core of everything we do. 
            Our mission is to deliver a truly pure experience by offering premium 
            Category 3 Distillate housed in cutting-edge ceramic cartridges. These cartridges 
            ensure smooth, large clouds and bold, strain-specific flavors, setting a new standard 
            for quality and satisfaction in every product we create.
          </p>
        </div>
        <div className="flex-1 bg-black flex items-center justify-center p-6">
          <img
            src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/Hardware.png"
            alt="Hardware"
            className="h-96 w-2/3 object-contain"
          />
        </div>
      </section>

      {/* Cartridge Technology Section */}
      <section id="technology" className="py-12 bg-black text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide mb-6">
            Cartridge Technology
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Higher Forms uses cartridges equipped with No-Burn technology™ that delivers 
            unprecedented terpene flavors without sacrificing on the big hit.
          </p>
        </div>
      </section>

      {/* Smoke Effect Banner Section with Cards */}
      <Parallax bgImage="/assets/smoke-effect.jpg" strength={300}>
        <section className="relative flex items-center justify-center w-full max-h-[640px] h-[640px] px-[5%]">
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
            <source src="/assets/smoke-effect.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full h-full px-[5%]">
            <div className="grid lg:grid-rows-1 grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
              {[
                {
                  icon: "core.svg",
                  title: "Proprietary Ceramic Core",
                  text: "Our proprietary ceramic core ensures smooth oil absorption and even heating for consistent vaporization and flavor retention."
                },
                {
                  icon: "heat.svg",
                  title: "Heating Element",
                  text: "The embedded heating coil evenly transmits heat throughout the ceramic core, preventing burnt flavors and dry hits."
                },
                {
                  icon: "pulse.svg",
                  title: "SmartPulse Power Control",
                  text: "SmartPulse™ stabilizes temperature with intermittent power pulses, preventing overheating and preserving flavor."
                },
                {
                  icon: "temp.svg",
                  title: "Consistent Temperature",
                  text: "Our precisely engineered coil maintains a stable temperature, preventing heat spikes and preserving flavor."
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center border border-gray-300">
                  <img
                    src={`https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/icons/${item.icon}`}
                    alt={item.title}
                    className="h-12 w-12 mb-2"
                  />
                  <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
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
