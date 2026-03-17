# BSC Website — Architecture & Data Flow

## System Overview

```
┌─────────────────────────────────┐
│         Frontend (Next.js)      │
│  localhost:3000 / bsc.ba        │
│  ─ Server Components (RSC)     │
│  ─ Static fallback data        │
│  ─ Tailwind CSS + Framer Motion│
└────────┬────────────────────────┘
         │ Direct Payload API calls
         │ (server-side, no REST)
┌────────▼────────────────────────┐
│       Payload CMS (v3.79)       │
│  ─ Admin UI: /admin             │
│  ─ REST API: /api/*             │
│  ─ Auth: admin@bsc.ba           │
│  ─ Locales: bs (default), en    │
└────────┬──────────┬─────────────┘
         │          │
    ┌────▼───┐  ┌───▼──────────────────┐
    │ Postgres│  │  Supabase Storage    │
    │  (DB)  │  │  Bucket: bsc_slike   │
    └────────┘  └──────────────────────┘
```

## Infrastructure

| Component | URL / Connection |
|-----------|-----------------|
| Frontend + Payload | `http://localhost:3000` (dev) |
| PostgreSQL | `postgresql://postgres:payloadbsc2026@bsc.deployer3000.halvooo.com:55445/postgres` |
| Supabase (self-hosted) | `https://bsc.deployer3000.halvooo.com` |
| Storage Bucket | `bsc_slike` (public) |
| CMS Admin | `http://localhost:3000/admin` |

## Authentication

- **CMS Admin:** `admin@bsc.ba` / `admin123`
- **Supabase service_role JWT:** Used internally by the storage adapter (hardcoded in `src/plugins/supabaseStorage.ts`)

---

## Collections (Database Tables)

| Collection | Slug | Purpose | Key Fields |
|-----------|------|---------|------------|
| Users | `users` | Admin users | email, password |
| Media | `media` | All images/files | filename, url, width, height, mimeType |
| Documents | `documents` | Uploaded documents | file |
| Material Categories | `material-categories` | Material category groupings | title, slug, description, color, sortOrder |
| Material Items | `material-items` | Individual materials | name, slug, description, **longDescription1**, **longDescription2**, category (→material-categories), uploadedImage (→media), galleryImages[], **features[]**, sortOrder |
| Product Categories | `product-categories` | Product category groupings | title, slug, description, color, sortOrder |
| Product Items | `product-items` | Individual products | name, slug, description, **longDescription1**, **longDescription2**, category (→product-categories), uploadedImage (→media), galleryImages[], **features[]**, sortOrder |
| News Articles | `news-articles` | Blog/news posts | title, slug, content, image, date |
| Gallery Images | `gallery-images` | Standalone gallery | image, category |
| Pages | `pages` | Generic CMS pages | title, slug, content |

### Per-Item Editable Fields (Product & Material Items)

Each product/material item has these fields editable through the CMS admin:

| Field | Type | Purpose |
|-------|------|---------|
| `name` | text (localized) | Display name |
| `slug` | text | URL identifier |
| `description` | textarea (localized) | Short description (shown in hero + cards) |
| `longDescription1` | textarea (localized) | First paragraph of extended description on detail page. Falls back to global template text. |
| `longDescription2` | textarea (localized) | Second paragraph of extended description on detail page. Falls back to global template text. |
| `features` | array (localized) | Per-item feature cards (title + description + icon). Falls back to global template cards. |
| `uploadedImage` | upload → media | Main hero/card image |
| `galleryImages` | array of uploads → media | Photo gallery |

**Fallback chain for detail page content:**
```
Item-level field → Global detail page field → Hardcoded default in component
```

---

## Globals (Site-Wide Settings)

| Global | Slug | Purpose |
|--------|------|---------|
| Homepage | `homepage` | Hero, about preview, services, materials, portfolio, clients, stats/locations, products, news, CTA |
| Site Settings | `site-settings` | Logos, contact info, social media, UI labels |
| Navigation | `navigation` | Navbar items, mega menu |
| Footer | `footer` | Footer locations array (3 locations with address, phone, email) |
| About Page | `about-page` | About page content + equipment/machines section |
| Contact Page | `contact-page` | Contact page content + working hours |
| Instructions Page | `instructions-page` | File preparation instructions |
| Materials Page | `materials-page` | Materials listing page UI text |
| Products Page | `products-page` | Products listing page UI text |
| News Page | `news-page` | News listing page UI text |
| Material Detail Page | `material-detail-page` | Template text for ALL material detail pages (aboutTitle, aboutParagraph1/2, features, processSteps, advantages, CTA text, etc.) |
| Product Detail Page | `product-detail-page` | Template text for ALL product detail pages (aboutTitle, aboutParagraph1/2, uspCards, processSteps, advantages, CTA text, etc.) |
| News Detail Page | `news-detail-page` | Template text for news article pages |

