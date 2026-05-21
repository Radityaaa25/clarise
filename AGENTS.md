# AGENTS.md — Clarise

## Project Overview

Turborepo monorepo (pnpm) for **Clarise**, a learning management system.
- **apps/app** — Main LMS (Next.js 16, port 3000)
- **apps/landing** — Marketing site (Next.js 16, port 3001)
- **packages/** — `@repo/ui`, `@repo/eslint-config`, `@repo/typescript-config`

## Commands

```sh
# Root (run from repo root)
pnpm dev              # Start all apps (app:3000, landing:3001)
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm check-types      # Typecheck all packages
pnpm format           # Prettier format

# Database (run from apps/app)
pnpm db:generate      # prisma generate
pnpm db:push          # prisma db push (dev sync)
pnpm db:migrate       # prisma migrate dev
pnpm db:studio        # prisma studio (DB GUI)

# Focused dev
pnpm dev --filter=app       # Dev main app only
pnpm dev --filter=landing   # Dev landing only
pnpm build --filter=app     # Build main app only
```

**Verification order:** `lint` → `check-types` → `build`

## Architecture

### Main App (apps/app)
- **Auth**: Clerk — protected routes: `/dashboard`, `/explore`, `/achievement`, `/course`. Middleware in `middleware.ts`.
- **Database**: Prisma ORM → Supabase PostgreSQL. Schema in `apps/app/prisma/schema.prisma`. Models: User, Category, Course, Module, UserProgress, Badge, UserBadge, Subscription.
- **AI**: Google Gemini 2.0 Flash via `/api/ai/ask`. Rate-limited with Upstash Redis (10 req/10s).
- **Payments**: Duitku gateway — webhook at `/api/webhook/duitku`. Keys pending registration.
- **Error tracking**: Sentry (`@sentry/nextjs`).
- **UI**: shadcn/ui (local, NOT `@repo/ui`), Tailwind v4, Radix primitives.

### Key Lib Files (apps/app/lib)
- `prisma.ts` — Singleton PrismaClient (globalThis pattern for dev hot-reload)
- `supabase.ts` — Supabase client (requires `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `gemini.ts` — Gemini model init (requires `GEMINI_API_KEY`)
- `ratelimit.ts` — Upstash Redis + sliding window rate limiter

### Landing App (apps/landing)
- Static marketing site. No DB, no auth, no API routes. Port 3001.

## Environment

Required env vars for **apps/app**:
- `DATABASE_URL`, `DIRECT_URL` — Supabase PostgreSQL connection
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- `GEMINI_API_KEY`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `DUITKU_MERCHANT_CODE`, `DUITKU_API_KEY` — pending registration, can be empty for now
- `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`

## Important Notes

- **No test framework configured** — tests do not exist yet. Do not attempt `pnpm test`.
- **`@repo/ui` is unused** — apps use local shadcn/ui components via `components.json`. Do not add components to `packages/ui` unless explicitly asked.
- **Tailwind v4** — uses `@tailwindcss/postcss`, not the older `tailwindcss` postcss plugin.
- **React 19** — pinned via root `package.json` overrides.
- **DESIGN.md** contains the full design system (colors, typography, components). Reference it for UI work.
- **Security**: `.env.local` files are gitignored. Never commit secrets.
- **Lint**: Uses `eslint . --max-warnings 0` (not `next lint` which was removed in Next.js 16). ESLint config in `eslint.config.mjs` imports from `@repo/eslint-config/next-js` (note the hyphen, not dot).
- **Error boundary**: App wraps children in `ErrorBoundary` component at `components/layout/error-boundary.tsx`.
- **Security headers**: Both apps have CSP, HSTS, X-Frame-Options, etc. in `next.config.ts`.
- **Design tokens**: `globals.css` defines full DESIGN.md token set (primary, surface, text, semantic colors). Use token names like `bg-canvas`, `text-ink`, `bg-primary`, etc.
- **CI/CD**: GitHub Actions workflow at `.github/workflows/ci.yml` runs lint → check-types → build on PR/push to main.


---

## TODO — Development Roadmap

### 🎨 Frontend (apps/app)

#### UI Foundation
- [ ] Install shadcn/ui CLI and initialize (`pnpm dlx shadcn@latest init` in apps/app)
- [ ] Add base shadcn components: Button, Card, Input, Badge, Avatar, Dialog, DropdownMenu, Progress, Separator, Tooltip, Skeleton
- [ ] Create `components/ui/` with shadcn components using DESIGN.md tokens
- [ ] Create `lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)

#### Layout Components (`components/layout/`)
- [ ] `sidebar.tsx` — Dashboard sidebar navigation (Dashboard, Explore, Achievements, AI Assistant)
- [ ] `header.tsx` — Top bar with user avatar (Clerk UserButton), search, notifications
- [ ] `mobile-nav.tsx` — Responsive bottom/hamburger navigation
- [ ] `dashboard-layout.tsx` — Wrapper layout for `(dashboard)` route group
- [ ] `course-layout.tsx` — Wrapper layout for `(course)` route group

#### Auth Pages (`app/(auth)/`)
- [ ] Delete empty `sign-in` and `sign-up` files (they are 0-byte files, not directories)
- [ ] Create `app/(auth)/sign-in/[[...sign-in]]/page.tsx` with Clerk `<SignIn />` component
- [ ] Create `app/(auth)/sign-up/[[...sign-up]]/page.tsx` with Clerk `<SignUp />` component
- [ ] Create `app/(auth)/layout.tsx` — centered auth layout with branding

#### Dashboard Page (`app/(dashboard)/dashboard/`)
- [ ] Build dashboard with: welcome card, learning streak, XP/level progress bar
- [ ] "Continue Learning" section — show in-progress courses
- [ ] "Recent Achievements" section — latest badges earned
- [ ] Stats cards: courses completed, total XP, current streak, level

#### Explore Page (`app/(dashboard)/explore/`)
- [ ] Create `app/(dashboard)/explore/page.tsx`
- [ ] Category filter/tabs (from Category model)
- [ ] Course grid cards: title, description, difficulty badge, module count, progress indicator
- [ ] Search input with debounced filtering
- [ ] Difficulty filter (Beginner/Intermediate/Advanced)

#### Achievement Page (`app/(dashboard)/achievment/`)
- [ ] Create `app/(dashboard)/achievment/page.tsx`
- [ ] Badge grid: earned vs locked badges with icons
- [ ] XP progress bar and level display
- [ ] Streak calendar/heatmap
- [ ] Leaderboard (optional, future)

#### Course Page (`app/(course)/course/[slug]/`)
- [ ] Create `app/(course)/course/[slug]/page.tsx`
- [ ] Course header: title, description, difficulty, progress bar
- [ ] Module list/sidebar with completion checkmarks
- [ ] Module content viewer (markdown/rich text)
- [ ] "Mark as Complete" button per module
- [ ] **Validation Quiz**: Add a mini-quiz at the end of each module to validate learning before marking as complete (must pass to complete).
- [ ] Next/Previous module navigation

#### AI Assistant Components (`components/ai/`)
- [ ] `ai-chat-dialog.tsx` — Floating chat dialog (Radix Dialog)
- [ ] `ai-message.tsx` — Chat message bubble (user/AI)
- [ ] `ai-input.tsx` — Input with send button and loading state
- [ ] `ai-fab.tsx` — Floating action button to open AI chat

#### Course Components (`components/course/`)
- [ ] `course-card.tsx` — Card for explore grid
- [ ] `module-list.tsx` — Sidebar module navigation
- [ ] `module-content.tsx` — Content renderer
- [ ] `progress-indicator.tsx` — Course progress ring/bar

#### Dashboard Components (`components/dashboard/`)
- [ ] `stats-card.tsx` — Stat display card (icon, value, label)
- [ ] `streak-display.tsx` — Current streak with fire icon
- [ ] `xp-bar.tsx` — XP progress toward next level
- [ ] `continue-learning.tsx` — In-progress course cards

#### Custom Hooks (`hooks/`)
- [ ] `use-user-progress.ts` — Fetch/mutate user progress
- [ ] `use-courses.ts` — Fetch courses with filters
- [ ] `use-ai-chat.ts` — AI chat state management (messages, send, loading)
- [ ] `use-achievements.ts` — Fetch badges and XP data

#### TypeScript Types (`types/`)
- [ ] `index.ts` — Shared types: Course, Module, UserProgress, Badge, etc.
- [ ] API response types for all endpoints

#### Accessibility & Quality (use `.agents/skills/accessibility`, `best-practices`)
- [ ] Ensure all interactive elements have proper ARIA labels
- [ ] Keyboard navigation for sidebar, course modules, AI chat
- [ ] Focus management on dialog open/close
- [ ] Color contrast compliance (WCAG AA minimum)
- [ ] Skip-to-content link

#### Performance (use `.agents/skills/performance`, `core-web-vitals`)
- [ ] Implement loading skeletons for all data-fetching pages
- [ ] Use `next/dynamic` for heavy components (AI chat dialog)
- [ ] Image optimization with `next/image` where applicable
- [ ] Suspense boundaries for streaming server components

### 🎨 Frontend (apps/landing)

- [ ] Add responsive navbar with logo and CTA button
- [ ] Add "How it works" section (3-step process)
- [ ] Add testimonials/social proof section
- [ ] Add pricing section (Free vs Premium comparison)
- [ ] Add FAQ accordion section
- [ ] SEO optimization (use `.agents/skills/seo`): structured data, meta tags, OG images
- [ ] Performance audit (use `.agents/skills/web-perf`, `core-web-vitals`)

---

### ⚙️ Backend (apps/app)

#### API Routes
- [ ] `app/api/ai/ask/route.ts` — Implement Gemini chat endpoint (POST: message → AI response, rate-limited, user context-aware)
- [ ] `app/api/webhook/duitku/route.ts` — Implement Duitku payment webhook (verify signature, update Subscription status)
- [ ] `app/api/courses/route.ts` — GET courses list (with category/difficulty filters, pagination)
- [ ] `app/api/courses/[slug]/route.ts` — GET single course with modules
- [ ] `app/api/progress/route.ts` — POST mark module complete, GET user progress
- [ ] `app/api/user/route.ts` — GET/PATCH user profile, sync Clerk user to DB
- [ ] `app/api/achievements/route.ts` — GET user badges and XP

#### Clerk Webhook (User Sync)
- [ ] `app/api/webhook/clerk/route.ts` — Sync Clerk user creation/update to Prisma User model
- [ ] Verify Clerk webhook signature (svix)

#### Database
- [ ] Run `prisma db push` to sync schema to Supabase
- [ ] Create seed script (`prisma/seed.ts`) with sample categories, courses, modules, badges
- [ ] Add `"prisma": { "seed": "tsx prisma/seed.ts" }` to package.json

#### AI Integration
- [ ] System prompt for Gemini: context-aware tutor (knows current course/module)
- [ ] Conversation history management (per-session or stored)
- [ ] Input validation and sanitization (Zod schema)

#### Gamification Logic
- [ ] XP award on module completion
- [ ] Level-up calculation (XP thresholds)
- [ ] Streak tracking (update on daily activity, reset on miss)
- [ ] Badge condition evaluation (e.g., "complete 5 courses", "7-day streak")

#### Security (use `.agents/skills/owasp-security`)
- [ ] Input validation on all API routes (Zod)
- [ ] Rate limiting on AI endpoint (already configured in lib)
- [ ] Webhook signature verification (Duitku + Clerk)
- [ ] RLS policies on Supabase tables (if using Supabase direct access)

---

### 🔧 Manual Setup (Developer Must Do)

#### Supabase
- [ ] Create Supabase project at https://supabase.com
- [ ] Copy `DATABASE_URL` (pooled connection) and `DIRECT_URL` (direct connection) to `.env.local`
- [ ] Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
- [ ] Run `pnpm db:push` from `apps/app` to create tables

#### Clerk
- [ ] Create Clerk application at https://clerk.com
- [ ] Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env.local`
- [ ] Configure Clerk webhook endpoint (point to deployed URL `/api/webhook/clerk`)
- [ ] Enable desired social login providers (Google, GitHub, etc.)

#### Google Gemini
- [ ] Get API key from https://aistudio.google.com/apikey
- [ ] Set `GEMINI_API_KEY` in `.env.local`

#### Upstash Redis
- [ ] Create Redis database at https://upstash.com
- [ ] Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local`

#### Duitku (Payment Gateway)
- [ ] Register merchant at https://duitku.com
- [ ] Set `DUITKU_MERCHANT_CODE` and `DUITKU_API_KEY` in `.env.local`
- [ ] Configure webhook callback URL in Duitku dashboard

#### Sentry (Error Tracking)
- [ ] Create Sentry project at https://sentry.io
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_AUTH_TOKEN` in `.env.local`
- [ ] Run `npx @sentry/wizard@latest -i nextjs` if Sentry config files are missing

#### Deployment
- [ ] Set up Vercel project (connect GitHub repo)
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set custom domains: `app.clarise.com` (app), `clarise.com` (landing)
- [ ] Enable Vercel Remote Caching for Turborepo (`turbo login` + `turbo link`)

---

### 🚀 Production Readiness (Pre-Flight Checklist)

Sebelum melakukan *deploy* ke production (misalnya Vercel), pastikan hal-hal berikut sudah dikembalikan/diubah:
- [ ] **Security Headers (X-Frame-Options)**: Hapus komentar (`//`) pada baris `{ key: "X-Frame-Options", value: "DENY" }` di dalam file `apps/app/next.config.ts` dan `apps/landing/next.config.ts`. Ini wajib dinyalakan di production untuk mencegah serangan *Clickjacking*. (Saat ini dimatikan untuk kebutuhan *testing Mobile Simulator*).
- [ ] **Environment Variables**: Pastikan `NEXT_PUBLIC_APP_URL` di Vercel (atau *hosting* Anda) diisi dengan domain *production* yang sebenarnya (contoh: `https://app.clarise.com`). Tanpa ini, *link* akan kembali ke mode *fallback* lokal (`http://localhost:3000`).
- [ ] **API Keys & Database**: Pastikan kunci Clerk (`CLERK_SECRET_KEY`, dsb) dan Supabase mengarah ke lingkungan (*environment*) *Production*, bukan *Development*.
- [ ] **Webhook URLs**: Ubah URL *webhook* di Clerk dan Duitku agar mengarah ke domain *production* Anda, bukan lagi URL dari Ngrok atau Localhost.

---

### 🧹 Tech Debt & Maintenance

- [ ] Migrate `middleware.ts` to Next.js 16 proxy convention (blocked: waiting for Clerk support)
- [ ] Set up test framework (Vitest + React Testing Library)
- [ ] Add Prettier config and format all files
- [ ] Configure Husky + lint-staged for pre-commit hooks
- [ ] Add `loading.tsx` and `error.tsx` for each route group (Pending UI Polishing)
- [ ] Add `not-found.tsx` custom 404 page
- [ ] Remove unused `@repo/ui` package or repurpose it
- [ ] Implement Empty States for data-fetching pages (Pending UI Polishing)
- [ ] Implement Global Error Toast/Notification component (Pending UI Polishing)
- [ ] Build `/settings` and `/pricing` pages in apps/app (Pending UI Polishing)

---

### 📋 Skills Reference

Use these `.agents/skills/` when working on specific areas:
- **UI/Frontend**: `next-best-practices`, `accessibility`, `best-practices`, `core-web-vitals`, `performance`
- **Backend/DB**: `supabase`, `supabase-postgres-best-practices`, `owasp-security`
- **SEO/Marketing**: `seo`, `web-perf`, `web-quality-audit`
- **Infra**: `turborepo`
- **Security Audit**: `supabase-pentest`, `supabase-audit-*`, `owasp-security`
