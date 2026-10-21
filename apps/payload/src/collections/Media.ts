import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

import { revalidarPaginas } from '../lib/revalidar'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    // Imagem trocada ou apagada pode estar no og:image de qualquer LP.
    afterChange: [({ context }) => revalidarPaginas({ context })],
    afterDelete: [({ context }) => revalidarPaginas({ context })],
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
