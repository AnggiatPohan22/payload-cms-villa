# AGENTS.md

Rules wajib untuk Codex, Claude, ChatGPT, dan AI agent lain yang membantu project ini.

Sumber utama aturan ini adalah `docs/cms-project-roadmap.md`. Jika ada perbedaan antara asumsi agent dan roadmap, ikuti roadmap. Jika ada konflik antara dokumen, gunakan urutan prioritas berikut:

1. Instruksi user terbaru.
2. `docs/cms-project-roadmap.md`.
3. `AGENTS.md`.
4. Dokumen lain di `docs/`.
5. Pola code existing.

## Project Goal

Project ini adalah headless CMS Villa / Resort berbasis Payload CMS, Next.js App Router, TypeScript, dan PostgreSQL.

CMS ini hanya bertugas sebagai backend/admin untuk:

- Mengelola konten website Villa / Resort.
- Mengelola media dan gallery.
- Mengelola rooms, services, facilities, promotions, blog, testimonials, dan FAQs.
- Mengelola fixed page content melalui Payload Globals.
- Menyediakan Payload REST API untuk frontend Villa Next.js yang berada di project terpisah.

CMS ini bukan public frontend website.

## Scope Boundaries

Agent wajib menjaga batas scope berikut:

- Jangan membuat public frontend di project CMS ini.
- Jangan membuat landing page marketing di project CMS.
- Jangan membuat page builder.
- Jangan membuat booking engine.
- Jangan membuat payment gateway.
- Jangan membuat ecommerce.
- Jangan membuat customer login.
- Jangan membuat newsletter automation.
- Jangan membuat multi-property management.
- Jangan membuat multi-language kecuali roadmap atau user meminta secara eksplisit.
- Jangan menambahkan dependency tanpa alasan kuat dan persetujuan eksplisit user.
- Jangan mulai integrasi frontend sebelum gate roadmap yang relevan selesai.

Frontend Villa Next.js berada di project terpisah. Project ini hanya CMS/backend/admin.

## Roadmap Priority

Ikuti phase di `docs/cms-project-roadmap.md`.

Urutan kerja utama:

1. Phase 0 - Git and Branch Safety.
2. Phase 1 - CMS Foundation Code.
3. Phase 2 - Local Database and Environment.
4. Phase 3 - Admin Workflow Smoke Test.
5. Phase 4 - Migration and Schema Stability.
6. Phase 4.5 - Frontend Villa Content Inventory.
7. Phase 5 - Frontend API Contract.
8. Phase 6 - Frontend Sync and Integration.
9. Phase 7 - Automated Tests and Hardening.
10. Phase 7.5 - CMS Content Coverage and Admin UX Cleanup.
11. Phase 8 - Deployment Preparation.
12. Phase 9 - Staging / Live Smoke Test.
13. Phase 10 - Merge to Main and Production Release.

Jangan lompat ke phase berikutnya jika gate phase sebelumnya belum selesai, kecuali user meminta audit atau planning saja.

CMS baru boleh dijalankan untuk dilihat melalui dev server pada Phase 2, setelah `.env` lokal dan PostgreSQL siap.

Command dev server yang dipakai nanti:

```powershell
corepack pnpm run dev
```

Admin URL:

```text
http://localhost:3000/admin
```

## Branch Safety

Branch kerja utama adalah `develop`.

Rules:

- Jangan kerja langsung di `main`.
- Jangan merge ke `main` sebelum CMS stabil dan semua gate roadmap sampai live smoke test selesai.
- Sebelum mengubah file, cek branch dengan:

```powershell
git status --short --branch
git branch --show-current
```

- Jika branch aktif adalah `main`, berhenti dan pindah ke `develop` sebelum membuat perubahan.
- Jangan push ke `main` kecuali user secara eksplisit meminta release/merge setelah project stabil.
- Commit dan push pekerjaan pondasi ke `origin develop`.

## File Safety

Rules:

- Jangan menghapus implementasi existing tanpa alasan jelas.
- Jangan mengubah file di luar kebutuhan task.
- Jangan mengubah file frontend project lain dari repo CMS ini.
- Jangan membuat atau mengedit `.env` dengan secret asli kecuali user meminta dan memahami risikonya.
- Jangan commit `.env`, credential, database URL production, token, atau secret.
- Gunakan `.env.example` untuk contoh variable.
- Update `payload-types.ts` hanya melalui command resmi Payload.
- Update `app/(payload)/admin/importMap.js` hanya melalui command resmi Payload.
- Jangan menghapus `.gitignore` atau melemahkan proteksi secret.

