# Phase 7 Test Hardening Report

Date: 2 Agustus 2026

## Status

Phase 7 local hardening coverage is complete for the current local policy.

## Test Runner

The project continues to use Node.js built-in test runner through `node --test`.

No dependency was added.

## Commands

Public API hardening:

```powershell
corepack pnpm run test:public-api
```

Authenticated role hardening:

```powershell
corepack pnpm run test:roles
```

Promotion, upload validation, and CORS hardening:

```powershell
corepack pnpm run test:hardening
```

The role test command runs a temporary Payload Local API setup script first:

```text
node node_modules/.pnpm/tsx@4.22.4/node_modules/tsx/dist/cli.mjs tests/integration/setupAuthenticatedRoles.ts roles
node --test tests/integration/authenticated-roles.test.mjs
```

The hardening command uses the same setup script with a suite-specific credential file:

```text
node node_modules/.pnpm/tsx@4.22.4/node_modules/tsx/dist/cli.mjs tests/integration/setupAuthenticatedRoles.ts hardening
node --test tests/integration/phase-7-hardening.test.mjs
```

The setup script creates a temporary Super Admin fixture with a random email and password, writes credentials to the OS temp directory, and the HTTP tests log in through Payload REST API. Test users and content fixtures are cleaned up after each suite.

## Coverage Added

- Super Admin can read users.
- Super Admin can create Admin and Editor test users.
- Super Admin can create, update, and delete FAQ content.
- Admin can create, update, and delete FAQ content.
- Admin cannot update a Super Admin user record.
- Admin cannot delete a Super Admin user record.
- Editor cannot read the users collection.
- Editor cannot create users.
- Editor can create and update FAQ content according to current `editorsCanWrite` policy.
- Editor cannot delete FAQ content because delete access is currently `adminsCanDelete`.
- Unauthenticated users cannot create FAQ content.
- Unauthenticated users cannot update FAQ content.
- Unauthenticated users cannot delete FAQ content.
- Promotion date fields can store active and expired published promotion fixtures.
- Current public promotion contract is status-based: both active and expired promotions are returned when `status=published`.
- Supported image upload accepts PNG fixtures.
- Unsupported upload MIME types are rejected.
- Image uploads larger than 5MB are rejected.
- Configured frontend CORS origin is allowed.
- Unconfigured CORS origin is not reflected.

## Verification Results

Run against local CMS at `http://localhost:3000`.

```powershell
corepack pnpm run test:roles
```

Result:

```text
tests 4
suites 1
pass 4
fail 0
cancelled 0
skipped 0
todo 0
```

```powershell
corepack pnpm run test:public-api
```

Result:

```text
tests 7
suites 2
pass 7
fail 0
cancelled 0
skipped 0
todo 0
```

```powershell
corepack pnpm run test:hardening
```

Result:

```text
tests 6
suites 3
pass 6
fail 0
cancelled 0
skipped 0
todo 0
```

Quality gates:

```powershell
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build:strict
```

Results:

- TypeScript check passed.
- ESLint passed with no warnings or errors.
- Strict Next.js production build passed with `.env`.

## Security Findings

No access-control weakening was required.

Observed behavior matches current policy:

- Public users remain forbidden from protected mutations.
- Public users remain forbidden from `/api/users`.
- Admin role can manage content but cannot operate on Super Admin user records.
- Editor role can write content but cannot manage users or delete content.
- CORS does not reflect an unconfigured origin.
- Upload validation rejects unsupported MIME and oversized image payloads.

Promotion finding:

- Expired promotions are not automatically hidden by CMS access control when `status=published`.
- This is not a failing test because the current REST contract filters public promotion visibility by `status`.
- If expired promotions must disappear automatically, add an explicit date-aware query helper or server-side access policy in a later task and update the frontend API contract.

## Remaining Phase 7 Work

- Consider a consolidated `test:phase7` command for all Phase 7 suites.
- Decide whether promotion expiry should remain frontend/query-managed or become CMS-enforced server-side behavior.
- Optional: add browser-level admin panel smoke tests if the Payload admin hydration warning reappears.
