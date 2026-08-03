import path from 'node:path'
import { pathToFileURL } from 'node:url'
import fs from 'node:fs/promises'
import type { CollectionSlug, Payload } from 'payload'
import { getPayload } from 'payload'
import config from '../../payload.config'

type SeedDoc = {
  id: number | string
}

type FrontendImage = string | undefined | null

type PropertyFallback = {
  name: string
  tagline: string
  description: string
  heroImage?: string
  aboutImage?: string
  email: string
  phone: string
  whatsapp: string
  address: string
  mapEmbedUrl?: string
  siteUrl?: string
  bookingMessage: string
  highlights: string[]
}

type NavigationFallback = {
  primaryNavigation: Array<{ href: string; label: string }>
  footerNavigation: Array<{ title: string; links: Array<{ href: string; label: string }> }>
}

type FaqFallback = {
  question: string
  answer: string
}

type HomeFallback = {
  homeFaqs: FaqFallback[]
  homeTestimonial: {
    author: string
    source: string
    quote: string
  }
  homeBookingBenefits: string[]
}

type RoomFallback = {
  slug: string
  name: string
  category?: string
  description: string
  longDescription?: string
  image?: string
  heroImage?: string
  gallery: Array<{ image: string; alt?: string; title?: string; caption?: string }>
  amenities?: string[]
  inclusions?: string[]
  standards?: string[]
  experiences: Array<{ title: string; description?: string; image?: string }>
  capacity?: string
  bed?: string
  size?: string
  view?: string
  startingRate?: string
  rateNote?: string
  reviews?: string
  status?: string
  deposit?: string
  passenger?: string
  bestFor?: string
}

type ServiceFallback = {
  slug: string
  title: string
  eyebrow?: string
  summary?: string
  description?: string
  image?: string
  detailImage?: string
  cta?: string
  duration?: string
  location?: string
  stats?: string
  gallery: Array<{ image: string; title?: string }>
  rituals: Array<{
    title: string
    category?: string
    description?: string
    image?: string
    duration?: string
    featured?: boolean
  }>
}

type ArticleFallback = {
  slug: string
  title: string
  category?: string
  excerpt?: string
  image?: string
  readTime?: string
  date: string
  featured?: boolean
  curatorChoice?: boolean
}

type AboutFallback = {
  aboutPrinciples: Array<{ title: string; description?: string; image?: string }>
  aboutTeam: Array<{ name: string; role?: string; description?: string; image: string }>
}

type ReservationRoomDetail = {
  reviews?: string
  status?: string
  deposit?: string
  beds?: string
  passenger?: string
  breakfast?: string
  selected?: boolean
  badge?: string
}

type ReservationFallback = {
  reservationSearchItems: Array<Record<string, string>>
  reservationRoomDetails: Record<string, ReservationRoomDetail>
  reservationOverview: {
    arrival?: string
    departure?: string
    items: Array<{ slug: string; roomCount?: string; passenger?: string; subtotal?: string }>
    total?: string
  }
}

type LegalFallback = {
  legalPages: Array<{
    slug: string
    eyebrow?: string
    title: string
    summary?: string
    updatedAt?: string
    sections: Array<{ title: string; body: string[] }>
  }>
}

const fallbackDataDir =
  process.env.FRONTEND_FALLBACK_DATA_DIR || 'C:\\laragon\\www\\villa-ceningan\\src\\data'

const frontendRoot = path.resolve(fallbackDataDir, '..', '..')
const frontendPublicDir = path.join(frontendRoot, 'public')
const now = new Date().toISOString()

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const richTextFromText = (text?: string | null): Record<string, unknown> | undefined => {
  if (!text) return undefined

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: text.split(/\n{2,}/).map((paragraph) => ({
        type: 'paragraph',
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        version: 1,
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: paragraph.trim(),
            version: 1,
          },
        ],
      })),
      direction: 'ltr' as const,
    },
  }
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const parsePrice = (value?: string) => {
  if (!value) return undefined
  const digits = value.replace(/[^0-9]/g, '')
  return digits ? Number(digits) : undefined
}

