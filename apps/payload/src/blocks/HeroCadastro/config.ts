import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'
import { campoFormularioHub, DESCRICAO_MARCACAO } from '@/fields/plataforma'

export const HeroCadastro: Block = {
  slug: 'heroCadastro',
  interfaceName: 'BlocoHeroCadastro',
  // nome curto no banco (limite de 63 caracteres do Postgres), por global
  dbName: ({ tableName }) => `${String(tableName).replace(/^_|_v$/g, '')}_blocks_hero_cad`,
  labels: { singular: 'Topo com cadastro', plural: 'Topos com cadastro' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título (H1)', type: 'text', required: true, admin: { description: DESCRICAO_MARCACAO } },
    { name: 'texto', label: 'Texto de apoio', type: 'textarea' },
    {
      name: 'bullets',
      label: 'Lista',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            campoIcone({ admin: { width: '30%' } }),
            { name: 'texto', label: 'Texto', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
      ],
    },
    { name: 'selos', label: 'Selos', type: 'text', hasMany: true },
    {
      name: 'cartao',
      label: 'Cartão do formulário',
      type: 'group',
      fields: [
        { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
        { name: 'titulo', label: 'Título', type: 'text' },
        { name: 'texto', label: 'Texto', type: 'textarea' },
      ],
    },
    campoFormularioHub('hub-hero', 'cadastro'),
  ],
}
