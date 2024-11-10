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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        'clamp-lg': 'clamp(40px, 5vw + 1rem, 60px)', // Custom utility class
      },
      fontFamily: {
        lucida: ['Lucida Sans', 'Lucida Sans Regular','Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #fac37b, transparent)',
      },
    },
  },
  plugins: [],
};
export default config;
