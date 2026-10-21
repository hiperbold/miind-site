import type { CollectionConfig } from 'payload'

import { blocosPagina } from '@/blocks'
import { logado, publicadoOuLogado } from '@/lib/acesso'
import { revalidarPaginas } from '@/lib/revalidar'

// Slugs que já são rotas próprias em /bu1lder/* ou reservados.
export const SLUGS_RESERVADOS = ['parceiros', 'ty-page', 'admin', 'api']

export const Paginas: CollectionConfig = {
  slug: 'paginas',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'slug', 'tipo', 'visual', '_status', 'updatedAt'],
    description: 'Páginas em /bu1lder/{slug}.',
  },
  access: {
    read: publicadoOuLogado,
    create: logado,
    update: logado,
    delete: logado,
    readVersions: logado,
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [({ context }) => revalidarPaginas({ context })],
    afterDelete: [({ context }) => revalidarPaginas({ context })],
  },
  fields: [
    { name: 'titulo', label: 'Título (interno)', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Endereço: /bu1lder/{slug}' },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Informe o slug.'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return 'Use letras minúsculas, números e hífen.'
        if (SLUGS_RESERVADOS.includes(value)) return `O slug "${value}" é reservado.`
        return true
      },
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      required: true,
      defaultValue: 'nicho',
      options: [
        { label: 'Nicho', value: 'nicho' },
        { label: 'Outra', value: 'outra' },
      ],
      admin: { position: 'sidebar', description: 'Páginas de nicho publicadas entram na navegação de segmentos.' },
    },
    {
      name: 'navegacao',
      label: 'Navegação de segmentos',
      type: 'group',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.tipo === 'nicho',
      },
      fields: [
        { name: 'rotulo', label: 'Rótulo', type: 'text', admin: { description: 'Vazio: usa o título.' } },
        { name: 'ordem', label: 'Ordem', type: 'number', defaultValue: 100 },
      ],
    },
    {
      name: 'visual',
      label: 'Visual',
      type: 'select',
      required: true,
      defaultValue: 'ds',
      options: [
        { label: 'DS MIIND', value: 'ds' },
        { label: 'Original (Geist)', value: 'original' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'temaClaroPadrao',
      label: 'Abrir em modo claro',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
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
                    {
                      name: 'mostrarNavegacaoSegmentos',
                      label: 'Mostrar barra de segmentos',
                      type: 'checkbox',
                      defaultValue: false,
                    },
                    { name: 'mostrarVoltar', label: 'Mostrar "Voltar ao site"', type: 'checkbox', defaultValue: false },
                  ],
                },
              ],
            },
            {
              name: 'layout',
              label: 'Seções',
              type: 'blocks',
              blocks: blocosPagina,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              label: 'SEO e compartilhamento',
              type: 'group',
              fields: [
                { name: 'title', label: 'Título da página', type: 'text', required: true },
                { name: 'description', label: 'Descrição', type: 'textarea' },
                { name: 'ogImage', label: 'Imagem de compartilhamento', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Scripts',
          fields: [
            {
              name: 'scriptsPersonalizados',
              label: 'Scripts personalizados',
              type: 'group',
              admin: {
                description:
                  'Códigos colados aqui (pixels, tags) entram na página exatamente como estão, sem filtro. Só administradores editam.',
              },
              fields: [
                {
                  name: 'head',
                  label: 'No <head>',
                  type: 'code',
                  admin: {
                    language: 'html',
                    description: 'Aceita <script>, <noscript>, <style>, <meta> e <link>.',
                  },
                },
                {
                  name: 'bodyFim',
                  label: 'No fim do <body>',
                  type: 'code',
                  admin: { language: 'html' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
