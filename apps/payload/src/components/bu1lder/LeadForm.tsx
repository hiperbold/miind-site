'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export type ExtraQuestion = {
  label: string
  name: string
  type: 'unica' | 'multipla'
  options: string[]
  required?: boolean | null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Porte de LeadForm. Nesta fase o formulário só valida no navegador: o envio
// real entra na fase 3. Ao enviar, mostra a falha explícita da prévia e nunca
// simula sucesso.
export function LeadForm({
  origem,
  segmento,
  formId = 'cadastro',
  profileOptions,
  extraQuestions = [],
  consentText,
  secondaryButton,
}: {
  origem: string
  segmento: string
  formId?: string
  profileOptions: string[]
  extraQuestions?: ExtraQuestion[]
  consentText: string
  secondaryButton?: { text: string; url: string } | null
}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerError(null)
    const fd = new FormData(e.currentTarget)
    const raw = {
      nome: String(fd.get('nome') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      whatsapp: String(fd.get('whatsapp') || '').trim(),
      cidade_uf: String(fd.get('cidade_uf') || '').trim(),
      segmento,
      perfil: String(fd.get('perfil') || ''),
      consent: fd.get('consent') === 'on',
    }
    const errs: Record<string, string> = {}
    if (raw.nome.length < 2) errs.nome = 'Informe seu nome'
    if (!EMAIL_RE.test(raw.email)) errs.email = 'E-mail inválido'
    if (raw.whatsapp.length < 8) errs.whatsapp = 'WhatsApp inválido'
    if (raw.cidade_uf.length < 2) errs.cidade_uf = 'Cidade/UF obrigatória'
    const extras: Record<string, string | string[]> = {}
    for (const q of extraQuestions) {
      const values = fd.getAll(q.name).map(String).filter(Boolean)
      extras[q.name] = q.type === 'multipla' ? values : (values[0] ?? '')
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
    // Fase 3: enviar { ...raw, extras, origem } para a API e gravar em `cadastros`.
    // Até lá, falha explícita: nada é enviado e nada é simulado.
    void extras
    void origem
    setLoading(false)
    setServerError('Prévia de revisão: este formulário ainda não está conectado. Nenhum cadastro foi enviado.')
  }

  return (
    <form id={formId} onSubmit={onSubmit} noValidate className="surface-card p-6 sm:p-8 grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nome completo" name="nome" error={errors.nome} required />
        <Field label="E-mail" name="email" type="email" error={errors.email} required />
        <Field label="WhatsApp" name="whatsapp" error={errors.whatsapp} placeholder="(00) 00000-0000" required />
        <Field
          label="Cidade / UF"
          name="cidade_uf"
          error={errors.cidade_uf}
          placeholder="Belo Horizonte / MG"
          required
        />
      </div>

      <div className="grid gap-4">
        <input type="hidden" name="segmento" value={segmento} />
        <SelectField
          label="Seu perfil"
          name="perfil"
          options={[{ value: '', label: 'Selecione…' }, ...profileOptions.map((p) => ({ value: p, label: p }))]}
        />
        {extraQuestions.map((q) =>
          q.type === 'multipla' ? (
            <CheckboxGroup key={q.name} question={q} error={errors[q.name]} />
          ) : (
            <SelectField
              key={q.name}
              label={q.label}
              name={q.name}
              required={Boolean(q.required)}
              error={errors[q.name]}
              options={[{ value: '', label: 'Selecione…' }, ...q.options.map((o) => ({ value: o, label: o }))]}
            />
          ),
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 size-4 rounded border-white/20 bg-white/5 text-brand-cyan focus:ring-brand-cyan/40"
        />
        <span>
          {consentText} <span className="opacity-70">(obrigatório)</span>
        </span>
      </label>
      {errors.consent && <p className="text-xs text-brand-violet -mt-2">{errors.consent}</p>}

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
        {loading ? 'Enviando…' : 'Quero ser um Bu1lder'}
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
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  error?: string
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
        aria-invalid={Boolean(error) || undefined}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 h-11 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/20"
      />
      {error && <span className="text-xs text-brand-violet">{error}</span>}
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
  required,
  error,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  required?: boolean
  error?: string
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
        aria-invalid={Boolean(error) || undefined}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 h-11 text-sm text-foreground focus:outline-none focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-background text-foreground">
            {o.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-brand-violet">{error}</span>}
    </label>
  )
}

function CheckboxGroup({ question, error }: { question: ExtraQuestion; error?: string }) {
  return (
    <fieldset className="grid gap-2" aria-invalid={Boolean(error) || undefined}>
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
      {error && <span className="text-xs text-brand-violet">{error}</span>}
    </fieldset>
  )
}
