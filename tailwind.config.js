/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#071511',
          900: '#0F2620',
          800: '#173B32',
          700: '#1E4E42',
          600: '#2A6657',
          500: '#388371',
        },
        ivory: {
          50: '#FAF8F4',
          100: '#F5F1E8',
          200: '#EBE3D3',
          300: '#DDD1B8',
          400: '#CBBBA0',
        },
        gold: {
          300: '#E2CA9D',
          400: '#D5B77E',
          500: '#C6A56B',
          600: '#AB894E',
          700: '#8A6D3A',
        },
        charcoal: {
          950: '#0D0F0E',
          900: '#151816',
          800: '#202522',
          700: '#2F3632',
          600: '#464F4A',
          500: '#647069',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(15, 38, 32, 0.25)',
        'luxury-hover': '0 30px 60px -15px rgba(15, 38, 32, 0.35)',
        'gold-glow': '0 0 35px -5px rgba(198, 165, 107, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

