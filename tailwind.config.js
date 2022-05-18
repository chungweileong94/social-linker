/* eslint-disable import/no-extraneous-dependencies */

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}', './node_modules/flowbite/**/*.js'],
  theme: {},
  plugins: [require('flowbite/plugin')],
};
