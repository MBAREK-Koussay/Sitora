<div align="center">

# Sitora

**A trilingual marketing site for a digital agency, with animated hero and a consultation form that stores and emails every request.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)

English · Français · العربية (RTL)

</div>

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Setting up the consultation form](#setting-up-the-consultation-form)
- [Project structure](#project-structure)
- [Working with languages](#working-with-languages)
- [Deployment](#deployment)
- [Scripts](#scripts)

## Features

- **Three languages, one codebase.** English, French and Arabic, served from `/en`, `/fr` and `/ar`. Arabic switches the whole page to right-to-left (layout, arrows, fonts).
- **Smart language redirect.** `/` sends visitors to their saved language, then to their browser language, then to English. Switching language is a soft navigation: no page reload.
- **Light and dark mode.** Follows the visitor's system setting on first visit, remembers their choice, and applies it before first paint (no flash). Colours are CSS variables in `app/globals.css`.
- **Animated hero.** A GSAP timeline reveals the headline word by word, builds the dashboard mockup, and adds floating badges and scroll parallax. Respects `prefers-reduced-motion`.
- **Consultation form with a real backend.** Each request is validated, saved to Supabase and emailed to the team. The visitor gets an acknowledgement in their own language.
- **Statically generated pages** for every language, with per-language metadata.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [GSAP](https://gsap.com) + `@gsap/react` |
| Database | [Supabase](https://supabase.com) (Postgres) via `@supabase/supabase-js` |
| Email | [Resend](https://resend.com) (REST API) |
| Language | TypeScript |
| Hosting | Netlify |

> **Heads-up for contributors:** this version of Next.js differs from older releases (for example, `proxy.ts` replaces `middleware.ts`). Read the docs bundled in `node_modules/next/dist/docs/` before changing framework-level code. See [AGENTS.md](AGENTS.md).

## Getting started

**Prerequisites:** a recent Node.js LTS and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local        # Windows PowerShell: Copy-Item .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>. It redirects to a language route such as `/en`.

The site renders without any environment variables. Only the consultation form needs them (see below).

## Environment variables

Set these in `.env.local` for development, and in your host's settings for production. **Restart the dev server after changing them.**

| Variable | Required | Description |
| --- | --- | --- |
| `SUPABASE_URL` | for saving requests | Project URL, e.g. `https://xxxx.supabase.co` |
| `SUPABASE_SECRET_KEY` | for saving requests | The **secret** key (`sb_secret_…`, or legacy `service_role`). Server-only. |
| `RESEND_API_KEY` | for email | API key from Resend (`re_…`) |
| `CONSULTATION_FROM` | for email | Sender on a domain verified in Resend, e.g. `Sitora <contact@mail.example.com>` |
| `CONSULTATION_TO` | for email | Inbox that receives new requests |

> **Never** prefix these with `NEXT_PUBLIC_`, never commit `.env.local`, and never use Supabase's publishable key here: it cannot write to the table. `.env.example` is the only env file tracked by git, so keep real values out of it.

## Setting up the consultation form

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste [`supabase/migrations/20261022000000_consultation_requests.sql`](supabase/migrations/20261022000000_consultation_requests.sql) and run it. This creates the `consultation_requests` table with row-level security on and no public access. Only the server can write to it.
3. Copy the project URL and the secret key from **Project Settings → API Keys** into `.env.local`.

### 2. Resend

1. Create an API key in [Resend](https://resend.com/api-keys) and set `RESEND_API_KEY`.
2. To try it quickly, use `CONSULTATION_FROM=Sitora <onboarding@resend.dev>` and set `CONSULTATION_TO` to the email of your Resend account. This sender only delivers to your own address, so visitor confirmations are not sent in this mode.
3. For production, add a domain you control under **Domains**, create the DNS records Resend lists, wait for verification, then use an address on that domain.

### How a submission is handled

[`app/[lang]/actions.ts`](app/[lang]/actions.ts) is a Server Action:

1. A hidden honeypot field silently discards most bots.
2. [`app/lib/consultation.ts`](app/lib/consultation.ts) validates the fields. Options are posted as indexes and mapped to canonical English values, so stored data does not depend on the visitor's language.
3. The request is saved to Supabase **and** emailed to `CONSULTATION_TO` in parallel. It counts as received if at least one succeeds. If both fail, the visitor sees an error and keeps what they typed.
4. A confirmation email is sent to the visitor in their language. If that fails, the request is still accepted.

Failures are logged on the server with a `[consultation]` prefix.

New requests appear in the Supabase **Table Editor** under `consultation_requests`. The `status` column (`new`, `contacted`, `closed`) is there for you to track follow-up.

## Project structure

```
.
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx            # <html lang dir>, fonts, per-language metadata
│   │   ├── page.tsx              # Assembles the page sections
│   │   ├── actions.ts            # Server Action: consultation backend
│   │   ├── dictionaries.ts       # Loads the JSON for a language
│   │   └── dictionaries/         # en.json · fr.json · ar.json (all site copy)
│   ├── components/sitora/        # One component per page section
│   ├── lib/
│   │   ├── i18n.ts               # Supported languages, direction, cookie name
│   │   ├── consultation.ts       # Form validation and option lists
│   │   └── consultation-emails.ts# Email templates (team + visitor)
│   └── globals.css               # Tailwind + colour palette variables
├── public/sitora/                # Images and SVG icons
├── supabase/migrations/          # SQL for the database
├── proxy.ts                      # Language detection and redirect
└── .env.example                  # Template for environment variables
```

## Working with languages

**Edit the copy.** All text lives in `app/[lang]/dictionaries/*.json`. Keep the three files in the same shape: the English file defines the TypeScript type, so a missing key in `fr.json` or `ar.json` fails the type check.

**Add a language** (for example Spanish, `es`):

1. Add `"es"` to `locales` in [`app/lib/i18n.ts`](app/lib/i18n.ts). Update `dirOf` if it is right-to-left.
2. Create `app/[lang]/dictionaries/es.json` with the same keys as `en.json`, and register it in [`dictionaries.ts`](app/[lang]/dictionaries.ts).
3. Add its entry to `COPY` in [`consultation-emails.ts`](app/lib/consultation-emails.ts).
4. Add a new migration that widens the `locale` check constraint on `consultation_requests`, so saving the new language is accepted.

## Deployment

The site is deployed on **Netlify**.

1. Connect the GitHub repository to a Netlify site (build command `npm run build`).
2. Add the [environment variables](#environment-variables) under **Site configuration → Environment variables**.
3. Make sure the Supabase migration has been run on the production project.
4. Redeploy after any change to environment variables.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

> Avoid running `npm run build` while `npm run dev` is running: both write to `.next`, and the dev server can end up serving stale pages. If you see hydration errors after a build, stop the dev server, delete `.next` and start it again.
