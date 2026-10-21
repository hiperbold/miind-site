import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'

export const FaixaNumeros: Block = {
  slug: 'faixaNumeros',
  interfaceName: 'BlocoFaixaNumeros',
  labels: { singular: 'Faixa de números', plural: 'Faixas de números' },
  fields: [
    {
      name: 'itens',
      label: 'Números',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%' } }),
            {
              name: 'tom',
              label: 'Cor',
              type: 'select',
              defaultValue: 'cyan',
              options: [
                { label: 'Ciano', value: 'cyan' },
                { label: 'Menta', value: 'mint' },
                { label: 'Violeta', value: 'violet' },
              ],
              admin: { width: '20%' },
            },
            { name: 'valor', label: 'Valor', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'rotulo', label: 'Rótulo', type: 'text', required: true },
      ],
    },
  ],
}
