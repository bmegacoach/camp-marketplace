/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Design tokens from design-tokens.json
        bg: {
          base: '#0B172E',
          surface: '#0F1D32',
          elevated: '#142438',
          spotlight: '#182A42',
        },
        accent: {
          primary: '#2563EB',
          'primary-hover': '#3B82F6',
          'primary-muted': 'rgba(37, 99, 235, 0.15)',
          glow: 'rgba(37, 99, 235, 0.4)',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
          accent: '#2563EB',
        },
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        rank: {
          bronze: '#CD7F32',
          silver: '#C0C0C0',
          gold: '#FFD700',
          platinum: '#E5E4E2',
          diamond: '#B9F2FF',
        },
        // Legacy colors for backwards compatibility
        navy: {
          DEFAULT: '#0B172E',
          50: '#1C2541',
          100: '#162036',
        },
        electric: {
          DEFAULT: '#2563EB',
          500: '#3B82F6',
          600: '#2563EB',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.5' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'mono-lg': ['20px', { lineHeight: '1.2', fontWeight: '500' }],
        'mono-md': ['16px', { lineHeight: '1.3', fontWeight: '500' }],
        'mono-sm': ['14px', { lineHeight: '1.4' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.4)',
        'card-hover': '0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.5)',
        'modal': '0 0 0 1px rgba(255,255,255,0.1), 0 16px 48px rgba(0,0,0,0.6)',
        'glow-accent': '0 0 20px rgba(37,99,235,0.4), 0 0 40px rgba(37,99,235,0.2)',
        'glow-success': '0 0 12px rgba(16,185,129,0.4)',
      },
      animation: {
        'fade-in': 'fade-in 250ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
        'scale-in': 'scale-in 300ms ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
      borderColor: {
        'subtle': 'rgba(255, 255, 255, 0.06)',
        'moderate': 'rgba(255, 255, 255, 0.1)',
        'strong': 'rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
