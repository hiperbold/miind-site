export type FaqEntry = { q: string; a: string };

export const platformFaqs: FaqEntry[] = [
  {
    q: "O Bu1lder é apenas um construtor de chatbot?",
    a: "Não. O Bu1lder permite criar agentes, fluxos, automações, integrações, dashboards e experiências digitais. O chat é só um dos canais possíveis.",
  },
  {
    q: "A plataforma se integra aos sistemas da empresa?",
    a: "Sim, de forma nativa. Conectamos APIs, CRMs, ERPs, bancos de dados, mensageria e ferramentas corporativas via conectores e webhooks.",
  },
  {
    q: "É possível ter aprovação antes de publicar um fluxo?",
    a: "Toda alteração entra como uma versão. Você define quem aprova, e nada vai para produção sem o ok do responsável.",
  },
  {
    q: "O Bu1lder usa IA generativa?",
    a: "Sim. Orquestramos modelos de linguagem, bases de conhecimento (RAG), prompts versionados, regras de negócio e agentes especializados num mesmo builder.",
  },
  {
    q: "Serve para grandes empresas?",
    a: "Foi desenhado para esse cenário: segurança, governança, rastreabilidade, segregação de ambientes e escala estão na base do produto.",
  },
  {
    q: "A Miind também ajuda na implantação?",
    a: "O time da MIIND atua como parceiro estratégico, do discovery à evolução contínua, com apoio na implantação e na evolução da solução.",
  },
  {
    q: "Posso começar por um caso de uso específico?",
    a: "É o caminho recomendado. Comece por uma dor clara, valide resultados em semanas e depois escale para novos fluxos, áreas e agentes.",
  },
];
