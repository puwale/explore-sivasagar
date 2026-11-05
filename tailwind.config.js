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
          950: '#071B16',
          900: '#0C2820',
          800: '#12382D',
          700: '#1B4D3E',
          600: '#266654',
          500: '#35826C',
        },
        ivory: {
          50: '#FAF7F2',
          100: '#F4EFE5',
          200: '#E8E0D1',
          300: '#D8D0C1',
          400: '#C4B9A5',
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
          900: '#181C19',
          800: '#252A26',
          700: '#343B36',
          600: '#4A534D',
          500: '#68736B',
          400: '#A9B3AA',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 16px 32px -12px rgba(7, 27, 22, 0.18)',
        'luxury-hover': '0 20px 40px -12px rgba(7, 27, 22, 0.24)',
        'gold-glow': '0 0 24px -6px rgba(198, 165, 107, 0.25)',
      },
    },
  },
  plugins: [],
}
