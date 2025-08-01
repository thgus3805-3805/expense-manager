import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-start-rgb))",
        foreground: "rgb(var(--foreground-rgb))",
      },
      backgroundColor: {
        'white/80': 'rgba(255, 255, 255, 0.8)',
        'white/50': 'rgba(255, 255, 255, 0.5)',
        'blue-50/50': 'rgba(239, 246, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config; 