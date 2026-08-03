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

The final Phase 5 route contract lives in `docs/frontend-api-contract.md`.

## Phase 4.5 Endpoint Set

The current CMS schema now covers the frontend inventory gaps for services, richer room detail pages, blog, reservation content, and legal pages.

Use these public endpoints for the first API contract pass:

```text
GET /api/globals/site-settings
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/home-page
GET /api/globals/about-page
GET /api/globals/rooms-page
GET /api/globals/services-page
GET /api/globals/contact-page
GET /api/globals/reservation-page
GET /api/globals/blog-page
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

## Phase 7.6 / 7.7 Frontend Follow-up

The CMS now exposes page-level Globals for `/rooms`, `/services`, and `/blog`, plus richer Header/Footer/Site Settings Globals. The separate frontend branch `phase-6-cms-integration` also maps Home Page sections to CMS fields.

Frontend Home should read:

```text
GET /api/globals/home-page?depth=2
```

Home Page section contract:

- `hero`
- `bookingPreview`
- `introduction`
- `signatureExperiences`
- `typeOfRooms`
- `testimonialNote`
- `journalPreview`
- `contactPreview`

Do not add CMS Home section groups that do not exist on the frontend Home page. Use `button` for regular section buttons/links; reserve CTA naming only for frontend sections that are actually CTA sections.

Phase 7.8 applies the same rule to About and Rooms:

- `/about-us` reads `about-page` groups: `hero`, `story`, `principles`, `team`, and `finalCTA`.
- `/rooms` reads `rooms-page` groups: `hero`, `availabilityBar`, and `roomCollection`.
- Normal navigation links inside sections use `button`; only actual CTA sections use CTA naming.
- Legacy flat fields are fallback only and should not be reintroduced to the admin interface.

Phase 7.9 applies the same rule to Services and Contact:

- `/services` reads `services-page` groups: `hero`, `intro`, `signatureServices`, `tailoredMoment`, and `finalCTA`.
- `/contact` reads `contact-page` groups: `hero`, `contactInquiry`, `contactForm`, `mapSection`, and `quote`.
- Contact form labels/placeholders/options and Services CTA buttons are staff-editable from CMS.

The current frontend branch `phase-6-cms-integration` keeps fallback data in place and prefers CMS only when the Global is published and structurally valid.
