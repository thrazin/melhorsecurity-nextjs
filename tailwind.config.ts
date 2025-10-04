import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Aqui definimos nossa fonte padrão 'sans' para usar a variável da fonte Roboto Flex
        sans: ["var(--font-roboto-flex)"],
      },
    },
  },
  plugins: [],
};
export default config;