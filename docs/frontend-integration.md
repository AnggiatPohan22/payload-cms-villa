# Frontend Integration

Use the public REST API from the separate Next.js frontend. The frontend should not store admin credentials or `PAYLOAD_SECRET`.

```ts
const response = await fetch(
  `${process.env.NEXT_PUBLIC_CMS_URL}/api/rooms?where[status][equals]=published&sort=sortOrder`,
  {
    next: {
      revalidate: 60,
    },
  },
)

if (!response.ok) {
  throw new Error('Failed to fetch rooms')
}

const data = await response.json()
```

Recommended frontend environment variable:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3000
```

Use low `depth` values and request only the endpoints needed by each page.

## Phase 4.5 Endpoint Set

The current CMS schema now covers the frontend inventory gaps for services, richer room detail pages, blog, reservation content, and legal pages.

Use these public endpoints for the first API contract pass:

```text
GET /api/globals/site-settings
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/home-page
GET /api/globals/about-page
GET /api/globals/contact-page
GET /api/globals/reservation-page
GET /api/globals/legal-pages
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/services?where[status][equals]=published&sort=sortOrder
GET /api/gallery?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder
GET /api/blog?where[status][equals]=published&sort=sortOrder
GET /api/testimonials?where[status][equals]=published&sort=sortOrder
GET /api/faqs?where[status][equals]=published&sort=sortOrder
```

For detail pages, request by `slug` and include `where[status][equals]=published`. Use `depth=1` when media relations are needed, and raise it only for sections that require nested relation data.
