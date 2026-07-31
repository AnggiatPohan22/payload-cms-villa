# CMS Foundation Report

## 1. Audit awal

- Kondisi awal project saat implementasi: folder `C:\laragon\www\payload-cms-villa` kosong, belum ada `package.json`, dan belum ada inisialisasi Payload.
- Status Git terbaru: repo sudah terhubung ke GitHub, branch kerja dipindahkan ke `develop` supaya pondasi CMS tidak masuk `main` sebelum stabil.
- Runtime: Node.js `v22.20.0`.
- Package manager: `pnpm` diaktifkan melalui Corepack, versi `11.18.0`.
- Payload scaffold official CLI dicoba, tetapi gagal karena environment command non-interaktif tidak bisa membuka TTY. Implementasi dilanjutkan manual mengikuti struktur Payload 3 + Next App Router.

## 2. Implementasi

- Collections: `users`, `media`, `rooms`, `facilities`, `gallery`, `promotions`, `testimonials`, `faqs`.
- Globals: `site-settings`, `header`, `footer`, `home-page`, `about-page`, `contact-page`.
- Access control:
  - `super-admin`: full access.
  - `admin`: mengelola konten dan user non-super-admin.
  - `editor`: membaca dan mengubah konten, tanpa manajemen user dan tanpa delete penting.
  - Public collection read difilter ke `status=published`.
- Media handling:
  - Local storage di folder `media`.
  - MIME type dibatasi ke JPG/JPEG, PNG, WEBP.
  - Upload image dibatasi maksimal 5MB melalui hook validasi.
  - Image sizes: `thumbnail`, `card`, `desktop`.
  - Focal point aktif.
- REST API:
  - Payload REST API bawaan aktif di `/api`.
  - Admin panel aktif di `/admin`.
- Seed data:
  - `src/seed.ts` membuat Super Admin dari env, placeholder media, globals dasar, dan contoh konten.
  - Seed dibuat idempotent.

## 3. File changes

- Dibuat: `package.json`, `.env.example`, `.gitignore`, `pnpm-workspace.yaml`, `tsconfig.json`, `next.config.mjs`, `eslint.config.mjs`, `payload.config.ts`.
- Dibuat: `app/(payload)/**` untuk admin dan REST API route Payload.
- Dibuat: `app/layout.tsx` dan `app/page.tsx` sebagai root minimal Next, bukan frontend publik.
- Dibuat: `src/access/**`, `src/config/**`, `src/fields/**`, `src/hooks/**`, `src/collections/**`, `src/globals/**`, `src/seed.ts`.
- Dibuat: `README.md` dan `docs/*.md`.
- Generated: `pnpm-lock.yaml`, `payload-types.ts`, `app/(payload)/admin/importMap.js`.

## 4. API examples

```text
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/rooms?where[slug][equals]=ocean-view-villa&where[status][equals]=published
GET /api/facilities?where[status][equals]=published&sort=sortOrder
GET /api/gallery?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder
GET /api/testimonials?where[status][equals]=published&sort=sortOrder
GET /api/faqs?where[status][equals]=published&sort=sortOrder
GET /api/globals/site-settings
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/home-page
GET /api/globals/about-page
GET /api/globals/contact-page
```

```json
{
  "docs": [
    {
      "id": 1,
      "title": "Ocean View Villa",
      "slug": "ocean-view-villa",
      "status": "published"
    }
  ]
}
```

```ts
const response = await fetch(
  `${process.env.NEXT_PUBLIC_CMS_URL}/api/rooms?where[status][equals]=published&sort=sortOrder`,
  {
    next: {
      revalidate: 60,
    },
  },
)

if (!response.ok) {
  throw new Error('Failed to fetch rooms')
}

const data = await response.json()
```

## 5. Verification

- `corepack prepare pnpm@latest --activate`: berhasil setelah dijalankan dengan izin jaringan.
- `corepack pnpm install`: berhasil.
- `corepack pnpm approve-builds --all`: berhasil untuk `esbuild`, `sharp`, dan `unrs-resolver`.
- `corepack pnpm run generate:importmap`: berhasil, menulis `app/(payload)/admin/importMap.js`.
- `corepack pnpm run generate:types`: berhasil, menulis `payload-types.ts`.
- `corepack pnpm run typecheck`: berhasil, `tsc --noEmit`.
- `corepack pnpm run lint`: berhasil, tidak ada ESLint warning atau error.
- `corepack pnpm run build`: berhasil, Next.js compiled dan menghasilkan route `/admin`, `/api/[...slug]`, `/api/graphql`, dan `/api/graphql-playground`. Command ini memakai `PAYLOAD_SKIP_ENV_VALIDATION=true` untuk fase sebelum database.
- `corepack pnpm run build:strict`: gagal sesuai desain karena `DATABASE_URI` belum tersedia. Command ini harus hijau setelah `.env` dan PostgreSQL disiapkan.
- Test otomatis: belum dijalankan karena belum ada test infrastructure di project.
- Runtime smoke test admin/login/API: belum dijalankan karena `.env` aktual dan PostgreSQL lokal belum dikonfigurasi di environment ini.

## 6. Environment

Wajib:

```env
DATABASE_URI=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CMS_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
PAYLOAD_SKIP_ENV_VALIDATION=false
```

Seed:

```env
SEED_SUPER_ADMIN_NAME=
SEED_SUPER_ADMIN_EMAIL=
SEED_SUPER_ADMIN_PASSWORD=
```

Nilai secret tidak boleh ditampilkan atau dimasukkan ke client-side code.

`PAYLOAD_SKIP_ENV_VALIDATION=true` hanya dipakai oleh script `build` untuk verifikasi pondasi sebelum database tersedia. Jangan gunakan nilai ini untuk runtime production.

## 7. Remaining work

Wajib sebelum integrasi frontend:

- Buat `.env` lokal dari `.env.example`.
- Jalankan PostgreSQL dan buat database.
- Jalankan migration jika diperlukan.
- Jalankan seed dan login Super Admin.
- Smoke test endpoint REST publik dengan data published dan draft.
- Jalankan `corepack pnpm run build:strict` sampai hijau.

Wajib sebelum production:

- Provision PostgreSQL production.
- Pindahkan media ke object storage bila disk deployment tidak persistent.
- Set CORS/CSRF hanya ke domain production yang valid.
- Rotasi credential seed setelah Super Admin dibuat.
- Tambahkan backup database dan media.
- Tambahkan automated tests untuk access control dan public content filtering.

Opsional:

- Tambahkan custom preview setelah fondasi stabil.
- Tambahkan object storage adapter.
- Tambahkan rate limiting di layer hosting/reverse proxy.

## 8. Run instructions

```powershell
Copy-Item .env.example .env
corepack pnpm install
corepack pnpm run dev
```

Admin:

```text
http://localhost:3000/admin
```

Seed:

```powershell
corepack pnpm run seed
```
