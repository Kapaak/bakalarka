/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#FFDD00",
        "main-orange": "#FBB034",
        "main-red": "#D00404",
        "dark-blue": "#313873",
      },
      borderRadius: {
        small: ".4rem",
      },
      boxShadow:{
        regular:"0px 0px 10px 2px rgba(0, 0, 0, 0.06)"
      }
    },
    
  },
  plugins: [],
};
