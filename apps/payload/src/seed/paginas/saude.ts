// Conteúdo de /bu1lder/saude, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.saude.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const saude: PaginaSeed = {
  "titulo": "Clínicas Médicas, Consultórios e Estética Avançada",
  "slug": "saude",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Clínicas Médicas",
    "ordem": 3
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Saúde & Estética — soluções de IA para vender | MIIND",
    "description": "A IA responde, qualifica e agenda seus leads de estética em segundos, 24h por dia."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "Stethoscope",
      "etiqueta": "Programa Bu1lder · Saúde & Estética",
      "titulo": "Transforme cada anúncio em consulta marcada.",
      "texto": "A IA responde, qualifica e agenda seus leads de estética em segundos, 24h por dia.",
      "linhaDecisor": "Médico/esteticista-proprietário ou gestor · Abordagem consultiva.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender saúde & estética",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Clínica Lumen",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "cliente",
            "texto": "Vi seu anúncio do botox, queria entender 👀",
            "hora": "22:41"
          },
          {
            "de": "negocio",
            "texto": "Oi Camila! Posso te passar 2 horários pra avaliação essa semana ✨",
            "hora": "22:41"
          },
          {
            "de": "cliente",
            "texto": "Quinta 18h pode!",
            "hora": "22:42"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "Building2",
          "valor": "≈ 605 mil",
          "rotulo": "estabelecimentos de saúde no Brasil",
          "tom": "cyan"
        },
        {
          "icone": "TrendingUp",
          "valor": "+30%",
          "rotulo": "taxa de agendamento de leads com IA",
          "tom": "mint"
        },
        {
          "icone": "Clock",
          "valor": "24h",
          "rotulo": "respondendo lead em segundos, dia e noite",
          "tom": "violet"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em poucos dias cada lead vira consulta",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono da clínica.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com a clínica",
          "descricao": "Procedimentos, ticket e protocolos."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp + anúncios",
          "descricao": "Conexão com Meta/Google Ads e número oficial."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada",
          "descricao": "Aprende cardápio de procedimentos e tom consultivo."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com o time",
          "descricao": "Validação dos fluxos de qualificação e agenda."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "Cada lead vira consulta marcada, 24h por dia."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para uma clínica",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "CalendarCheck",
          "nome": "Agenda Inteligente",
          "beneficio": "confirmação automática de consultas",
          "exemplo": "Oi Camila! Confirmando sua avaliação de harmonização amanhã às 16h. Posso confirmar?"
        },
        {
          "icone": "Megaphone",
          "nome": "Captador de Leads",
          "beneficio": "qualifica e agenda leads de anúncios 24h",
          "exemplo": "Vi que você se interessou pelo botox 💉 Posso já te passar 2 horários essa semana?"
        },
        {
          "icone": "RotateCcw",
          "nome": "Recall de Procedimentos",
          "beneficio": "reconvoca reaplicação no tempo certo",
          "exemplo": "Já faz 4 meses da sua aplicação. Quer agendar a manutenção e manter o resultado?"
        },
        {
          "icone": "ClipboardList",
          "nome": "Pré-consulta automatizada",
          "beneficio": "coleta anamnese e documentos antes",
          "exemplo": "Pra agilizar sua consulta, responde 3 perguntinhas rápidas e me envia sua foto frontal."
        },
        {
          "icone": "BarChart3",
          "nome": "Painel de Faturamento",
          "beneficio": "origem de leads e ocupação de agenda",
          "exemplo": "Esta semana: 38 leads — 22 de Instagram, 11 de Google, 5 indicação. Agendamento: 31%."
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
      "titulo": "Como saúde & estética se comporta na hora de vender",
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
      "subtitulo": "Clínica de estética que já investia em anúncios — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Investia em anúncios mas perdia leads por demora de resposta.",
        "itens": [
          {
            "rotulo": "Tempo de 1ª resposta",
            "valor": "4h+"
          },
          {
            "rotulo": "Agendamento de leads",
            "valor": "~12%"
          },
          {
            "rotulo": "Atendimento noturno",
            "valor": "—"
          }
        ]
      },
      "depois": {
        "titulo": "IA respondendo e agendando em segundos, 24h por dia.",
        "itens": [
          {
            "rotulo": "Tempo de 1ª resposta",
            "valor": "< 30s"
          },
          {
            "rotulo": "Agendamento de leads",
            "valor": "~30%"
          },
          {
            "rotulo": "Atendimento noturno",
            "valor": "24/7"
          }
        ]
      },
      "delta": "Retorno paga a mensalidade várias vezes",
      "citacao": "A gente parou de perder lead às 22h — agora chega cliente novo todo dia.",
      "autor": "— Drª Camila, clínica de estética em Curitiba",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "A IA responde, qualifica e agenda seus leads de estética em segundos, 24h por dia.",
      "assinatura": "— Argumento de venda Bu1lder · Saúde & Estética",
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
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução à clínica sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para saúde & estética já vêm prontos; a implementação típica leva de 3 a 7 dias úteis."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — beleza, odonto, oficinas, pet, restaurantes — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de saúde & estética?",
      "texto": "Seu cadastro já vem com Saúde & Estética selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Integra com anúncios de Meta e Google"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Fechei 3 clínicas de estética em 30 dias — o argumento de não perder lead vende sozinho.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-saude"
      }
    }
  ]
}
