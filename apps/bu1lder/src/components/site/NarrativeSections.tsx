import { m as motion } from "framer-motion";
import { Quote } from "lucide-react";

/* ============ Section eyebrow — editorial chapter rubric ============ */

export function SectionEyebrow({
  number,
  label,
  align = "left",
  variant = "rule",
}: {
  number?: string;
  label: string;
  align?: "left" | "center";
  variant?: "rule" | "pill";
}) {
  if (variant === "pill") {
    return (
      <div
        className={`flex ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-medium tracking-wide">
          <span className="size-1.5 rounded-full bg-brand-cyan" />
          {label}
        </span>
      </div>
    );
  }
  return (
    <div
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
    >
      {number && (
        <span className="num text-brand-cyan text-xs font-semibold tracking-[0.18em]">
          {number}
        </span>
      )}
      {number && <span className="brand-divider !w-10" />}
      <span className="eyebrow text-brand-cyan/90">{label}</span>
    </div>
  );
}

/* ============ Chapter divider — editorial breath ============ */

export function Chapter({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <section className="relative section-pad" aria-hidden="true">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline gap-6 md:gap-12"
        >
          <span className="chapter-numeral">{number}</span>
          <span className="relative">
            <span className="brand-divider mb-4" />
            <span className="eyebrow text-foreground/80 block">
              Capítulo {number}
            </span>
            <span className="block mt-2 display-m text-foreground/90">
              {label}
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ ChapterBreak — full-bleed cinematic respiration ============ */

export function ChapterBreak({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section
      className="relative min-h-[60vh] flex items-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-brand-blue/12 [.light_&]:bg-brand-blue/8 blur-[170px] aurora-drift" />
      </div>
      <div className="container-editorial w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-end"
        >
          <span
            className="num font-semibold leading-[0.78] tracking-[-0.06em] select-none"
            style={{
              fontSize: "clamp(6rem, 16vw, 14rem)",
              color: "transparent",
              WebkitTextStroke: "1px oklch(0.82 0.14 210 / 0.35)",
            }}
          >
            {number}
          </span>
          <div className="pb-2 max-w-2xl">
            <span className="brand-divider mb-5" />
            <span className="eyebrow text-brand-cyan/90 block">
              Capítulo {number}
            </span>
            <h2 className="mt-3 display-l text-foreground/95">{title}</h2>
            {subtitle && (
              <p className="mt-4 lead">{subtitle}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ============ Manifesto — editorial breath after hero ============ */

export function ManifestoSection() {
  return (
    <section className="relative section-pad overflow-hidden">
      {/* Aurora backdrop */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-brand-blue/15 [.light_&]:bg-brand-blue/10 blur-[160px] aurora-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-violet/15 [.light_&]:bg-brand-violet/10 blur-[160px] aurora-drift" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="container-editorial max-w-5xl! text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow label="Manifesto" align="center" variant="pill" />
          <p className="mt-8 display-m text-foreground/95 max-w-4xl mx-auto">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            >
              Software não deveria ser estático.
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Cada processo é vivo — aprende com o contexto e evolui com quem opera.
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              É isso que chamamos de{" "}
              <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">
                software vivo
              </span>
              .
            </motion.span>
          </p>
          <div className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
            <span className="block h-px w-10 bg-brand-cyan/40" />
            Miind · Bu1lder
            <span className="block h-px w-10 bg-brand-cyan/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ Client logos band — credibility ============ */

const clients = [
  "Banco Vértice",
  "Aurora Saúde",
  "Latam Energia",
  "GrupoPlena",
  "Nexa Telecom",
  "Sintra Indústria",
];

export function ClientLogosSection() {
  return (
    <section className="relative section-pad-tight border-y border-foreground/5">
      <div className="container-editorial">
        <div className="eyebrow text-center mb-8">
          Empresas que constroem com a Miind
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center opacity-70">
          {clients.map((c) => (
            <div
              key={c}
              className="font-semibold text-base md:text-lg tracking-[-0.02em] text-foreground/70 hover:text-foreground transition-colors"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Impact metrics — editorial numbers (hero metric + secondary) ============ */

const heroMetric = { value: "12×", label: "ciclos de entrega mais rápidos vs. dev tradicional" };
const secondaryMetrics = [
  { value: "94%", label: "adoção pelas áreas de negócio em 90 dias" },
  { value: "60%", label: "redução média de custo operacional" },
  { value: "0", label: "incidentes de segurança em auditorias enterprise" },
];

export function MetricsSection() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/8 blur-[160px]" />
      </div>

      <div className="container-editorial">
        <div className="mb-16">
          <SectionEyebrow number="·" label="Impacto mensurável" />
          <h2 className="mt-4 display-l max-w-3xl">
            Números que{" "}
            <em className="italic font-normal text-gradient">comprovam</em>{" "}
            a operação.
          </h2>
        </div>

        {/* Hero metric — dominant */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end border-t border-foreground/10 pt-16"
        >
          <div>
            <div
              className="num font-semibold leading-[0.82] tracking-[-0.06em] bg-gradient-to-br from-foreground via-brand-cyan to-brand-violet bg-clip-text text-transparent"
              style={{ fontSize: "clamp(7rem, 17vw, 13rem)" }}
            >
              {heroMetric.value}
            </div>
            <div className="brand-divider mt-6" />
            <p className="mt-5 lead max-w-md">{heroMetric.label}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
            {secondaryMetrics.map((m) => (
              <div key={m.label} className="border-l border-foreground/10 pl-5">
                <div className="num font-semibold text-4xl md:text-5xl tracking-[-0.04em] leading-none text-foreground">
                  {m.value}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ Featured testimonial — single, editorial ============ */

export function TestimonialSection() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-cyan/10 blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-violet/10 blur-[140px] aurora-drift" />
      </div>

      <div className="container-editorial max-w-5xl!">
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Quote className="absolute -top-4 -left-2 size-16 md:size-24 text-brand-cyan/15" strokeWidth={1.5} />
          <blockquote className="relative display-m italic font-normal text-foreground/95">
            <span className="text-brand-cyan/60 not-italic">"</span>
            O Bu1lder mudou o ritmo da nossa transformação. O que antes
            levava trimestres em sprints de TI, agora a operação entrega em{" "}
            <span className="text-gradient">semanas</span> — com a mesma
            governança que nossa auditoria exige.
            <span className="text-brand-cyan/60 not-italic">"</span>
          </blockquote>

          <figcaption className="mt-10 flex items-center gap-4">
            <div className="size-12 rounded-full bg-gradient-to-br from-brand-cyan to-brand-violet grid place-items-center font-semibold text-background">
              MR
            </div>
            <div>
              <div className="font-semibold text-foreground">
                Mariana Resende
              </div>
              <div className="eyebrow !tracking-[0.18em] !normal-case text-sm text-muted-foreground">
                Head de Transformação Digital · Banco Vértice
              </div>
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
