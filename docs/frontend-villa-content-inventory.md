# Frontend Villa Content Inventory

Phase: 4.5 - Frontend Villa Content Inventory  
Audit date: 31 Juli 2026  
CMS repo: `C:\laragon\www\payload-cms-villa`  
Frontend repo audited read-only: `C:\laragon\www\villa-ceningan`

## Audit Scope

This inventory maps the existing Villa Ceningan Next.js frontend content to the Payload CMS foundation before locking the API contract.

Important boundary:

- No frontend code was changed.
- Frontend repo currently has an existing uncommitted change in `src/components/layout/SiteFooter.tsx`; this audit did not touch it.
- This CMS project remains backend/admin only.

## Frontend Runtime Snapshot

Frontend project:

- Next.js App Router.
- Package manager: npm, with `package-lock.json`.
- Scripts use webpack mode:
  - `npm run dev`
  - `npm run build`

Important frontend data sources:

```text
src/data/property.ts
src/data/navigation.ts
src/data/home.ts
src/data/rooms.ts
src/data/facilities.ts
src/data/gallery.ts
src/data/faqs.ts
src/data/about.ts
src/data/services.ts
src/data/reservation.ts
src/data/blog.ts
src/data/legal.ts
src/data/policies.ts
```

## Existing Frontend Routes

| Route | File | Current Data Source | CMS Mapping Status |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | `property`, `home`, `rooms`, `blog` | Partially covered by `home-page`, `site-settings`, `rooms`, `testimonials`, `faqs`; blog/experience sections need decision |
| `/about-us` | `src/app/about-us/page.tsx` | `property`, `about` | Partially covered by `about-page`; team/principles need field mapping |
| `/villa` | `src/app/villa/page.tsx` | `property`, `rooms` | Covered by `rooms`, but route naming differs from CMS docs |
| `/rooms` | `src/app/rooms/page.tsx` | `property`, `rooms` | Mostly covered by `rooms` |
| `/rooms/[slug]` | `src/app/rooms/[slug]/page.tsx` | `rooms` | Partially covered; detail fields need review |
| `/services` | `src/app/services/page.tsx` | `property`, `services` | Not fully covered; nearest CMS collection is `facilities` |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | `services` | Not fully covered; needs decision: extend `facilities` or add `services` |
| `/gallery` | `src/app/gallery/page.tsx` | `property`, `gallery` | Covered by `gallery`, with page hero copy needing mapping |
| `/reservation` | `src/app/reservation/page.tsx` | `property`, `reservation`, `rooms` | Not in CMS scope as booking engine; keep WhatsApp inquiry/static or defer |
| `/contact` | `src/app/contact/page.tsx` | `property`, local hardcoded contact sections | Mostly covered by `contact-page` and `site-settings` |
| `/blog` | `src/app/blog/page.tsx` | `blog` | Not covered by current CMS scope |
| `/terms` | `src/app/terms/page.tsx` | `legal` | Not covered by current CMS globals |
| `/privacy` | `src/app/privacy/page.tsx` | `legal` | Not covered by current CMS globals |
| `/cookies` | `src/app/cookies/page.tsx` | `legal` | Not covered by current CMS globals |

## Current CMS Coverage

Current CMS Collections:

- `rooms`
- `facilities`
- `gallery`
- `promotions`
- `testimonials`
- `faqs`
- `media`
- `users`

Current CMS Globals:

- `site-settings`
- `header`
- `footer`
- `home-page`
- `about-page`
- `contact-page`

## Route Mapping Details

### Home

Frontend sections:

- `HomeHeroSection`
- `HomeBookingSection`
- `HomeAboutSection`
- `HomeSignatureExperiencesSection`
- `HomeRoomsShowcaseSection`
- `HomeTestimonialSection`
- `HomeJournalPreviewSection`
- `HomeContactPreviewSection`

CMS mapping:

- `HomeHeroSection` -> `home-page.hero`
- `HomeBookingSection` -> keep as inquiry UI; do not turn into booking engine yet
- `HomeAboutSection` -> `home-page.introduction`
- `HomeRoomsShowcaseSection` -> `home-page.featuredRooms` + `rooms`
- `HomeTestimonialSection` -> `testimonials`
- `HomeContactPreviewSection` -> `contact-page` + `site-settings`

Gaps:

- `HomeSignatureExperiencesSection` currently uses `homeSignatureExperiences`. Could map to `facilities`, `gallery`, or a future `experiences` collection.
- `HomeJournalPreviewSection` uses `blogArticles`. Blog is not in current CMS foundation.
- `homeBookingBenefits` is not directly represented in CMS.

Recommendation:

- For first integration, keep booking preview and journal preview static or hide them behind frontend fallback.
- Map signature experiences to `facilities` only if content semantics fit.

### Site Settings, Header, Footer

Frontend data:

- `property.ts`
- `navigation.ts`
- `gallery.ts`
- layout components `SiteHeader`, `MobileMenu`, `SiteFooter`

