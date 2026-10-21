import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'
import { campoAncora, campoCabecalhoHub } from '@/fields/plataforma'

export const PassosHub: Block = {
  slug: 'passosHub',
  interfaceName: 'BlocoPassosHub',
  labels: { singular: 'Passos com setas', plural: 'Passos com setas' },
  fields: [
    campoAncora,
    campoCabecalhoHub,
    { name: 'rotuloPasso', label: 'Rótulo do número', type: 'text', defaultValue: 'Passo' },
    {
      name: 'passos',
      label: 'Passos',
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
  ],
}
