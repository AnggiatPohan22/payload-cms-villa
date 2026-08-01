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
- `contact-page`
- `reservation-page`
- `legal-pages`

## Frontend Content Additions

Phase 4.5 added schema coverage for the content gaps found in the separate Villa frontend inventory:

- Room detail fields: `category`, `heroImage`, `inclusions`, `standards`, `experiences`, `capacityLabel`, `rateNote`, `reviewsLabel`, `availabilityLabel`, `depositLabel`, `passengerLabel`, and `bestFor`.
- Services collection: hero/detail images, CTA, stats, rituals, gallery, ordering, featured flag, draft/published status, and SEO.
- Blog collection: category, excerpt, rich text content, featured image, read time, article date, featured flags, ordering, draft/published status, and SEO.
- Reservation Page global: hero content, search preview, booking benefits, room detail references, overview content, WhatsApp CTA, and SEO.
- Legal Pages global: fixed editable content for terms, privacy, and cookies.
- Header global: route options aligned with frontend routes while preserving existing route values for database safety.

## Publishing

Collections use a simple `status` field with `draft` and `published`. Public read access for collections is filtered to `status=published`. Authenticated CMS users can read drafts according to role.
