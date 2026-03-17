// @ts-nocheck
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Config, UploadCollectionSlug } from 'payload'
import path from 'path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!
const BUCKET = 'bsc_slike'

function getPublicUrl(filePath: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`
}

const getGenerateURL = () => {
  return ({ filename, prefix = '' }: { filename: string; prefix?: string }) => {
    const key = path.posix.join(prefix, filename)
    return getPublicUrl(key)
  }
}

const getHandleUpload = () => {
  return async ({ data, file, req }: any) => {
    const prefix = data.prefix || ''
    const key = path.posix.join(prefix, file.filename)
    const body = file.buffer

    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${key}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': file.mimeType,
        'x-upsert': 'true',
      },
      body,
    })

    if (!res.ok) {
      const errText = await res.text()
      req.payload.logger.error(`Supabase upload failed: ${res.status} ${errText}`)
      throw new Error(`Supabase upload failed: ${res.status}`)
    }

    return data
  }
}

const getHandleDelete = () => {
  return async ({ doc, filename, req }: any) => {
    const prefix = doc.prefix || ''
    const key = path.posix.join(prefix, filename)

    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prefixes: [key] }),
    })

    if (!res.ok) {
      const errText = await res.text()
      req.payload.logger.error(`Supabase delete failed: ${res.status} ${errText}`)
    }
  }
}

const getStaticHandler = () => {
  return async (req: any, { params: { filename } }: any) => {
    const publicUrl = getPublicUrl(filename)
    return Response.redirect(publicUrl, 302)
  }
}

const supabaseAdapter = ({ collection, prefix }: any) => {
  return {
    name: 'supabase',
    generateURL: getGenerateURL(),
    handleUpload: getHandleUpload(),
    handleDelete: getHandleDelete(),
    staticHandler: getStaticHandler(),
  }
}

interface SupabaseStorageOptions {
  collections: Partial<Record<UploadCollectionSlug, { prefix?: string } | true>>
  enabled?: boolean
}

export const supabaseStorage = (options: SupabaseStorageOptions) => (incomingConfig: Config): Config => {
  if (options.enabled === false) return incomingConfig

  const collectionsWithAdapter = Object.entries(options.collections).reduce(
    (acc, [slug, collOptions]) => ({
      ...acc,
      [slug]: {
        ...(collOptions === true ? {} : collOptions),
        disablePayloadAccessControl: true,
        adapter: supabaseAdapter,
      },
    }),
    {},
  )

  // Set disableLocalStorage on matching collections
  const config: Config = {
    ...incomingConfig,
    collections: (incomingConfig.collections || []).map((collection) => {
      if (!(collection.slug in (options.collections as Record<string, unknown>))) {
        return collection
      }
      return {
        ...collection,
        upload: {
          ...(typeof collection.upload === 'object' ? collection.upload : {}),
          disableLocalStorage: true,
        },
      }
    }),
  }

  return cloudStoragePlugin({
    collections: collectionsWithAdapter as any,
  })(config)
}
