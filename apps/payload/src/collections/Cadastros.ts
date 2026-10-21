import type { CollectionConfig, Field } from 'payload'

import { endpointEnviar, endpointReenviar } from '@/lib/cadastros/endpoints'
import { CAMPOS_OCULTOS } from '@/lib/cadastros/parametros'
import { logado } from '@/lib/acesso'

const lerSo = { readOnly: true } as const

const texto = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({ name, label, type: 'text', admin: lerSo, ...extra }) as Field

// Cadastros dos formulários do site. Dado pessoal: só usuário logado lê, edita
// ou apaga. Ninguém cria pela API: só o servidor (endpoint /enviar), com
// overrideAccess.
export const Cadastros: CollectionConfig = {
  slug: 'cadastros',
  labels: { singular: 'Cadastro', plural: 'Cadastros' },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'email', 'pagina', 'envio.status', 'createdAt'],
    listSearchableFields: ['nome', 'email', 'whatsapp', 'pagina'],
    description: 'Cadastros recebidos pelos formulários do site. Dado pessoal: não exportar nem compartilhar.',
  },
  access: {
    read: logado,
    update: logado,
    delete: logado,
    create: () => false,
    readVersions: () => false,
  },
  endpoints: [endpointEnviar, endpointReenviar],
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cadastro',
          fields: [
            {
              type: 'row',
              fields: [texto('nome', 'Nome', { index: true } as Partial<Field>), texto('email', 'E-mail', { index: true } as Partial<Field>)],
            },
            { type: 'row', fields: [texto('whatsapp', 'WhatsApp'), texto('cidade_uf', 'Cidade / UF')] },
            { type: 'row', fields: [texto('perfil', 'Perfil'), texto('segmento', 'Segmento')] },
            {
              type: 'row',
              fields: [texto('empresas_atendidas', 'Empresas atendidas'), texto('clientes_atendidos', 'Clientes atendidos')],
            },
            { name: 'segmentos', label: 'Segmentos atendidos', type: 'text', hasMany: true, admin: lerSo },
            texto('uso', 'Uso'),
            {
              name: 'extras',
              label: 'Respostas extras',
              type: 'json',
              admin: { ...lerSo, description: 'Todas as perguntas extras do formulário, pelo nome do campo.' },
            },
            {
              name: 'contato',
              label: 'Contato da homepage',
              type: 'group',
              admin: { condition: (data) => data?.tipo === 'contato-plataforma' },
              fields: [
                { type: 'row', fields: [texto('empresa', 'Empresa'), texto('cargo', 'Cargo'), texto('volume', 'Volume / colaboradores')] },
                { name: 'desafio', label: 'Principal desafio', type: 'textarea', admin: lerSo },
              ],
            },
            {
              name: 'consentimento',
              label: 'Consentimento',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'aceito', label: 'Aceito', type: 'checkbox', defaultValue: false, admin: lerSo },
                    { name: 'data', label: 'Data', type: 'date', admin: { ...lerSo, date: { pickerAppearance: 'dayAndTime' } } },
                  ],
                },
                { name: 'texto', label: 'Texto aceito', type: 'textarea', admin: lerSo },
              ],
            },
          ],
        },
        {
          label: 'Origem',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'tipo',
                  label: 'Tipo de formulário',
                  type: 'select',
                  index: true,
                  options: [
                    { label: 'LP de nicho', value: 'lp' },
                    { label: 'Programa de parceiros', value: 'hub' },
                    { label: 'Contato da plataforma', value: 'contato-plataforma' },
                  ],
                  admin: lerSo,
                },
                texto('pagina', 'Página', { index: true } as Partial<Field>),
                texto('formulario', 'Formulário (id)'),
              ],
            },
            ...CAMPOS_OCULTOS.map((nome) =>
              nome === 'origem'
                ? ({ name: nome, label: 'origem (URL)', type: 'textarea', admin: lerSo } as Field)
                : texto(nome, nome),
            ),
            { type: 'row', fields: [texto('ip', 'IP')] },
            { name: 'user_agent', label: 'User agent', type: 'textarea', admin: lerSo },
          ],
        },
        {
          label: 'Envio ao n8n',
          fields: [
            {
              name: 'envio',
              label: 'Envio ao webhook',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'status',
                      label: 'Situação',
                      type: 'select',
                      defaultValue: 'pendente',
                      index: true,
                      options: [
                        { label: 'Pendente', value: 'pendente' },
                        { label: 'Enviado', value: 'enviado' },
                        { label: 'Falha', value: 'falha' },
                      ],
                      admin: lerSo,
                    },
                    { name: 'tentativas', label: 'Tentativas', type: 'number', defaultValue: 0, admin: lerSo },
                    { name: 'respostaStatus', label: 'Status HTTP da resposta', type: 'number', admin: lerSo },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    texto('ultimoErro', 'Último erro'),
                    { name: 'enviadoEm', label: 'Enviado em', type: 'date', admin: { ...lerSo, date: { pickerAppearance: 'dayAndTime' } } },
                  ],
                },
              ],
            },
            {
              name: 'reenviar',
              type: 'ui',
              admin: { components: { Field: '@/components/admin/BotaoReenviar#BotaoReenviar' } },
            },
          ],
        },
      ],
    },
    {
      name: 'token',
      label: 'Token da página de obrigado',
      type: 'text',
      unique: true,
      index: true,
      admin: { ...lerSo, position: 'sidebar', description: 'Identificador opaco usado na URL da página de obrigado.' },
    },
    {
      name: 'event_id',
      label: 'event_id',
      type: 'text',
      unique: true,
      admin: { ...lerSo, position: 'sidebar', description: 'Reservado para o rastreamento (fase 4).' },
    },
  ],
}
