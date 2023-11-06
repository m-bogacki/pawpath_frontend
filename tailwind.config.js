/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        primaryAccent: "#3498DB",
        secondAccent: "#FF6B6B",
        darkText: "#333333",
        interactiveElements: "#FFD700",
        headers: "#000000"
      },
    },
  },
  plugins: [],
}

