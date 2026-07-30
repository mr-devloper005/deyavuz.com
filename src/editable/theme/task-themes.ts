import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Playfair Display', Georgia, 'Times New Roman', serif"
const BODY_FONT = "'Nunito Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#f0f7fb',
  surface: '#ffffff',
  raised: '#e8f4f8',
  text: '#1a2a3a',
  muted: '#5a7a8a',
  line: 'rgba(42,187,197,0.15)',
  accent: '#e8788a',
  accentSoft: '#fdeef0',
  onAccent: '#ffffff',
  glow: 'rgba(232,120,138,0.08)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'Insightful reads, stories, and guides curated for you.' },
  listing: { ...base, kicker: 'Businesses', note: 'Discover and connect with trusted local businesses.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings ready to explore.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual showcase of inspiring images and moments.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated resources and links worth revisiting.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports, and references.' },
  profile: { ...base, kicker: 'People', note: 'Meet creators, businesses, and community members.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