CMS mapping:

- `property.name`, `shortName`, `propertyType`, `tagline`, `description` -> `site-settings`
- `phone`, `email`, `whatsapp`, `address`, `mapEmbedUrl` -> `site-settings`
- `primaryNavigation` -> `header.navigationItems`
- footer links and contact info -> `footer`
- footer snapshots -> `gallery`

Gaps:

- Header topbar language/currency controls are static UI preferences, not CMS content.
- Footer social icon destinations need explicit CMS social links.
- Frontend route labels differ from CMS initial allowed header routes: frontend uses `/about-us`, `/reservation`, `/blog`, while CMS allowed pages currently use `/about`, `/promotions`, `/facilities`.

Recommendation:

- Update CMS header allowed nav values before integration to match frontend routes, or adjust frontend routes intentionally.

### Rooms

Frontend `rooms.ts` fields:

- `slug`
- `name`
- `category`
- `description`
- `longDescription`
- `image`
- `heroImage`
- `gallery`
- `capacity`
- `size`
- `view`
- `bed`
- `startingRate`
- `rateNote`
- `reviews`
- `status`
- `deposit`
- `passenger`
- `amenities`
- `inclusions`
- `bestFor`
- `standards`
- `experiences`

CMS `rooms` coverage:

- `slug` -> covered
- `name` -> `title`
- `description` -> `shortDescription`
- `longDescription` -> `description`
- `image` -> `featuredImage`
- `gallery` -> `gallery`
- `capacity` -> `capacity`
- `size` -> `roomSize`
- `view` -> `view`
- `bed` -> `bedType`
- `startingRate` -> `startingPrice` + `currency`
- `bookingURL` -> covered
- `featured`, `sortOrder`, `status`, `publishedAt`, SEO -> covered

Gaps:

- `category`
- `heroImage`
- `rateNote`
- `reviews`
- availability-style frontend `status`
- `deposit`
- `passenger`
- `inclusions`
- `bestFor`
- `standards`
- `experiences`

Recommendation:

- Before Phase 5 API contract, decide whether room detail pages should preserve all current detail content.
- If yes, extend `rooms` with detail fields before frontend integration and generate a migration.
- If no, simplify frontend detail UI to use the CMS foundation fields plus fallback copy.

### Facilities and Services

Frontend has two concepts:

- `facilities.ts`: simple list of facility labels.
- `services.ts`: rich service detail pages with slug, hero, rituals, stats, gallery, and detail pages.

CMS has:

- `facilities` collection with title, slug, descriptions, icon, featured image, gallery, featured, sortOrder, status, SEO.

Gaps:

- Frontend `/services` and `/services/[slug]` are richer than current CMS `facilities`.
- `rituals`, `stats`, `duration`, `location`, `detailImage`, and service CTA are not represented.

Recommendation:

- Option A: Extend `facilities` into service-capable content.
- Option B: Add a separate `services` collection.
- Option C: Keep `/services` static for first CMS integration and only sync basic facilities.

For minimal scope, Option C is safest. For full frontend parity, Option B is clearer.

### Gallery

Frontend:

- `gallery.ts` is an array of image paths.
- Gallery page has hardcoded hero copy.

CMS:

- `gallery` collection supports title, image, alt, caption, category, featured, sortOrder, status.

Gaps:

- Gallery page hero copy is not represented unless mapped to `home-page.galleryPreview` or a new fixed `gallery-page` global.

Recommendation:

- Add `gallery-page` global only if the gallery route hero text must be editable.
- Otherwise keep gallery route hero copy static for first integration.

### About

Frontend:

- `aboutPrinciples`
- `aboutTeam`
- about hero/story/CTA components

CMS:

- `about-page` supports hero, introduction, story, supporting images, values, final CTA, SEO.

Gaps:

- `aboutTeam` is not covered.
- `aboutPrinciples` maps roughly to `values`, but the current CMS `values` field only has title and description; some frontend values include image.

Recommendation:

- Extend `about-page.values` with optional image if frontend wants image-backed principles.
- Decide if team section should remain static or become an `about-page.team` array.

### Contact

Frontend:

- Uses `property` plus page-local hardcoded contact methods, concierge copy, map section, and quote.

CMS:

- `contact-page` supports hero, contact text, phone, email, WhatsApp, address, map embed URL, operational hours, final CTA, SEO.
- `site-settings` supports contact and map fields.

Gaps:

- Contact method cards and quote are not directly represented.

Recommendation:

- Add structured contact methods to `contact-page` if these cards must be editable.
- Otherwise derive cards from `site-settings`.

### Blog

Frontend:

- `featuredArticle`
- `blogCategories`
- `blogArticles`
- `curatorChoices`

CMS:

- No blog collection currently exists.

Recommendation:

