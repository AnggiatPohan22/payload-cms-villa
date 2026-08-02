# CMS Project Roadmap

Dokumen ini menjadi landasan phase untuk backend headless CMS Villa Resort berbasis Payload CMS. Tujuannya supaya pekerjaan tidak langsung lompat ke production sebelum pondasi, database, admin workflow, REST API, integrasi frontend, dan deployment benar-benar stabil.

## Current Status

Tanggal audit: 2 Agustus 2026.

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
- Integrasi frontend Next.js terpisah sudah dilakukan di repo `C:\laragon\www\villa-ceningan` pada branch `phase-6-cms-integration`.
- Production deployment belum dimulai.
- Phase 4.5 inventory selesai dan schema gap frontend sudah ditambahkan ke CMS.
- Migration schema lanjutan sudah dibuat, tetapi belum diaplikasikan ke database lokal karena Payload menampilkan prompt potensi data loss akibat dev-mode schema push sebelumnya.
- Phase 5 API contract sudah didokumentasikan di `docs/frontend-api-contract.md`.
- Phase 6 frontend integration sudah dilakukan di repo frontend terpisah melalui commit `6a7e24b Integrate frontend with Payload CMS API`.
- Frontend sudah membaca CMS melalui `NEXT_PUBLIC_CMS_URL` dan tetap menyimpan fallback ke `src/data/*`.
- Frontend local integration mencakup `/`, `/villa`, `/rooms`, `/rooms/[slug]`, `/services`, `/services/[slug]`, `/gallery`, `/reservation`, dan `/blog`.
- Phase 6B content seeding dari fallback data frontend sudah ditambahkan melalui `corepack pnpm run seed:frontend`.
- Phase 6C CMS sync dan media rendering sudah diperbaiki: home-page hero mapping/cache/media URL/frontend image config diperbaiki di frontend, dan CMS local media route `/api/media/file/:filename` ditambahkan untuk serve upload lokal.
- Phase 7 Automated Tests and Hardening sudah berjalan dengan Node.js built-in test runner untuk public API, media route checks, authenticated role access checks, promotion lifecycle, upload validation, dan CORS checks.

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
- Frontend `npx.cmd tsc --noEmit` berhasil pada branch `phase-6-cms-integration`.
- Frontend `npm.cmd run build` berhasil pada branch `phase-6-cms-integration`.
- Frontend lint belum menjadi gate hijau karena `npm.cmd run lint` masih memakai `next lint` yang tidak cocok dengan versi Next/ESLint repo, dan `npx.cmd eslint .` belum bisa dipakai sebelum ada `eslint.config.*`.
- CMS media file checks untuk `/api/media/file/:filename` sudah mengembalikan `200 image/webp` setelah route lokal ditambahkan.
- Phase 7 public API command berhasil: `corepack pnpm run test:public-api` dengan 7 tests pass.
- Phase 7 authenticated role command berhasil: `corepack pnpm run test:roles` dengan 4 tests pass.
- Phase 7 hardening command berhasil: `corepack pnpm run test:hardening` dengan 6 tests pass.

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

## Phase 6 - Frontend Sync and Integration

Status: completed for local integration / pending broader automated test coverage.

Tujuan:

- Menghubungkan frontend Next.js terpisah ke CMS melalui Payload REST API.
- Mengganti konten hardcoded secara bertahap dengan data Payload.
- Menjaga fallback `src/data/*` agar frontend tetap tampil jika CMS kosong atau tidak reachable.

Checklist:

- [x] Set `NEXT_PUBLIC_CMS_URL` di project frontend.
- [x] Buat helper Payload REST API di frontend pada `src/lib/cms/`.
- [x] Pastikan frontend hanya memakai env publik `NEXT_PUBLIC_CMS_URL`.
- [x] Pertahankan fallback ke `src/data/*`.
- [x] Integrasikan home page `/`.
- [x] Integrasikan `/villa`.
- [x] Integrasikan `/rooms`.
- [x] Integrasikan `/rooms/[slug]`.
- [x] Integrasikan `/services`.
- [x] Integrasikan `/services/[slug]`.
- [x] Integrasikan `/gallery`.
- [x] Integrasikan `/reservation`.
- [x] Integrasikan `/blog`.
- [x] Support remote image dari CMS URL di frontend `next.config.mjs`.
- [x] Dokumentasikan integrasi frontend di repo frontend `docs/cms-integration.md`.
- [x] Update README frontend dengan data layer CMS + fallback.
- [x] Jalankan frontend `npx.cmd tsc --noEmit`.
- [x] Jalankan frontend `npm.cmd run build`.
- [ ] Perbaiki tooling lint frontend agar tidak lagi memakai `next lint`.
- [ ] Tambahkan automated coverage untuk kontrak CMS/frontend.

