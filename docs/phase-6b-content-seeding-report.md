# Phase 6B Content Seeding Report

Audit date: 1 Agustus 2026

## Summary

Phase 6B adds an idempotent CMS seed/import command that reads the Villa frontend fallback data from `C:\laragon\www\villa-ceningan\src\data` and writes representative published content into the Payload CMS local database.

This phase does not edit the frontend project, does not add dependencies, does not run migrations, and does not create a public frontend inside this CMS repo.

## Source Frontend Files Read

- `src/data/property.ts`
- `src/data/navigation.ts`
- `src/data/home.ts`
- `src/data/rooms.ts`
- `src/data/services.ts`
- `src/data/gallery.ts`
- `src/data/facilities.ts`
- `src/data/faqs.ts`
- `src/data/blog.ts`
- `src/data/about.ts`
- `src/data/reservation.ts`
- `src/data/legal.ts`
- `src/data/policies.ts`
- `src/lib/cms/content.ts`

## Mapping Frontend Data to Payload

The seed command maps frontend fallback data into existing Payload Collections and Globals:

| Frontend data | Payload target |
| --- | --- |
| `property` | `site-settings`, `footer`, contact globals, SEO defaults |
| `primaryNavigation`, `footerNavigation` | `header`, `footer` |
| `home*` exports | `home-page`, `testimonials`, `faqs` |
| `rooms` | `rooms` collection and `reservation-page` room references |
| `services` | `services` collection and home selected services |
| `facilities` | `facilities` collection and home selected facilities |
| `gallery` | `gallery` collection and home gallery preview |
| `featuredArticle`, `blogArticles`, `curatorChoices` | `blog` collection and home journal preview |
| `reservation*` exports | `reservation-page` global |
| `legalPages` | `legal-pages` global |
| public image paths | `media` collection |

## Fields Mapped

- Published status: all imported Collections use `status: published` and `publishedAt`.
- SEO: collection/global SEO fields receive title, description, and media where a direct source exists.
- Media: frontend public images are uploaded into Payload `media` with `alt`, `caption`, and category.
- Rooms: title, slug, category, descriptions, images, gallery, amenities, inclusions, standards, experiences, capacity, bed, size, view, rate, booking labels, sorting, and SEO.
- Services: title, slug, eyebrow, summary, description, preview/detail images, CTA, duration, location, stats, rituals, gallery, sorting, and SEO.
- Blog: title, slug, category, excerpt, content fallback, image, read time, date, featured flags, sorting, and SEO.
- Reservation: hero, search preview, booking benefits, room detail references, overview, and WhatsApp CTA.
- Legal: terms/privacy style global content with sections and SEO.

## Fields Without CMS Pair

- `policies.ts` remains a frontend reference and is not imported directly.
- Frontend-specific visual copy that has no stable CMS pair is represented through existing Globals where possible.
- Promotions are not seeded because no dedicated frontend promotion fallback source was found.
- Some rich article/service content is seeded from summaries or excerpts when the frontend only exposes short copy.

## Media Import Strategy

- Source images are resolved from `C:\laragon\www\villa-ceningan\public`.
- Supported formats are `.jpg`, `.jpeg`, `.png`, and `.webp`.
- Unsupported or missing image paths are skipped with a warning.
- Existing Payload media is reused by `filename` to keep repeated runs idempotent.
- Runtime uploaded media files are not source files and must not be committed.

## Command

```powershell
corepack pnpm run seed:frontend
```

Optional source override:

```powershell
$env:FRONTEND_FALLBACK_DATA_DIR = 'C:\path\to\villa-ceningan\src\data'
corepack pnpm run seed:frontend
```

## Idempotency Strategy

- `media`: match by `filename`.
- `rooms`, `services`, `facilities`, `blog`: match by `slug`.
- `gallery`: match by generated `title`.
- `faqs`: match by `question` and `category`.
- `testimonials`: match by `guestName` and `source`.
- Globals are updated in place through Payload `updateGlobal`.

## Verification Result

Verified locally:

```powershell
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run seed:frontend
corepack pnpm run build:strict
```

Seed result:

```text
3 rooms, 4 services, 8 facilities, 6 gallery items, 7 blog posts, 8 FAQs, 1 testimonial.
```

Public API smoke result against `http://localhost:3000`:

| Endpoint | Result |
| --- | --- |
| `GET /api/rooms?where[status][equals]=published` | 200, published docs present |
| `GET /api/services?where[status][equals]=published` | 200, 4 published docs |
| `GET /api/facilities?where[status][equals]=published` | 200, 8 published docs |
| `GET /api/gallery?where[status][equals]=published` | 200, published docs present |
| `GET /api/blog?where[status][equals]=published` | 200, 7 published docs |
| `GET /api/faqs?where[status][equals]=published` | 200, 8 published docs |
| `GET /api/testimonials?where[status][equals]=published` | 200, 1 published doc |
| `GET /api/globals/site-settings` | 200 |
| `GET /api/globals/header` | 200 |
| `GET /api/globals/footer` | 200 |
| `GET /api/globals/home-page` | 200 |
| `GET /api/globals/about-page` | 200 |
| `GET /api/globals/contact-page` | 200 |
| `GET /api/globals/reservation-page` | 200 |
| `GET /api/globals/legal-pages` | 200 |
| `GET /api/users` | 403 Forbidden |

Runtime counts for `rooms` and `gallery` can be higher than the seed count when manual/test content already exists in the local database.

## Remaining Gaps

- Keep frontend fallback behavior until production CMS content is complete and reviewed.
- Confirm future production media storage before live deployment.
- Add automated tests later in Phase 7 for public published filters and protected collections.

## Next Safe Step

After Phase 6B is committed and pushed, continue Phase 6 frontend integration in the separate Villa frontend repo using the already documented REST API contract and seeded CMS data.
