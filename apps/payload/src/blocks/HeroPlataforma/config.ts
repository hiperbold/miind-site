import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'
import { campoBotao } from '@/fields/plataforma'

export const HeroPlataforma: Block = {
  slug: 'heroPlataforma',
  interfaceName: 'BlocoHeroPlataforma',
  // nome curto no banco (limite de 63 caracteres do Postgres), por global
  dbName: ({ tableName }) => `${String(tableName).replace(/^_|_v$/g, '')}_blocks_hero_plat`,
  labels: { singular: 'Topo da plataforma', plural: 'Topos da plataforma' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'tituloLinha1', label: 'Título (H1), primeira linha', type: 'text', required: true },
        { name: 'tituloLinha2', label: 'Título, segunda linha em degradê', type: 'text' },
      ],
    },
    { name: 'texto', label: 'Texto de apoio', type: 'textarea' },
    campoBotao('botaoPrincipal', 'Botão principal', '#contato'),
    {
      name: 'video',
      label: 'Botão de vídeo',
      type: 'group',
      fields: [
        { name: 'textoBotao', label: 'Texto do botão (vazio: sem botão)', type: 'text' },
        { name: 'tituloModal', label: 'Título do vídeo (leitor de tela)', type: 'text' },
        {
          name: 'url',
          label: 'Endereço do vídeo (MP4)',
          type: 'text',
          admin: { description: 'Vazio: a janela mostra o aviso abaixo.' },
        },
        { name: 'avisoSemVideo', label: 'Aviso quando não há vídeo', type: 'textarea' },
      ],
    },
    { name: 'selos', label: 'Selos', type: 'text', hasMany: true },
    {
      name: 'cartoes',
      label: 'Cartões flutuantes (desktop)',
      type: 'group',
      fields: [
        { name: 'desempenho', label: 'Cartão de desempenho', type: 'text' },
        {
          type: 'row',
          fields: [
            { name: 'economiaTitulo', label: 'Cartão de economia: título', type: 'text' },
            { name: 'economiaPeriodo', label: 'Período', type: 'text' },
            { name: 'economiaValor', label: 'Valor (R$, contador)', type: 'number' },
          ],
        },
        { name: 'economiaVariacao', label: 'Variação', type: 'text' },
      ],
    },
    {
      name: 'integracoes',
      label: 'Faixa de integrações',
      type: 'group',
      fields: [
        { name: 'titulo', label: 'Título', type: 'text' },
        {
          name: 'itens',
          label: 'Integrações',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                campoIcone({ admin: { width: '40%' } }),
                { name: 'nome', label: 'Nome', type: 'text', required: true, admin: { width: '60%' } },
              ],
            },
          ],
        },
      ],
    },
    { name: 'rotuloRolagem', label: 'Indicador de rolagem', type: 'text', defaultValue: 'Scroll' },
  ],
}
