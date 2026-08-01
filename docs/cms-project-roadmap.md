# CMS Project Roadmap

Dokumen ini menjadi landasan phase untuk backend headless CMS Villa Resort berbasis Payload CMS. Tujuannya supaya pekerjaan tidak langsung lompat ke production sebelum pondasi, database, admin workflow, REST API, integrasi frontend, dan deployment benar-benar stabil.

## Current Status

Tanggal audit: 1 Agustus 2026.

Branch kerja saat ini:

```text
develop
```

Kondisi saat ini:

- Repository sudah terhubung ke GitHub.
- Branch `main` baru berisi README yang sudah dipush.
- Semua file pondasi CMS dikerjakan dan dipush di branch `develop`.
- Payload CMS foundation sudah dibuat.
- `.env` lokal development sudah dibuat dan tidak masuk Git.
- PostgreSQL sudah berhasil dipakai oleh CMS setelah `DATABASE_URI` di `.env` diperbarui manual.
- CMS sudah berhasil dijalankan lokal dan admin dashboard bisa dibuka.
- Super Admin sudah berhasil login.
- Beberapa smoke test Phase 3 sudah berhasil dilakukan manual.
- Integrasi frontend Next.js terpisah belum dimulai.
- Production deployment belum dimulai.
- Phase 4.5 inventory selesai dan schema gap frontend sudah ditambahkan ke CMS.
- Migration schema lanjutan sudah dibuat, tetapi belum diaplikasikan ke database lokal karena Payload menampilkan prompt potensi data loss akibat dev-mode schema push sebelumnya.
- Phase 5 API contract sudah didokumentasikan di `docs/frontend-api-contract.md`.
- Phase 6B content seeding dari fallback data frontend sudah ditambahkan melalui `corepack pnpm run seed:frontend`.

Verifikasi terakhir:

```powershell
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build
```

Hasil:

- TypeScript check berhasil.
- ESLint berhasil tanpa warning/error.
- Build pondasi berhasil.
- `build:strict` berhasil setelah `.env` lokal tersedia.
- `corepack pnpm run migrate` bisa connect ke database dan selesai dengan status no migrations to run.
- Public API `GET /api/globals/site-settings` mengembalikan `200`.
- Public API `GET /api/rooms?where[status][equals]=published&sort=sortOrder` mengembalikan `200`.
- Public API `GET /api/rooms?where[status][equals]=draft` mengembalikan `200` dengan `docs: []`.
- Public API `GET /api/users` mengembalikan `403 Forbidden`.
- Migration awal dibuat di `src/migrations/20260731_134304_initial_schema.ts`.
- Migration lanjutan dibuat di `src/migrations/20260801_011752_add_frontend_content_schema.ts`.
- Verifikasi apply migration lanjutan harus dilakukan hanya pada database kosong/test atau setelah user menyetujui risiko data loss.
- Seed Phase 6B berhasil mengisi 3 rooms, 4 services, 8 facilities, 6 gallery items, 7 blog posts, 8 FAQs, dan 1 testimonial dari frontend fallback data.

## Phase 0 - Git and Branch Safety

Status: complete.

Tujuan:

- Pastikan semua pekerjaan CMS dilakukan di `develop`.
- Jangan merge ke `main` sebelum CMS stabil.
- Pastikan branch `develop` ada di GitHub.
- Pastikan file rahasia seperti `.env` tidak masuk Git.

Checklist:

- [x] Repo terhubung ke GitHub.
- [x] Branch lokal dipindahkan dari `main` ke `develop`.
- [x] `.env` masuk `.gitignore`.
- [x] Commit pondasi awal di branch `develop`.
- [x] Push branch `develop` ke GitHub.
- [x] Verifikasi GitHub memiliki branch `main` dan `develop`.

Command yang nanti dijalankan:

```powershell
git status --short --branch
git add .
git commit -m "Build Payload CMS foundation"
git push -u origin develop
```

Gate selesai:

