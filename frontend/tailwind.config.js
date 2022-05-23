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
        "primary-50": "#C8F7F8",
        "primary-100": "#90F0F1",
        "primary-200": "#46E5E8",
        "primary-300": "#21E0E4",
        "primary-400": "#1AD3D6",
        "primary-500": "#18BFC3",
        primary: "#18BFC3",
        "primary-600": "#16B3B5",
        "primary-700": "#139799",
        "primary-800": "#107C7D",
        "primary-900": "#094546",
        secondary: "#041D57",
        dark: "#333232",
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
      boxShadow: {
        header: "0 0.375rem 0.875rem rgb(0 0 0 / 10%)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
