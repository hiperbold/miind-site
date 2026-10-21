import type { Field } from 'payload'

// Campos comuns dos blocos da homepage e do programa de parceiros.

export const DESCRICAO_MARCACAO = 'Use *texto* para o trecho em degradê e _texto_ para itálico em degradê.'

// Âncora da seção (alvo dos links com # do cabeçalho).
export const campoAncora: Field = {
  name: 'ancora',
  label: 'Âncora',
  type: 'text',
  admin: { description: 'id da seção para links com # (opcional).' },
  validate: (value: string | null | undefined) =>
    !value || /^[a-z0-9-]+$/.test(value) || 'Use só letras minúsculas, números e hífen.',
}

// Cabeçalho de seção da homepage: etiqueta (pílula ou com traços), título e texto.
export const campoCabecalhoPlataforma: Field = {
  name: 'cabecalho',
  label: 'Cabeçalho da seção',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'etiqueta', label: 'Etiqueta', type: 'text', admin: { width: '60%' } },
        {
          name: 'estiloEtiqueta',
          dbName: 'estilo',
          label: 'Estilo da etiqueta',
          type: 'select',
          defaultValue: 'pilula',
          options: [
            { label: 'Pílula', value: 'pilula' },
            { label: 'Com traços', value: 'tracos' },
          ],
          admin: { width: '40%' },
        },
      ],
    },
    { name: 'titulo', label: 'Título', type: 'text', admin: { description: DESCRICAO_MARCACAO } },
    { name: 'subtitulo', label: 'Texto de apoio', type: 'textarea' },
  ],
}

// Cabeçalho de seção do programa de parceiros: etiqueta violeta, título e texto.
export const campoCabecalhoHub: Field = {
  name: 'cabecalho',
  label: 'Cabeçalho da seção',
  type: 'group',
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título', type: 'text' },
    { name: 'subtitulo', label: 'Texto de apoio', type: 'textarea' },
  ],
}

export const campoBotao = (name: string, label: string, url: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'texto', label: 'Texto', type: 'text' },
        { name: 'url', label: 'Link', type: 'text', defaultValue: url },
      ],
    },
  ],
})

// Formulário de cadastro do programa (com seletor de segmento visível).
export const campoFormularioHub = (origem: string, formId: string): Field => ({
  name: 'formulario',
  label: 'Formulário',
  type: 'group',
  admin: {
    description:
      'Perfis e consentimento vêm do global "Formulário". As opções de segmento são as páginas de nicho publicadas. Nesta fase o formulário só valida no navegador; o envio entra na fase 3.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'origem', label: 'Origem', type: 'text', defaultValue: origem },
        {
          name: 'formId',
          label: 'id do formulário',
          type: 'text',
          defaultValue: formId,
          validate: (value: string | null | undefined) =>
            !value || /^[a-z0-9-]+$/.test(value) || 'Use só letras minúsculas, números e hífen.',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'rotuloSegmento', label: 'Rótulo do seletor de segmento', type: 'text' },
        { name: 'opcaoSemSegmento', label: 'Primeira opção do seletor', type: 'text' },
      ],
    },
  ],
})
