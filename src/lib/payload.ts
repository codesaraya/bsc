import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

let cached: Payload | null = null
let lastError: number = 0
const ERROR_COOLDOWN = 30_000 // Don't retry for 30s after a failure

export const getPayloadClient = async (): Promise<Payload> => {
  // If we recently failed, throw immediately to avoid slow timeouts
  if (lastError && Date.now() - lastError < ERROR_COOLDOWN) {
    throw new Error('Database connection recently failed, using fallback data')
  }

  if (cached) return cached

  try {
    cached = await getPayload({ config })
    return cached
  } catch (err) {
    lastError = Date.now()
    throw err
  }
}
