import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Documents } from './src/collections/Documents'
import { MaterialCategories } from './src/collections/MaterialCategories'
import { MaterialItems } from './src/collections/MaterialItems'
import { ProductCategories } from './src/collections/ProductCategories'
import { ProductItems } from './src/collections/ProductItems'
import { NewsArticles } from './src/collections/NewsArticles'
import { GalleryImages } from './src/collections/GalleryImages'
import { Pages } from './src/collections/Pages'
import { Homepage } from './src/globals/Homepage'
import { SiteSettings } from './src/globals/SiteSettings'
import { Navigation } from './src/globals/Navigation'
import { FooterGlobal } from './src/globals/Footer'
import { AboutPage } from './src/globals/AboutPage'
import { ContactPage } from './src/globals/ContactPage'
import { InstructionsPage } from './src/globals/InstructionsPage'
import { MaterialsPage } from './src/globals/MaterialsPage'
import { ProductsPage } from './src/globals/ProductsPage'
import { NewsPage } from './src/globals/NewsPage'
import { MaterialDetailPage } from './src/globals/MaterialDetailPage'
import { ProductDetailPage } from './src/globals/ProductDetailPage'
import { NewsDetailPage } from './src/globals/NewsDetailPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: [
      { label: 'Bosanski', code: 'bs' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'bs',
    fallback: true,
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Documents,
    MaterialCategories,
    MaterialItems,
    ProductCategories,
    ProductItems,
    NewsArticles,
    GalleryImages,
    Pages,
  ],
  globals: [
    Homepage,
    SiteSettings,
    Navigation,
    FooterGlobal,
    AboutPage,
    ContactPage,
    InstructionsPage,
    MaterialsPage,
    ProductsPage,
    NewsPage,
    MaterialDetailPage,
    ProductDetailPage,
    NewsDetailPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: true,
  }),
  sharp,
  plugins: [],
})
