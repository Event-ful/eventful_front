/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        green: {
          200: '#F1FDFA',
          300: '#00D5BE',
          400: '#009689',
          500: '#00786F',
        },
        blue: {
          100: '#EFF6FF',
          300: '#50A2FF',
        },
        yellow: {
          100: '#FFFBEA',
          300: '#FFB900',
        },
        black: {
          200: '#D1D1D1',
          300: '#697282',
          400: '#1E2938',
          500: '#0A0A0A',
        },
        white: {
          50: '#FFFFFF',
          100: '#FAFAFA',
        },
        red: {
          100: '#EC807E',
          200: '#EC2025',
        },
      },
    },
  },
  plugins: [],
};
