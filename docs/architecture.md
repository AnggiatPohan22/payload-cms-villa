# Architecture

This project uses Payload CMS 3 with Next.js App Router and PostgreSQL.

## Responsibilities

- Manage fixed website content through Payload Globals.
- Manage repeated content through Payload Collections.
- Serve public published content through Payload REST API.
- Provide an admin panel at `/admin`.

## Non-Responsibilities

- Public website frontend.
- Page builder.
- Booking engine.
- Payment, ecommerce, newsletter automation, or customer login.

## Main Modules

- `payload.config.ts`: Payload runtime configuration, database adapter, admin, CORS, CSRF, collections, globals.
- `app/(payload)`: Payload admin and API routes for Next.js. This route group uses Payload `RootLayout` as its root layout.
- `app/(site)`: Empty placeholder root route for `/`; this keeps the CMS repo from becoming a public frontend while avoiding nested root layouts around Payload Admin.
- `src/collections`: Collection definitions.
- `src/globals`: Fixed page and site configuration globals.
- `src/access`: Role and published-content access helpers.
- `src/fields`: Reusable field definitions.
- `src/seed.ts`: Idempotent development seed.
