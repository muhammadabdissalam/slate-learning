module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'main-black': '#404040',
      },
      fontFamily: {
        paragraph: ['Poppins'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
