// Conteúdo de /bu1lder/academias, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.academias.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const academias: PaginaSeed = {
  "titulo": "Academias, Estúdios e Fitness",
  "slug": "academias",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Academias",
    "ordem": 8
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Academias & Fitness — soluções de IA para vender | MIIND",
    "description": "A IA identifica quem está sumindo e traz de volta antes que peça baixa."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "Dumbbell",
      "etiqueta": "Programa Bu1lder · Academias & Fitness",
      "titulo": "Recupere o aluno sumido antes que ele cancele.",
      "texto": "A IA identifica quem está sumindo e traz de volta antes que peça baixa.",
      "linhaDecisor": "Dono ou gerente · Foco em reduzir cancelamento e recuperar aluno sumido.",
      "iconeDecisor": null,
      "botaoPrincipal": {
        "texto": "Quero atender academias & fitness",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Academia Movimento",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "negocio",
            "texto": "Oi João! Senti sua falta no treino esta semana 💪",
            "hora": "18:02"
          },
          {
            "de": "cliente",
            "texto": "Pois é, tô meio sem ânimo 😅",
            "hora": "18:05"
          },
          {
            "de": "negocio",
            "texto": "Bora marcar amanhã 7h com a Dani? Treino leve pra voltar no ritmo 🏋️",
            "hora": "18:05"
          },
          {
            "de": "cliente",
            "texto": "Fechado, te vejo amanhã!",
            "hora": "18:07"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "Building2",
          "valor": "62.718",
          "rotulo": "CNPJs ativos no setor fitness",
          "tom": "cyan"
        },
        {
          "icone": "TrendingDown",
          "valor": "−2,5pp",
          "rotulo": "de churn no caso real abaixo",
          "tom": "violet"
        },
        {
          "icone": "Wallet",
          "valor": "+R$ 2.200",
          "rotulo": "de recorrência recuperada por mês",
          "tom": "mint"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 5 dias a academia começa a operar com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dono.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o dono",
          "descricao": "Planos, mensalidades e churn atual."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp + base de alunos",
          "descricao": "Número oficial e histórico de frequência e pagamento."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada",
          "descricao": "Aprende gatilhos de evasão, planos e regras de cobrança."
        },
        {
          "dia": "Dia 4",
          "titulo": "Teste com a recepção",
          "descricao": "Validação das mensagens de reengajamento e cobrança."
        },
        {
          "dia": "Dia 5",
          "titulo": "Vai ao ar",
          "descricao": "A academia começa a recuperar aluno sumido sozinha."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "modulos",
      "etiqueta": "5 soluções que você pode construir",
      "titulo": "O que você entrega para uma academia ou estúdio",
      "subtitulo": "Cinco módulos que você liga no cliente como blocos. A IA, o WhatsApp e a infraestrutura ficam por conta da Bu1lder.",
      "itens": [
        {
          "icone": "HeartPulse",
          "nome": "Anti-evasão IA",
          "beneficio": "reengaja antes do cancelamento",
          "exemplo": "Oi João! Senti sua falta no treino esta semana 💪 Te vejo amanhã às 7h?"
        },
        {
          "icone": "CreditCard",
          "nome": "Cobrança de Mensalidade",
          "beneficio": "régua automática reduz inadimplência",
          "exemplo": "Sua mensalidade vence amanhã 💳 Pix da academia: chave@academia. Quer link de cartão?"
        },
        {
          "icone": "UserPlus",
          "nome": "Captador de Matrículas",
          "beneficio": "agenda aula experimental",
          "exemplo": "Oi! Vi seu interesse 🏋️ Quer fazer uma aula experimental grátis quinta às 19h?"
        },
        {
          "icone": "Sparkles",
          "nome": "Onboarding de Aluno",
          "beneficio": "acompanha as primeiras semanas",
          "exemplo": "Semana 1 ✅ Como foi seu treino hoje? Quer marcar avaliação com o personal?"
        },
        {
          "icone": "BarChart3",
          "nome": "Painel de Retenção",
          "beneficio": "frequência, churn e inadimplência",
          "exemplo": "Mês: 812 alunos, churn 5,5%, inadimplência 6%. Em risco: 38 alunos com baixa frequência."
        }
      ],
      "textoEntrega": "Entrega em poucos dias · WhatsApp + IA",
      "ancora": "solucoes",
      "destaque": false
    },
    {
      "blockType": "simulador",
      "etiqueta": "Quanto você ganha",
      "titulo": "Plano recomendado: Crescimento",
      "subtitulo": "Cliente paga R$ 3.500/mês (setup incluso). Você recebe R$ 1.400/mês por cliente. Pode cobrar acima do piso e ficar com 100% do excedente.",
      "plano": "Crescimento",
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
      "titulo": "Como academias & fitness se comportam na hora de vender",
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
      "subtitulo": "Academia de bairro com 800 alunos — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Aluno sumia 3 semanas e voltava só pra cancelar o plano.",
        "itens": [
          {
            "rotulo": "Churn mensal",
            "valor": "8%"
          },
          {
            "rotulo": "Alunos perdidos/mês",
            "valor": "~64"
          },
          {
            "rotulo": "Reengajamento",
            "valor": "Manual"
          }
        ]
      },
      "depois": {
        "titulo": "Anti-evasão chama o aluno antes que ele peça baixa.",
        "itens": [
          {
            "rotulo": "Churn mensal",
            "valor": "5,5%"
          },
          {
            "rotulo": "Alunos retidos/mês",
            "valor": "+20"
          },
          {
            "rotulo": "Recorrência extra",
            "valor": "+R$ 2.200"
          }
        ]
      },
      "delta": "ROI recorrente de ~4x",
      "citacao": "Aluno que ia cancelar voltou só porque a IA chamou na hora certa.",
      "autor": "— Diego, academia em Porto Alegre",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "A IA identifica quem está sumindo e traz de volta antes que peça baixa.",
      "assinatura": "— Argumento de venda Bu1lder · Academias & Fitness",
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
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos e entrega a solução à academia sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para academias & fitness já vêm prontos; a implementação típica leva de 3 a 7 dias úteis."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — odonto, beleza, saúde, oficinas, pet, restaurantes, imobiliárias — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de academias & fitness?",
      "texto": "Seu cadastro já vem com Academias & Fitness selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "Anti-evasão automático no WhatsApp"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Mostrei o anti-evasão pro dono — ele fechou pensando nos 20 alunos que perdeu mês passado.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-academias"
      }
    }
  ]
}
