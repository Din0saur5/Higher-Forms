import React from "react";
import { motion } from "framer-motion";

const Strains = () => {
  // 1g Cartridge data
  const cartridges = [
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/AcaiGel.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/BBerryJam.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/BlckChryPnch.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/CnlpHze.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/GDddyPrpl.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/GrpGod.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/KeyLime.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/OGKush.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/OrngCrmscl.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/Papaya.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PappleXprs.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PnkLmnd.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PrplPnch.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PssnFrt.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/StrDwgGv.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/StrwShrtCk.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/StrwNana.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/WddngCake.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/Gelato.png", title: "" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/zkttlz.png", title: "" },
  ];

  return (
    <div className="strains-container">
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

      {/* 2g Duel Chamber Duo-Flare™ Section */}
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

      {/* Product Cards Section */}
      <motion.section
          className="py-8 bg-base-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto space-y-8">
            {/* Citrus Fusion Card */}
            <motion.div
              className="card bg-black text-white shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <img
                  src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/CitFus.png"
                  alt="Citrus Fusion"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="px-8 py-4 text-center">
                <p className="mt-4 text-lg">
                  A tangy and creamy citrus blend offering an uplifting buzz and a
                  smooth, serene comedown.
                </p>
              </div>
            </motion.div>

            {/* Dessert Delight Card */}
            <motion.div
              className="card bg-black text-white shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <img
                  src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/DsrtDlight.png"
                  alt="Dessert Delight"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="px-8 py-4 text-center">
                <p className="mt-4 text-lg">
                  Indulgent, dessert-inspired pairing with euphoric effects and a
                  soothing, mellow finish.
                </p>
              </div>
            </motion.div>

            {/* Berry Medley Card */}
            <motion.div
              className="card bg-black text-white shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <img
                  src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/BrryMdly.png"
                  alt="Berry Medley"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="px-8 py-4 text-center">
                <p className="mt-4 text-lg">
                  A luscious, sweet berry explosion ideal for evening relaxation.
                </p>
              </div>
            </motion.div>

            {/* OG Tropics Card */}
            <motion.div
              className="card bg-black text-white shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <img
                  src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/OGTrop.png"
                  alt="OG Tropics"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="px-8 py-4 text-center">
                <p className="mt-4 text-lg">
                  A nostalgic and refreshing mix with balanced relaxation and mental clarity.
                </p>
              </div>
            </motion.div>
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
            1g Cartridge V1
          </h2>
        </div>
      </motion.section>

      <motion.section
        className="py-8 bg-base-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto space-y-8">
          {cartridges.map((cartridge, index) => (
            <motion.a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-black text-white shadow-lg cursor-pointer hover:shadow-xl transform"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <img
                  src={cartridge.img}
                  alt={cartridge.title}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="px-8 py-4 text-center">
                <h3 className="text-2xl font-bold">{cartridge.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Strains;
