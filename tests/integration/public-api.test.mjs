import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

const cmsBaseUrl = (process.env.CMS_TEST_URL || 'http://localhost:3000').replace(/\/$/, '')

const publicCollections = [
  'rooms',
  'services',
  'facilities',
  'gallery',
  'promotions',
  'blog',
  'testimonials',
  'faqs',
]

const publicGlobals = [
  'site-settings',
  'header',
  'footer',
  'home-page',
  'rooms-page',
  'services-page',
  'reservation-page',
  'blog-page',
  'legal-pages',
]

const urlFor = (path) => `${cmsBaseUrl}${path.startsWith('/') ? path : `/${path}`}`

const getJson = async (path) => {
  const response = await fetch(urlFor(path))
  const body = await response.text()

  let data = null
  if (body) {
    try {
      data = JSON.parse(body)
    } catch {
      data = body
    }
  }

  return {
    body: data,
    response,
  }
}

const assertCmsReachable = async () => {
  const { response } = await getJson('/api/globals/site-settings')
  assert.equal(
    response.status,
    200,
    `CMS test server must be reachable at ${cmsBaseUrl}. Start it with "corepack pnpm run dev".`,
  )
}

describe('public Payload REST API hardening', () => {
  it('allows public reads for published collection content only', async () => {
    await assertCmsReachable()

    for (const collection of publicCollections) {
      const { body, response } = await getJson(
        `/api/${collection}?where[status][equals]=published&limit=100&depth=0`,
      )

      assert.equal(response.status, 200, `${collection} published query should be public`)
      assert.ok(Array.isArray(body.docs), `${collection} response should include docs[]`)

      for (const doc of body.docs) {
        assert.equal(doc.status, 'published', `${collection} public doc ${doc.id ?? doc.slug ?? ''} must be published`)
      }
    }
  })

  it('does not leak draft collection content through public reads', async () => {
    await assertCmsReachable()

    for (const collection of publicCollections) {
      const { body, response } = await getJson(`/api/${collection}?where[status][equals]=draft&limit=100&depth=0`)

      assert.equal(response.status, 200, `${collection} draft query should not error`)
      assert.ok(Array.isArray(body.docs), `${collection} draft response should include docs[]`)
      assert.equal(body.docs.length, 0, `${collection} draft query should return no public docs`)
    }
  })

  it('keeps users collection forbidden for public requests', async () => {
    await assertCmsReachable()

    const response = await fetch(urlFor('/api/users'))

    assert.equal(response.status, 403, '/api/users should be forbidden for public requests')
  })

  it('allows public reads for required globals', async () => {
    await assertCmsReachable()

    for (const global of publicGlobals) {
      const { response } = await getJson(`/api/globals/${global}`)

      assert.equal(response.status, 200, `global ${global} should be public`)
    }
  })
})

describe('public Payload media file route', () => {
  it('serves a published media file URL', async (t) => {
    await assertCmsReachable()

    const { body, response } = await getJson('/api/media?where[status][equals]=published&limit=10&depth=0')

    assert.equal(response.status, 200, 'media published query should be public')
    assert.ok(Array.isArray(body.docs), 'media response should include docs[]')

    const media = body.docs.find((doc) => typeof doc.filename === 'string' && /\.(jpe?g|png|webp)$/i.test(doc.filename))

    if (!media) {
      t.skip('No published local media document with a supported image filename was available.')
      return
    }

    const mediaResponse = await fetch(urlFor(`/api/media/file/${encodeURIComponent(media.filename)}`), {
      method: 'HEAD',
    })

    assert.equal(mediaResponse.status, 200, `media file ${media.filename} should be served`)
    assert.match(mediaResponse.headers.get('content-type') ?? '', /^image\/(jpeg|png|webp)/)
  })

  it('rejects unsupported media file extensions', async () => {
    await assertCmsReachable()

    const response = await fetch(urlFor('/api/media/file/not-an-image.txt'), {
      method: 'HEAD',
    })

    assert.equal(response.status, 404, 'unsupported media extension should not be served')
  })

  it('rejects encoded path traversal attempts', async () => {
    await assertCmsReachable()

    const response = await fetch(urlFor('/api/media/file/..%2Fpackage.json'), {
      method: 'HEAD',
    })

    assert.equal(response.status, 404, 'path traversal attempt should not be served')
  })
})
