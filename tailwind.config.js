/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#4E9AF1', // Portfolio-1 accent blue
        moonGlow: '#E6B980', // Portfolio-1 moon glow
        dark: {
          100: '#1A1F2B', // Portfolio-1 main background
          200: '#252a3a', // Lighter variant
          300: '#2f3441', // Card backgrounds
          400: '#393e4d', // Border colors
          500: '#434959', // Hover states
          600: '#4d5365', // Disabled states
          700: '#575d71', // Secondary text
          800: '#61677d', // Light text
          900: '#F1F1F1', // Primary text (portfolio-1 textPrimary)
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'noise': 'noise 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        noise: {
          '0%, 100%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '10% 10%' },
          '20%': { backgroundPosition: '-10% -10%' },
          '30%': { backgroundPosition: '15% -15%' },
          '40%': { backgroundPosition: '-15% 15%' },
          '50%': { backgroundPosition: '-10% 10%' },
          '60%': { backgroundPosition: '15% 10%' },
          '70%': { backgroundPosition: '0% 15%' },
          '80%': { backgroundPosition: '-15% 0%' },
          '90%': { backgroundPosition: '10% -15%' },
        },
      },
      zIndex: {
        '100': '100',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'noise': "url('/public/images/paper.png')",
      },
    },
  },
  plugins: [],
}

