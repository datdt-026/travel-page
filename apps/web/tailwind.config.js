/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════
      // QUIET LUXURY COLOR PALETTE
      // ═══════════════════════════════════════════════════════════════════
      colors: {
        // Background colors - Warm off-whites
        surface: {
          primary: '#FAFAF8',     // Main background
          secondary: '#F5F5F3',   // Section background
          tertiary: '#EFEFE9',    // Cards, containers
          dark: '#1C1C1C',        // Dark sections
        },
        // Text colors - Charcoal spectrum
        content: {
          primary: '#2C2C2C',     // Main headings
          secondary: '#4A4A4A',   // Body text
          muted: '#7A7A7A',       // Captions
          light: '#A0A0A0',       // Labels
          inverse: '#FAFAF8',     // On dark backgrounds
        },
        // Accent - Champagne / Muted Gold
        accent: {
          DEFAULT: '#C4A35A',     // Primary accent
          light: '#D4B978',       // Light variant
          dark: '#B89B4A',        // Dark variant
          subtle: 'rgba(196, 163, 90, 0.1)', // Very subtle
        },
        // Borders
        border: {
          light: '#E8E8E4',
          DEFAULT: '#D4D4CC',
          dark: '#3A3A3A',
        },
        // Semantic (muted)
        success: '#6B8E6B',
        warning: '#C4A35A',
        error: '#A65D5D',
      },

      // ═══════════════════════════════════════════════════════════════════
      // TYPOGRAPHY - Editorial, Magazine-style
      // ═══════════════════════════════════════════════════════════════════
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'Times New Roman', 'serif'],
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Display - Hero headlines
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '300' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '300' }],
        
        // Headlines
        'heading-xl': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '400' }],
        'heading-lg': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.25', fontWeight: '400' }],
        'heading-md': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '400' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
        
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.8', letterSpacing: '0.01em', fontWeight: '300' }],
        'body-md': ['1rem', { lineHeight: '1.75', letterSpacing: '0.01em', fontWeight: '300' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7', letterSpacing: '0.01em', fontWeight: '300' }],
        
        // Labels & Captions (uppercase tracking)
        'label-lg': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.15em', fontWeight: '400' }],
        'label-md': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.2em', fontWeight: '400' }],
        'label-sm': ['0.625rem', { lineHeight: '1.5', letterSpacing: '0.25em', fontWeight: '500' }],
        
        // Caption
        'caption': ['0.8125rem', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '300' }],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0em',
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.2em',
        editorial: '0.15em',     // For uppercase labels
        luxury: '0.25em',        // For luxury accents
      },

      // ═══════════════════════════════════════════════════════════════════
      // SPACING - Generous whitespace
      // ═══════════════════════════════════════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },

      // ═══════════════════════════════════════════════════════════════════
      // LAYOUT
      // ═══════════════════════════════════════════════════════════════════
      maxWidth: {
        'prose': '65ch',
        'content': '1200px',
        'wide': '1400px',
        'full': '100%',
      },
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
        'cinematic': '21/9',
        'editorial': '2/3',
        'hero': '16/10',
      },

      // ═══════════════════════════════════════════════════════════════════
      // ANIMATIONS - Subtle, smooth
      // ═══════════════════════════════════════════════════════════════════
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      // ═══════════════════════════════════════════════════════════════════
      // SHADOWS - Subtle, elegant
      // ═══════════════════════════════════════════════════════════════════
      boxShadow: {
        'subtle': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 12px rgba(0, 0, 0, 0.06)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'elevated': '0 20px 60px rgba(0, 0, 0, 0.1)',
        'hover': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },

      // ═══════════════════════════════════════════════════════════════════
      // BORDERS - Minimal, refined
      // ═══════════════════════════════════════════════════════════════════
      borderRadius: {
        'subtle': '2px',
        'soft': '4px',
        'medium': '8px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
