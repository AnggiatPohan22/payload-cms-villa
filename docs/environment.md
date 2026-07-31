# Environment

Required variables:

```env
DATABASE_URI=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CMS_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
PAYLOAD_SKIP_ENV_VALIDATION=false
```

Seed variables:

```env
SEED_SUPER_ADMIN_NAME=
SEED_SUPER_ADMIN_EMAIL=
SEED_SUPER_ADMIN_PASSWORD=
```

Never expose `PAYLOAD_SECRET`, database credentials, or admin credentials in browser-facing frontend code. `NEXT_PUBLIC_*` variables are visible to the browser.

`PAYLOAD_SKIP_ENV_VALIDATION=true` is only for local foundation builds before the database exists. Do not use it for production runtime.
