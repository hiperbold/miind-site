import type { Block } from 'payload'

import { campoAncora } from '@/fields/plataforma'

export const FaqSecao: Block = {
  slug: 'faqSecao',
  interfaceName: 'BlocoFaqSecao',
  labels: { singular: 'Perguntas frequentes (plataforma/programa)', plural: 'Perguntas frequentes (plataforma/programa)' },
  fields: [
    campoAncora,
    {
      name: 'variante',
      label: 'Desenho',
      type: 'select',
      required: true,
      defaultValue: 'plataforma',
      options: [
        { label: 'Centralizado, cartões de vidro (homepage)', value: 'plataforma' },
        { label: 'À esquerda, linhas (programa de parceiros)', value: 'programa' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
        { name: 'titulo', label: 'Título', type: 'text' },
      ],
    },
    {
      name: 'incluirPerguntasPlataforma',
      label: 'Incluir as perguntas do global "FAQ da plataforma" (antes das perguntas abaixo)',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'itens',
      label: 'Perguntas da seção',
      type: 'array',
      fields: [
        { name: 'pergunta', label: 'Pergunta', type: 'text', required: true },
        { name: 'resposta', label: 'Resposta', type: 'textarea', required: true },
      ],
    },
  ],
}
