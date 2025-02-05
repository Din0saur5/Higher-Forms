/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", 
    "./index.html",  
  ],
  theme: {
    extend: {
        fontFamily: {
          roboto: ["Roboto", "sans-serif"], 
        },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "black", "cupcake"],
  },
};
