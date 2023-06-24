/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        "whitea-13": "#ffffff",
      },
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("tailwindcss-animate"), require("tailwindcss-radix-colors")],
};

export default config;
