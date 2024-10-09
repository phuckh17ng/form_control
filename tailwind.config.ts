import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-text)",
        background: "var(--color-background)",
        icon: "var(--color-icon)",
        border: "var(--color-border)",
        card: "var(--color-card)",
      },
    },
    fontFamily: {
      pacifico: ["Pacifico", "cursive"],
    },
  },
  plugins: [],
};
export default config;
