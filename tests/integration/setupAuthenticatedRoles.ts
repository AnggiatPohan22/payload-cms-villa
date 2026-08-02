import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'

const loadDotEnv = async () => {
  try {
    const lines = (await fs.readFile('.env', 'utf8')).split(/\r?\n/)

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
  } catch {
    return
  }
}

const credentialsPath = path.join(os.tmpdir(), 'payload-cms-villa-phase7-role-test.json')
const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`
const email = `phase7-super-admin-${suffix}@example.test`
const password = `Phase7-super-admin-${suffix}!`

const main = async () => {
  await loadDotEnv()

  const config = (await import('../../payload.config')).default
  const payload = await getPayload({ config })

  const user = await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      name: 'Phase 7 Test Super Admin',
      role: 'super-admin',
    },
    overrideAccess: true,
  })

  await fs.writeFile(
    credentialsPath,
    JSON.stringify(
      {
        email,
        password,
        userId: user.id,
      },
      null,
      2,
    ),
  )

  payload.logger.info('Phase 7 authenticated role test credentials prepared.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
