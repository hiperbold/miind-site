# Status do projeto

Atualizado em 21/10/2026. Publicação de revisão visual da MIIND e do Bu1lder no [GitHub Pages](https://hiperbold.github.io/miind-site/). Repositório: [hiperbold/miind-site](https://github.com/hiperbold/miind-site), branch `main`.

## Últimos ajustes

- Todas as 11 LPs de nicho abrem no tema claro, já definido no HTML gerado. A alternância para escuro continua disponível no desktop e no celular. Uma nova abertura da LP restaura o padrão claro.
- Removido o aviso inicial “Prévia de revisão: campos para avaliação; envio ainda não conectado” dos formulários de parceiros. O envio continua desconectado, com erro explícito na tentativa de envio.
- Removida a frase “Jornada ilustrativa. O fluxo e as integrações dependem do escopo de cada cliente” do diagrama inicial da página de agências.
- Documentação organizada em `README.md`, `STATUS.md`, `DEBITO.md` e `AGENTS.md`.

## Implementações recentes

- Institucional na raiz, plataforma em `/bu1lder/`, programa em `/bu1lder/parceiros/` e 11 LPs em `/bu1lder/{nicho}/`.
- DS MIIND aplicado à homepage Bu1lder, programa, contabilidade e agência, com fontes locais e temas claro/escuro.
- Página de agência/gestor criada com foco em quem já atende empresas, oportunidades após o clique e papéis da parceria.
- Removidos os links superiores “Voltar ao site” de programa, contabilidade e agência. Retirada a barra superior de nichos das LPs de contabilidade e agência.
- Rodapé mínimo nas 11 LPs: Bu1lder by MIIND, menu Legal e direitos reservados. Sem anterior/próximo segmento ou retorno ao hub.
- Cadastro sem mensagem. Nas LPs, segmento oculto e predefinido; no hub geral, seletor preservado.
- FAQ com sete perguntas da homepage nas 11 LPs, mantendo as perguntas específicas de cada nicho.
- Calculadora de agência com Essencial, Crescimento e Performance, de 1 a 50 clientes, projeções mensais e anuais e premissas visíveis. Valores de referência herdados do projeto, pendentes de validação comercial.
- Entradas HTML por rota, redirecionamentos dos nichos antigos e publicação por GitHub Actions.

## Estado operacional

| Área | Situação |
| --- | --- |
| Páginas e navegação | Prévia estática publicada |
| Conteúdo comercial | Parcialmente revisado; divergências em aberto |
| Formulários | Interface e validação local; sem transmissão |
| CRM, SDR e notificações | Não conectados |
| Agendamento | Link externo confirmado; rota não implementada neste pacote |
| Blog, newsletter e administração | Backend desconectado |
| Pixel, conversões e atribuição | Desativados nesta prévia |
| SEO e domínio próprio | Preparação de produção pendente; prévia com noindex |

## Verificação

A revisão anterior foi conferida em 14 rotas e nas 11 LPs: carregamento, imagens, rodapés, links legais, segmento oculto, FAQ e contas dos três planos. Contabilidade e agência tiveram inspeção visual em desktop/celular.

Nesta revisão, o build passou e as 11 LPs foram verificadas em celular com preferência escura do navegador e do armazenamento: todas abriram em claro e permitiram alternar para escuro. A página de contabilidade também foi conferida em desktop e após recarregar. As frases removidas não aparecem, e uma tentativa de envio continua apresentando falha explícita, sem simular cadastro.

A publicação é rastreável pelas [execuções do GitHub Actions](https://github.com/hiperbold/miind-site/actions/workflows/pages.yml). Um push para `main` recompõe o site a partir dos fontes; os arquivos em `dist/` não são editados manualmente.

## Próximos trabalhos

1. Validar oferta, comissões, preços, prazos e provas comerciais.
2. Conectar o cadastro ao destino definido e confirmar todo o fluxo de atendimento.
3. Implementar rastreamento e validar o funil antes de usar as páginas em campanhas reais.

Detalhamento em [DEBITO.md](DEBITO.md). Este arquivo concentra o estado atual e as últimas implementações, sem substituir o histórico do Git.
