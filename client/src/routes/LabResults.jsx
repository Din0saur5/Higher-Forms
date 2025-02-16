import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    <div className="lab-results-container mt-24 bg-black text-white font-roboto">
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
        <div className="md:w-1/2 relative">
        <Carousel
  showThumbs={true}
  infiniteLoop={true}
  useKeyboardArrows={true}
  dynamicHeight={true}
  thumbWidth={80} // Adjust thumbnail size for proper spacing
  onClickItem={(index) => handleImageClick(images[index])}
  renderArrowPrev={(clickHandler, hasPrev) =>
    hasPrev && (
      <button
        onClick={clickHandler}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-white text-white hover:text-black rounded-full p-4 shadow-lg transition duration-300 z-50"
        aria-label="Previous Slide"
        style={{ display: "block" }} 
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
        className="rounded-lg object-contain w-full max-w-[500px] h-auto"
      />
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
