import { useNavigate, Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Share2, Radar, Cloud } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '@/components/effects/Reveal';
import MagicCard from '@/components/effects/MagicCard';
import Particles from '@/components/effects/Particles';
import { useSeo } from '@/hooks/useSeo';

const technologies = [
  { id: 'miind-core', title: 'Miind Core', icon: Cpu, description: 'Motor de IA proprietário que combina diversos modelos para máxima eficiência e precisão.' },
  { id: 'miind-bridge', title: 'Miind Bridge', icon: Share2, description: 'Plataforma de integração que conecta os Agentes de IA com todos os seus sistemas existentes.' },
  { id: 'miind-pulse', title: 'Miind Pulse', icon: Radar, description: 'Monitoramento avançado de comunicações e análise preditiva em tempo real.' },
  { id: 'miind-cloud', title: 'Miind Cloud', icon: Cloud, description: 'Platform as a Service para desenvolvimento, implantação e gerenciamento de aplicações em IA.' },
];

const TechnologiesPage = () => {
  const navigate = useNavigate();

  useSeo({
    title: 'Tecnologias · MIIND',
    description:
      'Stack MIIND para venture building com IA: arquitetura, agentes, integrações enterprise e observabilidade em produção.',
    canonical: 'https://www.miind.com.br/tecnologias',
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-20">
        <div className="absolute top-0 left-0 right-0 h-[520px] mesh-bg opacity-90 pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 right-0 h-[520px] -z-10">
          <Particles quantity={40} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[520px] system-grid opacity-50 pointer-events-none -z-10" />

        <div className="container-editorial">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="eyebrow justify-center mb-6 inline-flex">
                <span>00 // TECHNOLOGY</span>
                <span className="ml-2 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-signal" />
                  <span className="text-brand-cyan/80">stack</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mb-6">
                Nossas <span className="text-aurora">tecnologias.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lead">
                A stack proprietária que impulsiona squads MIIND da prova de conceito ao MVP em
                produção em semanas.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-16">
            {technologies.map((tech, i) => (
              <Reveal key={tech.id} delay={i * 0.08}>
                <button
                  onClick={() => navigate(`/tecnologia/${tech.id}`)}
                  className="text-left w-full group"
                >
                  <MagicCard className="bento-card p-8 h-full rounded-[14px]">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl glass flex items-center justify-center shrink-0">
                        <tech.icon className="w-6 h-6 text-brand-cyan" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            0{i + 1} // MODULE
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                        <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-aurora transition-colors">
                          {tech.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                      </div>
                    </div>
                  </MagicCard>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center">
              <Link to="/#bu1lder" className="ink-link inline-flex items-center gap-2 text-foreground/85 hover:text-foreground font-medium">
                Conhecer a plataforma Bu1lder
                <ArrowUpRight className="w-4 h-4 text-brand-cyan" />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TechnologiesPage;
