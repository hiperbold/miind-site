import type { Block, Field } from 'payload'

import { camposCabecalho, camposSecao } from '@/fields/comuns'

const lado = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'titulo', label: 'Frase', type: 'textarea' },
    {
      name: 'itens',
      label: 'Itens',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'rotulo', label: 'Rótulo', type: 'text', required: true, admin: { width: '70%' } },
            { name: 'valor', label: 'Número (opcional)', type: 'text', admin: { width: '30%' } },
          ],
        },
      ],
    },
  ],
})

export const AntesDepois: Block = {
  slug: 'antesDepois',
  interfaceName: 'BlocoAntesDepois',
  labels: { singular: 'Antes e depois', plural: 'Antes e depois' },
  fields: [
    ...camposCabecalho,
    lado('antes', 'Antes'),
    lado('depois', 'Depois'),
    { name: 'delta', label: 'Destaque do resultado (opcional)', type: 'text' },
    { name: 'citacao', label: 'Citação (opcional)', type: 'textarea' },
    { name: 'autor', label: 'Autor da citação (opcional)', type: 'text' },
    camposSecao({ destaque: true }),
  ],
}
