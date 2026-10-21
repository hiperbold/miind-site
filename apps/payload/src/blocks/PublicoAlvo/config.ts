import type { Block } from 'payload'

import { campoAncora, campoCabecalhoPlataforma } from '@/fields/plataforma'

export const PublicoAlvo: Block = {
  slug: 'publicoAlvo',
  interfaceName: 'BlocoPublicoAlvo',
  labels: { singular: 'Público (etiquetas)', plural: 'Público (etiquetas)' },
  fields: [
    campoAncora,
    campoCabecalhoPlataforma,
    { name: 'itens', label: 'Etiquetas', type: 'text', hasMany: true },
    {
      name: 'faixa',
      label: 'Faixa de confiança (opcional)',
      type: 'group',
      fields: [
        { name: 'titulo', label: 'Título', type: 'text' },
        { name: 'itens', label: 'Itens', type: 'text', hasMany: true },
      ],
    },
  ],
}
