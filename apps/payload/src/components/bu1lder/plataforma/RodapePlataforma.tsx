import type { Homepage } from '@/payload-types'

import { AnoAtual } from '../AnoAtual'
import { TextoMarcado } from './TextoMarcado'

// Porte do Footer da homepage (apps/bu1lder/src/components/site/Sections.tsx).
export function RodapePlataforma({ rodape }: { rodape: Homepage['rodape'] }) {
  const colunas = rodape?.colunas ?? []
  const assinatura = rodape?.assinatura ?? []
  return (
    <footer className="relative border-t border-border mt-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-brand-blue/8 blur-[160px]" />
      </div>

      <div className="container-editorial pt-20 pb-14">
        <div className="max-w-4xl">
          {rodape?.etiqueta && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide mb-6">
              <span className="size-1.5 rounded-full bg-brand-cyan" />
              {rodape.etiqueta}
            </span>
          )}
          {rodape?.frase && (
            <p className="display-m text-foreground/90">
              <TextoMarcado texto={rodape.frase} />
            </p>
          )}
          {rodape?.texto && <p className="mt-4 lead max-w-xl">{rodape.texto}</p>}
        </div>
      </div>

      <div className="container-editorial pb-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm border-t border-foreground/8 pt-12">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet grid place-items-center">
              <span className="font-bold text-sm text-background">B</span>
            </div>
            <span className="font-display font-semibold text-base tracking-tight">
              Bu<span className="text-brand-cyan">1</span>lder
              <span className="text-muted-foreground font-normal"> by Miind</span>
            </span>
          </div>
          {rodape?.descricaoMarca && (
            <p className="mt-4 text-muted-foreground text-xs leading-relaxed max-w-[260px]">{rodape.descricaoMarca}</p>
          )}
        </div>
        {colunas.map((col, i) => (
          <div key={col.id ?? i}>
            <div className="eyebrow mb-4 text-brand-cyan/80">{col.titulo}</div>
            <ul className="space-y-2.5">
              {(col.links ?? []).map((l, j) => (
                <li key={l.id ?? j}>
                  <a href={l.url} className="ink-link text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {l.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-foreground/8">
        <div className="container-editorial py-5 flex flex-col md:flex-row justify-between gap-2 eyebrow !text-[10px]">
          <div>
            © <AnoAtual anoDoServidor={new Date().getFullYear()} /> {rodape?.direitos}
          </div>
          {assinatura.length > 0 && (
            <div className="flex items-center gap-2">
              {assinatura.map((parte, i) => (
                <span key={`${i}-${parte}`} className="contents">
                  {i > 0 && <span className="size-1 rounded-full bg-brand-cyan/60" />}
                  {parte}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
