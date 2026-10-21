import { motion } from 'framer-motion';
import { ArrowLeft, FileText, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';

const documents = [
  {
    to: '/termos-de-servico',
    icon: FileText,
    eyebrow: 'DOC // TERMOS',
    title: 'Termos de Serviço',
    desc: 'Regras para contratação de consultoria, desenvolvimento sob medida, agentes de IA e integrações.',
    version: 'v1.0 · vigência 01/01/2026',
  },
  {
    to: '/politica-de-privacidade',
    icon: ShieldCheck,
    eyebrow: 'DOC // PRIVACIDADE',
    title: 'Política de Privacidade',
    desc: 'Como a MIIND coleta, utiliza, armazena e protege dados pessoais — em linha com a LGPD.',
    version: 'v1.0 · vigência 01/01/2026',
  },
];

const ArquivoPage = () => {
  useSeo({
    title: 'Arquivo legal · MIIND',
    description: 'Índice dos documentos institucionais e legais da MIIND: Termos de Serviço e Política de Privacidade.',
    canonical: 'https://www.miind.com.br/arquivo',
  });
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main id="main-content" className="relative pt-32 pb-20">
        <div className="absolute top-0 left-0 right-0 h-[380px] mesh-bg opacity-80 pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 right-0 h-[380px] system-grid opacity-40 pointer-events-none -z-10" />

        <section className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Link
              to="/"
              className="ink-link mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 text-brand-cyan" />
              Voltar para o site
            </Link>

            <div className="eyebrow mb-6"><span>LEGAL // ARQUIVO</span></div>
            <h1 className="display-l mb-5">
              Arquivo legal da <span className="text-aurora">MIIND</span>
            </h1>
            <p className="lead">
              Índice dos documentos institucionais. Acesse a versão canônica de cada peça em sua
              própria página — sem duplicidade de conteúdo, sempre na versão vigente.
            </p>
          </motion.div>
        </section>

        <section className="container-editorial mt-14">
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {documents.map((d, i) => (
              <motion.div
                key={d.to}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  to={d.to}
                  className="group block bento-card p-7 rounded-2xl h-full transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl glass shrink-0">
                      <d.icon aria-hidden="true" className="h-5 w-5 text-brand-cyan" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                        {d.eyebrow}
                      </div>
                      <h2 className="font-display text-xl font-semibold">{d.title}</h2>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{d.desc}</p>
                  <div className="mt-6 flex items-center justify-between pt-5 border-t border-border">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {d.version}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 group-hover:text-foreground">
                      Abrir
                      <ArrowRight aria-hidden="true" className="w-4 h-4 text-brand-cyan transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArquivoPage;
