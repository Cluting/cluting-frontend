/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ["Pretendard"]
      },
      screens: {
        sm: "500px",
        md: "744px",
        // => @media (min-width: 744px) { ... }
        xl: "1200px"
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        black: {
          100: "#787878",
          200: "#6B6B6B",
          300: "#5E5E5E",
          400: "#525252",
          500: "#454545",
          600: "#373737",
          700: "#2B2B2B",
          800: "#1F1F1F",
          900: "#121212",
          950: "#050505"
        },
        white: {
          100: "#FFFFFF"
        },
        gray: {
          100: "#DEDEDE",
          200: "#C4C4C4",
          300: "#ABABAB",
          400: "#919191"
        },
        blue: {
          100: "#FFFFFF",
          200: "#ECEFF4",
          300: "#CBD3E1",
          400: "#ABB8CE",
          500: "#8B9DBC",
          600: "#6A82A9",
          700: "#52698E",
          800: "#40516E",
          900: "#2D394E",
          950: "#1A212D"
        },
        red: {
          100: "#FF6577"
        },
        bg: {
          100: "#E2E3E5"
        }
      },
      animation: {
        buttonHover: "buttonHover 0.3s ease forwards"
      }
    }
  },
  plugins: []
};
