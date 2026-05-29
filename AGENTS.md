# AGENTS.md — Clarise

> **NOTED**: Saat mengerjakan task, harap JANGAN LUPA untuk selalu menggunakan skill yang sudah disiapkan di dalam folder `.agents/skills/` sesuai konteks pekerjaan.

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

- [x] Install shadcn/ui CLI and initialize (`pnpm dlx shadcn@latest init` in apps/app)
- [ ] Add base shadcn components: Button, Card, Input, Badge, Avatar, Dialog, DropdownMenu, Progress, Separator, Tooltip, Skeleton
- [x] Create `components/ui/` with shadcn components using DESIGN.md tokens
- [x] Create `lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)

#### Layout Components (`components/layout/`)

- [x] `sidebar.tsx` — Dashboard sidebar navigation (Dashboard, Explore, Achievements, AI Assistant)
- [x] `header.tsx` — Top bar with user avatar (Clerk UserButton), search, notifications
- [x] `mobile-nav.tsx` — Responsive bottom/hamburger navigation
- [x] `dashboard-layout.tsx` — Wrapper layout for `(dashboard)` route group
- [x] `course-layout.tsx` — Wrapper layout for `(course)` route group

#### Auth Pages (`app/(auth)/`)

- [x] Delete empty `sign-in` and `sign-up` files (they are 0-byte files, not directories)
- [x] Create `app/(auth)/sign-in/[[...sign-in]]/page.tsx` with Clerk `<SignIn />` component
- [x] Create `app/(auth)/sign-up/[[...sign-up]]/page.tsx` with Clerk `<SignUp />` component
- [x] Create `app/(auth)/layout.tsx` — centered auth layout with branding

#### Dashboard Page (`app/(dashboard)/dashboard/`)

- [x] Build dashboard with: welcome card, learning streak, XP/level progress bar
- [x] "Continue Learning" section — show in-progress courses
- [x] "Recent Achievements" section — latest badges earned
- [x] Stats cards: courses completed, total XP, current streak, level

#### Explore Page (`app/(dashboard)/explore/`)

- [x] Create `app/(dashboard)/explore/page.tsx`
- [x] Category filter/tabs (from Category model)
- [x] Course grid cards: title, description, difficulty badge, module count, progress indicator
- [x] Search input with debounced filtering
- [x] Difficulty filter (Beginner/Intermediate/Advanced)

#### Achievement Page (`app/(dashboard)/achievment/`)

- [x] Create `app/(dashboard)/achievment/page.tsx`
- [x] Badge grid: earned vs locked badges with icons
- [x] XP progress bar and level display
- [x] Streak calendar/heatmap
- [ ] Leaderboard (optional, future)

#### Course Page (`app/(course)/course/[slug]/`)

- [x] Create `app/(course)/course/[slug]/page.tsx`
- [x] Course header: title, description, difficulty, progress bar
- [x] Module list/sidebar with completion checkmarks
- [x] Module content viewer (markdown/rich text)
- [x] "Mark as Complete" button per module
- [x] **Validation Quiz**: Add a mini-quiz at the end of each module to validate learning before marking as complete (must pass to complete).
- [x] Next/Previous module navigation

#### AI Assistant Components (`components/ai/`)

- [x] `ai-chat-dialog.tsx` — Floating chat dialog (Radix Dialog)
- [x] `ai-message.tsx` — Chat message bubble (user/AI)
- [x] `ai-input.tsx` — Input with send button and loading state
- [x] `ai-fab.tsx` — Floating action button to open AI chat

#### Course Components (`components/course/`)

- [x] `course-card.tsx` — Card for explore grid
- [x] `module-list.tsx` — Sidebar module navigation
- [x] `module-content.tsx` — Content renderer
- [x] `progress-indicator.tsx` — Course progress ring/bar

#### Dashboard Components (`components/dashboard/`)

- [x] `stats-card.tsx` — Stat display card (icon, value, label)
- [x] `streak-display.tsx` — Current streak with fire icon
- [x] `xp-bar.tsx` — XP progress toward next level
- [x] `continue-learning.tsx` — In-progress course cards

#### Custom Hooks (`hooks/`)

- [x] `use-user-progress.ts` — Fetch/mutate user progress
- [x] `use-courses.ts` — Fetch courses with filters
- [x] `use-ai-chat.ts` — AI chat state management (messages, send, loading)
- [x] `use-achievements.ts` — Fetch badges and XP data

#### TypeScript Types (`types/`)

- [x] `index.ts` — Shared types: Course, Module, UserProgress, Badge, etc.
- [x] API response types for all endpoints

#### Accessibility & Quality (use `.agents/skills/accessibility`, `best-practices`)

- [x] Ensure all interactive elements have proper ARIA labels
- [ ] Keyboard navigation for sidebar, course modules, AI chat
- [x] Focus management on dialog open/close
- [ ] Color contrast compliance (WCAG AA minimum)
- [ ] Skip-to-content link

#### Performance (use `.agents/skills/performance`, `core-web-vitals`)

- [ ] Implement loading skeletons for all data-fetching pages
- [ ] Use `next/dynamic` for heavy components (AI chat dialog)
- [ ] Image optimization with `next/image` where applicable
- [ ] Suspense boundaries for streaming server components

#### Data Fetching Strategy (Jangan ambil semua data sekaligus)

- [x] Semua list data (courses, users, notifications) WAJIB pakai pagination
      — default limit: 12 items per halaman, jangan pernah fetch semua sekaligus
- [x] Gunakan cursor-based pagination bukan offset untuk performa lebih baik
      di tabel besar (UserProgress, AiChatHistory, UserActivity)
- [x] Explore page: implementasi infinite scroll atau "Load More"
      — jangan load semua course dalam satu request
- [x] AI Chat history: ambil maksimal 10 pesan terakhir per session sebagai
      konteks, bukan seluruh history
- [x] Dashboard: gunakan parallel data fetching (Promise.all) — fetch stats,
      courses, badges secara bersamaan bukan sequential
- [x] Gunakan React Query atau SWR untuk client-side data fetching
      agar ada caching otomatis dan tidak re-fetch data yang sama berulang kali
- [x] Select hanya field yang dibutuhkan di Prisma query — jangan pernah
      pakai findMany tanpa select atau take

#### Image Optimization (Render gambar lebih cepat)

- [ ] WAJIB gunakan next/image untuk SEMUA gambar — bukan <img> tag biasa
- [ ] Set width dan height eksplisit di setiap next/image agar tidak ada
      layout shift (CLS score bagus)
- [x] Screenshot app preview di landing (Dashboard.png, Explore.png, dll):
      konversi ke format .webp terlebih dahulu — ukuran file bisa 70% lebih kecil
- [ ] Tambahkan priority={true} hanya pada gambar yang above-the-fold
      (hero image, logo) — sisanya biarkan lazy load
- [ ] Konfigurasi next/image di next.config.ts: set deviceSizes dan imageSizes
      agar Next.js generate ukuran gambar yang tepat per device
- [ ] Untuk avatar user dari Clerk: gunakan sizes prop yang sesuai
      (misal: sizes="40px") agar tidak load gambar 1000px untuk avatar 40px

#### Caching Strategy

- [ ] Gunakan React cache() untuk server-side data fetching yang dipanggil
      berkali-kali dalam satu request (misal: getUser() dipanggil di layout
      dan page sekaligus)
- [ ] Route segments yang bersifat statis (landing page, halaman pricing):
      set revalidate = 3600 (1 jam) atau false untuk full static
- [ ] AI response yang identik (pertanyaan umum yang sering ditanya):
      cache di Upstash Redis dengan TTL 24 jam — hemat token sekaligus
      respons lebih cepat
- [ ] Gunakan unstable_cache dari Next.js untuk cache hasil query Prisma
      yang jarang berubah (list categories, list badges)

#### Bundle Size & Code Splitting

- [x] Audit bundle size sebelum deploy: jalankan next build lalu cek
      .next/analyze (aktifkan @next/bundle-analyzer)
- [ ] Recharts, react-pdf, dan library besar lainnya: WAJIB di-import
      dengan next/dynamic + ssr: false agar tidak masuk bundle utama
- [ ] Hapus semua import yang tidak terpakai — gunakan ESLint rule
      no-unused-vars dan no-unused-imports
- [ ] Tree-shaking: import hanya fungsi yang dipakai dari lodash,
      jangan import seluruh library (import { debounce } from 'lodash'
      bukan import \_ from 'lodash')

#### Core Web Vitals Target

- [x] LCP (Largest Contentful Paint): target < 2.5 detik
      → preload font Darker Grotesque dan DM Sans di layout.tsx
      → font-display: swap agar teks muncul sebelum font selesai load
- [ ] CLS (Cumulative Layout Shift): target < 0.1
      → set eksplisit width/height di semua gambar dan avatar
      → gunakan skeleton dengan ukuran yang sama persis dengan konten asli
- [ ] FID/INP (Interaction to Next Paint): target < 200ms
      → hindari blocking JavaScript di main thread
      → operasi berat (sorting, filtering besar): pindah ke server component
- [x] Gunakan next/font untuk load Google Fonts (Darker Grotesque, DM Sans)
      — jangan pakai @import di CSS karena lebih lambat

#### Production Performance Checklist

- [x] Enable Vercel Speed Insights untuk monitoring Core Web Vitals real users
- [ ] Enable Turbopack untuk development (sudah aktif) — pastikan
      tidak dimatikan di turbo.json
- [ ] Pastikan semua Server Components tidak ada "use client" yang tidak perlu
      — client component = bundle lebih besar
- [ ] Gunakan Server Actions untuk form submission, bukan API routes biasa
      — lebih efisien untuk operasi sederhana

### 🎨 Frontend (apps/landing)

- [x] Add responsive navbar with logo and CTA button
- [x] Add "How it works" section (3-step process)
- [ ] Add testimonials/social proof section
- [x] Add pricing section (Free vs Premium comparison)
- [ ] Add FAQ accordion section
- [x] SEO optimization (use `.agents/skills/seo`): structured data, meta tags, OG images
- [ ] Performance audit (use `.agents/skills/web-perf`, `core-web-vitals`)

---

### ⚙️ Backend (apps/app)

#### API Routes

- [x] `app/api/ai/ask/route.ts` — Implement Gemini chat endpoint (POST: message → AI response, rate-limited, user context-aware)
- [ ] `app/api/webhook/duitku/route.ts` — Implement Duitku payment webhook (verify signature, update Subscription status)
- [ ] **Payments:** Implement Idempotency Key (Hash `userId` + `planId` + `timestamp`) when generating Duitku checkout URL to prevent double charges.
- [x] `app/api/courses/route.ts` — GET courses list (with category/difficulty filters, pagination)
- [x] `app/api/courses/[slug]/route.ts` — GET single course with modules
- [x] `app/api/progress/route.ts` — POST mark module complete, GET user progress
- [x] `app/api/user/route.ts` — GET/PATCH user profile, sync Clerk user to DB
- [x] `app/api/achievements/route.ts` — GET user badges and XP

#### Admin AI Copilot

- [x] POST /api/admin/ai/copilot - Endpoint khusus Admin AI - Integrasi Gemini dengan Function Calling (getPlatformStats, generateAndSaveCourse, createVoucher)

#### Voucher & Early Access

- [x] POST /api/voucher/redeem
      Body: { code: string } - Validasi kode: exists, belum expired, masih ada slot - Validasi user: belum pernah redeem kode ini - Jika valid: update user role ke PREMIUM,
      buat Subscription (PREMIUM_TRIAL, +30 hari),
      increment voucher usedCount - Return: success message + expiry date
- [x] GET /api/voucher/[code] - Return: isValid, remainingSlots, trialDays - Untuk preview sebelum user redeem
- [x] GET /api/admin/vouchers - List semua voucher + stats penggunaan
- [x] POST /api/admin/vouchers - Buat voucher baru (admin only)

#### Clerk Webhook (User Sync)

- [x] `app/api/webhook/clerk/route.ts` — Sync Clerk user creation/update to Prisma User model
- [x] Verify Clerk webhook signature (svix)

#### Database

- [x] Run `prisma db push` to sync schema to Supabase
- [ ] Create seed script (`prisma/seed.ts`) with sample categories, courses, modules, badges
- [ ] Add `"prisma": { "seed": "tsx prisma/seed.ts" }` to package.json

#### AI Integration

- [x] System prompt for Gemini: context-aware tutor (knows current course/module)
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

#### Extended Security (Modern Attacks)

- [ ] IDOR protection: validasi ownership resource di setiap endpoint
      — jangan hanya di middleware
- [ ] Mass assignment protection: gunakan Zod .strict() di semua
      PATCH/POST endpoint — strip field yang tidak dikenali
- [ ] Bot protection: honeypot field di sign-up form
- [ ] API abuse: rate limiting berlapis (IP + userId + per-feature)
- [ ] SSRF prevention: whitelist domain untuk semua external fetch
- [ ] Supply chain: setup Dependabot + jalankan pnpm audit mingguan
- [ ] Supabase RLS: aktifkan di semua tabel user data
- [ ] Service role key: JANGAN pernah expose di NEXT*PUBLIC* atau client
- [ ] AI output scanning: scan response Gemini sebelum kirim ke client
- [x] poweredByHeader: false di next.config.ts (jangan beritahu attacker
      tech stack yang digunakan)
- [ ] Use skill `.agents/skills/owasp-security` dan
      `.agents/skills/supabase-pentest` sebelum security audit

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

Sebelum melakukan _deploy_ ke production (misalnya Vercel), pastikan hal-hal berikut sudah dikembalikan/diubah:

- [x] **Security Headers (X-Frame-Options)**: Hapus komentar (`//`) pada baris `{ key: "X-Frame-Options", value: "DENY" }` di dalam file `apps/app/next.config.ts` dan `apps/landing/next.config.ts`. Ini wajib dinyalakan di production untuk mencegah serangan _Clickjacking_. (Saat ini dimatikan untuk kebutuhan _testing Mobile Simulator_).
- [ ] **Environment Variables**: Pastikan `NEXT_PUBLIC_APP_URL` di Vercel (atau _hosting_ Anda) diisi dengan domain _production_ yang sebenarnya (contoh: `https://app.clarise.com`). Tanpa ini, _link_ akan kembali ke mode _fallback_ lokal (`http://localhost:3000`).
- [ ] **API Keys & Database**: Pastikan kunci Clerk (`CLERK_SECRET_KEY`, dsb) dan Supabase mengarah ke lingkungan (_environment_) _Production_, bukan _Development_.
- [ ] **Webhook URLs**: Ubah URL _webhook_ di Clerk dan Duitku agar mengarah ke domain _production_ Anda, bukan lagi URL dari Ngrok atau Localhost.
- [x] **Admin Role Middleware**: Hapus kondisi _bypass_ khusus _development_ (`process.env.NODE_ENV === "production"`) di file `apps/admin/middleware.ts` agar hanya user dengan role `admin` di _Clerk Public Metadata_ yang bisa login ke _Admin Panel_.

