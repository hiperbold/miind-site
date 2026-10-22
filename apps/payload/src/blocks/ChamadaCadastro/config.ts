import type { Block } from 'payload'
import { validarUrl } from '@/lib/url-segura'

export const ChamadaCadastro: Block = {
  slug: 'chamadaCadastro',
  interfaceName: 'BlocoChamadaCadastro',
  labels: { singular: 'Chamada com cadastro', plural: 'Chamadas com cadastro' },
  fields: [
    { name: 'etiqueta', label: 'Etiqueta', type: 'text' },
    { name: 'titulo', label: 'Título', type: 'text', required: true },
    { name: 'texto', label: 'Texto', type: 'textarea' },
    {
      name: 'bullets',
      label: 'Lista de vantagens',
      type: 'array',
      fields: [{ name: 'texto', label: 'Texto', type: 'text', required: true }],
    },
    {
      name: 'depoimento',
      label: 'Depoimento (opcional)',
      type: 'group',
      fields: [
        { name: 'texto', label: 'Texto', type: 'textarea' },
        { name: 'autor', label: 'Autor', type: 'text' },
      ],
    },
    {
      name: 'formulario',
      label: 'Formulário',
      type: 'group',
      admin: {
        description:
          'O segmento do cadastro é oculto e igual ao slug da página. O envio grava em "Cadastros", vai ao webhook do n8n e leva à página de obrigado.',
      },
      fields: [
        {
          name: 'perfis',
          label: 'Opções de perfil',
          type: 'text',
          hasMany: true,
          admin: { description: 'Vazio: usa os perfis padrão do global "Formulário".' },
        },
        {
          name: 'perguntasExtras',
          label: 'Perguntas extras',
          type: 'array',
          dbName: 'perguntas',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'rotulo', label: 'Pergunta', type: 'text', required: true, admin: { width: '60%' } },
                {
                  name: 'nome',
                  label: 'Nome do campo',
                  type: 'text',
                  required: true,
                  admin: { width: '40%', description: 'Letras minúsculas, números e _ (ex.: empresas_atendidas).' },
                  validate: (value: string | null | undefined) =>
                    (!!value && /^[a-z][a-z0-9_]*$/.test(value)) ||
                    'Use letras minúsculas, números e _, começando por letra.',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'tipo',
                  label: 'Tipo',
                  type: 'select',
                  required: true,
                  defaultValue: 'unica',
                  options: [
                    { label: 'Escolha única', value: 'unica' },
                    { label: 'Múltipla escolha', value: 'multipla' },
                  ],
                },
                { name: 'obrigatoria', label: 'Obrigatória', type: 'checkbox', defaultValue: false },
              ],
            },
            { name: 'opcoes', label: 'Opções', type: 'text', hasMany: true, required: true },
          ],
        },
        {
          name: 'textoConsentimento',
          label: 'Texto do consentimento',
          type: 'textarea',
          admin: { description: 'Vazio: usa o texto padrão do global "Formulário".' },
        },
        {
          name: 'botaoSecundario',
          label: 'Botão secundário (opcional)',
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
          name: 'formId',
          label: 'id do formulário',
          type: 'text',
          admin: { description: 'Vazio: cadastro-{slug da página}.' },
          validate: (value: string | null | undefined) =>
            !value || /^[a-z0-9-]+$/.test(value) || 'Use só letras minúsculas, números e hífen.',
        },
      ],
    },
  ],
}
