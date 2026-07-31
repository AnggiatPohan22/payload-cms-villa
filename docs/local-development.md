# Local Development

## Install

```powershell
corepack pnpm install
```

## PostgreSQL

Create a local database, for example `payload_cms_villa`, then set:

```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/payload_cms_villa
```

## Run

```powershell
corepack pnpm run dev
```

Admin panel:

```text
http://localhost:3000/admin
```

## Seed

Set the seed variables in `.env`, then run:

```powershell
corepack pnpm run seed
```

The seed is idempotent and uses environment variables for the first Super Admin credentials.

## Build Modes

```powershell
corepack pnpm run build
corepack pnpm run build:strict
```

Use `build` before database setup. Use `build:strict` after `.env` and PostgreSQL are ready.
