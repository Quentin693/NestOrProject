import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#c72027',
        'primary-red-dark': '#a01a20',
        'secondary-yellow': '#fef08a',
      },
    },
  },
  plugins: [],
};

export default config;
