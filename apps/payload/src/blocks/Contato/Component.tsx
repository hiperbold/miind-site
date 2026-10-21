import { TextoMarcado } from '@/components/bu1lder/plataforma/TextoMarcado'
import { FormularioContato } from '@/components/bu1lder/plataforma/FormularioContato'
import type { BlocoContato } from '@/payload-types'

// Porte de FinalSection (Sections.tsx) com o ContactForm.
export function ContatoBloco({ bloco }: { bloco: BlocoContato }) {
  const itens = bloco.itens ?? []
  const form = bloco.formulario
  return (
    <section id={bloco.ancora || 'contato'} className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] rounded-full bg-brand-blue/12 blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full bg-brand-violet/10 blur-[140px] aurora-drift" />
      </div>
      <div className="relative container-editorial">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24 items-start">
          <div>
            {bloco.etiqueta && (
              <div className="inline-flex items-center gap-3 eyebrow text-brand-cyan/90 mb-6">
                <span className="brand-divider !w-10" />
                {bloco.etiqueta}
              </div>
            )}
            <h2 className="display-l">
              <TextoMarcado texto={bloco.titulo} />
            </h2>
            {bloco.texto && <p className="mt-6 lead max-w-md">{bloco.texto}</p>}

            {itens.length > 0 && (
              <div className="mt-10 space-y-4">
                {itens.map((item, i) => (
                  <div key={item.id ?? i} className="flex items-start gap-4 border-t border-foreground/10 pt-4">
                    <span className="size-1.5 rounded-full bg-brand-cyan mt-2 shrink-0 shadow-[0_0_12px_oklch(0.82_0.14_210/0.7)]" />
                    <div>
                      <div className="font-semibold text-foreground">{item.titulo}</div>
                      {item.texto && <div className="text-sm text-muted-foreground mt-0.5">{item.texto}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {bloco.citacao?.texto && (
              <div className="mt-12 pt-8 border-t border-foreground/10">
                <p className="display-m italic font-normal text-foreground/85 max-w-md">&quot;{bloco.citacao.texto}&quot;</p>
                {bloco.citacao.autor && (
                  <p className="mt-3 eyebrow !text-[10px] text-muted-foreground">{bloco.citacao.autor}</p>
                )}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28">
            <FormularioContato
              formId={`${bloco.ancora || 'contato'}-form`}
              opcoesVolume={(form?.opcoesVolume ?? []).map((o) => ({ valor: o.valor, rotulo: o.rotulo }))}
              aviso={form?.aviso ?? ''}
              textoBotao={form?.textoBotao || 'Enviar'}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
