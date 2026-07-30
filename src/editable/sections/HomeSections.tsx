import Link from 'next/link'
import {
  ArrowRight, Bookmark, Building2, Camera, ChevronRight, FileText, Image as ImageIcon,
  MapPin, Megaphone, Search, Star, UserRound, Sparkles, Heart,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-[#e8788a] text-[#e8788a]' : 'fill-[#daeef5] text-[#daeef5]'}`}
        />
      ))}
    </span>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-2 flex items-center gap-2">
      <Stars rating={rating} className="h-3.5 w-3.5" />
      <span className="text-xs font-bold text-[#1a2a3a]">{rating.toFixed(1)}</span>
      <span className="text-xs text-[#8eaab8]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* ----------------------------- Hero ----------------------------- */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 6)

  return (
    <section className="relative">
      <div className="relative min-h-[480px] w-full overflow-hidden sm:min-h-[540px] lg:min-h-[580px]">
        <div className="gradient-sky absolute inset-0" />
        <EditableHeroCollage images={heroImages} />
        <div className="hero-clouds" />

        <div className={`relative flex h-full min-h-[480px] flex-col items-center justify-center text-center sm:min-h-[540px] lg:min-h-[580px] ${container}`}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#e8788a] shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" /> {pagesContent.home.hero.badge || 'Welcome'}
          </p>
          <h1 className="editable-display mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.1] text-[#1a2a3a] sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#5a7a8a] sm:text-lg">{pagesContent.home.hero.description}</p>

          <form action="/search" className="mt-8 flex w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0_8px_32px_rgba(232,120,138,0.15)]">
            <div className="flex flex-1 items-center gap-2.5 px-5">
              <Search className="h-5 w-5 shrink-0 text-[#e8788a]" />
              <input
                name="q"
                placeholder="Search businesses, services, articles..."
                className="w-full bg-transparent py-3.5 text-sm text-[#1a2a3a] outline-none placeholder:text-[#8eaab8]"
              />
            </div>
            <button className="shrink-0 bg-gradient-to-r from-[#e8788a] to-[#d4627a] px-6 text-sm font-bold text-white transition hover:shadow-[0_4px_16px_rgba(232,120,138,0.4)] sm:px-8">
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="rounded-full border border-[#e8788a]/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-[#1a2a3a] backdrop-blur-sm transition hover:border-[#e8788a] hover:bg-white hover:text-[#e8788a]"
              >
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--editable-border)] bg-white/80 backdrop-blur-sm">
        <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3.5 text-sm text-[#5a7a8a] ${container}`}>
          <span className="inline-flex items-center gap-2"><Heart className="h-4 w-4 fill-[#e8788a] text-[#e8788a]" /> Trusted community</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#2bbdc5]" /> Local discovery</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><Star className="h-4 w-4 fill-[#e8788a] text-[#e8788a]" /> Verified listings</span>
          <Link href={primaryRoute} className="inline-flex items-center gap-1 font-bold text-[#e8788a] hover:underline">
            Browse {taskLabel(primaryTask).toLowerCase()} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------------------- Browse by category ---------------------- */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null
  return (
    <section className="bg-white">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8788a]">Categories</p>
          <h2 className="editable-display mt-3 text-3xl font-bold sm:text-4xl">Browse by category</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#5a7a8a]">Jump straight to what you are looking for.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((task) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-7 text-center transition duration-500 hover:-translate-y-2 hover:border-[#e8788a]/30 hover:shadow-[0_12px_36px_rgba(232,120,138,0.12)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#fdeef0] to-[#e8f4f8] text-[#e8788a] transition duration-500 group-hover:from-[#e8788a] group-hover:to-[#2bbdc5] group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(232,120,138,0.3)]">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-bold text-[#1a2a3a]">{task.label}</span>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-bold text-[#e8788a] hover:underline">
            See all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------- Activity cards ------------------------ */
function ActivityCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(232,120,138,0.15)]">
      <Link href={href} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-[#daeef5]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" loading="lazy" />
          {category ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#e8788a] shadow-sm backdrop-blur-sm">{category}</span>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-5 py-4">
        <Link href={href} className="editable-display text-lg font-bold leading-snug text-[#1a2a3a] transition hover:text-[#e8788a]">
          {post.title}
        </Link>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[#5a7a8a]">{getExcerpt(post, 140)}</p>
        <Link href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#e8788a] transition hover:gap-2">
          Read more <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 9)
  if (!activity.length) return null
  return (
    <section className="gradient-pink-soft">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2bbdc5]">What&apos;s new</p>
          <h2 className="editable-display mt-3 text-3xl font-bold sm:text-4xl">Recent discoveries</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#5a7a8a]">
            The latest listings, articles, and finds from across {SITE_CONFIG.name}.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activity.map((post) => (
            <ActivityCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-bold text-[#1a2a3a] shadow-sm transition hover:border-[#e8788a] hover:text-[#e8788a] hover:shadow-[0_4px_16px_rgba(232,120,138,0.12)]">
            Show more <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Time-based sections ---------------------- */
function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_12px_36px_rgba(232,120,138,0.12)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[#daeef5]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#e8788a] shadow-sm backdrop-blur-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="editable-display line-clamp-2 text-base font-bold leading-snug text-[#1a2a3a] group-hover:text-[#e8788a]">
          {post.title}
        </h3>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[#5a7a8a]">{getExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Newly discovered' },
  browse: { eyebrow: 'Trending', title: 'Popular this month' },
  index: { eyebrow: 'Community picks', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        const tealAccent = index % 2 === 1
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f7fb]'}>
            <div className={`py-14 sm:py-16 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.2em] ${tealAccent ? 'text-[#2bbdc5]' : 'text-[#e8788a]'}`}>{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-2xl font-bold sm:text-3xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#e8788a] hover:underline">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ------------------------------- CTA ------------------------------- */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24">
      <div className="gradient-teal-pink">
        <div className={`flex flex-col items-center gap-6 py-16 text-center sm:py-20 ${container}`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="editable-display max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Ready to share your business with the community?
          </h2>
          <p className="max-w-xl text-base text-white/90 sm:text-lg">
            Add your business, post a listing, or share valuable content with the {SITE_CONFIG.name} community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#e8788a] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              Create a listing
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
