import React from "react";

const Strains = () => {
  // 1g Cartridge data
  const cartridges = [
    { img: "/assets/AcaiGel.png", title: "Acai Gel" },
    { img: "/assets/BBerryJam.png", title: "Blueberry Jam" },
    { img: "/assets/BlckChryPnch.png", title: "Black Cherry Punch" },
    { img: "/assets/CnlpHze.png", title: "Cantaloupe Haze" },
    { img: "/assets/GDddyPrpl.png", title: "Granddaddy Purple" },
    { img: "/assets/GrpGod.png", title: "Grape God" },
    { img: "/assets/KeyLime.png", title: "Key Lime" },
    { img: "/assets/OGKush.png", title: "OG Kush" },
    { img: "/assets/OrngCrmscl.png", title: "Orange Creamsicle" },
    { img: "/assets/Papaya.png", title: "Papaya" },
    { img: "/assets/PappleXprs.png", title: "Pineapple Express" },
    { img: "/assets/PnkLmnd.png", title: "Pink Lemonade" },
    { img: "/assets/PrplPnch.png", title: "Purple Punch" },
    { img: "/assets/PssnFrt.png", title: "Passion Fruit" },
    { img: "/assets/StrDwgGv.png", title: "Strawberry Guava" },
    { img: "/assets/StrwShrtCk.png", title: "Strawberry Shortcake" },
    { img: "/assets/zkttlz.png", title: "Zkittlez" },
    { img: "/assets/WddngCake.png", title: "Wedding Cake" },
    { img: "/assets/Gelato.png", title: "Gelato" },
    { img: "/assets/StrwNana.png", title: "Strawnana" },
  ];

  return (
    <div className="strains-container">
      {/* Hero Section */}
      <section className="hero bg-black text-white py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Meet Our Strains</h1>
        </div>
      </section>

      {/* 2g Duel Chamber Duo-Flare™ Section */}
      <section className="py-8 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold uppercase border-b-2 border-primary inline-block pb-2">
            2g Duel Chamber Duo-Flare™
          </h2>
        </div>
      </section>

      {/* Product Cards Section */}
      <section className="py-8 bg-base-200">
        <div className="container mx-auto space-y-8">
          {/* Citrus Fusion Card */}
          <div className="card bg-black text-white shadow-xl">
            <div>
              <img
                src="/assets/CitFus.png"
                alt="Citrus Fusion"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="px-8 py-4 text-center">
              <h3 className="text-2xl font-bold">Citrus Fusion</h3>
              <p className="mt-4 text-lg">
                A tangy and creamy citrus blend offering an uplifting buzz and a
                smooth, serene comedown.
              </p>
            </div>
          </div>

          {/* Dessert Delight Card */}
          <div className="card bg-black text-white shadow-xl">
            <div>
              <img
                src="/assets/DsrtDlight.png"
                alt="Dessert Delight"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="px-8 py-4 text-center">
              <h3 className="text-2xl font-bold">Dessert Delight</h3>
              <p className="mt-4 text-lg">
                Indulgent, dessert-inspired pairing with euphoric effects and a
                soothing, mellow finish.
              </p>
            </div>
          </div>

          {/* Berry Medley Card */}
          <div className="card bg-black text-white shadow-xl">
            <div>
              <img
                src="/assets/BrryMdly.png"
                alt="Berry Medley"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="px-8 py-4 text-center">
              <h3 className="text-2xl font-bold">Berry Medley</h3>
              <p className="mt-4 text-lg">
                A luscious, sweet berry explosion ideal for evening relaxation.
              </p>
            </div>
          </div>

          {/* OG Tropics Card */}
          <div className="card bg-black text-white shadow-xl">
            <div>
              <img
                src="/assets/OGTrop.png"
                alt="OG Tropics"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="px-8 py-4 text-center">
              <h3 className="text-2xl font-bold">OG Tropics</h3>
              <p className="mt-4 text-lg">
                A nostalgic and refreshing mix with balanced relaxation and
                mental clarity.
              </p>
            </div>
          </div>

          {/* Punch Party Card */}
          <div className="card bg-black text-white shadow-xl">
            <div>
              <img
                src="/assets/PnchPrty.png"
                alt="Punch Party"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="px-8 py-4 text-center">
              <h3 className="text-2xl font-bold">Punch Party</h3>
              <p className="mt-4 text-lg">
                A bold, fruity fusion offering a balanced body high and mental
                clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1g Cartridge Section */}
      <section className="py-8 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold uppercase border-b-2 border-primary inline-block pb-2">
            1g Cartridge V1
          </h2>
        </div>
      </section>
      <section className="py-8 bg-base-200">
        <div className="container mx-auto space-y-8">
          {cartridges.map((cartridge, index) => (
            <a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-black text-white shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all"
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
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Strains;
