import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import type { CollectionSlug, Payload } from 'payload'
import { getPayload } from 'payload'
import config from '../payload.config'

const placeholderPng =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII='

const requiredEnv = ['SEED_SUPER_ADMIN_EMAIL', 'SEED_SUPER_ADMIN_PASSWORD']

type SeedDoc = {
  id: number
}

const ensureRequiredEnv = () => {
  const missing = requiredEnv.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(`Missing seed environment variables: ${missing.join(', ')}`)
  }
}

const ensurePlaceholderFile = async () => {
  const filePath = path.join(os.tmpdir(), 'payload-cms-villa-placeholder.png')
  await fs.writeFile(filePath, Buffer.from(placeholderPng, 'base64'))
  return filePath
}

const main = async () => {
  ensureRequiredEnv()

  const payload = await getPayload({ config })
  const seedEmail = process.env.SEED_SUPER_ADMIN_EMAIL as string
  const seedPassword = process.env.SEED_SUPER_ADMIN_PASSWORD as string
  const seedName = process.env.SEED_SUPER_ADMIN_NAME || 'Development Super Admin'

  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: seedEmail,
      },
    },
    limit: 1,
  })

  let user = existingUsers.docs[0]

  if (!user) {
    user = await payload.create({
      collection: 'users',
      data: {
        email: seedEmail,
        password: seedPassword,
        name: seedName,
        role: 'super-admin',
      },
    })
  }

  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: 'payload-cms-villa-placeholder.png',
      },
    },
    limit: 1,
  })

  const image =
    existingMedia.docs[0] ||
    (await payload.create({
      collection: 'media',
      data: {
        alt: 'Placeholder resort image',
        caption: 'Development placeholder image',
        category: 'general',
        status: 'published',
        uploadedBy: user.id,
      },
      filePath: await ensurePlaceholderFile(),
    }))

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Villa Resort',
      shortDescription: 'A calm resort CMS foundation powered by Payload.',
      defaultSEOTitle: 'Villa Resort',
      defaultSEODescription: 'Official content source for the Villa Resort website.',
      contactEmail: 'hello@example.com',
      phone: '+62 823 8635 7012',
      whatsAppNumber: '+62 823 8635 7012',
      address: 'Nusa Ceningan, Bali, Indonesia',
      defaultLocale: 'en',
      timezone: 'Asia/Makassar',
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navigationItems: [
        { label: 'Home', pageURL: '/', active: true },
        { label: 'Rooms', pageURL: '/rooms', active: true },
        { label: 'Facilities', pageURL: '/facilities', active: true },
        { label: 'Gallery', pageURL: '/gallery', active: true },
        { label: 'Contact', pageURL: '/contact', active: true },
      ],
      primaryCTA: {
        label: 'Book Now',
        url: '/contact',
        openInNewTab: false,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      shortDescription: 'Boutique resort experience in Bali.',
      contactInformation: {
        phone: '+62 823 8635 7012',
        email: 'hello@example.com',
        whatsApp: '+62 823 8635 7012',
        address: 'Nusa Ceningan, Bali, Indonesia',
      },
      quickLinks: [
        { label: 'Rooms', url: '/rooms', openInNewTab: false },
        { label: 'Contact', url: '/contact', openInNewTab: false },
      ],
      copyrightText: 'Copyright Villa Resort. All rights reserved.',
      termsURL: '/terms',
      privacyURL: '/privacy',
    },
  })

  const room = await upsertBySlug(payload, 'rooms', 'ocean-view-villa', {
    title: 'Ocean View Villa',
    slug: 'ocean-view-villa',
    shortDescription: 'A peaceful villa with ocean views.',
    featuredImage: image.id,
    gallery: [{ image: image.id, alt: 'Ocean view villa placeholder' }],
    amenities: [{ label: 'Air conditioning' }, { label: 'Private terrace' }],
    capacity: 2,
    bedType: 'King bed',
    roomSize: '45 sqm',
    view: 'Ocean',
    startingPrice: 1500000,
    currency: 'IDR',
    bookingURL: '/contact',
    featured: true,
    sortOrder: 1,
    status: 'published',
  })

  const facility = await upsertBySlug(payload, 'facilities', 'infinity-pool', {
    title: 'Infinity Pool',
    slug: 'infinity-pool',
    shortDescription: 'A relaxed pool area overlooking the island.',
    icon: 'waves',
    featuredImage: image.id,
    gallery: [{ image: image.id, alt: 'Infinity pool placeholder' }],
    featured: true,
    sortOrder: 1,
    status: 'published',
  })

  const galleryItem = await upsertByTitle(payload, 'gallery', 'Resort View', {
    title: 'Resort View',
    image: image.id,
    alt: 'Resort gallery placeholder',
    caption: 'Development gallery image.',
    category: 'resort',
    featured: true,
    sortOrder: 1,
    status: 'published',
  })

  const promotion = await upsertBySlug(payload, 'promotions', 'stay-longer-save-more', {
    title: 'Stay Longer, Save More',
    slug: 'stay-longer-save-more',
    shortDescription: 'A simple development promotion for CMS preview.',
    desktopImage: image.id,
    mobileImage: image.id,
    ctaLabel: 'View Offer',
    ctaURL: '/promotions/stay-longer-save-more',
    promoCode: 'STAYMORE',
    featured: true,
    sortOrder: 1,
    status: 'published',
  })

  await upsertByTitle(payload, 'testimonials', 'Ayu', {
    guestName: 'Ayu',
    guestLocation: 'Indonesia',
    rating: 5,
    review: 'A beautiful and calm stay.',
    source: 'Direct guest',
    featured: true,
    sortOrder: 1,
    status: 'published',
  })

  await upsertByQuestion(payload, 'faqs', 'What time is check-in?', {
    question: 'What time is check-in?',
    answer: 'Check-in starts from 2 PM.',
    category: 'general',
    sortOrder: 1,
    status: 'published',
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        heading: 'Island Villa Stay',
        description: 'A calm CMS-managed home page hero.',
        backgroundImage: image.id,
        primaryCTA: { label: 'Explore Rooms', url: '/rooms', openInNewTab: false, variant: 'primary' },
        secondaryCTA: { label: 'Contact Us', url: '/contact', openInNewTab: false, variant: 'secondary' },
        overlayIntensity: 40,
        active: true,
        sortOrder: 0,
      },
      featuredRooms: {
        heading: 'Featured Rooms',
        selectedRooms: [room.id],
        active: true,
        sortOrder: 2,
      },
      facilitiesOverview: {
        heading: 'Facilities',
        selectedFacilities: [facility.id],
        active: true,
        sortOrder: 3,
      },
      galleryPreview: {
        heading: 'Gallery',
        selectedGalleryItems: [galleryItem.id],
        active: true,
        sortOrder: 4,
      },
      promotionSection: {
        heading: 'Promotions',
        selectedPromotions: [promotion.id],
        active: true,
        sortOrder: 5,
      },
      finalCTA: {
        heading: 'Plan Your Stay',
        buttonLabel: 'Contact Us',
        buttonURL: '/contact',
        backgroundImage: image.id,
        active: true,
        sortOrder: 6,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroHeading: 'About Villa Resort',
      heroDescription: 'Editable about page content for the public website.',
      heroImage: image.id,
      supportingImages: [{ image: image.id, alt: 'About page placeholder' }],
      values: [{ title: 'Calm hospitality', description: 'Warm service and thoughtful details.' }],
      finalCTA: { label: 'Contact Us', url: '/contact', openInNewTab: false, variant: 'primary' },
    },
  })

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      heroHeading: 'Contact Villa Resort',
      heroDescription: 'Editable contact page content for the public website.',
      heroImage: image.id,
      contactHeading: 'Get in Touch',
      phone: '+62 823 8635 7012',
      email: 'hello@example.com',
      whatsApp: '+62 823 8635 7012',
      address: 'Nusa Ceningan, Bali, Indonesia',
      operationalHours: [{ label: 'Daily', hours: '08:00 - 20:00' }],
      finalCTA: { label: 'Chat on WhatsApp', url: 'https://wa.me/6282386357012', openInNewTab: true, variant: 'primary' },
    },
  })

  payload.logger.info('Seed completed.')
  process.exit(0)
}

const upsertBySlug = async (
  payload: Payload,
  collection: CollectionSlug,
  slug: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> => {
  const existing = await payload.find({
    collection,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
    }) as Promise<SeedDoc>
  }

  return payload.create({ collection, data: data as never }) as Promise<SeedDoc>
}

const upsertByTitle = async (
  payload: Payload,
  collection: CollectionSlug,
  title: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> => {
  const existing = await payload.find({
    collection,
    where: {
      title: {
        equals: title,
      },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
    }) as Promise<SeedDoc>
  }

  return payload.create({ collection, data: data as never }) as Promise<SeedDoc>
}

const upsertByQuestion = async (
  payload: Payload,
  collection: CollectionSlug,
  question: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> => {
  const existing = await payload.find({
    collection,
    where: {
      question: {
        equals: question,
      },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
    }) as Promise<SeedDoc>
  }

  return payload.create({ collection, data: data as never }) as Promise<SeedDoc>
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
