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
      fontSize: {
        body: ["17px", { lineHeight: "24px", fontWeight: "500" }],
        headline: ["17px", { lineHeight: "22px", fontWeight: "600" }],
        title1: ["28px", { lineHeight: "34px", fontWeight: "600" }],
        title3: ["20px", { lineHeight: "22px", fontWeight: "600" }],
        caption1: ["13px", { lineHeight: "22px", fontWeight: "500" }],
        caption2: ["12px", { lineHeight: "16px", fontWeight: "500" }],
        caption3: ["13px", { lineHeight: "18px", fontWeight: "500" }],
        subheadline: ["15px", { lineHeight: "20px", fontWeight: "600" }],
        callout: ["16px", { lineHeight: "21px", fontWeight: "600" }]
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
          100: "#F2F2F7", //gray01
          200: "#E5E5EA", //gray02
          300: "#D1D1D6", //gray03
          400: "#C7C7CC", //gray04
          500: "#AEAEB2", //gray05
          600: "#8E8E93", //gray06
          700: "#8E8E93", //gray07
          800: "#636366", //gray08
          850: "#5C6067", //gray8.5
          900: "#3A3A3C" //gray09
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
          100: "#FF5252"
        },
        bg: {
          100: "#E2E3E5"
        },
        main: {
          100: "#8457FF"
        }
      },
      animation: {
        buttonHover: "buttonHover 0.3s ease forwards"
      },
      boxShadow: {
        //shadow-01이라고만 쓰면 적용 됨
        "01": "0 4px 21.6px rgba(0,0,0,0.05)" // dropshadow01
      }
    }
  },
  plugins: []
};
