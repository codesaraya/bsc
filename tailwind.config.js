/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#42C6D9',
        secondary: '#E91E90',
        dark: '#1A1464',
        background: '#ffffff',
        foreground: '#171717',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
