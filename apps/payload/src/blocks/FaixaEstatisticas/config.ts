import type { Block } from 'payload'

export const FaixaEstatisticas: Block = {
  slug: 'faixaEstatisticas',
  interfaceName: 'BlocoFaixaEstatisticas',
  // nome curto no banco (limite de 63 caracteres do Postgres), por global
  dbName: ({ tableName }) => `${String(tableName).replace(/^_|_v$/g, '')}_blocks_faixa_estat`,
  labels: { singular: 'Faixa de números (programa)', plural: 'Faixas de números (programa)' },
  fields: [
    {
      name: 'itens',
      label: 'Números',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'valor', label: 'Valor', type: 'text', required: true },
            { name: 'rotulo', label: 'Rótulo', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
