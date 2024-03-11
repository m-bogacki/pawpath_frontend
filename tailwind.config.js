/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
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
          primary: "#08D9D6",
          secondary: "#252A34",
          accent: "#ffd102",
          neutral: "#F7F7F7",
          "accent-content": "#252A34",
          "base-100": "#F7F7F7",

        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#08D9D6",
          secondary: "#F7F7F7",
          accent: "#ffd102",
          neutral: "#252A34",
          "accent-content": "#252A34",
          "base-100": "#252A34",
        },
      }
    ]

  }
}

