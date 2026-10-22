// Links editáveis no admin (botões, rodapé, página de obrigado): só http(s),
// caminho relativo (/..., #..., ?...), mailto: e tel:. Bloqueia javascript:,
// data: e outros esquemas.
export function urlSegura(valor: string | null | undefined): boolean {
  const v = valor?.trim()
  if (!v) return false
  if (/[\u0000-\u001f\s]/.test(v)) return false
  if (v.startsWith('//')) return false
  if (/^[/#?]/.test(v)) return true
  if (/^(https?:\/\/)[^\s]+$/i.test(v)) return true
  if (/^mailto:[^\s]+$/i.test(v) || /^tel:[+\d().\-\s]+$/i.test(v)) return true
  return false
}

export const MENSAGEM_URL = 'Use https://..., http://..., um caminho (/..., #...), mailto: ou tel:.'

// validate de campo do Payload (vazio é aceito; obrigatoriedade fica no required).
export const validarUrl = (valor: string | null | undefined): true | string =>
  !valor || urlSegura(valor) || MENSAGEM_URL
