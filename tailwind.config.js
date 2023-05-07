/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      /* serif fonts */
      serif: ["Merriweather", "Georgia", "Cambria", "serif"],
      /* mono fonts */
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
