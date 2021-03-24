const colors = require("tailwindcss/colors");

// const colors = {
//   "teal-darkest": "#0d3331",
//   "teal-darker": "#20504f",
//   "teal-dark": "#38a89d",
// };

// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  //  colors: colors,
  backgroundColors: colors,
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      pink: colors.pink,
    },
    extend: {
      width: {
        "410px": "410px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
