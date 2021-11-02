module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/public/*.html',
      './src/public/js/*.js',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'montserrat': "'Montserrat', sans-serif"
    },
    extend: {
      colors: {
        primary: '#a2d729',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
