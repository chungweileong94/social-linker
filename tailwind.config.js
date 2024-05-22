/* eslint-disable import/no-extraneous-dependencies */

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
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
    extend: {
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'tranlate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    prefix: 'dui-',
  },
};
