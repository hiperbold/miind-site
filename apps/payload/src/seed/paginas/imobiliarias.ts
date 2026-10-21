// Conteúdo de /bu1lder/imobiliarias, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.imobiliarias.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const imobiliarias: PaginaSeed = {
  "titulo": "Imobiliárias e Corretores",
  "slug": "imobiliarias",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Imobiliárias",
    "ordem": 7
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Imobiliárias — soluções de IA para vender | MIIND",
    "description": "A IA atende, qualifica e agenda visita com cada lead em segundos, antes do concorrente."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "Building2",
      "etiqueta": "Programa Bu1lder · Imobiliárias",
      "titulo": "Seja sempre o primeiro a responder cada lead.",
      "texto": "A IA atende, qualifica e agenda visita com cada lead em segundos, antes do concorrente.",
      "linhaDecisor": "Dono da imobiliária ou corretor de alta produção · Quem responde primeiro fecha.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender imobiliárias",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Imobiliária Capital",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "cliente",
            "texto": "Oi, vi o apto de 2 dorm. em Moema. Ainda tá disponível?",
            "hora": "23:47"
          },
          {
            "de": "negocio",
            "texto": "Tá sim! 🏢 Pra te indicar o melhor: orçamento até quanto e pra quando você precisa?",
            "hora": "23:47"
          },
          {
            "de": "cliente",
            "texto": "Até 750k, mudança em uns 60 dias",
            "hora": "23:49"
          },
          {
            "de": "negocio",
            "texto": "Achei 3 opções que batem ✅ Posso agendar visita amanhã às 14h com o corretor Marcos?",
            "hora": "23:49"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "Building2",
          "valor": "28.370",
          "rotulo": "imobiliárias ativas no Brasil",
          "tom": "cyan"
        },
        {
          "icone": "Users",
          "valor": "≈ 580 mil",
          "rotulo": "corretores de imóveis registrados",
          "tom": "violet"
        },
        {
          "icone": "Trophy",
          "valor": "1 venda",
          "rotulo": "paga anos de mensalidade do produto",
          "tom": "mint"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 5 dias a imobiliária começa a operar com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o dono",
          "descricao": "Funil atual, fontes de lead e tempo de resposta."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp + carteira de imóveis",
          "descricao": "Número oficial e base de imóveis com características."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada",
          "descricao": "Aprende regiões, faixas de preço e perguntas de qualificação."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com corretores",
          "descricao": "Validação dos atendimentos e regras de agendamento."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "Cada lead novo é respondido em segundos, 24h por dia."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para uma imobiliária",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "Zap",
          "nome": "Resposta Imediata de Lead",
          "beneficio": "atende em segundos, 24h por dia",
          "exemplo": "Oi! Vi seu interesse no apto de 2 dorm. em Moema 🏢 Pode me contar pra quando você precisa?"
        },
        {
          "icone": "ClipboardCheck",
          "nome": "Qualificador de Cliente",
          "beneficio": "orçamento, região e urgência",
          "exemplo": "Pra te indicar certo: orçamento até R$ 750 mil, bairros Moema e V. Mariana, mudança em 60 dias. Tá certo?"
        },
        {
          "icone": "Repeat",
          "nome": "Follow-up Automático",
          "beneficio": "cadência até o cliente responder",
          "exemplo": "Oi João, separei 3 opções novas em Moema na sua faixa. Posso te mandar agora?"
        },
        {
          "icone": "Home",
          "nome": "Match de Imóveis",
          "beneficio": "envia compatíveis com o perfil",
          "exemplo": "Achei 3 que batem com tudo que você pediu 🏡 R$ 690k, 720k e 745k. Quer agendar visita amanhã?"
        },
        {
          "icone": "BarChart3",
          "nome": "Painel de Funil",
          "beneficio": "leads, conversões e produtividade do time",
          "exemplo": "Mês: 214 leads, 96 qualificados, 41 visitas, 7 propostas. Top corretor: Ana com 12 visitas."
        }
      ],
      "textoEntrega": "Entrega em poucos dias · WhatsApp + IA",
      "ancora": "solucoes",
      "destaque": false
    },
    {
      "blockType": "simulador",
      "etiqueta": "Quanto você ganha",
      "titulo": "Plano recomendado: Performance",
      "subtitulo": "Cliente paga R$ 5.000/mês (setup incluso). Você recebe R$ 2.000/mês por cliente. Pode cobrar acima do piso e ficar com 100% do excedente.",
      "plano": "Performance",
      "rotuloValor": "Sua renda mensal",
      "minClientes": 1,
      "maxClientes": 50,
      "clientesInicial": 10,
      "mostrarAnual": true,
      "mostrarPortfolio": true,
      "aviso": "Você pode cobrar acima do piso e aumentar esse número.",
      "destaque": true
    },
    {
      "blockType": "notasFacilidade",
      "etiqueta": "Facilidade de venda",
      "titulo": "Como imobiliárias se comportam na hora de vender",
      "subtitulo": "Nota de 1 a 10 para cada etapa do processo comercial.",
      "achar": 8,
      "explicar": 8,
      "roi": 9,
      "fechar": 7,
      "destaque": false
    },
    {
      "blockType": "antesDepois",
      "etiqueta": "Caso real (hipotético)",
      "titulo": "Como fica na prática",
      "subtitulo": "Imobiliária de médio porte com 200 leads/mês — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Metade dos leads esfriava antes de qualquer corretor responder.",
        "itens": [
          {
            "rotulo": "Tempo médio de resposta",
            "valor": "horas"
          },
          {
            "rotulo": "Leads perdidos",
            "valor": "~50%"
          },
          {
            "rotulo": "Visitas agendadas/mês",
            "valor": "~25"
          }
        ]
      },
      "depois": {
        "titulo": "Resposta imediata e qualificação automática, 24h por dia.",
        "itens": [
          {
            "rotulo": "Tempo médio de resposta",
            "valor": "segundos"
          },
          {
            "rotulo": "Visitas agendadas/mês",
            "valor": "~50"
          },
          {
            "rotulo": "Conversão lead → visita",
            "valor": "2x"
          }
        ]
      },
      "delta": "Uma única venda paga anos de mensalidade",
      "citacao": "Lead que entrava de madrugada já vinha qualificado e com visita marcada pra de manhã.",
      "autor": "— Renata, imobiliária em Curitiba",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "A IA atende, qualifica e agenda visita com cada lead em segundos, antes do concorrente.",
      "assinatura": "— Argumento de venda Bu1lder · Imobiliárias",
      "destaque": false
    },
    {
      "blockType": "faq",
      "etiqueta": "FAQ",
      "titulo": "Perguntas frequentes",
      "incluirPerguntasPlataforma": true,
      "itens": [
        {
          "pergunta": "Preciso saber programar?",
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução à imobiliária sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para imobiliárias já vêm prontos; a implementação típica leva de 3 a 7 dias úteis."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, pet, restaurantes — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de imobiliárias?",
      "texto": "Seu cadastro já vem com Imobiliárias selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Resposta em segundos a cada lead, 24h por dia"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Mostrei a resposta de madrugada pro dono — fechou no mesmo café.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-imobiliarias"
      }
    }
  ]
}
