// Parâmetros personalizados do evento Lead (custom_data na Meta, parâmetros no
// GA4), iguais no navegador e no servidor. Só dados de qualificação, nunca
// dado pessoal. Regras do módulo: chave [a-z][a-z0-9_]{0,39}, valor até 256.
export type EntradaPropriedadesLead = {
  pagina: string
  perfil?: string | null
  empresas_atendidas?: string | null
  clientes_atendidos?: string | null
}

export function propriedadesLead(e: EntradaPropriedadesLead): Record<string, string> {
  const saida: Record<string, string> = {}
  const por = (chave: string, valor: string | null | undefined) => {
    const v = valor?.trim()
    if (v) saida[chave] = v.slice(0, 256)
  }
  por('perfil', e.perfil)
  por('empresas_atendidas', e.empresas_atendidas)
  por('clientes_atendidos', e.clientes_atendidos)
  por('pagina', e.pagina)
  return saida
}
