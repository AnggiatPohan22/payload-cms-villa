# REST API

Payload serves REST endpoints under `/api`.

The route-by-route frontend contract is documented in `docs/frontend-api-contract.md`.

## Collection Endpoints

```text
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/rooms?where[slug][equals]=ocean-view-villa&where[status][equals]=published
GET /api/services?where[status][equals]=published&sort=sortOrder
GET /api/services?where[slug][equals]=poolside-reset&where[status][equals]=published
GET /api/facilities?where[status][equals]=published&sort=sortOrder
GET /api/gallery?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder
GET /api/blog?where[status][equals]=published&sort=sortOrder
GET /api/blog?where[slug][equals]=art-of-stillness&where[status][equals]=published
GET /api/testimonials?where[status][equals]=published&sort=sortOrder
GET /api/faqs?where[status][equals]=published&sort=sortOrder
```

## Global Endpoints

```text
GET /api/globals/site-settings
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/home-page
GET /api/globals/about-page
GET /api/globals/contact-page
GET /api/globals/reservation-page
GET /api/globals/legal-pages
```

## Frontend Route Mapping

```text
/                         -> site-settings, header, footer, home-page, rooms, services, blog, testimonials, faqs
/about-us                 -> about-page, site-settings, header, footer
/villa                    -> rooms
/villa/[slug]             -> rooms by slug
/services                 -> services
/services/[slug]          -> services by slug
/reservation              -> reservation-page, rooms
/blog                     -> blog
/blog/[slug]              -> blog by slug
/terms, /privacy, /cookies -> legal-pages
```

## Example Response Shape

```json
{
  "docs": [
    {
      "id": 1,
      "title": "Ocean View Villa",
      "slug": "ocean-view-villa",
      "status": "published"
    }
  ],
  "totalDocs": 1,
  "limit": 10,
  "page": 1
}
```

Use `depth=1` by default and increase only when the frontend needs related media or linked documents. Use `depth=2` for `home-page` when the frontend needs nested featured room, service, or article relation data with media.
