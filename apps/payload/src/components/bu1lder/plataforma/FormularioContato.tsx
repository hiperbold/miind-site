'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

import { botaoClasses } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Porte de ContactForm (apps/bu1lder/src/components/site/ContactForm.tsx), com
// as mesmas regras de validação. Nesta fase não há envio: ao validar, mostra a
// falha explícita da prévia e nunca simula sucesso (o envio real é a fase 3).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MENSAGEM_SEM_ENVIO = 'Prévia de revisão: formulário ainda não conectado. Nenhum contato foi enviado.'

const CLASSE_INPUT =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
const CLASSE_TEXTAREA =
  'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
const CLASSE_SELECT =
  'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

type Campo = 'name' | 'company' | 'role' | 'email' | 'phone' | 'volume' | 'challenge'

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
  return e
}

export function FormularioContato({
  formId,
  opcoesVolume,
  aviso,
  textoBotao,
}: {
  formId: string
  opcoesVolume: { valor: string; rotulo: string }[]
  aviso: string
  textoBotao: string
}) {
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({})
  const [falha, setFalha] = useState<string | null>(null)
  const [volume, setVolume] = useState('')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFalha(null)
    const fd = new FormData(e.currentTarget)
    const dados = Object.fromEntries(
      (['name', 'company', 'role', 'email', 'phone', 'volume', 'challenge'] as Campo[]).map((c) => [
        c,
        String(fd.get(c) ?? ''),
      ]),
    ) as Record<Campo, string>
    const novos = validarContato(dados)
    setErros(novos)
    if (Object.keys(novos).length > 0) return
    setFalha(MENSAGEM_SEM_ENVIO)
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

      <form id={formId} onSubmit={onSubmit} className="relative grid md:grid-cols-2 gap-4" noValidate>
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

        {falha && (
          <p role="alert" className="md:col-span-2 text-sm text-brand-violet">
            {falha}
          </p>
        )}

        <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {aviso && <p className="text-xs text-muted-foreground">{aviso}</p>}
          <button
            type="submit"
            className={botaoClasses({
              size: 'lg',
              className:
                'bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-90 shadow-[0_10px_40px_-10px_oklch(0.82_0.14_210/0.6)]',
            })}
          >
            {textoBotao} <Send className="ml-1 size-4" />
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
