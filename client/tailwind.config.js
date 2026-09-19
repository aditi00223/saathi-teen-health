/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#b0245f',
        'primary-container': '#d6457f',
        'on-primary': '#ffffff',
        'on-primary-container': '#ffe4ef',
        'primary-fixed': '#ffd9e6',
        'primary-fixed-dim': '#ffb1cd',
        'on-primary-fixed': '#3e001d',
        'on-primary-fixed-variant': '#8c0b47',

        'secondary': '#006a61',
        'secondary-container': '#86f2e4',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#006f66',
        'secondary-fixed': '#89f5e7',
        'secondary-fixed-dim': '#6bd8cb',
        'on-secondary-fixed': '#00201d',

        'surface': '#fdf7ff',
        'surface-dim': '#ded6ed',
        'surface-bright': '#fdf7ff',
        'surface-variant': '#e7dff6',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f8f1ff',
        'surface-container': '#f2ebff',
        'surface-container-high': '#ede5fc',
        'surface-container-highest': '#e7dff6',

        'on-surface': '#1d1929',
        'on-surface-variant': '#4a4455',

        'outline': '#7b7487',
        'outline-variant': '#ccc3d8',

        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',

        'tertiary': '#8f1e62',
        'tertiary-container': '#ae397b',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#ffdce9',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      spacing: {
        'margin': '1rem',
        'gutter': '1rem',
      }
    },
  },
  plugins: [],
}
