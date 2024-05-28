import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        prmColor: "#FF9400",
        color: "#FFAB00",
        btnColor: "#145365",
        btnColor1: "#1B1E30",
        btnHoverColor: "#0A2A33",
        btnHoverColor1: "#1B1E24"
      }
    },
  },
  plugins: [],
};
export default config;
