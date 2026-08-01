# Frontend API Contract

Phase: 5 - Frontend API Contract  
Status: ready for frontend sync planning  
CMS base URL env in frontend: `NEXT_PUBLIC_CMS_URL`

This contract is for the separate Villa Next.js frontend. Do not put `PAYLOAD_SECRET`, `DATABASE_URI`, admin credentials, or any server-only CMS secret in the frontend project.

## Contract Rules

- Use Payload REST API under `/api`.
- Public collection reads must always include `where[status][equals]=published`.
- Detail pages must query by `slug` and `status=published`.
- Use `depth=1` for pages that need media relations.
- Use `depth=2` only when nested relationships are needed, such as `home-page` featured room/service/article relations with media.
- Sort ordered collections with `sort=sortOrder`.
- Keep frontend fallback content available until production CMS content is complete.
- Do not add custom CMS endpoints for Phase 5 unless Payload REST API cannot satisfy the page.

## Environment

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3000
```

Production frontend must point this variable to the production CMS origin. CMS secrets stay only in the CMS hosting environment.

## Endpoint Contract by Route

| Frontend route | Required CMS requests | Depth | Cache | Fallback |
| --- | --- | --- | --- | --- |
| `/` | `site-settings`, `header`, `footer`, `home-page`, `rooms`, `services`, `blog`, `testimonials`, `faqs` | Globals `1`, `home-page` `2`, collections `1` | `revalidate: 60` | Static home/property data, hide inactive sections |
| `/about-us` | `site-settings`, `header`, `footer`, `about-page` | `1` | `revalidate: 300` | Static about copy |
| `/villa` and `/rooms` | `rooms` list | `1` | `revalidate: 120` | Static rooms or curated empty state |
| `/rooms/[slug]` | `rooms` by slug | `1` | `revalidate: 120` | `notFound()` if CMS and static fallback are missing |
| `/services` | `services` list | `1` | `revalidate: 300` | Static services or hide detail links |
| `/services/[slug]` | `services` by slug | `1` | `revalidate: 300` | `notFound()` if CMS and static fallback are missing |
| `/gallery` | `gallery` list | `1` | `revalidate: 300` | Static gallery images |
| `/reservation` | `reservation-page`, `rooms` list, `site-settings` | `1` | `revalidate: 120` | WhatsApp-first static inquiry content |
| `/contact` | `contact-page`, `site-settings` | `1` | `revalidate: 300` | Static contact/property data |
| `/blog` | `blog` list | `1` | `revalidate: 300` | Static blog list or hide journal section |
| `/blog/[slug]` | `blog` by slug | `1` | `revalidate: 300` | `notFound()` if CMS and static fallback are missing |
| `/terms` | `legal-pages` global, use `terms` group | `1` | `revalidate: 3600` | Static legal terms |
| `/privacy` | `legal-pages` global, use `privacy` group | `1` | `revalidate: 3600` | Static privacy policy |
| `/cookies` | `legal-pages` global, use `cookies` group | `1` | `revalidate: 3600` | Static cookie policy |

## Canonical Requests

```text
GET /api/globals/site-settings?depth=1
GET /api/globals/header?depth=1
GET /api/globals/footer?depth=1
GET /api/globals/home-page?depth=2
GET /api/globals/about-page?depth=1
GET /api/globals/contact-page?depth=1
GET /api/globals/reservation-page?depth=1
GET /api/globals/legal-pages?depth=1

