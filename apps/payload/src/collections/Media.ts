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
    // só imagens raster; SVG fica de fora (pode carregar script)
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'],
    // MEDIA_DIR (caminho absoluto) na imagem Docker: /app/media, montado como
    // volume. Sem a variável: pasta local ignorada pelo git (apps/payload/media).
    staticDir: process.env.MEDIA_DIR?.trim() || path.resolve(dirname, '../../media'),
  },
}
