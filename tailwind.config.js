import formsPlugin from "@tailwindcss/forms";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      perspective: {
        1000: '1000px', 
      },
      keyframes: {
        spinY: {
          "0%": { transform: 'rotateY(0deg)' },
          "100%": { transform: 'rotateY(360deg)' },
        },
        spinner: {
          "0%": { transform: 'rotate(0deg)' },
          "100%": { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        "spin-slowerY": "spinY 2.5s linear infinite",
        "spin-around": "spinner 2s linear infinite"
      },
    },
  },
  plugins: [formsPlugin],
};
