import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { AboutPage } from '@/globals/AboutPage'
import { Blog } from '@/collections/Blog'
import { ContactPage } from '@/globals/ContactPage'
import { FAQs } from '@/collections/FAQs'
import { Facilities } from '@/collections/Facilities'
import { Footer } from '@/globals/Footer'
import { Gallery } from '@/collections/Gallery'
import { Header } from '@/globals/Header'
import { HomePage } from '@/globals/HomePage'
import { LegalPages } from '@/globals/LegalPages'
import { Media } from '@/collections/Media'
import { Promotions } from '@/collections/Promotions'
import { ReservationPage } from '@/globals/ReservationPage'
import { Rooms } from '@/collections/Rooms'
import { Services } from '@/collections/Services'
import { SiteSettings } from '@/globals/SiteSettings'
import { Testimonials } from '@/collections/Testimonials'
import { Users } from '@/collections/Users'
import { optionalServerURL, requiredServerEnv } from '@/config/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const getAllowedOrigins = () => {
  const origins = [
    process.env.CMS_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean) as string[]

  return [...new Set(origins)]
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Rooms, Services, Facilities, Gallery, Promotions, Blog, Testimonials, FAQs],
  globals: [SiteSettings, Header, Footer, HomePage, AboutPage, ContactPage, ReservationPage, LegalPages],
  cors: {
    origins: getAllowedOrigins(),
  },
  csrf: getAllowedOrigins(),
  db: postgresAdapter({
    pool: {
      connectionString: requiredServerEnv('DATABASE_URI'),
    },
  }),
  defaultDepth: 1,
  editor: lexicalEditor(),
  maxDepth: 3,
  routes: {
    admin: '/admin',
    api: '/api',
  },
  secret: requiredServerEnv('PAYLOAD_SECRET'),
  serverURL: optionalServerURL(
    'CMS_URL',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
