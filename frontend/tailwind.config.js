module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fr: "Circular",
        ar: "Noto",
      },
      colors: {
        primary: "#18BFC3",
        secondary: "#041D57",
        dark: "#333333",
        lightDark: "#767676",
        light: "#f8f8f8",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
