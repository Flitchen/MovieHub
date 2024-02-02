/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".primary": {
          color: `#EAB308`,
        },
      });
    }),
  ],
  content: [],
  theme: {
    extend: {},
  },
};
