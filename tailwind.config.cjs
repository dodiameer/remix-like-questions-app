const forms = require("@tailwindcss/forms");
const colors = require("tailwindcss/colors");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.pink,
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },

  plugins: [forms],
};

module.exports = config;