---

### 💅 UI Polish & Minor Fixes

- [x] **LMS App (`apps/app`)**: Fungsikan tombol notifikasi di halaman dashboard.
- [x] **LMS App (`apps/app`)**: Fungsikan tab Pengaturan (Keamanan, Notifikasi, Langganan) yang saat ini hanya Profil yang bisa diklik.
- [x] **LMS App (`apps/app`)**: Ganti logo Clarise saat mode gelap menggunakan `logoDM.png`.
- [x] **Admin Panel (`apps/admin`)**: Fungsikan tombol lonceng notifikasi.
- [x] **Admin Panel (`apps/admin`)**: Perbaiki fungsi _filter_ di berbagai menu (contoh: menu Users).
- [x] **Admin Panel (`apps/admin`)**: Tambahkan terjemahan/teks Bahasa Indonesia (opsional: _switch language button_).
- [x] **Landing Page (`apps/landing`)**: Fungsikan semua tautan/link di bagian _footer_.

---

### 🧹 Tech Debt & Maintenance

- [ ] Migrate `middleware.ts` to Next.js 16 proxy convention (blocked: waiting for Clerk support)
- [ ] Set up test framework (Vitest + React Testing Library)
- [ ] Add Prettier config and format all files
- [ ] Configure Husky + lint-staged for pre-commit hooks
- [x] Add `loading.tsx` and `error.tsx` for each route group (Pending UI Polishing)
- [x] Add `not-found.tsx` custom 404 page
- [ ] Remove unused `@repo/ui` package or repurpose it
- [ ] Implement Empty States for data-fetching pages (Pending UI Polishing)
- [ ] Implement Global Error Toast/Notification component (Pending UI Polishing)
- [x] Build `/settings` and `/pricing` pages in apps/app (Pending UI Polishing)

---

### 📋 Skills Reference

Use these `.agents/skills/` when working on specific areas:

- **UI/Frontend**: `next-best-practices`, `accessibility`, `best-practices`, `core-web-vitals`, `performance`
- **Backend/DB**: `supabase`, `supabase-postgres-best-practices`, `owasp-security`
- **SEO/Marketing**: `seo`, `web-perf`, `web-quality-audit`
- **Infra**: `turborepo`
- **Security Audit**: `supabase-pentest`, `supabase-audit-*`, `owasp-security`
