import type { Block } from 'payload'

export const FaixaNomes: Block = {
  slug: 'faixaNomes',
  interfaceName: 'BlocoFaixaNomes',
  labels: { singular: 'Faixa de nomes', plural: 'Faixas de nomes' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'nomes', label: 'Nomes', type: 'text', hasMany: true },
  ],
}
