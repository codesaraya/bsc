# BSC - Best Solution Company

A full-stack CMS-powered website for BSC (Best Solution Company), a digital printing company based in Sarajevo.

Built with **Payload CMS v3** + **Next.js 15** + **PostgreSQL** + **Supabase Storage**.

## Tech Stack

- **Payload CMS 3.27** — Headless CMS with admin panel
- **Next.js 15** — React framework (App Router)
- **PostgreSQL** — Database (via `@payloadcms/db-postgres`)
- **Supabase Storage** — Image hosting (bucket `bsc_slike`)
- **TailwindCSS 4** — Styling
- **Framer Motion** — Animations
- **Localization** — Bosnian (bs, default) + English (en)

## Pages

- `/` — Homepage (hero, services, products, materials, news, portfolio, stats, CTA)
- `/about` — About page (mission, advantages, clients, certificates)
- `/products` — Products listing with detail pages
- `/materials` — Materials listing with detail pages
- `/news` — News articles with detail pages
- `/instructions` — Print preparation instructions
- `/contact` — Contact information & form
- `/pdf` — PDF showcase

## Getting Started

### Prerequisites

- **Node.js 18+**
- **PostgreSQL** database
- **Supabase** project with a storage bucket

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/codesaraya/bsc.git
   cd bsc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   DATABASE_URI=postgresql://user:password@host:port/database
   PAYLOAD_SECRET=your-secret-key
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. Run database migrations:
   ```bash
   npx payload migrate
   ```

5. Seed the database (optional — populates all content):
   ```bash
   npx tsx src/seed.ts
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) for the website, and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS admin panel.

## CMS Structure

### Collections
- **Media** — Image uploads with external URL support
- **Products** — Product items with categories and galleries
- **Materials** — Printing materials catalog
- **News** — News articles and blog posts
- **Clients** — Client logos for the clients section
- **Certificates** — Quality certificates
- **Advantages** — Company advantages/features
- **ContactSubmissions** — Contact form submissions
- **Users** — Admin users

### Globals (Page Settings)
- **SiteSettings** — Site name, logos, favicon, contact info
- **Homepage / AboutPage / ContactPage / InstructionsPage / MaterialsPage / ProductsPage / NewsPage** — Per-page CMS content and SEO metadata

## Documentation

Full UI documentation is available in [UI Dokumentacija BSC stranice.pdf](UI%20Dokumentacija%20BSC%20stranice.pdf).

## License

Private — All rights reserved.
