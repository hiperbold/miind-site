'use client'

import { Loader2, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { CamposOcultos } from '@/components/bu1lder/CamposOcultos'
import { dispararLead, enviarFormulario, guardarContextoLead, urlObrigado } from '@/components/bu1lder/envio-formulario'
import { resetarTurnstile, Turnstile } from '@/components/bu1lder/Turnstile'
import { botaoClasses } from '@/components/ui/button'
import { EVENTO_CONTATO_PLATAFORMA } from '@/lib/cadastros/propriedades-lead'
import { cn } from '@/lib/utils'

// Porte de ContactForm (apps/bu1lder/src/components/site/ContactForm.tsx), com
// as mesmas regras de validação. Envia para /bu1lder/api/cadastros/enviar, que
// valida de novo, grava e envia ao n8n. Sucesso: página de obrigado. Falha:
// mostra o erro real do servidor, nunca simula sucesso.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CLASSE_INPUT =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
const CLASSE_TEXTAREA =
  'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
const CLASSE_SELECT =
  'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

type Campo = 'name' | 'company' | 'role' | 'email' | 'phone' | 'volume' | 'challenge' | 'consent'

export function validarContato(d: Record<Campo, string>): Partial<Record<Campo, string>> {
  const e: Partial<Record<Campo, string>> = {}
  const t = (v: string) => v.trim()
  if (t(d.name).length < 2 || t(d.name).length > 100) e.name = 'Informe seu nome'
  if (t(d.company).length < 2 || t(d.company).length > 100) e.company = 'Informe a empresa'
  if (t(d.role).length < 2 || t(d.role).length > 100) e.role = 'Informe seu cargo'
  if (!EMAIL_RE.test(t(d.email)) || t(d.email).length > 255) e.email = 'E-mail inválido'
  if (t(d.phone).length < 8 || t(d.phone).length > 30) e.phone = 'Telefone inválido'
  if (t(d.challenge).length < 10 || t(d.challenge).length > 1000) e.challenge = 'Descreva o desafio'
  if (!d.volume) e.volume = 'Selecione uma opção'
  if (d.consent !== 'on') e.consent = 'Confirme o consentimento LGPD'
  return e
}

export function FormularioContato({
  pagina,
  formId,
  opcoesVolume,
  aviso,
  textoBotao,
  textoConsentimento,
  turnstileSiteKey,
}: {
  // 'homepage' ou 'parceiros'; vai como ?nicho= na página de obrigado
  pagina: string
  formId: string
  textoConsentimento: string
  turnstileSiteKey?: string | null
  opcoesVolume: { valor: string; rotulo: string }[]
  aviso: string
  textoBotao: string
}) {
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({})
  const [falha, setFalha] = useState<string | null>(null)
  const [volume, setVolume] = useState('')
  const [enviando, setEnviando] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (enviando) return
    setFalha(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const dados = Object.fromEntries(
      (['name', 'company', 'role', 'email', 'phone', 'volume', 'challenge', 'consent'] as Campo[]).map((c) => [
        c,
        String(fd.get(c) ?? ''),
      ]),
    ) as Record<Campo, string>
    const novos = validarContato(dados)
    setErros(novos)
    if (Object.keys(novos).length > 0) return
    setEnviando(true)
    const { resposta, campos } = await enviarFormulario(form, { pagina, formulario: formId })
    if (!resposta.ok) {
      setErros((resposta.erros ?? {}) as Partial<Record<Campo, string>>)
      setFalha(resposta.erro)
      setEnviando(false)
      resetarTurnstile(form)
      return
    }
    guardarContextoLead({
      token: resposta.token,
      eventId: resposta.eventId,
      nicho: pagina,
      pagina,
      formulario: formId,
      tipo: 'contato-plataforma',
      campos,
      contato: { nome: dados.name, email: dados.email, whatsapp: dados.phone },
    })
    // não é o lead (conversão primária é o cadastro Bu1lder): chave própria,
    // mesmo event_id do servidor; sem Evento com essa chave, nada sai
    await dispararLead(resposta.eventId, pagina, campos, EVENTO_CONTATO_PLATAFORMA)
    // o botão continua em "Enviando..." até a página de obrigado abrir
    router.push(urlObrigado(pagina, resposta.token))
  }

  const idErro = (c: Campo) => `${formId}-${c}-erro`
  const props = (c: Campo) => ({
    id: `${formId}-${c}`,
    name: c,
    'aria-invalid': Boolean(erros[c]) || undefined,
    'aria-describedby': erros[c] ? idErro(c) : undefined,
  })

  return (
    <div className="relative rounded-2xl glass p-6 md:p-8 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-violet/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-cyan/20 blur-3xl rounded-full" />

      <form id={formId} onSubmit={onSubmit} aria-busy={enviando || undefined} className="relative grid md:grid-cols-2 gap-4" noValidate>
        <CamposOcultos formId={formId} />
        <CampoRotulado rotulo="Nome" htmlFor={`${formId}-name`} erro={erros.name} idErro={idErro('name')}>
          <input {...props('name')} placeholder="Seu nome" className={CLASSE_INPUT} />
        </CampoRotulado>
        <CampoRotulado rotulo="Empresa" htmlFor={`${formId}-company`} erro={erros.company} idErro={idErro('company')}>
          <input {...props('company')} placeholder="Nome da empresa" className={CLASSE_INPUT} />
        </CampoRotulado>
        <CampoRotulado rotulo="Cargo" htmlFor={`${formId}-role`} erro={erros.role} idErro={idErro('role')}>
          <input {...props('role')} placeholder="Seu cargo" className={CLASSE_INPUT} />
        </CampoRotulado>
        <CampoRotulado rotulo="E-mail corporativo" htmlFor={`${formId}-email`} erro={erros.email} idErro={idErro('email')}>
          <input {...props('email')} type="email" placeholder="voce@empresa.com" className={CLASSE_INPUT} />
        </CampoRotulado>
        <CampoRotulado rotulo="Telefone / WhatsApp" htmlFor={`${formId}-phone`} erro={erros.phone} idErro={idErro('phone')}>
          <input {...props('phone')} placeholder="+55 (11) 9 0000-0000" className={CLASSE_INPUT} />
        </CampoRotulado>
        <CampoRotulado rotulo="Volume / colaboradores" htmlFor={`${formId}-volume`} erro={erros.volume} idErro={idErro('volume')}>
          <select
            {...props('volume')}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={cn(CLASSE_SELECT, !volume && 'text-muted-foreground')}
          >
            <option value="" disabled hidden>
              Selecione
            </option>
            {opcoesVolume.map((o) => (
              <option key={o.valor} value={o.valor} className="bg-background text-foreground">
                {o.rotulo}
              </option>
            ))}
          </select>
        </CampoRotulado>
        <div className="md:col-span-2">
          <CampoRotulado rotulo="Principal desafio" htmlFor={`${formId}-challenge`} erro={erros.challenge} idErro={idErro('challenge')}>
            <textarea
              {...props('challenge')}
              rows={4}
              placeholder="Conte qual processo, jornada ou operação você quer transformar com IA."
              className={CLASSE_TEXTAREA}
            />
          </CampoRotulado>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="consent"
              required
              aria-required="true"
              aria-invalid={Boolean(erros.consent) || undefined}
              aria-describedby={erros.consent ? idErro('consent') : undefined}
              className="mt-1 size-4 rounded border-input"
            />
            <span>
              {textoConsentimento} <span className="opacity-70">(obrigatório)</span>
            </span>
          </label>
          {erros.consent && (
            <p id={idErro('consent')} role="alert" className="mt-1 text-[11px] text-destructive">
              {erros.consent}
            </p>
          )}
        </div>

        <Turnstile siteKey={turnstileSiteKey} />

        {falha && (
          <p role="alert" className="md:col-span-2 text-sm text-brand-violet">
            {falha}
          </p>
        )}

        <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {aviso && <p className="text-xs text-muted-foreground">{aviso}</p>}
          <button
            type="submit"
            disabled={enviando}
            className={botaoClasses({
              size: 'lg',
              className:
                'bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-90 shadow-[0_10px_40px_-10px_oklch(0.82_0.14_210/0.6)]',
            })}
          >
            {enviando ? (
              <>
                <Loader2 className="mr-1 size-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                {textoBotao} <Send className="ml-1 size-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

function CampoRotulado({
  rotulo,
  htmlFor,
  erro,
  idErro,
  children,
}: {
  rotulo: string
  htmlFor: string
  erro?: string
  idErro: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium leading-none text-muted-foreground">
        {rotulo}
      </label>
      {children}
      {erro && (
        <p id={idErro} className="text-[11px] text-destructive">
          {erro}
        </p>
      )}
    </div>
  )
}
