// Conteúdo das landing pages Bu1lder Partners (/builders/:segmento).
// Páginas de captação focadas no mercado brasileiro — conteúdo em pt-BR.

export type BuilderSolution = {
  name: string;
  problem: string;
  benefit: string;
  example: string;
};

export type BuilderProfile = {
  title: string;
  description: string;
  interest: string; // valor pré-selecionado no formulário
};

export type BuilderSegment = {
  slug: string;
  segment: string; // nome do segmento para breadcrumb/SEO
  seoTitle: string;
  seoDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
  };
  market: {
    title: string;
    lead: string;
    points: string[];
  };
  whyPartner: {
    title: string;
    lead: string;
    benefits: Array<{ title: string; description: string }>;
  };
  solutions: {
    title: string;
    lead: string;
    disclaimer: string;
    items: BuilderSolution[];
  };
  argument: {
    title: string;
    text: string;
  };
  profiles: BuilderProfile[];
  complianceNote?: string;
};

export const BUILDER_STEPS = [
  { title: 'Cadastre seu interesse', description: 'Preencha o formulário e conte como você atua no seu mercado.' },
  { title: 'Converse com o time Bu1lder', description: 'Nosso time entra em contato para entender seu momento e seus objetivos.' },
  { title: 'Conheça as soluções e o modelo comercial', description: 'Apresentamos a plataforma, as possibilidades e as condições do programa.' },
  { title: 'Avalie oportunidades no seu mercado', description: 'Mapeamos juntos onde a inteligência artificial gera mais valor na sua carteira.' },
  { title: 'Inicie sua atuação', description: 'Você começa a operar conforme as condições acordadas no programa de parcerias.' },
];

export const BUILDER_INTEREST_OPTIONS = [
  'Quero ser parceiro comercial',
  'Quero representar o Bu1lder',
  'Quero oferecer soluções aos meus clientes',
  'Quero contratar o Bu1lder para minha empresa',
  'Quero conhecer as possibilidades',
];

