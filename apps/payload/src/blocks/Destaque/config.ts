import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'

export const Destaque: Block = {
  slug: 'destaque',
  interfaceName: 'BlocoDestaque',
  labels: { singular: 'Destaque (quadro com itens)', plural: 'Destaques (quadro com itens)' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título', type: 'text' },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    {
      name: 'itens',
      label: 'Itens',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%' } }),
            { name: 'titulo', label: 'Título', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'texto', label: 'Texto', type: 'textarea' },
      ],
    },
    {
      name: 'ancora',
      label: 'Âncora',
      type: 'text',
      validate: (value: string | null | undefined) =>
        !value || /^[a-z0-9-]+$/.test(value) || 'Use só letras minúsculas, números e hífen.',
    },
  ],
}
