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
        <div className="container mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="card bg-black text-white shadow-xl">
            <div className="card-body flex">
              <div className="flex-1">
                <video
                  autoPlay
                  loop
                  muted
                  className="rounded-lg w-full h-auto"
                >
                  <source src="/assets/citrus-fusion.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex-1 px-4">
                <h3 className="text-lg font-bold">Citrus Fusion</h3>
                <p>
                  A tangy and creamy citrus blend offering an uplifting buzz and
                  a smooth, serene comedown.
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-black text-white shadow-xl">
            <div className="card-body flex">
              <div className="flex-1">
                <video
                  autoPlay
                  loop
                  muted
                  className="rounded-lg w-full h-auto"
                >
                  <source src="/assets/dessert-delight.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex-1 px-4">
                <h3 className="text-lg font-bold">Dessert Delight</h3>
                <p>
                  Indulgent, dessert-inspired pairing with euphoric effects and
                  a soothing, mellow finish.
                </p>
              </div>
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
        <div className="container mx-auto grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
