/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        DEFAULT: {
          track: 'rounded-md bg-gray-300',
          thumb: 'rounded-md bg-blue-500 hover:bg-blue-700',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