Generated atau runtime output yang tidak boleh dijadikan sumber perubahan manual:

- `.next/`
- `node_modules/`
- `media/` runtime upload, kecuali ada kebutuhan seed/test lokal yang disetujui.
- `tsconfig.tsbuildinfo`

## Environment and Secret Handling

Required env:

```env
DATABASE_URI=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CMS_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
PAYLOAD_SKIP_ENV_VALIDATION=false
```

Seed env:

```env
SEED_SUPER_ADMIN_NAME=
SEED_SUPER_ADMIN_EMAIL=
SEED_SUPER_ADMIN_PASSWORD=
```

Rules:

- `PAYLOAD_SECRET` must never be exposed to browser code.
- `DATABASE_URI` must never be exposed to browser code.
- Admin credentials must never be exposed to frontend code.
- `NEXT_PUBLIC_*` variables are browser visible.
- `PAYLOAD_SKIP_ENV_VALIDATION=true` is only for local foundation build before database setup.
- Do not use `PAYLOAD_SKIP_ENV_VALIDATION=true` for production runtime.
- Use production `CMS_URL` and `FRONTEND_URL` before live deployment.

## Payload Schema Rules

Rules:

- Keep schema modular under `src/collections`, `src/globals`, `src/fields`, `src/access`, `src/hooks`, and `src/config`.
- Reuse field helpers instead of duplicating field definitions.
- Use TypeScript-safe naming.
- Do not disable TypeScript checking to pass build.
- Do not disable ESLint to pass build.
- Do not bypass Payload validation to make temporary data work.
- Schema changes after database setup require migration review.
- Schema changes after frontend contract requires docs and API contract update.

## Collections and Globals

Current Collections:

- `users`
- `media`
- `rooms`
- `services`
- `facilities`
- `gallery`
- `promotions`
- `blog`
- `testimonials`
- `faqs`

Current Globals:

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

Rules:

- Use Globals for fixed pages and site-wide settings.
- Do not allow admin users to create arbitrary public pages.
- Use Collections only for repeated content.
- Before adding a new Collection or Global, verify it is needed by roadmap or frontend inventory.
- Document every schema change in `docs/collections.md`, `docs/rest-api.md`, and roadmap/report docs as needed.

## Access Control Rules

Roles:

- `super-admin`: full CMS access.
- `admin`: manage website content and non-super-admin users where allowed.
- `editor`: read and edit content, create drafts, no user management, no sensitive config.

Rules:

- Public users must not read `/api/users`.
- Public users must not create, update, or delete content.
- Public users must not read draft content.
- Authenticated CMS users may read drafts according to role.
- Only `super-admin` can manage Super Admin role.
- Do not weaken access control for convenience.
- Any access control change requires verification and documentation.

## Draft and Published Rules

Rules:

- Public REST API must only return `published` collection content.
- Draft content must not appear in public API responses.
- If published content is changed back to draft, it must disappear from public API.
- Use Payload drafts/versions where already configured.
- Keep `status` and `publishedAt` behavior consistent.
- Do not expose draft preview to frontend until the foundation is stable and roadmap allows it.

## Media Upload Rules

Current media rules:

- Allowed MIME types: JPG/JPEG, PNG, WEBP.
- Max upload size: 5MB.
- Image sizes: `thumbnail`, `card`, `desktop`.
- Focal point enabled.
- Local storage is used for development.

Rules:

- Do not allow executable uploads.
- `alt` text is required for images used by frontend.
- Public media access must only support assets intended for website usage.
- Do not switch to object storage until deployment preparation phase or explicit user request.
- If media storage changes, update environment docs, deployment docs, and frontend media response documentation.

## REST API Contract Rules

Payload REST API is the primary integration with frontend.

Important endpoints:

```text
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/rooms?where[slug][equals]=room-slug&where[status][equals]=published
GET /api/services?where[status][equals]=published&sort=sortOrder
GET /api/services?where[slug][equals]=service-slug&where[status][equals]=published
GET /api/facilities?where[status][equals]=published&sort=sortOrder
GET /api/gallery?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder
GET /api/blog?where[status][equals]=published&sort=sortOrder
GET /api/blog?where[slug][equals]=article-slug&where[status][equals]=published
GET /api/testimonials?where[status][equals]=published&sort=sortOrder
GET /api/faqs?where[status][equals]=published&sort=sortOrder
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
```

Rules:

