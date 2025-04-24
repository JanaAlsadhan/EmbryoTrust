const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        "opensans":["Open Sans", "sans-serif"],
        "lock":["Overlock", "sans-serif"],
        
      }
    },
  },
  plugins: [],
});
