/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1/3': '33%',
        '1/2': '50%',
        '2/7': '28%',
        '9/10': '90%'
        
      },
      colors: {
        'wholeBg': 'rgba(18, 18, 18, 0.95)',
        'leftBg': 'rgba(255, 255, 255, 0.90)',
        'btnClr': '#CCE66D',
        'repClr': '#1D1D1D',
        'plnrClr': '#6B7F21'
      },
    },

  },
  plugins: [],
}

