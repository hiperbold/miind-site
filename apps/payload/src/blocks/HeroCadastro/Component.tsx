import { CadastroHub } from '@/components/bu1lder/plataforma/CadastroHub'
import { TextoMarcado } from '@/components/bu1lder/plataforma/TextoMarcado'
import { IconeLucide } from '@/lib/icones'
import type { BlocoHeroCadastro } from '@/payload-types'

import type { ContextoPlataforma } from '../contexto-plataforma'

// Porte do topo de apps/bu1lder/src/routes/bu1lders.index.tsx (programa de parceiros).
export function HeroCadastroBloco({ bloco, contexto }: { bloco: BlocoHeroCadastro; contexto: ContextoPlataforma }) {
  const bullets = bloco.bullets ?? []
  const selos = bloco.selos ?? []
  const cartao = bloco.cartao
  return (
    <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -z-20 top-[10%] -left-32 w-[600px] h-[600px] rounded-full bg-brand-violet/30 [.light_&]:bg-brand-violet/15 blur-[140px] aurora-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-20 top-[20%] -right-32 w-[600px] h-[600px] rounded-full bg-brand-blue/30 [.light_&]:bg-brand-blue/15 blur-[140px] aurora-drift"
        style={{ animationDelay: '-8s' }}
      />
      <div className="absolute -z-10 inset-x-0 bottom-0 h-[60%] [perspective:800px] pointer-events-none">
        <div
          className="absolute inset-0 grid-bg origin-top"
          style={{
            transform: 'rotateX(60deg) translateY(20%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          }}
        />
      </div>

      <div className="container-editorial relative grid lg:grid-cols-[1.05fr_1fr] gap-12 items-start">
        <div>
          {bloco.etiqueta && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-medium tracking-wide">
              <span className="size-1.5 rounded-full bg-brand-violet animate-pulse" />
              {bloco.etiqueta}
            </div>
          )}

          <h1 className="mt-7 text-[2rem] sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] sm:leading-[1.05]">
            <TextoMarcado texto={bloco.titulo} />
          </h1>

          {bloco.texto && <p className="mt-6 lead max-w-xl">{bloco.texto}</p>}

          {bullets.length > 0 && (
            <ul className="mt-7 space-y-2.5 sm:space-y-3 max-w-xl">
              {bullets.map((b, i) => (
                <li key={b.id ?? i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan shrink-0">
                    <IconeLucide nome={b.icone} className="size-4" />
                  </span>
                  <span className="text-sm text-foreground/85 leading-relaxed">{b.texto}</span>
                </li>
              ))}
            </ul>
          )}

          {selos.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {selos.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/10 bg-white/5 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="surface-card surface-card-feature p-5 sm:p-7">
            {cartao?.etiqueta && <p className="eyebrow text-brand-violet">{cartao.etiqueta}</p>}
            {cartao?.titulo && (
              <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-[-0.02em] leading-tight">
                {cartao.titulo}
              </h2>
            )}
            {cartao?.texto && <p className="mt-3 text-sm text-muted-foreground">{cartao.texto}</p>}
            <div className="mt-5 sm:mt-6">
              <CadastroHub formulario={bloco.formulario} contexto={contexto} padraoOrigem="hub-hero" padraoId="cadastro" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
