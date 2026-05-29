# DESIGN.md — Clarise Design System

> _Adapted from Cal.com baseline, fully aligned to Clarise Brand Identity_  
> _Version: 1.0 • Last Updated: May 2026_

---

## Overview

Clarise's interface is a **clean, warm, intelligence-first** learning environment — built on a light canvas (`{colors.canvas}` — #FFFFFF) with **Core Blue** (`{colors.primary}` — #1A7FCC) as the primary action color, custom **Darker Grotesque** display typography for headlines, and **DM Sans** for all body/UI text. The system reads as _patient, clear, and encouraging_ — every section has clear hierarchy, generous whitespace, and a single focused action that guides the learner forward.

Type voice splits cleanly into two roles:

- **Darker Grotesque** (900/700 weight) — used for logo wordmark, h1, h2, h3, and hero headlines. Bold, geometric, confident.
- **DM Sans** (400/500/300) — used for everything else: body, buttons, nav, captions, metadata. Humanist, readable, friendly.

Component voltage comes from **learning-focused UI fragments**: concept tooltips, inline AI chat boxes, progress indicators, and curated source cards. Clarise doesn't decorate with abstract illustrations — it shows the _actual learning experience_: explanations, interactive examples, and "aha moment" triggers embedded in the flow.

The footer uses `{colors.void}` (#070B11) — a deep near-black that visually closes every long-scroll page. The footer is the only dark surface in the system; everything above stays light and airy.

### Key Characteristics

- Light canvas with **Core Blue primary CTA** (`{colors.primary}` — #1A7FCC). Buttons are `{rounded.md}` (8px) with weight-700 labels in DM Sans. Friendly but confident.
- **Darker Grotesque** for headlines (900 for logo/h1, 700 for subheads). Tight letter-spacing on display sizes for premium feel.
- **Frost** (`{colors.surface-card}` — #E8F5FF) and **Slate** (`{colors.surface-soft}` — #F5F7FA) for feature cards, progress cards, and content sections.
- **Learning UI fragments** embedded in cards: concept tooltips, AI chat prompts, XP progress bars, source links. Brand voltage from _real learning moments_ at small scale.
- **Nav-pill-group** (`{component.nav-pill-group}`) — pill-radius wrapper for category switches (e.g., Coding / Matematika / Sains / Bahasa). Signature interactive component.
- **Avatar badges** are circular (`{rounded.full}`), 36px, used in streak displays, peer testimonials, and mentor profiles.
- Footer is **Void** (`{colors.void}` — #070B11) with light text (`{colors.on-dark-soft}` — #a1a1aa). The dark footer closes every page even though the body above is light.
- Spacing rhythm is `{spacing.section}` (96px) between major bands — generous enough to breathe, tight enough to feel modern.
- Border radius is hierarchical: `{rounded.md}` (8px) for buttons + inputs, `{rounded.lg}` (12px) for content cards, `{rounded.xl}` (16px) for hero learning-mockup containers, `{rounded.pill}` for nav-pill-group + badges, `{rounded.full}` for avatars.

---

## Colors

### Brand & Accent

| Token                     | Value                     | Use                                                                      |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------ |
| `{colors.primary}`        | `#1A7FCC` (**Core Blue**) | Primary CTAs, active links, logo suffix "ise.", progress indicators      |
| `{colors.primary-active}` | `#1566A3`                 | Press/hover state for primary buttons                                    |
| `{colors.accent-sky}`     | `#4DB8FF` (**Sky Blue**)  | Hover states, gradient accents, secondary highlights                     |
| `{colors.reward}`         | `#F5A623` (**Spark**)     | XP, badges, streaks, achievement moments — use sparingly for celebration |

### Surface

| Token                     | Value                 | Use                                                                                   |
| ------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| `{colors.canvas}`         | `#FFFFFF`             | Default page background (light mode)                                                  |
| `{colors.surface-soft}`   | `#F5F7FA` (**Slate**) | Section dividers, alternating band backgrounds, subtle cards                          |
| `{colors.surface-card}`   | `#E8F5FF` (**Frost**) | Feature cards, concept explanation cards, testimonial cards                           |
| `{colors.surface-strong}` | `#D1E7F7`             | Hairline alternative, disabled states, subtle borders                                 |
| `{colors.void}`           | `#070B11`             | Footer background, dark mode hero, splash screen — _only dark surface on light pages_ |
| `{colors.void-elevated}`  | `#0F1A29`             | Nested cards inside footer or dark-mode modals                                        |
| `{colors.hairline}`       | `#E2E8F0`             | 1px border on light surfaces: inputs, dividers, card outlines                         |
| `{colors.hairline-soft}`  | `#F1F5F9`             | Barely-visible dividers between sections on white canvas                              |

### Text

| Token                   | Value                | Use                                                |
| ----------------------- | -------------------- | -------------------------------------------------- |
| `{colors.ink}`          | `#0C1F3D` (**Navy**) | Headlines, primary text, logo prefix "Clar"        |
| `{colors.body}`         | `#334155`            | Default body text, descriptions, explanations      |
| `{colors.muted}`        | `#64748B`            | Secondary text: subheadings, metadata, helper text |
| `{colors.muted-soft}`   | `#94A3B8`            | Tertiary text: captions, fine print, timestamps    |
| `{colors.on-primary}`   | `#FFFFFF`            | Text on Core Blue buttons and active states        |
| `{colors.on-dark}`      | `#FFFFFF`            | Text on Void background                            |
| `{colors.on-dark-soft}` | `#CBD5E1`            | Footer body text — slightly muted for link rows    |

### Semantic

| Token              | Value     | Use                                                               |
| ------------------ | --------- | ----------------------------------------------------------------- |
| `{colors.success}` | `#10B981` | Correct answers, completed modules, streak maintained             |
| `{colors.warning}` | `#F59E0B` | Partial progress, hints available, gentle nudges                  |
| `{colors.error}`   | `#EF4444` | Validation errors, incorrect answers (used with encouraging tone) |

---

## Typography

### Font Family

The system runs **Darker Grotesque** for display + brand wordmark and **DM Sans** for everything else. Both are Google Fonts, 100% free for commercial use.

**Darker Grotesque** (geometric, bold, confident):

- Weight 900 (Black): Logo wordmark "Clarise.", h1, hero headlines
- Weight 700 (Bold): h2, h3, subheadings, CTA buttons, category labels

**DM Sans** (humanist, readable, friendly):

- Weight 500 (Medium): Labels, captions, metadata, tags, nav links
- Weight 400 (Regular): Body text, explanations, paragraphs
- Weight 300 (Light): Taglines, decorative subtitles, quote attributions

Fallback stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`

### Hierarchy

| Token                     | Font             | Size | Weight | Line Height | Letter Spacing | Use                                                    |
| ------------------------- | ---------------- | ---- | ------ | ----------- | -------------- | ------------------------------------------------------ |
| `{typography.display-xl}` | Darker Grotesque | 64px | 900    | 1.05        | -1.5px         | Homepage h1 ("Learn anything. Understand everything.") |
| `{typography.display-lg}` | Darker Grotesque | 48px | 900    | 1.1         | -1px           | Section heads ("Mulai dari dasar, kuasai konsep")      |
| `{typography.display-md}` | Darker Grotesque | 36px | 700    | 1.15        | -0.5px         | Sub-section heads, module titles                       |
| `{typography.display-sm}` | Darker Grotesque | 28px | 700    | 1.2         | 0              | CTA-band heads, pricing tier prices                    |
| `{typography.title-lg}`   | DM Sans          | 22px | 700    | 1.3         | 0              | Course names, plan titles                              |
| `{typography.title-md}`   | DM Sans          | 18px | 700    | 1.4         | 0              | Feature card titles, concept headers                   |
| `{typography.title-sm}`   | DM Sans          | 16px | 700    | 1.4         | 0              | Small card titles, list labels                         |
| `{typography.body-md}`    | DM Sans          | 16px | 400    | 1.5         | 0              | Default running text, explanations                     |
| `{typography.body-sm}`    | DM Sans          | 14px | 400    | 1.5         | 0              | Footer body, fine print, helper text                   |
| `{typography.caption}`    | DM Sans          | 13px | 500    | 1.4         | 0              | Badge labels, XP counters, timestamps                  |
| `{typography.code}`       | DM Sans          | 14px | 400    | 1.5         | 0              | Code snippets, inline technical terms                  |
| `{typography.button}`     | DM Sans          | 14px | 700    | 1.0         | 0              | Standard button labels                                 |
| `{typography.nav-link}`   | DM Sans          | 14px | 500    | 1.4         | 0              | Top-nav menu items, category tabs                      |

### Principles

- **Darker Grotesque is the brand voice** — every display headline uses it. DM Sans handles supporting text.
- Never put body copy in Darker Grotesque; never put a display headline in DM Sans.
- Display weight: 900 for logo/h1, 700 for subheads. Never use 400 for headlines.
- Negative letter-spacing only on display sizes ≥36px. Body text always has 0 tracking.
- DM Sans 300 (Light) is decorative only — use for taglines or quote attributions, never for functional UI.

### Note on Font Loading

Both fonts are served via Google Fonts. Use `font-display: swap` to ensure content remains readable during load. Preload critical weights for hero section.

---

## Layout

### Spacing System

- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) — universal vertical rhythm between learning bands.
- **Card internal padding:** `{spacing.xl}` (32px) for feature cards and course cards; `{spacing.lg}` (24px) for concept tooltips and micro-interactions.
- **Gutters:** `{spacing.lg}` (24px) between cards in 3-up grids; `{spacing.md}` (16px) inside footer columns.

### Grid & Container

- **Max content width:** ~1100px centered on learning pages (slightly narrower than marketing sites to improve reading comfort).
- **Editorial body:** Single 12-column grid; hero band often uses 6/6 split (headline + CTA left, learning preview right).
- **Course card grids:** 3-up at desktop, 2-up at tablet, 1-up at mobile.
- **Category navigation:** Horizontal scroll on mobile, wrapped pills on tablet, full row on desktop.
- **Footer:** 4-column link list at desktop (Tentang / Kategori / Fitur / Dukungan), wrapping to 2-up at tablet, 1-up at mobile.

### Whitespace Philosophy

Clarise uses **generous, calm whitespace** — section padding at 96px, card padding at 32px. The rhythm is calibrated for _focused learning_: every band has a single clear objective, never densely packed. The result reads as _patient, not overwhelming_ — aligned with the "Clarity First" value.

---

## Elevation & Depth

| Level           | Treatment                                              | Use                                                   |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| Flat            | No shadow, no border                                   | Body sections, top nav, hero bands                    |
| Soft hairline   | 1px `{colors.hairline}` border                         | Inputs, concept dividers, card outlines               |
| Card surface    | `{colors.surface-card}` (Frost) background — no shadow | Feature cards, concept explanations, testimonials     |
| Subtle lift     | `0 2px 8px rgba(12, 31, 61, 0.08)`                     | Hover states on course cards, active concept tooltips |
| Featured module | `{colors.primary}` accent border (2px left)            | Highlighted course, "recommended for you" cards       |

The elevation philosophy is **soft and focused** — minimal shadows, color accents for emphasis. No heavy drop shadows, no glassmorphism. Depth serves _clarity_, not decoration.

### Decorative Depth

- **Concept tooltips** and **inline AI chat previews** embedded in cards carry subtle lift shadows — these signal interactivity without overwhelming content.
- **XP badges** and **streak indicators** use `{colors.reward}` (Spark) with subtle inner glow for celebratory moments — used sparingly to avoid visual noise.

---

## Shapes

### Border Radius Scale

| Token            | Value        | Use                                                       |
| ---------------- | ------------ | --------------------------------------------------------- |
| `{rounded.xs}`   | 4px          | Inline code highlights, small tag accents                 |
| `{rounded.sm}`   | 6px          | Secondary buttons, dropdown items                         |
| `{rounded.md}`   | 8px          | Primary CTAs, text inputs, category tabs                  |
| `{rounded.lg}`   | 12px         | Content cards (course cards, concept cards, testimonials) |
| `{rounded.xl}`   | 16px         | Hero learning-preview card, modal containers              |
| `{rounded.pill}` | 9999px       | Nav-pill-group, badge pills, XP counters                  |
| `{rounded.full}` | 9999px / 50% | Avatars, streak icons, achievement badges                 |

### Learning UI Geometry

- Avatar circles use `{rounded.full}` at 36px for peer testimonials and mentor profiles.
- Concept tooltip cards use `{rounded.lg}` with subtle lift shadow — feels like a "helping hand" appearing.
- Hero preview zones use 16:9 ratio with `{rounded.xl}` corners — shows the actual Clarise learning interface.

---

## Components

### Top Navigation

**`top-nav`** — Light nav bar pinned to top. 64px tall, `{colors.canvas}` background. Carries:

- Left: Clarise wordmark ("Clar" in Navy, "ise." in Core Blue) + period signature
- Center: Primary horizontal menu (Kategori / Fitur / Tentang / Harga)
- Right: "Masuk" text-link + "Mulai Belajar" `{component.button-primary}`

Menu items in `{typography.nav-link}` (DM Sans 14px / 500, Navy text). Active state uses Core Blue underline.

**`nav-pill-group`** — Pill-radius wrapper for category switches (e.g., "Coding" / "Matematika" / "Sains" / "Bahasa"). Background `{colors.surface-soft}` with internal padding 6px, rounded `{rounded.pill}`. Active segment: white background, Core Blue text, subtle shadow. _Signature component for intuitive navigation._

### Buttons

**`button-primary`** — Signature primary CTA. Background `{colors.primary}` (#1A7FCC), text `{colors.on-primary}`, type `{typography.button}` (DM Sans 14px / 700), padding 12px × 24px, height 40px, rounded `{rounded.md}` (8px). Active state shifts to `{colors.primary-active}` (#1566A3). _Encouraging, not pushy._

**`button-secondary`** — Outline button. Background `{colors.canvas}`, text `{colors.primary}`, 1px Core Blue border, same padding + height + radius as primary. Used for "Lihat Preview" or "Pelajari Dulu".

**`button-icon-circular`** — 36 × 36px circular icon button. Background `{colors.canvas}`, hairline border, Core Blue icon. Used for "tanya AI", "simpan konsep", carousel arrows.

**`button-text-link`** — Inline text button, no background. Used for "Lihat sumber" inside concept cards.

### Cards & Containers

**`hero-band`** — Light-canvas hero with 6/6 grid: h1 + sub-headline + button row left, `{component.hero-learning-preview}` right. Vertical padding `{spacing.section}` (96px).

**`hero-learning-preview`** — Preview card showing actual Clarise interface: concept explanation + inline AI chat + "Tanya Lanjut" CTA. Background `{colors.canvas}`, 1px hairline border, rounded `{rounded.xl}` (16px), subtle lift shadow. _Shows the product, doesn't decorate around it._

**`feature-card`** — Used in 3-up feature grids ("Penjelasan Mendalam", "Tanya Kapan Saja", "Sumber Terkurasi"). Background `{colors.surface-card}` (Frost), rounded `{rounded.lg}` (12px), internal padding `{spacing.xl}` (32px). Carries icon, `{typography.title-md}` headline, body in `{typography.body-md}`.

**`concept-card`** — Core learning component. Shows a concept explanation with inline tooltip trigger. Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.lg}` (24px). Includes: concept title, short explanation, "Klik untuk jelaskan" trigger, and source attribution.

**`testimonial-card`** — Used in peer-voice sections. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding `{spacing.lg}` (24px). Top row: `{component.avatar-circle}` + name + role; quote in `{typography.body-md}` with Core Blue accent on key phrase.

**`course-card`** — Standard course entry. Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xl}` (32px). Carries: category badge, course title in `{typography.title-lg}`, progress bar (if started), XP reward indicator, and `{component.button-primary}` "Lanjutkan" or "Mulai".

**`course-card-featured`** — Featured/recommended course. Adds 2px `{colors.primary}` left border + subtle `{colors.accent-sky}` background tint. _Color contrast does the emphasis — no badges needed._

### Inputs & Forms

**`text-input`** — Standard text input. Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body-md}`, rounded `{rounded.md}` (8px), padding 10px × 14px, height 40px. 1px hairline border in `{colors.hairline}`.

**`text-input-focused`** — Focus state. Border shifts to `{colors.primary}` with subtle glow `0 0 0 3px rgba(26, 127, 204, 0.15)`.

**`ai-chat-input`** — Specialized input for "Tanya Clarise" feature. Includes micro-copy hint ("Tanya apa saja tentang materi ini…") and send icon. Same dimensions as `text-input` but with `{colors.surface-card}` background to signal interactivity.

### Tags / Badges

**`badge-pill`** — Small pill label for categories ("Pemula", "Menengah", "Pro") or achievements ("Streak 7 Hari!"). Background `{colors.surface-card}` or `{colors.reward}` for achievements, text `{colors.ink}` or `{colors.on-primary}`, type `{typography.caption}` (13px / 500), rounded `{rounded.pill}`, padding 4px × 12px.

**`avatar-circle`** — 36px diameter, rounded `{rounded.full}`. Holds photo or initials on Frost background. Used in testimonials, peer progress, mentor profiles.

**`xp-badge`** — Circular badge showing XP earned. Background `{colors.reward}` (Spark), white icon/text, subtle inner glow. Used in progress headers and completion modals.

### Tab / Filter

**`category-tab`** + **`category-tab-active`** — Used inside nav-pill-group. Inactive: transparent background, `{colors.muted}` text. Active: `{colors.canvas}` background, `{colors.primary}` text, subtle shadow inside pill wrapper. Padding 8px × 16px, rounded `{rounded.md}`.

### CTA / Footer

**`cta-band-light`** — Pre-footer "Siap paham lebih dalam?" CTA card. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding `{spacing.xxl}` (48px). Carries h2 in `{typography.display-sm}`, sub-line, and centered `{component.button-primary}`.

**`footer`** — Void footer that closes every page. Background `{colors.void}` (#070B11), text `{colors.on-dark-soft}`. 4-column link list at desktop. Vertical padding 64px. Clarise wordmark at top-left in `{colors.on-dark}` (with Core Blue "ise."). _The only dark surface on light pages — deliberate visual closure._

---

## Do's and Don'ts

### Do ✅

- Reserve `{colors.primary}` (#1A7FCC) for primary CTAs, active states, and the "ise." suffix in the logo.
- Use **Darker Grotesque 900** for logo and h1; **700** for subheads. Pair with **DM Sans** body. Never blur the boundary.
- Apply negative letter-spacing _only_ on display sizes ≥36px. Body text always has 0 tracking.
- Use `{colors.surface-card}` (Frost) for concept cards and `{colors.canvas}` for product previews — Frost signals "explanation", white signals "interactive".
- Embed _real learning moments_ inside cards: concept tooltips, AI chat previews, XP progress. Show the experience, don't illustrate it.
- Keep avatar circles at 36px, perfect circles. Use Frost background for initials.
- Use `{component.nav-pill-group}` for category navigation. The pill-in-pill treatment is signature.
- End every page with the Void footer. The light-to-dark transition is part of the learning rhythm.

### Don't ❌

- Don't use `{colors.reward}` (Spark) on primary CTAs. Reserve it for achievements and celebration moments only.
- Don't bold DM Sans beyond 700. Clarity comes from hierarchy, not weight.
- Don't use border radius beyond `{rounded.xl}` (16px) on cards. Larger radii feel playful; Clarise is premium and focused.
- Don't put dark surfaces anywhere except the footer and featured module accents. Void is a deliberate, scarce signal.
- Don't repeat the same surface mode in consecutive bands. Clarise's pacing alternates: Canvas → Frost → Canvas → Preview → Canvas → Void.
- Don't add hover states beyond what's documented. Primary darkens on press; concept cards lift subtly. That's it.

---

## Responsive Behavior

### Breakpoints

| Name    | Width       | Key Changes                                                                                         |
| ------- | ----------- | --------------------------------------------------------------------------------------------------- |
| Mobile  | < 768px     | Hamburger nav; hero h1 64→32px; learning-preview stacks below; course grids 1-up; footer 4 cols → 1 |
| Tablet  | 768–1024px  | Nav stays horizontal but tightens; nav-pill-group wraps; course cards 2-up                          |
| Desktop | 1024–1440px | Full nav with all items; 3-up course grids; 4-column footer                                         |
| Wide    | > 1440px    | Same as desktop with more outer breathing room; max content width caps at 1100px                    |

### Touch Targets

- `{component.button-primary}` minimum 40 × 40px.
- `{component.button-icon-circular}` exactly 36 × 36px — centered icon compensates for slight WCAG variance.
- `{component.text-input}` height 40px.
- `{component.category-tab}` inside nav-pill-group has 8 × 16 padding; effective tap area meets 44px+ with surrounding pill.

### Collapsing Strategy

- Top nav collapses to hamburger at < 768px; menu opens as full-screen sheet with Frost background.
- Hero band's 6/6 grid collapses to single-column on mobile — headline + CTA first, learning-preview below.
- Course grids reduce columns rather than scaling cards down.
- Nav-pill-group wraps to multi-row on tablet if categories don't fit horizontally.
- Avatar + testimonial layouts stay grid-aligned at every breakpoint.

### Learning UI Behavior

- Concept tooltips expand inline on mobile (no popover) to avoid overlay confusion.
- AI chat input stays fixed at bottom on mobile for easy access during reading.
- XP badges and streak indicators animate subtly on completion — but respect `prefers-reduced-motion`.

---

## Iteration Guide

1. **Focus on ONE component at a time.** Reference its YAML key directly (`{component.concept-card}`, `{component.course-card-featured}`).
2. **Variants** (`-active`, `-completed`, `-locked`) live as separate entries in `components:`.
3. **Use `{token.refs}` everywhere** — never inline hex. This keeps the system maintainable.
4. **Never document hover.** Default and Active/Pressed states only.
5. **Display headlines stay Darker Grotesque 900/700.** Body stays DM Sans 400. The trinity does not blur.
6. **The Void footer is the only dark surface** on most pages. Don't add other dark cards casually.
7. **When in doubt about emphasis:** clearer hierarchy before brighter color. Clarise is about _understanding_, not shouting.

---

## Known Gaps & Next Steps

- [ ] Document animation timings for XP badge pop, streak celebration, and concept tooltip fade-in.
- [ ] Define dark mode color tokens (beyond footer) for future "Focus Mode" feature.
- [ ] Specify AI chat interaction states: typing indicator, error recovery, "clarify further" flow.
- [ ] Add accessibility notes: color contrast ratios, focus order for keyboard navigation, screen reader labels for concept tooltips.
- [ ] Document micro-copy guidelines: tone for hints, error messages, and encouragement (aligned with "encouraging, not preachy" brand voice).
- [ ] Define Web3/Learn-to-Earn UI patterns for future roadmap (token badges, wallet connect, reward redemption).

---

> **Clarise.**  
> _Learn anything. Understand everything._  
> Design with clarity. Build with empathy.

---

_File version: 1.0 — Aligned to Clarise Brand Identity (May 2026)_  
_Last updated: {{DATE}}_  
_Owner: Design System Team_
