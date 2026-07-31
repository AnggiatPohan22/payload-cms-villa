# CMS Project Roadmap

Dokumen ini menjadi landasan phase untuk backend headless CMS Villa Resort berbasis Payload CMS. Tujuannya supaya pekerjaan tidak langsung lompat ke production sebelum pondasi, database, admin workflow, REST API, integrasi frontend, dan deployment benar-benar stabil.

## Current Status

Tanggal audit: 31 Juli 2026.

Branch kerja saat ini:

```text
develop
```

Kondisi saat ini:

- Repository sudah terhubung ke GitHub.
- Branch `main` baru berisi README yang sudah dipush.
- Semua file pondasi CMS dikerjakan di branch `develop`.
- Payload CMS foundation sudah dibuat.
- PostgreSQL belum dikonfigurasi untuk runtime lokal.
- CMS belum dijalankan dengan `npm run dev` atau `pnpm run dev` karena database belum siap.
- Integrasi frontend Next.js terpisah belum dimulai.
- Production deployment belum dimulai.

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
- `build:strict` masih gagal sesuai desain karena `DATABASE_URI` belum tersedia.

## Phase 0 - Git and Branch Safety

Status: in progress.

Tujuan:

- Pastikan semua pekerjaan CMS dilakukan di `develop`.
- Jangan merge ke `main` sebelum CMS stabil.
- Pastikan branch `develop` ada di GitHub.
- Pastikan file rahasia seperti `.env` tidak masuk Git.

Checklist:

- [x] Repo terhubung ke GitHub.
- [x] Branch lokal dipindahkan dari `main` ke `develop`.
- [x] `.env` masuk `.gitignore`.
- [ ] Commit pondasi awal di branch `develop`.
- [ ] Push branch `develop` ke GitHub.
- [ ] Verifikasi GitHub memiliki branch `main` dan `develop`.

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

Status: mostly complete.

Tujuan:

- Menyiapkan struktur Payload CMS sebagai backend only.
- Tidak membuat frontend publik di project CMS.
- Menyediakan Collections, Globals, access control, media handling, dan REST API bawaan Payload.

Yang sudah dibuat:

- Collections:
  - `users`
  - `media`
  - `rooms`
  - `facilities`
  - `gallery`
  - `promotions`
  - `testimonials`
  - `faqs`
- Globals:
  - `site-settings`
  - `header`
  - `footer`
  - `home-page`
  - `about-page`
  - `contact-page`
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
  - `docs/deployment-readiness.md`
  - `docs/cms-foundation-report.md`

Checklist tersisa:

- [x] TypeScript check.
- [x] Lint.
- [x] Build pondasi tanpa database.
- [ ] Review field names terhadap frontend existing sebelum integrasi.
- [ ] Review apakah semua halaman existing frontend sudah punya Global/Collection yang cukup.
- [ ] Commit dan push ke branch `develop`.

Gate selesai:

- Semua pondasi sudah committed di `develop`.
- Tidak ada error typecheck, lint, dan build.
- Struktur content sudah disetujui sebelum database schema dipakai.

## Phase 2 - Local Database and Environment

Status: not started.

Phase ini adalah phase pertama yang memungkinkan CMS dijalankan lokal dengan dev server.

Tujuan:

- Menyiapkan `.env` lokal.
- Menyiapkan PostgreSQL database.
- Menjalankan Payload CMS secara lokal.
- Membuat Super Admin pertama.
- Membuktikan admin panel bisa dibuka.

Checklist:

