import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchStrains } from "../../api"; // Import API function

const Strains = () => {
  const [cartridges, setCartridges] = useState([]);
  const [duos, setDuos] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getStrains = async () => { 
      const { v1Cartridges, duoStrains } = await fetchStrains();
      console.log(v1Cartridges)
      console.log(duoStrains)
      if (isMounted) {
        setCartridges(v1Cartridges);
        setDuos(duoStrains);
      }
    };

    getStrains();

    return () => { isMounted = false };
  }, []);

  return (
    <div className="strains-container mt-24">
      {/* Hero Section */}
      <motion.section
        className="hero bg-black text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Meet Our Strains</h1>
        </div>
      </motion.section>

      {/* 2g Duo-Flare™ Section */}
      <motion.section
        className="py-8 bg-base-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold uppercase border-b-2 border-primary inline-block pb-2">
            2g Duel Chamber Duo-Flare™
          </h2>
        </div>
      </motion.section>

      {/* 2g Product Grid */}
      <motion.section
        className="py-8 bg-base-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {duos.map((duo) => (
            <motion.div
              key={duo.id}
              className="card bg-black text-white shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center w-full h-[300px] overflow-hidden">
                <img
                  src={duo.image_url} // ✅ Matches Supabase column
                  alt={duo.title} // ✅ Matches Supabase column
                  className="flex h-full"
                />
              </div>
              <div className="px-8 py-4 flex flex-col text-center">
                <h3 className="text-xl font-bold">{duo.title}</h3>
                <p className="mt-2 text-lg">{duo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 1g Cartridge Section */}
      <motion.section
        className="py-8 bg-base-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold uppercase border-b-2 border-primary inline-block pb-2">
            1g Cartridge V1 & V2
          </h2>
        </div>
      </motion.section>

      {/* 1g Product Grid */}
      <motion.section className="py-8 bg-base-200" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cartridges.map((cartridge) => (
            <motion.a
              key={cartridge.id}
              href={cartridge.leafly_link} // ✅ Matches Supabase column
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-black text-white rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg hover:shadow-gray-400"
            >
              <div className="relative w-full">
                <img
                  src={cartridge.image_url} // ✅ Matches Supabase column
                  alt="strain"
                  className="w-full"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Strains;
