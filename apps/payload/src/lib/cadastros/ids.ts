// ids padrão dos formulários, usados pelos componentes e pelo servidor (que
// acha a configuração do formulário pelo id).
export const PAGINA_HOMEPAGE = 'homepage'
export const PAGINA_PARCEIROS = 'parceiros'

export const formIdContato = (ancora: string | null | undefined) => `${ancora || 'contato'}-form`
export const formIdLp = (slug: string, formId: string | null | undefined) => formId || `cadastro-${slug}`
