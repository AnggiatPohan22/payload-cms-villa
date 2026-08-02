# Phase 7 Automated Tests Report

Date: 2 Agustus 2026

## Test Runner Audit

Phase 7 starts with Node.js built-in test runner via `node --test`.

Reasoning:

- No new dependency is required.
- The tests can run as black-box HTTP checks against the local Payload/Next dev server.
- The first hardening targets are public access behavior and media route behavior, which are naturally verified through HTTP.
- A heavier framework can still be added later if Phase 7 expands into database fixtures, authenticated role flows, or browser-level admin tests.

## Added Command

```powershell
corepack pnpm run test:public-api
```

The command runs:

```text
node --test tests/integration/public-api.test.mjs
```

Authenticated role hardening is now covered by:

```powershell
corepack pnpm run test:roles
```

The command prepares temporary role fixtures with Payload Local API, then runs HTTP-based role tests against the local CMS REST API.

Promotion, upload validation, and CORS hardening are now covered by:

```powershell
corepack pnpm run test:hardening
```

Optional CMS URL override:

```powershell
$env:CMS_TEST_URL = 'http://localhost:3000'
corepack pnpm run test:public-api
```

## Coverage Added

- Public collection reads only return `published` docs.
- Public draft queries return no docs.
- Public `/api/users` request remains `403 Forbidden`.
- Required public globals return `200`.
- Published media file route returns `200` and image content type.
- Unsupported media extension returns `404`.
- Encoded path traversal attempt returns `404`.
- Super Admin can manage users and content.
- Admin can manage content but cannot update or delete Super Admin records.
- Editor cannot manage users.
- Editor can create/update content and cannot delete content under current policy.
- Unauthenticated users cannot create, update, or delete protected content.
- Promotion active/expired fixtures are covered under the current status-based public contract.
- Supported image uploads are accepted.
- Unsupported MIME uploads and uploads larger than 5MB are rejected.
- Allowed frontend CORS origin is reflected.
- Unconfigured CORS origin is not reflected.

## Verification Result

Run against local CMS at `http://localhost:3000`:

```powershell
corepack pnpm run test:public-api
```

Result:

```text
tests 7
suites 2
pass 7
fail 0
skipped 0
```

Authenticated role tests:

```powershell
corepack pnpm run test:roles
```

Result:

```text
tests 4
suites 1
pass 4
fail 0
skipped 0
```

Promotion, upload validation, and CORS tests:

```powershell
corepack pnpm run test:hardening
```

Result:

```text
tests 6
suites 3
pass 6
fail 0
skipped 0
```

## Requirements

Before running:

```powershell
corepack pnpm run dev
```

The CMS must be reachable at `http://localhost:3000` unless `CMS_TEST_URL` is set.

## Current Scope

These are local integration tests. Public API tests are read-only. Authenticated role tests create isolated temporary users and FAQ records, then clean them up after the suite. They do not run migrations or require frontend code.

## Remaining Phase 7 Work

- Consider a consolidated `test:phase7` command for all Phase 7 suites.
- Decide whether promotion expiry should remain status/query based or become enforced by CMS access control.
- Add browser-level admin smoke coverage only if the `/admin` hydration warning remains reproducible.
