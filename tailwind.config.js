/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    extend: {
        fontFamily: {
            cinzel: ['"Cinzel Decorative"', 'serif'], // base font
        },
        fontWeight: {
            // optional: define aliases for clarity
            regular: '400',
            bold: '700',
            black: '900',
        },
    },
    },
    plugins: [],
};
