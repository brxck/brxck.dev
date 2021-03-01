module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': {
                color: theme('colors.indigo.500'),
              },
            },
            h1: {
              color: theme('colors.indigo.600'),
              fontStyle: 'italic',
            },
            h2: {
              color: theme('colors.indigo.600'),
              fontStyle: 'italic',
            },
            h3: {
              color: theme('colors.indigo.600'),
              fontStyle: 'italic',
            },
            h4: {
              color: theme('colors.indigo.600'),
              fontStyle: 'italic',
            },
          },
        },

        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.green.400'),
              '&:hover': {
                color: theme('colors.green.500'),
              },
            },
            h1: {
              color: theme('colors.green.400'),
            },
            h2: {
              color: theme('colors.green.400'),
            },
            h3: {
              color: theme('colors.green.400'),
            },
            h4: {
              color: theme('colors.green.400'),
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.green.400'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['responsive', 'dark'],
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