Catatan Phase 6:

- Implementasi dilakukan di repo frontend terpisah `C:\laragon\www\villa-ceningan`.
- Branch frontend: `phase-6-cms-integration`.
- Commit integrasi awal: `6a7e24b Integrate frontend with Payload CMS API`.
- Halaman yang sudah membaca CMS: `/`, `/villa`, `/rooms`, `/rooms/[slug]`, `/services`, `/services/[slug]`, `/gallery`, `/reservation`, dan `/blog`.
- Frontend fallback tetap wajib dipertahankan sampai konten CMS production lengkap dan reviewed.
- `npm.cmd run lint` frontend belum menjadi gate hijau karena script masih memakai `next lint` yang tidak cocok dengan versi Next/ESLint repo.
- `npx.cmd eslint .` frontend juga belum bisa menjadi gate sampai repo frontend memiliki `eslint.config.*`.

Gate selesai:

- Frontend bisa membaca CMS lokal melalui `NEXT_PUBLIC_CMS_URL`.
- Halaman existing tetap tampil baik bila data CMS tersedia.
- Fallback aman bila CMS kosong atau unreachable.
- TypeScript dan build frontend hijau.
- Lint frontend dicatat sebagai tooling follow-up, bukan runtime blocker.

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

## Phase 6C - Debug CMS Sync and Media Rendering

Status: complete for current local sync issues / monitor during Phase 7.

Tujuan:

- Memastikan perubahan konten CMS benar-benar muncul di frontend.
- Memastikan media dari Payload dapat dipakai oleh frontend `next/image`.
- Memperjelas root cause jika frontend jatuh ke fallback, cache development terlalu kuat, mapping field tidak sesuai, atau media URL tidak bisa diakses.

Checklist:

- [x] Debug fallback priority dan mapping CMS pada frontend.
- [x] Perbaiki mapping `home-page.hero.heading` agar perubahan Hero Heading CMS tampil di Home Page frontend.
- [x] Perbaiki behavior fetch development agar edit CMS mudah terlihat setelah refresh/restart frontend.
- [x] Perbaiki normalisasi media URL dari Payload untuk frontend.
- [x] Naikkan query `depth` frontend untuk relation media yang perlu object media.
- [x] Perbaiki frontend `next.config.mjs` untuk remote image CMS lokal.
- [x] Tambahkan CMS route lokal `/api/media/file/:filename` untuk serve upload dari folder runtime `media/`.
- [x] Dokumentasikan CMS media route di `docs/phase-6c-media-file-route-report.md`.
- [x] Update REST API docs dengan endpoint media file.

Catatan Phase 6C:

- Root cause media sisi CMS: Payload REST API mengembalikan media document dan URL, tetapi project belum memiliki route Next.js eksplisit untuk serve local upload file dari `/api/media/file/:filename`; akibatnya file URL mengembalikan `404` walaupun file ada di folder `media/`.
- Fix CMS: `app/(payload)/api/media/file/[filename]/route.ts` ditambahkan untuk serve JPG/JPEG, PNG, dan WEBP dari folder runtime `media/`, mendukung `GET` dan `HEAD`, serta menolak path traversal.
- Root cause sync sisi frontend: Home route awalnya belum memakai `home-page` Global untuk hero, dan beberapa fetch/media config membuat frontend bisa terlihat masih memakai fallback atau gagal render image.
- Fix frontend dilakukan di repo frontend terpisah: helper CMS, mapper home-page, media normalizer, development no-store behavior, depth query media relation, dan image config lokal.
- Manual local test aman: edit `Home Page > Hero Heading` di CMS, refresh frontend, perubahan muncul di Home Page; image CMS yang sebelumnya tidak tampil sudah tampil setelah CMS dan frontend dev server direstart.
- Hydration warning pada Payload admin pernah terlihat di `/admin`, tetapi tidak dikonfirmasi sebagai blocker Phase 6C media/frontend sync. Pantau lagi di Phase 7 jika masih reproducible tanpa browser extension/dev overlay.

Gate selesai:

