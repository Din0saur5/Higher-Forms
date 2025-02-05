import React from "react";

const Strains = () => {
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
        <div className="container mx-auto grid gap-8 grid-cols-1">
          <a
            href="https://www.example.com/strawnana"
            target="_blank"
            rel="noopener noreferrer"
            className="card bg-black text-white shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <figure>
              <img
                src="/assets/strawnana.png"
                alt="Strawnana"
                className="rounded-lg"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-lg font-bold">Strawnana</h3>
            </div>
          </a>

          <a
            href="https://www.example.com/gelato"
            target="_blank"
            rel="noopener noreferrer"
            className="card bg-black text-white shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <figure>
              <img
                src="/assets/gelato.png"
                alt="Gelato"
                className="rounded-lg"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-lg font-bold">Gelato</h3>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Strains;
