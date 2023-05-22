/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#000000',
      highlight: '#F79327',
      secondary: '#837e7c',
      point: '#edf4ac',
    },
    boxShadow: {
      highlight: '#F79327 0px 0px 6px 0px',
      card: 'rgba(0, 0, 0, 0.2) 0px 0px 5px 0px',
      'card-pop': 'rgba(0, 0, 0, 0.1) 2px 3px 5px 2px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      margin: {
        'zero-auto': '0 auto',
      },
    },
  },
  plugins: [],
};
