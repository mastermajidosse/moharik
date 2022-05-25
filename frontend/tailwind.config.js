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
        // "primary-50": "#C8F7F8",
        // "primary-100": "#90F0F1",
        // "primary-200": "#46E5E8",
        // "primary-300": "#21E0E4",
        // "primary-400": "#1AD3D6",
        // "primary-500": "#18BFC3",
        // primary: "#18BFC3",
        // "primary-600": "#16B3B5",
        // "primary-700": "#139799",
        // "primary-800": "#107C7D",
        // "primary-900": "#094546",
        // secondary: "#041D57",
        // dark: "#333232",
        // lightDark: "#767676",
        // light: "#f8f8f8",

        "primary-50": "#ECF2FF",
        "primary-100": "#90B1FF",
        "primary-200": "#6A97FF",
        "primary-300": "#457DFF",
        "primary-400": "#2063FF",
        "primary-500": "#004AFB",
        primary: "#004AFB",
        "primary-600": "#0040D6",
        "primary-700": "#0036B3",
        "primary-800": "#002B8F",
        "primary-900": "#00206B",

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
        header: "0 0.375rem 0.875rem rgb(0 0 0 / 10%)",
        "header-light": "0 0.125rem 0.1875rem -0.125rem rgb(0 0 0 / 20%)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
