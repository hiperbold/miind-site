import type { Block } from 'payload'

import { camposSecao } from '@/fields/comuns'

export const Faq: Block = {
  slug: 'faq',
  interfaceName: 'BlocoFaq',
  labels: { singular: 'Perguntas frequentes', plural: 'Perguntas frequentes' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'etiqueta', label: 'Etiqueta', type: 'text', defaultValue: 'FAQ' },
        { name: 'titulo', label: 'Título', type: 'text', defaultValue: 'Perguntas frequentes' },
      ],
    },
    {
      name: 'incluirPerguntasPlataforma',
      label: 'Incluir as perguntas da plataforma (global "FAQ da plataforma") antes das da página',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'itens',
      label: 'Perguntas da página',
      type: 'array',
      fields: [
        { name: 'pergunta', label: 'Pergunta', type: 'text', required: true },
        { name: 'resposta', label: 'Resposta', type: 'textarea', required: true },
      ],
    },
    camposSecao({ destaque: true }),
  ],
}
