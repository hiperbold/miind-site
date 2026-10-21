import { ArrowRight } from 'lucide-react'

import { CadastroHub } from '@/components/bu1lder/plataforma/CadastroHub'
import type { BlocoChamadaFinalCadastro } from '@/payload-types'

import type { ContextoPlataforma } from '../contexto-plataforma'

// Porte do "CTA final + form" de bu1lders.index.tsx.
export function ChamadaFinalCadastroBloco({
  bloco,
  contexto,
}: {
  bloco: BlocoChamadaFinalCadastro
  contexto: ContextoPlataforma
}) {
  const vantagens = bloco.vantagens ?? []
  const link = bloco.linkCelular
  return (
    <section id={bloco.ancora || undefined} className="relative overflow-hidden border-t border-foreground/5">
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 top-0 -right-32 w-[500px] h-[500px] rounded-full bg-brand-violet/20 blur-3xl aurora-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-brand-cyan/15 blur-3xl aurora-drift"
        style={{ animationDelay: '-6s' }}
      />
      <div className="container-editorial section-pad grid lg:grid-cols-2 gap-12 items-start">
        <div>
          {bloco.etiqueta && <p className="eyebrow text-brand-violet">{bloco.etiqueta}</p>}
          <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1]">
            {bloco.titulo}
          </h2>
          {bloco.texto && <p className="mt-6 lead max-w-lg">{bloco.texto}</p>}
          {vantagens.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {vantagens.map((v) => (
                <span key={v}>✓ {v}</span>
              ))}
            </div>
          )}
          {link?.texto && (
            <a
              href={link.url || '#cadastro'}
              className="mt-8 inline-flex items-center gap-2 rounded-xl glass text-foreground font-medium px-6 h-12 hover:border-brand-cyan/30 transition-colors lg:hidden"
            >
              {link.texto} <ArrowRight className="size-4" />
            </a>
          )}
        </div>
        <CadastroHub formulario={bloco.formulario} contexto={contexto} padraoOrigem="hub-bottom" padraoId="cadastro-final" />
      </div>
    </section>
  )
}
