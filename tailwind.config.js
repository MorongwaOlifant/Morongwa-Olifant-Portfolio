/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9",   // Indigo
        accent: "#9333EA",    // Violet
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};