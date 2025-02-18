import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion"; 

const LabResults = () => {
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const images = [
    "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/labresults/l1.jpg",
    "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/labresults/l2.jpg",
    "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/labresults/l3.jpg",
    "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/labresults/l4.jpg",
  ];

  const handleImageClick = (src) => {
    setFullScreenImage(src);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="mt-24 min-h-screen bg-black text-white font-roboto">
      {/* Header Section */}
      <motion.section
        className="text-center py-12 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-yellow-400">
          Third-Party Lab Testing
        </h1>
        <p className="text-lg md:text-xl font-medium mt-4 text-gray-300">
          Results You Can <span className="text-white font-bold">Trust</span>
        </p>
        <hr className="mt-6 border-t border-gray-700 mx-auto w-1/2" />
      </motion.section>

      {/* Content Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 py-16 px-6 md:px-16">
        {/* Left Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4">
            Full-Panel & Pesticide Compliance Testing
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Every batch is rigorously tested by certified third-party labs for purity, potency, and safety. We prioritize transparency and quality control so you can trust every product.
          </p>
        </motion.div>

        {/* Right Carousel Section */}
        <motion.div
          className="md:w-1/2 relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Carousel
            showThumbs={true}
            infiniteLoop={true}
            useKeyboardArrows={true}
            thumbWidth={80}
            autoPlay={true}
            interval={5000}
            stopOnHover={true}
            showIndicators={false}
            renderArrowPrev={(clickHandler, hasPrev) =>
              hasPrev && (
                <button
                  onClick={clickHandler}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-white text-white hover:text-black rounded-full p-4 shadow-lg transition duration-300 z-50"
                  aria-label="Previous Slide"
                >
                  ❮
                </button>
              )
            }
            renderArrowNext={(clickHandler, hasNext) =>
              hasNext && (
                <button
                  onClick={clickHandler}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-white text-white hover:text-black rounded-full p-4 shadow-lg transition duration-300"
                  aria-label="Next Slide"
                >
                  ❯
                </button>
              )
            }
          >
            {images.map((src, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={src}
                  alt={`Lab result ${index + 1}`}
                  className="rounded-lg object-contain w-full max-w-[500px] h-auto cursor-pointer transition duration-300 hover:scale-105"
                  onClick={() => handleImageClick(src)}
                />
              </div>
            ))}
          </Carousel>
        </motion.div>
      </section>

      {/* Full-Screen Image View */}
      {fullScreenImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
          onClick={closeFullScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={fullScreenImage}
            alt="Full Screen View"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
          <button
            className="absolute top-6 right-6 text-white text-3xl bg-gray-700/70 hover:bg-gray-600 rounded-full p-3"
            onClick={closeFullScreen}
          >
            ✕
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LabResults;
