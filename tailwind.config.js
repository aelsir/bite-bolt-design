/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary accent - used for active, focus, CTA, selection states
        accent: {
          DEFAULT: '#5A23B1',
          dark: '#7C3AED', // For dark mode
        },
        // Grayscale system
        text: {
          high: '#0F172A',
          body: '#475569',
          subtle: '#A1A1AA',
          // Dark mode variants
          'high-dark': '#F9FAFB',
          'body-dark': '#E2E8F0',
          'subtle-dark': '#64748B',
        },
        stroke: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#09090B',
        },
        subsurface: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        // Status colors
        status: {
          open: '#10B981',
          closed: '#6B7280',
        }
      },
      spacing: {
        // 8pt spacing system
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '22': '88px', // For 88x88 image
        '24': '96px', // For logo size
      },
      borderRadius: {
        'pill': '24px',
        'card': '8px',
      },
      boxShadow: {
        'hover': '0 4px 8px rgba(0, 0, 0, 0.08)',
      },
      transitionDuration: {
        'button': '150ms',
        'slide': '250ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      fontSize: {
        '15': '15px',
        '16': '16px',
        '20': '20px',
      },
      minHeight: {
        'tap-target': '48px',
      },
      minWidth: {
        'tap-target': '48px',
      }
    },
  },
  plugins: [],
};