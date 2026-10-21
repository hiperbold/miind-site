import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'
import { campoAncora, campoCabecalhoPlataforma } from '@/fields/plataforma'

export const Camadas: Block = {
  slug: 'camadas',
  interfaceName: 'BlocoCamadas',
  labels: { singular: 'Camadas empilhadas', plural: 'Camadas empilhadas' },
  fields: [
    campoAncora,
    campoCabecalhoPlataforma,
    { name: 'rotuloCamada', label: 'Rótulo do número', type: 'text', defaultValue: 'Camada' },
    {
      name: 'camadas',
      label: 'Camadas',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%' } }),
            { name: 'titulo', label: 'Título', type: 'text', required: true, admin: { width: '40%' } },
            {
              name: 'cor',
              label: 'Cor do brilho',
              type: 'select',
              defaultValue: 'ciano',
              options: [
                { label: 'Ciano', value: 'ciano' },
                { label: 'Azul', value: 'azul' },
                { label: 'Violeta', value: 'violeta' },
                { label: 'Menta', value: 'menta' },
              ],
              admin: { width: '30%' },
            },
          ],
        },
        { name: 'itens', label: 'Itens', type: 'text', hasMany: true },
      ],
    },
  ],
}
