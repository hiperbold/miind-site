import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Factory, HeartPulse, ShieldCheck, Pill, Route,
  UserCog, MessagesSquare, ArrowRight, ArrowLeft, type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import Reveal from '@/components/effects/Reveal';
import MagicCard from '@/components/effects/MagicCard';
import BorderBeam from '@/components/effects/BorderBeam';
import Meteors from '@/components/effects/Meteors';
import Particles from '@/components/effects/Particles';
import NumberTicker from '@/components/effects/NumberTicker';
import { useSeo } from '@/hooks/useSeo';
import Breadcrumb from '@/components/Breadcrumb';

type CaseItem = {
  idx: string;
  setor: string;
  cliente: string;
  Icon: LucideIcon;
  descricao: string;
  entregas: string[];
};

const cases: CaseItem[] = [
  {
    idx: '01', setor: 'Varejo', cliente: 'Seguros Unimed', Icon: ShoppingCart,
    descricao: 'IA aplicada à operação de varejo e seguros — atendimento, jornada do cliente e automação de processos com governança.',
    entregas: ['Automação de processos do cliente', 'Jornada digital assistida por IA', 'Ganho de eficiência operacional'],
  },
  {
    idx: '02', setor: 'Indústria', cliente: 'Compras da Renault', Icon: Factory,
    descricao: 'Inteligência aplicada ao processo de compras industriais — automação de fluxos e suporte à decisão em uma operação crítica.',
    entregas: ['Automação do fluxo de compras', 'Suporte à decisão com IA', 'Eficiência em processo crítico'],
  },
  {
    idx: '03', setor: 'Saúde', cliente: 'TEM Saúde', Icon: HeartPulse,
    descricao: 'Solução de IA para a jornada de saúde — agendamento e atendimento conversacional via WhatsApp, com escala e qualidade consistente.',
    entregas: ['Agendamento conversacional', 'Atendimento via WhatsApp', 'Escala com qualidade consistente'],
  },
  {
    idx: '04', setor: 'Seguros', cliente: 'Esteira de Sinistro · Generali', Icon: ShieldCheck,
    descricao: 'Esteira de sinistro automatizada com IA — triagem, classificação e fluxo auditável ponta a ponta, reduzindo o tempo de ciclo.',
    entregas: ['Triagem automática de sinistros', 'Fluxo auditável e rastreável', 'Redução de tempo de ciclo'],
  },
  {
    idx: '05', setor: 'Farmacêutico', cliente: 'Eurofarma', Icon: Pill,
    descricao: 'Automação inteligente com autonomia auditável, atenta às exigências regulatórias do setor farmacêutico.',
    entregas: ['Automação de processos', 'Autonomia auditável (compliance)', 'Pipeline com governança'],
  },
  {
    idx: '06', setor: 'Consultoria', cliente: 'Networking & malha logística · EY', Icon: Route,
    descricao: 'Inteligência aplicada a networking design e malha logística — modelagem e otimização orientada a dados para a Ernst Young.',
    entregas: ['Design de malha logística', 'Otimização orientada a dados', 'Suporte à consultoria estratégica'],
  },
];

const caseRH = {
  setor: 'RH',
  titulo: 'O case que espelha o core de um RH em escala',
  subprojetos: [
    {
      nome: 'Run Talent', Icon: UserCog, tagline: 'Esteira de prospecção e contratação',
      entregas: ['Sourcing e triagem de candidatos com IA', 'Matching por competências e ranqueamento', 'Fluxo de contratação ponta a ponta', 'Redução do trabalho manual do recrutador'],
    },
    {
      nome: 'Vertem / Familhão', Icon: MessagesSquare, tagline: 'SDR comercial e contratação · Luciano Huck',
      entregas: ['SDR de IA para prospecção comercial', 'Abordagem multicanal e qualificação', 'Agendamento de reuniões automático', 'Esteira de contratação integrada'],
    },
  ],
};

