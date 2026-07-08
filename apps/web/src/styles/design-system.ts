/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LUXURY TRAVEL DESIGN SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Philosophy: "Quiet Luxury" - Understated elegance, editorial feel
 * Inspired by: Aman Resorts, Condé Nast Traveller, Monocle Magazine
 * 
 * Core Principles:
 * 1. Generous whitespace - Let content breathe
 * 2. Neutral palette - Sophistication through restraint
 * 3. Editorial typography - Magazine-quality headlines
 * 4. Subtle interactions - Smooth, unhurried animations
 * 5. Photography-first - Large, atmospheric imagery
 */

// ═══════════════════════════════════════════════════════════════════════════
// COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════════════

export const colors = {
  // Primary Neutrals
  background: {
    primary: '#FAFAF8',      // Warm off-white (main background)
    secondary: '#F5F5F3',    // Slightly darker for sections
    tertiary: '#EFEFE9',     // Cards, subtle containers
    dark: '#1C1C1C',         // Dark sections, footer
    overlay: 'rgba(28, 28, 28, 0.4)', // Image overlays
  },

  // Text Colors
  text: {
    primary: '#2C2C2C',      // Dark charcoal (main headings)
    secondary: '#4A4A4A',    // Body text
    muted: '#7A7A7A',        // Captions, metadata
    light: '#A0A0A0',        // Subtle labels
    inverse: '#FAFAF8',      // White text on dark
  },

  // Accent - Champagne/Sand/Muted Gold
  accent: {
    primary: '#C4A35A',      // Muted gold (primary accent)
    secondary: '#D4B978',    // Lighter champagne
    tertiary: '#B89B4A',     // Darker gold for emphasis
    subtle: 'rgba(196, 163, 90, 0.1)', // Very subtle gold tint
  },

  // Utility Colors
  border: {
    light: '#E8E8E4',        // Light borders
    medium: '#D4D4CC',       // Medium borders
    dark: '#3A3A3A',         // Dark mode borders
  },

  // Semantic Colors (used sparingly)
  status: {
    success: '#6B8E6B',      // Muted sage green
    warning: '#C4A35A',      // Uses accent gold
    error: '#A65D5D',        // Muted terracotta
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════

export const typography = {
  // Font Families
  fontFamily: {
    // Heading: Elegant serif or refined sans-serif
    heading: '"Cormorant Garamond", "Times New Roman", Georgia, serif',
    // Alternative: Use Inter for clean modern look
    // heading: '"Inter", system-ui, -apple-system, sans-serif',
    
    // Body: Clean, highly readable
    body: '"Inter", system-ui, -apple-system, sans-serif',
    
    // Accent: For labels, captions (tracking-wide)
    accent: '"Inter", system-ui, -apple-system, sans-serif',
  },

  // Font Sizes (with line heights)
  fontSize: {
    // Display - Hero headlines
    'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
    'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '300' }],
    'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '300' }],

    // Headlines
    'heading-xl': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '0em', fontWeight: '400' }],
    'heading-lg': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.25', letterSpacing: '0em', fontWeight: '400' }],
    'heading-md': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '400' }],
    'heading-sm': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],

    // Body Text
    'body-lg': ['1.125rem', { lineHeight: '1.8', letterSpacing: '0.01em', fontWeight: '300' }],
    'body-md': ['1rem', { lineHeight: '1.75', letterSpacing: '0.01em', fontWeight: '300' }],
    'body-sm': ['0.875rem', { lineHeight: '1.7', letterSpacing: '0.01em', fontWeight: '300' }],

    // Labels & Captions
    'label-lg': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.15em', fontWeight: '400', textTransform: 'uppercase' }],
    'label-md': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.2em', fontWeight: '400', textTransform: 'uppercase' }],
    'label-sm': ['0.625rem', { lineHeight: '1.5', letterSpacing: '0.25em', fontWeight: '500', textTransform: 'uppercase' }],

    // Caption
    'caption': ['0.8125rem', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '300' }],
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.2em',
    editorial: '0.15em',   // For uppercase labels
    luxury: '0.25em',      // For luxury accents
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SPACING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

