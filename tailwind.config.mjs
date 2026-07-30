/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        concrete: {
          50:  '#f7f6f4',
          100: '#ede9e4',
          200: '#d8d2ca',
          300: '#bcb4aa',
          400: '#9e9488',
          500: '#85786a',
          600: '#6c6258',
          700: '#534e47',
          800: '#3b3832',
          900: '#232220',
          950: '#0d0c0a',
        },
        bronze: {
          300: '#e8c97e',
          400: '#d4a84e',
          500: '#c9a96e',
          600: '#a67835',
          700: '#8a6228',
        },
      },
      fontSize: {
        '8xl':  ['6rem',  { lineHeight: '1' }],
        '9xl':  ['8rem',  { lineHeight: '0.95' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '12xl': ['14rem', { lineHeight: '0.85' }],
      },
      spacing: {
        '128': '32rem',
        '160': '40rem',
      },
      animation: {
        'heartbeat':  'heartbeat 2.5s ease-in-out infinite',
        'fade-up':    'fadeUp 0.8s ease-out forwards',
        'line-grow':  'lineGrow 1.2s ease-out forwards',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)',    boxShadow: '0 0 0 0 rgba(201,169,110,0.4)' },
          '50%':      { transform: 'scale(1.06)', boxShadow: '0 0 0 12px rgba(201,169,110,0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          from: { width: '0%' },
          to:   { width: '100%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
