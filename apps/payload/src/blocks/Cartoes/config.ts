import type { Block } from 'payload'

import { campoIcone, camposSecao } from '@/fields/comuns'

export const Cartoes: Block = {
  slug: 'cartoes',
  interfaceName: 'BlocoCartoes',
  labels: { singular: 'Cartões (ícone ou número)', plural: 'Cartões (ícone ou número)' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    {
      name: 'titulo',
      label: 'Título',
      type: 'textarea',
      admin: { description: 'Enter quebra a linha.' },
    },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    {
      name: 'colunas',
      label: 'Colunas no desktop',
      type: 'select',
      defaultValue: '2',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    {
      name: 'cartoes',
      label: 'Cartões',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%', description: 'Ícone ou número; vazio = sem.' } }),
            { name: 'numero', label: 'Número (ex.: 01)', type: 'text', admin: { width: '20%' } },
            { name: 'titulo', label: 'Título', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'texto', label: 'Texto', type: 'textarea' },
      ],
    },
    camposSecao(),
  ],
}
