import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f0f7fb]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8788a]">{pagesContent.auth.login.badge}</p>
            <h1 className="editable-display mt-4 max-w-xl text-4xl font-bold leading-[1.1] sm:text-5xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#5a7a8a]">{pagesContent.auth.login.description}</p>
          </div>
          <div className="rounded-2xl border border-[var(--editable-border)] bg-white p-7 shadow-[0_8px_32px_rgba(232,120,138,0.08)] sm:p-9">
            <h2 className="editable-display text-2xl font-bold">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[#5a7a8a]">New here? <Link href="/signup" className="font-bold text-[#e8788a] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
