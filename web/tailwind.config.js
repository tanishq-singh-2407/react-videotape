/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./web/pages/**/*.{ts,tsx}', './web/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'], // IDK why but this works from root dir.
    theme: {
        extend: {}
    },
    plugins: []
};
