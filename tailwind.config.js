/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'lgt': {
          'max': '1024px'
        },
      }
    },
  },
  plugins: [],
}