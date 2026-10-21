import type { Block } from 'payload'

import { campoIcone } from '@/fields/comuns'

const botao = (name: string, label: string, url: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'texto', label: 'Texto', type: 'text' as const },
        { name: 'url', label: 'Link', type: 'text' as const, defaultValue: url },
      ],
    },
  ],
})

export const HeroFluxo: Block = {
  slug: 'heroFluxo',
  interfaceName: 'BlocoHeroFluxo',
  labels: { singular: 'Topo com fluxo em etapas', plural: 'Topos com fluxo em etapas' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'titulo', label: 'Título (H1)', type: 'text', required: true },
        {
          name: 'tituloDestaque',
          label: 'Continuação do título em degradê (opcional)',
          type: 'text',
        },
      ],
    },
    { name: 'texto', label: 'Texto de apoio', type: 'textarea' },
    { name: 'textoSecundario', label: 'Segundo parágrafo (opcional)', type: 'textarea' },
    botao('botaoPrincipal', 'Botão principal', '#cadastro'),
    botao('botaoSecundario', 'Botão secundário', '#como-funciona'),
    { name: 'nota', label: 'Nota abaixo dos botões (opcional)', type: 'text' },
    {
      name: 'fluxo',
      label: 'Quadro de etapas',
      type: 'group',
      fields: [
        { name: 'etiqueta', label: 'Etiqueta do quadro', type: 'text' },
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
      ],
    },
  ],
}
