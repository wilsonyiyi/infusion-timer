/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2D6CF6",
        medical: {
          bg: "#F4F7FA",
          light: "#F8FAFC",
          dark: "#0F172A",
        },
        liquid: {
          cyan: "#4DD0E1",
        },
      },
      fontFamily: {
        display: ["Lexend", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
