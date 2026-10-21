import type { Field } from 'payload'

// Aba de scripts personalizados, igual à da coleção "paginas".
export const campoScriptsPersonalizados: Field = {
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
      admin: { language: 'html', description: 'Aceita <script>, <noscript>, <style>, <meta> e <link>.' },
    },
    { name: 'bodyFim', label: 'No fim do <body>', type: 'code', admin: { language: 'html' } },
  ],
}

export const campoSeoGlobal = (extras: Field[] = []): Field => ({
  name: 'seo',
  label: 'SEO e compartilhamento',
  type: 'group',
  fields: [
    { name: 'title', label: 'Título da página', type: 'text', required: true },
    { name: 'description', label: 'Descrição', type: 'textarea' },
    { name: 'ogTitle', label: 'Título ao compartilhar (vazio: o título da página)', type: 'text' },
    { name: 'ogDescription', label: 'Descrição ao compartilhar (vazio: a descrição)', type: 'textarea' },
    {
      name: 'ogImage',
      label: 'Imagem de compartilhamento',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Vazio: a imagem padrão do Bu1lder (1216 x 640).' },
    },
    ...extras,
  ],
})
