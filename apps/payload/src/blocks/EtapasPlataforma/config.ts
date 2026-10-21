import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'
import { campoAncora, campoCabecalhoPlataforma } from '@/fields/plataforma'

export const EtapasPlataforma: Block = {
  slug: 'etapasPlataforma',
  interfaceName: 'BlocoEtapasPlataforma',
  // nome curto no banco (limite de 63 caracteres do Postgres), por global
  dbName: ({ tableName }) => `${String(tableName).replace(/^_|_v$/g, '')}_blocks_etapas_plat`,
  labels: { singular: 'Etapas em linha do tempo', plural: 'Etapas em linha do tempo' },
  fields: [
    campoAncora,
    campoCabecalhoPlataforma,
    { name: 'rotuloEtapa', label: 'Rótulo do número', type: 'text', defaultValue: 'Etapa' },
    {
      name: 'etapas',
      label: 'Etapas',
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
    { name: 'fraseFinal', label: 'Frase final (opcional)', type: 'text' },
  ],
}
