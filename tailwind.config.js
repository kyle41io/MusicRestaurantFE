/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B00",
        primaryBlack: "#2B2B2B",
        primaryLink: "#0094FF",
        primarySuccess: "#1AB232",
        primaryError: "#FF4040",
        primaryGray: "#979797",
        secondaryBlack: "#24292F",
        secondaryGray: "#dcdcdc",
        thirdBlack: "#0f0f0f",
        thirdGray: "#f6f6f6",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(primary|primaryBlack|primaryLink|primaryGray|primarySuccess|primaryError|secondaryBlack|secondaryGray|thirdBlack|thirdGray)/,
    },
  ],
};
