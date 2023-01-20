/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      colors: {
        zinc: {
          150: "#eee",
        },
        purple: {
          800: "#212134",
          900: "#181826",
        },
      },
    },
  },
  plugins: [],
};