const SECTORS = ['Todos', 'Varejo', 'Indústria', 'Saúde', 'Seguros', 'Farmacêutico', 'Consultoria', 'RH'] as const;

const SectorFilter: React.FC<{ active: string; onChange: (s: string) => void }> = ({ active, onChange }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {SECTORS.map((s) => {
      const isActive = active === s;
      return (
        <button
          key={s}
          onClick={() => onChange(s)}
          aria-pressed={isActive}
          className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono font-medium tracking-[0.16em] uppercase transition-all border ${
            isActive
              ? 'bg-foreground text-background border-foreground shadow-[0_8px_28px_-8px_oklch(0.84_0.16_220/0.55)]'
              : 'glass text-foreground/75 border-border hover:text-foreground hover:border-brand-cyan/40'
          }`}
        >
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />}
          {s}
        </button>
      );
    })}
  </div>
);

const CaseCard: React.FC<{ item: CaseItem }> = ({ item }) => {
  const { Icon } = item;
  return (
    <MagicCard className="bento-card p-7 h-full rounded-[14px] flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {item.idx} // {item.setor}
        </span>
        <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
          <Icon className="w-5 h-5 text-brand-cyan" />
        </div>
      </div>

      <h3 className="font-display text-xl font-semibold text-foreground mb-3 leading-snug">
        {item.cliente}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.descricao}</p>

      <ul className="space-y-2.5 mt-auto pt-5 border-t border-border">
        {item.entregas.map((e) => (
          <li key={e} className="flex items-start gap-2.5 text-sm text-foreground/85">
            <span className="shrink-0 font-mono text-xs text-brand-cyan pt-0.5">▸</span>
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </MagicCard>
  );
};

const PortfolioPage: React.FC = () => {
  const [active, setActive] = useState<string>('Todos');

  useSeo({
    title: 'Portfólio de cases · MIIND',
    description:
      'Cases MIIND em sete setores — Varejo, Indústria, Saúde, Seguros, Farmacêutico, Consultoria e RH. IA aplicada que entrega em produção.',
    canonical: 'https://www.miind.com.br/portfolio',
  });

  const filtered = useMemo(() => {
    if (active === 'Todos') return cases;
    if (active === 'RH') return [];
    return cases.filter((c) => c.setor === active);
  }, [active]);

  const showFeatured = active === 'Todos' || active === 'RH';

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />

        <main id="main-content" className="pt-20 md:pt-24">
          <Breadcrumb items={[{ label: 'Portfolio' }]} />



          {/* Bloco Hero + Métricas */}
          <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="section-frame">
                <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />

                <div aria-hidden="true" className="absolute inset-0 mesh-bg opacity-90 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none"><Particles quantity={24} /></div>
                <div aria-hidden="true" className="absolute inset-0 system-grid opacity-50 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" />
                  <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
                </div>

                <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
                  <div className="text-center max-w-3xl mx-auto">
                    <Reveal>
                      <div className="eyebrow justify-center mb-6 inline-flex">
                        <span>00 // PORTFOLIO</span>
                        <span className="ml-2 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                          <span className="text-brand-cyan/80">live</span>
                        </span>
                      </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <h1 className="display-xl mb-6">
                        Sete cases. <span className="text-aurora">Sete setores.</span>
                      </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="lead">
                        Uma fábrica de IA aplicada que já entrega em produção — convertendo problemas
                        de negócio em sistemas que rodam.
                      </p>
                    </Reveal>

                    <Reveal delay={0.3}>
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-8 border-t border-border">
                        {[
                          { v: 7, suf: '', label: 'Setores cobertos' },
                          { v: 8, suf: '+', label: 'Cases em produção' },
                          { v: 100, suf: '%', label: 'Sob NDA' },
                        ].map((m) => (
                          <div key={m.label} className="text-left">
                            <div className="font-display text-3xl font-semibold text-foreground metric-glow">
                              <NumberTicker value={m.v} suffix={m.suf} />
                            </div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
          </section>

          {/* Bloco Filtro + Grid */}
          <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="section-frame">
                <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
                <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-violet/15 blur-3xl aurora-drift" />
                  <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-cyan/12 blur-3xl aurora-drift" style={{ animationDelay: '-22s' }} />
                </div>

                <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
                  <Reveal>
                    <SectorFilter active={active} onChange={setActive} />
                  </Reveal>

                  <AnimatePresence mode="wait">
                    {filtered.length > 0 && (
                      <motion.div
                        key={active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
                      >
                        {filtered.map((item, i) => (
                          <Reveal key={item.cliente} delay={i * 0.06}>
                            <CaseCard item={item} />
                          </Reveal>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
          </section>

          {/* Bloco Featured RH */}
          {showFeatured && (
            <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <Reveal>
                  <div className="section-frame">
                    <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
                    <div aria-hidden="true" className="absolute inset-0 system-grid opacity-50 pointer-events-none" />
                    <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
                    <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-violet/20 blur-3xl aurora-drift" />
                      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/15 blur-3xl aurora-drift" style={{ animationDelay: '-8s' }} />
                    </div>

                    <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16">
                      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                        <div>
                          <div className="eyebrow mb-5">
                            <span>DESTAQUE // {caseRH.setor}</span>
                            <span className="ml-2 inline-flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                              <span className="text-brand-cyan/80">featured</span>
                            </span>
                          </div>
                          <h3 className="display-m text-foreground max-w-2xl">
                            {caseRH.titulo}
                          </h3>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {caseRH.subprojetos.map(({ Icon, nome, tagline, entregas }, i) => (
                          <Reveal key={nome} delay={i * 0.1}>
                            <div className="relative glass rounded-2xl p-7 h-full overflow-hidden">
                              <div className="flex items-center justify-between mb-5">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/30 to-brand-violet/30 flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-brand-cyan" />
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                  0{i + 1} // SUBPROJECT
                                </span>
                              </div>
                              <h4 className="font-display text-xl font-semibold mb-1">{nome}</h4>
                              <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan/80 mb-5">{tagline}</p>
                              <ul className="space-y-2.5">
                                {entregas.map((e) => (
                                  <li key={e} className="flex items-start gap-2.5 text-sm text-foreground/85">
                                    <span className="shrink-0 font-mono text-xs text-brand-cyan pt-0.5">▸</span>
                                    <span>{e}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
            </section>
          )}

          {/* Bloco CTA */}
          <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <Reveal>
                <div className="section-frame">
                  <BorderBeam size={420} duration={12} colorFrom="oklch(0.84 0.16 220)" colorTo="oklch(0.62 0.22 295)" />
                  <Meteors number={14} />
                  <div aria-hidden="true" className="absolute inset-0 mesh-bg opacity-80 pointer-events-none" />
                  <div aria-hidden="true" className="absolute inset-0 system-grid opacity-40 pointer-events-none" />
                  <div aria-hidden="true" className="absolute inset-0 noise opacity-30 pointer-events-none" />

                  <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14 lg:py-16 text-center">
                    <div className="eyebrow justify-center mb-6 mx-auto inline-flex">
                      <span>NEXT // STEP</span>
                    </div>
                    <h3 className="display-l max-w-3xl mx-auto">
                      Vamos transformar o seu desafio em um <span className="text-aurora">sistema que roda.</span>
                    </h3>
                    <p className="lead mt-6 max-w-xl mx-auto">
                      Conversa de 30 minutos com um sócio. Sem proposta padrão, sem pitch.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3 justify-center items-center">
                      <Link to="/#next-step" className="command-button relative overflow-hidden">
                        Falar com a MIIND
                        <ArrowRight className="w-4 h-4" />
                        <BorderBeam size={180} duration={6} />
                      </Link>
                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground glass border border-border/60 hover:border-brand-cyan/50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-brand-cyan" />
                        Voltar para a Home
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default PortfolioPage;
