import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Esta linha garante que QUALQUER arquivo com essas extensões dentro de 'src' seja lido
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