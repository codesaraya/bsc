# CLAUDE.md — Project Rules for AI Assistant

## Content Changes — MANDATORY RULES

**Every content change MUST be done through the database via the Payload CMS REST API.**

When the user asks to change any text, title, description, or content on the website:

1. **Update the database FIRST** — Use the Payload CMS REST API (`POST /api/globals/{slug}?locale={bs|en}`) to update content in the database for BOTH locales (BS and EN).
2. **Verify the change** — Read back from the API to confirm the update was saved.
3. **Update the seed file** (`src/seed.ts`) — So future database seeds use the new content.
4. **Update component fallbacks** — If the component has hardcoded default/fallback text, update that too.

### API Authentication

```
POST /api/users/login
Body: { "email": "admin@bsc.ba", "password": "admin123" }
→ Returns token for Authorization: "JWT <token>"
```

### API Endpoints for Globals

```
GET  /api/globals/{slug}?locale={bs|en}&depth=0   — Read current data
POST /api/globals/{slug}?locale={bs|en}            — Update data
```

### Key Globals (slug names)

- `homepage` — Hero, process, about preview, services, materials, portfolio, clients, stats, products, news, CTA
- `site-settings` — Logos, contact info, social media, UI labels
- `navigation` — Navbar items, mega menu
- `footer` — Footer content
- `about-page` — About page content
- `contact-page` — Contact page content
- `instructions-page` — Instructions page content
- `materials-page` — Materials listing page
- `products-page` — Products listing page
- `news-page` — News listing page

### Locales

- `bs` — Bosnian (default)
- `en` — English

**Always update BOTH locales when changing content.**

## Change Log

### 2026-03-16

1. **Hero Title** — Changed from "Lider štampe velikih i megavelikih formata" (too boastful) to "Štampa velikih formata za velike ideje" / "Large format printing for big ideas"
   - Updated via: Payload API → `homepage` global → `hero.headingLine1` + `hero.headingLine2`
   - Files also updated: `src/seed.ts`, `src/components/hero/HeroSection.tsx` (fallback)

2. **"Print na sve materijale" card** — Added Gong Cheng UV, Acyplac, and Kapafix to the materials list
   - Updated via: Payload API → `homepage` global → `aboutPreview.featureCards[1].description`
   - Files also updated: `src/seed.ts`, `src/components/sections/AboutPreview.tsx` (fallback)

3. **"UV LED Tehnologija" card** — Extended description to match the length of the materials card. Added "Direktan print na krute i fleksibilne materijale vrhunskog kvaliteta."
   - Updated via: Payload API → `homepage` global → `aboutPreview.featureCards[0].description`
   - Files also updated: `src/seed.ts`, `src/components/sections/AboutPreview.tsx` (fallback)

4. **Clients Section** — Changed badge, title, and subtitle to reflect "current and previous clients and partners"
   - Badge: "Naši klijenti" → "Naši klijenti i partneri" / "Our clients & partners"
   - Title: "Povjerenje vodećih kompanija" → "Saradnje na koje smo ponosni" / "Collaborations we’re proud of"
   - Subtitle: Updated to "Predstavljamo naše trenutne i dosadašnje klijente i partnere — kompanije s kojima sarađujemo i s kojima smo imali zadovoljstvo sarađivati." / "Meet our current and former clients and partners — companies we work with and those we’ve had the pleasure of collaborating with."
   - Updated via: Payload API → `homepage` global → `clientsSection.badge`, `clientsSection.title`, `clientsSection.subtitle`
   - Files also updated: `src/seed.ts`, `src/components/sections/ClientsSection.tsx` (fallback)

5. **Locations Section — Full Redesign** — Made locations clickable with a detail view showing working hours, phone, Viber, email, address, and Google Maps link
   - **Payload CMS Global updated:** Added `slug`, `address`, `phone`, `viber`, `email`, `mapUrl`, and `workingHours` array fields to each location in `statsSection.locations` (`src/globals/Homepage.ts`)
   - **Component redesigned:** `src/components/sections/StatsPODSection.tsx` — clicking a location now opens a beautiful animated detail panel with contact cards (address, phone, Viber, email), working hours in a dark card, and Google Maps link. "Back" button returns to the list view. All transitions use Framer Motion.
   - **Database updated:** All 3 locations (SCC, Budakovići, BBI) updated via Payload API for both BS and EN locales with full contact details and working hours
   - **Seed updated:** `src/seed.ts` — both BS and EN location data now includes all new fields
   - **All fields fully editable** through Payload CMS admin panel at `/admin` → Homepage → Statistike & Lokacije → Lokacije

