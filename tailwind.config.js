/* eslint-disable import/no-extraneous-dependencies */

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        md: '10%',
        lg: '15%',
        xl: '23%',
        '2xl': '21%',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    prefix: 'dui-',
  },
};