GET /api/rooms?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/rooms?where[slug][equals]=room-slug&where[status][equals]=published&depth=1
GET /api/services?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/services?where[slug][equals]=service-slug&where[status][equals]=published&depth=1
GET /api/facilities?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/gallery?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/promotions?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/blog?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/blog?where[slug][equals]=article-slug&where[status][equals]=published&depth=1
GET /api/testimonials?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/faqs?where[status][equals]=published&sort=sortOrder
```

## Required Frontend Fields

### Site Settings

Use for brand, contact, SEO fallback, map, social, and booking/WhatsApp links:

```text
siteName
shortDescription
logoDark
logoLight
favicon
defaultSEOTitle
defaultSEODescription
defaultOpenGraphImage
contactEmail
phone
whatsAppNumber
address
googleMapsURL
instagramURL
facebookURL
youTubeURL
bookingURL
defaultLocale
timezone
seo
```

### Rooms

Use `title` as the frontend room name.

```text
title
slug
category
shortDescription
description
featuredImage
heroImage
gallery
amenities
inclusions
standards
experiences
capacity
capacityLabel
bedType
roomSize
view
startingPrice
currency
rateNote
reviewsLabel
availabilityLabel
depositLabel
passengerLabel
bestFor
bookingURL
featured
sortOrder
status
publishedAt
seo
```

### Services

```text
title
slug
eyebrow
summary
description
featuredImage
detailImage
cta
duration
location
stats
rituals
gallery
featured
sortOrder
status
publishedAt
seo
```

### Blog

```text
title
slug
category
excerpt
content
featuredImage
readTime
articleDate
featured
curatorChoice
sortOrder
status
publishedAt
seo
```

### Reservation Page

Reservation remains WhatsApp-first. This CMS global is page content, not a booking engine.

```text
heroEyebrow
heroHeading
heroDescription
heroImage
searchPreview
bookingBenefits
roomDetails
overview
whatsAppCTA
seo
```

### Legal Pages

```text
terms
privacy
cookies
```

Each legal page group contains:

```text
eyebrow
title
summary
updatedAtLabel
sections
seo
```

## Media Response Shape

Frontend helper should normalize Payload media before passing it to `next/image`.

Required normalized shape:

```ts
type CmsImage = {
  url: string
  alt?: string
  width?: number
  height?: number
  sizes?: {
    thumbnail?: { url?: string; width?: number; height?: number }
    card?: { url?: string; width?: number; height?: number }
    desktop?: { url?: string; width?: number; height?: number }
  }
}
```

Rules:

- If a media relation is missing, use a local placeholder or hide the visual block.
- `next.config.mjs` in the frontend must allow the CMS image host before using remote Payload images.
- Prefer `sizes.desktop.url` for large hero images, `sizes.card.url` for cards, and original `url` only when a generated size is unavailable.

## Empty State Rules

- If a global request fails, use static fallback data for that page.
- If `rooms` is empty, show a curated empty state or static rooms until CMS content is ready.
- If `services` is empty, hide service detail links or use static services fallback.
- If `blog` is empty, hide journal preview and show a quiet empty state on `/blog`.
- If `gallery` is empty, keep local gallery images as fallback.
- If `promotions` is empty, hide promotion sections.
- If legal global content is empty, keep static legal pages.
- Never show draft content publicly.

## Promotion Filtering

For Phase 5, frontend may fetch published promotions and filter active dates client-side/server-side in the frontend:

```text
status = published
startDate is empty or <= now
endDate is empty or >= now
```

Move this into a stricter CMS-side query only after the first integration is stable.

## Verification Before Phase 6

Before editing the separate frontend repo, verify these local CMS API calls while the CMS dev server is running:

```powershell
Invoke-WebRequest "http://localhost:3000/api/globals/site-settings?depth=1"
Invoke-WebRequest "http://localhost:3000/api/rooms?where[status][equals]=published&sort=sortOrder&depth=1"
Invoke-WebRequest "http://localhost:3000/api/services?where[status][equals]=published&sort=sortOrder&depth=1"
Invoke-WebRequest "http://localhost:3000/api/blog?where[status][equals]=published&sort=sortOrder&depth=1"
Invoke-WebRequest "http://localhost:3000/api/globals/reservation-page?depth=1"
Invoke-WebRequest "http://localhost:3000/api/globals/legal-pages?depth=1"
```

Expected result: `200 OK` for public globals and published collection queries. Draft collection docs must not appear in public collection responses.
