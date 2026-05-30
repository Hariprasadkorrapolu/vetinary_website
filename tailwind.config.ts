import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        slateblue: "#2F4F6F",
        medical: "#EAF6FB",
        cyanline: "#8EE7F3",
        ink: "#132337",
        mist: "#F5F8FB"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(47, 79, 111, 0.14)",
        soft: "0 14px 40px rgba(19, 35, 55, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
