module.exports = () => ({
  plugins: [
    require('tailwindcss'),
    require('postcss-nesting'),
    require('flex-gap-polyfill'),
  ],
})
