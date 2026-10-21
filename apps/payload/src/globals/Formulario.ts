import type { GlobalConfig } from 'payload'

import { logado, publico } from '@/lib/acesso'
import { revalidarPaginas } from '@/lib/revalidar'

export const Formulario: GlobalConfig = {
  slug: 'formulario',
  label: 'Formulário',
  access: { read: publico, update: logado },
  hooks: { afterChange: [({ context }) => revalidarPaginas({ context })] },
  admin: { description: 'Padrões do formulário de cadastro, usados quando a página não define os seus.' },
  fields: [
    { name: 'perfis', label: 'Perfis padrão', type: 'text', hasMany: true },
    { name: 'textoConsentimento', label: 'Texto padrão do consentimento', type: 'textarea', required: true },
  ],
}
