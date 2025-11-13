/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#623717',
        secondary: '#059669',
        success: '#10b981',
        error: '#ef4444',
      },
      fontFamily: {
        main: ['"Text Me One"', 'sans-serif'],
      },
      keyframes: {
        fadeOut: {
          '0%,70%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeOut: 'fadeOut 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}