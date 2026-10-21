import { Quote, Sparkles } from 'lucide-react'

import { LeadForm, type ExtraQuestion } from '@/components/bu1lder/LeadForm'
import type { BlocoChamadaCadastro } from '@/payload-types'

import type { ContextoBloco } from '../contexto'

// Chamada final com o formulário. A seção sempre tem id="cadastro": é o alvo
// do botão do cabeçalho e dos botões do topo.
export function ChamadaCadastroBloco({ bloco, contexto }: { bloco: BlocoChamadaCadastro; contexto: ContextoBloco }) {
  const form = bloco.formulario
  const perfis = form?.perfis?.length ? form.perfis : (contexto.formulario.perfis ?? [])
  const consentimento = form?.textoConsentimento?.trim() || contexto.formulario.textoConsentimento
  const extras: ExtraQuestion[] = (form?.perguntasExtras ?? []).map((q) => ({
    label: q.rotulo,
    name: q.nome,
    type: q.tipo,
    options: q.opcoes ?? [],
    required: q.obrigatoria,
  }))
  const bullets = bloco.bullets ?? []
  const depoimento = bloco.depoimento?.texto ? bloco.depoimento : null

  return (
    <section id="cadastro" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 top-0 -right-32 w-[500px] h-[500px] rounded-full bg-brand-violet/25 blur-3xl aurora-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 bottom-0 -left-32 w-[460px] h-[460px] rounded-full bg-brand-cyan/15 blur-3xl aurora-drift"
        style={{ animationDelay: '-9s' }}
      />
      <div className="container-editorial section-pad grid lg:grid-cols-[1fr_1.05fr] gap-12 items-start">
        <div>
          {bloco.etiqueta && <p className="eyebrow text-brand-violet">{bloco.etiqueta}</p>}
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1]">{bloco.titulo}</h2>
          {bloco.texto && <p className="mt-6 lead max-w-lg">{bloco.texto}</p>}

          {bullets.length > 0 && (
            <ul className="mt-8 space-y-3">
              {bullets.map((b, i) => (
                <li key={b.id ?? `${i}-${b.texto}`} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-mint to-brand-cyan text-background">
                    <Sparkles className="size-3" />
                  </span>
                  {b.texto}
                </li>
              ))}
            </ul>
          )}

          {depoimento && (
            <div className="mt-8 surface-card p-5">
              <Quote className="size-5 text-brand-cyan/80 mb-2" />
              <p className="text-sm text-foreground/90 leading-relaxed italic">&quot;{depoimento.texto}&quot;</p>
              {depoimento.autor && <p className="mt-2 eyebrow text-brand-violet">{depoimento.autor}</p>}
            </div>
          )}
        </div>
        <LeadForm
          origem={contexto.slug}
          segmento={contexto.slug}
          formId={form?.formId || `cadastro-${contexto.slug}`}
          profileOptions={perfis}
          extraQuestions={extras}
          consentText={consentimento}
          secondaryButton={
            form?.botaoSecundario?.texto && form.botaoSecundario.url
              ? { text: form.botaoSecundario.texto, url: form.botaoSecundario.url }
              : null
          }
        />
      </div>
    </section>
  )
}
