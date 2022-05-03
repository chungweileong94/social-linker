/* eslint-disable import/no-extraneous-dependencies */

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#ab47bc',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