export const spacing = {
  // Base spacing scale (in rem)
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',

  // Section Spacing (generous whitespace)
  section: {
    sm: '4rem',      // py-16
    md: '6rem',      // py-24
    lg: '8rem',      // py-32
    xl: '10rem',     // py-40
  },

  // Container Padding
  container: {
    sm: '1.5rem',    // px-6
    md: '2rem',      // px-8
    lg: '3rem',      // px-12
    xl: '4rem',      // px-16
  },

  // Content Gaps
  gap: {
    xs: '0.5rem',    // gap-2
    sm: '1rem',      // gap-4
    md: '1.5rem',    // gap-6
    lg: '2rem',      // gap-8
    xl: '3rem',      // gap-12
    '2xl': '4rem',   // gap-16
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════════════════════════════════════════

export const layout = {
  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  },

  // Max widths for content
  maxWidth: {
    prose: '65ch',           // Optimal reading width
    content: '1200px',       // Standard content
    wide: '1400px',          // Wide content
    full: '100%',            // Full width
  },

  // Grid configurations
  grid: {
    cols: {
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
  },

  // Aspect ratios
  aspectRatio: {
    square: '1 / 1',
    video: '16 / 9',
    portrait: '3 / 4',
    landscape: '4 / 3',
    cinematic: '21 / 9',
    editorial: '2 / 3',      // Magazine-style
    hero: '16 / 10',         // Hero sections
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATIONS & TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════════

export const animation = {
  // Timing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    elegant: 'cubic-bezier(0.16, 1, 0.3, 1)',   // Smooth, refined
    reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',   // For reveal animations
  },

  // Durations
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
    reveal: '800ms',         // Content reveal
    image: '600ms',          // Image transitions
  },

  // Keyframe animations
  keyframes: {
    fadeIn: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    fadeInUp: {
      from: { opacity: '0', transform: 'translateY(20px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    fadeInDown: {
      from: { opacity: '0', transform: 'translateY(-20px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    reveal: {
      from: { opacity: '0', transform: 'translateY(30px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    scaleIn: {
      from: { opacity: '0', transform: 'scale(0.98)' },
      to: { opacity: '1', transform: 'scale(1)' },
    },
    slideInLeft: {
      from: { opacity: '0', transform: 'translateX(-30px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
    slideInRight: {
      from: { opacity: '0', transform: 'translateX(30px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SHADOWS & EFFECTS
// ═══════════════════════════════════════════════════════════════════════════

export const effects = {
  // Box shadows (subtle, elegant)
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 4px 12px rgba(0, 0, 0, 0.06)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.08)',
    xl: '0 20px 60px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
    // Hover states
    hover: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },

  // Border radius (minimal, refined)
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },

  // Backdrop blur
  backdropBlur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT TOKENS
// ═══════════════════════════════════════════════════════════════════════════

export const components = {
  // Button styles
  button: {
    primary: {
      bg: colors.text.primary,
      text: colors.text.inverse,
      hoverBg: '#3A3A3A',
      padding: '1rem 2rem',
      letterSpacing: typography.letterSpacing.editorial,
    },
    secondary: {
      bg: 'transparent',
      text: colors.text.primary,
      border: colors.border.medium,
      hoverBg: colors.background.tertiary,
      padding: '1rem 2rem',
    },
    accent: {
      bg: colors.accent.primary,
      text: colors.text.primary,
      hoverBg: colors.accent.secondary,
      padding: '1rem 2rem',
    },
  },

  // Card styles
  card: {
    bg: colors.background.primary,
    border: colors.border.light,
    shadow: effects.shadow.sm,
    hoverShadow: effects.shadow.lg,
    radius: effects.borderRadius.lg,
  },

  // Input styles
  input: {
    bg: colors.background.primary,
    border: colors.border.light,
    focusBorder: colors.text.primary,
    radius: effects.borderRadius.sm,
    padding: '0.875rem 1rem',
  },

  // Navigation
  nav: {
    height: {
      desktop: '5rem',       // 80px
      mobile: '4rem',        // 64px
    },
    bg: {
      transparent: 'transparent',
      solid: colors.background.primary,
      blur: 'rgba(250, 250, 248, 0.9)',
    },
  },

  // Hero
  hero: {
    minHeight: {
      sm: '50vh',
      md: '70vh',
      lg: '85vh',
      full: '100vh',
    },
    overlay: {
      light: 'rgba(28, 28, 28, 0.3)',
      medium: 'rgba(28, 28, 28, 0.5)',
      dark: 'rgba(28, 28, 28, 0.7)',
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TAILWIND CLASS HELPERS
// ═══════════════════════════════════════════════════════════════════════════

export const tw = {
  // Container classes
  container: 'max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12',
  containerNarrow: 'max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12',
  containerProse: 'max-w-prose mx-auto px-6',

  // Section spacing
  sectionSm: 'py-16 md:py-20',
  sectionMd: 'py-20 md:py-28',
  sectionLg: 'py-24 md:py-32',
  sectionXl: 'py-32 md:py-40',

  // Typography
  displayXl: 'text-display-xl font-light tracking-tight',
  displayLg: 'text-display-lg font-light tracking-tight',
  headingXl: 'text-heading-xl font-normal',
  headingLg: 'text-heading-lg font-normal',
  headingMd: 'text-heading-md font-normal',
  bodyLg: 'text-body-lg font-light leading-relaxed',
  bodyMd: 'text-body-md font-light leading-relaxed',
  label: 'text-label-md uppercase tracking-editorial',

  // Buttons
  btnPrimary: 'inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white text-sm tracking-editorial uppercase transition-all duration-300 hover:bg-stone-800',
  btnSecondary: 'inline-flex items-center justify-center px-8 py-4 border border-stone-300 text-stone-900 text-sm tracking-editorial uppercase transition-all duration-300 hover:bg-stone-100',
  btnGhost: 'inline-flex items-center justify-center px-8 py-4 text-stone-600 text-sm tracking-wide transition-all duration-300 hover:text-stone-900',

  // Cards
  card: 'bg-stone-50 transition-all duration-500',
  cardHover: 'hover:shadow-lg hover:-translate-y-1',

  // Animations
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
  reveal: 'animate-reveal',

  // Utilities
  accent: 'text-accent-primary',
  muted: 'text-stone-500',
  divider: 'w-16 h-px bg-stone-300',
  dividerAccent: 'w-16 h-px bg-accent-primary',
} as const;

export default {
  colors,
  typography,
  spacing,
  layout,
  animation,
  effects,
  components,
  tw,
};
