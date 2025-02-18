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
      },
      fontFamily: {
        "outfit": ["var(--font-outfit)"],
        "inter": ["var(--font-inter)"],
        "noto-sans-tc": ["var(--font-noto-sans-tc)"],
        "noto-serif-sc": ["var(--font-noto-serif-sc)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
