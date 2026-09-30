import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        "gold-hr": "#e9c57c",
        "gold-hr-dark": "#bd9b57",
        "fl-blue": "#0271bd",
        "fl-celeste": "#73eafe",
        "fl-purplu": "#6923b7",
        // Paleta oficial Family Love
        "fl-navy": "#1a3a6b",
        "fl-azul": "#2251a3",
      },
      transitionDuration: {
        "1200": "1200ms",
        "1300": "1300ms",
        "1400": "1400ms",
        "1500": "1500ms",
        "1800": "1800ms",
        "2000": "2000ms",
      },
      transitionTimingFunction: {
        "in-slider": "cubic-bezier(0.9, 0, 0.2, 1)",
        "in-slow": "cubic-bezier(0.4, 0, 1, 1)",
      },
      fontFamily: {
        // Texto: Inter · Títulos: Plus Jakarta Sans
        sans: ["Inter Variable", "Inter", ...fontFamily.sans],
        display: ["Plus Jakarta Sans Variable", "Plus Jakarta Sans", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;