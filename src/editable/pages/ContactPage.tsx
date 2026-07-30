'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add your business listing, verify details, and go live on the platform.' },
      { icon: Phone, title: 'Partnership inquiries', body: 'Interested in partnering with us? Let us know how we can work together.' },
      { icon: MapPin, title: 'Coverage expansion', body: 'Want us to cover your area or category? We are always growing.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch your articles, stories, and long-form pieces to our editorial team.' },
      { icon: Mail, title: 'Collaboration requests', body: 'Interested in sponsorships, partnerships, or guest features? Reach out.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Need help with formatting, style guidelines, or publication workflow?' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Let us discuss gallery features, visual campaigns, and creative partnerships.' },
      { icon: Sparkles, title: 'Licensing inquiries', body: 'Questions about usage rights, commercial requests, or visual partnerships.' },
      { icon: Mail, title: 'Media inquiries', body: 'Press kits, editorial support, or feature placement requests.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Resource submissions', body: 'Suggest valuable resources, links, and references for our collections.' },
    { icon: Mail, title: 'Partnership proposals', body: 'Coordinate curation projects, reference pages, and content programs.' },
    { icon: Sparkles, title: 'Community support', body: 'Need help organizing or contributing to the platform? We are here.' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8788a]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-4 text-4xl font-bold sm:text-5xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#5a7a8a]">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane, i) => (
                <div key={lane.title} className="rounded-2xl border border-[var(--editable-border)] bg-white p-5 shadow-[0_2px_12px_rgba(232,120,138,0.06)]">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${i % 2 === 0 ? 'bg-[#fdeef0]' : 'bg-[#e8f4f8]'}`}>
                    <lane.icon className={`h-5 w-5 ${i % 2 === 0 ? 'text-[#e8788a]' : 'text-[#2bbdc5]'}`} />
                  </div>
                  <h2 className="editable-display mt-3 text-lg font-bold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#5a7a8a]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--editable-border)] bg-white p-7 shadow-[0_4px_20px_rgba(232,120,138,0.08)]">
            <h2 className="editable-display text-2xl font-bold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
