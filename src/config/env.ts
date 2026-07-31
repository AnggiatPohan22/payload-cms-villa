const isProduction = process.env.NODE_ENV === 'production'
const skipEnvValidation = process.env.PAYLOAD_SKIP_ENV_VALIDATION === 'true'

export const requiredServerEnv = (name: string) => {
  const value = process.env[name]

  if (!value && isProduction && !skipEnvValidation) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value || ''
}

export const optionalServerURL = (name: string, fallback: string) => {
  const value = process.env[name] || fallback

  try {
    new URL(value)
    return value
  } catch {
    if (isProduction && !skipEnvValidation) {
      throw new Error(`Invalid URL in environment variable: ${name}`)
    }

    return fallback
  }
}
