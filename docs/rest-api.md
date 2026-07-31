# REST API

Payload serves REST endpoints under `/api`.

## Collection Endpoints

```text
GET /api/rooms?where[status][equals]=published&sort=sortOrder
GET /api/rooms?where[slug][equals]=ocean-view-villa&where[status][equals]=published
GET /api/facilities?where[status][equals]=published&sort=sortOrder
GET /api/gallery?where[status][equals]=published&sort=sortOrder
GET /api/promotions?where[status][equals]=published&sort=sortOrder
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

Use `depth=1` by default and increase only when the frontend needs related media or linked documents.
