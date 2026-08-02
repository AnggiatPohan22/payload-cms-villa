import assert from 'node:assert/strict'
import { existsSync, readFileSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, describe, it } from 'node:test'

const cmsBaseUrl = (process.env.CMS_TEST_URL || 'http://localhost:3000').replace(/\/$/, '')
const credentialsPath = join(tmpdir(), 'payload-cms-villa-phase7-hardening-test.json')
const png1x1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
  'base64',
)

const createdMediaIds = []
const createdPromotionIds = []

let superAdmin = null

const loadDotEnv = () => {
  if (!existsSync('.env')) return

  const lines = readFileSync('.env', 'utf8').split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()

    if (!key || process.env[key]) continue

    process.env[key] = rawValue.replace(/^['"]|['"]$/g, '')
  }
}

loadDotEnv()

const urlFor = (path) => `${cmsBaseUrl}${path.startsWith('/') ? path : `/${path}`}`

const requestJson = async (path, { method = 'GET', token, body, headers = {} } = {}) => {
  const response = await fetch(urlFor(path), {
    method,
    headers: {
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  return { body: data, response }
}

const getSuperAdminCredentials = () => {
  if (existsSync(credentialsPath)) {
    return JSON.parse(readFileSync(credentialsPath, 'utf8'))
  }

  return {
    email: process.env.CMS_SUPER_ADMIN_EMAIL || process.env.SEED_SUPER_ADMIN_EMAIL,
    password: process.env.CMS_SUPER_ADMIN_PASSWORD || process.env.SEED_SUPER_ADMIN_PASSWORD,
  }
}

const assertCmsReachable = async () => {
  const { response } = await requestJson('/api/globals/site-settings')

  assert.equal(
    response.status,
    200,
    `CMS test server must be reachable at ${cmsBaseUrl}. Start it with "corepack pnpm run dev".`,
  )
}

const login = async (email, password) => {
  const { body, response } = await requestJson('/api/users/login', {
    method: 'POST',
    body: { email, password },
  })

  assert.equal(response.status, 200, `login should work for ${email}`)
  assert.equal(typeof body.token, 'string', `login response for ${email} should include token`)
  assert.ok(body.user?.id, `login response for ${email} should include user id`)

  return {
    id: body.user.id,
    role: body.user.role,
    token: body.token,
  }
}

const uploadMedia = async ({ filename, buffer, mimeType, expectedStatus }) => {
  const formData = new FormData()

  formData.append(
    'file',
    new File([buffer], filename, {
      type: mimeType,
    }),
  )
  formData.append(
    '_payload',
    JSON.stringify({
      alt: `Phase 7 upload fixture ${filename}`,
      category: 'promotion',
      status: 'published',
    }),
  )

  const response = await fetch(urlFor('/api/media'), {
    method: 'POST',
    headers: {
      Authorization: `JWT ${superAdmin.token}`,
    },
    body: formData,
  })

  const text = await response.text()
  let body = null

  if (text) {
    try {
      body = JSON.parse(text)
    } catch {
      body = text
    }
  }

  if (expectedStatus) {
    assert.equal(response.status, expectedStatus, `${filename} upload should return ${expectedStatus}`)
  }

  return { body, response }
}

const createPublishedPromotion = async ({ slug, title, startDate, endDate, mediaId }) => {
  const { body, response } = await requestJson('/api/promotions', {
    method: 'POST',
    token: superAdmin.token,
    body: {
      title,
      slug,
      shortDescription: `Phase 7 promotion lifecycle fixture ${slug}.`,
      desktopImage: mediaId,
      startDate,
      endDate,
      featured: false,
      sortOrder: 9999,
      status: 'published',
    },
  })

  assert.equal(response.status, 201, `${slug} promotion should be created`)
  assert.ok(body.doc?.id, `${slug} response should include doc id`)

  createdPromotionIds.push(body.doc.id)

  return body.doc
}

before(async () => {
  await assertCmsReachable()

  const superAdminCredentials = getSuperAdminCredentials()

  assert.ok(
    superAdminCredentials.email && superAdminCredentials.password,
    'Phase 7 hardening tests require setup credentials or CMS_SUPER_ADMIN_EMAIL/CMS_SUPER_ADMIN_PASSWORD or SEED_SUPER_ADMIN_EMAIL/SEED_SUPER_ADMIN_PASSWORD in env or .env.',
  )

  superAdmin = await login(superAdminCredentials.email, superAdminCredentials.password)
  assert.equal(superAdmin.role, 'super-admin', 'configured hardening test user must be super-admin')
})

after(async () => {
  if (!superAdmin?.token) return

  for (const promotionId of [...createdPromotionIds].reverse()) {
    await requestJson(`/api/promotions/${promotionId}`, {
      method: 'DELETE',
      token: superAdmin.token,
    })
  }

  for (const mediaId of [...createdMediaIds].reverse()) {
    await requestJson(`/api/media/${mediaId}`, {
      method: 'DELETE',
      token: superAdmin.token,
    })
  }

  await requestJson(`/api/users/${superAdmin.id}`, {
    method: 'DELETE',
    token: superAdmin.token,
  })

  if (existsSync(credentialsPath)) {
    unlinkSync(credentialsPath)
  }
})

describe('Phase 7 promotion lifecycle behavior', () => {
  it('stores active and expired published promotions and exposes the current status-based public contract', async () => {
    const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`

    const uploaded = await uploadMedia({
      filename: `phase7-promotion-${suffix}.png`,
      buffer: png1x1,
      mimeType: 'image/png',
      expectedStatus: 201,
    })

    assert.ok(uploaded.body.doc?.id, 'valid promotion image upload should include doc id')
    createdMediaIds.push(uploaded.body.doc.id)

    const now = Date.now()
    const active = await createPublishedPromotion({
      slug: `phase7-active-${suffix}`,
      title: `Phase 7 Active Promotion ${suffix}`,
      startDate: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(now + 24 * 60 * 60 * 1000).toISOString(),
      mediaId: uploaded.body.doc.id,
    })
    const expired = await createPublishedPromotion({
      slug: `phase7-expired-${suffix}`,
      title: `Phase 7 Expired Promotion ${suffix}`,
      startDate: new Date(now - 72 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
      mediaId: uploaded.body.doc.id,
    })

    const { body, response } = await requestJson(
      `/api/promotions?where[slug][in][0]=${encodeURIComponent(active.slug)}&where[slug][in][1]=${encodeURIComponent(
        expired.slug,
      )}&where[status][equals]=published&limit=10&depth=0`,
    )

    assert.equal(response.status, 200, 'public promotion lifecycle query should return 200')
    assert.ok(Array.isArray(body.docs), 'promotion lifecycle response should include docs[]')

    const returnedSlugs = body.docs.map((doc) => doc.slug)

    assert.ok(returnedSlugs.includes(active.slug), 'active published promotion should be returned')
    assert.ok(
      returnedSlugs.includes(expired.slug),
      'expired published promotion is returned by the current status-based public contract',
    )
  })
})

describe('Phase 7 media upload validation', () => {
  it('accepts supported image uploads', async () => {
    const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const { body, response } = await uploadMedia({
      filename: `phase7-valid-${suffix}.png`,
      buffer: png1x1,
      mimeType: 'image/png',
      expectedStatus: 201,
    })

    assert.match(response.headers.get('content-type') ?? '', /application\/json/)
    assert.ok(body.doc?.id, 'valid upload response should include doc id')
    assert.equal(body.doc.mimeType, 'image/png', 'valid upload should preserve image MIME type')

    createdMediaIds.push(body.doc.id)
  })

  it('rejects unsupported upload MIME types', async () => {
    const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const { response } = await uploadMedia({
      filename: `phase7-invalid-${suffix}.txt`,
      buffer: Buffer.from('not an allowed CMS image upload', 'utf8'),
      mimeType: 'text/plain',
    })

    assert.ok([400, 415].includes(response.status), `unsupported MIME upload should be rejected, received ${response.status}`)
  })

  it('rejects image uploads larger than 5MB', async () => {
    const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const tooLarge = Buffer.alloc(5 * 1024 * 1024 + 1, 1)
    const { response } = await uploadMedia({
      filename: `phase7-too-large-${suffix}.png`,
      buffer: tooLarge,
      mimeType: 'image/png',
    })

    assert.ok([400, 413, 422].includes(response.status), `oversized image upload should be rejected, received ${response.status}`)
  })
})

describe('Phase 7 CORS hardening', () => {
  it('allows configured frontend origin', async () => {
    const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3001'

    const response = await fetch(urlFor('/api/globals/site-settings'), {
      method: 'OPTIONS',
      headers: {
        Origin: allowedOrigin,
        'Access-Control-Request-Method': 'GET',
      },
    })

    assert.ok([200, 204].includes(response.status), `allowed CORS preflight should succeed, received ${response.status}`)
    assert.equal(
      response.headers.get('access-control-allow-origin'),
      allowedOrigin,
      'allowed frontend origin should be reflected by CORS',
    )
  })

  it('does not allow an unconfigured origin', async () => {
    const blockedOrigin = 'https://not-allowed.example.test'

    const response = await fetch(urlFor('/api/globals/site-settings'), {
      method: 'OPTIONS',
      headers: {
        Origin: blockedOrigin,
        'Access-Control-Request-Method': 'GET',
      },
    })

    assert.notEqual(
      response.headers.get('access-control-allow-origin'),
      blockedOrigin,
      'unconfigured origin should not be reflected by CORS',
    )
  })
})
