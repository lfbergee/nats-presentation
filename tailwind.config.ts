import daisyui from "daisyui";
import typograhpy from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [typograhpy, daisyui],
  daisyui: {
    theme: true,
    logs: false,
  },
} satisfies Config;