---

## Media & Supabase Storage

### How It Works

All media (images, files) are stored in Supabase Storage and served via public URLs.

```
Upload flow:
  CMS Admin → Payload API → Custom Adapter → Supabase REST API → bsc_slike bucket

URL format:
  https://bsc.deployer3000.halvooo.com/storage/v1/object/public/bsc_slike/{filename}

Delete flow:
  CMS Admin → Payload API → Custom Adapter → Supabase REST API (DELETE)
```

### Key Files

| File | Purpose |
|------|---------|
| `src/plugins/supabaseStorage.ts` | Custom Payload storage adapter using Supabase REST API |
| `src/lib/imageUrl.ts` | Image URL resolver (handles Supabase URLs, legacy externalUrl, relative paths) |
| `src/collections/Media.ts` | Media collection config (no local storage, adapter handles everything) |

### Image URL Resolution (`getImageUrl()`)

Priority order:
1. `media.externalUrl` → convert to Supabase public URL (legacy, no entries use this anymore)
2. `media.url` → use as-is (full Supabase URL from adapter)
3. Fallback → empty string

---

## Frontend Page Architecture

### Routing

```
/                           → Homepage (src/app/(frontend)/page.tsx)
/about                      → About page
/contact                    → Contact page
/instructions               → File preparation instructions
/materials                  → Materials listing
/materials/[slug]           → Material category page
/materials/[slug]/[item]    → Material item detail page ★
/products                   → Products listing
/products/[slug]            → Product category page
/products/[slug]/[item]     → Product item detail page ★
/news                       → News listing
/news/[slug]                → News article detail
/pdf                        → PDF showcase
/admin                      → Payload CMS admin panel
```

### Detail Page Content Hierarchy (★ pages)

The item detail pages (`/materials/[slug]/[item]` and `/products/[slug]/[item]`) use a 3-tier fallback system:

```
1. Item-level CMS fields (per product/material)
   ↓ if empty
2. Global detail page template (shared by all items)
   ↓ if empty
3. Hardcoded defaults in the component
```

#### What's editable per item:

| Section | Per-Item Field | Global Fallback | Component Default |
|---------|---------------|-----------------|-------------------|
| Extended description ¶1 | `longDescription1` | `itemPage.aboutParagraph1` | Hardcoded Bosnian text |
| Extended description ¶2 | `longDescription2` | `itemPage.aboutParagraph2` | Hardcoded Bosnian text |
| Feature/USP cards | `features[]` (title, description, icon) | `itemPage.uspCards[]` / `itemPage.features[]` | Default 4-6 cards |
| Short description | `description` | — | — |
| Hero image | `uploadedImage` | — | — |
| Gallery | `galleryImages[]` | — | `galleryImages.ts` fallback |

### Static Fallback Data

If the CMS/database is unreachable, pages fall back to static TypeScript data files:

| File | Content |
|------|---------|
| `src/data/materials.ts` | Material categories & items (names, slugs, descriptions, image paths) |
| `src/data/products.ts` | Product categories & items |
| `src/data/news.ts` | News articles |
| `src/data/galleryImages.ts` | Gallery photo paths per category/item slug |

---

## Seed System

`src/seed.ts` — Populates the database with initial content.

Run with: `pnpm seed` or `npx ts-node run-seed.ts`

### How seeding works:

1. **Media** (`m()` helper): Downloads real images from Supabase bucket and uploads through Payload API → stored back in Supabase via adapter. Falls back to 1x1 placeholder if download fails.
2. **Collections**: Creates categories, then items with relationships
3. **Globals**: Seeds all globals with BS and EN locale content

---

## Key Relationships

```
ProductCategory (1) ──→ (N) ProductItem ──→ (1) Media (hero image)
                                          ──→ (N) Media (gallery images)
                                          ──→ (N) Features (embedded array)

MaterialCategory (1) ──→ (N) MaterialItem ──→ (1) Media (hero image)
                                           ──→ (N) Media (gallery images)
                                           ──→ (N) Features (embedded array)

Homepage Global ──→ ClientsSection ──→ (N) Media (partner logos)
               ──→ StatsSection ──→ (N) Locations (embedded)

Footer Global ──→ (N) Locations (embedded, with name/address/phone/email)
```

---

## Localization

- **Default locale:** `bs` (Bosnian)
- **Second locale:** `en` (English)
- All localized fields store separate values per locale
- API queries: `?locale=bs` or `?locale=en`
- Frontend detects locale from cookies/headers via `src/lib/locale.ts`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.3.9 (App Router, RSC) |
| CMS | Payload CMS 3.79.0 |
| Database | PostgreSQL (remote, `push: true` — no migrations) |
| Storage | Supabase Storage (custom REST adapter) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Process Manager | PM2 |
