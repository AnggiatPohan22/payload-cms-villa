# Phase 7.5 Content Coverage and Admin UX Cleanup Report

Date: 2 Agustus 2026

## Summary

Phase 7.5 adds CMS coverage for key listing pages and cleans up Payload Admin organization before deployment preparation.

No public frontend was created in this CMS repo. The separate frontend repo was inspected read-only on branch `phase-6-cms-integration`; it had an existing local change in `next-env.d.ts` that was not touched.

## Page Coverage Audit

| Frontend route | CMS source | Status |
| --- | --- | --- |
| `/` | `home-page` Global, rooms/services/blog/testimonials/faqs Collections | ok |
| `/villa` | `about-page` Global plus rooms Collection where needed | ok |
| `/about-us` | `about-page` Global | ok |
| `/rooms` | `rooms-page` Global plus rooms Collection | added |
| `/rooms/[slug]` | rooms Collection by slug and `status=published` | ok |
| `/services` | `services-page` Global plus services Collection | added |
| `/services/[slug]` | services Collection by slug and `status=published` | ok |
| `/gallery` | gallery Collection | ok for gallery items; page-level copy remains frontend fallback |
| `/reservation` | `reservation-page` Global plus rooms Collection | ok |
| `/blog` | `blog-page` Global plus blog Collection | added |
| `/blog/[slug]` | blog Collection by slug and `status=published` | ok contract; no route file found in current frontend branch |
| `/terms` | `legal-pages.terms` Global | ok |
| `/privacy` | `legal-pages.privacy` Global | ok |
| `/cookies` | `legal-pages.cookies` Global | ok |

## Missing CMS Sources

Before this phase, `/rooms`, `/services`, and `/blog` had CMS-backed collection lists but no dedicated page-level Global for hero, intro, listing copy, and SEO.

## Globals Added or Updated

Added:

- `rooms-page`
- `services-page`
- `blog-page`

Updated:

- `footer`
- `legal-pages`
- Existing page Globals moved visually into the `Pages` admin group.

## Footer Field Audit

Frontend `SiteFooter.tsx` currently uses:

- `property.name`
- `property.address`
- `property.phone`
- `property.email`
- `property.whatsapp`
- hardcoded explore links
- fallback `gallery` snapshots
- static legal links

Footer Global was extended with:

- `brand.logo`
- `brand.description`
- `brand.tagline`
- `contact.phone`
- `contact.whatsapp`
- `contact.email`
- `contact.address`
- `navigationColumns[]`
- `socialLinks[]` with `platform`
- `legalLinks[]`
- `bookingCta`

Existing Footer fields remain for compatibility:

- `shortDescription`
- `contactInformation`
- `quickLinks`
- `copyrightText`
- `termsURL`
- `privacyURL`

## Sidebar Organization

Admin sidebar groups now target:

- `Pages`: Home Page, About Page, Rooms Page, Services Page, Contact Page, Reservation Page, Blog Page, Legal Pages.
- `Content`: Rooms, Services, Facilities, Gallery, Promotions, Testimonials, FAQs.
- `Posts`: Blog posts.
- `Media`: Media.
- `Settings`: Site Settings, Header, Footer, Users.

Users access control was not changed.

## Seed and Import Updates

Updated:

- `src/seed.ts`
- `src/scripts/seedFrontendFallback.ts`
- `src/migrations/20260802_135950_phase_7_5_content_coverage_admin_ux.ts`
- `src/migrations/index.ts`

The frontend fallback seed remains idempotent:

- Collections are still upserted by `slug`, `title`, FAQ question/category, or testimonial guest/source.
- Globals are updated in place through Payload Local API.
- Existing manual data is not deleted by default.
- Media is still reused by `filename`.

New seed coverage:

- `rooms-page`
- `services-page`
- `blog-page`
- extended `footer`
- `legal-pages` `updatedAt`

## Verification Result

Schema/tooling:

```powershell
corepack pnpm run generate:types
corepack pnpm run generate:importmap
corepack pnpm run migrate:create -- --name phase_7_5_content_coverage_admin_ux
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build:strict
```

Results:

- `generate:types`: passed.
- `generate:importmap`: passed; no new import map entries were needed.
- `migrate:create`: passed without a destructive prompt; migration was created as `src/migrations/20260802_135950_phase_7_5_content_coverage_admin_ux.ts`.
- `typecheck`: passed.
- `lint`: passed with no warnings or errors.
- `build:strict`: first run hit Node native out-of-memory during Next validation. After clearing `.next` and rerunning with `NODE_OPTIONS=--max-old-space-size=4096`, it passed.

Seed:

```powershell
corepack pnpm run seed:frontend
```

Result:

- Passed.
- Existing idempotent collection counts remained 3 rooms, 4 services, 8 facilities, 6 gallery items, 7 blog posts, 8 FAQs, and 1 testimonial.
- New page Globals and Footer fields were populated.

Smoke API:

```powershell
Invoke-WebRequest -UseBasicParsing "http://localhost:3002/api/globals/rooms-page?depth=1"
Invoke-WebRequest -UseBasicParsing "http://localhost:3002/api/globals/services-page?depth=1"
Invoke-WebRequest -UseBasicParsing "http://localhost:3002/api/globals/blog-page?depth=1"
Invoke-WebRequest -UseBasicParsing "http://localhost:3002/api/globals/legal-pages?depth=1"
Invoke-WebRequest -UseBasicParsing "http://localhost:3002/api/globals/footer?depth=1"
```

Result:

- All returned `200`.

Automated tests:

```powershell
$env:CMS_TEST_URL = 'http://localhost:3002'
corepack pnpm run test:public-api
corepack pnpm run test:roles
corepack pnpm run test:hardening
```

Results:

- `test:public-api`: passed, 7 tests.
- `test:roles`: passed, 4 tests.
- `test:hardening`: passed, 6 tests.

Notes:

- `localhost:3000` dev server was returning `500` after a concurrent Payload Local API/test run. Verification used a clean temporary dev server on `localhost:3002`.
- The process started for `localhost:3002` was stopped after verification.
- Browser/admin smoke for `/admin` was not completed in this pass because the temporary verification server was stopped before the admin check. Restart the normal dev server before manual admin review.

## Remaining Frontend Follow-up

The frontend repo was not changed in this CMS task.

Required frontend follow-up:

- Add `getCmsRoomsPage`.
- Add `getCmsServicesPage`.
- Add `getCmsBlogPage`.
- Add `getCmsFooter`.
- Map `footer.navigationColumns`, `footer.socialLinks`, `footer.legalLinks`, and `footer.bookingCta`.
- Keep frontend fallback data.

## Recommendation Before Phase 8

Restart the normal CMS dev server on `localhost:3000`, manually check `/admin`, then update frontend mappers in the separate frontend repo before starting deployment preparation.
