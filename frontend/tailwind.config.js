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
        "primary-50": "#e1f8f9",
        "primary-100": "#b4edf0",
        "primary-200": "#83e1e8",
        "primary-300": "#53d5df",
        "primary-400": "#31cbd8",
        "primary-500": "#15b2c0",
        primary: "#15b2c0",
        "primary-600": "#15b2c0",
        "primary-700": "#149ca6",
        "primary-800": "#13888f",
        "primary-900": "#0f6564",

        "secondary-50": "#FFF0F0",
        "secondary-100": "#FFA8A8",
        "secondary-200": "#FF8A8A",
        "secondary-300": "#FF6D6D",
        "secondary-400": "#FF5050",
        "secondary-500": "#FF3131",
        secondary: "#FF3131",
        "secondary-600": "#FF0707",
        "secondary-700": "#DB0000",
        "secondary-800": "#AF0000",
        "secondary-900": "#830000",

        link: "#f28e72",
        dark: "#15273F",
        lightDark: "#8896A9",
        light: "#f5f7fa",
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
      boxShadow: {
        aside: "0 0.3125rem 1rem -0.1875rem rgb(0 0 0 / 20%)",
        header: "0 0.375rem 0.875rem rgb(0 0 0 / 10%)",
        "header-light": "0 0.125rem 0.1875rem -0.125rem rgb(0 0 0 / 20%)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
