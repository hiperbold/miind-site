import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';
import { CONTACT_EMAIL } from '@/lib/contact';

const sections = [
  {
    title: '1. Objeto',
    body:
      'Estes Termos regulam a contratação e o uso dos serviços de consultoria, desenvolvimento de software sob medida, agentes de IA, automação de processos e integrações enterprise prestados pela MIIND.',
  },
  {
    title: '2. Aceitação',
    body:
      'Ao firmar proposta comercial, ordem de serviço ou contrato com a MIIND — ou ao utilizar qualquer entregável produzido por ela — o cliente declara conhecer e aceitar integralmente estes Termos.',
  },
  {
    title: '3. Escopo dos serviços',
    body:
      'O escopo, cronograma, marcos, métricas de aceite e modelo de remuneração de cada engajamento são definidos em proposta específica. Releases adicionais, mudanças de escopo e novas frentes são contratados em aditivo.',
  },
  {
    title: '4. Propriedade intelectual',
    body:
      'O código-fonte produzido sob medida para um cliente é transferido ao cliente após o pagamento integral dos marcos previstos. A MIIND mantém a titularidade de componentes proprietários reutilizáveis, da plataforma Bu1lder e de bibliotecas internas utilizadas como dependências.',
  },
  {
    title: '5. Confidencialidade e NDA',
    body:
      'A MIIND opera sob NDA mútuo. Informações de negócio, dados, código e métricas trocadas durante o engajamento são tratados como confidenciais, com retenção mínima necessária e descarte controlado ao final do contrato.',
  },
  {
    title: '6. Proteção de dados (LGPD)',
    body:
      'A MIIND atua como operadora dos dados pessoais que o cliente compartilhar, exclusivamente para a finalidade contratada. Adotamos controles técnicos e organizacionais compatíveis com a LGPD, incluindo controle de acesso, criptografia em trânsito e em repouso, e registros de operação.',
  },
  {
    title: '7. Níveis de serviço e suporte',
    body:
      'Suporte, SLAs, janelas de manutenção e plano de continuidade são descritos em anexo técnico próprio. Indisponibilidades de plataformas de terceiros (cloud, modelos de IA, integrações externas) seguem os SLAs dos respectivos provedores.',
  },
  {
    title: '8. Limitação de responsabilidade',
    body:
      'A responsabilidade total da MIIND, em qualquer hipótese, fica limitada ao valor efetivamente pago pelo cliente nos 12 meses anteriores ao evento que originou a reclamação, salvo dolo ou culpa grave.',
  },
  {
    title: '9. Rescisão',
    body:
      'Qualquer das partes pode rescindir o contrato mediante notificação prévia de 30 dias, observados os marcos em andamento. Em caso de violação relevante destes Termos, a rescisão pode ser imediata.',
  },
  {
    title: '10. Lei aplicável e foro',
    body:
      'Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Porto Alegre/RS, com renúncia a qualquer outro, por mais privilegiado que seja.',
  },
  {
    title: '11. Contato',
    body: `Dúvidas sobre estes Termos ou solicitações relacionadas a dados pessoais podem ser enviadas para ${CONTACT_EMAIL}.`,
  },
];

const TermosDeServicoPage = () => {
  useSeo({
    title: 'Termos de serviço · MIIND',
    description: 'Termos e condições para contratação dos serviços de consultoria, software, agentes de IA e automação da MIIND.',
    canonical: 'https://www.miind.com.br/termos-de-servico',
  });
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main id="main-content" className="relative pt-32 pb-20">
        <div className="absolute top-0 left-0 right-0 h-[360px] mesh-bg opacity-80 pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 right-0 h-[360px] system-grid opacity-40 pointer-events-none -z-10" />

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

            <div className="eyebrow mb-6"><span>LEGAL // TERMOS</span></div>
            <h1 className="display-l mb-5">
              Termos de <span className="text-aurora">Serviço</span>
            </h1>
            <p className="lead">
              Regras claras para os engajamentos de consultoria, desenvolvimento de software sob medida,
              agentes de IA, automação de processos e integrações enterprise prestados pela MIIND.
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mt-4">
              Vigência: a partir de 01/01/2026 · v1.0
            </p>
          </motion.div>
        </section>

        <section className="container-editorial mt-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl space-y-4"
          >
            {sections.map((section, i) => (
              <div key={section.title} className="bento-card p-6 sm:p-7 rounded-xl">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  {String(i + 1).padStart(2, '0')} // CLÁUSULA
                </div>
                <h2 className="font-display text-lg sm:text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.body}</p>
              </div>
            ))}

            <div className="pt-6">
              <Link
                to="/politica-de-privacidade"
                className="ink-link inline-flex items-center gap-2 text-sm font-medium text-foreground/85 hover:text-foreground"
              >
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-brand-cyan" />
                Ver Política de Privacidade
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermosDeServicoPage;
