module.exports = {
  content: ['./src/{pages,components}/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
}
