import { trackLead } from "@/lib/analytics";
import { formatAttribution } from "@/lib/attribution";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Sparkles,
  Brain,
  ShieldCheck,
  Workflow,
  Target,
  Map,
  TrendingUp,
  Bot,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import Reveal from '@/components/effects/Reveal';
import BorderBeam from '@/components/effects/BorderBeam';
import Particles from '@/components/effects/Particles';
import SectionHeader from '@/components/home/SectionHeader';
import { useSeo } from '@/hooks/useSeo';
import { CONTACT_EMAIL, WHATSAPP_GRAMADO } from '@/lib/contact';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

type FormState = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  segment: string;
};

const initialForm: FormState = { name: '', company: '', email: '', whatsapp: '', segment: '' };

const formatWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const LeadForm: React.FC<{ formId: string }> = ({ formId }) => {
  const { toast } = useToast();
  const [data, setData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const next = name === 'whatsapp' ? formatWhatsapp(value) : value;
    setData((prev) => ({ ...prev, [name]: next }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name as keyof FormState];
        return n;
      });
    }
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) next.name = 'Informe seu nome';
    if (!data.email.trim()) next.email = 'Informe seu e-mail';
    else if (!/\S+@\S+\.\S+/.test(data.email)) next.email = 'E-mail inválido';
    const digits = data.whatsapp.replace(/\D/g, '');
    if (digits.length < 10) next.whatsapp = 'WhatsApp inválido';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const message = `🎯 NOVO LEAD — GRAMADO SUMMIT 2026

👤 Nome: ${data.name}
🏢 Empresa: ${data.company || '(não informado)'}
📧 E-mail: ${data.email}
📱 WhatsApp: ${data.whatsapp}
🏷️ Segmento: ${data.segment || '(não informado)'}

Origem: Landing Page /gramado
Oferta: Consultoria gratuita exclusiva Gramado Summit
Ação: Entrar em contato em até 48h.`;

      throw new Error('Prévia de revisão: envio ainda não conectado.');
      const { error } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'contact-form-notification',
          recipientEmail: CONTACT_EMAIL,
          idempotencyKey: `gramado-${id}`,
          templateData: {
            name: `[GRAMADO SUMMIT] ${data.name}`,
            email: data.email,
            message: message + formatAttribution(),
          },
        },
      });
      if (error) throw error;
      trackLead({ form: 'gramado' });

      setIsSuccess(true);
      setData(initialForm);
      toast({
        title: 'Cadastro confirmado!',
        description: 'Nosso time entra em contato em até 48h.',
      });
    } catch (err) {
      toast({
        title: 'Erro ao enviar cadastro',
        description: 'Tente novamente ou fale com a gente pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bento-card rounded-2xl p-8 text-center relative overflow-hidden">
        <BorderBeam size={260} duration={9} />
        <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
          <CheckCircle2 aria-hidden="true" className="w-9 h-9 text-brand-cyan" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">Cadastro confirmado</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Nosso time entra em contato em até <strong className="text-foreground">48 horas</strong> para agendar
          sua consultoria gratuita.
        </p>
        <a
          href={WHATSAPP_GRAMADO}
          target="_blank"
          rel="noopener noreferrer"
          className="command-button w-full justify-center"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Falar agora pelo WhatsApp
        </a>
      </div>
    );
  }

  const fieldCls = (hasError?: boolean) =>
    `w-full pl-10 pr-4 py-3 rounded-lg bg-surface-2/60 border text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan/50 ${
      hasError ? 'border-destructive' : 'border-border'
    }`;

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="bento-card rounded-2xl p-6 lg:p-7 relative overflow-hidden"
    >
      <BorderBeam size={320} duration={12} />
      <div className="mb-5">
        <div className="blue-chip mb-3">
          <Sparkles aria-hidden="true" className="w-3 h-3" />
          CONSULTORIA GRATUITA
        </div>
        <h3 className="font-display text-lg lg:text-xl font-semibold text-foreground leading-tight">
          Garanta sua vaga
        </h3>
        <p className="text-xs text-muted-foreground mt-1">Preencha em 30 segundos. Sem compromisso.</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <User aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Seu nome *"
            className={fieldCls(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="relative">
          <Building2 aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            name="company"
            value={data.company}
            onChange={handleChange}
            placeholder="Empresa"
            className={fieldCls()}
          />
        </div>

        <div className="relative">
          <Mail aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="seu@email.com *"
            className={fieldCls(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="relative">
          <Phone aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="tel"
            name="whatsapp"
            value={data.whatsapp}
            onChange={handleChange}
            placeholder="(00) 00000-0000 *"
            className={fieldCls(!!errors.whatsapp)}
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>}
        </div>

        <div className="relative">
          <Briefcase aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            name="segment"
            value={data.segment}
            onChange={handleChange}
            className={`${fieldCls()} appearance-none pr-10`}
          >
            <option value="">Segmento da empresa</option>
            <option value="Tecnologia / SaaS">Tecnologia / SaaS</option>
            <option value="Indústria">Indústria</option>
            <option value="Varejo / E-commerce">Varejo / E-commerce</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Serviços Financeiros">Serviços Financeiros</option>
            <option value="Logística">Logística</option>
            <option value="Agronegócio">Agronegócio</option>
            <option value="Outro">Outro</option>
          </select>
          <ChevronDown aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="command-button w-full justify-center disabled:opacity-60"
        >
          {isSubmitting ? 'Enviando…' : 'Quero minha consultoria gratuita'}
          {!isSubmitting && <ArrowRight aria-hidden="true" className="w-4 h-4" />}
        </button>

        <p className="text-[11px] text-center text-muted-foreground pt-1">
          Seus dados ficam só com a MIIND. Sem spam, sem repasse.
        </p>
      </div>
    </form>
  );
};

const benefits = [
  { icon: Target, title: 'Diagnóstico de oportunidades', desc: 'Identificamos onde a IA pode gerar mais impacto agora.' },
  { icon: Workflow, title: 'Mapeamento de processos', desc: 'Quais processos automatizar com maior retorno e menor risco.' },
  { icon: Map, title: 'Roadmap personalizado', desc: 'Plano de implementação por fases, no seu ritmo.' },
  { icon: TrendingUp, title: 'Estimativa de ROI', desc: 'Projeção de retorno, prazos e investimento — sem letras miúdas.' },
];

const differentials = [
  { icon: Bot, title: 'Software, Agentes e Automação sob medida', desc: 'Construímos para o seu fluxo, sua stack e seu time. Nada genérico.' },
  { icon: ShieldCheck, title: 'Governança e Segurança', desc: 'Criptografia, controle de acesso e LGPD em primeiro lugar.' },
  { icon: Brain, title: 'Integrações completas', desc: 'Conectamos sua IA ao ERP, CRM, planilhas e APIs internas.' },
];

const steps = [
  { n: '01', title: 'Cadastre-se aqui', desc: 'Preencha o formulário em menos de 1 minuto.' },
  { n: '02', title: 'Contato em até 48h', desc: 'Validamos contexto e marcamos sua reunião de diagnóstico.' },
  { n: '03', title: 'Reunião de 30–45 min', desc: 'Online ou presencial em Gramado durante o evento.' },
];

const faq = [
  { q: 'A consultoria é realmente gratuita?', a: 'Sim, 100% gratuita e sem compromisso. É uma cortesia para participantes do Gramado Summit conhecerem nosso método.' },
  { q: 'Preciso ter um time técnico?', a: 'Não. A conversa é estratégica e de negócio. Quem decide, quem opera ou quem implementa — todos aproveitam.' },
  { q: 'Como é a reunião?', a: 'Uma sessão de 30 a 45 minutos com nosso time, online por vídeo ou presencial em Gramado durante o Summit.' },
  { q: 'O que acontece depois?', a: 'Você recebe um resumo com oportunidades identificadas e um roadmap sugerido. Avançar com a MIIND é decisão sua, sem pressão.' },
  { q: 'Tem vagas limitadas?', a: 'Sim. Atendemos um número restrito de empresas por semana — a ordem é por chegada do cadastro.' },
];

const GramadoPage = () => {
  useSeo({
    title: 'Gramado Summit 2026 · Consultoria gratuita em IA — MIIND',
    description: 'Participou do Gramado Summit? Garanta uma consultoria estratégica gratuita com o time MIIND para aplicar Software, Agentes e Automação na sua empresa.',
    canonical: 'https://www.miind.com.br/gramado',
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      
      <Navbar />

      <main id="main-content">
        {/* HERO */}
        <section className="relative pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-hidden mesh-bg">
          <Particles quantity={28} className="opacity-60" />
          <div aria-hidden="true" className="absolute inset-0 system-grid opacity-40 pointer-events-none" />
          <div aria-hidden="true" className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-brand-violet/20 blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute -bottom-40 -left-32 w-[32rem] h-[32rem] rounded-full bg-brand-cyan/15 blur-3xl pointer-events-none" />

          <div className="container-editorial relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <div className="blue-chip mb-6">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                  ESPECIAL GRAMADO SUMMIT 2026
                </div>

                <h1 className="display-xl mb-6">
                  <span className="text-foreground">Você está no </span>
                  <span className="text-aurora">Gramado Summit.</span>
                  <br />
                  <span className="text-foreground">Aplique IA de verdade na sua empresa.</span>
                </h1>

                <p className="lead max-w-xl mb-8">
                  Garanta uma <strong className="text-foreground">consultoria estratégica gratuita</strong> com o
                  time MIIND e descubra como Software, Agentes e Automação sob medida podem transformar seus
                  processos — com governança, segurança e ROI claro.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-8">
                  <a href="#cadastro" className="command-button">
                    Quero minha consultoria gratuita
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </a>
                  <a
                    href={WHATSAPP_GRAMADO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-link inline-flex items-center gap-2 text-foreground/85 hover:text-foreground text-[0.9375rem] font-medium"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-brand-cyan" />
                    Prefiro pelo WhatsApp
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {['100% gratuita', 'Sem compromisso', 'Vagas limitadas'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5">
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                id="cadastro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-5"
              >
                <LeadForm formId="lead-form-hero" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Prova social */}
        <section className="border-y border-border bg-surface-0/60">
          <div className="container-editorial py-6">
            <p className="text-center text-sm text-muted-foreground">
              <strong className="text-foreground">50+ empresas</strong> já transformaram seus processos com a MIIND — agora é a sua vez.
            </p>
          </div>
        </section>

        {/* Benefícios */}
        <section className="section-pad relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="container-editorial relative z-10">
            <SectionHeader
              index="01"
              label="O QUE VOCÊ RECEBE"
              title={<>Tudo que você ganha na <span className="text-aurora">consultoria gratuita.</span></>}
              lead="Uma sessão prática, com entregáveis concretos. Sem teoria genérica."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className="signal-card p-6 h-full">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl glass mb-4">
                      <b.icon aria-hidden="true" className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="section-pad relative overflow-hidden bg-surface-1">
          <div className="absolute inset-0 system-grid opacity-50 pointer-events-none" />
          <div className="container-editorial relative z-10">
            <SectionHeader
              index="02"
              label="POR QUE A MIIND"
              title={<>IA aplicada com <span className="text-aurora">método, segurança e impacto real.</span></>}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentials.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.1}>
                  <div className="bento-card p-7 h-full rounded-2xl">
                    <d.icon aria-hidden="true" className="w-8 h-8 text-brand-cyan mb-5" />
                    <h3 className="font-display text-lg font-semibold mb-2">{d.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="section-pad relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="container-editorial relative z-10">
            <SectionHeader
              index="03"
              label="COMO FUNCIONA"
              title={<>Três passos até sua <span className="text-aurora">consultoria.</span></>}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div aria-hidden="true" className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-brand-cyan/40 via-brand-blue/40 to-brand-violet/40" />
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="relative w-14 h-14 mx-auto mb-5 rounded-full glass flex items-center justify-center">
                      <span className="font-mono text-sm font-semibold text-brand-cyan">{s.n}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-pad relative overflow-hidden bg-surface-1">
          <div className="absolute inset-0 system-grid opacity-40 pointer-events-none" />
          <div className="container-editorial relative z-10 max-w-3xl">
            <SectionHeader
              index="04"
              label="DÚVIDAS"
              title={<>Tirando suas <span className="text-aurora">últimas dúvidas.</span></>}
            />
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="bento-card rounded-xl px-5 border-none"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Final */}
        <section className="section-pad relative overflow-hidden mesh-bg">
          <Particles quantity={20} className="opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 system-grid opacity-40 pointer-events-none" />

          <div className="container-editorial relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <Reveal>
                <div>
                  <div className="eyebrow mb-6"><span>09 // PRÓXIMO PASSO</span></div>
                  <Calendar aria-hidden="true" className="w-10 h-10 mb-5 text-brand-cyan" />
                  <h2 className="display-l mb-5">
                    Garanta sua consultoria <span className="text-aurora">antes do Summit acabar.</span>
                  </h2>
                  <p className="lead mb-6 max-w-xl">
                    Vagas limitadas, atendimento por ordem de chegada. Cadastre-se agora e saia de Gramado com
                    um plano real para aplicar IA na sua empresa.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                    Resposta do nosso time em até 48 horas
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <LeadForm formId="lead-form-final" />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_GRAMADO}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 w-14 h-14 flex items-center justify-center rounded-full glass glow-cyan text-brand-cyan hover:scale-110 active:scale-95 transition-transform"
        aria-label="Falar pelo WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </div>
  );
};

export default GramadoPage;
