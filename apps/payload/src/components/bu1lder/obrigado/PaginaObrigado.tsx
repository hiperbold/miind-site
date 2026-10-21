import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { BrandLockup } from '@/components/bu1lder/BrandLockup'
import { NicheFooter, type FooterLink } from '@/components/bu1lder/NicheFooter'
import { ThemeToggle } from '@/components/bu1lder/ThemeToggle'
import type { TyPage } from '@/payload-types'

import { EmbedAgenda, LeadObrigado } from './LeadObrigado'

// Página de obrigado (/bu1lder/ty-page). Conteúdo do global "ty-page"; título
// e texto podem variar pelo ?nicho=. Os dados do cadastro nunca vêm da URL:
// LeadObrigado lê o sessionStorage no navegador.
export function PaginaObrigado({
  conteudo,
  nicho,
  token,
  rodape,
}: {
  conteudo: TyPage
  nicho: string | null
  token: string | null
  rodape: { tituloLinks?: string | null; links: FooterLink[]; textoDireitos?: string | null }
}) {
  const variacao = nicho ? (conteudo.variacoes ?? []).find((v) => v.slug === nicho) : undefined
  const titulo = variacao?.titulo || conteudo.titulo
  const texto = variacao?.texto || conteudo.texto
  const passos = conteudo.proximosPassos ?? []
  const agenda = conteudo.agenda
  const urlAgenda = agenda?.url && /^https:\/\/[^\s"'<>]+$/.test(agenda.url) ? agenda.url : null
  const botao = conteudo.botao

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="border-b border-border/80">
        <div className="container-editorial flex items-center justify-between gap-2 h-14">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/bu1lder/parceiros" className="flex items-center gap-2 min-w-0 shrink">
            <BrandLockup />
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main id="conteudo" className="relative flex-1 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-brand-violet/12 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 top-1/3 -left-40 w-[460px] h-[460px] rounded-full bg-brand-cyan/10 blur-[140px]"
        />
        <div className="container-editorial section-pad grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
          <div className="max-w-xl">
            <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet text-background shadow-[0_14px_30px_-10px_oklch(0.65_0.22_295/0.5)]">
              <CheckCircle2 className="size-7" aria-hidden />
            </span>
            {conteudo.etiqueta && <p className="mt-7 eyebrow text-brand-violet">{conteudo.etiqueta}</p>}
            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08]">{titulo}</h1>
            {texto && <p className="mt-6 lead whitespace-pre-line">{texto}</p>}

            {passos.length > 0 && (
              <ol className="mt-10 grid gap-4">
                {passos.map((p, i) => (
                  <li key={p.id ?? i} className="surface-card p-5 flex items-start gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue text-background text-sm font-semibold font-mono">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{p.titulo}</p>
                      {p.texto && <p className="mt-1 text-sm text-muted-foreground">{p.texto}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {botao?.texto && botao.url && (
              <a
                href={botao.url}
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-6 h-12 shadow-[0_12px_30px_-10px_oklch(0.82_0.14_210/0.55)] transition-all"
              >
                {botao.texto} <ArrowRight className="size-4" />
              </a>
            )}
          </div>

          {agenda && (urlAgenda || agenda.embed?.trim()) && (
            <section aria-label={agenda.titulo || 'Agenda'} className="surface-card p-4 sm:p-6">
              {agenda.titulo && <h2 className="mb-4 text-xl font-semibold">{agenda.titulo}</h2>}
              {urlAgenda && (
                <iframe
                  src={urlAgenda}
                  title={agenda.titulo || 'Agenda'}
                  className="w-full rounded-lg border-0"
                  style={{ height: agenda.altura || 700 }}
                  loading="lazy"
                />
              )}
              {agenda.embed?.trim() && <EmbedAgenda html={agenda.embed} />}
            </section>
          )}
        </div>
      </main>

      <NicheFooter linksTitle={rodape.tituloLinks} links={rodape.links} rightsText={rodape.textoDireitos} />

      <LeadObrigado
        token={token}
        exporContato={Boolean(conteudo.exporContatoAosScripts)}
        scriptsBodyFim={conteudo.scriptsPersonalizados?.bodyFim}
      />
    </div>
  )
}
