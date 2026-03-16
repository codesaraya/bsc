import fs from 'fs'
import path from 'path'

const BASE_URL = 'http://localhost:3000'
const IMAGE_ROOT = 'public/slike za stranicu'

// Mapping: folder name → { collection, slug }
// Each folder maps to the most appropriate product or material item
const FOLDER_MAPPING = {
  'baner mes': [
    { collection: 'product-items', slug: 'mesh' },
    { collection: 'product-items', slug: 'banneri' },
  ],
  'bilbordi': [
    { collection: 'product-items', slug: 'billboard' },
  ],
  'brendiranje marketa, trafika itd': [
    { collection: 'product-items', slug: 'poslovnih-stambenih-prostora' },
  ],
  'Brendireanje vozila': [
    { collection: 'product-items', slug: 'vozila' },
  ],
  'pločasti materijal': [
    { collection: 'material-items', slug: 'forex' },
    { collection: 'material-items', slug: 'alu-bond' },
    { collection: 'material-items', slug: 'kapaline' },
  ],
  'portali': [
    { collection: 'product-items', slug: 'wallscape' },
  ],
  'pos': [
    { collection: 'product-items', slug: 'standovi' },
    { collection: 'product-items', slug: 'plex' },
  ],
  'svjetleće reklame': [
    { collection: 'product-items', slug: 'svijetlece-reklame' },
  ],
  'tapete': [
    { collection: 'material-items', slug: 'tapete' },
  ],
  'teksitl': [
    { collection: 'material-items', slug: 'banner-textilni-banner-flag' },
  ],
}

async function login() {
  const resp = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@bsc.ba', password: 'admin123' }),
  })
  const data = await resp.json()
  return data.token
}

async function uploadMedia(token, filePath, altText) {
  const fileBuffer = fs.readFileSync(filePath)
  const fileName = path.basename(filePath)

  const formData = new FormData()
  formData.append('file', new Blob([fileBuffer], { type: 'image/jpeg' }), fileName)
  formData.append('_payload', JSON.stringify({ alt: altText }))

  const resp = await fetch(`${BASE_URL}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: formData,
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Failed to upload ${fileName}: ${resp.status} ${text}`)
  }

  const data = await resp.json()
  return data.doc.id
}

async function getItemBySlug(token, collection, slug) {
  const resp = await fetch(
    `${BASE_URL}/api/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&depth=0`,
    { headers: { Authorization: `JWT ${token}` } }
  )
  const data = await resp.json()
  if (!data.docs || data.docs.length === 0) {
    throw new Error(`Item not found: ${collection} slug=${slug}`)
  }
  return data.docs[0]
}

async function updateGalleryImages(token, collection, itemId, mediaIds) {
  const galleryImages = mediaIds.map((id) => ({ uploadedImage: id }))

  const resp = await fetch(`${BASE_URL}/api/${collection}/${itemId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ galleryImages }),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Failed to update ${collection}/${itemId}: ${resp.status} ${text}`)
  }

  return await resp.json()
}

async function main() {
  console.log('Logging in...')
  const token = await login()
  console.log('Authenticated successfully.\n')

  const folders = Object.keys(FOLDER_MAPPING)

  for (const folder of folders) {
    const folderPath = path.join(IMAGE_ROOT, folder)
    const targets = FOLDER_MAPPING[folder]

    if (!fs.existsSync(folderPath)) {
      console.log(`⚠ Folder not found: ${folderPath}`)
      continue
    }

    const files = fs.readdirSync(folderPath).filter((f) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
    )

    if (files.length === 0) {
      console.log(`⚠ No images in: ${folder}`)
      continue
    }

    console.log(`\n📁 ${folder} (${files.length} images)`)
    console.log(`   → Targets: ${targets.map((t) => `${t.collection}/${t.slug}`).join(', ')}`)

    // Upload all images from this folder
    const mediaIds = []
    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const altText = `${folder} - ${path.parse(file).name}`
      try {
        console.log(`   Uploading: ${file}...`)
        const mediaId = await uploadMedia(token, filePath, altText)
        mediaIds.push(mediaId)
        console.log(`   ✓ Uploaded → media ID: ${mediaId}`)
      } catch (err) {
        console.error(`   ✗ Error uploading ${file}: ${err.message}`)
      }
    }

    if (mediaIds.length === 0) {
      console.log(`   ⚠ No images uploaded for ${folder}`)
      continue
    }

    // Assign uploaded images to each target item's galleryImages
    for (const target of targets) {
      try {
        const item = await getItemBySlug(token, target.collection, target.slug)
        console.log(`   Assigning ${mediaIds.length} images to ${target.collection}/${target.slug} (ID: ${item.id})...`)

        // Merge with existing gallery images
        const existingGallery = (item.galleryImages || [])
          .map((gi) => (typeof gi.uploadedImage === 'object' ? gi.uploadedImage.id : gi.uploadedImage))
          .filter(Boolean)

        const allMediaIds = [...existingGallery, ...mediaIds]

        await updateGalleryImages(token, target.collection, item.id, allMediaIds)
        console.log(`   ✓ Updated ${target.slug} with ${allMediaIds.length} total gallery images`)
      } catch (err) {
        console.error(`   ✗ Error updating ${target.slug}: ${err.message}`)
      }
    }
  }

  console.log('\n✅ Done!')
}

main().catch(console.error)
