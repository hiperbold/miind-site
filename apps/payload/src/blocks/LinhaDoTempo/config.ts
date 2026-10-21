import type { Block } from 'payload'

import { camposCabecalho, camposSecao } from '@/fields/comuns'

export const LinhaDoTempo: Block = {
  slug: 'linhaDoTempo',
  interfaceName: 'BlocoLinhaDoTempo',
  labels: { singular: 'Linha do tempo', plural: 'Linhas do tempo' },
  fields: [
    ...camposCabecalho,
    {
      name: 'passos',
      label: 'Passos',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'dia', label: 'Dia ou etapa', type: 'text', required: true, admin: { width: '30%' } },
            { name: 'titulo', label: 'Título', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'descricao', label: 'Descrição', type: 'textarea' },
      ],
    },
    camposSecao({ destaque: true }),
  ],
}