6. **Locations Section — Hover Redesign + BBI→Aria Mall + Service Descriptions**
   - **BBI renamed to Aria Mall** — All references changed from "BSC BBI Centar Sarajevo" / "BSC BBI Center Sarajevo" to "BSC Aria Mall Sarajevo" everywhere: database (both locales), seed.ts, StatsPODSection.tsx defaults, Homepage.ts admin description, contact page working hours (both locales)
   - **Interaction changed from click to hover** — `StatsPODSection.tsx` completely rewritten: hovering a location card on the right now updates the left panel with the location image + full contact details (address, phone, Viber, email, working hours, Google Maps link). No more click-to-detail or "Back" button. Smooth Framer Motion transitions.
   - **Service descriptions added per location type:**
     - **SCC & Aria Mall:** "letci, brošure, UV printovi, vizitke, hemijske olovke, upaljači, šolje, tekstilni print, pleksiglas stalci, izrada pečata, kopiranje, skeniranje i grafička priprema"
     - **Budakovići:** "XXL formati, billboardi, banneri, brendiranje vozila, portali, tapete, neonske reklame, pleksiglas stalci, posteri i sve vrste outdoor i indoor rješenja"
   - Updated via: Payload API → `homepage` global → `statsSection.locations` (both locales), `contact-page` global → `contactCards` hours (both locales)
   - Files also updated: `src/seed.ts`, `src/components/sections/StatsPODSection.tsx`, `src/globals/Homepage.ts`

7. **Footer — All 3 Location Addresses** — Footer now always shows all 3 locations (SCC, Budakovići, Aria Mall) with address, phone, and email for each
   - **Schema changed:** `src/globals/Footer.ts` — replaced single `contactInfo` group (one address/email/phone) with `locations` array. Each location has localized `name`, localized `address`, `phone`, and `email` fields. `contactTitle` default changed to "Naše lokacije" / "Our locations".
   - **Component updated:** `src/components/layout/Footer.tsx` — renders all locations from the array with MapPin, Phone, Mail icons. Fallback defaults hardcoded for all 3 locations.
   - **Database updated:** Both BS and EN locales via Payload API → `footer` global → `locations` array with all 3 locations.
   - **Seed updated:** `src/seed.ts` — BS and EN footer data use `locations` array instead of `contactInfo`.
   - **Everything editable** through Payload CMS admin panel at `/admin` → Footer → Lokacije/Locations.

8. **About Page — Equipment/Machines Section** — New CMS-editable section listing all 8 machines with detailed descriptions of what they do and how BSC uses them
   - **Machines listed:** AEON Laser (CO2 laser cutting/engraving), Gong Zheng UV (UV flatbed printing), HP Latex (water-based large format printing), MUTOH (eco-solvent wide-format printing), SUMA CNC (vinyl cutting/contour cutting), Dizart CNC (CNC routing/milling), XEROX (digital production printing), CANON (digital production printing)
   - **Payload CMS Global updated:** Added `equipmentBadge`, `equipmentTitle`, `equipmentSubtitle`, and `equipmentItems` array (with `name`, `category`, `description`, `icon` fields, all localized) to `src/globals/AboutPage.ts`
   - **Component updated:** `src/app/(frontend)/about/AboutPageClient.tsx` — new equipment section with 2-column card grid between Clients and Certificates sections, each card showing icon, machine name, category tag, and detailed description. Framer Motion animations.
   - **Database updated:** Both BS and EN locales via Payload API → `about-page` global → `equipmentItems` array with all 8 machines
   - **Seed updated:** `src/seed.ts` — BS and EN about-page data include `equipmentItems` array with full descriptions
   - **All fields fully editable** through Payload CMS admin panel at `/admin` → O Nama Stranica → Oprema / Mašine

