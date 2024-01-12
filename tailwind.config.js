/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EAEAEA",
        primaryAccent: "#08D9D6",
        secondAccent: "#FF2E63",
        darkText: "#252A34",
        interactiveElements: "#FFD700",
        headers: "#000000"
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '3/5': '3 / 5',
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#08D9D6",
          "secondary": "#252A34",
          "accent": "#FF2E63",
          "neutral": "#EAEAEA",
          "base-100": "#EAEAEA",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#08D9D6",
          secondary: "#252A34",
          accent: "#FF2E63",
          neutral: "#EAEAEA",
          "base-100": "#252A34",
        },
      }
    ]

  }
}

