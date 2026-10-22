import { LeadForm } from '@/components/bu1lder/LeadForm'
import type { ContextoPlataforma } from '@/blocks/contexto-plataforma'
import { chaveSiteTurnstile } from '@/lib/cadastros/turnstile'

type FormularioHub = {
  origem?: string | null
  formId?: string | null
  rotuloSegmento?: string | null
  opcaoSemSegmento?: string | null
} | null | undefined

// LeadForm do programa de parceiros: seletor de segmento visível com as páginas
// de nicho publicadas; perfis e consentimento do global "Formulário". Como na
// prévia, o perfil não é obrigatório aqui. O campo "Origem" do bloco não é
// enviado: o formulário é identificado pelo id e a página pela rota.
export function CadastroHub({
  formulario,
  contexto,
  padraoId,
}: {
  formulario: FormularioHub
  contexto: ContextoPlataforma
  padraoId: string
}) {
  return (
    <LeadForm
      pagina={contexto.pagina}
      tipo="hub"
      turnstileSiteKey={chaveSiteTurnstile()}
      segmento=""
      formId={formulario?.formId || padraoId}
      profileOptions={contexto.formulario.perfis ?? []}
      consentText={contexto.formulario.textoConsentimento}
      perfilRequired={false}
      segmentSelect={{
        label: formulario?.rotuloSegmento || 'Segmento de interesse',
        emptyLabel: formulario?.opcaoSemSegmento || 'Mais de um / ainda não sei',
        options: contexto.segmentos,
      }}
    />
  )
}
