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

## Requirements

Before running:

```powershell
corepack pnpm run dev
```

The CMS must be reachable at `http://localhost:3000` unless `CMS_TEST_URL` is set.

## Current Scope

These are local integration tests. They do not create users, mutate database content, run migrations, or require frontend code.

## Remaining Phase 7 Work

- Add authenticated role tests for editor/admin/super-admin behavior.
- Add upload validation tests with a controlled fixture.
- Add CORS origin tests.
- Add promotion date behavior tests.
- Decide whether later authenticated tests should stay HTTP-based or move to Payload Local API fixtures.
