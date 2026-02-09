import React, { useState, useEffect } from "react";

const AgeVerification = ({ onConfirm }) => {
  const [showModal, setShowModal] = useState(true);

  const isBot = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent?.toLowerCase() || "";
    return /(bot|crawler|spider|crawling|googlebot|bingbot|duckduckbot|baiduspider|yandex|slurp|sogou|facebot|ia_archiver|ahrefs|semrush|mediapartners-google|google-inspectiontool|facebookexternalhit|twitterbot|linkedinbot|pinterest|bingpreview)/.test(
      ua
    );
  };

  useEffect(() => {
    const ageConfirmed = localStorage.getItem("ageVerified");
    const botDetected = isBot();

    if (ageConfirmed === "true" || botDetected) {
      if (botDetected) {
        localStorage.setItem("ageVerified", "true");
        onConfirm();
      }
      setShowModal(false);
    }
  }, [onConfirm]);

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
    setShowModal(false);
    onConfirm();
  };

  const handleReject = () => {
    window.location.href =
      "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/how-teen-marijuana-use-impacts-brain-development#:~:text=The%20concentration%20of%20THC%20in,coordination%2C%20reaction%20time%20and%20judgment.";
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#161616] text-white p-8 rounded-lg shadow-lg text-center w-[90%] max-w-md border border-[#A08C5B]">
        <h2 className="text-2xl font-bold mb-4 text-gold">Please confirm</h2>
        <p className="text-lg mb-6">Are you over 21 years of age?</p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={handleConfirm}
            className="bg-[#A08C5B] text-white px-6 py-2 rounded-md font-bold hover:bg-[#8C7A4E] transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={handleReject}
            className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-gray-300 transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
