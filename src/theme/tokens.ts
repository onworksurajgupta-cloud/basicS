/**
 * basicS — Premium EdTech Design System Tokens
 * Reusable design definitions for Homepage, Student Dashboard, and Admin Dashboard.
 */

export const BRAND_COLORS = {
  navy: {
    DEFAULT: '#101D35',
    dark: '#0A1120',
    card: '#152442',
    light: '#1E335C',
    border: '#273C66',
  },
  teal: {
    DEFAULT: '#0D9488',
    light: '#14B8A6',
    dark: '#0F766E',
    glow: 'rgba(13, 148, 136, 0.25)',
  },
  canvas: {
    DEFAULT: '#F4F7FB',
    pure: '#FFFFFF',
    muted: '#E2E8F0',
  },
  gold: {
    DEFAULT: '#F4B942',
    light: '#FCD34D',
    dark: '#D97706',
    glow: 'rgba(244, 185, 66, 0.3)',
  },
} as const

export const BUTTON_STYLES = {
  primary:
    'inline-flex items-center justify-center font-semibold rounded-xl bg-teal text-white hover:bg-teal-light shadow-md shadow-teal/20 hover:shadow-lg hover:shadow-teal/30 active:scale-95 transition-all duration-200 cursor-pointer',
  secondary:
    'inline-flex items-center justify-center font-semibold rounded-xl border border-navy/20 dark:border-navy-light text-navy dark:text-canvas bg-white dark:bg-navy hover:bg-slate-100 dark:hover:bg-navy-card active:scale-95 transition-all duration-200 cursor-pointer',
  gold:
    'inline-flex items-center justify-center font-semibold rounded-xl bg-gradient-to-r from-gold to-gold-light text-navy shadow-md shadow-gold/25 hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer',
  ghost:
    'inline-flex items-center justify-center font-medium rounded-xl text-navy/70 dark:text-canvas/70 hover:text-navy dark:hover:text-canvas hover:bg-slate-200/60 dark:hover:bg-navy-light/50 transition-colors duration-200 cursor-pointer',
  icon:
    'p-2.5 rounded-xl border border-slate-200 dark:border-navy-light/60 bg-white/80 dark:bg-navy/80 text-navy dark:text-canvas hover:border-teal hover:text-teal dark:hover:border-teal-light dark:hover:text-teal-light transition-all duration-200 cursor-pointer',
} as const

export const CARD_STYLES = {
  elevated:
    'bg-white dark:bg-navy rounded-2xl border border-slate-200/90 dark:border-navy-light/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
  glass:
    'bg-white/80 dark:bg-navy/85 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-navy-light/50 shadow-md',
  subtle:
    'bg-canvas dark:bg-navy-card/50 rounded-2xl border border-slate-200 dark:border-navy-light/40 transition-colors',
  metric:
    'bg-white dark:bg-navy-card p-6 rounded-2xl border border-slate-200/90 dark:border-navy-light/50 shadow-sm flex items-center justify-between',
} as const

export const BADGE_STYLES = {
  teal: 'px-2.5 py-1 text-xs font-semibold rounded-full bg-teal/10 text-teal-dark dark:text-teal-light border border-teal/20',
  gold: 'px-2.5 py-1 text-xs font-semibold rounded-full bg-gold/15 text-gold-dark dark:text-gold-light border border-gold/30',
  navy: 'px-2.5 py-1 text-xs font-semibold rounded-full bg-navy/10 dark:bg-navy-light/40 text-navy dark:text-canvas border border-navy/20 dark:border-navy-light',
  neutral: 'px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-navy-light/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light/50',
} as const
