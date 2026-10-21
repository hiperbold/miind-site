import type { GlobalConfig } from 'payload'

import { blocosPlataforma } from '@/blocks/plataforma'
import { DESCRICAO_MARCACAO } from '@/fields/plataforma'
import { campoScriptsPersonalizados, campoSeoGlobal } from '@/fields/seo-scripts'
import { logado, publicadoOuLogado } from '@/lib/acesso'
import { revalidarPaginas } from '@/lib/revalidar'

const link = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'rotulo', label: 'Texto', type: 'text' as const, required: true },
        { name: 'url', label: 'Link', type: 'text' as const, required: true },
      ],
    },
  ],
})

// Homepage do Bu1lder (/bu1lder/). Rascunho e publicação: o site só mostra a
// versão publicada.
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage do Bu1lder',
  access: { read: publicadoOuLogado, update: logado, readVersions: logado },
  versions: { drafts: true, max: 50 },
  hooks: { afterChange: [({ context }) => revalidarPaginas({ context })] },
  admin: { description: 'Página /bu1lder/. Cabeçalho, seções e rodapé.' },
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
                  ...link('links', 'Links do menu'),
                  admin: { description: 'Link com # rola até a seção e fica marcado quando ela está na tela.' },
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'textoBotao', label: 'Botão (desktop)', type: 'text' },
                    { name: 'textoBotaoCelular', label: 'Botão (menu do celular)', type: 'text' },
                    { name: 'urlBotao', label: 'Link do botão', type: 'text', defaultValue: '#contato' },
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
                { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
                { name: 'frase', label: 'Frase', type: 'text', admin: { description: DESCRICAO_MARCACAO } },
                { name: 'texto', label: 'Texto', type: 'textarea' },
                { name: 'descricaoMarca', label: 'Texto ao lado da marca', type: 'textarea' },
                {
                  name: 'colunas',
                  label: 'Colunas de links',
                  type: 'array',
                  fields: [{ name: 'titulo', label: 'Título', type: 'text', required: true }, link('links', 'Links')],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'direitos', label: 'Direitos (depois de "© ano")', type: 'text' },
                    { name: 'assinatura', label: 'Assinatura (itens separados por um ponto)', type: 'text', hasMany: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            campoSeoGlobal([
              { name: 'keywords', label: 'Palavras-chave', type: 'textarea' },
              {
                name: 'dadosEstruturados',
                label: 'Dados estruturados (JSON-LD do aplicativo)',
                type: 'group',
                admin: { description: 'As perguntas do JSON-LD saem das seções de perguntas frequentes da página.' },
                fields: [
                  { name: 'nome', label: 'Nome do aplicativo', type: 'text' },
                  { name: 'descricao', label: 'Descrição', type: 'textarea' },
                  {
                    type: 'row',
                    fields: [
                      { name: 'organizacao', label: 'Organização', type: 'text' },
                      { name: 'slogan', label: 'Slogan', type: 'text' },
                    ],
                  },
                ],
              },
            ]),
          ],
        },
        { label: 'Scripts', fields: [campoScriptsPersonalizados] },
      ],
    },
  ],
}
