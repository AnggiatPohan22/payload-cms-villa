import assert from 'node:assert/strict'
import { existsSync, readFileSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, describe, it } from 'node:test'

const cmsBaseUrl = (process.env.CMS_TEST_URL || 'http://localhost:3000').replace(/\/$/, '')

const createdFaqIds = []
const createdUserIds = []
const credentialsPath = join(tmpdir(), 'payload-cms-villa-phase7-role-test.json')

let superAdmin = null
let admin = null
let editor = null

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

const requestJson = async (path, { method = 'GET', token, body } = {}) => {
  const response = await fetch(urlFor(path), {
    method,
    headers: {
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
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
    email,
    id: body.user.id,
    role: body.user.role,
    token: body.token,
  }
}

const createUser = async (role) => {
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`
  const password = `Phase7-${role}-${suffix}!`
  const email = `phase7-${role}-${suffix}@example.test`

  const { body, response } = await requestJson('/api/users', {
    method: 'POST',
    token: superAdmin.token,
    body: {
      email,
      password,
      name: `Phase 7 ${role}`,
      role,
    },
  })

  assert.equal(response.status, 201, `super-admin should create ${role} user`)
  assert.ok(body.doc?.id, `created ${role} response should include doc id`)
  assert.equal(body.doc.role, role, `created ${role} should keep assigned role`)

  createdUserIds.push(body.doc.id)

  return login(email, password)
}

const createFaq = async (actor, label) => {
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`

  const { body, response } = await requestJson('/api/faqs', {
    method: 'POST',
    token: actor.token,
    body: {
      question: `Phase 7 role test ${label} ${suffix}?`,
      answer: `Isolated Phase 7 content fixture for ${label}.`,
      category: 'phase-7-test',
      status: 'draft',
      sortOrder: 9999,
    },
  })

  assert.equal(response.status, 201, `${actor.role} should create FAQ content`)
  assert.ok(body.doc?.id, `${actor.role} FAQ create response should include doc id`)

  createdFaqIds.push(body.doc.id)

  return body.doc
}

const updateFaq = async (actor, faqId) => {
  const { body, response } = await requestJson(`/api/faqs/${faqId}`, {
    method: 'PATCH',
    token: actor.token,
    body: {
      answer: `Updated by ${actor.role} during Phase 7 role test.`,
    },
  })

  assert.equal(response.status, 200, `${actor.role} should update FAQ content`)
  assert.equal(body.doc.id, faqId, `${actor.role} FAQ update should target the fixture`)
}

const deleteFaq = async (actor, faqId) => {
  const { response } = await requestJson(`/api/faqs/${faqId}`, {
    method: 'DELETE',
    token: actor.token,
  })

  assert.equal(response.status, 200, `${actor.role} should delete FAQ content`)

  const index = createdFaqIds.indexOf(faqId)
  if (index !== -1) createdFaqIds.splice(index, 1)
}

const assertForbidden = (response, message) => {
  assert.equal(response.status, 403, message)
}

const assertNotAllowed = (response, message) => {
  assert.ok([403, 404].includes(response.status), `${message}. Received ${response.status}.`)
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

before(async () => {
  await assertCmsReachable()

  const superAdminCredentials = getSuperAdminCredentials()

  assert.ok(
    superAdminCredentials.email && superAdminCredentials.password,
    'Authenticated role tests require setup credentials or CMS_SUPER_ADMIN_EMAIL/CMS_SUPER_ADMIN_PASSWORD or SEED_SUPER_ADMIN_EMAIL/SEED_SUPER_ADMIN_PASSWORD in env or .env.',
  )

  superAdmin = await login(superAdminCredentials.email, superAdminCredentials.password)
  assert.equal(superAdmin.role, 'super-admin', 'configured authenticated test user must be super-admin')

  admin = await createUser('admin')
  editor = await createUser('editor')
})

after(async () => {
  if (!superAdmin?.token) return

  for (const faqId of [...createdFaqIds].reverse()) {
    await requestJson(`/api/faqs/${faqId}`, {
      method: 'DELETE',
      token: superAdmin.token,
    })
  }

  for (const userId of [...createdUserIds].reverse()) {
    await requestJson(`/api/users/${userId}`, {
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

describe('authenticated Payload role access', () => {
  it('allows super-admin to manage users and content', async () => {
    const { body, response } = await requestJson('/api/users?limit=1', {
      token: superAdmin.token,
    })

    assert.equal(response.status, 200, 'super-admin should read users')
    assert.ok(Array.isArray(body.docs), 'super-admin users response should include docs[]')

    const faq = await createFaq(superAdmin, 'super-admin')
    await updateFaq(superAdmin, faq.id)
    await deleteFaq(superAdmin, faq.id)
  })

  it('allows admin to manage content but not change or delete a super-admin user', async () => {
    const faq = await createFaq(admin, 'admin')
    await updateFaq(admin, faq.id)
    await deleteFaq(admin, faq.id)

    const updateSuperAdmin = await requestJson(`/api/users/${superAdmin.id}`, {
      method: 'PATCH',
      token: admin.token,
      body: {
        name: 'Phase 7 blocked super-admin edit',
      },
    })

    assertNotAllowed(updateSuperAdmin.response, 'admin should not update super-admin user records')

    const deleteSuperAdmin = await requestJson(`/api/users/${superAdmin.id}`, {
      method: 'DELETE',
      token: admin.token,
    })

    assertNotAllowed(deleteSuperAdmin.response, 'admin should not delete super-admin user records')
  })

  it('keeps editor out of user management while allowing current content write policy', async () => {
    const readUsers = await requestJson('/api/users?limit=1', {
      token: editor.token,
    })

    assertForbidden(readUsers.response, 'editor should not read users collection')

    const createUserAttempt = await requestJson('/api/users', {
      method: 'POST',
      token: editor.token,
      body: {
        email: `phase7-editor-blocked-${Date.now()}@example.test`,
        password: 'Phase7-editor-blocked-password!',
        name: 'Blocked Editor User',
        role: 'editor',
      },
    })

    assertForbidden(createUserAttempt.response, 'editor should not create users')

    const faq = await createFaq(editor, 'editor')
    await updateFaq(editor, faq.id)

    const deleteAttempt = await requestJson(`/api/faqs/${faq.id}`, {
      method: 'DELETE',
      token: editor.token,
    })

    assertForbidden(deleteAttempt.response, 'editor should not delete FAQ content under current policy')
  })

  it('keeps unauthenticated create, update, and delete forbidden for protected content mutations', async () => {
    const faq = await createFaq(superAdmin, 'unauthenticated-protection')

    const createAttempt = await requestJson('/api/faqs', {
      method: 'POST',
      body: {
        question: 'Should public users create FAQ content?',
        answer: 'No.',
        status: 'draft',
      },
    })

    assertForbidden(createAttempt.response, 'public users should not create FAQ content')

    const updateAttempt = await requestJson(`/api/faqs/${faq.id}`, {
      method: 'PATCH',
      body: {
        answer: 'Public mutation should stay blocked.',
      },
    })

    assertForbidden(updateAttempt.response, 'public users should not update FAQ content')

    const deleteAttempt = await requestJson(`/api/faqs/${faq.id}`, {
      method: 'DELETE',
    })

    assertForbidden(deleteAttempt.response, 'public users should not delete FAQ content')
  })
})
