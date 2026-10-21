import { ArrowRight } from 'lucide-react'

import { PhoneMockup } from '@/components/bu1lder/PhoneMockup'
import { Reveal } from '@/components/bu1lder/Reveal'
import { IconeLucide } from '@/lib/icones'
import type { BlocoHeroCelular } from '@/payload-types'

import type { ContextoBloco } from '../contexto'

export function HeroCelularBloco({ bloco, contexto }: { bloco: BlocoHeroCelular; contexto: ContextoBloco }) {
  // Com a barra de segmentos o topo fica mais baixo, como na prévia estática.
  const espaco = contexto.comNavegacaoSegmentos ? 'pt-14 pb-16 lg:pt-20 lg:pb-24' : 'pt-24 pb-16 lg:pt-28 lg:pb-24'
  const mensagens = (bloco.celular?.mensagens ?? []).map((m) => ({
    from: m.de,
    text: m.texto,
    time: m.hora || undefined,
  }))
  const principal = bloco.botaoPrincipal
  const secundario = bloco.botaoSecundario

  return (
    <section className={`relative overflow-hidden ${espaco}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -z-20 top-[10%] -right-32 w-[560px] h-[560px] rounded-full bg-brand-violet/25 [.light_&]:bg-brand-violet/12 blur-[150px] aurora-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-20 top-[20%] -left-32 w-[480px] h-[480px] rounded-full bg-brand-cyan/20 [.light_&]:bg-brand-cyan/10 blur-[140px] aurora-drift"
        style={{ animationDelay: '-7s' }}
      />
      <div className="absolute -z-10 inset-x-0 bottom-0 h-[55%] [perspective:800px] pointer-events-none">
        <div
          className="absolute inset-0 grid-bg origin-top"
          style={{
            transform: 'rotateX(60deg) translateY(20%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          }}
        />
      </div>

      <div className="container-editorial relative grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <div>
          {bloco.etiqueta && (
            <Reveal>
              <div className="flex items-center gap-4 mb-7">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet text-background shadow-[0_14px_30px_-10px_oklch(0.65_0.22_295/0.5)]">
                  <IconeLucide nome={bloco.icone} padrao="Sparkles" className="size-6" />
                </span>
                <p className="eyebrow text-brand-violet">{bloco.etiqueta}</p>
              </div>
            </Reveal>
          )}

          <Reveal delay={80}>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-gradient">
              {bloco.titulo}
            </h1>
          </Reveal>

          {bloco.texto && (
            <Reveal delay={160}>
              <p className="mt-6 lead max-w-xl">{bloco.texto}</p>
            </Reveal>
          )}

          {bloco.linhaDecisor && (
            <Reveal delay={220}>
              {bloco.iconeDecisor ? (
                <p className="mt-5 text-sm text-brand-violet max-w-2xl inline-flex items-center gap-2">
                  <IconeLucide nome={bloco.iconeDecisor} className="size-4" />
                  {bloco.linhaDecisor}
                </p>
              ) : (
                <p className="mt-5 text-sm text-brand-violet max-w-2xl">{bloco.linhaDecisor}</p>
              )}
            </Reveal>
          )}

          {(principal?.texto || secundario?.texto) && (
            <Reveal delay={280}>
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                {principal?.texto && (
                  <a
                    href={principal.url || '#cadastro'}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-5 sm:px-6 h-12 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow"
                  >
                    {principal.texto} <ArrowRight className="size-4" />
                  </a>
                )}
                {secundario?.texto && (
                  <a
                    href={secundario.url || '#solucoes'}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-foreground/15 hover:border-brand-cyan/40 text-foreground font-medium px-5 h-12 w-full sm:w-auto transition-colors"
                  >
                    {secundario.texto}
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {mensagens.length > 0 && (
          <Reveal delay={120} className="lg:sticky lg:top-24">
            <PhoneMockup
              title={bloco.celular?.titulo || undefined}
              subtitle={bloco.celular?.subtitulo || undefined}
              messages={mensagens}
            />
          </Reveal>
        )}
      </div>
    </section>
  )
}
