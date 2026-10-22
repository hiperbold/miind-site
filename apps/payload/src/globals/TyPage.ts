import type { GlobalConfig, GroupField } from 'payload'

import { campoScriptsPersonalizados } from '@/fields/seo-scripts'
import { campoSoAdmin, logado, publico } from '@/lib/acesso'
import { validarUrl } from '@/lib/url-segura'

const ROTA = '/bu1lder/ty-page'

// Página de obrigado (/bu1lder/ty-page), para onde todo formulário leva depois
// do envio. Gerada a cada visita: a revalidação não é necessária.
export const TyPage: GlobalConfig = {
  slug: 'ty-page',
  label: 'Página de obrigado',
  access: { read: publico, update: logado },
  admin: {
    description: `Página ${ROTA}. Sempre fora dos buscadores (noindex).`,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Conteúdo',
          fields: [
            { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
            { name: 'titulo', label: 'Título', type: 'text', required: true },
            { name: 'texto', label: 'Texto', type: 'textarea' },
            {
              name: 'proximosPassos',
              label: 'Próximos passos',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'titulo', label: 'Título', type: 'text', required: true },
                    { name: 'texto', label: 'Texto', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'agenda',
              label: 'Agenda (opcional)',
              type: 'group',
              fields: [
                { name: 'titulo', label: 'Título da seção', type: 'text' },
                {
                  name: 'url',
                  label: 'URL da agenda (iframe)',
                  type: 'text',
                  access: { update: campoSoAdmin },
                  admin: { description: 'Ex.: o link do Calendly. Só https.' },
                  validate: (value: string | null | undefined) =>
                    !value || /^https:\/\/[^\s"'<>]+$/.test(value) || 'Use um endereço https completo.',
                },
                { name: 'altura', label: 'Altura do iframe (px)', type: 'number', defaultValue: 700, min: 300, max: 1600 },
                {
                  name: 'embed',
                  label: 'Código de incorporação',
                  type: 'code',
                  access: { update: campoSoAdmin },
                  admin: {
                    language: 'html',
                    description: 'Alternativa ao iframe (ex.: widget do Calendly). Entra como foi colado; os <script> rodam.',
                  },
                },
              ],
            },
            {
              name: 'botao',
              label: 'Botão (opcional)',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'texto', label: 'Texto', type: 'text' },
                    { name: 'url', label: 'Link', type: 'text', validate: validarUrl },
                  ],
                },
              ],
            },
            {
              name: 'variacoes',
              label: 'Variações por nicho (opcional)',
              type: 'array',
              admin: { description: 'Quando ?nicho= for igual ao slug, troca título e texto.' },
              fields: [
                {
                  name: 'slug',
                  label: 'Slug da página',
                  type: 'text',
                  required: true,
                  validate: (value: string | null | undefined) =>
                    (!!value && /^[a-z0-9-]+$/.test(value)) || 'Use letras minúsculas, números e hífen.',
                },
                { name: 'titulo', label: 'Título', type: 'text' },
                { name: 'texto', label: 'Texto', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Scripts',
          fields: [
            {
              name: 'exporContatoAosScripts',
              label: 'Expor nome, e-mail e WhatsApp aos scripts',
              type: 'checkbox',
              access: { update: campoSoAdmin },
              defaultValue: false,
              admin: {
                description:
                  'Desligado: window.bu1lderLead traz só dados de origem, primeiro nome e hashes SHA-256 de e-mail e telefone. Ligado: também nome, e-mail e WhatsApp em texto.',
              },
            },
            {
              ...(campoScriptsPersonalizados as GroupField),
              admin: {
                description:
                  'Os scripts do fim do <body> rodam depois que window.bu1lderLead, o evento "bu1lder:lead" e o dataLayer estão prontos.',
              },
            },
          ],
        },
      ],
    },
  ],
}