- Use Payload REST API before adding custom endpoints.
- Keep `depth` low by default.
- Use sorting by `sortOrder` for ordered content.
- Do not expose admin secret to API consumers.
- Do not create custom endpoint unless Payload REST API cannot satisfy the use case.
- Any endpoint contract used by frontend must be documented in `docs/rest-api.md` and `docs/frontend-integration.md`.

## Frontend Integration Rules

Do not start frontend integration until all of these are true:

- CMS can run locally.
- Admin panel can be opened.
- Super Admin can login.
- Media upload works.
- Public REST API is proven to return only published content.
- Draft content is proven not to leak publicly.

Required order before frontend sync:

1. Finish Phase 2.
2. Finish Phase 3.
3. Finish Phase 4.
4. Finish Phase 4.5 frontend content inventory.
5. Finish Phase 5 API contract.
6. Only then start Phase 6 frontend integration.

Frontend rules:

- Frontend project is separate from this CMS repo.
- Frontend should use `NEXT_PUBLIC_CMS_URL`.
- Frontend must not contain `PAYLOAD_SECRET`, database credentials, or admin credentials.
- Frontend should fetch only published public API data.
- Document field mapping before changing frontend code.

## CORS and Security Rules

Rules:

- Do not use wildcard `*` for production CORS.
- CORS and CSRF origins must come from env values.
- Public frontend should only need public read API.
- Admin authentication belongs to the CMS domain.
- Do not expose stack traces in production.
- Validate URLs, relation fields, enums, uploads, and rich text inputs.
- Sanitize any rich text rendered as HTML on the frontend.
- Unauthorized requests should return appropriate HTTP status.
- Review secrets before every commit and before every push.

## Database and Migration Rules

Rules:

- PostgreSQL is the primary database.
- Do not run migrations unless the task explicitly requires database work.
- Do not run migrations in this AGENTS.md creation task.
- Before migrations, make sure `.env` is set and database target is understood.
- After schema changes, run:

```powershell
corepack pnpm run generate:types
corepack pnpm run migrate:create
```

- Before production-like verification, run:

```powershell
corepack pnpm run build:strict
```

- Seed must remain idempotent.
- Seed credentials must come from env.
- Never hardcode production credentials in seed.

## Required Verification Commands

For normal code changes before database is ready:

```powershell
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build
```

For Payload schema changes:

```powershell
corepack pnpm run generate:types
corepack pnpm run generate:importmap
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build
```

For database-ready strict verification:

```powershell
corepack pnpm run build:strict
```

For local runtime verification, only after Phase 2 env/database setup:

```powershell
corepack pnpm run dev
```

Do not claim runtime, login, upload, or API smoke tests passed unless they were actually run.

## Documentation Update Rules

Update docs whenever behavior changes.

Required docs by change type:

- Schema change: update `docs/collections.md`.
- API contract change: update `docs/rest-api.md` and `docs/frontend-integration.md`.
- Env change: update `.env.example` and `docs/environment.md`.
- Local workflow change: update `docs/local-development.md`.
- Deployment change: update `docs/deployment-readiness.md`.
- Phase/gate status change: update `docs/cms-project-roadmap.md`.
- Major implementation milestone: update `docs/cms-foundation-report.md` or create a new report in `docs/`.

Do not leave docs stale after changing code.

## Reporting Format

Every agent handoff or final report should include:

```text
Branch:
Phase:
Files changed:
What changed:
Verification:
Not run:
Risks / blockers:
Next safe step:
```

Rules:

- Mention actual commands and actual results.
- Mention skipped commands explicitly.
- Mention if database, dev server, admin login, media upload, or API smoke test was not run.
- Mention whether any file outside the requested scope changed.
- Keep the report concise and concrete.

## Current Project Checkpoint

As of the current roadmap:

- Active branch should be `develop`.
- Phase 0 through Phase 7 are complete for local CMS hardening.
- Phase 4.5 frontend inventory is complete and schema gaps are addressed.
- Phase 5 API contract is complete in `docs/frontend-api-contract.md`.
- Phase 6 frontend sync and integration was done in the separate frontend repository.
- Phase 7.5 adds CMS page coverage and admin sidebar cleanup before Phase 8 deployment preparation.
- CMS can be viewed via dev server because Phase 2 setup is complete.
- Frontend integration must follow the current API contract and Phase 7.5 follow-up notes.

Next safe step:

1. Review `docs/phase-7-5-content-coverage-admin-ux-report.md`.
2. Restart the normal CMS dev server on `localhost:3000` and manually check `/admin`.
3. Update frontend mappers in the separate frontend repository for `rooms-page`, `services-page`, `blog-page`, and `footer`.
4. Keep this CMS repo backend/admin only.
