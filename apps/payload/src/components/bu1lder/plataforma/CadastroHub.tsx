import { LeadForm } from '@/components/bu1lder/LeadForm'
import type { ContextoPlataforma } from '@/blocks/contexto-plataforma'

type FormularioHub = {
  origem?: string | null
  formId?: string | null
  rotuloSegmento?: string | null
  opcaoSemSegmento?: string | null
} | null | undefined

// LeadForm do programa de parceiros: seletor de segmento visível com as páginas
// de nicho publicadas; perfis e consentimento do global "Formulário". Como na
// prévia, o perfil não é obrigatório aqui.
export function CadastroHub({
  formulario,
  contexto,
  padraoOrigem,
  padraoId,
}: {
  formulario: FormularioHub
  contexto: ContextoPlataforma
  padraoOrigem: string
  padraoId: string
}) {
  return (
    <LeadForm
      origem={formulario?.origem || padraoOrigem}
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
