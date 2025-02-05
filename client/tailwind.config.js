/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Scans all JSX files in the src directory
    "./index.html",  // Ensures Tailwind works with the root HTML file
  ],
  theme: {
    extend: {
        fontFamily: {
          roboto: ["Roboto", "sans-serif"], // Add Roboto as a font family
        },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "black", "cupcake"], // Customize themes if needed
  },
};