- `develop` sudah ada di GitHub.
- `main` tetap bersih dari file pondasi sampai project dinyatakan stabil.

## Phase 1 - CMS Foundation Code

Status: complete.

Tujuan:

- Menyiapkan struktur Payload CMS sebagai backend only.
- Tidak membuat frontend publik di project CMS.
- Menyediakan Collections, Globals, access control, media handling, dan REST API bawaan Payload.

Yang sudah dibuat:

- Collections:
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
- Globals:
  - `site-settings`
  - `header`
  - `footer`
  - `home-page`
  - `about-page`
  - `contact-page`
  - `reservation-page`
  - `legal-pages`
- Reusable fields:
  - SEO
  - CTA
  - Link
  - Media relation
  - Publish settings
  - Section visibility
- Access control:
  - `super-admin`
  - `admin`
  - `editor`
- Media:
  - JPG/JPEG, PNG, WEBP
  - Thumbnail, card, desktop sizes
  - Focal point
  - 5MB upload validation
- Documentation:
  - `README.md`
  - `docs/architecture.md`
  - `docs/collections.md`
  - `docs/rest-api.md`
  - `docs/environment.md`
  - `docs/local-development.md`
  - `docs/frontend-integration.md`
  - `docs/frontend-api-contract.md`
  - `docs/deployment-readiness.md`
  - `docs/cms-foundation-report.md`

Checklist tersisa:

- [x] TypeScript check.
- [x] Lint.
- [x] Build pondasi tanpa database.
- [x] Field CMS awal sudah terdokumentasi untuk pondasi backend.
- [x] Halaman fixed CMS awal sudah tersedia sebagai Globals.
- [x] Commit dan push ke branch `develop`.

Catatan:

- Phase 1 dinyatakan selesai untuk pondasi CMS backend.
- Audit detail terhadap project frontend terpisah tetap dijalankan di Phase 4.5 sebelum kontrak API final dan integrasi frontend.

Gate selesai:

- Semua pondasi sudah committed di `develop`.
- Tidak ada error typecheck, lint, dan build.
- Struktur content sudah disetujui sebelum database schema dipakai.

## Phase 2 - Local Database and Environment

Status: complete.

Phase ini adalah phase pertama yang memungkinkan CMS dijalankan lokal dengan dev server.

Tujuan:

- Menyiapkan `.env` lokal.
- Menyiapkan PostgreSQL database.
- Menjalankan Payload CMS secara lokal.
- Membuat Super Admin pertama.
- Membuktikan admin panel bisa dibuka.

Checklist:

