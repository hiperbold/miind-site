import type { Block } from 'payload'

import { camposSecao } from '@/fields/comuns'

export const TextoLista: Block = {
  slug: 'textoLista',
  interfaceName: 'BlocoTextoLista',
  labels: { singular: 'Texto e lista', plural: 'Textos e listas' },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text' },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    {
      name: 'lista',
      label: 'Lista (opcional)',
      type: 'array',
      fields: [{ name: 'item', label: 'Item', type: 'text', required: true }],
    },
    { name: 'nota', label: 'Nota (texto menor no fim)', type: 'textarea' },
    camposSecao(),
  ],
}
