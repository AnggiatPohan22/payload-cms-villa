# Phase 6C Media File Route Report

Date: 1 Agustus 2026

## Summary

Frontend pages received CMS media URLs such as `http://localhost:3000/api/media/file/island-suite.webp`, but the CMS returned `404` for those file URLs even though the files existed in the local `media/` upload directory.

## Root Cause

The Payload REST API returned media document data correctly, but this project did not have an explicit Next.js route serving local upload files from `/api/media/file/:filename`.

## Fix

Added a local media file route:

```text
app/(payload)/api/media/file/[filename]/route.ts
```

The route:

- Serves files from the CMS runtime `media/` directory.
- Supports JPG/JPEG, PNG, and WEBP.
- Rejects path traversal and unsupported extensions.
- Supports `GET` and `HEAD`.
- Returns long-lived cache headers for immutable upload filenames.

## Verification

Expected smoke checks:

```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/media/file/island-suite.webp -Method Head
Invoke-WebRequest -Uri http://localhost:3000/api/media/file/hero-bg-2-1920x1080.webp -Method Head
Invoke-WebRequest -Uri http://localhost:3000/api/media/file/gallery-4-768x576.webp -Method Head
```

Each endpoint should return `200` with an image content type.

## Frontend Impact

The frontend can keep using Payload media relation URLs. No hardcoded image path fallback is required for valid published CMS media.

## Remaining Notes

This route is for local filesystem media. Before production deployment, the project still needs a production media storage decision such as persistent disk, S3-compatible storage, or Cloudflare R2.
