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
        { label: 'About Us', pageURL: '/about-us', active: true },
        { label: 'Rooms', pageURL: '/rooms', active: true },
        { label: 'Reservation', pageURL: '/reservation', active: true },
        { label: 'Services', pageURL: '/services', active: true },
        { label: 'Gallery', pageURL: '/gallery', active: true },
        { label: 'Blog', pageURL: '/blog', active: true },
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
      brand: {
        description: 'Boutique resort experience in Bali.',
        tagline: 'Calm island hospitality.',
      },
      shortDescription: 'Boutique resort experience in Bali.',
      contact: {
        phone: '+62 823 8635 7012',
        email: 'hello@example.com',
        whatsapp: '+62 823 8635 7012',
        address: 'Nusa Ceningan, Bali, Indonesia',
      },
      contactInformation: {
        phone: '+62 823 8635 7012',
        email: 'hello@example.com',
        whatsApp: '+62 823 8635 7012',
        address: 'Nusa Ceningan, Bali, Indonesia',
      },
      navigationColumns: [
        {
          title: 'Explore',
          links: [
            { label: 'Home', url: '/', openInNewTab: false },
            { label: 'About Us', url: '/about-us', openInNewTab: false },
            { label: 'Rooms', url: '/rooms', openInNewTab: false },
            { label: 'Services', url: '/services', openInNewTab: false },
          ],
        },
        {
          title: 'Concierge',
          links: [
            { label: 'Reservation', url: '/reservation', openInNewTab: false },
            { label: 'Contact', url: '/contact', openInNewTab: false },
            { label: 'Blog', url: '/blog', openInNewTab: false },
          ],
        },
      ],
      quickLinks: [
        { label: 'Rooms', url: '/rooms', openInNewTab: false },
        { label: 'Contact', url: '/contact', openInNewTab: false },
      ],
      socialLinks: [
        { platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/6282386357012', openInNewTab: true },
      ],
      legalLinks: [
        { label: 'Terms', url: '/terms', openInNewTab: false },
        { label: 'Privacy', url: '/privacy', openInNewTab: false },
        { label: 'Cookies', url: '/cookies', openInNewTab: false },
      ],
      bookingCta: {
        label: 'Start Reservation',
        url: '/reservation',
        openInNewTab: false,
        variant: 'primary',
      },
      copyrightText: 'Copyright Villa Resort. All rights reserved.',
      termsURL: '/terms',
      privacyURL: '/privacy',
    },
  })

  const room = await upsertBySlug(payload, 'rooms', 'ocean-view-villa', {
    title: 'Ocean View Villa',
    slug: 'ocean-view-villa',
    category: 'Couple Escape',
    shortDescription: 'A peaceful villa with ocean views.',
    featuredImage: image.id,
    heroImage: image.id,
    gallery: [{ image: image.id, alt: 'Ocean view villa placeholder' }],
    amenities: [{ label: 'Air conditioning' }, { label: 'Private terrace' }],
    inclusions: [{ label: 'Daily breakfast for 2' }, { label: 'Welcome drink' }],
    standards: [{ label: 'Daily breakfast' }, { label: 'Concierge WhatsApp' }],
    experiences: [
      {
        title: 'Poolside Reset',
        description: 'A quiet morning ritual arranged beside the water.',
        image: image.id,
      },
    ],
    capacity: 2,
    capacityLabel: '2 guests',
    bedType: 'King bed',
    roomSize: '45 sqm',
    view: 'Ocean',
    startingPrice: 1500000,
    currency: 'IDR',
    rateNote: 'per night, breakfast included',
    reviewsLabel: '3 reviews',
    availabilityLabel: 'Available',
    depositLabel: 'Not required',
    passengerLabel: '01-02',
    bestFor: 'Couples, solo travelers, short island stays',
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

  const service = await upsertBySlug(payload, 'services', 'poolside-reset', {
    title: 'Poolside Reset',
    slug: 'poolside-reset',
    eyebrow: 'Rejuvenation',
    summary: 'A quiet wellness ritual built around pool time, soft mornings, and island calm.',
    featuredImage: image.id,
    detailImage: image.id,
    cta: {
      label: 'Discover the Ritual',
      url: '/services/poolside-reset',
      openInNewTab: false,
      variant: 'primary',
    },
    duration: 'Daily 08:00 - 18:00',
    location: 'Pool deck and private terrace',
    stats: [
      { value: '03', label: 'Pool rituals' },
      { value: '02', label: 'Refreshment sets' },
    ],
    rituals: [
      {
        title: 'Morning Pool Ease',
        category: 'Reset',
        description: 'A prepared towel and refreshment setup for a slow start by the water.',
        image: image.id,
        duration: '60 minutes',
        featured: true,
      },
    ],
    gallery: [{ image: image.id, alt: 'Poolside reset placeholder' }],
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

  const article = await upsertBySlug(payload, 'blog', 'art-of-stillness', {
    title: 'The Art of Stillness',
    slug: 'art-of-stillness',
    category: 'Featured Story',
    excerpt: 'A journal on slow island mornings, considered villa rituals, and calm details.',
    featuredImage: image.id,
    readTime: '4 min read',
    articleDate: new Date().toISOString(),
    featured: true,
    curatorChoice: false,
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
      signatureExperiences: {
        heading: 'Signature Experiences',
        selectedServices: [service.id],
        active: true,
        sortOrder: 4,
      },
      galleryPreview: {
        heading: 'Gallery',
        selectedGalleryItems: [galleryItem.id],
        active: true,
        sortOrder: 5,
      },
      promotionSection: {
        heading: 'Promotions',
        selectedPromotions: [promotion.id],
        active: true,
        sortOrder: 6,
      },
      journalPreview: {
        heading: 'Journal',
        selectedArticles: [article.id],
        cta: { label: 'Read Stories', url: '/blog', openInNewTab: false, variant: 'text' },
        active: true,
        sortOrder: 7,
      },
      finalCTA: {
        heading: 'Plan Your Stay',
        buttonLabel: 'Contact Us',
        buttonURL: '/contact',
        backgroundImage: image.id,
        active: true,
        sortOrder: 8,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'rooms-page',
    data: {
      heroEyebrow: 'Rooms',
      heroHeading: 'Our Rooms',
      heroDescription: 'Discover a collection of curated island sanctuaries designed for deep rest and quiet elegance.',
      heroImage: image.id,
      introHeading: 'Signature Collection',
      introDescription: 'Stay where island calm meets personal villa comfort.',
      listingHeading: 'Stay where island calm meets personal villa comfort.',
      listingDescription: 'Choose the room style that best matches your stay rhythm.',
      listingCTA: {
        label: 'Start Reservation',
        url: '/reservation',
        openInNewTab: false,
        variant: 'primary',
      },
      seo: {
        metaTitle: 'Rooms and Suites',
        metaDescription: 'Explore calm villa rooms and suites for your island stay.',
        openGraphImage: image.id,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'services-page',
    data: {
      heroEyebrow: 'Services',
      heroHeading: 'Bespoke Sanctuary Services',
      heroDescription: 'Experience the art of quiet luxury where every detail is curated for your island rhythm.',
      heroImage: image.id,
      introHeading: 'The Villa Ceningan Way',
      introDescription:
        'In the stillness of the island, a stay becomes more than a room. Our services are designed to restore ease, rhythm, and quiet pleasure.',
      listingHeading: 'Signature Services',
      listingDescription: 'Curated services for dining, wellness, transit, and concierge support.',
      finalCTA: {
        label: 'Start Reservation',
        url: '/reservation',
        openInNewTab: false,
        variant: 'primary',
      },
      seo: {
        metaTitle: 'Services',
        metaDescription: 'Discover tailored island services, concierge support, transfers, and villa comforts.',
        openGraphImage: image.id,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'blog-page',
    data: {
      heroEyebrow: 'Featured Story',
      heroHeading: 'The Art of Stillness: Finding Quiet Luxury by the Water',
      heroDescription: 'A journal on slow island mornings, considered villa rituals, and calm details.',
      heroImage: image.id,
      introHeading: 'Island Journal',
      introDescription: 'Travel notes, villa rituals, and slower stories from Villa Ceningan.',
      listingHeading: 'Latest Stories',
      listingDescription: 'Read travel notes, culinary stories, wellness rituals, and behind-the-scenes updates.',
      seo: {
        metaTitle: 'Blog',
        metaDescription: 'Read travel notes, villa rituals, and island stories from Villa Ceningan.',
        openGraphImage: image.id,
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

  await payload.updateGlobal({
    slug: 'reservation-page',
    data: {
      heroEyebrow: 'Reservation',
      heroHeading: 'Start Your Stay Inquiry',
      heroDescription: 'Send dates, guest count, and room preference to the Villa Ceningan team.',
      heroImage: image.id,
      searchPreview: [
        { label: 'Check-in', value: '26', detail: '/ June' },
        { label: 'Check-out', value: '29', detail: '/ June' },
        { label: 'Guests', value: '03' },
      ],
      bookingBenefits: [
        { label: 'Direct WhatsApp concierge' },
        { label: 'Flexible room preference inquiry' },
      ],
      roomDetails: [
        {
          room: room.id,
          reviews: '3 Reviews',
          availabilityLabel: 'Available',
          deposit: 'Not Required',
          beds: '01 King',
          passenger: '02 Adults',
          breakfast: 'Included',
          selected: true,
        },
      ],
      overview: {
        arrival: 'June, 26th, 2026',
        departure: 'June, 29th, 2026',
        items: [{ room: room.id, roomCount: '01', passenger: '02', subtotal: 'IDR 1,500,000' }],
        total: 'IDR 1,500,000',
      },
      whatsAppCTA: {
        label: 'Send Inquiry',
        url: 'https://wa.me/6282386357012',
        openInNewTab: true,
        variant: 'primary',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'legal-pages',
    data: {
      terms: {
        eyebrow: 'Guest Agreement',
        title: 'Terms of Service',
        summary: 'Terms for reservation inquiries and website usage.',
        updatedAtLabel: 'July 29, 2026',
        updatedAt: new Date('2026-07-29').toISOString(),
        sections: [
          {
            title: 'Reservation inquiries',
            body: [{ paragraph: 'Submitting an inquiry does not automatically confirm a booking.' }],
          },
        ],
      },
      privacy: {
        eyebrow: 'Data Care',
        title: 'Privacy Policy',
        summary: 'How guest inquiry information is handled.',
        updatedAtLabel: 'July 29, 2026',
        updatedAt: new Date('2026-07-29').toISOString(),
        sections: [
          {
            title: 'Information we collect',
            body: [{ paragraph: 'We may collect guest contact details and stay preferences.' }],
          },
        ],
      },
      cookies: {
        eyebrow: 'Website Preferences',
        title: 'Cookies Policy',
        summary: 'How browser technologies should be handled on the website.',
        updatedAtLabel: 'July 29, 2026',
        updatedAt: new Date('2026-07-29').toISOString(),
        sections: [
          {
            title: 'Essential cookies',
            body: [{ paragraph: 'Essential browser behavior may support site functionality.' }],
          },
        ],
      },
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
