import type { GlobalConfig } from 'payload'

import { blocosPlataforma } from '@/blocks/plataforma'
import { campoScriptsPersonalizados, campoSeoGlobal } from '@/fields/seo-scripts'
import { logado, publicadoOuLogado } from '@/lib/acesso'
import { revalidarPaginas } from '@/lib/revalidar'
import { validarUrl } from '@/lib/url-segura'

// Programa de parceiros (/bu1lder/parceiros). Rascunho e publicação: o site só
// mostra a versão publicada.
export const Parceiros: GlobalConfig = {
  slug: 'parceiros',
  label: 'Programa de parceiros',
  access: { read: publicadoOuLogado, update: logado, readVersions: logado },
  versions: { drafts: true, max: 50 },
  hooks: { afterChange: [({ context }) => revalidarPaginas({ context })] },
  admin: {
    description:
      'Página /bu1lder/parceiros. A grade de segmentos e o seletor do formulário vêm das páginas de nicho publicadas.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Conteúdo',
          fields: [
            {
              name: 'cabecalho',
              label: 'Cabeçalho',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'textoBotao', label: 'Botão', type: 'text' },
                    { name: 'textoBotaoCurto', label: 'Botão no celular', type: 'text' },
                    { name: 'urlBotao', label: 'Link do botão', type: 'text', validate: validarUrl, defaultValue: '#cadastro' },
                  ],
                },
              ],
            },
            { name: 'layout', label: 'Seções', type: 'blocks', blocks: blocosPlataforma },
            {
              name: 'rodape',
              label: 'Rodapé',
              type: 'group',
              fields: [
                { name: 'texto', label: 'Texto (depois de "© ano")', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'textoLink', label: 'Texto do link', type: 'text' },
                    { name: 'urlLink', label: 'Link', type: 'text', validate: validarUrl, defaultValue: '/bu1lder/' },
                  ],
                },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [campoSeoGlobal()] },
        { label: 'Scripts', fields: [campoScriptsPersonalizados] },
      ],
    },
  ],
}
