import type { Block } from 'payload'

import { campoIcone, camposCabecalho, camposSecao } from '@/fields/comuns'

export const CartoesSegmento: Block = {
  slug: 'cartoesSegmento',
  interfaceName: 'BlocoCartoesSegmento',
  labels: { singular: 'Cartões por segmento', plural: 'Cartões por segmento' },
  fields: [
    ...camposCabecalho,
    {
      name: 'cartoes',
      label: 'Cartões (sem link)',
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
    camposSecao({ destaque: true }),
  ],
}
