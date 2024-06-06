/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },

      colors: {
        pink: {
          DEFAULT: "#F4C7D3",
        },
        orange: {
          DEFAULT: "#f8b988",
        },
        lightBlue: {
          DEFAULT: "#EAFEFF",
        },
        bg: {
          DEFAULT: "#fff8ef",
        },
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            transform:
              "opacity: 0; position: absolute; right: -20rem; filter:blur(15px)",
          },
          "100%": { transform: "opacity: 1; right: 6rem; filter:blur(0px)" },
        },
      },
      animation: {
        right: "fadeInRight 0.3s ease-in-out",
      },
      gridSet: {
        grid: "repeat(auto-fit, minmax(u.rem(250), 1fr))",
      },
      screens: {
        small: { max: "430px" },
        medium: { max: "660px" },
      },
    },
  },
  plugins: [],
};
