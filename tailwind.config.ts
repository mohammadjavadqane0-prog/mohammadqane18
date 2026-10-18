import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#172D26", deep: "#10231D", darkest: "#0B1A15" },
        nav: "#171613",
        ivory: "#E9E1D1",
        beige: "#DCD1BD",
        gold: { DEFAULT: "#D8B16A", muted: "#B99252", soft: "#E5C893" },
        mustard: "#C79535",
        charcoal: "#24231F",
        ink: "#1C1B18",
        cream: "#F4EFE4",
      },
      fontFamily: {
        heading: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      maxWidth: {
        luxe: "1360px",
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.12em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.5s ease both",
        "scale-in": "scaleIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
