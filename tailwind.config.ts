import daisyui from "daisyui";
import typograhpy from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typograhpy, daisyui],
  daisyui: {
    themes: ["dim"],
    logs: true,
  },
} satisfies Config;
