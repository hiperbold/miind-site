import { trackLead } from "@/lib/analytics";
import { formatAttribution } from "@/lib/attribution";
import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Handshake,
  Loader2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import PageTransition from '@/components/PageTransition';
import Reveal from '@/components/effects/Reveal';
import BorderBeam from '@/components/effects/BorderBeam';
import SectionHeader from '@/components/home/SectionHeader';
import { useSeo } from '@/hooks/useSeo';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CONTACT_EMAIL, buildWhatsAppUrl } from '@/lib/contact';
import {
  BUILDER_SEGMENTS,
  BUILDER_STEPS,
  BUILDER_INTEREST_OPTIONS,
  type BuilderSegment,
} from '@/lib/buildersSegments';

const MARKET_ICONS = [TrendingUp, Workflow, Users, Sparkles, ShieldCheck];

const initialForm = {
  name: '',
  email: '',
  whatsapp: '',
  company: '',
  role: '',
  city: '',
  state: '',
  interest: BUILDER_INTEREST_OPTIONS[0],
  hasClients: '',
  clientsCount: '',
  message: '',
};

const BuilderSegmentPage = ({ segmentSlug }: { segmentSlug: string }) => {
  const segment: BuilderSegment | undefined = BUILDER_SEGMENTS[segmentSlug];
  const { toast } = useToast();
  const [data, setData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useSeo({
    title: segment?.seoTitle ?? 'Bu1lder Partners | MIIND',
    description: segment?.seoDescription ?? 'Programa de parceiros Bu1lder.',
  });

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl(
        `Olá! Quero ser parceiro Bu1lder no segmento de ${segment?.segment ?? ''}.`,
      ),
    [segment],
  );

  if (!segment) return <Navigate to="/" replace />;

  const set = (key: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setData((d) => ({ ...d, [key]: e.target.value }));

  const scrollToForm = (interest?: string) => {
    if (interest) setData((d) => ({ ...d, interest }));
    document.getElementById('builder-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !data.email.trim() || !data.whatsapp.trim()) {
      toast({
        title: 'Preencha nome, e-mail e WhatsApp',
        description: 'Esses campos são obrigatórios para continuarmos.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const message = `🤝 NOVO LEAD — BU1LDER PARTNERS (${segment.segment.toUpperCase()})

👤 Nome: ${data.name}
📧 E-mail: ${data.email}
📱 WhatsApp: ${data.whatsapp}
🏢 Empresa: ${data.company || '(não informado)'}
💼 Cargo/Atividade: ${data.role || '(não informado)'}
📍 Cidade/UF: ${data.city || '(não informado)'}${data.state ? ` / ${data.state}` : ''}
🎯 Perfil de interesse: ${data.interest}
🧾 Possui carteira de clientes no segmento: ${data.hasClients || '(não informado)'}
👥 Quantidade aproximada de clientes: ${data.clientsCount || '(não informado)'}

💬 Mensagem:
${data.message || '(sem mensagem)'}

Origem: Landing Page /builders/${segment.slug}
Jornada: ${data.interest.includes('contratar') ? 'Contratação direta' : 'Parceria comercial'}
Ação: Entrar em contato com o lead.`;

      throw new Error('Prévia de revisão: envio ainda não conectado.');
      const { error } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'contact-form-notification',
          recipientEmail: CONTACT_EMAIL,
          idempotencyKey: `builders-${segment.slug}-${id}`,
          templateData: {
            name: `[BU1LDER PARTNERS · ${segment.segment.toUpperCase()}] ${data.name}`,
            email: data.email,
            message: message + formatAttribution(),
          },
        },
      });
      if (error) throw error;
      trackLead({ form: 'builders', segment: segment.slug });

      setIsSuccess(true);
      setData(initialForm);
      toast({
        title: 'Cadastro enviado!',
        description: 'Nosso time entra em contato para conversar sobre a parceria.',
      });
    } catch {
      toast({
        title: 'Erro ao enviar cadastro',
        description: 'Tente novamente ou fale com a gente pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full h-11 px-4 rounded-lg bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all';

  return (
    <PageTransition>
      <div className="min-h-screen overflow-x-hidden font-sans bg-background text-foreground">
        <Navbar />
        <main id="main-content" className="pt-24 lg:pt-28">
          <Breadcrumb
            items={[
              { label: 'Bu1lder', href: '/#bu1lder' },
              { label: segment.segment },
            ]}
          />

          {/* 01 — HERO */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="section-frame relative overflow-hidden">
              <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
              <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" />
                <div className="absolute -bottom-32 -left-32 w-[26rem] h-[26rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
              </div>
              <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-14 sm:py-20 lg:py-24 max-w-4xl">
                <Reveal>
                  <div className="eyebrow mb-5"><span>{segment.hero.eyebrow}</span></div>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight">
                    {segment.hero.headline}
                  </h1>
                  <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {segment.hero.subheadline}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => scrollToForm(BUILDER_INTEREST_OPTIONS[0])}
                      className="group inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg text-sm font-semibold text-background bg-gradient-to-r from-brand-cyan to-brand-violet shadow-[0_8px_24px_-8px_hsl(var(--brand-cyan)/0.55)] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Quero ser parceiro Bu1lder
                      <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <button
                      onClick={() => scrollToForm(BUILDER_INTEREST_OPTIONS[3])}
                      className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg text-sm font-semibold glass text-foreground hover:border-brand-cyan/60 transition-all duration-200"
                    >
                      Quero conhecer as soluções
                    </button>
                  </div>
                  <p className="mt-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Uma iniciativa <span className="text-brand-cyan">MIIND</span> · Plataforma <span className="text-brand-violet">Bu1lder</span>
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 02 — OPORTUNIDADE DE MERCADO */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="section-frame">
              <div className="px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14">
                <SectionHeader index="02" label="Oportunidade" title={segment.market.title} lead={segment.market.lead} />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                  {segment.market.points.map((point, i) => {
                    const Icon = MARKET_ICONS[i % MARKET_ICONS.length];
                    return (
                      <Reveal key={i} delay={i * 0.06}>
                        <div className="signal-card p-6 h-full flex items-start gap-4">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass shrink-0">
                            <Icon className="w-5 h-5 text-brand-cyan" />
                          </div>
                          <p className="text-sm text-foreground/85 leading-relaxed pt-2">{point}</p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 03 — POR QUE SER PARCEIRO */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="section-frame">
              <div className="px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14">
                <SectionHeader index="03" label="Parceria" title={segment.whyPartner.title} lead={segment.whyPartner.lead} />
                <div className="grid sm:grid-cols-2 gap-5 mt-10">
                  {segment.whyPartner.benefits.map((b, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <div className="signal-card p-6 h-full group relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-violet/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                          <Handshake className="w-5 h-5 text-brand-violet mb-3" />
                          <h3 className="font-display text-lg font-semibold mb-2">{b.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 04 — O QUE VOCÊ PODERÁ OFERECER */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="section-frame">
              <div className="px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14">
                <SectionHeader index="04" label="Soluções" title={segment.solutions.title} lead={segment.solutions.lead} />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                  {segment.solutions.items.map((s, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <div className="signal-card p-6 h-full flex flex-col group relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex flex-col h-full">
                          <Bot className="w-5 h-5 text-brand-cyan mb-3" />
                          <h3 className="font-display text-base font-semibold mb-3">{s.name}</h3>
                          <div className="space-y-2.5 text-sm leading-relaxed flex-1">
                            <p><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">Problema</span><span className="text-foreground/85">{s.problem}</span></p>
                            <p><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">Benefício</span><span className="text-foreground/85">{s.benefit}</span></p>
                            <p><span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan/80 block mb-0.5">Na prática</span><span className="text-muted-foreground">{s.example}</span></p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <p className="mt-6 text-xs text-muted-foreground/80 leading-relaxed max-w-3xl">
                  {segment.solutions.disclaimer}
                </p>
              </div>
            </div>
          </section>

          {/* 05 — COMO FUNCIONA */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="section-frame">
              <div className="px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14">
                <SectionHeader index="05" label="Jornada" title="Como funciona a parceria?" lead="Um processo simples e transparente — proposto como jornada, sujeito à confirmação das condições do programa comercial." />
                <ol className="mt-10 space-y-4">
                  {BUILDER_STEPS.map((step, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <li className="signal-card p-5 sm:p-6 flex items-start gap-4 sm:gap-6">
                        <span className="font-display text-2xl sm:text-3xl font-semibold text-aurora leading-none shrink-0 w-12">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="font-display text-base sm:text-lg font-semibold mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                        <ChevronRight aria-hidden="true" className="w-4 h-4 text-brand-cyan mt-1.5 ml-auto hidden sm:block" />
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* 06 — QUEM ESTÁ POR TRÁS + ARGUMENTO */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="section-frame relative overflow-hidden">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 -left-32 w-[24rem] h-[24rem] rounded-full bg-brand-violet/12 blur-3xl aurora-drift" />
              </div>
              <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 grid lg:grid-cols-2 gap-8">
                <Reveal>
                  <div className="glass rounded-2xl p-8 h-full">
                    <div className="eyebrow mb-5"><span>Quem está por trás</span></div>
                    <h3 className="font-display text-2xl font-semibold mb-4">MIIND · Inteligência artificial corporativa</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                      {[
                        'Experiência em inteligência artificial aplicada a negócios',
                        'Tecnologia proprietária de agentes inteligentes e automações',
                        'Integração com sistemas empresariais',
                        'Governança e segurança em projetos corporativos',
                        'Capacidade de desenvolver soluções para diferentes mercados',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-brand-cyan mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="glass rounded-2xl p-8 h-full relative overflow-hidden">
                    <BorderBeam size={260} duration={9} />
                    <div className="eyebrow mb-5"><span>O argumento</span></div>
                    <h3 className="font-display text-2xl font-semibold mb-4">{segment.argument.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{segment.argument.text}</p>
                    {segment.complianceNote && (
                      <p className="mt-5 flex items-start gap-2.5 text-xs text-muted-foreground/90 leading-relaxed border-t border-border pt-4">
                        <ShieldCheck aria-hidden="true" className="w-4 h-4 text-brand-cyan mt-0.5 shrink-0" />
                        {segment.complianceNote}
                      </p>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 07 — PARA QUEM É */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="section-frame">
              <div className="px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14">
                <SectionHeader index="07" label="Perfis" title="Para quem é essa oportunidade?" lead="Identifique seu perfil e dê o próximo passo — o formulário já abre com a sua escolha." />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                  {segment.profiles.map((p, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <button
                        onClick={() => scrollToForm(p.interest)}
                        className="signal-card p-6 h-full w-full text-left group relative overflow-hidden"
                      >
                        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                          <Users className="w-5 h-5 text-brand-cyan mb-3" />
                          <h3 className="font-display text-base font-semibold mb-2">{p.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan">
                            Começar agora
                            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 08 — FORMULÁRIO */}
          <section id="builder-form" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 scroll-mt-24">
            <div className="section-frame relative overflow-hidden">
              <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
              <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 max-w-3xl mx-auto">
                <SectionHeader index="08" label="Cadastro" title="Vamos conversar?" lead="Preencha o formulário e nosso time entra em contato para apresentar o programa de parceiros Bu1lder." />

                {isSuccess ? (
                  <div className="mt-10 glass rounded-2xl p-8 text-center relative overflow-hidden">
                    <BorderBeam size={260} duration={9} />
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
                      <CheckCircle2 aria-hidden="true" className="w-9 h-9 text-brand-cyan" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">Cadastro enviado</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Recebemos seu interesse. Se preferir, acelere a conversa pelo WhatsApp.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 px-6 h-11 rounded-lg text-sm font-semibold text-background bg-gradient-to-r from-brand-cyan to-brand-violet hover:brightness-110 transition-all"
                    >
                      Falar no WhatsApp
                      <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-10 grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bf-name" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Nome completo *</label>
                      <input id="bf-name" required value={data.name} onChange={set('name')} className={inputCls} placeholder="Seu nome" />
                    </div>
                    <div>
                      <label htmlFor="bf-email" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">E-mail profissional *</label>
                      <input id="bf-email" type="email" required value={data.email} onChange={set('email')} className={inputCls} placeholder="voce@empresa.com" />
                    </div>
                    <div>
                      <label htmlFor="bf-whats" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">WhatsApp *</label>
                      <input id="bf-whats" required value={data.whatsapp} onChange={set('whatsapp')} className={inputCls} placeholder="(51) 99999-9999" />
                    </div>
                    <div>
                      <label htmlFor="bf-company" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Empresa</label>
                      <input id="bf-company" value={data.company} onChange={set('company')} className={inputCls} placeholder="Nome da empresa" />
                    </div>
                    <div>
                      <label htmlFor="bf-role" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Cargo ou atividade</label>
                      <input id="bf-role" value={data.role} onChange={set('role')} className={inputCls} placeholder="Ex.: consultor, sócio, representante" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="bf-city" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Cidade</label>
                        <input id="bf-city" value={data.city} onChange={set('city')} className={inputCls} placeholder="Cidade" />
                      </div>
                      <div>
                        <label htmlFor="bf-state" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Estado</label>
                        <input id="bf-state" value={data.state} onChange={set('state')} className={inputCls} placeholder="UF" maxLength={2} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bf-interest" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Perfil de interesse *</label>
                      <select id="bf-interest" value={data.interest} onChange={set('interest')} className={inputCls}>
                        {BUILDER_INTEREST_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bf-hasclients" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Possui carteira de clientes no segmento?</label>
                      <select id="bf-hasclients" value={data.hasClients} onChange={set('hasClients')} className={inputCls}>
                        <option value="">Selecione</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                        <option value="Estou começando">Estou começando</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bf-count" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Quantidade aproximada de clientes</label>
                      <input id="bf-count" value={data.clientsCount} onChange={set('clientsCount')} className={inputCls} placeholder="Ex.: 20" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bf-msg" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Mensagem (opcional)</label>
                      <textarea id="bf-msg" value={data.message} onChange={set('message')} rows={4} className={`${inputCls} h-auto py-3 resize-none`} placeholder="Conte um pouco sobre sua atuação no segmento" />
                    </div>
                    <div className="sm:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex items-center justify-center gap-2 px-8 h-12 rounded-lg text-sm font-semibold text-background bg-gradient-to-r from-brand-cyan to-brand-violet shadow-[0_8px_24px_-8px_hsl(var(--brand-cyan)/0.55)] hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 aria-hidden="true" className="w-4 h-4 animate-spin" />
                            Enviando…
                          </>
                        ) : (
                          <>
                            Quero ser parceiro Bu1lder
                            <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        Seus dados são usados apenas para o contato comercial, conforme nossa política de privacidade.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default BuilderSegmentPage;
