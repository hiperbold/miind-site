import type { Block } from 'payload'

import { campoAncora, campoBotao, campoFormularioHub } from '@/fields/plataforma'

export const ChamadaFinalCadastro: Block = {
  slug: 'chamadaFinalCadastro',
  interfaceName: 'BlocoChamadaFinalCadastro',
  // nome curto no banco (limite de 63 caracteres do Postgres), por global
  dbName: ({ tableName }) => `${String(tableName).replace(/^_|_v$/g, '')}_blocks_chamada_final`,
  labels: { singular: 'Chamada final com cadastro (programa)', plural: 'Chamadas finais com cadastro (programa)' },
  fields: [
    campoAncora,
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título', type: 'text', required: true },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    { name: 'vantagens', label: 'Vantagens (com ✓)', type: 'text', hasMany: true },
    campoBotao('linkCelular', 'Link para o cadastro (só no celular)', '#cadastro'),
    campoFormularioHub('hub-bottom', 'cadastro-final'),
  ],
}
