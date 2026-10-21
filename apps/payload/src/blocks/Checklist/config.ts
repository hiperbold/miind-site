import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'

export const Checklist: Block = {
  slug: 'checklist',
  interfaceName: 'BlocoChecklist',
  labels: { singular: 'Texto com checklist', plural: 'Textos com checklist' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título', type: 'text' },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    {
      name: 'cartao',
      label: 'Cartão com a lista',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%' } }),
            { name: 'titulo', label: 'Título do cartão', type: 'text', admin: { width: '70%' } },
          ],
        },
        {
          name: 'itens',
          label: 'Itens',
          type: 'array',
          fields: [{ name: 'texto', label: 'Texto', type: 'text', required: true }],
        },
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
