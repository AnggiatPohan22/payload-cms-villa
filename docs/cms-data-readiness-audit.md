# CMS Data Readiness Audit

Audit date: 1 Agustus 2026  
Scope: lightweight CMS content readiness check after Payload admin layout fix.

## Phase 6B Update

This audit has been superseded by Phase 6B content seeding from frontend fallback data.

After running `corepack pnpm run seed:frontend`, the local CMS seed/import produced:

| Content area | Seeded result |
| --- | --- |
| `rooms` | 3 published docs |
| `services` | 4 published docs |
| `facilities` | 8 published docs |
| `gallery` | 6 published docs |
| `blog` | 7 published docs |
| `faqs` | 8 published docs |
| `testimonials` | 1 published doc |

The original snapshot below is kept as historical context from before Phase 6B.

## Summary

The CMS schema is ready for the Phase 6 frontend integration contract, but the current local CMS content is not yet fully representative of the Villa frontend fallback data.

The seed file has coverage for the required globals and collections, but the current running local database still needs content population or a fresh seed pass after the newer schema is available.

## Seed File Coverage

`src/seed.ts` contains seed logic for:

- `site-settings`
- `header`
- `footer`
- `home-page`
- `about-page`
- `contact-page`
- `reservation-page`
- `legal-pages`
- `rooms`
- `services`
- `facilities`
- `gallery`
- `promotions`
- `testimonials`
- `faqs`
- `blog`
- `media`
- first Super Admin user from env

## Runtime API Snapshot

Checked against local CMS at `http://localhost:3000`:

| Content area | Runtime result |
| --- | --- |
| `site-settings` | Present |
| `header` | Present |
| `footer` | Present |
| `home-page` | Present |
| `about-page` | Present |
| `contact-page` | Present |
| `reservation-page` | Present |
| `legal-pages` | Present |
| `rooms` | 1 published doc |
| `services` | 0 published docs |
| `gallery` | 1 published doc |
| `promotions` | 0 published docs |
| `testimonials` | 0 published docs |
| `faqs` | 0 published docs |
| `blog` | 0 published docs |

## Readiness Assessment

- Current data is enough for smoke testing API connectivity.
- Current data is not enough for final visual/frontend parity.
- Gallery currently has only placeholder/test-style content.
- Rooms currently have only one published room in the running local DB.
- Services and blog are part of the schema and seed file, but are empty in the current runtime API snapshot.
- Frontend Phase 6 fallback behavior is still required until CMS content is populated.

## Recommended Follow-Up

Create a separate content population task. Safe options:

1. CMS content seeding from frontend fallback data.
2. Manual CMS entry guide for the owner/editor.
3. Frontend-to-CMS data migration script that imports existing `src/data/*` content into Payload.

Do not import frontend data automatically without a dedicated review of media mapping, duplicate handling, slug strategy, and idempotency.