export const BUILDER_SEGMENTS: Record<string, BuilderSegment> = {
  contabilidade: {
    slug: 'contabilidade',
    segment: 'Contabilidade',
    seoTitle: 'Parceiro Bu1lder para Contabilidade — IA para escritórios contábeis | MIIND',
    seoDescription:
      'Torne-se parceiro do Bu1lder e amplie seu portfólio com agentes de IA e automações para escritórios contábeis e empresas, usando a tecnologia da MIIND.',
    hero: {
      eyebrow: 'Bu1lder Partners · Contabilidade',
      headline: 'Seus clientes precisam de inteligência artificial. Você pode levar essa transformação até eles.',
      subheadline:
        'Torne-se parceiro do Bu1lder e amplie seu portfólio com agentes de IA e automações para escritórios contábeis e empresas, utilizando a tecnologia da MIIND.',
    },
    market: {
      title: 'O mercado contábil está pronto para a IA',
      lead: 'Escritórios contábeis e departamentos financeiros vivem de processos repetitivos, prazos e relacionamento com clientes — exatamente onde a inteligência artificial mais gera valor.',
      points: [
        'Digitalização acelerada dos processos contábeis e fiscais',
        'Demanda crescente por produtividade sem aumento de equipe',
        'Clientes esperando respostas cada vez mais rápidas',
        'Sistemas que não se comunicam e geram retrabalho',
        'Oportunidade de escalar serviços com automação',
      ],
    },
    whyPartner: {
      title: 'Por que ser parceiro Bu1lder?',
      lead: 'Você já tem o relacionamento e o conhecimento do mercado. Nós temos a tecnologia.',
      benefits: [
        { title: 'Amplie seu portfólio', description: 'Ofereça agentes de IA e automações sem precisar desenvolver tecnologia própria.' },
        { title: 'Monetize relacionamentos', description: 'Transforme a confiança que seus clientes já têm em você em novas oportunidades de negócio.' },
        { title: 'Atue em um mercado em transformação', description: 'Posicione-se à frente da adoção de IA no setor contábil.' },
        { title: 'Tecnologia de uma empresa especializada', description: 'Conte com a plataforma, a infraestrutura e o suporte da MIIND.' },
      ],
    },
    solutions: {
      title: 'O que você poderá oferecer',
      lead: 'Exemplos de aplicações de IA para escritórios contábeis e empresas — possibilidades que avaliamos e validamos junto com cada parceiro.',
      disclaimer: 'Exemplos apresentados como possibilidades de aplicação, validadas caso a caso dentro do programa de parcerias.',
      items: [
        { name: 'Agente de atendimento para escritórios', problem: 'Atendimento recorrente consome a equipe', benefit: 'Respostas imediatas às dúvidas frequentes dos clientes', example: 'Cliente pergunta sobre prazos e documentos e recebe resposta na hora.' },
        { name: 'Automação de solicitação de documentos', problem: 'Cobrança manual de documentos todo mês', benefit: 'Solicitações e lembretes automáticos e organizados', example: 'O sistema pede, lembra e organiza os documentos recebidos.' },
        { name: 'Agente de classificação documental', problem: 'Processamento manual de grandes volumes', benefit: 'Organização e classificação automática de documentos', example: 'Notas e recibos são classificados assim que chegam.' },
        { name: 'Assistente de rotinas financeiras', problem: 'Tarefas financeiras repetitivas', benefit: 'Rotinas padronizadas e executadas com consistência', example: 'Conciliações e conferências com apoio de automação.' },
        { name: 'Automação de cobranças e notificações', problem: 'Inadimplência e follow-up manual', benefit: 'Comunicação automática e profissional com clientes', example: 'Lembretes de vencimento enviados automaticamente.' },
        { name: 'Agente de consulta a informações internas', problem: 'Informação espalhada em vários sistemas', benefit: 'Consulta rápida a dados e procedimentos internos', example: 'Equipe pergunta ao agente e encontra a informação em segundos.' },
      ],
    },
    argument: {
      title: 'Seu maior ativo é a confiança dos seus clientes',
      text: 'O contador e o consultor já possuem algo extremamente valioso: a confiança de seus clientes. O Bu1lder permite explorar oportunidades para transformar esse relacionamento em novos serviços baseados em inteligência artificial.',
    },
    profiles: [
      { title: 'Sou contador ou sócio de escritório', description: 'Quero ampliar meu portfólio e oferecer IA aos meus clientes.', interest: 'Quero oferecer soluções aos meus clientes' },
      { title: 'Sou consultor tributário ou financeiro', description: 'Quero desenvolver uma nova oportunidade comercial com tecnologia.', interest: 'Quero ser parceiro comercial' },
      { title: 'Sou representante comercial', description: 'Quero trabalhar com soluções de inteligência artificial.', interest: 'Quero representar o Bu1lder' },
      { title: 'Tenho uma empresa de software ou BPO', description: 'Quero agregar IA ao meu modelo de negócios.', interest: 'Quero ser parceiro comercial' },
      { title: 'Quero usar o Bu1lder na minha operação', description: 'Busco automação e inteligência artificial para minha empresa.', interest: 'Quero contratar o Bu1lder para minha empresa' },
    ],
  },

  beleza: {
    slug: 'beleza',
    segment: 'Beleza',
    seoTitle: 'Parceiro Bu1lder para Beleza — IA para salões e clínicas de estética | MIIND',
    seoDescription:
      'Torne-se parceiro do Bu1lder e ofereça soluções inteligentes para salões, clínicas de estética e empresas do setor de beleza.',
    hero: {
      eyebrow: 'Bu1lder Partners · Beleza',
      headline: 'O mercado da beleza está evoluindo. Seja quem leva inteligência artificial para esses negócios.',
      subheadline:
        'Torne-se parceiro do Bu1lder e ofereça soluções inteligentes para salões, clínicas de estética e empresas do setor, ajudando seus clientes a melhorar atendimento, produtividade e resultados.',
    },
    market: {
      title: 'Um mercado que vive de relacionamento e recorrência',
      lead: 'Salões e clínicas de estética dependem de atendimento rápido, agenda cheia e clientes recorrentes — e é exatamente aí que a inteligência artificial faz diferença.',
      points: [
        'Atendimento rápido define quem fecha o agendamento',
        'Cancelamentos e faltas geram prejuízo recorrente',
        'Clientes inativos são uma receita esquecida',
        'Equipes sobrecarregadas com tarefas administrativas',
        'Negócios que padronizam atendimento crescem com mais consistência',
      ],
    },
    whyPartner: {
      title: 'Por que ser parceiro Bu1lder?',
      lead: 'Você conhece o setor e tem o relacionamento. Nós temos a tecnologia.',
      benefits: [
        { title: 'Amplie seu portfólio', description: 'Ofereça soluções de IA para um setor ávido por inovação.' },
        { title: 'Aproveite relacionamentos existentes', description: 'Leve valor real para os negócios que você já atende.' },
        { title: 'Diferencie-se dos concorrentes', description: 'Seja referência em transformação digital no seu mercado.' },
        { title: 'Tecnologia de uma empresa especializada', description: 'Conte com a plataforma, a infraestrutura e o suporte da MIIND.' },
      ],
    },
    solutions: {
      title: 'O que você poderá oferecer',
      lead: 'Exemplos de aplicações de IA para salões, clínicas de estética e empresas do setor — possibilidades que avaliamos e validamos junto com cada parceiro.',
      disclaimer: 'Exemplos apresentados como possibilidades de aplicação, validadas caso a caso dentro do programa de parcerias.',
      items: [
        { name: 'Agente de atendimento por WhatsApp', problem: 'Demora no atendimento faz perder clientes', benefit: 'Resposta imediata, 24 horas por dia', example: 'Cliente chama no WhatsApp e já é atendido e direcionado.' },
        { name: 'Assistente de agendamentos', problem: 'Agendamentos manuais consomem a recepção', benefit: 'Agenda organizada com menos esforço', example: 'O cliente escolhe horário e confirma sem intervenção da equipe.' },
        { name: 'Confirmação e lembretes automáticos', problem: 'Faltas e cancelamentos de última hora', benefit: 'Redução de ausências com lembretes automáticos', example: 'Cliente recebe lembrete e confirma presença com um toque.' },
        { name: 'Agente de reativação de clientes', problem: 'Clientes inativos esquecidos na base', benefit: 'Recuperação de receita com contato inteligente', example: 'Clientes que não voltam há meses recebem um convite personalizado.' },
        { name: 'Automação de campanhas de relacionamento', problem: 'Comunicação irregular com a base', benefit: 'Relacionamento contínuo e padronizado', example: 'Campanhas de aniversário e promoções enviadas automaticamente.' },
        { name: 'Qualificação de interessados', problem: 'Leads chegam e esfriam sem resposta', benefit: 'Interessados qualificados e encaminhados rápido', example: 'O agente coleta informações e direciona o interessado certo.' },
      ],
    },
    argument: {
      title: 'Relacionamento é o motor desse mercado',
      text: 'Milhares de negócios de beleza dependem de atendimento rápido, relacionamento e recorrência. O parceiro Bu1lder poderá identificar oportunidades para melhorar essas operações por meio da inteligência artificial.',
    },
    profiles: [
      { title: 'Sou consultor de gestão para salões', description: 'Quero ampliar meu portfólio e oferecer IA aos meus clientes.', interest: 'Quero oferecer soluções aos meus clientes' },
      { title: 'Sou empresário do setor de beleza', description: 'Quero desenvolver uma nova oportunidade comercial com tecnologia.', interest: 'Quero ser parceiro comercial' },
      { title: 'Sou representante comercial', description: 'Quero trabalhar com soluções de inteligência artificial.', interest: 'Quero representar o Bu1lder' },
      { title: 'Tenho uma agência ou empresa de serviços', description: 'Quero agregar IA ao meu modelo de negócios.', interest: 'Quero ser parceiro comercial' },
      { title: 'Quero usar o Bu1lder no meu negócio', description: 'Busco automação e inteligência artificial para minha operação.', interest: 'Quero contratar o Bu1lder para minha empresa' },
    ],
  },

  odontologia: {
    slug: 'odontologia',
    segment: 'Odontologia',
    seoTitle: 'Parceiro Bu1lder para Odontologia — IA para clínicas odontológicas | MIIND',
    seoDescription:
      'Faça parte da rede de parceiros Bu1lder e leve agentes de IA e automações para clínicas e redes odontológicas.',
    hero: {
      eyebrow: 'Bu1lder Partners · Odontologia',
      headline: 'Você conhece o mercado odontológico. Nós temos a tecnologia para transformá-lo.',
      subheadline:
        'Faça parte da rede de parceiros Bu1lder e leve agentes de IA e automações para clínicas e redes odontológicas, criando novas oportunidades comerciais a partir do seu conhecimento de mercado.',
    },
    market: {
      title: 'Clínicas odontológicas precisam de eficiência',
      lead: 'Recepções sobrecarregadas, faltas em consultas e orçamentos sem acompanhamento custam caro todos os meses. A inteligência artificial resolve a parte operacional para a equipe focar no paciente.',
      points: [
        'Demora no primeiro atendimento faz perder pacientes',
        'Ausências e cancelamentos desorganizam a agenda',
        'Orçamentos sem follow-up viram receita perdida',
        'Recepções sobrecarregadas com tarefas manuais',
        'Redes e franquias precisam de padronização de atendimento',
      ],
    },
    whyPartner: {
      title: 'Por que ser parceiro Bu1lder?',
      lead: 'Seu conhecimento do setor odontológico somado à nossa tecnologia.',
      benefits: [
        { title: 'Amplie seu portfólio', description: 'Ofereça agentes de IA e automações sem desenvolver tecnologia própria.' },
        { title: 'Aproveite sua rede de relacionamentos', description: 'Leve inovação real para clínicas e redes que você já atende.' },
        { title: 'Atue em um mercado em transformação', description: 'Posicione-se na vanguarda da digitalização da odontologia.' },
        { title: 'Tecnologia de uma empresa especializada', description: 'Conte com a plataforma, a infraestrutura e o suporte da MIIND.' },
      ],
    },
    solutions: {
      title: 'O que você poderá oferecer',
      lead: 'Exemplos de aplicações de IA para clínicas e redes odontológicas — possibilidades que avaliamos e validamos junto com cada parceiro.',
      disclaimer: 'Exemplos apresentados como possibilidades de aplicação, validadas caso a caso dentro do programa de parcerias.',
      items: [
        { name: 'Agente de atendimento e triagem administrativa', problem: 'Demora no primeiro atendimento', benefit: 'Recepção digital imediata e organizada', example: 'Paciente é atendido na hora e direcionado para o agendamento.' },
        { name: 'Assistente de agendamento', problem: 'Agenda gerenciada manualmente', benefit: 'Marcações e remarcações sem sobrecarregar a recepção', example: 'Paciente agenda pelo WhatsApp sem intervenção da equipe.' },
        { name: 'Confirmação automática de consultas', problem: 'Faltas e cancelamentos frequentes', benefit: 'Agenda mais previsível e menos ociosa', example: 'Confirmações e lembretes enviados automaticamente antes da consulta.' },
        { name: 'Agente de relacionamento com pacientes', problem: 'Comunicação irregular com a base', benefit: 'Relacionamento contínuo e padronizado', example: 'Lembretes de retorno e campanhas de prevenção automáticas.' },
        { name: 'Automação de acompanhamento de propostas', problem: 'Orçamentos esquecidos sem follow-up', benefit: 'Mais orçamentos acompanhados até a decisão', example: 'O sistema lembra o paciente do orçamento pendente.' },
        { name: 'Assistente para dúvidas administrativas', problem: 'Recepção repetindo as mesmas respostas', benefit: 'Dúvidas frequentes respondidas na hora', example: 'Horários, convênios e preparos respondidos automaticamente.' },
      ],
    },
    argument: {
      title: 'Tecnologia a serviço da gestão, nunca no lugar do profissional',
      text: 'As aplicações respeitam a LGPD, as regras profissionais aplicáveis e a proteção de dados pessoais sensíveis. Os agentes apoiam a operação administrativa e o relacionamento — não substituem profissionais de saúde nem realizam diagnósticos ou decisões clínicas.',
    },
    complianceNote:
      'Aplicações em conformidade com a LGPD e as regras profissionais do setor. Agentes não substituem profissionais de saúde nem realizam diagnósticos.',
    profiles: [
      { title: 'Sou consultor de gestão odontológica', description: 'Quero ampliar meu portfólio e oferecer IA aos meus clientes.', interest: 'Quero oferecer soluções aos meus clientes' },
      { title: 'Sou empresário do setor', description: 'Quero desenvolver uma nova oportunidade comercial com tecnologia.', interest: 'Quero ser parceiro comercial' },
      { title: 'Sou representante comercial', description: 'Quero trabalhar com soluções de inteligência artificial.', interest: 'Quero representar o Bu1lder' },
      { title: 'Tenho uma empresa de marketing ou software', description: 'Quero agregar IA ao meu modelo de negócios.', interest: 'Quero ser parceiro comercial' },
      { title: 'Quero usar o Bu1lder na minha clínica', description: 'Busco automação e inteligência artificial para minha operação.', interest: 'Quero contratar o Bu1lder para minha empresa' },
    ],
  },
};
