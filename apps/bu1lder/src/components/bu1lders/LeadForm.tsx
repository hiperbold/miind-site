import { useState } from "react";

import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";

import { niches, PERFIL_OPTIONS } from "@/data/niches";

const clientSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  email: z.string().trim().email("E-mail inválido"),
  whatsapp: z.string().trim().min(8, "WhatsApp inválido"),
  cidade_uf: z.string().trim().min(2, "Cidade/UF obrigatória"),
  segmento: z.string().optional(),
  perfil: z.string().optional(),
  consent: z.literal(true, { message: "Confirme o consentimento LGPD" }),
});

export function LeadForm({
  origem = "hub",
  defaultSegmento,
  formId = "cadastro",
  profileOptions = PERFIL_OPTIONS,
}: {
  formId?: string;
  profileOptions?: readonly string[];
  origem?: string;
  defaultSegmento?: string;
}) {
  const submit = async (_data: unknown) => {
    throw new Error("Prévia de revisão: o cadastro ainda não está conectado.");
  };
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const raw = {
      nome: String(fd.get("nome") || ""),
      email: String(fd.get("email") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
      cidade_uf: String(fd.get("cidade_uf") || ""),
      segmento: defaultSegmento ?? String(fd.get("segmento") || ""),
      perfil: String(fd.get("perfil") || ""),
      consent: fd.get("consent") === "on" ? true : false,
    };
    const parsed = clientSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await submit({
        data: {
          ...parsed.data,
          segmento: parsed.data.segmento || null,
          perfil: parsed.data.perfil || null,
          origem,
        },
      });
      setDone(true);
    } catch (err) {
      console.error(err);
      setServerError(
        "Prévia de revisão: este formulário ainda não está conectado. Nenhum cadastro foi enviado.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div
        id={formId}
        className="surface-card surface-card-feature p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto size-12 text-brand-mint" />
        <h3 className="mt-4 text-2xl font-semibold text-foreground">Recebemos seu cadastro!</h3>
        <p className="mt-2 text-muted-foreground">
          Em breve nossa equipe entra em contato pelo WhatsApp para os próximos passos.
        </p>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={onSubmit} noValidate className="surface-card p-6 sm:p-8 grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nome completo" name="nome" error={errors.nome} required />
        <Field label="E-mail" name="email" type="email" error={errors.email} required />
        <Field
          label="WhatsApp"
          name="whatsapp"
          error={errors.whatsapp}
          placeholder="(00) 00000-0000"
          required
        />
        <Field
          label="Cidade / UF"
          name="cidade_uf"
          error={errors.cidade_uf}
          placeholder="Belo Horizonte / MG"
          required
        />
      </div>

      <div className={defaultSegmento ? "grid gap-4" : "grid sm:grid-cols-2 gap-4"}>
        {defaultSegmento ? (
          <input type="hidden" name="segmento" value={defaultSegmento} />
        ) : (
          <SelectField
            label="Segmento de interesse"
            name="segmento"
            defaultValue=""
            options={[
              { value: "", label: "Mais de um / ainda não sei" },
              { value: "agencia-marketing", label: "Agência de marketing" },
              ...niches.map((n) => ({ value: n.slug, label: shortName(n.name) })),
            ]}
          />
        )}
        <SelectField
          label="Seu perfil"
          name="perfil"
          options={[
            { value: "", label: "Selecione…" },
            ...profileOptions.map((p) => ({ value: p, label: p })),
          ]}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 size-4 rounded border-white/20 bg-white/5 text-brand-cyan focus:ring-brand-cyan/40"
        />
        <span>
          Autorizo o contato da MIIND/Bu1lder sobre o programa.{" "}
          <span className="opacity-70">(obrigatório)</span>
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
        {loading ? "Enviando…" : "Quero ser um Bu1lder"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
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
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 h-11 text-sm text-foreground focus:outline-none focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-background text-foreground">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function shortName(name: string) {
  return name.split(/,/)[0].trim();
}
