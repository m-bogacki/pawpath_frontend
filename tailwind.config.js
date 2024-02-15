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
          "primary": "#08D9D6",
          "secondary": "#252A34",
          "accent": "#FF2E63",
          "neutral": "#EAEAEA",
          "base-100": "#EAEAEA",
          "dark": "#252A34"

        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#08D9D6",
          secondary: "#EAEAEA",
          accent: "#FF2E63",
          neutral: "#252A34",
          "base-100": "#252A34",
          "dark": "#252A34"
        },
      }
    ]

  }
}

