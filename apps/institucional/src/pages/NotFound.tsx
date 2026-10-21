import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Briefcase, Cpu, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Particles from '@/components/effects/Particles';
import Meteors from '@/components/effects/Meteors';
import BorderBeam from '@/components/effects/BorderBeam';
import { motion } from 'framer-motion';
import { useSeo } from '@/hooks/useSeo';

const shortcuts = [
  { to: '/portfolio', label: 'Portfólio', Icon: Briefcase },
  { to: '/tecnologias', label: 'Tecnologias', Icon: Cpu },
  { to: '/#next-step', label: 'Agendar conversa', Icon: Calendar },
];

const NotFound = () => {
  useSeo({
    title: '404 — Página não encontrada · MIIND',
    description: 'A rota que você procura não existe ou foi descomissionada. Volte para o core da MIIND.',
  });

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex items-center justify-center mesh-bg overflow-hidden">
        <Particles quantity={40} />
        <Meteors number={10} />
        <div aria-hidden="true" className="absolute inset-0 system-grid opacity-40 pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono font-medium leading-none select-none"
            style={{ fontSize: 'clamp(8rem, 24vw, 18rem)' }}
            aria-hidden="true"
          >
            <span className="text-aurora">404</span>
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="eyebrow justify-center mb-5 inline-flex">
              <span>ERROR // ROUTE_NOT_FOUND</span>
            </div>
            <h1 className="display-m mb-5">Sinal perdido.</h1>
            <p className="lead mb-10">
              A rota que você procura não existe ou foi descomissionada. Volte para o core.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="command-button relative overflow-hidden">
                <Home aria-hidden="true" className="w-4 h-4" />
                Voltar para a home
                <BorderBeam size={160} duration={6} />
              </Link>
              <button onClick={() => history.back()} className="ink-link inline-flex items-center gap-2 text-foreground/85 hover:text-foreground font-medium">
                <ArrowLeft aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                Voltar à página anterior
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="eyebrow justify-center mb-4 inline-flex">
                <span>OU EXPLORE</span>
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {shortcuts.map(({ to, label, Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-foreground/85 hover:text-foreground glass border border-border hover:border-brand-cyan/40 transition-all"
                  >
                    <Icon aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
