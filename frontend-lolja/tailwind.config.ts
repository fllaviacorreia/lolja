import type { Config } from "tailwindcss";

export default {
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
        cl3: "#B8001F",
        cl2: "#507687",
        cl4: "#384B70",
        cl1: "#FCFAEE",
      },
    },
  },
  plugins: [],
} satisfies Config;
