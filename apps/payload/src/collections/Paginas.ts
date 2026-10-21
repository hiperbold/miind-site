import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

import { blocosPagina } from '@/blocks'
import { campoIcone } from '@/fields/comuns'
import { logado, publicadoOuLogado } from '@/lib/acesso'
import { revalidarAgora, revalidarPaginas } from '@/lib/revalidar'

// Slugs que já são rotas próprias em /bu1lder/* ou reservados.
// 'homepage' identifica a homepage no envio dos formulários (lib/cadastros).
export const SLUGS_RESERVADOS = ['parceiros', 'ty-page', 'admin', 'api', 'homepage']

// Formato e reserva. Devolve a mensagem de erro ou true.
export function validarSlug(value: string | null | undefined): string | true {
  if (!value) return 'Informe o slug.'
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return 'Use letras minúsculas, números e hífen.'
  if (SLUGS_RESERVADOS.includes(value)) return `O slug "${value}" é reservado.`
  return true
}

// O Payload não roda a validação dos campos ao salvar rascunho. Este hook
// confere o slug em todo salvamento (rascunho ou publicação) e também se outra
// página já usa o mesmo slug, publicada ou em rascunho, com mensagem clara.
const conferirSlug: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const slug = data?.slug ?? originalDoc?.slug
  const erro = (message: string) =>
    new ValidationError({ collection: 'paginas', errors: [{ path: 'slug', message }] }, req.t)
  const formato = validarSlug(slug)
  if (formato !== true) throw erro(formato)
  const id = originalDoc?.id
  const outras = await req.payload.find({
    collection: 'paginas',
    where: { and: [{ slug: { equals: slug } }, ...(id ? [{ id: { not_equals: id } }] : [])] },
    limit: 1,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    req,
  })
  const emRascunho = await req.payload.findVersions({
    collection: 'paginas',
    where: {
      and: [
        { 'version.slug': { equals: slug } },
        { latest: { equals: true } },
        ...(id ? [{ parent: { not_equals: id } }] : []),
      ],
    },
    limit: 1,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    req,
  })
  if (outras.docs.length || emRascunho.docs.length) {
    throw erro(`Já existe uma página com o slug "${slug}". Escolha outro endereço.`)
  }
  return data
}

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
  endpoints: [
    {
      // POST /api/paginas/revalidar (logado): limpa o cache de todas as LPs.
      // Usado pelo seed, que roda fora do Next e não consegue revalidar sozinho.
      path: '/revalidar',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ message: 'Não autorizado.' }, { status: 401 })
        revalidarAgora()
        return Response.json({ message: 'Páginas revalidadas.' })
      },
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  hooks: {
    beforeChange: [conferirSlug],
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
      validate: (value: string | null | undefined) => validarSlug(value),
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
      name: 'cartaoHub',
      label: 'No programa de parceiros',
      type: 'group',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.tipo === 'nicho',
        description: 'Opção no seletor de segmento do cadastro e cartão na grade de segmentos de /bu1lder/parceiros.',
      },
      fields: [
        { name: 'nome', label: 'Nome curto', type: 'text', admin: { description: 'Vazio: usa o rótulo da navegação.' } },
        { name: 'mostrarNaGrade', label: 'Mostrar na grade de segmentos', type: 'checkbox', defaultValue: false },
        campoIcone({ admin: { condition: (_, s) => Boolean(s?.mostrarNaGrade) } }),
        {
          name: 'estatistica',
          label: 'Número do mercado',
          type: 'text',
          admin: { condition: (_, s) => Boolean(s?.mostrarNaGrade) },
        },
        {
          name: 'texto',
          label: 'Texto do cartão',
          type: 'textarea',
          admin: { condition: (_, s) => Boolean(s?.mostrarNaGrade) },
        },
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
