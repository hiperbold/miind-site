# MIIND + Bu1lder

Site unificado da MIIND e do Bu1lder, com apresentação institucional, plataforma, programa de parceiros e landing pages para campanhas por nicho ou perfil profissional.

O projeto reúne os dois projetos enviados pelo cliente em uma publicação estática no GitHub Pages. O institucional ocupa a raiz; o Bu1lder tem sua própria área, com páginas de aquisição para o programa de parceiros.

## Acessos

- [Site publicado](https://hiperbold.github.io/miind-site/)
- [Homepage Bu1lder](https://hiperbold.github.io/miind-site/bu1lder/)
- [Programa de parceiros](https://hiperbold.github.io/miind-site/bu1lder/parceiros/)
- [Contabilidade](https://hiperbold.github.io/miind-site/bu1lder/contabilidade/)
- [Agências de marketing](https://hiperbold.github.io/miind-site/bu1lder/agencia-marketing/)
- [Repositório](https://github.com/hiperbold/miind-site)

A publicação é uma prévia de revisão. Os formulários ainda não transmitem dados, e as integrações com CRM, SDR, agenda, blog e mensuração dependem de implementação. A remoção do aviso visual inicial dos formulários não altera esse estado: uma tentativa de envio continua apresentando um erro explícito, sem simular sucesso.

## Organização

```text
miind-site/
├── apps/
│   ├── institucional/       # Site MIIND, blog e páginas legais
│   └── bu1lder/             # Plataforma, programa de parceiros e 11 LPs
├── scripts/
│   ├── build.mjs           # Compõe os dois builds e gera entradas por URL
│   ├── serve.mjs           # Serve a prévia com o prefixo do Pages
│   └── check-pages.cjs     # Verificação de rotas com Playwright
├── .github/workflows/
│   └── pages.yml           # Build e publicação no GitHub Pages
├── STATUS.md               # Implementações recentes e verificações
├── DEBITO.md               # Pendências técnicas e comerciais
├── AGENTS.md               # Regras para manutenção do projeto
└── dist/                   # Saída gerada, fora do versionamento
```

O checkout de trabalho fica em `~/github-projects/miind-site`. Os materiais de planejamento, e-books e os dois pacotes originais recebidos ficam na pasta do cliente, fora deste repositório. O código a editar e publicar é o deste checkout.

## Tecnologias

- TypeScript e React nos dois aplicativos.
- Institucional: React 18, Vite 7, Tailwind CSS 3 e React Router 6.
- Bu1lder: React 19, Vite 7, Tailwind CSS 4 e React Router 6, com adaptador para as rotas/componentes recebidos em TanStack Start.
- JavaScript com Node.js nos scripts de composição e prévia.
- GitHub Actions e GitHub Pages para publicação estática.

Os aplicativos têm dependências e estilos separados. Cada um possui seu próprio `package.json` e `package-lock.json`.

## Rotas

Os caminhos públicos usam o prefixo `/miind-site/` do GitHub Pages:

| Área | Caminho dentro do site |
| --- | --- |
| Institucional | `/` |
| Plataforma Bu1lder | `/bu1lder/` |
| Programa de parceiros | `/bu1lder/parceiros/` |
| Landing pages | `/bu1lder/{nicho}/` |
| Privacidade | `/politica-de-privacidade/` |
| Termos | `/termos-de-servico/` |

As 11 LPs são: `beleza`, `odontologia`, `saude`, `oficinas`, `pet`, `restaurantes`, `imobiliarias`, `academias`, `contabilidade`, `varejo` e `agencia-marketing`.

O build cria arquivos HTML em cada rota para permitir acesso direto e atualização da página no Pages, sem URLs com hash. Os antigos caminhos de nicho `/builders/{nicho}/` e `/bu1lders/{nicho}/` têm redirecionamentos para os dez mercados originais.

## Identidade e componentes

A homepage Bu1lder, o programa de parceiros, contabilidade e agência seguem o DS MIIND: Sora, Manrope, JetBrains Mono, azul institucional `#1d3cab` e paleta de interface ciano/azul/violeta. Os outros nove mercados mantêm seus estilos originais, com os componentes compartilhados atualizados.

Todas as LPs de nicho abrem no tema claro. O visitante pode alternar para escuro, inclusive no celular. Uma nova abertura da LP volta ao padrão claro.

Arquivos principais em `apps/bu1lder/src/`:

- `routes/`: conteúdo e estrutura das páginas.
- `miind-ds.css` e `miind-fonts.css`: aplicação do DS e fontes locais.
- `main-static.tsx`: montagem da aplicação, rotas e inicialização do tema.
- `components/site/BrandLockup.tsx`: marca Bu1lder by MIIND.
- `components/bu1lders/NicheFooter.tsx`: rodapé com marca, menu Legal e direitos reservados.
- `components/bu1lders/NicheFaq.tsx` e `data/platform-faq.ts`: FAQ da homepage compartilhada com as LPs, além das perguntas específicas.
- `components/bu1lders/LeadForm.tsx`: cadastro sem mensagem; segmento oculto nas LPs e selecionável no hub.
- `components/bu1lders/AgencyEarningsSimulator.tsx`: escolha dos três planos de referência, usando a calculadora compartilhada de ganhos.

## Executar localmente

Requer Node.js 22.12+ e npm. A partir da raiz:

```sh
npm run setup
npm run build
node scripts/serve.mjs
```

Abra [a prévia local](http://127.0.0.1:4173/miind-site/). A saída estática fica em `dist/`; não edite essa pasta diretamente.

`SITE_BASE` define o prefixo do build, com `/miind-site/` como padrão. O servidor `scripts/serve.mjs` está configurado para esse prefixo. Para desenvolver um aplicativo isolado, execute `npm run dev` dentro da respectiva pasta em `apps/`.

## Publicação e manutenção

Um push autorizado para `main` dispara `.github/workflows/pages.yml`, que instala as dependências, compõe `dist/` e publica no ambiente `github-pages`. A execução também pode ser iniciada manualmente no GitHub Actions. Após publicar, confira o resultado do workflow e as URLs públicas alteradas.

Não há credenciais ou arquivos de ambiente operacionais versionados. A prévia permanece com `noindex`, sem rastreamento ativo e sem backend operacional.

Consulte [STATUS.md](STATUS.md) para as últimas implementações, [DEBITO.md](DEBITO.md) para pendências e [AGENTS.md](AGENTS.md) antes de editar o projeto.
