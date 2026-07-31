# Collections and Globals

## Collections

- `users`: Auth collection with `super-admin`, `admin`, and `editor` roles.
- `media`: Image upload library for JPG, PNG, and WEBP.
- `rooms`: Accommodation content.
- `facilities`: Facility and service content.
- `gallery`: Curated gallery entries.
- `promotions`: Promotional banner and offer content.
- `testimonials`: Guest review content.
- `faqs`: Frequently asked questions.

## Globals

- `site-settings`
- `header`
- `footer`
- `home-page`
- `about-page`
- `contact-page`

## Publishing

Collections use a simple `status` field with `draft` and `published`. Public read access for collections is filtered to `status=published`. Authenticated CMS users can read drafts according to role.
