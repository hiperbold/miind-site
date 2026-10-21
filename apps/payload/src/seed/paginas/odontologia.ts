// Conteúdo de /bu1lder/odontologia, transcrito sem mudanças de
// apps/bu1lder/src/routes/bu1lders.odontologia.tsx e de apps/bu1lder/src/data/niches.ts.
// Usado pelo seed (src/seed.ts). Depois do seed, a fonte é o admin do Payload.
import type { PaginaSeed } from '../tipos'

export const odontologia: PaginaSeed = {
  "titulo": "Clínicas Odontológicas",
  "slug": "odontologia",
  "tipo": "nicho",
  "navegacao": {
    "rotulo": "Clínicas Odontológicas",
    "ordem": 2
  },
  "visual": "original",
  "temaClaroPadrao": true,
  "cabecalho": {
    "mostrarNavegacaoSegmentos": true,
    "mostrarVoltar": true
  },
  "seo": {
    "title": "Bu1lder para Odontologia — soluções de IA para vender | MIIND",
    "description": "Em 7 dias a clínica passa a confirmar e remarcar cada paciente sozinha no WhatsApp, reduzindo faltas e enchendo a cadeira."
  },
  "layout": [
    {
      "blockType": "heroCelular",
      "icone": "Smile",
      "etiqueta": "Programa Bu1lder · Odontologia",
      "titulo": "Cadeira vazia é dinheiro perdido. Acabe com as faltas em 7 dias.",
      "texto": "A clínica passa a confirmar e remarcar cada paciente sozinha no WhatsApp, reduzindo faltas e enchendo a cadeira.",
      "linhaDecisor": "Dentista-proprietário ou gerente · Sensível a LGPD — privacidade em primeiro lugar.",
      "iconeDecisor": "ShieldCheck",
      "botaoPrincipal": {
        "texto": "Quero atender odontologia",
        "url": "#cadastro"
      },
      "botaoSecundario": {
        "texto": "Ver o que você entrega",
        "url": "#solucoes"
      },
      "celular": {
        "titulo": "Clínica Sorriso",
        "subtitulo": "online · IA Bu1lder",
        "mensagens": [
          {
            "de": "negocio",
            "texto": "Olá Sr. Paulo! Confirmando sua consulta amanhã às 10h com a Dra. Lima 🦷",
            "hora": "08:30"
          },
          {
            "de": "cliente",
            "texto": "Confirmado, obrigado!",
            "hora": "08:32"
          },
          {
            "de": "negocio",
            "texto": "Perfeito ✨ Te esperamos. Qualquer mudança é só responder por aqui.",
            "hora": "08:32"
          }
        ]
      }
    },
    {
      "blockType": "faixaNumeros",
      "itens": [
        {
          "icone": "TrendingDown",
          "valor": "18%",
          "rotulo": "média de faltas em clínicas sem confirmação",
          "tom": "violet"
        },
        {
          "icone": "Building2",
          "valor": "44.553",
          "rotulo": "clínicas odontológicas no Brasil",
          "tom": "cyan"
        },
        {
          "icone": "Wallet",
          "valor": "+450 mil",
          "rotulo": "dentistas — mercado com altíssima recorrência",
          "tom": "mint"
        }
      ]
    },
    {
      "blockType": "linhaDoTempo",
      "etiqueta": "Como funciona",
      "titulo": "Em 7 dias a clínica começa a operar com IA",
      "subtitulo": "Você não programa nada. A Bu1lder cuida da operação enquanto você cuida da relação com o dentista.",
      "passos": [
        {
          "dia": "Dia 1",
          "titulo": "Briefing com o dentista",
          "descricao": "Agenda, procedimentos e voz da clínica."
        },
        {
          "dia": "Dia 2",
          "titulo": "WhatsApp oficial conectado",
          "descricao": "Número da clínica vinculado em minutos."
        },
        {
          "dia": "Dia 3",
          "titulo": "IA treinada com LGPD",
          "descricao": "Mensagens, consentimento e privacidade."
        },
        {
          "dia": "Dia 5",
          "titulo": "Teste com o time",
          "descricao": "Recepção valida fluxos e respostas."
        },
        {
          "dia": "Dia 7",
          "titulo": "Vai ao ar",
          "descricao": "A clínica começa a confirmar, remarcar e cobrar sozinha."
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
          "nome": "Zero Faltas",
          "beneficio": "confirma e remarca pacientes sozinho",
          "exemplo": "Olá Sr. Paulo! Confirmando sua consulta amanhã às 10h com a Dra. Lima. Posso confirmar?"
        },
        {
          "icone": "RotateCcw",
          "nome": "Recall de Retorno",
          "beneficio": "reconvoca manutenção/limpeza semestral",
          "exemplo": "Oi Ana! Faz 6 meses da sua última limpeza. Quer agendar essa semana? 🦷"
        },
        {
          "icone": "ClipboardList",
          "nome": "Triagem e Orçamento IA",
          "beneficio": "qualifica o lead e agenda avaliação",
          "exemplo": "Pra te orientar melhor: é dor, estética ou avaliação geral? Posso já reservar um horário."
        },
        {
          "icone": "Receipt",
          "nome": "Pós-tratamento + Cobrança",
          "beneficio": "acompanha e lembra parcelas em aberto",
          "exemplo": "Tudo certo com o pós do canal? Lembrete: parcela 2/4 vence sexta — link de pagamento abaixo."
        },
        {
          "icone": "BarChart3",
          "nome": "Painel da Clínica",
          "beneficio": "ocupação de cadeira, faltas e origem",
          "exemplo": "Ocupação da semana: 86%. Faltas: 7%. Origem dos novos pacientes: 62% indicação."
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
      "titulo": "Como odontologia se comporta na hora de vender",
      "subtitulo": "Nota de 1 a 10 para cada etapa do processo comercial.",
      "achar": 8,
      "explicar": 9,
      "roi": 10,
      "fechar": 8,
      "destaque": false
    },
    {
      "blockType": "antesDepois",
      "etiqueta": "Caso real (hipotético)",
      "titulo": "Como fica na prática",
      "subtitulo": "Clínica com 3 dentistas — 30 dias depois de ligar a IA.",
      "antes": {
        "titulo": "Cadeira vazia e paciente sumindo entre tratamentos.",
        "itens": [
          {
            "rotulo": "Faltas",
            "valor": "18%"
          },
          {
            "rotulo": "Horários perdidos/mês",
            "valor": "≈ 30"
          },
          {
            "rotulo": "Recall semestral",
            "valor": "manual"
          }
        ]
      },
      "depois": {
        "titulo": "Confirmação, remarcação e recall automáticos no WhatsApp.",
        "itens": [
          {
            "rotulo": "Faltas",
            "valor": "7%"
          },
          {
            "rotulo": "Horários recuperados/mês",
            "valor": "+30"
          },
          {
            "rotulo": "Recall semestral",
            "valor": "automático"
          }
        ]
      },
      "delta": "ROI estimado 6 a 8x",
      "citacao": "A recepção parou de passar o dia ligando — e a cadeira ficou cheia.",
      "autor": "— Dra. Lima, clínica em Moema",
      "destaque": true
    },
    {
      "blockType": "argumento",
      "texto": "A clínica passa a confirmar e remarcar cada paciente sozinha no WhatsApp, reduzindo faltas e enchendo a cadeira.",
      "assinatura": "— Argumento de venda Bu1lder · Odontologia",
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
          "resposta": "Não. A plataforma é 100% no-code: você liga módulos prontos como blocos e entrega a solução à clínica sem escrever uma linha de código."
        },
        {
          "pergunta": "Em quanto tempo entrego?",
          "resposta": "Em poucos dias. Os módulos para odontologia já vêm prontos; a implementação típica leva de 3 a 7 dias úteis e a clínica começa a operar imediatamente."
        },
        {
          "pergunta": "Como recebo?",
          "resposta": "Você tem relação comercial direta com o seu cliente. A Bu1lder cobra de você apenas a parte da plataforma por produto ativo — o restante é seu, todo mês."
        },
        {
          "pergunta": "Posso atender outros mercados?",
          "resposta": "Sim. Você pode montar uma carteira misturando segmentos — beleza, oficinas, pet, restaurantes, varejo — tudo na mesma plataforma Bu1lder."
        }
      ],
      "destaque": true
    },
    {
      "blockType": "chamadaCadastro",
      "etiqueta": "Vamos começar",
      "titulo": "Pronto para montar sua carteira de clientes de odontologia?",
      "texto": "Seu cadastro já vem com Odontologia selecionado. Nossa equipe te chama em até 1 dia útil para o onboarding.",
      "bullets": [
        {
          "texto": "Sem programar — você liga módulos prontos"
        },
        {
          "texto": "Onboarding completo em 3 a 7 dias"
        },
        {
          "texto": "LGPD em primeiro lugar — consentimento e privacidade nativos"
        },
        {
          "texto": "Suporte humano + IA durante toda a jornada"
        }
      ],
      "depoimento": {
        "texto": "Fechei 3 clínicas em um mês — o argumento de reduzir faltas vende sozinho.",
        "autor": "— Bu1lder em atividade"
      },
      "formulario": {
        "formId": "cadastro-odontologia"
      }
    }
  ]
}
