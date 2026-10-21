import type { Block } from 'payload'

import { campoAncora, campoCabecalhoPlataforma } from '@/fields/plataforma'

export const CasosUso: Block = {
  slug: 'casosUso',
  interfaceName: 'BlocoCasosUso',
  labels: { singular: 'Casos de uso em abas', plural: 'Casos de uso em abas' },
  fields: [
    campoAncora,
    campoCabecalhoPlataforma,
    {
      name: 'abas',
      label: 'Abas',
      type: 'array',
      fields: [
        { name: 'nome', label: 'Nome da aba', type: 'text', required: true },
        { name: 'itens', label: 'Itens', type: 'text', hasMany: true },
      ],
    },
  ],
}
