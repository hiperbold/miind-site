import type { GlobalConfig } from 'payload'

import { logado, publico } from '@/lib/acesso'
import { revalidarPaginas } from '@/lib/revalidar'

export const Rodape: GlobalConfig = {
  slug: 'rodape',
  label: 'Rodapé',
  access: { read: publico, update: logado },
  hooks: { afterChange: [({ context }) => revalidarPaginas({ context })] },
  admin: { description: 'Rodapé das LPs: marca Bu1lder by MIIND, menu de links legais e direitos.' },
  fields: [
    { name: 'tituloLinks', label: 'Título do menu', type: 'text', defaultValue: 'Legal' },
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'rotulo', label: 'Texto', type: 'text', required: true },
            { name: 'url', label: 'Link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'textoDireitos',
      label: 'Direitos (depois de "© ano")',
      type: 'text',
      defaultValue: 'MIIND. Todos os direitos reservados.',
    },
  ],
}
