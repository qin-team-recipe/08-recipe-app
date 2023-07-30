/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "whitea-13": "#ffffff",
      },
      fontSize: {
        xxs: "10px",
      },
      lineHeight: {
        xxs: "normal",
      },
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("tailwindcss-animate"), require("tailwindcss-radix-colors")],
};

export default config;
