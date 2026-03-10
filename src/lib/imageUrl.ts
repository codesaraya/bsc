/**
 * Image URL utilities for BSC Payload CMS.
 *
 * Images live in Supabase Storage bucket `bsc_slike`.
 * Some folder names contain Bosnian special characters (ž, š, č, ć, đ)
 * which were transliterated on upload.  The helpers here reproduce
 * the same transliteration so local `/public` paths resolve correctly
 * to Supabase Storage public URLs.
 */

const SUPABASE_STORAGE_BASE =
  'https://bsc.deployer3000.halvooo.com/storage/v1/object/public/bsc_slike';

/** Transliterate Bosnian / Croatian special characters to ASCII. */
export function transliterate(str: string): string {
  return str
    .replace(/[žŽ]/g, (ch) => (ch === 'ž' ? 'z' : 'z'))
    .replace(/[šŠ]/g, (ch) => (ch === 'š' ? 's' : 's'))
    .replace(/[čČ]/g, (ch) => (ch === 'č' ? 'c' : 'c'))
    .replace(/[ćĆ]/g, (ch) => (ch === 'ć' ? 'c' : 'c'))
    .replace(/[đĐ]/g, () => 'dj');
}

/**
 * Convert a local image path (e.g. `/Materials/Forex/forex.jpg`) to
 * its Supabase Storage public URL, applying transliteration for
 * Bosnian special characters in folder/file names.
 */
export function toSupabaseUrl(localPath: string): string {
  if (!localPath) return '';
  if (localPath.startsWith('http')) return localPath; // already absolute

  // Decode any URL-encoded characters first
  const decoded = decodeURIComponent(
    localPath.startsWith('/') ? localPath.slice(1) : localPath,
  );

  // Transliterate special characters
  const transliterated = transliterate(decoded);

  // Re-encode each path segment
  const encoded = transliterated
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${SUPABASE_STORAGE_BASE}/${encoded}`;
}

/**
 * Resolve the best available image URL from a Payload Media object.
 *
 * Priority:
 *  1. Payload Media externalUrl → converted to Supabase Storage URL (seed data)
 *  2. Payload Media upload → its `.url` property (real uploaded file)
 *  3. Empty string (no image available)
 */
export function getImageUrl(
  mediaObj?: { url?: string; externalUrl?: string } | number | null,
  /** @deprecated — kept for backward compatibility, will be removed */
  fallbackPath?: string,
): string {
  // Payload Media object (depth ≥ 1)
  if (mediaObj && typeof mediaObj === 'object') {
    if ('externalUrl' in mediaObj && mediaObj.externalUrl) {
      return toSupabaseUrl(mediaObj.externalUrl);
    }
    if ('url' in mediaObj && mediaObj.url) {
      return mediaObj.url;
    }
  }

  // Legacy fallback: text path → Supabase URL
  if (fallbackPath) {
    return toSupabaseUrl(fallbackPath);
  }

  return '';
}
