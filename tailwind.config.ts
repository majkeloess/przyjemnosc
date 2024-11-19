import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans"],
      },
      colors: {
        bronzelog: "#7f3828",
        back: "#edede4",
        fontcolor: "#241a16",
        graycolor: "#b9ada5",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "@font-face": [
          {
            fontFamily: "Manrope",
            fontWeight: "400",
            fontStyle: "normal",
            src: 'url("/fonts/Manrope-Regular.ttf") format("truetype")',
          },
          {
            fontFamily: "Manrope",
            fontWeight: "500",
            fontStyle: "normal",
            src: 'url("/fonts/Manrope-Medium.ttf") format("truetype")',
          },
          {
            fontFamily: "Manrope",
            fontWeight: "700",
            fontStyle: "normal",
            src: 'url("/fonts/Manrope-Bold.ttf") format("truetype")',
          },
          {
            fontFamily: "Manrope",
            fontWeight: "300",
            fontStyle: "normal",
            src: 'url("/fonts/Manrope-Light.ttf") format("truetype")',
          },
          {
            fontFamily: "Manrope",
            fontWeight: "800",
            fontStyle: "normal",
            src: 'url("/fonts/Manrope-ExtraBold.ttf") format("truetype")',
          },
        ],
      });
    },
  ],
} satisfies Config;
