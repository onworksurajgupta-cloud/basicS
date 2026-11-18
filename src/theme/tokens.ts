/**
 * basicS — Simple & Sober Premium EdTech Design Tokens
 */

export const BUTTON_STYLES = {
  primary:
    'inline-flex items-center justify-center font-semibold rounded-lg bg-teal text-white hover:bg-teal-dark active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-xs',
  secondary:
    'inline-flex items-center justify-center font-semibold rounded-lg border border-slate-300 dark:border-navy-light text-navy dark:text-canvas bg-white dark:bg-navy-card hover:bg-slate-50 dark:hover:bg-navy-light/40 active:scale-[0.99] transition-all duration-150 cursor-pointer',
  gold:
    'inline-flex items-center justify-center font-semibold rounded-lg bg-gold text-navy hover:bg-gold-light active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-xs',
  icon:
    'p-2 rounded-lg border border-slate-200 dark:border-navy-light text-navy dark:text-canvas hover:border-teal hover:text-teal dark:hover:text-teal-light transition-all duration-150 cursor-pointer',
} as const

export const CARD_STYLES = {
  elevated:
    'bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 transition-all duration-150 hover:border-teal',
  subtle:
    'bg-slate-50 dark:bg-navy-card/40 rounded-xl border border-slate-200 dark:border-navy-light/40',
} as const

export const BADGE_STYLES = {
  teal: 'px-2 py-0.5 text-xs font-medium rounded-md bg-teal/10 text-teal-dark dark:text-teal-light border border-teal/20',
  gold: 'px-2 py-0.5 text-xs font-medium rounded-md bg-gold/15 text-gold-dark dark:text-gold border border-gold/30',
  neutral: 'px-2 py-0.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-navy-light/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light/40',
} as const
