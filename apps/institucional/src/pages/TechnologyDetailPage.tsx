import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Server, Laptop, Code, Cpu, Share2, Radar, Cloud, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '@/components/effects/Reveal';
import MagicCard from '@/components/effects/MagicCard';
import BorderBeam from '@/components/effects/BorderBeam';
import Particles from '@/components/effects/Particles';
import { useSeo } from '@/hooks/useSeo';

interface TechnologyDetail {
  id: string;
  title: string;
  Icon: typeof Cpu;
  description: string;
  features: string[];
  longDescription: string;
  benefits: string[];
  useCases: string[];
}

const technologiesDetails: Record<string, TechnologyDetail> = {
  'miind-core': {
    id: 'miind-core', title: 'Miind Core', Icon: Cpu,
    description: 'Motor de IA proprietário que combina diversos modelos para máxima eficiência e precisão.',
    features: ['Processamento avançado', 'Orquestração de modelos', 'Aprendizado contínuo'],
    longDescription: 'Miind Core é nossa tecnologia central de inteligência artificial, projetada para processar e analisar grandes volumes de dados com precisão sem precedentes. Utilizando uma combinação sofisticada de modelos de machine learning e redes neurais profundas, o Miind Core é capaz de extrair insights significativos, identificar padrões complexos e tomar decisões em tempo real com base em uma análise abrangente de dados estruturados e não estruturados.',
    benefits: ['Redução de até 70% no tempo de processamento de informações complexas', 'Acurácia superior a 95% em tarefas de classificação e previsão', 'Capacidade de adaptação e aprendizado contínuo com dados do seu negócio', 'Otimização de recursos através de algoritmos inteligentes'],
    useCases: ['Análise preditiva de comportamento do consumidor', 'Automação inteligente de processos decisórios', 'Detecção avançada de anomalias e fraudes', 'Personalização de experiências do cliente em tempo real'],
  },
  'miind-bridge': {
    id: 'miind-bridge', title: 'Miind Bridge', Icon: Share2,
    description: 'Plataforma de integração que conecta os Agentes de IA com todos os seus sistemas existentes.',
    features: ['Integrações via API', 'Conectividade unificada', 'Fluxo de dados inteligente'],
    longDescription: 'Miind Bridge é nossa plataforma de integração de última geração, projetada para unificar sistemas diversos e criar um ecossistema tecnológico coeso. Através de conectores inteligentes e APIs robustas, o Miind Bridge permite que seus sistemas existentes se comuniquem perfeitamente com nossos Agentes de IA.',
    benefits: ['Integração simplificada com mais de 200 sistemas e aplicações', 'Redução de até 80% no tempo de implementação de novas integrações', 'Monitoramento em tempo real do fluxo de dados entre sistemas', 'Escalabilidade para acompanhar o crescimento do seu negócio'],
    useCases: ['Sincronização automática entre CRMs e ERPs', 'Workflows automatizados entre plataformas distintas', 'Consolidação de dados de múltiplas fontes', 'Estratégias omnichannel com dados consistentes'],
  },
  'miind-pulse': {
    id: 'miind-pulse', title: 'Miind Pulse', Icon: Radar,
    description: 'Monitoramento de comunicações internas e externas para detecção de padrões e insights.',
    features: ['Monitoramento em tempo real', 'Detecção de anomalias', 'Análise preditiva'],
    longDescription: 'Miind Pulse é nossa tecnologia avançada de monitoramento e análise de comunicações, capaz de identificar padrões relevantes, tendências emergentes e anomalias significativas em todas as interações da sua empresa.',
    benefits: ['Detecção antecipada de problemas em comunicações críticas', 'Melhoria contínua do atendimento ao cliente', 'Identificação de tendências em grandes volumes de dados', 'Alertas em tempo real para situações críticas'],
    useCases: ['Análise de sentimento em comunicações com clientes', 'Identificação de gargalos em processos internos', 'Monitoramento de compliance em comunicações reguladas', 'Previsão de tendências com base em interações'],
  },
  'miind-cloud': {
    id: 'miind-cloud', title: 'Miind Cloud', Icon: Cloud,
    description: 'Platform as a Service que facilita o desenvolvimento, implantação e gerenciamento de aplicações em IA.',
    features: ['Infraestrutura escalável', 'Implantação automatizada', 'Gerenciamento simplificado'],
    longDescription: 'Miind Cloud é nossa solução completa para desenvolvimento, implantação e gerenciamento de aplicações baseadas em IA. Com infraestrutura escalável e ferramentas intuitivas de desenvolvimento.',
    benefits: ['Redução de até 60% no tempo de implantação', 'Escalabilidade automática para lidar com picos de demanda', 'Segurança integrada em todas as camadas', 'Monitoramento e manutenção simplificados'],
    useCases: ['Desenvolvimento ágil de aplicações corporativas em IA', 'MVPs rápidos para validação de conceitos', 'Modernização de sistemas legados', 'Implementação de microserviços escaláveis'],
  },
};

