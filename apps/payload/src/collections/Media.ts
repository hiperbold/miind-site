import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Pasta local ignorada pelo git (apps/payload/media).
    staticDir: path.resolve(dirname, '../../media'),
  },
}