- [ ] Copy `.env.example` menjadi `.env`.
- [x] Copy `.env.example` menjadi `.env`.
- [x] Isi `DATABASE_URI`.
- [x] Isi `PAYLOAD_SECRET`.
- [x] Isi seed credential development.
- [x] Buat database PostgreSQL lokal.
- [x] Jalankan migration atau auto schema setup sesuai strategi Payload.
- [x] Jalankan seed.
- [x] Jalankan dev server.
- [x] Buka admin panel.
- [x] Login Super Admin.
- [x] Verifikasi semua package Payload dan @payloadcms/* berada di versi yang sama.
- [x] Verifikasi Node.js version sesuai requirement project.
- [x] Verifikasi package manager yang dipakai hanya satu: pnpm.

Catatan Phase 2:

- `Test-NetConnection localhost:5432` berhasil, jadi port PostgreSQL aktif.
- `psql` dan `createdb` belum tersedia di PATH.
- `corepack pnpm run build:strict` berhasil dengan `.env` lokal.
- Setelah `DATABASE_URI` diperbarui manual oleh user, `corepack pnpm run migrate` bisa connect ke database dan selesai dengan status no migrations to run.
- User mengonfirmasi `corepack pnpm run seed`, `corepack pnpm run dev`, admin dashboard, dan login admin berhasil.

Command lokal:

```powershell
Copy-Item .env.example .env
corepack pnpm run migrate
corepack pnpm run seed
corepack pnpm run dev
```

CMS bisa mulai dilihat pada phase ini setelah database dan `.env` siap.

URL:

```text
http://localhost:3000/admin
```

Gate selesai:

- `corepack pnpm run dev` berjalan tanpa error.
- Admin panel bisa dibuka.
- Super Admin bisa login.
- Collections dan Globals tampil di admin panel.

## Phase 3 - Admin Workflow Smoke Test

Status: complete.

Tujuan:

- Memastikan CMS bisa dipakai staff untuk konten dasar.
- Memastikan role access bekerja.
- Memastikan draft tidak bocor ke public API.

Checklist:

- [x] Upload image berhasil.
- [x] Create/edit room berhasil.
- [x] Create/edit facility berhasil.
- [x] Create/edit gallery item berhasil.
- [x] Create/edit promotion berhasil.
- [x] Create/edit testimonial berhasil.
- [x] Create/edit FAQ berhasil.
- [x] Update `site-settings` berhasil.
- [x] Update `home-page` berhasil.
- [x] Public API hanya membaca `published`.
- [x] Draft tidak muncul pada public API.
- [x] Editor tidak bisa mengelola user.
- [x] Admin tidak bisa mengubah role Super Admin.
- [x] Test public user tidak dapat membaca `/api/users`.
- [x] Test public user tidak dapat membaca draft.
- [x] Test unauthenticated user tidak dapat create/update/delete.
- [x] Test media URL yang published bisa diakses frontend.

Catatan Phase 3:

- User mengonfirmasi smoke test admin workflow berhasil, termasuk admin dashboard dan beberapa CRUD/upload checks.
- Agent memverifikasi public REST API: `site-settings` 200, `rooms published` 200, `rooms draft` docs kosong, dan `/api/users` 403.

Endpoint smoke test:

```text
GET http://localhost:3000/api/rooms?where[status][equals]=published
GET http://localhost:3000/api/globals/site-settings
GET http://localhost:3000/api/globals/home-page
```

Gate selesai:

- Admin workflow dasar terbukti.
- Public REST API sesuai kontrak.
- Role access tidak membuka data sensitif.

## Phase 4 - Migration and Schema Stability

Status: complete.

Tujuan:

- Mengunci schema awal sebelum frontend mulai bergantung pada API.
- Membuat migration yang bisa dijalankan ulang di environment lain.
- Menghindari perubahan breaking setelah frontend mulai integrasi.

Checklist:

- [x] Generate migration awal.
- [x] Jalankan migration dari database kosong.
- [x] Jalankan seed setelah migration.
- [x] Regenerate Payload types.
- [x] Jalankan `build:strict`.
- [x] Dokumentasikan perubahan schema final phase ini.

Catatan Phase 4:

- Migration awal dibuat dengan command `corepack pnpm run migrate:create -- --name initial_schema`.
- File migration dirapikan menjadi `src/migrations/20260731_134304_initial_schema.ts`.
- `corepack pnpm run generate:types` berhasil.
- `corepack pnpm run lint` berhasil.
- `corepack pnpm run build:strict` berhasil.
- `corepack pnpm run typecheck` berhasil setelah dijalankan serial.
- User mengonfirmasi overall Phase 4 test berhasil.
- Database lokal saat ini berisi schema/data dari Phase 2, Phase 3, dan Phase 4 validation.

Command:

```powershell
corepack pnpm run migrate:create
corepack pnpm run migrate
corepack pnpm run generate:types
corepack pnpm run build:strict
```

Gate selesai:

- Database schema bisa dibuat dari migration.
- Seed berjalan idempotent.
- `build:strict` berhasil dengan `.env` valid.

## Phase 4.5 - Frontend Villa Content Inventory

Status: complete.

Tujuan:

- Membaca project frontend Villa Next.js sebelum kontrak API final dikunci.
- Memastikan semua section existing di frontend punya sumber data di Payload CMS.
- Menghindari field CMS yang ternyata tidak dipakai atau field penting yang belum tersedia.

Checklist:

- [x] Audit semua route frontend Villa.
- [x] Audit semua component yang masih memakai hardcoded content.
- [x] Catat section Home, About, Rooms, Gallery, Contact, Promotion, FAQ, dan Footer.
- [x] Cocokkan setiap section dengan Global atau Collection Payload.
- [x] Catat kebutuhan image shape untuk next/image.
- [x] Catat kebutuhan SEO metadata setiap page.
- [x] Catat fallback jika CMS kosong.
- [x] Catat endpoint Payload yang akan dipakai setiap route.
- [x] Simpan hasil mapping ke docs/frontend-villa-content-inventory.md.
- [x] Tambahkan schema untuk gaps utama: services, room detail fields, blog, legal pages, reservation content, dan route enum header.
- [x] Generate Payload types setelah schema update.
- [x] Buat migration lanjutan untuk schema update.

Catatan Phase 4.5:

- Inventory disimpan di `docs/frontend-villa-content-inventory.md`.
- Frontend repo diaudit read-only dari `C:\laragon\www\villa-ceningan`.
- Frontend repo sedang di branch `main` dan memiliki perubahan existing di `src/components/layout/SiteFooter.tsx`; perubahan itu tidak disentuh.
- Gaps utama sebelum Phase 5 sudah ditangani di schema CMS: `services`, room detail fields, `blog`, `legal-pages`, `reservation-page`, dan alignment route enum header CMS dengan route frontend.
- Migration lanjutan dibuat sebagai `src/migrations/20260801_011752_add_frontend_content_schema.ts`.
- `corepack pnpm run migrate` belum dilanjutkan karena Payload menampilkan prompt potensi data loss pada database lokal yang sebelumnya pernah terkena dev-mode schema push.

Gate selesai:

- Semua section frontend existing sudah punya mapping CMS.
- Tidak ada field critical yang miss sebelum frontend integration.
- Schema gap dari inventory sudah dibuat dengan migration dan dokumentasi.

## Phase 5 - Frontend API Contract

Status: complete.

Tujuan:

- Menentukan kontrak final antara CMS dan frontend Next.js terpisah.
- Menghindari frontend mengambil data draft atau field yang belum stabil.
- Menyamakan slug, route, image shape, dan cache strategy.

Checklist:

- [x] Cocokkan field CMS dengan halaman frontend existing.
- [x] Buat daftar endpoint yang dipakai setiap page frontend.
- [x] Tentukan `depth` per endpoint.
- [x] Tentukan sorting dan filtering.
- [x] Tentukan fallback bila data kosong.
- [x] Tentukan cache/revalidate per endpoint.
- [x] Pastikan frontend hanya memakai `NEXT_PUBLIC_CMS_URL`.
- [x] Pastikan secret CMS tidak masuk frontend.
- [x] Dokumentasikan response shape untuk media relation.
- [x] Dokumentasikan field yang wajib dipakai frontend.
- [x] Dokumentasikan fallback untuk setiap section.
- [x] Dokumentasikan empty state jika Collection masih kosong.

Catatan Phase 5:

- Kontrak API final untuk integrasi awal disimpan di `docs/frontend-api-contract.md`.
- Integrasi frontend belum dimulai di phase ini.
- Detail route harus query by `slug` dan `status=published`.
- Default collection list memakai `sort=sortOrder`.
- Default media relation memakai `depth=1`; `home-page` boleh memakai `depth=2` untuk nested featured room/service/article relation.
- Frontend fallback tetap wajib tersedia sampai konten CMS production lengkap.

Contoh endpoint:

```text
GET /api/globals/site-settings
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/home-page
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/services?where[status][equals]=published&sort=sortOrder
GET /api/facilities?where[status][equals]=published&sort=sortOrder
GET /api/gallery?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder
GET /api/blog?where[status][equals]=published&sort=sortOrder
GET /api/globals/reservation-page
GET /api/globals/legal-pages
```

Gate selesai:

- Frontend contract terdokumentasi.
- Tidak ada field penting yang miss untuk halaman existing.
- Frontend bisa mulai fetch data CMS lokal pada Phase 6 setelah helper dibuat di repo frontend terpisah.

## Phase 6B - CMS Content Seeding From Frontend Fallback Data

Status: complete.

Tujuan:

- Mengisi CMS lokal dengan konten representatif dari fallback data frontend Villa.
- Menjaga import aman, idempotent, dan hanya berjalan di repo CMS.
- Memberi data nyata untuk smoke test REST API sebelum integrasi frontend dilanjutkan.

Checklist:

- [x] Baca fallback data frontend dari `C:\laragon\www\villa-ceningan\src\data`.
- [x] Buat script seed/import tanpa dependency baru.
- [x] Import media dari frontend `public` ke Payload `media`.
- [x] Reuse media berdasarkan `filename`.
- [x] Upsert Collections berdasarkan `slug`, `title`, atau key unik lain.
- [x] Update Globals melalui Payload Local API.
- [x] Set imported collection content sebagai `published`.
- [x] Tambahkan dokumentasi Phase 6B.
- [x] Jalankan `corepack pnpm run typecheck`.
- [x] Jalankan `corepack pnpm run seed:frontend`.
- [x] Jalankan `corepack pnpm run lint`.
- [x] Jalankan `corepack pnpm run build:strict`.
- [x] Smoke test public REST API setelah seed.

Command:

```powershell
corepack pnpm run seed:frontend
```

Gate selesai:

- Seed bisa dijalankan ulang tanpa duplikasi besar.
- Public API mengembalikan published CMS content yang cukup untuk Phase 6.
- Runtime media upload tidak ikut commit.
- Dokumentasi mapping tersimpan di `docs/phase-6b-content-seeding-report.md`.

## Phase 6 - Frontend Sync and Integration

Status: ready after Phase 6B verification.

Tujuan:

- Menghubungkan frontend Next.js terpisah ke CMS.
- Mengganti konten hardcoded secara bertahap dengan data Payload.

Checklist:

- [ ] Set `NEXT_PUBLIC_CMS_URL` di project frontend.
- [ ] Buat helper fetch CMS di frontend.
- [ ] Integrasikan site settings, header, footer.
- [ ] Integrasikan home page.
- [ ] Integrasikan rooms.
- [ ] Integrasikan facilities.
- [ ] Integrasikan gallery.
- [ ] Integrasikan promotions.
- [ ] Integrasikan FAQs/testimonials bila ada di UI.
- [ ] Jalankan frontend dan CMS bersamaan.
- [ ] Test halaman publik dengan CMS lokal.

Gate selesai:

- Frontend bisa membaca CMS lokal.
- Halaman existing tetap tampil baik bila data ada.
- Fallback aman bila data kosong.

## Phase 7 - Automated Tests and Hardening

Status: not started.

Tujuan:

- Menambah test untuk access control dan public content filtering.
- Memastikan perubahan selanjutnya tidak merusak kontrak CMS.

Checklist:

- [ ] Pilih test runner.
- [ ] Test public read hanya published.
- [ ] Test draft tidak terbaca publik.
- [ ] Test editor tidak bisa mengelola user.
- [ ] Test admin tidak bisa mengubah Super Admin.
- [ ] Test promotion aktif dan expired.
- [ ] Test upload validation.
- [ ] Test CORS allowed origin.

Gate selesai:

- Test critical access control hijau.
- Dokumentasi verification diperbarui dengan hasil test aktual.

## Phase 8 - Deployment Preparation

Status: not started.

Tujuan:

- Menyiapkan CMS untuk hosting production.
- Menyiapkan database production dan media storage.
- Menyiapkan environment variable production.

Checklist:

- [ ] Pilih hosting CMS.
- [ ] Provision PostgreSQL production.
- [ ] Pilih strategi media storage production.
- [ ] Set `DATABASE_URI` production.
- [ ] Set `PAYLOAD_SECRET` production.
- [ ] Set `CMS_URL` production.
- [ ] Set `FRONTEND_URL` production.
- [ ] Matikan `PAYLOAD_SKIP_ENV_VALIDATION`.
- [ ] Jalankan migration production.
- [ ] Jalankan seed atau buat Super Admin production secara aman.
- [ ] Jalankan `build:strict`.

Gate selesai:

- Production build strict berhasil.
- CMS bisa start di environment staging/production.
- Admin login production berhasil.

## Phase 9 - Staging / Live Smoke Test

Status: not started.

Tujuan:

- Membuktikan CMS live aman dipakai sebelum merge ke `main`.
- Membuktikan frontend bisa konsumsi CMS live.

Checklist:

- [ ] Test `/admin`.
- [ ] Test login Super Admin.
- [ ] Test upload image.
- [ ] Test CRUD content.
- [ ] Test published API.
- [ ] Test draft API tidak bocor.
- [ ] Test CORS dari frontend domain.
- [ ] Test unauthorized request.
- [ ] Test frontend live/staging membaca CMS live.
- [ ] Review tidak ada secret di GitHub.

Gate selesai:

- CMS live stabil.
- Frontend staging/live bisa fetch data CMS.
- Tidak ada critical security issue.

## Phase 10 - Merge to Main and Production Release

Status: not started.

Tujuan:

- Merge `develop` ke `main` hanya setelah CMS stabil.
- Pastikan release production punya checkpoint yang jelas.

Checklist:

- [ ] Semua gate Phase 0 sampai Phase 9 selesai.
- [ ] `develop` sudah sync dengan GitHub.
- [ ] Buat pull request dari `develop` ke `main`.
- [ ] Review file changes.
- [ ] Merge setelah disetujui.
- [ ] Tag release bila diperlukan.
- [ ] Update docs dengan URL live final.

Gate selesai:

- `main` berisi CMS yang sudah stabil.
- Production CMS siap dipakai sebagai backend frontend.

## Current Next Step

Step berikutnya yang paling aman:

1. Review `docs/frontend-api-contract.md`.
2. Jalankan CMS lokal bila belum berjalan.
3. Smoke test endpoint Phase 5 dan Phase 6B dari CMS lokal.
4. Jika endpoint aman, mulai Phase 6 di repo frontend terpisah dengan helper fetch CMS dan `NEXT_PUBLIC_CMS_URL`.

CMS bisa mulai dilihat saat Phase 2, setelah database lokal dan `.env` siap.

Command utama untuk melihat CMS nanti:

```powershell
corepack pnpm run dev
```

URL:

```text
http://localhost:3000/admin
```

## Open Questions to Check Before Frontend Sync

- Apakah struktur halaman frontend existing hanya terdiri dari Home, About, Contact, Rooms, Facilities, Gallery, Promotions, FAQ, dan Testimonials?
- Apakah semua nama field CMS sudah cocok dengan kebutuhan desain frontend?
- Apakah konten rooms perlu harga publik atau cukup inquiry CTA?
- Apakah promotions perlu aturan aktif berdasarkan tanggal di query frontend, atau cukup filter di frontend sementara?
- Apakah media production akan memakai local disk, S3-compatible storage, Cloudflare R2, atau storage lain?
- Apakah deployment CMS dan frontend akan berada pada domain/subdomain terpisah?
- Apakah environment database akan distandarkan sebagai DATABASE_URI atau DATABASE_URL?
- Apakah Payload config, docs, .env.example, dan deployment platform sudah memakai nama variable yang sama?
- Apakah frontend Villa memakai App Router atau Pages Router?
- Apakah data akan difetch via Server Components, API route proxy, atau client-side fetch?
- Apakah image dari Payload akan dipakai melalui next/image?
- Apakah CMS akan berada di subdomain seperti cms.domain.com dan frontend di domain utama?