const parseCapacity = (value?: string) => {
  if (!value) return undefined
  const match = value.match(/\d+/)
  return match ? Number(match[0]) : undefined
}

const publicImageToFilePath = async (imagePath: FrontendImage) => {
  if (!imagePath || !imagePath.startsWith('/')) return null

  const filePath = path.join(frontendPublicDir, imagePath.replace(/^\/+/, ''))
  const ext = path.extname(filePath).toLowerCase()

  if (!imageExtensions.has(ext)) return null

  try {
    await fs.access(filePath)
    return filePath
  } catch {
    return null
  }
}

const importFrontendModule = async <T>(name: string): Promise<T> => {
  const filePath = path.join(fallbackDataDir, `${name}.ts`)
  return (await import(pathToFileURL(filePath).href)) as T
}

const createOrUpdateBySlug = async (
  payload: Payload,
  collection: CollectionSlug,
  slug: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> => {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
      overrideAccess: true,
    }) as Promise<SeedDoc>
  }

  return payload.create({ collection, data: data as never, overrideAccess: true }) as Promise<SeedDoc>
}

const createOrUpdateByTitle = async (
  payload: Payload,
  collection: CollectionSlug,
  title: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> => {
  const existing = await payload.find({
    collection,
    where: { title: { equals: title } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
      overrideAccess: true,
    }) as Promise<SeedDoc>
  }

  return payload.create({ collection, data: data as never, overrideAccess: true }) as Promise<SeedDoc>
}

const createOrUpdateFaq = async (
  payload: Payload,
  question: string,
  category: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> => {
  const existing = await payload.find({
    collection: 'faqs',
    where: {
      and: [{ question: { equals: question } }, { category: { equals: category } }],
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'faqs',
      id: existing.docs[0].id,
      data: data as never,
      overrideAccess: true,
    }) as Promise<SeedDoc>
  }

  return payload.create({ collection: 'faqs', data: data as never, overrideAccess: true }) as Promise<SeedDoc>
}

const createOrUpdateTestimonial = async (
  payload: Payload,
  guestName: string,
  source: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> => {
  const existing = await payload.find({
    collection: 'testimonials',
    where: {
      and: [{ guestName: { equals: guestName } }, { source: { equals: source } }],
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'testimonials',
      id: existing.docs[0].id,
      data: data as never,
      overrideAccess: true,
    }) as Promise<SeedDoc>
  }

  return payload.create({ collection: 'testimonials', data: data as never, overrideAccess: true }) as Promise<SeedDoc>
}

const ensureMedia = async (
  payload: Payload,
  imagePath: FrontendImage,
  alt: string,
  category: 'facility' | 'gallery' | 'general' | 'hero' | 'logo' | 'promotion' | 'room' = 'general',
) => {
  const filePath = await publicImageToFilePath(imagePath)

  if (!filePath) {
    payload.logger.warn(`Frontend fallback image not found or unsupported: ${imagePath ?? '(empty)'}`)
    return undefined
  }

  const filename = path.basename(filePath)
  const existing = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: filename,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    return existing.docs[0].id
  }

  const media = await payload.create({
    collection: 'media',
    data: {
      alt,
      caption: imagePath,
      category,
      status: 'published',
    },
    filePath,
    overrideAccess: true,
  })

  return media.id
}

const galleryItems = async (
  payload: Payload,
  items: Array<{ image: FrontendImage; alt?: string; title?: string; caption?: string }>,
  category: 'facility' | 'gallery' | 'general' | 'hero' | 'logo' | 'promotion' | 'room' = 'gallery',
) => {
  const mapped = await Promise.all(
    items.map(async (item) => {
      const image = await ensureMedia(payload, item.image, item.alt || item.title || 'Villa Ceningan image', category)
      return image
        ? {
            image,
            alt: item.alt || item.title || 'Villa Ceningan image',
            caption: item.caption,
          }
        : null
    }),
  )

  return mapped.filter(Boolean) as Array<{ image: number | string; alt: string; caption?: string }>
}

const labels = (items?: string[]) => items?.map((label) => ({ label })) ?? []

const main = async () => {
  const payload = await getPayload({ config })
  console.info(`Importing frontend fallback data from ${fallbackDataDir}`)

  const [
    propertyModule,
    navigationModule,
    homeModule,
    roomsModule,
    servicesModule,
    galleryModule,
    facilitiesModule,
    faqsModule,
    blogModule,
    aboutModule,
    reservationModule,
    legalModule,
  ] = await Promise.all([
    importFrontendModule<{ property: PropertyFallback }>('property'),
    importFrontendModule<NavigationFallback>('navigation'),
    importFrontendModule<HomeFallback>('home'),
    importFrontendModule<{ rooms: RoomFallback[] }>('rooms'),
    importFrontendModule<{ services: ServiceFallback[] }>('services'),
    importFrontendModule<{ gallery: string[] }>('gallery'),
    importFrontendModule<{ facilities: string[] }>('facilities'),
    importFrontendModule<{ faqs: Array<Record<string, string>> }>('faqs'),
    importFrontendModule<{ featuredArticle: ArticleFallback; blogArticles: ArticleFallback[]; curatorChoices: ArticleFallback[] }>('blog'),
    importFrontendModule<AboutFallback>('about'),
    importFrontendModule<ReservationFallback>('reservation'),
    importFrontendModule<LegalFallback>('legal'),
  ])

  const { property } = propertyModule
  const heroImage = await ensureMedia(payload, property.heroImage, `${property.name} hero image`, 'hero')
  const aboutImage = await ensureMedia(payload, property.aboutImage, `${property.name} about image`, 'hero')

  await payload.updateGlobal({
    slug: 'site-settings',
    overrideAccess: true,
    data: {
      siteName: property.name,
      shortDescription: property.tagline,
      defaultSEOTitle: property.name,
      defaultSEODescription: property.description,
      defaultOpenGraphImage: heroImage,
      contactEmail: property.email,
      phone: property.phone,
      whatsAppNumber: property.whatsapp,
      address: property.address,
      googleMapsURL: property.mapEmbedUrl,
      bookingURL: '/reservation',
      defaultLocale: 'en',
      timezone: 'Asia/Makassar',
      seo: {
        metaTitle: property.name,
        metaDescription: property.tagline,
        openGraphImage: heroImage,
        canonicalURL: property.siteUrl?.startsWith('http') ? property.siteUrl : undefined,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'header',
    overrideAccess: true,
    data: {
      navigationItems: navigationModule.primaryNavigation.map((item) => ({
        label: item.label,
        pageURL: item.href,
        active: true,
      })),
      primaryCTA: {
        label: 'Book Now',
        url: '/reservation',
        openInNewTab: false,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'footer',
    overrideAccess: true,
    data: {
      brand: {
        description: property.description,
        tagline: property.tagline,
      },
      shortDescription: property.description,
      contact: {
        phone: property.phone,
        email: property.email,
        whatsapp: property.whatsapp,
        address: property.address,
      },
      contactInformation: {
        phone: property.phone,
        email: property.email,
        whatsApp: property.whatsapp,
        address: property.address,
      },
      navigationColumns: navigationModule.footerNavigation.map((group) => ({
        title: group.title,
        links: group.links.map((link) => ({
          label: link.label,
          url: link.href,
          openInNewTab: link.href.startsWith('http'),
        })),
      })),
      socialLinks: [
        { platform: 'instagram', label: 'Instagram', url: '/contact', openInNewTab: false },
        { platform: 'whatsapp', label: 'WhatsApp', url: `https://wa.me/${property.whatsapp}`, openInNewTab: true },
        { platform: 'other', label: 'Share', url: '/contact', openInNewTab: false },
      ],
      quickLinks: navigationModule.footerNavigation.flatMap((group) =>
        group.links
          .filter((link) => link.href.startsWith('/') || link.href.startsWith('http'))
          .map((link) => ({
            label: link.label,
            url: link.href,
            openInNewTab: link.href.startsWith('http'),
          })),
      ),
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
      copyrightText: `Copyright (c) 2026 ${property.name}. All rights reserved.`,
      termsURL: '/terms',
      privacyURL: '/privacy',
    } as never,
  })

  const rooms = await Promise.all(
    roomsModule.rooms.map(async (room, index) => {
      const featuredImage = await ensureMedia(payload, room.image, `${room.name} room preview`, 'room')
      const roomHeroImage = await ensureMedia(payload, room.heroImage, `${room.name} hero image`, 'hero')
      const roomGallery = await galleryItems(payload, room.gallery, 'room')
      const experiences = await Promise.all(
        room.experiences.map(async (experience) => ({
          title: experience.title,
          description: experience.description,
          image: await ensureMedia(payload, experience.image, `${experience.title} experience image`, 'gallery'),
        })),
      )

      return createOrUpdateBySlug(payload, 'rooms', room.slug, {
        title: room.name,
        slug: room.slug,
        category: room.category,
        shortDescription: room.description,
        description: richTextFromText(room.longDescription),
        featuredImage,
        heroImage: roomHeroImage,
        gallery: roomGallery,
        amenities: labels(room.amenities),
        inclusions: labels(room.inclusions),
        standards: labels(room.standards),
        experiences,
        capacity: parseCapacity(room.capacity),
        capacityLabel: room.capacity,
        bedType: room.bed,
        roomSize: room.size,
        view: room.view,
        startingPrice: parsePrice(room.startingRate),
        currency: 'IDR',
        rateNote: room.rateNote,
        reviewsLabel: room.reviews,
        availabilityLabel: room.status,
        depositLabel: room.deposit,
        passengerLabel: room.passenger,
        bestFor: room.bestFor,
        bookingURL: '/reservation',
        featured: index < 3,
        sortOrder: index + 1,
        status: 'published',
        publishedAt: now,
        seo: {
          metaTitle: room.name,
          metaDescription: room.description,
          openGraphImage: featuredImage,
        },
      })
    }),
  )

  const services = await Promise.all(
    servicesModule.services.map(async (service, index) => {
      const featuredImage = await ensureMedia(payload, service.image, `${service.title} service preview`, 'facility')
      const detailImage = await ensureMedia(payload, service.detailImage, `${service.title} service detail`, 'hero')
      const serviceGallery = await galleryItems(
        payload,
        service.gallery.map((item) => ({
          image: item.image,
          title: item.title,
          alt: `${item.title} for ${service.title}`,
        })),
        'gallery',
      )
      const rituals = await Promise.all(
        service.rituals.map(async (ritual) => ({
          title: ritual.title,
          category: ritual.category,
          description: ritual.description,
          image: await ensureMedia(payload, ritual.image, `${ritual.title} ritual image`, 'gallery'),
          duration: ritual.duration,
          featured: Boolean(ritual.featured),
        })),
      )

      return createOrUpdateBySlug(payload, 'services', service.slug, {
        title: service.title,
        slug: service.slug,
        eyebrow: service.eyebrow,
        summary: service.summary,
        description: richTextFromText(service.description),
        featuredImage,
        detailImage,
        cta: {
          label: service.cta,
          url: `/services/${service.slug}`,
          openInNewTab: false,
          variant: 'primary',
        },
        duration: service.duration,
        location: service.location,
        stats: service.stats,
        rituals,
        gallery: serviceGallery,
        featured: index < 4,
        sortOrder: index + 1,
        status: 'published',
        publishedAt: now,
        seo: {
          metaTitle: service.title,
          metaDescription: service.summary,
          openGraphImage: featuredImage,
        },
      })
    }),
  )

  const facilities = await Promise.all(
    facilitiesModule.facilities.map((facility, index) =>
      createOrUpdateBySlug(payload, 'facilities', slugify(facility), {
        title: facility,
        slug: slugify(facility),
        shortDescription: `${facility} available at ${property.name}.`,
        description: richTextFromText(`${facility} available as part of the Villa Ceningan stay experience.`),
        icon: slugify(facility),
        featured: index < 6,
        sortOrder: index + 1,
        status: 'published',
        publishedAt: now,
        seo: {
          metaTitle: facility,
          metaDescription: `${facility} available at ${property.name}.`,
        },
      }),
    ),
  )

  const gallery = await Promise.all(
    galleryModule.gallery.map(async (imagePath, index) => {
      const title = `Gallery ${String(index + 1).padStart(2, '0')}`
      const image = await ensureMedia(payload, imagePath, `${property.name} gallery ${index + 1}`, 'gallery')
      return createOrUpdateByTitle(payload, 'gallery', title, {
        title,
        image,
        alt: `${property.name} gallery ${index + 1}`,
        caption: imagePath,
        category: 'resort',
        featured: index < 6,
        sortOrder: index + 1,
        status: 'published',
        publishedAt: now,
      })
    }),
  )

  const allArticles: ArticleFallback[] = [
    { ...blogModule.featuredArticle, featured: true, curatorChoice: false },
    ...blogModule.blogArticles.map((article, index) => ({ ...article, featured: index === 0, curatorChoice: false })),
    ...blogModule.curatorChoices.map((article) => ({ ...article, featured: false, curatorChoice: true })),
  ]
  const seenArticleSlugs = new Set<string>()
  const blog = await Promise.all(
    allArticles
      .filter((article) => {
        if (seenArticleSlugs.has(article.slug)) return false
        seenArticleSlugs.add(article.slug)
        return true
      })
      .map(async (article, index) => {
        const featuredImage = await ensureMedia(payload, article.image, `${article.title} article image`, 'gallery')
        return createOrUpdateBySlug(payload, 'blog', article.slug, {
          title: article.title,
          slug: article.slug,
          category: article.category,
          excerpt: article.excerpt,
          content: richTextFromText(article.excerpt),
          featuredImage,
          readTime: article.readTime,
          articleDate: new Date(article.date).toISOString(),
          featured: Boolean(article.featured),
          curatorChoice: Boolean(article.curatorChoice),
          sortOrder: index + 1,
          status: 'published',
          publishedAt: now,
          seo: {
            metaTitle: article.title,
            metaDescription: article.excerpt,
            openGraphImage: featuredImage,
          },
        })
      }),
  )

  const faqs = await Promise.all(
    [...homeModule.homeFaqs, ...faqsModule.faqs].map((faq, index) =>
      createOrUpdateFaq(payload, faq.question, 'general', {
        question: faq.question,
        answer: faq.answer,
        category: 'general',
        sortOrder: index + 1,
        status: 'published',
        publishedAt: now,
      }),
    ),
  )

  await createOrUpdateTestimonial(payload, homeModule.homeTestimonial.author, homeModule.homeTestimonial.source, {
    guestName: homeModule.homeTestimonial.author,
    guestLocation: 'Guest',
    rating: 5,
    review: homeModule.homeTestimonial.quote,
    source: homeModule.homeTestimonial.source,
    featured: true,
    sortOrder: 1,
    status: 'published',
    publishedAt: now,
  })

  await payload.updateGlobal({
    slug: 'home-page',
    overrideAccess: true,
    data: {
      hero: {
        sectionName: 'Hero',
        eyebrow: 'Welcome to Sanctuary',
        heading: property.name,
        description: 'A place to experience and enjoy the life',
        backgroundImage: heroImage,
        primaryCTA: { label: 'Explore Rooms', url: '/rooms', openInNewTab: false, variant: 'primary' },
        secondaryCTA: { label: 'Start Reservation', url: '/reservation', openInNewTab: false, variant: 'secondary' },
        overlayIntensity: 40,
        active: true,
        sortOrder: 1,
      },
      bookingPreview: {
        sectionName: 'Booking Preview Bar',
        sectionAriaLabel: 'Booking preview',
        formAriaLabel: 'Availability search',
        checkInLabel: 'Check-in',
        checkOutLabel: 'Check-out',
        guestsLabel: 'Guests',
        promotionLinkLabel: 'Have a promotion code?',
        promotionLinkURL: '/reservation',
        submitButtonLabel: 'Check Availability',
        submitButtonURL: '/reservation',
        active: true,
        sortOrder: 2,
      },
      introduction: {
        sectionName: 'Ocean-side Comfort Intro',
        eyebrow: 'Welcome to Sanctuary',
        heading: property.tagline,
        description: property.description,
        image: aboutImage,
        active: true,
        sortOrder: 3,
      },
      signatureExperiences: {
        sectionName: 'Signature Experiences',
        eyebrow: 'Curated Moments',
        heading: 'Signature Experiences',
        description: 'Curated moments shaped around your stay.',
        selectedServices: services.map((service) => Number(service.id)),
        button: { label: 'All Signature Service', url: '/services', openInNewTab: false, variant: 'text' },
        active: true,
        sortOrder: 4,
      },
      typeOfRooms: {
        sectionName: 'Type of Room',
        eyebrow: 'Discover our rooms',
        heading: 'Luxury interior',
        description: 'Choose your island sanctuary.',
        selectedRooms: rooms.map((room) => Number(room.id)),
        active: true,
        sortOrder: 5,
      },
      testimonialNote: {
        sectionName: 'Testimonial',
        note:
          'Frontend testimonial section is intentionally not editable from CMS yet. It will be connected later to Google Reviews or another review platform.',
        active: true,
        sortOrder: 6,
      },
      journalPreview: {
        sectionName: 'Latest Journal Preview',
        eyebrow: 'Explore',
        heading: 'Latest from our blog',
        description: 'Travel notes, villa rituals, and island stories.',
        selectedArticles: blog.slice(0, 3).map((article) => Number(article.id)),
        button: { label: 'View All Journal', url: '/blog', openInNewTab: false, variant: 'text' },
        active: true,
        sortOrder: 7,
      },
      contactPreview: {
        sectionName: 'Contact Us Preview',
        eyebrow: 'Information',
        heading: 'Contact us',
        description: 'Set in the rhythm of Nusa Ceningan, close enough to island life and quiet enough to fully slow down.',
        locationHeading: 'Bali, Indonesia',
        address: property.address,
        emailLabel: 'Email:',
        email: property.email,
        phoneLabel: 'Call directly:',
        phone: property.phone,
        mapEmbedURL: property.mapEmbedUrl,
        active: true,
        sortOrder: 8,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'rooms-page',
    overrideAccess: true,
    data: {
      hero: {
        sectionName: 'Hero',
        heading: 'Our Rooms',
        description: 'Discover a collection of curated island sanctuaries designed for deep rest and quiet elegance.',
        image: heroImage,
        active: true,
        sortOrder: 1,
      },
      availabilityBar: {
        sectionName: 'Availability Bar',
        sectionAriaLabel: 'Booking preview',
        formAriaLabel: 'Availability search',
        checkInLabel: 'Check-in',
        checkOutLabel: 'Check-out',
        guestsLabel: 'Guests',
        promotionLinkLabel: 'Have a promotion code?',
        promotionLinkURL: '/reservation',
        submitButtonLabel: 'Check Availability',
        submitButtonURL: '/reservation',
        active: true,
        sortOrder: 2,
      },
      roomCollection: {
        sectionName: 'Type of Room',
        eyebrow: 'Signature Collection',
        heading: 'Stay where island calm meets personal villa comfort.',
        description: 'Choose the room style that best matches your stay rhythm.',
        ratingSymbol: '* * * * *',
        startFromLabel: 'Start from',
        nightSuffixLabel: '/ night',
        statusLabel: 'Status',
        depositLabel: 'Deposit',
        bedsLabel: 'Beds',
        passengerLabel: 'Passenger',
        detailButtonLabel: 'View Detail',
        button: {
          label: 'Start Reservation',
          url: '/reservation',
          openInNewTab: false,
          variant: 'primary',
        },
        active: true,
        sortOrder: 3,
      },
      seo: {
        metaTitle: 'Rooms and Suites',
        metaDescription: `Explore the refined room collection available at ${property.name}.`,
        openGraphImage: heroImage,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'services-page',
    overrideAccess: true,
    data: {
      heroEyebrow: 'Services',
      heroHeading: 'Bespoke Sanctuary Services',
      heroDescription: 'Experience the art of quiet luxury where every detail is curated for your island rhythm.',
      heroImage: await ensureMedia(payload, '/assets/img/services-3.webp', `${property.name} services page hero`, 'hero'),
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
        metaDescription: `Discover tailored island services, concierge support, transfers, and villa comforts at ${property.name}.`,
        openGraphImage: heroImage,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'blog-page',
    overrideAccess: true,
    data: {
      heroEyebrow: blogModule.featuredArticle.category,
      heroHeading: blogModule.featuredArticle.title,
      heroDescription: blogModule.featuredArticle.excerpt,
      heroImage: await ensureMedia(payload, blogModule.featuredArticle.image, `${blogModule.featuredArticle.title} hero`, 'hero'),
      introHeading: 'Island Journal',
      introDescription: 'Travel notes, villa rituals, and slower stories from Villa Ceningan.',
      listingHeading: 'Latest Stories',
      listingDescription: 'Read travel notes, culinary stories, wellness rituals, and behind-the-scenes updates.',
      seo: {
        metaTitle: 'Blog',
        metaDescription: `Read travel notes, villa rituals, and island stories from ${property.name}.`,
        openGraphImage: heroImage,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'about-page',
    overrideAccess: true,
    data: {
      hero: {
        sectionName: 'Hero',
        eyebrow: 'Est. island mornings',
        heading: 'About Villa Ceningan',
        description: property.description,
        image: aboutImage,
        scrollCueLabel: 'Scroll to our story',
        active: true,
        sortOrder: 1,
      },
      story: {
        sectionName: 'Our Story',
        eyebrow: property.address,
        heading: 'Our Story',
        paragraphs: [
          { text: property.description },
          ...property.highlights.map((highlight) => ({ text: highlight })),
        ],
        image: aboutImage,
        active: true,
        sortOrder: 2,
      },
      principles: {
        sectionName: 'Principles',
        eyebrow: 'Sustainable Luxury',
        heading: 'Luxury is a responsibility.',
        description: 'Our commitment is woven into details guests can feel: calm spaces, local care, and less excess.',
        items: await Promise.all(
          aboutModule.aboutPrinciples.map(async (principle) => ({
            title: principle.title,
            description: principle.description,
            image: principle.image ? await ensureMedia(payload, principle.image, principle.title, 'gallery') : undefined,
          })),
        ),
        active: true,
        sortOrder: 3,
      },
      team: {
        sectionName: 'Team',
        heading: 'The Stewards of Villa Ceningan',
        quote:
          'We do not design hospitality around noise. We design it around attention, timing, and small comforts that make guests feel expected.',
        members: await Promise.all(
          aboutModule.aboutTeam.map(async (member) => ({
            name: member.name,
            role: member.role,
            description: member.description,
            image: await ensureMedia(payload, member.image, `${member.name}, ${member.role}`, 'gallery'),
          })),
        ),
        active: true,
        sortOrder: 4,
      },
      finalCTA: {
        sectionName: 'Final CTA',
        heading: 'Reconnect with your island rhythm.',
        image: heroImage,
        button: { label: 'Start Reservation', url: '/reservation', openInNewTab: false, variant: 'primary' },
        active: true,
        sortOrder: 5,
      },
      seo: {
        metaTitle: 'About Villa Ceningan',
        metaDescription: property.description,
        openGraphImage: aboutImage,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'contact-page',
    overrideAccess: true,
    data: {
      heroHeading: 'Contact Villa Ceningan',
      heroDescription: 'Talk directly with the Villa Ceningan team for stay inquiries and island guidance.',
      heroImage,
      contactHeading: 'Get in Touch',
      contactDescription: property.bookingMessage,
      phone: property.phone,
      email: property.email,
      whatsApp: property.whatsapp,
      address: property.address,
      mapEmbedURL: property.mapEmbedUrl,
      operationalHours: [{ label: 'Daily', hours: '08:00 - 20:00' }],
      finalCTA: { label: 'Chat on WhatsApp', url: `https://wa.me/${property.whatsapp}`, openInNewTab: true, variant: 'primary' },
      seo: {
        metaTitle: 'Contact Villa Ceningan',
        metaDescription: property.bookingMessage,
        openGraphImage: heroImage,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'reservation-page',
    overrideAccess: true,
    data: {
      heroEyebrow: 'Reservation',
      heroHeading: 'Reservation',
      heroDescription: property.bookingMessage,
      heroImage,
      searchPreview: reservationModule.reservationSearchItems,
      bookingBenefits: labels(homeModule.homeBookingBenefits),
      roomDetails: Object.entries(reservationModule.reservationRoomDetails).map(([slug, detail]) => ({
        room: roomsModule.rooms.findIndex((room) => room.slug === slug) >= 0 ? Number(rooms[roomsModule.rooms.findIndex((room) => room.slug === slug)].id) : undefined,
        reviews: detail.reviews,
        availabilityLabel: detail.status,
        deposit: detail.deposit,
        beds: detail.beds,
        passenger: detail.passenger,
        breakfast: detail.breakfast,
        selected: detail.selected,
        badge: detail.badge,
      })),
      overview: {
        arrival: reservationModule.reservationOverview.arrival,
        departure: reservationModule.reservationOverview.departure,
        items: reservationModule.reservationOverview.items.map((item) => ({
          room: roomsModule.rooms.findIndex((room) => room.slug === item.slug) >= 0 ? Number(rooms[roomsModule.rooms.findIndex((room) => room.slug === item.slug)].id) : undefined,
          roomCount: item.roomCount,
          passenger: item.passenger,
          subtotal: item.subtotal,
        })),
        total: reservationModule.reservationOverview.total,
      },
      whatsAppCTA: { label: 'Send Inquiry', url: `https://wa.me/${property.whatsapp}`, openInNewTab: true, variant: 'primary' },
      seo: {
        metaTitle: 'Reservation',
        metaDescription: property.bookingMessage,
        openGraphImage: heroImage,
      },
    } as never,
  })

  const legalBySlug = Object.fromEntries(
    legalModule.legalPages.map((page) => [
      page.slug,
      {
        eyebrow: page.eyebrow,
        title: page.title,
        summary: page.summary,
        updatedAtLabel: page.updatedAt,
        updatedAt: page.updatedAt ? new Date(page.updatedAt).toISOString() : undefined,
        sections: page.sections.map((section) => ({
          title: section.title,
          body: section.body.map((paragraph: string) => ({ paragraph })),
        })),
        seo: {
          metaTitle: page.title,
          metaDescription: page.summary,
        },
      },
    ]),
  )

  await payload.updateGlobal({
    slug: 'legal-pages',
    overrideAccess: true,
    data: legalBySlug as never,
  })

  payload.logger.info(
    `Frontend fallback seed completed: ${rooms.length} rooms, ${services.length} services, ${facilities.length} facilities, ${gallery.length} gallery items, ${blog.length} blog posts, ${faqs.length} FAQs, 1 testimonial.`,
  )
}

await main().catch((error) => {
  console.error(error)
  process.exit(1)
})
