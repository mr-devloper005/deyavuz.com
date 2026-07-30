'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, User } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/90 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#e8788a] to-[#2bbdc5] shadow-[0_2px_12px_rgba(232,120,138,0.3)] transition group-hover:shadow-[0_4px_20px_rgba(232,120,138,0.4)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full scale-125 object-cover" />
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="editable-display block max-w-[200px] truncate text-xl font-bold leading-none text-[#1a2a3a]">{SITE_CONFIG.name}</span>
            <span className="mt-0.5 block max-w-[200px] truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8788a]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                  active
                    ? 'bg-[#fdeef0] text-[#e8788a]'
                    : 'text-[#5a7a8a] hover:bg-[#f0f7fb] hover:text-[#1a2a3a]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="flex w-full max-w-sm items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[#f0f7fb] px-4 py-2 transition focus-within:border-[#e8788a] focus-within:bg-white focus-within:shadow-[0_2px_12px_rgba(232,120,138,0.12)]">
            <Search className="h-4 w-4 shrink-0 text-[#e8788a]" />
            <input
              name="q"
              type="search"
              placeholder="Search businesses and articles..."
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[#8eaab8]"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden items-center gap-2 rounded-full bg-[#fdeef0] px-3 py-1.5 text-xs font-semibold text-[#e8788a] sm:inline-flex">
                <User className="h-3.5 w-3.5" /> {session.name}
              </span>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-[#e8788a] to-[#d4627a] px-4 py-2 text-sm font-bold text-white shadow-[0_2px_12px_rgba(232,120,138,0.3)] transition hover:shadow-[0_4px_20px_rgba(232,120,138,0.4)] sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-[#5a7a8a] transition hover:bg-[#fdeef0] hover:text-[#e8788a] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[#5a7a8a] transition hover:border-[#e8788a] hover:text-[#e8788a] sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-[#e8788a] to-[#d4627a] px-4 py-2 text-sm font-bold text-white shadow-[0_2px_12px_rgba(232,120,138,0.3)] transition hover:shadow-[0_4px_20px_rgba(232,120,138,0.4)] sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-[var(--editable-border)] bg-white p-2 transition hover:border-[#e8788a] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5 text-[#e8788a]" /> : <Menu className="h-5 w-5 text-[#5a7a8a]" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[#f0f7fb] px-4 py-2">
            <Search className="h-4 w-4 text-[#e8788a]" />
            <input name="q" type="search" placeholder="Search..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8eaab8]" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-[#fdeef0] text-[#e8788a]'
                      : 'text-[#5a7a8a] hover:bg-[#f0f7fb] hover:text-[#1a2a3a]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button
                type="button"
                onClick={() => { logout(); setOpen(false) }}
                className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#5a7a8a] transition hover:bg-[#fdeef0] hover:text-[#e8788a]"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