- [ ] Copy `.env.example` menjadi `.env`.
- [ ] Isi `DATABASE_URI`.
- [ ] Isi `PAYLOAD_SECRET`.
- [ ] Isi seed credential development.
- [ ] Buat database PostgreSQL lokal.
- [ ] Jalankan migration atau auto schema setup sesuai strategi Payload.
- [ ] Jalankan seed.
- [ ] Jalankan dev server.
- [ ] Buka admin panel.
- [ ] Login Super Admin.
- [ ] Verifikasi semua package Payload dan @payloadcms/* berada di versi yang sama.
- [ ] Verifikasi Node.js version sesuai requirement project.
- [ ] Verifikasi package manager yang dipakai hanya satu: pnpm.

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

Status: not started.

Tujuan:

- Memastikan CMS bisa dipakai staff untuk konten dasar.
- Memastikan role access bekerja.
- Memastikan draft tidak bocor ke public API.

Checklist:

- [ ] Upload image berhasil.
- [ ] Create/edit room berhasil.
- [ ] Create/edit facility berhasil.
- [ ] Create/edit gallery item berhasil.
- [ ] Create/edit promotion berhasil.
- [ ] Create/edit testimonial berhasil.
- [ ] Create/edit FAQ berhasil.
- [ ] Update `site-settings` berhasil.
- [ ] Update `home-page` berhasil.
- [ ] Public API hanya membaca `published`.
- [ ] Draft tidak muncul pada public API.
- [ ] Editor tidak bisa mengelola user.
- [ ] Admin tidak bisa mengubah role Super Admin.
- [ ] Test public user tidak dapat membaca `/api/users`.
- [ ] Test public user tidak dapat membaca draft.
- [ ] Test unauthenticated user tidak dapat create/update/delete.
- [ ] Test media URL yang published bisa diakses frontend.

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

Status: not started.

Tujuan:

- Mengunci schema awal sebelum frontend mulai bergantung pada API.
- Membuat migration yang bisa dijalankan ulang di environment lain.
- Menghindari perubahan breaking setelah frontend mulai integrasi.

Checklist:

- [ ] Generate migration awal.
- [ ] Jalankan migration dari database kosong.
- [ ] Jalankan seed setelah migration.
- [ ] Regenerate Payload types.
- [ ] Jalankan `build:strict`.
- [ ] Dokumentasikan perubahan schema final phase ini.

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

Status: not started.

Tujuan:

- Membaca project frontend Villa Next.js sebelum kontrak API final dikunci.
- Memastikan semua section existing di frontend punya sumber data di Payload CMS.
- Menghindari field CMS yang ternyata tidak dipakai atau field penting yang belum tersedia.

Checklist:

- [ ] Audit semua route frontend Villa.
- [ ] Audit semua component yang masih memakai hardcoded content.
- [ ] Catat section Home, About, Rooms, Gallery, Contact, Promotion, FAQ, dan Footer.
- [ ] Cocokkan setiap section dengan Global atau Collection Payload.
- [ ] Catat kebutuhan image shape untuk next/image.
- [ ] Catat kebutuhan SEO metadata setiap page.
- [ ] Catat fallback jika CMS kosong.
- [ ] Catat endpoint Payload yang akan dipakai setiap route.
- [ ] Simpan hasil mapping ke docs/frontend-villa-content-inventory.md.

Gate selesai:

- Semua section frontend existing sudah punya mapping CMS.
- Tidak ada field critical yang miss sebelum frontend integration.
- Schema CMS tidak diubah lagi tanpa migration dan update API contract.

## Phase 5 - Frontend API Contract

Status: not started.

Tujuan:

- Menentukan kontrak final antara CMS dan frontend Next.js terpisah.
- Menghindari frontend mengambil data draft atau field yang belum stabil.
- Menyamakan slug, route, image shape, dan cache strategy.

Checklist:

- [ ] Cocokkan field CMS dengan halaman frontend existing.
- [ ] Buat daftar endpoint yang dipakai setiap page frontend.
- [ ] Tentukan `depth` per endpoint.
- [ ] Tentukan sorting dan filtering.
- [ ] Tentukan fallback bila data kosong.
- [ ] Tentukan cache/revalidate per endpoint.
- [ ] Pastikan frontend hanya memakai `NEXT_PUBLIC_CMS_URL`.
- [ ] Pastikan secret CMS tidak masuk frontend.
- [ ] Dokumentasikan response shape untuk media relation.
- [ ] Dokumentasikan field yang wajib dipakai frontend.
- [ ] Dokumentasikan fallback untuk setiap section.
- [ ] Dokumentasikan empty state jika Collection masih kosong.

Contoh endpoint:

```text
GET /api/globals/site-settings
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/home-page
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/facilities?where[status][equals]=published&sort=sortOrder
GET /api/gallery?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder
```

Gate selesai:

- Frontend contract terdokumentasi.
- Tidak ada field penting yang miss untuk halaman existing.
- Frontend bisa fetch data CMS lokal.

## Phase 6 - Frontend Sync and Integration

Status: not started.

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

1. Commit semua pondasi CMS di branch `develop`.
2. Push branch `develop` ke GitHub.
3. Siapkan `.env` lokal dan PostgreSQL.
4. Jalankan `corepack pnpm run dev`.
5. Login admin dan lakukan smoke test CMS.

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
