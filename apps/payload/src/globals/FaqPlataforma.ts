import type { GlobalConfig } from 'payload'

import { logado, publico } from '@/lib/acesso'
import { revalidarPaginas } from '@/lib/revalidar'

export const FaqPlataforma: GlobalConfig = {
  slug: 'faq-plataforma',
  label: 'FAQ da plataforma',
  access: { read: publico, update: logado },
  hooks: { afterChange: [({ context }) => revalidarPaginas({ context })] },
  admin: {
    description: 'Perguntas comuns, exibidas antes das perguntas da página quando o bloco FAQ pede.',
  },
  fields: [
    {
      name: 'perguntas',
      label: 'Perguntas',
      type: 'array',
      fields: [
        { name: 'pergunta', label: 'Pergunta', type: 'text', required: true },
        { name: 'resposta', label: 'Resposta', type: 'textarea', required: true },
      ],
    },
  ],
}
