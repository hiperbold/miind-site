import type { Block, Field } from 'payload'

import { camposCabecalho, camposSecao } from '@/fields/comuns'

const nota = (name: string, label: string): Field => ({
  name,
  label,
  type: 'number',
  min: 1,
  max: 10,
  required: true,
  admin: { width: '25%' },
})

export const NotasFacilidade: Block = {
  slug: 'notasFacilidade',
  interfaceName: 'BlocoNotasFacilidade',
  labels: { singular: 'Notas de facilidade', plural: 'Notas de facilidade' },
  fields: [
    ...camposCabecalho,
    {
      type: 'row',
      fields: [
        nota('achar', 'Achar clientes'),
        nota('explicar', 'Explicar'),
        nota('roi', 'Provar ROI'),
        nota('fechar', 'Fechar'),
      ],
    },
    camposSecao(),
  ],
}
