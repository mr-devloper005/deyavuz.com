import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'
  | 'pastel-dreamy'

export const visualPresets = {
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'calm magazine authority',
    fontDirection: 'serif headlines with quiet sans body',
    colors: {
      background: '#f7efe3',
      foreground: '#201711',
      muted: '#7b6253',
      primary: '#261811',
      accent: '#b76e45',
      surface: '#fffaf2',
    },
    shape: 'soft editorial cards with fine borders',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium, restrained, polished',
    fontDirection: 'Cormorant Garamond headlines with Outfit body',
    colors: {
      background: '#0c0e14',
      foreground: '#f2efe8',
      muted: '#97a0b3',
      primary: '#d4a853',
      accent: '#7f1d1d',
      surface: '#1a2130',
    },
    shape: 'dark panels, gold hairlines, editorial spacing',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold, raw, memorable',
    fontDirection: 'condensed headings, mono labels, hard rhythm',
    colors: {
      background: '#f2f0e8',
      foreground: '#111111',
      muted: '#55524a',
      primary: '#111111',
      accent: '#ff4d00',
      surface: '#ffffff',
    },
    shape: 'sharp edges, thick borders, offset blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'warm, natural, trustworthy',
    fontDirection: 'rounded serif or humanist sans with soft captions',
    colors: {
      background: '#f4efe5',
      foreground: '#263021',
      muted: '#68705a',
      primary: '#415b32',
      accent: '#c47c51',
      surface: '#fffaf0',
    },
    shape: 'rounded cards, natural spacing, calm texture',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp mono data accents',
    colors: {
      background: '#f7f9fc',
      foreground: '#0f172a',
      muted: '#56607a',
      primary: '#4f46e5',
      accent: '#4f46e5',
      surface: '#ffffff',
    },
    shape: 'clean grids, pill filters, sharp information hierarchy',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful, local, energetic',
    fontDirection: 'chunky headings with friendly body type',
    colors: {
      background: '#fff3c4',
      foreground: '#2b1d12',
      muted: '#7b5736',
      primary: '#2b1d12',
      accent: '#e85d2a',
      surface: '#fff8da',
    },
    shape: 'stickers, tabs, framed modules, playful dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic, image-led, immersive',
    fontDirection: 'minimal sans with oversized display moments',
    colors: {
      background: '#07101f',
      foreground: '#f8fbff',
      muted: '#a9b6c8',
      primary: '#8df0c8',
      accent: '#f2a0ff',
      surface: '#101b2d',
    },
    shape: 'dark cards, large media, glass overlays',
  },
  'pastel-dreamy': {
    label: 'Pastel Dreamy',
    mood: 'warm, whimsical, inviting',
    fontDirection: 'Playfair Display headlines with Nunito Sans body',
    colors: {
      background: '#f0f7fb',
      foreground: '#1a2a3a',
      muted: '#5a7a8a',
      primary: '#e8788a',
      accent: '#2bbdc5',
      surface: '#ffffff',
    },
    shape: 'rounded-2xl cards, sky gradients, cloud overlays, pink-tinted shadows',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'pastel-dreamy',
  radius: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(232,120,138,0.15)]',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-bold uppercase tracking-[0.24em]',
    heroTitle: 'editable-display text-5xl font-bold sm:text-6xl lg:text-7xl',
    sectionTitle: 'editable-display text-3xl font-bold sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-bold uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'border border-[var(--editable-border)] bg-white shadow-[0_4px_20px_rgba(232,120,138,0.06)]',
    quiet: 'border border-[var(--editable-border)] bg-[#f0f7fb]',
    dark: 'border border-[var(--editable-border)] bg-[#1a2a3a] shadow-[0_24px_70px_rgba(26,42,58,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
