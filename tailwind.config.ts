import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Aponta para TODOS os arquivos dentro da pasta 'src'
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto-flex)"],
      },
    },
  },
  plugins: [],
};
export default config;