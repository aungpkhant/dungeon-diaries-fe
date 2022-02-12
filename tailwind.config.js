// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        gray: colors.neutral,
      },
    },
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      heading: ['Munro', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