9. **Clients Section — 12 New Partner Logos Added** — Uploaded 12 new partner logos through Payload CMS Media collection and added them to the homepage clients section
   - **New partners added (9):** Petro, Würth, Sarajevski Kiseljak, XYZ, BAT, Pandora, Tom Tailor, Carlsberg BiH, Intesa Sanpaolo
   - **Existing partners updated with new logos (4):** Samsonite (ID 972), Orbico → renamed "Orbico Beauty" (ID 978), Intesa → renamed "Intesa Sanpaolo" (ID 971), Inovine (ID 979)
   - **Media IDs:** Petro=968, Würth=969, Sarajevski Kiseljak=970, Intesa Sanpaolo=971, Samsonite=972, XYZ=973, BAT=974, Pandora=975, Tom Tailor=977, Orbico Beauty=978, iNovine=979, Carlsberg BiH=980
   - **Total clients:** 69 (60 existing + 9 new), both BS and EN locales verified
   - **Database updated:** Both BS and EN locales via Payload API → `homepage` global → `clientsSection.clients` array
   - **Seed updated:** `src/seed.ts` — BS and EN homepage clientsSection updated, Orbico renamed to Orbico Beauty
   - **Component updated:** `src/components/sections/ClientsSection.tsx` — defaultClients updated with 9 new partners

10. **Supabase Storage Integration — Full Migration** — All media now stored and served from Supabase Storage bucket `bsc_slike` via a custom Payload CMS storage adapter. No more 1x1 pixel placeholder PNGs or `externalUrl` hack.
    - **Custom adapter created:** `src/plugins/supabaseStorage.ts` — wraps `@payloadcms/plugin-cloud-storage` with Supabase REST API for upload, delete, URL generation, and static file redirect. Uses `disablePayloadAccessControl: true` and `disableLocalStorage: true`.
    - **Payload config updated:** `payload.config.ts` — added `supabaseStorage({ collections: { media: true } })` plugin
    - **Media collection updated:** `src/collections/Media.ts` — removed `staticDir: 'public/media'` (adapter handles storage). `externalUrl` field kept but hidden via `condition` for backward compatibility.
    - **572 media entries migrated:** All entries now have real image files in Supabase bucket with correct dimensions. 0 entries with `externalUrl`, 0 with 1x1 dimensions.
    - **Upload/Delete verified:** New uploads go directly to Supabase bucket, deletes remove from both DB and bucket. CMS admin shows real thumbnails.
    - **Seed updated:** `src/seed.ts` — `m()` helper now downloads real images from Supabase and uploads through Payload API (adapter stores in bucket). Falls back to 1x1 placeholder only if download fails.
    - **Dependencies:** `@payloadcms/plugin-cloud-storage@3.79.0` (direct dep, used by adapter). `@payloadcms/storage-s3@3.79.0` installed but NOT used (S3 protocol unavailable on self-hosted Supabase — no HMAC keys).
    - **Key config:** Supabase URL: `https://bsc.deployer3000.halvooo.com`, Bucket: `bsc_slike` (public), Auth: service_role JWT in adapter

### 2026-03-17

11. **Per-Item Editable Descriptions & Features** — Product and material detail pages now support per-item long descriptions and feature cards, with 3-tier fallback (item → global template → hardcoded default)
    - **Collections updated:** `src/collections/ProductItems.ts` and `src/collections/MaterialItems.ts` — added `longDescription1` and `longDescription2` (textarea, localized, optional) fields for per-item extended descriptions
    - **Detail pages updated:** `src/app/(frontend)/products/[slug]/[item]/page.tsx` and `src/app/(frontend)/materials/[slug]/[item]/page.tsx` — item data mapping now includes `longDescription1`, `longDescription2`, and `itemFeatures[]`. Rendering uses item-level fields first, then global detail page template, then hardcoded defaults
    - **Type interfaces updated:** `src/data/products.ts` (`ProductItem`) and `src/data/materials.ts` (`MaterialItem`) — added optional `longDescription1`, `longDescription2`, and `itemFeatures` fields
    - **Architecture doc created:** `ARCHITECTURE.md` — comprehensive documentation of site↔Payload↔Supabase relationships, data flow, collections, globals, routing, fallback chains, and tech stack
