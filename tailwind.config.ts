import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        heading: ["Sitka", "Sitka Text", "Sitka Heading", "serif"],
      },
      colors: {
        slateblue: "#2F3E6F", // Primary Blue
        medical: "#F0F4F8",   // Subtle Blue Tint
        cyanline: "#E8BE56",  // Primary Yellow
        ink: "#000000",       // Black
        mist: "#F5F8FB",
        "brand-blue": "#2F3E6F",
        "brand-yellow": "#E8BE56",
        "brand-pink": "#ED6E80",
        "brand-black": "#000000",
        "brand-white": "#FFFFFF",
      },
      boxShadow: {
        premium: "0 24px 80px rgba(47, 62, 111, 0.14)",
        soft: "0 14px 40px rgba(47, 62, 111, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
