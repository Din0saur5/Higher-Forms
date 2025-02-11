import React from "react";
import { motion } from "framer-motion";

const Strains = () => {
  // 1g Cartridge data
  const cartridges = [
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/AcaiGel.png", link: "https://www.leafly.com/strains/acai-berry-gelato" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/BBerryJam.png", link: "https://www.leafly.com/strains/blueberry-jam" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/BlckChryPnch.png", link: "https://www.leafly.com/strains/black-cherry-punch" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/CnlpHze.png", link: "https://www.leafly.com/strains/cannalope-haze" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/GDddyPrpl.png", link: "https://www.leafly.com/strains/granddaddy-purple" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/GrpGod.png", link: "https://www.leafly.com/strains/grape-god" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/KeyLime.png", link: "https://www.leafly.com/strains/key-lime-pie" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/OGKush.png", link: "https://www.leafly.com/strains/og-kush" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/OrngCrmscl.png", link: "https://www.leafly.com/strains/orange-creamsicle" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/Papaya.png", link: "https://www.leafly.com/strains/papaya" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PappleXprs.png", link: "https://www.leafly.com/strains/pineapple-express" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PnkLmnd.png", link: "https://www.leafly.com/strains/pink-lemonade" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PrplPnch.png", link: "https://www.leafly.com/strains/purple-punch" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/PssnFrt.png", link: "https://www.leafly.com/strains/passion-fruit" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/StrDwgGv.png", link: "https://www.leafly.com/strains/stardawg-guava" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/StrwShrtCk.png", link: "https://www.leafly.com/strains/strawberry-shortcake" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/StrwNana.png", link: "https://www.leafly.com/strains/strawberry-banana" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/WddngCake.png", link: "https://www.leafly.com/strains/wedding-cake" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/Gelato.png", link: "https://www.leafly.com/strains/gelato" },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/1g/zkttlz.png", link: "https://www.leafly.com/brands/zkittlez" },
  ];

  // 2g Duo-Flare™ products
  const duos = [
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/CitFus.png", title: "Citrus Fusion", description: "A tangy and creamy citrus blend offering an uplifting buzz and a smooth, serene comedown." },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/DsrtDlight.png", title: "Dessert Delight", description: "Indulgent, dessert-inspired pairing with euphoric effects and a soothing, mellow finish." },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/BrryMdly.png", title: "Berry Medley", description: "A luscious, sweet berry explosion ideal for evening relaxation." },
    { img: "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Duo/OGTrop.png", title: "OG Tropics", description: "A nostalgic and refreshing mix with balanced relaxation and mental clarity." },
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
          {duos.map((duo, index) => (
            <motion.div
              key={index}
              className="card bg-black text-white shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-[300px] overflow-hidden">
                <img
                  src={duo.img}
                  alt={duo.title}
                  className="absolute top-[12.5%] left-0 w-full h-[75%] object-cover"
                />
              </div>
              <div className="px-8 py-4 text-center">
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
            1g Cartridge V1
          </h2>
        </div>
      </motion.section>

      {/* 1g Product Grid */}
      <motion.section className="py-8 bg-base-200" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cartridges.map((cartridge, index) => (
            <motion.a
              key={index}
              href={cartridge.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-black text-white shadow-lg border border-gray-800 rounded-lg overflow-hidden transition transform hover:scale-105"
            >
              <div className="relative w-full h-[200px] overflow-hidden">
                <img
                  src={cartridge.img}
                  alt={cartridge.title}
                  className="absolute top-0 left-0 w-[200%] h-full object-cover object-left sm:object-left-center"
                />
              </div>
              <div className="px-8 py-4 text-center">
                <h3 className="text-lg font-bold">{cartridge.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Strains;
