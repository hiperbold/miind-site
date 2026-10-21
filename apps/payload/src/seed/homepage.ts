// Conteúdo de /bu1lder/ (global "homepage"), transcrito sem mudanças de
// apps/bu1lder/src/routes/index.tsx e de components/site (Header, MobileMenu,
// Hero, HeroVideoModal, NarrativeSections, Sections, ContactForm).
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { DataFromGlobalSlug } from 'payload'

export const homepageSeed: Omit<DataFromGlobalSlug<'homepage'>, 'id'> = {
  _status: 'published',
  cabecalho: {
    links: [
      { rotulo: 'Solução', url: '#solucoes' },
      { rotulo: 'Como funciona', url: '#como-funciona' },
      { rotulo: 'Casos', url: '#casos' },
      { rotulo: 'Governança', url: '#seguranca' },
      { rotulo: 'Bu1lders', url: '/bu1lder/parceiros' },
      { rotulo: 'Contato', url: '#contato' },
    ],
    textoBotao: 'Agendar demo',
    textoBotaoCelular: 'Agendar demonstração',
    urlBotao: '#contato',
  },
  layout: [
    {
      blockType: 'heroPlataforma',
      etiqueta: 'Plataforma enterprise · IA generativa',
      tituloLinha1: 'Agentes, automações e produtos digitais com',
      tituloLinha2: 'IA generativa.',
      texto:
        'A plataforma para tirar a Inteligência Artificial do piloto automático e colocar em operação, conectada aos seus sistemas e clientes, com governança e segurança.',
      botaoPrincipal: { texto: 'Agendar demo', url: '#contato' },
      video: {
        textoBotao: 'Ver como funciona',
        tituloModal: 'Demonstração Bu1lder',
        url: '',
        avisoSemVideo:
          'O vídeo de demonstração não veio no pacote de arquivos. Sua inclusão está registrada como pendência.',
      },
      selos: ['IA Generativa', 'Builder Visual', 'Agentes Inteligentes', 'Governança', 'Integrações', 'Enterprise Ready'],
      cartoes: {
        desempenho: 'Performance em tempo real',
        economiaTitulo: 'Economia com I.A.',
        economiaPeriodo: '90 dias',
        economiaValor: 1248320,
        economiaVariacao: '+32% vs. trimestre anterior',
      },
      integracoes: {
        titulo: 'Integrado aos sistemas que sua operação já usa',
        itens: [
          { nome: 'WhatsApp', icone: 'MessageSquare' },
          { nome: 'Salesforce', icone: 'Cloud' },
          { nome: 'SAP', icone: 'Database' },
          { nome: 'HubSpot', icone: 'Briefcase' },
          { nome: 'Zendesk', icone: 'Headphones' },
          { nome: 'Microsoft 365', icone: 'Mail' },
          { nome: 'Google Workspace', icone: 'Mail' },
          { nome: 'Slack', icone: 'Slack' },
          { nome: 'Stripe', icone: 'CreditCard' },
          { nome: 'Twilio', icone: 'Phone' },
          { nome: 'APIs internas', icone: 'Plug' },
        ],
      },
      rotuloRolagem: 'Scroll',
    },
    {
      blockType: 'faixaNomes',
      etiqueta: 'Empresas que constroem com a Miind',
      nomes: ['Banco Vértice', 'Aurora Saúde', 'Latam Energia', 'GrupoPlena', 'Nexa Telecom', 'Sintra Indústria'],
    },
    {
      blockType: 'gradeCartoes',
      variante: 'problema',
      cabecalho: {
        etiqueta: 'O cenário',
        estiloEtiqueta: 'pilula',
        titulo: 'Empresas não precisam de mais ferramentas. Precisam transformar processos em *software vivo*.',
        subtitulo:
          'Planilhas, fluxos manuais, integrações frágeis, times sobrecarregados e soluções desconectadas convivem com áreas de negócio que precisam testar ideias, automatizar jornadas e criar experiências digitais com velocidade — sem abrir mão de segurança e compliance.',
      },
      itens: [
        { icone: 'Workflow', titulo: 'Processos manuais e lentos' },
        { icone: 'Cable', titulo: 'Canais desconectados' },
        { icone: 'Code2', titulo: 'Dependência excessiva de desenvolvimento tradicional' },
        { icone: 'ShieldAlert', titulo: 'Falta de governança em iniciativas de IA' },
        { icone: 'TrendingDown', titulo: 'Dificuldade para escalar automações' },
        { icone: 'GaugeCircle', titulo: 'Pouca visibilidade sobre indicadores e performance' },
      ],
    },
    {
      blockType: 'camadas',
      ancora: 'solucoes',
      cabecalho: {
        etiqueta: 'A solução',
        estiloEtiqueta: 'pilula',
        titulo: 'Bu1lder: a camada de *criação, orquestração e governança* de IA da sua empresa.',
        subtitulo:
          'Com o Bu1lder, a Miind combina IA generativa, automação visual, integrações, agentes especializados e governança para criar soluções digitais em ciclos curtos. A plataforma permite que empresas criem jornadas inteligentes, conectem sistemas, monitorem interações e evoluam produtos com segurança.',
      },
      rotuloCamada: 'Camada',
      camadas: [
        {
          icone: 'MessageSquare',
          titulo: 'Canais',
          cor: 'ciano',
          itens: ['WhatsApp', 'E-mail', 'Webchat', 'Telefonia', 'Microsoft Teams', 'APIs'],
        },
        {
          icone: 'Workflow',
          titulo: 'Builder Visual',
          cor: 'azul',
          itens: ['Fluxos', 'Regras', 'Prompts', 'Agentes', 'Orquestração', 'Aprovações'],
        },
        {
          icone: 'Sparkles',
          titulo: 'Inteligência',
          cor: 'violeta',
          itens: [
            'LLMs',
            'RAG',
            'Bases de conhecimento',
            'Classificação de intenção',
            'Análise de sentimento',
            'Extração de dados',
          ],
        },
        {
          icone: 'ShieldAlert',
          titulo: 'Governança',
          cor: 'menta',
          itens: ['RBAC', 'Logs', 'Auditoria', 'Versionamento', 'Aprovação', 'Monitoramento', 'LGPD'],
        },
        {
          icone: 'LayoutDashboard',
          titulo: 'Resultados',
          cor: 'ciano',
          itens: [
            'Automação operacional',
            'Redução de custos',
            'Aumento de conversão',
            'Melhor experiência',
            'Dashboards',
            'Escalabilidade',
          ],
        },
      ],
    },
    {
      blockType: 'publicoAlvo',
      cabecalho: {
        etiqueta: 'Para quem é',
        estiloEtiqueta: 'tracos',
        titulo: 'Para empresas que querem sair do piloto e escalar IA com responsabilidade.',
        subtitulo:
          'Se sua empresa já testou IA em iniciativas isoladas, o Bu1lder ajuda a transformar experimentos em produtos operacionais — com governança, integração e evolução contínua.',
      },
      itens: [
        'Grandes empresas',
        'Médias empresas em transformação digital',
        'Áreas de atendimento',
        'Áreas comerciais',
        'Operações',
        'Backoffice',
        'RH',
        'Jurídico',
        'Financeiro',
        'Times de inovação',
        'Agências e consultorias',
      ],
      faixa: {
        titulo: 'Confiado por times de operação, atendimento, vendas e tecnologia',
        itens: ['Indústria · 5k+ colaboradores', 'Varejo · 200 lojas', 'Saúde · multi-unidade', 'Serviços B2B'],
      },
    },
    {
      blockType: 'gradeCartoes',
      variante: 'construir',
      cabecalho: {
        etiqueta: 'O que você pode construir',
        estiloEtiqueta: 'pilula',
        titulo: 'De agentes a aplicações completas — *o que o negócio precisa*.',
      },
      itens: [
        {
          icone: 'Bot',
          titulo: 'Agentes de IA Generativa',
          texto:
            'Crie agentes especializados para atendimento, vendas, suporte, RH, financeiro, jurídico, operações e relacionamento com clientes.',
        },
        {
          icone: 'Workflow',
          titulo: 'Fluxos de automação',
          texto: 'Desenhe jornadas com regras, condições, integrações, aprovações e ações automatizadas.',
        },
        {
          icone: 'MessageSquare',
          titulo: 'Experiências conversacionais',
          texto: 'Construa canais inteligentes em WhatsApp, webchat, e-mail, Teams e outros pontos de contato.',
        },
        {
          icone: 'Boxes',
          titulo: 'Aplicações internas',
          texto: 'Transforme planilhas e processos manuais em sistemas internos, dashboards e ferramentas operacionais.',
        },
        {
          icone: 'LayoutDashboard',
          titulo: 'Dashboards e analytics',
          texto: 'Monitore interações, intenções, SLA, sentimento, conversão, produtividade e performance.',
        },
        {
          icone: 'Layers',
          titulo: 'Esteiras de IA corporativa',
          texto: 'Padronize, monitore e escale iniciativas de IA com governança, segurança e controle.',
        },
      ],
    },
    {
      blockType: 'etapasPlataforma',
      ancora: 'como-funciona',
      cabecalho: { etiqueta: 'Como funciona', estiloEtiqueta: 'tracos', titulo: 'Da demanda à operação em 5 etapas.' },
      rotuloEtapa: 'Etapa',
      etapas: [
        {
          icone: 'Search',
          titulo: 'Diagnóstico',
          texto: 'Mapeamos a dor, o processo, os canais, os sistemas e os indicadores de sucesso.',
        },
        {
          icone: 'PenLine',
          titulo: 'Desenho da solução',
          texto: 'Transformamos a demanda em fluxos, agentes, regras, integrações e telas.',
        },
        {
          icone: 'Hammer',
          titulo: 'Construção no Bu1lder',
          texto: 'Criamos automações, agentes e experiências digitais em ciclos rápidos, com validação contínua.',
        },
        {
          icone: 'Plug',
          titulo: 'Integração e governança',
          texto: 'Conectamos sistemas, configuramos permissões, logs, auditoria, segurança e monitoramento.',
        },
        {
          icone: 'Activity',
          titulo: 'Operação e evolução',
          texto: 'Medimos resultados, ajustamos fluxos, melhoramos prompts, criamos novas versões e escalamos.',
        },
      ],
      fraseFinal: 'Não é apenas criar rápido. É criar rápido com controle.',
    },
    {
      blockType: 'casosUso',
      ancora: 'casos',
      cabecalho: { etiqueta: 'Casos de uso', estiloEtiqueta: 'tracos', titulo: 'Onde o Bu1lder já faz diferença.' },
      abas: [
        {
          nome: 'Atendimento e CX',
          itens: [
            'Atendimento inteligente via WhatsApp',
            'Triagem automática',
            'Resolução de dúvidas',
            'Encaminhamento humano assistido',
            'Análise de sentimento',
          ],
        },
        {
          nome: 'Vendas',
          itens: [
            'Captação e qualificação de leads',
            'Pré-vendas automatizado',
            'Follow-up inteligente',
            'Recomendação de produtos',
            'Conversão assistida',
          ],
        },
        {
          nome: 'Financeiro',
          itens: [
            'Leitura de documentos',
            'Conferência de dados',
            'Entrada de notas e recibos',
            'Automação de aprovações',
            'Integração com ERP',
          ],
        },
        {
          nome: 'RH',
          itens: [
            'Atendimento interno',
            'Onboarding',
            'FAQ corporativo',
            'Triagem de solicitações',
            'Pesquisas e análise de clima',
          ],
        },
        {
          nome: 'Jurídico e Compliance',
          itens: [
            'Consulta a políticas',
            'Análise documental',
            'Classificação de demandas',
            'Registro de evidências',
            'Auditoria de interações',
          ],
        },
        {
          nome: 'Operações',
          itens: [
            'Abertura de chamados',
            'Distribuição de tarefas',
            'Monitoramento de processos',
            'Alertas automáticos',
            'Dashboards gerenciais',
          ],
        },
      ],
    },
    {
      blockType: 'metricas',
      marcador: '·',
      etiqueta: 'Impacto mensurável',
      titulo: 'Números que _comprovam_ a operação.',
      principal: { valor: '12×', rotulo: 'ciclos de entrega mais rápidos vs. dev tradicional' },
      secundarios: [
        { valor: '94%', rotulo: 'adoção pelas áreas de negócio em 90 dias' },
        { valor: '60%', rotulo: 'redução média de custo operacional' },
        { valor: '0', rotulo: 'incidentes de segurança em auditorias enterprise' },
      ],
    },
    {
      blockType: 'depoimentoDestaque',
      texto:
        'O Bu1lder mudou o ritmo da nossa transformação. O que antes levava trimestres em sprints de TI, agora a operação entrega em *semanas* — com a mesma governança que nossa auditoria exige.',
      iniciais: 'MR',
      autor: 'Mariana Resende',
      cargo: 'Head de Transformação Digital · Banco Vértice',
    },
    {
      blockType: 'gradeCartoes',
      variante: 'diferencial',
      cabecalho: {
        etiqueta: 'Diferenciais',
        estiloEtiqueta: 'tracos',
        titulo: 'O diferencial não está só na IA. Está em como ela entra na operação.',
      },
      rotuloItem: 'Diferencial',
      itens: [
        {
          titulo: 'Builder visual corporativo',
          texto: 'Fluxos, agentes, regras e integrações em um ambiente visual, controlado e escalável.',
        },
        {
          titulo: 'Governança desde o primeiro dia',
          texto: 'Permissões, trilhas de auditoria, versionamento, logs e aprovações.',
        },
        {
          titulo: 'Segurança e LGPD',
          texto: 'Arquitetura pensada para ambientes corporativos, com segregação de acessos e rastreabilidade.',
        },
        {
          titulo: 'Integração com sistemas reais',
          texto: 'Conecte ERP, CRM, APIs, bancos de dados, mensageria e canais digitais.',
        },
        { titulo: 'Observabilidade', texto: 'Monitore performance, gargalos, comportamento, qualidade e resultados.' },
        {
          titulo: 'Evolução contínua',
          texto: 'Cada agente e fluxo pode ser medido, ajustado, versionado e melhorado.',
        },
        {
          titulo: 'Metodologia Miind',
          texto: 'Discovery, ideação, desenho, construção, implantação e evolução com time especialista.',
        },
        {
          titulo: 'Velocidade com responsabilidade',
          texto: 'Ciclos rápidos sem abrir mão de arquitetura, segurança e controle.',
        },
      ],
    },
    {
      blockType: 'gradeCartoes',
      variante: 'governanca',
      ancora: 'seguranca',
      cabecalho: {
        etiqueta: 'Segurança e governança',
        estiloEtiqueta: 'tracos',
        titulo: 'IA generativa com controle — para quem não pode operar no improviso.',
        subtitulo:
          'O Bu1lder foi pensado para empresas que precisam inovar com IA sem perder o controle sobre dados, acessos, decisões, versões e resultados. Cada automação, agente e interação é rastreável, monitorável e evolutiva.',
      },
      itens: [
        { icone: 'Lock', titulo: 'RBAC: controle de acesso por perfil' },
        { icone: 'ScrollText', titulo: 'Logs de interação' },
        { icone: 'Eye', titulo: 'Auditoria de alterações' },
        { icone: 'GitBranch', titulo: 'Versionamento de fluxos e prompts' },
        { icone: 'CheckCircle2', titulo: 'Aprovação antes de publicação' },
        { icone: 'Layers', titulo: 'Segregação de ambientes' },
        { icone: 'GaugeCircle', titulo: 'Monitoramento de custos e consumo' },
        { icone: 'Cable', titulo: 'Conectores seguros' },
        { icone: 'ScrollText', titulo: 'Políticas de retenção' },
        { icone: 'ShieldAlert', titulo: 'Conformidade com LGPD' },
        { icone: 'Activity', titulo: 'Observabilidade operacional' },
        { icone: 'Bot', titulo: 'Human-in-the-loop quando necessário' },
      ],
    },
    {
      blockType: 'gradeCartoes',
      variante: 'metodologia',
      cabecalho: {
        etiqueta: 'Metodologia',
        estiloEtiqueta: 'tracos',
        titulo: 'Uma plataforma poderosa. Uma metodologia para tirar do papel.',
      },
      itens: [
        {
          numero: '1',
          titulo: 'Descoberta',
          texto: 'Entendimento profundo da dor, da operação, dos usuários, sistemas e indicadores.',
        },
        { numero: '2', titulo: 'Ideação', texto: 'Criação rápida de hipóteses, fluxos, jornadas e protótipos testáveis.' },
        { numero: '3', titulo: 'Desenho', texto: 'Arquitetura, integrações, regras, agentes e modelo de governança.' },
        { numero: '4', titulo: 'Construção', texto: 'Configuração, integrações, testes e implantação no ambiente real.' },
        { numero: '5', titulo: 'Evolução', texto: 'Monitoramento, melhoria contínua, novas versões e escala.' },
      ],
      fraseFinal: {
        texto: 'O Bu1lder acelera a tecnologia.',
        destaque: 'A Miind garante que ela resolva o problema certo.',
      },
    },
    {
      blockType: 'gradeCartoes',
      variante: 'beneficio',
      cabecalho: {
        etiqueta: 'Benefícios',
        estiloEtiqueta: 'tracos',
        titulo: 'O que muda quando sua empresa constrói com o Bu1lder.',
      },
      itens: [
        {
          icone: 'ArrowRight',
          titulo: 'Ciclos mais curtos',
          texto: 'De meses para semanas: do diagnóstico ao agente em operação.',
        },
        {
          icone: 'ArrowRight',
          titulo: 'Menos dependência de TI',
          texto: 'Áreas de negócio constroem fluxos com governança e suporte do time técnico.',
        },
        {
          icone: 'ArrowRight',
          titulo: 'Padronização real',
          texto: 'Agentes, prompts e integrações versionados e reutilizáveis entre áreas.',
        },
        {
          icone: 'ArrowRight',
          titulo: 'Integração com seus sistemas',
          texto: 'ERP, CRM, APIs, mensageria e bancos conectados ao mesmo builder.',
        },
        {
          icone: 'ArrowRight',
          titulo: 'Controle ponta a ponta',
          texto: 'Permissões, logs, auditoria e aprovação antes de publicar.',
        },
        {
          icone: 'ArrowRight',
          titulo: 'Escala com responsabilidade',
          texto: 'Cresça em casos de uso sem perder visibilidade nem segurança.',
        },
      ],
    },
    {
      blockType: 'manifesto',
      etiqueta: 'Manifesto',
      linhas: [
        { texto: 'Software não deveria ser estático.' },
        { texto: 'Cada processo é vivo — aprende com o contexto e evolui com quem opera.' },
        { texto: 'É isso que chamamos de *software vivo*.' },
      ],
      assinatura: 'Miind · Bu1lder',
    },
    {
      blockType: 'faqSecao',
      variante: 'plataforma',
      etiqueta: 'FAQ',
      titulo: 'Perguntas frequentes',
      incluirPerguntasPlataforma: true,
      itens: [],
    },
    {
      blockType: 'convite',
      etiqueta: 'Convite',
      titulo: 'Vamos transformar sua operação em *software vivo*.',
      texto:
        'Conte sua dor. Mostramos, em uma sessão de 30 minutos, como o Bu1lder se encaixa — com governança, integrações e ciclos curtos.',
      botao: { texto: 'Agendar demo', url: '#contato' },
      linkSecundario: { texto: 'Ou fale com um especialista', url: '#contato' },
    },
    {
      blockType: 'contato',
      ancora: 'contato',
      etiqueta: 'Início de conversa',
      titulo: 'Comece com _uma dor real_. Saímos com um plano.',
      texto:
        'Em 30 minutos, mapeamos seu caso e mostramos como o Bu1lder encaixa governança, integrações e IA na sua operação.',
      itens: [
        { titulo: 'Diagnóstico em 30 min', texto: 'Sem compromisso, com especialista sênior.' },
        { titulo: 'Plano de implantação', texto: 'Caminho claro do piloto à operação.' },
        { titulo: 'Demo viva', texto: 'Vemos o Bu1lder rodando em um caso real.' },
      ],
      citacao: { texto: 'O Bu1lder mudou o ritmo da nossa transformação.', autor: 'Mariana Resende · Banco Vértice' },
      formulario: {
        opcoesVolume: [
          { valor: 'ate-100', rotulo: 'Até 100 colaboradores' },
          { valor: '100-500', rotulo: '100–500' },
          { valor: '500-2000', rotulo: '500–2.000' },
          { valor: '2000+', rotulo: '2.000+' },
          { valor: 'atendimentos', rotulo: 'Alto volume de atendimentos' },
        ],
        aviso: 'Ao enviar, você concorda em ser contatado pela Miind. Tratamos seus dados conforme a LGPD.',
        textoBotao: 'Quero falar com a Miind',
      },
    },
  ],
  rodape: {
    etiqueta: 'Miind',
    frase: 'Tecnologia para humanos *criativos*.',
    texto:
      'Bu1lder é a plataforma da Miind para transformar demandas de negócio em software, automações e agentes — com governança enterprise.',
    descricaoMarca: 'Construa, governe e evolua agentes, fluxos e produtos digitais num só ambiente.',
    colunas: [
      {
        titulo: 'Plataforma',
        links: [
          { rotulo: 'Solução', url: '#solucoes' },
          { rotulo: 'Como funciona', url: '#como-funciona' },
          { rotulo: 'Casos de uso', url: '#casos' },
          { rotulo: 'Governança', url: '#seguranca' },
        ],
      },
      {
        titulo: 'Empresa',
        links: [
          { rotulo: 'Contato', url: '#contato' },
          { rotulo: 'LinkedIn', url: 'https://www.linkedin.com' },
          { rotulo: 'comercial@miind.ai', url: 'mailto:comercial@miind.ai' },
        ],
      },
      {
        titulo: 'Legal',
        links: [
          { rotulo: 'Política de privacidade', url: '#' },
          { rotulo: 'LGPD', url: '#' },
        ],
      },
    ],
    direitos: 'Miind. Todos os direitos reservados.',
    assinatura: ['Bu1lder', 'Software vivo'],
  },
  seo: {
    title: 'Bu1lder by Miind | Agentes, automações e software com IA generativa',
    description:
      'Crie agentes de IA, fluxos de automação, integrações e aplicações digitais com governança enterprise. Conheça o Bu1lder, a plataforma da Miind.',
    keywords:
      'IA generativa, agentes de IA, automação empresarial, builder visual, chatbot enterprise, governança de IA, Miind, Bu1lder',
    ogTitle: 'Bu1lder by Miind',
    ogDescription:
      'A plataforma da Miind para criar agentes, fluxos e aplicações com IA generativa e governança enterprise.',
    dadosEstruturados: {
      nome: 'Bu1lder by Miind',
      descricao:
        'Plataforma para criação de agentes de IA generativa, fluxos visuais de automação e aplicações digitais com governança enterprise.',
      organizacao: 'Miind',
      slogan: 'Tecnologia para humanos criativos.',
    },
  },
}
