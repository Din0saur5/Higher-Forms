import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchStrains } from "../../api";

const Strains = () => {
  const [cartridges, setCartridges] = useState([]);
  const [duos, setDuos] = useState([]);
  const [duosDual, setDuosDual] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getStrains = async () => {
      try {
        const { v1Cartridges, duos, duos_dual  } = await fetchStrains();

        if (isMounted) {
          setCartridges(v1Cartridges);
          setDuos(duos);
          setDuosDual(duos_dual);

          console.log("Cartridges Loaded:", v1Cartridges); // ✅ Debugging
          console.log("Duos Loaded:", duos);
          console.log("duods-dual:", duosDual)
        }
      } catch (error) {
        console.error("Error fetching strains:", error);
      }
    };

    getStrains();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="strains-container mt-24 px-4 md:px-8">
      {/* Hero Section */}
      <motion.section
        className="hero bg-black text-white py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold uppercase">
          Meet Our Strains
        </h1>
      </motion.section>
{/* 2g Premium Duo-Flare Section */}

 <motion.section className="py-8 bg-base-100 text-center">
        <h2 className="text-xl md:text-2xl font-bold uppercase border-b-2 border-primary inline-block pb-2">
          2g Premium Duo-Flare™
        </h2>
      </motion.section>

      {/* 2g Product Grid */}
      <motion.section className="py-8 bg-base-200">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {duos.length > 0 ? (
            
            duos.map((duo) => (
              <motion.div
                  key={duo.id}
                  className="card bg-black text-white shadow-lg rounded-lg overflow-hidden transition hover:scale-105 cursor-pointer"
            
                >
                  <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
                    {duo.badge && (() => {
                        let badgeContent;
                        switch (duo.badge.toUpperCase()) {
                          case "NEW":
                            badgeContent = (
                              <div className="absolute top-[3%] left-[-10%] bg-blue-300 px-12 py-1 text-sm font-bold text-center rotate-[-45deg] shadow-md shadow-blue-700">
                               <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"> {duo.badge}!</span>
                              </div>
                            );
                            break;

                          case "HOT":
                            badgeContent = (
                              <div className="absolute top-[3%] left-[-10%]  bg-orange-500 text-white px-12 py-1 text-sm font-bold text-center rotate-[-45deg] shadow-md shadow-red-700">
                                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"> {duo.badge}! 🔥</span> 
                              </div>
                            );
                            break;

                          default:
                            badgeContent = null;
                        }
                        return badgeContent;
                      })()}

                    <img
                      src={duo.image_url}
                      alt={duo.image_url}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">No strains available.</p>
          )}
        </div>
      </motion.section>


      {/* 2g Dual Chamber Duo-Flare™ Section */}
      <motion.section className="py-8 bg-base-100 text-center">
        <h2 className="text-xl md:text-2xl font-bold uppercase border-b-2 border-primary inline-block pb-2">
          2g Dual Chamber Duo-Flare™
        </h2>
      </motion.section>

      {/* 2g Product Grid */}
      <motion.section className="py-8 bg-base-200">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {duosDual.length > 0 ? (
            
            duosDual.map((duo) => (
              <motion.div
                  key={duo.id}
                  className="card bg-black text-white shadow-lg rounded-lg overflow-hidden transition hover:scale-105 cursor-pointer"
                 
                >
                  <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
                    {duo.badge && (() => {
                        let badgeContent;
                        switch (duo.badge.toUpperCase()) {
                          case "NEW":
                            badgeContent = (
                              <div className="absolute top-[3%] left-[-10%] bg-blue-300 px-12 py-1 text-sm font-bold text-center rotate-[-45deg] shadow-md shadow-blue-700">
                               <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"> {duo.badge}!</span>
                              </div>
                            );
                            break;

                          case "HOT":
                            badgeContent = (
                              <div className="absolute top-[3%] left-[-10%]  bg-orange-500 text-white px-12 py-1 text-sm font-bold text-center rotate-[-45deg] shadow-md shadow-red-700">
                                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"> {duo.badge}! 🔥</span> 
                              </div>
                            );
                            break;

                          default:
                            badgeContent = null;
                        }
                        return badgeContent;
                      })()}

                    <img
                      src={duo.image_url}
                      alt={duo.image_url}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">No strains available.</p>
          )}
        </div>
      </motion.section>

      {/* 1g Cartridge V1 & V2 Section */}
      <motion.section className="py-8 bg-base-100 text-center">
        <h2 className="text-xl md:text-2xl font-bold uppercase border-b-2 border-primary inline-block pb-2">
          1g Cartridge V1 & V2
        </h2>
      </motion.section>

      {/* 1g Product Grid */}
      <motion.section className="py-8 bg-base-200">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cartridges.length > 0 ? (
            cartridges.map((cartridge) => (
              <motion.a
                key={cartridge.id}
                href={cartridge.leafly_link}
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-black text-white shadow-lg rounded-lg overflow-hidden transition hover:scale-105"
              >
                <div className="w-full h-56 flex items-center justify-center overflow-hidden">
                  <img
                    src={cartridge.image_url}
                    alt={cartridge.title}
                    className="object-contain w-full h-full"
                  />
                </div>
              </motion.a>
            ))
          ) : (
            <p className="text-center text-gray-400">No strains available.</p>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Strains;
