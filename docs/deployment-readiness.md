# Deployment Readiness

Before production:

- Provision PostgreSQL and set `DATABASE_URI`.
- Set a long random `PAYLOAD_SECRET`.
- Set production `CMS_URL` and `FRONTEND_URL`.
- Configure persistent object storage for media if local disk is not durable.
- Run migrations.
- Run `corepack pnpm run build`.
- Confirm CORS and CSRF allow only trusted origins.
- Confirm seed credentials are removed or rotated after first Super Admin creation.
- Configure backups for PostgreSQL and media storage.

This project is not configured for production deployment yet. The current scope is local CMS foundation and API readiness.
