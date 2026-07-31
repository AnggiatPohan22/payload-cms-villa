# Frontend Integration

Use the public REST API from the separate Next.js frontend. The frontend should not store admin credentials or `PAYLOAD_SECRET`.

```ts
const response = await fetch(
  `${process.env.NEXT_PUBLIC_CMS_URL}/api/rooms?where[status][equals]=published&sort=sortOrder`,
  {
    next: {
      revalidate: 60,
    },
  },
)

if (!response.ok) {
  throw new Error('Failed to fetch rooms')
}

const data = await response.json()
```

Recommended frontend environment variable:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3000
```

Use low `depth` values and request only the endpoints needed by each page.
