import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const WalletAnimation = () => {
  const [animate, setAnimate] = useState(false);

  // Generate coins only once using useMemo
  const coins = useMemo(() => 
    Array.from({ length: 25 }, (_, i) => ({
      x: Math.random() * 500, // Slight rightward spread
      y: -Math.random() * 1000 - 500, // Increased height
      delay: Math.random() * 0.5, // Random delay for natural effect
    })), []
  );

  return (
    <div className="flex justify-center items-center h-screen bg-[#131313]">
      <div className="relative w-16 h-16">
        {/* Wallet Icon */}
        <motion.button
          className="w-full h-full flex items-center justify-center rounded-full bg-blue-600 text-white relative z-10"
          onClick={() => setAnimate(true)}
          aria-label="Trigger Coin Animation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 458.5 458.5"
            fill="currentColor"
          >
            <path d="M336.7 344c-22 0-39.9-18-39.9-39.9V238c0-22 18-39.8 39.9-39.8h105.7v-65.9c0-17-13.8-30.7-30.7-30.7h-381c-17 0-30.7 13.7-30.7 30.7v277.6c0 17 13.8 30.8 30.7 30.8h381c17 0 30.7-13.8 30.7-30.8V344H336.7z" />
            <path d="M440.5 220H336.7c-10 0-18 8-18 18V304c0 10 8 18 18 18h103.8c10 0 18-8 18-18V238c0-10-8-18-18-18zm-68 77a26 26 0 1 1 0-52 26 26 0 0 1 0 52zM358.2 45.2A39.7 39.7 0 0 0 308 20L152 71.6h214.9l-8.7-26.4z" />
          </svg>
        </motion.button>

        {/* Coins Animation */}
        {animate &&
          coins.map((coin, index) => (
            <motion.div
              key={index}
              className="absolute top-6 left-6 w-3 h-3 flex items-center justify-center font-bold text-yellow-400 bg-yellow-600 border-2 border-yellow-400 rounded-full opacity-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [0, coin.x],  
                y: [0, coin.y], 
                rotate: [0, 1080],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3, 
                delay: coin.delay,
                ease: "easeInOut",
              }}
              onAnimationComplete={() => {
                if (index === coins.length - 1) setAnimate(false);
              }}
            >
              $
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default WalletAnimation;
