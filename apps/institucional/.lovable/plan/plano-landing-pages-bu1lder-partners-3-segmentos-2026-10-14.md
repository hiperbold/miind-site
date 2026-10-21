# Plano: Landing Pages Bu1lder Partners (3 segmentos)

Criar três landing pages de captação de parceiros sob `/builders/`, acessíveis pelo menu Bu1lder (que vira um dropdown), seguindo o documento de estratégia enviado.

## Rotas e menu

- `/builders/contabilidade`, `/builders/beleza`, `/builders/odontologia`
- Item de menu **Bu1lder** passa a ser um dropdown (desktop) e grupo expansível (mobile) com as 3 páginas + âncora `#bu1lder` da home
- Traduções pt/en/es para os novos itens de menu

## Arquitetura

Uma página parametrizada por segmento, não três páginas copiadas:

```text
src/pages/builders/BuilderSegmentPage.tsx   (página única, recebe config)
src/lib/buildersSegments.ts                 (conteúdo dos 3 segmentos)
```

Cada segmento tem conteúdo próprio (headline, subheadline, dores, soluções, argumento comercial, perfis) conforme o documento — não será página genérica com nome trocado.

## Estrutura de cada página (8 seções)

1. **Hero** — headline do segmento, subheadline, CTA principal "Quero ser parceiro Bu1lder" (gradiente da marca) + CTA secundário "Quero conhecer as soluções", identificação Miind/Bu1lder, moldura `section-frame` igual à home
2. **Oportunidade de mercado** — argumentos objetivos (digitalização, produtividade, escalabilidade), sem estatísticas inventadas
3. **Por que ser parceiro** — cards de benefícios; sem prometer renda garantida, exclusividade ou comissões
4. **O que você poderá oferecer** — cards de agentes/automações do segmento (ex.: atendimento WhatsApp, agendamento, confirmação de consultas), apresentados como possibilidades de aplicação
5. **Como funciona a parceria** — jornada visual em 5 etapas (cadastro → conversa → soluções → oportunidades → atuação)
6. **Quem está por trás** — bloco Miind (IA aplicada, tecnologia própria, governança, clientes enterprise)
7. **Para quem é** — cards de perfil (consultor, empresário, representante, empresa de serviços, quero contratar); cada card rola para o formulário com o perfil pré-selecionado
8. **Formulário de captação** — nome, e-mail, WhatsApp, empresa, cargo, cidade/estado, perfil de interesse (select pré-preenchido pela seção 7), carteira de clientes, mensagem. Envio via função de e-mail existente (mesmo fluxo do formulário de contato), com campo oculto identificando segmento + jornada (parceiro vs. contratação)

## Regras de conteúdo (do documento)

- Sem percentuais de comissão, garantias de faturamento ou exclusividade
- Odontologia: nota de conformidade LGPD; agentes não substituem profissionais de saúde
- Exemplos de soluções apresentados como possibilidades, não funcionalidades prontas

## Design

- Mesma identidade da home: `section-frame` glass, BorderBeam, eyebrows mono, gradiente cyan→violet, Reveal, tipografia display
- Responsivo (mobile/tablet/desktop), breadcrumb Home → Bu1lder → Segmento, SEO por página via `useSeo`

## Técnico

- Rotas novas em `App.tsx`; dropdown do menu em `Navbar.tsx` (desktop `DropdownMenu`, mobile grupo no Sheet)
- Conteúdo em `buildersSegments.ts` (pt como fonte; chaves i18n no `dict.tsx` para en/es)
- Formulário reutiliza a edge function de e-mail transacional existente; sem tabelas novas
- Validação: build limpo + teste das 3 rotas em desktop e mobile via Playwright