- `GET`/`HEAD /api/media/file/:filename` mengembalikan image lokal yang valid.
- Frontend dapat memakai URL media dari Payload tanpa hardcode image path.
- Edit CMS untuk Home Hero terlihat di frontend local.
- Issue local image optimizer/private IP dicatat sebagai frontend local config concern dan tidak mengubah schema CMS.

## Phase 7 - Automated Tests and Hardening

Status: complete for local hardening coverage / monitor during deployment preparation.

Tujuan:

- Menambah test untuk access control dan public content filtering.
- Memastikan perubahan selanjutnya tidak merusak kontrak CMS.
- Mengunci behavior media route lokal, CORS, dan API contract sebelum deployment preparation.

Checklist:

- [x] Pilih test runner awal.
- [x] Tambahkan test harness endpoint HTTP lokal.
- [x] Test public read collection hanya mengembalikan `published`.
- [x] Test draft tidak terbaca publik pada rooms/services/blog/gallery/promotions/testimonials/faqs.
- [x] Test Super Admin bisa manage users dan content.
- [x] Test Admin bisa manage content tetapi tidak bisa mengubah/delete Super Admin.
- [x] Test editor tidak bisa mengelola user.
- [x] Test Editor access terhadap content sesuai policy aktual project.
- [x] Test unauthenticated user tidak dapat create/update/delete protected content.
- [x] Test admin tidak bisa mengubah Super Admin.
- [x] Test promotion aktif dan expired.
- [x] Test upload validation.
- [x] Test CORS allowed origin.
- [x] Test CORS unconfigured origin tidak direfleksikan.
- [x] Test `/api/users` tetap `403 Forbidden` untuk public request.
- [x] Test `/api/media/file/:filename` mengembalikan `200` untuk file image valid.
- [x] Test `/api/media/file/:filename` mengembalikan `404` untuk path traversal atau extension unsupported.
- [x] Test globals public read untuk site-settings, header, footer, home-page, reservation-page, dan legal-pages.
- [x] Dokumentasikan command test aktual setelah test runner dipilih.

Prioritas awal Phase 7:

1. Node.js built-in test runner dipilih untuk fase awal karena tidak menambah dependency dan cukup untuk black-box HTTP checks.
2. Public API dan draft leakage tests sudah dibuat di `tests/integration/public-api.test.mjs`.
3. Media route tests sudah dibuat karena route ini menjadi dependency langsung untuk frontend images.
4. Authenticated role tests untuk editor/admin/super-admin sudah dibuat di `tests/integration/authenticated-roles.test.mjs`.
5. Promotion lifecycle, upload validation, dan CORS checks sudah dibuat di `tests/integration/phase-7-hardening.test.mjs`.
6. Next step setelah Phase 7 adalah deployment preparation, dengan keputusan khusus apakah expired promotions tetap dikelola via query/frontend atau harus enforced di CMS access control.

Gate selesai:

- Test critical access control hijau.
- Test media route hijau.
- Test public API contract minimal hijau.
- Dokumentasi verification diperbarui dengan hasil test aktual.

Verifikasi awal Phase 7:

```powershell
corepack pnpm run test:public-api
```

Hasil:

- 7 tests pass.
- 0 tests failed.
- Public published filtering, draft leakage, `/api/users` forbidden, public globals, dan media file route sudah tercakup.

Verifikasi role Phase 7:

```powershell
corepack pnpm run test:roles
```

Hasil:

- 4 tests pass.
- 0 tests failed.
- Super Admin, Admin, Editor, dan unauthenticated protected mutation behavior sudah tercakup.

Verifikasi hardening Phase 7:

```powershell
corepack pnpm run test:hardening
```

Hasil:

- 6 tests pass.
- 0 tests failed.
- Promotion active/expired fixtures, upload validation, dan CORS allowed/disallowed origin checks sudah tercakup.

Catatan promotion behavior:

- Public promotions saat ini masih memakai kontrak status-based.
- Promotion dengan `status=published` tetap returned walaupun `endDate` sudah lewat.
- Jika expired promotion harus otomatis hilang dari public API, perlu perubahan policy/query eksplisit dan update kontrak frontend.

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

1. Buat command konsolidasi opsional untuk menjalankan semua suite Phase 7 jika diinginkan.
2. Putuskan policy promotion expiry sebelum deployment: tetap frontend/query-managed atau CMS-enforced.
3. Lanjut Phase 8 Deployment Preparation setelah keputusan promotion expiry dicatat.

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

Phase 6 local frontend sync sudah berjalan. Pertanyaan lama di bawah disimpan sebagai historical checklist dan deployment planning reference.

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
