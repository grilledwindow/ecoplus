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
      height: {
        '144': '36rem',
      },
      width: {
        '144': '36rem',
      },
      colors: {
        primary: '#a2d729',
      },
      spacing: {
        '88': '22rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
