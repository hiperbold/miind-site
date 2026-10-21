# Regras do projeto MIIND + Bu1lder

Estas instruções se aplicam ao repositório inteiro. Pedidos explícitos do Filipe prevalecem sobre convenções locais.

## Repositório e fontes de trabalho

- GitHub: `https://github.com/hiperbold/miind-site`.
- Branch de publicação: `main`.
- Pages: `https://hiperbold.github.io/miind-site/`.
- Checkout habitual: `~/github-projects/miind-site`.
- Editar os fontes deste checkout. Os projetos originais e os materiais estratégicos do cliente permanecem fora do repositório, na pasta MIIND do Drive local.
- Repositório público: não versionar `.env`, credenciais, dados de leads, contratos, pesquisas internas ou materiais operacionais do cliente.

## Linguagens e arquitetura

- Aplicações em TypeScript/TSX, React e CSS.
- `apps/institucional`: React 18, Vite 7, Tailwind CSS 3, React Router 6.
- `apps/bu1lder`: React 19, Vite 7, Tailwind CSS 4, React Router 6.
- O Bu1lder recebido usava TanStack Start. A prévia usa `src/static-router.tsx` para compatibilidade com componentes/rotas originais; não presumir que o servidor TanStack está disponível.
- Scripts em JavaScript com Node.js. Runtime recomendado para build: Node.js 22.12+.
- Manter dependências e estilos dos dois apps separados. Não introduzir atualização ampla de bibliotecas como parte de uma alteração de conteúdo.
- `scripts/build.mjs` compõe os builds em `dist/` e materializa as rotas. Não editar `dist/` nem os arquivos gerados dentro dos apps.

## Rotas e assets

- Institucional na raiz; plataforma em `/bu1lder/`; programa em `/bu1lder/parceiros/`; LPs em `/bu1lder/{nicho}/`.
- O Pages usa prefixo `/miind-site/`. Respeitar `SITE_BASE`, `import.meta.env.BASE_URL` e os helpers existentes.
- Ao criar uma rota, atualizar a aplicação e a geração da entrada HTML no build. Conferir acesso direto e atualização da página no Pages.
- Não usar links para a raiz do domínio GitHub que eliminem o prefixo do projeto.
- Assets locais do Bu1lder passam por `assetUrl` quando necessário. Preservar o desenho e as proporções dos vetores MIIND.
- Não usar descritores de mídia ausente como se fossem os arquivos reais.

## Design e conteúdo

- DS MIIND: títulos Sora, corpo Manrope, etiquetas/dados JetBrains Mono. Azul institucional `#1d3cab`; interface em ciano, azul e violeta.
- A camada `miind-ds.css` é ativada nas rotas definidas em `main-static.tsx`. Atualmente cobre homepage Bu1lder, programa, contabilidade e agência. Os outros nove mercados mantêm o estilo original.
- Todas as 11 LPs de nicho devem abrir em light por padrão, sem depender de preferência escura do sistema ou de uma visita anterior. O visitante pode alternar para dark na página. Manter o controle acessível também no celular.
- O HTML gerado das LPs deve iniciar em light para evitar flash escuro. A aplicação também inicializa o tema a partir da rota.
- Sem “Voltar ao site” no cabeçalho de programa, contabilidade e agência. Sem barra superior de nichos em contabilidade e agência.
- Rodapés de nicho usam `NicheFooter`: somente marca Bu1lder by MIIND, menu Legal e direitos reservados. Sem anterior/próximo segmento e sem retorno ao hub.
- FAQ da homepage em `data/platform-faq.ts`. Nas LPs, usar `NicheFaq`, preservando perguntas específicas quando aplicável. Não duplicar a lista comum em cada página.
- Não usar travessão em nova copy. Manter o idioma e a finalidade de cada página; o institucional recebido tem conteúdo em inglês.
- LP de agência fala com dono de agência/gestor que já atende empresas. Contabilidade deve se alinhar ao dono do escritório e à carteira de clientes.
- Não inventar clientes, casos, depoimentos, preços, prazos, renda garantida, ROI ou condições de certificação. Divergências comerciais ficam no débito até haver definição.

## Formulários e simuladores

- Cadastro de parceiros sem campo mensagem.
- Nas LPs, segmento oculto e predefinido pela página. No hub geral, o seletor continua disponível.
- Não recolocar o aviso visual inicial de prévia removido pelo Filipe.
- Os formulários ainda estão desconectados. Não simular sucesso nem afirmar que houve envio quando não houve. Ao conectar backend, revisar consentimento, sucesso e falha reais.
- Usar IDs únicos para formulários e seções de âncora.
- Calculadora de agência reutiliza `EarningsSimulator` com os três planos existentes. Valores são referências, com divergência comercial de 40% x 70% ainda pendente.
- Preservar as premissas: carteira constante por 12 meses, antes de impostos e despesas. Não apresentar projeção como resultado comprovado.
- Link de agenda confirmado: `https://www.miind.com.br/typ-agendar`. A rota ainda não está implementada neste pacote.

## Trabalho local e verificação

```sh
npm run setup
npm run build
node scripts/serve.mjs
```

A prévia fica em `http://127.0.0.1:4173/miind-site/`.

- Antes de alterar, conferir `git status`, `STATUS.md` e `DEBITO.md`.
- Executar `npm run build` após mudanças de código e verificar as páginas afetadas em desktop e celular.
- Conferir temas, links, âncoras e formulários quando forem alterados. Para simuladores, validar o cálculo ao trocar plano e quantidade de clientes.
- O verificador `scripts/check-pages.cjs` usa Playwright. Quando o pacote não estiver na resolução padrão, informar o caminho pelo ambiente `PLAYWRIGHT_MODULE`; não fixar caminhos de uma máquina nos fontes públicos.
- Não ampliar testes indefinidamente quando os checks necessários já passaram. Rodar `git diff --check` antes do commit.

## Publicação e documentação

- Commit, push e publicação precisam estar dentro do pedido do Filipe. Um pedido explícito para atualizar o repositório/publicar autoriza essa sequência; não pedir confirmação repetida.
- Push para `main` dispara `.github/workflows/pages.yml`. Conferir conclusão do workflow e validar as URLs públicas antes de declarar a publicação concluída.
- Nunca colocar tokens ou credenciais em comandos versionados, documentação ou logs.
- `README.md`: apresentação, tecnologias, estrutura e execução.
- `STATUS.md`: estado atual, últimas implementações e verificações.
- `DEBITO.md`: apenas pendências, com contexto suficiente para retomar.
- `AGENTS.md`: decisões e regras duráveis para manutenção.
- Atualizar esses arquivos quando a mudança afetar seu conteúdo. Manter detalhes internos do cliente fora da documentação pública.