- Blog is outside current CMS foundation scope.
- For first frontend sync, either keep blog static or hide journal preview from CMS-driven sections.
- Add blog only in a later scope if user explicitly wants CMS-managed articles.

### Reservation

Frontend:

- Uses `reservationSearchItems`, `reservationRoomDetails`, `reservationOverview`, and `rooms`.
- Booking inquiry API exists in frontend project.

CMS:

- No booking engine by design.
- Rooms have `bookingURL`.
- Site settings have WhatsApp and booking URL.

Recommendation:

- Keep reservation as WhatsApp-first inquiry flow.
- Do not add booking engine, payment, inventory, or customer login in CMS.
- Frontend can read room options from CMS, but inquiry submission should remain frontend/API-side for now.

### Legal Pages

Frontend:

- `/terms`
- `/privacy`
- `/cookies`
- Data from `legal.ts`

CMS:

- `footer` has `termsURL` and `privacyURL`, but legal page content is not CMS-managed.

Recommendation:

- Keep legal pages static for first integration, or add fixed legal globals later if the owner needs admin editing.
- Do not add arbitrary pages/page builder.

## Proposed CMS Adjustments Before Phase 5

Recommended before API contract:

1. Align `header.navigationItems` allowed URLs with actual frontend routes:
   - `/`
   - `/about-us`
   - `/villa`
   - `/rooms`
   - `/reservation`
   - `/services`
   - `/gallery`
   - `/blog`
   - `/contact`
2. Decide how to handle `/services`:
   - keep static,
   - extend `facilities`,
   - or add `services`.
3. Decide whether room detail pages need these extra fields:
   - `category`
   - `heroImage`
   - `rateNote`
   - `reviews`
   - availability label/status
   - `deposit`
   - `passenger`
   - `inclusions`
   - `bestFor`
   - `standards`
   - `experiences`
4. Decide whether `about-page` needs:
   - `team`
   - image per value/principle
5. Decide whether gallery, rooms, services, blog, legal, and reservation pages need their own fixed Globals.

## Suggested First Integration Contract

Use these CMS endpoints first:

```text
GET /api/globals/site-settings
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/home-page
GET /api/globals/about-page
GET /api/globals/contact-page
GET /api/rooms?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/gallery?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/facilities?where[status][equals]=published&sort=sortOrder&depth=1
GET /api/testimonials?where[status][equals]=published&sort=sortOrder
GET /api/faqs?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder&depth=1
```

Keep these frontend areas static or fallback-driven during first integration:

- `/blog`
- `/services/[slug]` if no service schema is added
- `/reservation` booking details
- legal page body content
- advanced room detail content not covered by current `rooms`

## Image Shape Notes

Frontend currently uses local string paths with `next/image`.

Payload media response should be normalized in frontend helper:

- `url`
- `alt`
- `width`
- `height`
- `sizes.thumbnail`
- `sizes.card`
- `sizes.desktop`

Frontend should use CMS image URLs only after `next.config.mjs` allows the CMS host for `next/image`.

## SEO Notes

Frontend metadata is currently hardcoded per route.

CMS has SEO fields in:

- `site-settings`
- `rooms`
- `facilities`
- `promotions`
- `about-page`
- `contact-page`

Gaps:

- `home-page` currently does not include SEO fields.
- `gallery-page`, `rooms-page`, `services-page`, `blog-page`, legal pages, and reservation page SEO are not represented as CMS editable content.

Recommendation:

- Before Phase 5, decide which page-level SEO fields must be CMS-managed.

## Fallback Strategy

Frontend should keep safe fallback behavior:

- If `site-settings` fails, use static `property.ts` fallback.
- If `rooms` returns empty, show static rooms or a curated empty state.
- If `gallery` returns empty, keep local images as fallback.
- If `home-page` sections are inactive, hide those sections.
- If media relation is missing, use local placeholder images.
- Never show draft data from CMS in public frontend.

## Phase 4.5 Status

Completed in this inventory:

- Audited frontend routes.
- Audited primary hardcoded data files.
- Mapped current CMS Collections and Globals to frontend sections.
- Identified gaps before Phase 5 API contract.
- Documented recommended first integration endpoints.
- Documented image, SEO, and fallback notes.
- Added CMS schema coverage for the identified frontend gaps.

Open before Phase 5:

- Finalize endpoint contract and response shape in Phase 5.
- Verify the new migration on a clean/test database target, or with explicit approval for local data-loss risk.
- Decide exact frontend fallback behavior if `services`, `blog`, or legal content is empty.

Schema update after inventory:

- Added `services` collection for `/services` and `/services/[slug]`.
- Added richer room detail fields so `/villa/[slug]` can move away from hardcoded detail data.
- Added `blog` collection for journal listing/detail content.
- Added `reservation-page` global for reservation page content while keeping booking WhatsApp-first.
- Added `legal-pages` global for terms, privacy, and cookies.
- Aligned header route options with frontend routes while preserving previous CMS route values.
