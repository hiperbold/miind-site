// Conteúdo inicial dos globais, transcrito de apps/bu1lder/src/data/niches.ts
// (planos, PERFIL_OPTIONS), apps/bu1lder/src/data/platform-faq.ts e do
// LeadForm/NicheFooter da prévia.

export const planosSeed = {
  mostrarParcelaPlataforma: false,
  planos: [
    {
      chave: 'Essencial' as const,
      preco: 2000,
      parteBu1lder: 800,
      plataforma: 1200,
      inclui: '1 módulo-âncora + IA + WhatsApp',
      destaque: false,
    },
    {
      chave: 'Crescimento' as const,
      preco: 3500,
      parteBu1lder: 1400,
      plataforma: 2100,
      inclui: '3 módulos integrados',
      destaque: true,
    },
    {
      chave: 'Performance' as const,
      preco: 5000,
      parteBu1lder: 2000,
      plataforma: 3000,
      inclui: '5 módulos + painel de gestão',
      destaque: false,
    },
  ],
}

export const faqPlataformaSeed = {
  perguntas: [
    {
      pergunta: 'O Bu1lder é apenas um construtor de chatbot?',
      resposta:
        'Não. O Bu1lder permite criar agentes, fluxos, automações, integrações, dashboards e experiências digitais. O chat é só um dos canais possíveis.',
    },
    {
      pergunta: 'A plataforma se integra aos sistemas da empresa?',
      resposta:
        'Sim, de forma nativa. Conectamos APIs, CRMs, ERPs, bancos de dados, mensageria e ferramentas corporativas via conectores e webhooks.',
    },
    {
      pergunta: 'É possível ter aprovação antes de publicar um fluxo?',
      resposta:
        'Toda alteração entra como uma versão. Você define quem aprova, e nada vai para produção sem o ok do responsável.',
    },
    {
      pergunta: 'O Bu1lder usa IA generativa?',
      resposta:
        'Sim. Orquestramos modelos de linguagem, bases de conhecimento (RAG), prompts versionados, regras de negócio e agentes especializados num mesmo builder.',
    },
    {
      pergunta: 'Serve para grandes empresas?',
      resposta:
        'Foi desenhado para esse cenário: segurança, governança, rastreabilidade, segregação de ambientes e escala estão na base do produto.',
    },
    {
      pergunta: 'A Miind também ajuda na implantação?',
      resposta:
        'O time da MIIND atua como parceiro estratégico, do discovery à evolução contínua, com apoio na implantação e na evolução da solução.',
    },
    {
      pergunta: 'Posso começar por um caso de uso específico?',
      resposta:
        'É o caminho recomendado. Comece por uma dor clara, valide resultados em semanas e depois escale para novos fluxos, áreas e agentes.',
    },
  ],
}

export const formularioSeed = {
  perfis: ['Consultor do Sebrae', 'Consultor de gestão', 'Profissional autônomo', 'Empreendedor', 'Outro'],
  textoConsentimento: 'Autorizo o contato da MIIND/Bu1lder sobre o programa.',
}

export const rodapeSeed = {
  tituloLinks: 'Legal',
  links: [
    { rotulo: 'Política de privacidade', url: 'https://www.miind.com.br/politica-de-privacidade' },
    { rotulo: 'Termos de serviço', url: 'https://www.miind.com.br/termos-de-servico' },
  ],
  textoDireitos: 'MIIND. Todos os direitos reservados.',
}
