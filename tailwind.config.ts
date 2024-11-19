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
        sans: ["var(--font-manrope)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        bronzelog: "#7f3828",
        back: "#edede4",
        fontcolor: "#241a16",
        graycolor: "#b9ada5",
      },
    },
  },
  plugins: [],
} satisfies Config;
