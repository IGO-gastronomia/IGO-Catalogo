/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gris-claro": "#e8e8e8",
        "gris-oscuro": "#878787",
      },
      screens: {
        sm: "640px", // Teléfonos grandes
        md: "768px", // Tablets
        lg: "1024px", // Laptops
        xl: "1280px", // Escritorios
        "2xl": "1536px", // Escritorios extra grandes
      },
      boxShadow: {
        centrada: "0px 0px 15px rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        boring: ['"Boring Sans"', "sans-serif"],
        kabrio: ['"Kabrio"', "sans-serif"],
      },
      keyframes: {
        "gray-scale": {
          "0%": { backgroundColor: "#1a1a1a" },
          "20%": { backgroundColor: "#333333" },
          "50%": { backgroundColor: "#666666" },
          "80%": { backgroundColor: "#333333" },
          "100%": { backgroundColor: "#1a1a1a" },
        },
      },
      animation: {
        "gray-scale": "gray-scale 1.2s ease-in-out infinite",
      },
      textShadow: {
        sm: "0px 0px 15px rgba(0, 0, 0, 0.5)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
});
