import type { Block } from 'payload'

import { camposSecao } from '@/fields/comuns'

export const Argumento: Block = {
  slug: 'argumento',
  interfaceName: 'BlocoArgumento',
  labels: { singular: 'Argumento (citação)', plural: 'Argumentos (citação)' },
  fields: [
    { name: 'texto', label: 'Texto', type: 'textarea', required: true },
    { name: 'assinatura', label: 'Assinatura', type: 'text' },
    camposSecao(),
  ],
}
