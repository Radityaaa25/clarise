# Clarise - Learning Management System

A modern, scalable learning management system built with Next.js, Turborepo, and Supabase.

## Project Overview

Clarise is a comprehensive e-learning platform featuring course management, AI-powered assistance, payment integration, and user achievement tracking. Built as a monorepo using Turborepo for efficient management of multiple applications and shared packages.

## Project Structure

### Root Level Files

- `package.json` - Root workspace configuration
- `pnpm-workspace.yaml` - pnpm workspace configuration
- `turbo.json` - Turborepo configuration and task pipelines
- `pnpm-lock.yaml` - Dependency lock file
- `DESIGN.md` - Design system and UI guidelines
- `README.md` - This file
- `skills-lock.json` - Skills configuration lock file
- `.npmrc` - NPM configuration
- `.gitignore` - Git ignore rules

### Directory Structure

```
clarise/
├── apps/                           # Monorepo applications
│   ├── app/                        # Main application (Next.js)
│   │   ├── app/                    # App directory (Next.js 13+)
│   │   │   ├── (auth)/             # Auth routes group
│   │   │   │   ├── sign-in/        # Sign in page
│   │   │   │   └── sign-up/        # Sign up page
│   │   │   ├── (course)/           # Course routes group
│   │   │   │   └── course/
│   │   │   │       └── [slug]/     # Dynamic course page
│   │   │   ├── (dashboard)/        # Dashboard routes group
│   │   │   │   ├── dashboard/      # Main dashboard
│   │   │   │   ├── achievment/     # Achievements/progress page
│   │   │   │   └── explore/        # Course exploration page
│   │   │   ├── api/                # API routes
│   │   │   │   ├── ai/
│   │   │   │   │   └── ask/        # AI assistant endpoint
│   │   │   │   └── webhook/
│   │   │   │       └── tripay/     # Payment webhook (Tripay)
│   │   │   ├── layout.tsx          # Root layout component
│   │   │   ├── page.tsx            # Home page
│   │   │   └── globals.css         # Global styles
│   │   ├── components/             # Reusable React components
│   │   │   ├── ai/                 # AI-related components
│   │   │   ├── course/             # Course-related components
│   │   │   ├── dashboard/          # Dashboard components
│   │   │   ├── layout/             # Layout components (header, footer, etc.)
│   │   │   └── ui/                 # Basic UI components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utility libraries and helpers
│   │   │   ├── gemini.ts           # Google Gemini AI integration
│   │   │   ├── prisma.ts           # Prisma ORM client
│   │   │   ├── supabase.ts         # Supabase client setup
│   │   │   ├── ratelimit.ts        # Rate limiting utilities
│   │   │   └── utils.ts            # General utility functions
│   │   ├── types/                  # TypeScript type definitions
│   │   ├── prisma/
│   │   │   └── schema.prisma       # Database schema definition
│   │   ├── middleware.ts           # Next.js middleware
│   │   ├── next.config.ts          # Next.js configuration
│   │   ├── postcss.config.mjs      # PostCSS configuration
│   │   ├── tsconfig.json           # TypeScript configuration
│   │   ├── components.json         # Shadcn/ui configuration
│   │   ├── package.json            # App dependencies
│   │   ├── .env.local              # Environment variables (local)
│   │   └── .clerk/                 # Clerk authentication config
│   │
│   └── landing/                    # Landing page app (Next.js)
│       ├── app/
│       │   ├── layout.tsx          # Landing layout
│       │   ├── page.tsx            # Landing page
│       │   └── globals.css         # Landing styles
│       ├── components/             # Landing components
│       ├── lib/
│       │   └── utils.ts            # Landing utilities
│       ├── public/                 # Static assets
│       ├── next.config.ts
│       ├── postcss.config.mjs
│       ├── tsconfig.json
│       ├── components.json
│       ├── package.json
│       ├── .env.local
│       └── next-env.d.ts
│
├── packages/                       # Shared packages
│   ├── eslint-config/              # Shared ESLint configurations
│   │   ├── base.js                 # Base ESLint rules
│   │   ├── next.js                 # Next.js ESLint config
│   │   ├── react-internal.js       # React ESLint config
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── typescript-config/          # Shared TypeScript configurations
│   │   ├── base.json               # Base TypeScript config
│   │   ├── nextjs.json             # Next.js specific config
│   │   ├── react-library.json      # React library config
│   │   └── package.json
│   │
│   └── ui/                         # Shared UI component library
│       ├── src/                    # Component source files
│       │   ├── button.tsx          # Button component
│       │   ├── card.tsx            # Card component
│       │   └── code.tsx            # Code component
│       ├── eslint.config.mjs
│       ├── tsconfig.json
│       ├── package.json
│       └── next-env.d.ts
│
├── .agents/                        # AI agent skills and configurations
│   └── skills/                     # Reusable skills for agents
│       ├── accessibility/          # A11y audit and WCAG compliance
│       ├── best-practices/         # Web dev best practices
│       ├── performance/            # Performance optimization
│       ├── seo/                    # SEO optimization
│       ├── supabase/               # Supabase utilities and auditing
│       ├── next-best-practices/    # Next.js specific best practices
│       ├── owasp-security/         # OWASP security practices
│       ├── turborepo/              # Turborepo configuration help
│       └── ... (other skills)
│
└── node_modules/                  # Workspace dependencies
```

### Key Technologies

- **Next.js** - React framework for production
- **TypeScript** - Static type checking
- **Prisma** - ORM for database operations
- **Supabase** - Backend as a Service (PostgreSQL, Auth, Storage)
- **Turborepo** - Monorepo task orchestration
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library
- **Google Gemini** - AI assistant integration
- **Tripay** - Payment gateway integration
- **Clerk** - Authentication service

### Apps and Packages

- **`app`**: Main application - Core LMS features including courses, dashboard, authentication, and AI assistant
- **`landing`**: Landing page - Marketing and information website
- **`@repo/ui`**: Shared component library - Reusable UI components
- **`@repo/eslint-config`**: Shared ESLint configurations
- **`@repo/typescript-config`**: Shared TypeScript configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
pnpm dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
pnpm exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
pnpm exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
pnpm exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
pnpm exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)


NOTED PENTING! JANGAN UBAH YANG SAYA TIDAK MINTA!