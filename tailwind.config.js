/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/*'
  ],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
