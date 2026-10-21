import type { Block } from 'payload'

import { campoAncora, DESCRICAO_MARCACAO } from '@/fields/plataforma'

export const Metricas: Block = {
  slug: 'metricas',
  interfaceName: 'BlocoMetricas',
  labels: { singular: 'Números em destaque', plural: 'Números em destaque' },
  fields: [
    campoAncora,
    {
      type: 'row',
      fields: [
        { name: 'marcador', label: 'Marcador antes da etiqueta', type: 'text', admin: { width: '30%' } },
        { name: 'etiqueta', label: 'Etiqueta', type: 'text', admin: { width: '70%' } },
      ],
    },
    { name: 'titulo', label: 'Título', type: 'text', admin: { description: DESCRICAO_MARCACAO } },
    {
      name: 'principal',
      label: 'Número principal',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'valor', label: 'Valor', type: 'text', admin: { width: '30%' } },
            { name: 'rotulo', label: 'Rótulo', type: 'text', admin: { width: '70%' } },
          ],
        },
      ],
    },
    {
      name: 'secundarios',
      label: 'Números secundários',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'valor', label: 'Valor', type: 'text', required: true, admin: { width: '30%' } },
            { name: 'rotulo', label: 'Rótulo', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
      ],
    },
  ],
}
