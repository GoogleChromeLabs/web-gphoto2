const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ea580c',
        }
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "primary": "#EA580C",
          "success": "#33DB33",
          "warning": "#FAC547",
          "error": "#ED3221"
        },
      },
    ],
  },
};

module.exports = config;