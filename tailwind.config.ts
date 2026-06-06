import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",
          slate: "#1E293B",
          amber: "#F59E0B",
          amberLight: "#FCD34D",
          light: "#F8FAFC",
          success: "#10B981",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      animation: {
        "truck-slide": "truckSlide 20s linear infinite",
        "fade-up": "fadeUp 0.5s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        truckSlide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(120vw)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
