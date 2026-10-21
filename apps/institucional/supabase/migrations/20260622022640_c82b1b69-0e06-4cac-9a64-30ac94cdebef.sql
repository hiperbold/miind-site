UPDATE public.posts SET cover_url = 'auto/' || slug || '.jpg'
WHERE slug IN (
  'agentes-de-ia-em-producao-o-que-muda-quando-eles-param-de-ser-demo',
  'memoria-ferramentas-e-contexto-a-anatomia-de-um-agente-confiavel',
  'quando-nao-usar-um-agente-7-sinais-de-que-um-workflow-resolve-melhor',
  'automacao-que-escala-do-rpa-fragil-ao-orquestrador-com-ia',
  'esteira-de-sinistro-com-ia-o-caso-real-da-reducao-de-lead-time',
  'backoffice-invisivel-automatizando-o-que-ninguem-quer-fazer',
  'discovery-com-ia-como-validar-5-hipoteses-na-semana-1',
  'mvp-em-4-semanas-o-framework-miind-de-produto',
  'metricas-que-importam-em-produtos-com-ia-e-as-que-enganam',
  'observabilidade-para-llms-o-que-medir-alem-da-latencia',
  'custos-de-ia-sob-controle-caching-fallback-e-roteamento-de-modelos',
  'do-poc-ao-sla-arquitetura-de-runtime-para-agentes-247',
  'auditabilidade-em-ia-trilhas-versionamento-e-explicabilidade',
  'lgpd-na-pratica-dados-sensiveis-em-pipelines-de-ia',
  'prompt-injection-vazamento-e-jailbreak-defesas-que-realmente-funcionam'
);