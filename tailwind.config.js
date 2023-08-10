/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      margin: {
        'zero-auto': '0 auto',
      },
      colors: {
        primary: '#000000',
        highlight: '#00c6a0',
        secondary: '#837e7c',
        point: '#00c6a0',
        lightgrey: '#f1f3f4',
        white: '#ffffff',
      },
      boxShadow: {
        highlight: '#F79327 0px 0px 6px 0px',
        card: 'rgba(0, 0, 0, 0.2) 0px 0px 5px 0px',
        'card-pop': 'rgba(0, 0, 0, 0.1) 2px 3px 5px 2px',
        input: '#ddd 0 0 10px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
