import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-[var(--editable-border)] bg-white p-8 shadow-[0_4px_20px_rgba(232,120,138,0.06)] lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8788a]">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-5 text-4xl font-bold sm:text-5xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5a7a8a]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-[#5a7a8a]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value, i) => (
              <div key={value.title} className="rounded-2xl border border-[var(--editable-border)] bg-white p-6 shadow-[0_4px_20px_rgba(232,120,138,0.06)]">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${i % 2 === 0 ? 'bg-[#fdeef0] text-[#e8788a]' : 'bg-[#e8f4f8] text-[#2bbdc5]'}`}>
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                <h2 className="editable-display mt-4 text-xl font-bold">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#5a7a8a]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
