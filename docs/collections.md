# Collections and Globals

## Collections

- `users`: Auth collection with `super-admin`, `admin`, and `editor` roles.
- `media`: Image upload library for JPG, PNG, and WEBP.
- `rooms`: Accommodation content, including listing and detail page fields.
- `services`: Rich service detail content for `/services` and `/services/[slug]`.
- `facilities`: Facility and service content.
- `gallery`: Curated gallery entries.
- `promotions`: Promotional banner and offer content.
- `blog`: Journal/article content for `/blog` and article detail pages.
- `testimonials`: Guest review content.
- `faqs`: Frequently asked questions.

## Globals

- `site-settings`
- `header`
- `footer`
- `home-page`
- `about-page`
- `rooms-page`
- `services-page`
- `contact-page`
- `reservation-page`
- `blog-page`
- `legal-pages`

## Frontend Content Additions

Phase 4.5 added schema coverage for the content gaps found in the separate Villa frontend inventory:

- Room detail fields: `category`, `heroImage`, `inclusions`, `standards`, `experiences`, `capacityLabel`, `rateNote`, `reviewsLabel`, `availabilityLabel`, `depositLabel`, `passengerLabel`, and `bestFor`.
- Services collection: hero/detail images, CTA, stats, rituals, gallery, ordering, featured flag, draft/published status, and SEO.
- Blog collection: category, excerpt, rich text content, featured image, read time, article date, featured flags, ordering, draft/published status, and SEO.
- Reservation Page global: hero content, search preview, booking benefits, room detail references, overview content, WhatsApp CTA, and SEO.
- Legal Pages global: fixed editable content for terms, privacy, and cookies.
- Header global: route options aligned with frontend routes while preserving existing route values for database safety.

## Phase 7.5 Content Coverage Additions

Phase 7.5 added safer CMS control for listing/page-level frontend copy before deployment preparation:

- Rooms Page global: hero, intro, listing copy, listing CTA, hero image, and SEO for `/rooms`.
- Services Page global: hero, intro, listing copy, final CTA, hero image, and SEO for `/services`.
- Blog Page global: hero, intro, listing copy, hero image, and SEO for `/blog`.
- Footer global: extended with `brand`, `contact`, `navigationColumns`, richer `socialLinks`, `legalLinks`, and `bookingCta` while keeping existing fields for compatibility.
- Legal Pages global: existing terms/privacy/cookies structure retained and extended with machine-readable `updatedAt` date next to `updatedAtLabel`.

## Phase 7.7 Home Page Cleanup Rules

Home Page global must mirror the current frontend Home route section order. Current Home sections are:

- `hero`: first viewport hero content, background image, and hero CTAs.
- `bookingPreview`: availability form labels and button/link labels used by the Home booking preview bar.
- `introduction`: the ocean-side comfort intro section, including editable eyebrow, heading, description, and image.
- `signatureExperiences`: service preview section, including editable eyebrow, heading, description, selected services, and `button`.
- `typeOfRooms`: room type preview section, including editable eyebrow, heading, description, and selected rooms.
- `testimonialNote`: admin note only. The frontend testimonial section is intentionally reserved for Google Reviews or another review platform integration later.
- `journalPreview`: blog preview section, including editable eyebrow, heading, description, selected articles, and `button`.
- `contactPreview`: Home contact preview section, including editable eyebrow, heading, address/contact labels, contact values, and map embed URL.

Home Page no longer exposes `facilitiesOverview`, `galleryPreview`, or `promotionSection` because those sections are not currently rendered on the frontend Home page. Future agents must not add page section groups to CMS until the matching frontend section exists.

Use `button` for normal section navigation links. Reserve `CTA` naming only for sections that are actually presented as CTA sections in the frontend.

## Phase 7.8 About and Rooms Page Cleanup Rules

About Page global now mirrors `/about-us` frontend section order:

- `hero`: hero eyebrow, heading, description, image, and scroll cue label.
- `story`: story eyebrow, heading, editable paragraphs, and image.
- `principles`: section eyebrow, heading, description, and editable principle cards.
- `team`: team heading, quote, and editable team member cards.
- `finalCTA`: actual CTA section with heading, image, and `button`.

Rooms Page global now mirrors `/rooms` frontend section order:

- `hero`: first viewport heading, description, and image.
- `availabilityBar`: availability form labels, promotion link label/URL, and submit button label/URL.
- `roomCollection`: room listing eyebrow, heading, description, room card labels, detail button label, and reservation `button`.

Do not re-add legacy flat fields such as `heroHeading`, `introHeading`, `listingCTA`, `values`, or About supporting image fields to the admin UI. They are retained only as mapper fallback while older content is migrated.

## Phase 7.9 Services and Contact Page Cleanup Rules

Services Page global now mirrors `/services` frontend section order:

- `hero`: hero heading, description, image, and scroll cue label.
- `intro`: eyebrow, quoted intro heading, and intro description.
- `signatureServices`: editable aria label for the services list section.
- `tailoredMoment`: editable meta labels for the featured transit/tailored moment section.
- `finalCTA`: actual CTA section with heading, description, primary button, and secondary button.

Contact Page global now mirrors `/contact` frontend section order:

- `hero`: hero heading, description, and image.
- `contactInquiry`: contact methods, concierge copy/button, phone, email, WhatsApp, and address values.
- `contactForm`: form heading, description, labels, placeholders, subject options, submit states, and WhatsApp message intro.
- `mapSection`: map section heading, description, location heading, iframe title, map URL, and button.
- `quote`: final quote aria label and quote text.

Services and Contact use simple `button` groups for normal links. These buttons expose label, URL, and open-in-new-tab behavior without style variants to keep migration names short and avoid unnecessary enum churn.

Admin sidebar groups now use:

- `Pages`: fixed page Globals.
- `Content`: Rooms, Services, Facilities, Gallery, Promotions, Testimonials, FAQs.
- `Posts`: Blog posts.
- `Media`: Media library.
- `Settings`: Site Settings, Header, Footer, Users.

## Publishing

Collections use a simple `status` field with `draft` and `published`. Public read access for collections is filtered to `status=published`. Authenticated CMS users can read drafts according to role.
