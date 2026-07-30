'use client'

import Link from 'next/link'
import { Heart, MapPin, Mail, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer>
      <div className="gradient-teal-pink px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full scale-125 object-cover" />
              </span>
              <span className="editable-display text-2xl font-bold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/80">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Discover</h3>
            <div className="mt-4 grid gap-2">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="text-sm font-medium text-white/80 transition hover:text-white">
                  {task.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Company</h3>
            <div className="mt-4 grid gap-2">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-white/80 transition hover:text-white">{label}</Link>
              ))}
              {session ? (
                <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/80 transition hover:text-white">
                  Logout
                </button>
              ) : null}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Connect</h3>
            <div className="mt-4 grid gap-3">
              <span className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="h-4 w-4 text-white/60" /> Worldwide
              </span>
              <span className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="h-4 w-4 text-white/60" /> hello@{SITE_CONFIG.domain}
              </span>
              <span className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="h-4 w-4 text-white/60" /> Contact us
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a2a3a] px-4 py-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-white/50">
          © {year} {SITE_CONFIG.name}. Made with <Heart className="h-3 w-3 fill-[#e8788a] text-[#e8788a]" /> All rights reserved.
        </p>
      </div>
    </footer>
  )
}
