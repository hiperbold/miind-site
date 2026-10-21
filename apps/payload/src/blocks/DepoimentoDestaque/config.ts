import type { Block } from 'payload'

import { campoAncora } from '@/fields/plataforma'

export const DepoimentoDestaque: Block = {
  slug: 'depoimentoDestaque',
  interfaceName: 'BlocoDepoimentoDestaque',
  // nome curto no banco (limite de 63 caracteres do Postgres), por global
  dbName: ({ tableName }) => `${String(tableName).replace(/^_|_v$/g, '')}_blocks_depoimento`,
  labels: { singular: 'Depoimento em destaque', plural: 'Depoimentos em destaque' },
  fields: [
    campoAncora,
    {
      name: 'texto',
      label: 'Depoimento',
      type: 'textarea',
      required: true,
      admin: { description: 'Sem aspas. Use *texto* para o trecho em degradê.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'iniciais', label: 'Iniciais', type: 'text', admin: { width: '20%' } },
        { name: 'autor', label: 'Autor', type: 'text', admin: { width: '40%' } },
        { name: 'cargo', label: 'Cargo e empresa', type: 'text', admin: { width: '40%' } },
      ],
    },
  ],
}
