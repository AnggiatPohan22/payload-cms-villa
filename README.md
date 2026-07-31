# Villa Resort Payload CMS

Headless CMS/backend for a hotel or resort website. This project is intentionally CMS-only and exposes Payload REST API endpoints for a separate Next.js frontend.

## Requirements

- Node.js 20.9.0 or newer. Verified locally with Node `v22.20.0`.
- pnpm via Corepack. Verified locally with pnpm `11.18.0`.
- PostgreSQL.

## Setup

```powershell
corepack pnpm install
Copy-Item .env.example .env
```

Fill `.env` with local PostgreSQL and Payload values. Do not commit real secrets.

```powershell
corepack pnpm run dev
```

Open `http://localhost:3000/admin`.

## Useful Commands

```powershell
corepack pnpm run dev
corepack pnpm run build
corepack pnpm run start
corepack pnpm run lint
corepack pnpm run typecheck
corepack pnpm run generate:types
corepack pnpm run generate:importmap
corepack pnpm run migrate:create
corepack pnpm run migrate
corepack pnpm run seed
```

## API

REST API is served under `/api`. Example:

```text
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/globals/site-settings
```

See `docs/rest-api.md` and `docs/frontend-integration.md`.
