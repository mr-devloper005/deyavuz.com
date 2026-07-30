'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-semibold text-[#1a2a3a] outline-none transition placeholder:text-[#8eaab8] focus:border-[#e8788a]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#f0f7fb] px-4 py-16 sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-2xl border border-[var(--editable-border)] bg-white p-7 shadow-[0_8px_32px_rgba(232,120,138,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8788a] to-[#2bbdc5] text-white">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2bbdc5]">{pagesContent.create.locked.badge}</p>
              <h1 className="editable-display mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#5a7a8a]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8788a] to-[#d4627a] px-6 py-3 text-sm font-bold text-white shadow-[0_2px_12px_rgba(232,120,138,0.3)]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-bold text-[#1a2a3a]">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#f0f7fb]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-2xl border border-[var(--editable-border)] bg-white p-6 shadow-[0_8px_32px_rgba(232,120,138,0.08)] lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <aside>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2bbdc5]">{pagesContent.create.hero.badge}</p>
              <h1 className="editable-display mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#5a7a8a]">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.filter((item) => item.key !== 'classified').map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-[#e8788a] bg-[#fdeef0] text-[#1a2a3a]' : 'border-[var(--editable-border)] bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(232,120,138,0.1)]'}`}>
                      <Icon className={`h-5 w-5 ${active ? 'text-[#e8788a]' : 'text-[#2bbdc5]'}`} />
                      <span className="mt-3 block text-sm font-bold">{item.label}</span>
                      <span className="mt-1 block text-xs text-[#5a7a8a]">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-2xl border border-[var(--editable-border)] bg-[#f0f7fb] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8eaab8]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="editable-display mt-1 text-2xl font-bold">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-[#fdeef0] px-4 py-2 text-xs font-bold text-[#e8788a]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-[#2bbdc5]/30 bg-[#e8f4f8] p-4 text-[#1a2a3a]">
                  <p className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="h-5 w-5 text-[#2bbdc5]" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm text-[#5a7a8a]">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8788a] to-[#d4627a] px-6 text-sm font-bold text-white shadow-[0_2px_12px_rgba(232,120,138,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(232,120,138,0.4)]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
