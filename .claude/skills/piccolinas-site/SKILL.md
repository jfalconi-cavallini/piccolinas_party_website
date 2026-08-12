---
name: piccolinas-site
description: Context and conventions for the Piccolinas Party Decoration & Rental website (Next.js). Load this when working on this project to pick up prior decisions, section structure, and the paused CRM/admin plan.
---

# Piccolinas Party website

Merced, CA event-decor and party-rental business. Est. 2005. Single-page marketing site with a contact form and a browse-only shop (no checkout).

## Tech stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 is installed but essentially unused — nearly all styling is inline `style={{}}` objects. Shared utility classes live in `app/globals.css` (`.btn-primary`, `.btn-solid`, `.gallery-item`, `.form-input`, `.section-eyebrow`, `.section-title`, `.section-subtitle`).
- `@emailjs/browser` sends the contact form client-side straight to an EmailJS service/template — no backend.
- Fonts: Cinzel (nav/labels, uppercase, letter-spaced), Cormorant Garamond (headings), Lato (body). Loaded via Google Fonts `<link>` in `app/layout.tsx`.
- Color tokens (see `:root` in `app/globals.css`): `--gold #C9A84C`, `--gold-dark #8B6914`, `--cream #FDF8F0`, `--cream-dark #F5EDD8`, `--charcoal #1A1A1A`, `--taupe #8B7355`.
- No database, no CMS, no API routes as of this writing — every piece of content lives in `app/page.tsx` (~2300 lines), one function per section, rendered in order by `Home()`.

## Page structure (in render order)
Nav → Hero → Marquee → Story → Services (8 cards) → Rentals → Gallery (15-photo masonry + lightbox) → Shop (tabbed: Centerpieces / Foam Cutouts / Piñatas, no prices — "Inquire" links to contact) → Testimonials → Banner → Contact (EmailJS form) → Footer.

Images live in `public/images/` — `decoration1-15.jpg`, `pinata1-13.jpg`, plus logos. No dedicated foam-cutout photos exist yet; the Shop's Foam Cutouts tab currently reuses `decoration*.jpg` files as placeholders.

## Conventions / decisions made so far
- Business founding date is **2005** (not 2006 — this was corrected everywhere: Hero, Story, Footer, `layout.tsx` metadata). Stat callouts use "20+ Years" (rounded, paired with "over two decades" in prose).
- Shop intentionally has **no visible prices** — every product just has an "Inquire" link to `#contact`. This was a deliberate request (the previous placeholder $ prices were fake).
- Services section is a photo-card grid (not a plain list) — customer specifically wants images per service, not bare text.
- Rentals is its own section (not folded into a Services card) — separate items: Tables, Chairs, Coolers, Heaters, Tents & Canopies. No photos for these yet, icon-only cards.

## Paused: custom image-management admin (CRM)
The customer wants to self-serve: upload/remove/reorder photos and edit titles/captions for **Gallery, Shop, and Services** without a developer. This is **on the backburner** — not started, but fully scoped. Full architecture (schema, auth approach, file plan, migration steps) is written up and should be resumed from there rather than re-designed from scratch:

- **Stack decided**: Supabase (Postgres + Storage) — user has prior Supabase experience from another project and explicitly wants a **simple, single-table schema**.
- **Schema**: one `images` table — `id, section ('gallery'|'services'|'shop'), category (shop sub-tab only, nullable), title, caption, image_url, sort_order, created_at`.
- **Auth**: single shared admin password (env var), no per-user accounts — cookie value equals a `SESSION_SECRET` env var, checked in `middleware.ts`. Deliberately skipped JWT/HMAC — overkill for one non-technical admin.
- **Scope**: only Gallery/Services/Shop become manageable. Hero, Story, Rentals, Testimonials, Banner stay hardcoded in code by design (explicit user choice).
- **Refactor needed**: `app/page.tsx` currently has `"use client"` at the top (whole page). To fetch from Supabase server-side, the section components need to move into a client component file (e.g. `app/components/Sections.tsx`) while `app/page.tsx` becomes an async Server Component that fetches data and passes it down as props.
- **Hosting target**: Vercel.

If resuming this: re-derive the detailed plan by reviewing this section plus the current `app/page.tsx` structure above — the previous planning session had already worked out the full file list (admin routes, server actions, `lib/supabase.ts`, `lib/images.ts`, a `dnd-kit`-based drag-reorder admin UI, a one-time seed script to migrate the existing hardcoded arrays into the new table) before being paused. Don't restart the design from zero; the architecture above is the intended one.
