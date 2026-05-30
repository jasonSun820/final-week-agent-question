import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101114",
        muted: "#676b73",
        line: "#e7e9ee",
        soft: "#f6f7f9",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(16, 17, 20, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