const TechnologyDetailPage = () => {
  const { techId } = useParams<{ techId: string }>();
  const tech = techId ? technologiesDetails[techId] : null;

  useSeo({
    title: tech ? `${tech.title} · Tecnologias MIIND` : 'Tecnologia · MIIND',
    description: tech?.description ?? 'Detalhes técnicos da stack MIIND.',
    canonical: techId ? `https://www.miind.com.br/tecnologia/${techId}` : undefined,
  });

  if (!tech) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="display-m mb-6">Tecnologia não encontrada</h1>
            <Link to="/tecnologias" className="command-button">Ver tecnologias</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="relative flex-1 pt-32 pb-20">
        <div className="absolute top-0 left-0 right-0 h-[460px] mesh-bg opacity-90 pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 right-0 h-[460px] -z-10">
          <Particles quantity={35} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[460px] system-grid opacity-50 pointer-events-none -z-10" />

        <div className="container-editorial max-w-5xl">
          <Link to="/tecnologias" className="ink-link inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10">
            <ChevronLeft className="w-4 h-4 text-brand-cyan" />
            Voltar para tecnologias
          </Link>

          {/* Hero */}
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
              <div className="flex-1">
                <div className="eyebrow mb-5">
                  <span>MODULE // {tech.id.toUpperCase()}</span>
                </div>
                <h1 className="display-xl mb-5">
                  <span className="text-aurora">{tech.title}</span>
                </h1>
                <p className="lead max-w-2xl">{tech.description}</p>
              </div>
              <div className="relative w-28 h-28 rounded-2xl glass flex items-center justify-center shrink-0 overflow-hidden">
                <BorderBeam size={140} duration={7} />
                <tech.Icon className="w-12 h-12 text-brand-cyan" />
              </div>
            </div>
          </Reveal>

          {/* Long description + features */}
          <Reveal delay={0.1}>
            <div className="bento-card p-8 lg:p-10 rounded-2xl mb-12">
              <p className="text-base lg:text-lg leading-relaxed text-foreground/85">
                {tech.longDescription}
              </p>
              <div className="flex flex-wrap gap-2 mt-7">
                {tech.features.map((f) => (
                  <span key={f} className="blue-chip">{f}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Benefits */}
          <section className="mb-12">
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <Server className="w-5 h-5 text-brand-cyan" />
                <h2 className="display-m">Benefícios</h2>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {tech.benefits.map((b, i) => (
                <Reveal key={b} delay={i * 0.06}>
                  <MagicCard className="signal-card p-6 h-full">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                      <p className="text-sm leading-relaxed text-foreground/85">{b}</p>
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section className="mb-12">
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <Laptop className="w-5 h-5 text-brand-cyan" />
                <h2 className="display-m">Casos de uso</h2>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {tech.useCases.map((u, i) => (
                <Reveal key={u} delay={i * 0.06}>
                  <div className="bento-card p-6 h-full rounded-xl flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <Code className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/85">{u}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CTA */}
          <Reveal>
            <div className="relative glass rounded-2xl p-8 lg:p-10 overflow-hidden">
              <BorderBeam size={300} duration={9} />
              <div className="eyebrow mb-4"><span>09 // PRÓXIMO PASSO</span></div>
              <h3 className="display-m mb-3">Interessado em {tech.title}?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xl">
                Conversa de 30 minutos com um sócio. Saímos com um plano possível para o seu próximo release.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/#next-step" className="command-button">
                  Agendar conversa estratégica
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
                <Link
                  to="/portfolio"
                  className="ink-link inline-flex items-center gap-2 text-foreground/85 hover:text-foreground font-medium px-4 h-12"
                >
                  Ver cases em produção
                  <ExternalLink aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TechnologyDetailPage;
