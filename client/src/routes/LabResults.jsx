import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel"; // Make sure to install this package: `npm install react-responsive-carousel`
import "react-responsive-carousel/lib/styles/carousel.min.css";

const LabResults = () => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const images = [
    "/path/to/image1.png",
    "/path/to/image2.png",
    "/path/to/image3.png", // Add all your image paths here
  ];

  const handleImageClick = (src) => {
    setFullScreenImage(src);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="lab-results-container bg-black text-white font-roboto">
      {/* Header Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gold">
          Third-Party Lab Testing
        </h1>
        <p className="text-lg font-medium mt-4">Results you can TRUST</p>
        <hr className="mt-8 border-t border-gray-600 mx-auto w-3/4" />
      </section>

      {/* Content Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 py-16 px-4 md:px-16">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-xl font-semibold">
            Full-Panel levels and pesticide compliance testing
          </p>
        </div>

        {/* Right Carousel Section */}
        <div className="md:w-1/2">
          <Carousel
            showThumbs={true}
            infiniteLoop={true}
            useKeyboardArrows={true}
            dynamicHeight={true}
            onClickItem={(index) => handleImageClick(images[index])}
          >
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Lab result ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Full-Screen Image View */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeFullScreen}
        >
          <img
            src={fullScreenImage}
            alt="Full Screen View"
            className="max-w-full max-h-full"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeFullScreen}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default LabResults;
