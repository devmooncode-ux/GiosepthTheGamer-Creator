/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0a0a0c',
          900: '#101015',
          850: '#15151c',
          800: '#1a1a23',
          750: '#20202b',
          700: '#262633',
          600: '#2e2e3d',
          500: '#3a3a4d',
          400: '#4a4a60',
          300: '#6a6a82',
        },
        cyan: {
          DEFAULT: '#00e5ff',
          400: '#33ecff',
          500: '#00e5ff',
          600: '#00c2d9',
          700: '#0099ad',
        },
        energy: {
          DEFAULT: '#2d7eff',
          400: '#5a9fff',
          500: '#2d7eff',
          600: '#1a5fd9',
          700: '#0d40a3',
        },
        gold: {
          DEFAULT: '#f5b820',
          300: '#ffd06a',
          400: '#f5b820',
          500: '#e0a010',
          600: '#b8800a',
        },
        ember: {
          DEFAULT: '#ff6a1a',
          400: '#ff8a4a',
          500: '#ff6a1a',
          600: '#d9520a',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '38': '9.5rem',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.75rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        'energy-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'line-expand': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'energy-pulse': 'energy-pulse 3s ease-in-out infinite',
        'line-expand': 'line-expand 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
