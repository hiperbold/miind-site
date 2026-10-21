'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { CamposOcultos } from './CamposOcultos'
import { enviarFormulario, guardarContextoLead, urlObrigado } from './envio-formulario'

export type ExtraQuestion = {
  label: string
  name: string
  type: 'unica' | 'multipla'
  options: string[]
  required?: boolean | null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Porte de LeadForm. Valida no navegador e envia para o servidor
// (/bu1lder/api/cadastros/enviar), que valida de novo pela configuração
// publicada, grava o cadastro e o envia ao n8n. Sucesso: leva à página de
// obrigado. Falha: mostra o erro real do servidor, nunca simula sucesso.
export function LeadForm({
  pagina,
  tipo,
  segmento,
  formId = 'cadastro',
  profileOptions,
  extraQuestions = [],
  consentText,
  secondaryButton,
  perfilRequired = true,
  segmentSelect,
}: {
  // slug da página (LP) ou "parceiros"/"homepage"; vai como ?nicho= na página de obrigado
  pagina: string
  tipo: 'lp' | 'hub'
  segmento: string
  formId?: string
  profileOptions: string[]
  extraQuestions?: ExtraQuestion[]
  consentText: string
  secondaryButton?: { text: string; url: string } | null
  // Perfil obrigatório (LPs). No programa de parceiros, como na prévia, é opcional.
  perfilRequired?: boolean
  // Seletor de segmento visível (programa de parceiros). Sem ele, o segmento é
  // o campo oculto `segmento` (LPs).
  segmentSelect?: { label: string; emptyLabel: string; options: { value: string; label: string }[] }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const errId = (name: string) => `${formId}-${name}-erro`

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return
    setServerError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const raw = {
      nome: String(fd.get('nome') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      whatsapp: String(fd.get('whatsapp') || '').trim(),
      cidade_uf: String(fd.get('cidade_uf') || '').trim(),
      perfil: String(fd.get('perfil') || ''),
      consent: fd.get('consent') === 'on',
    }
    const errs: Record<string, string> = {}
    if (raw.nome.length < 2) errs.nome = 'Informe seu nome'
    if (!EMAIL_RE.test(raw.email)) errs.email = 'E-mail inválido'
    if (raw.whatsapp.length < 8) errs.whatsapp = 'WhatsApp inválido'
    if (raw.cidade_uf.length < 2) errs.cidade_uf = 'Cidade/UF obrigatória'
    if (perfilRequired && !raw.perfil) errs.perfil = 'Selecione seu perfil'
    for (const q of extraQuestions) {
      const values = fd.getAll(q.name).map(String).filter(Boolean)
      if (q.required && values.length === 0) {
        errs[q.name] = q.type === 'multipla' ? 'Marque ao menos uma opção' : 'Selecione uma opção'
      }
    }
    if (!raw.consent) errs.consent = 'Confirme o consentimento LGPD'
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    const { resposta, campos } = await enviarFormulario(form, { pagina, formulario: formId })
    if (!resposta.ok) {
      setErrors(resposta.erros ?? {})
      setServerError(resposta.erro)
      setLoading(false)
      return
    }
    guardarContextoLead({
      token: resposta.token,
      eventId: resposta.eventId,
      nicho: pagina,
      pagina,
      formulario: formId,
      tipo,
      campos,
      contato: { nome: raw.nome, email: raw.email, whatsapp: raw.whatsapp },
    })
    // o botão continua em "Enviando..." até a página de obrigado abrir
    router.push(urlObrigado(pagina, resposta.token))
  }

  return (
    <form id={formId} onSubmit={onSubmit} noValidate aria-busy={loading || undefined} className="relative surface-card p-6 sm:p-8 grid gap-4">
      <CamposOcultos formId={formId} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nome completo" name="nome" error={errors.nome} errorId={errId('nome')} required />
        <Field label="E-mail" name="email" type="email" error={errors.email} errorId={errId('email')} required />
        <Field
          label="WhatsApp"
          name="whatsapp"
          error={errors.whatsapp}
          errorId={errId('whatsapp')}
          placeholder="(00) 00000-0000"
          required
        />
        <Field
          label="Cidade / UF"
          name="cidade_uf"
          error={errors.cidade_uf}
          errorId={errId('cidade_uf')}
          placeholder="Belo Horizonte / MG"
          required
        />
      </div>

      <div className={segmentSelect ? 'grid sm:grid-cols-2 gap-4' : 'grid gap-4'}>
        {segmentSelect ? (
          <SelectField
            label={segmentSelect.label}
            name="segmento"
            errorId={errId('segmento')}
            options={[{ value: '', label: segmentSelect.emptyLabel }, ...segmentSelect.options]}
          />
        ) : (
          <input type="hidden" name="segmento" value={segmento} />
        )}
        <SelectField
          label="Seu perfil"
          name="perfil"
          required={perfilRequired}
          error={errors.perfil}
          errorId={errId('perfil')}
          options={[{ value: '', label: 'Selecione…' }, ...profileOptions.map((p) => ({ value: p, label: p }))]}
        />
        {extraQuestions.map((q) =>
          q.type === 'multipla' ? (
            <CheckboxGroup key={q.name} question={q} error={errors[q.name]} errorId={errId(q.name)} />
          ) : (
            <SelectField
              key={q.name}
              label={q.label}
              name={q.name}
              required={Boolean(q.required)}
              error={errors[q.name]}
              errorId={errId(q.name)}
              options={[{ value: '', label: 'Selecione…' }, ...q.options.map((o) => ({ value: o, label: o }))]}
            />
          ),
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.consent) || undefined}
          aria-describedby={errors.consent ? errId('consent') : undefined}
          className="mt-1 size-4 rounded border-white/20 bg-white/5 text-brand-cyan focus:ring-brand-cyan/40"
        />
        <span>
          {consentText} <span className="opacity-70">(obrigatório)</span>
        </span>
      </label>
      {errors.consent && (
        <p id={errId('consent')} role="alert" className="text-xs text-brand-violet -mt-2">
          {errors.consent}
        </p>
      )}

      {serverError && (
        <p className="text-sm text-brand-violet" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue text-background font-semibold px-6 h-12 shadow-[0_12px_30px_-10px_oklch(0.82_0.14_210/0.55)] hover:shadow-[0_16px_40px_-12px_oklch(0.82_0.14_210/0.7)] motion-safe:hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {loading ? 'Enviando...' : 'Quero ser um Bu1lder'}
      </button>
      {secondaryButton?.text && secondaryButton.url && (
        <a
          href={secondaryButton.url}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 hover:border-brand-cyan/40 text-foreground font-medium px-6 h-12 transition-colors"
        >
          {secondaryButton.text}
        </a>
      )}
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  error,
  errorId,
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  error?: string
  errorId: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand-cyan ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 h-11 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/20"
      />
      {error && (
        <span id={errorId} role="alert" className="text-xs text-brand-violet">
          {error}
        </span>
      )}
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
  required,
  error,
  errorId,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  required?: boolean
  error?: string
  errorId: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand-cyan ml-1">*</span>}
      </span>
      <select
        name={name}
        defaultValue=""
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 h-11 text-sm text-foreground focus:outline-none focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-background text-foreground">
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} role="alert" className="text-xs text-brand-violet">
          {error}
        </span>
      )}
    </label>
  )
}

function CheckboxGroup({ question, error, errorId }: { question: ExtraQuestion; error?: string; errorId: string }) {
  return (
    <fieldset
      className="grid gap-2"
      aria-required={question.required || undefined}
      aria-invalid={Boolean(error) || undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="mb-1.5 text-sm font-medium text-foreground">
        {question.label}
        {question.required && <span className="text-brand-cyan ml-1">*</span>}
      </legend>
      <div className="grid sm:grid-cols-2 gap-2">
        {question.options.map((o) => (
          <label key={o} className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name={question.name}
              value={o}
              className="mt-1 size-4 rounded border-white/20 bg-white/5 text-brand-cyan focus:ring-brand-cyan/40"
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {error && (
        <span id={errorId} role="alert" className="text-xs text-brand-violet">
          {error}
        </span>
      )}
    </fieldset>
  )
}
