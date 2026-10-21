# MIIND + Bu1lder

Prévia unificada para revisão das páginas enviadas pelo cliente.

## Online

- [MIIND institucional](https://hiperbold.github.io/miind-site/)
- [Bu1lder plataforma](https://hiperbold.github.io/miind-site/bu1lder/)
- [Programa de parceiros](https://hiperbold.github.io/miind-site/bu1lder/parceiros/)
- [Contabilidade](https://hiperbold.github.io/miind-site/bu1lder/contabilidade/)
- [Agência de marketing](https://hiperbold.github.io/miind-site/bu1lder/agencia-marketing/)

Nichos: beleza, odontologia, saúde (saude), oficinas, pet, restaurantes, imobiliárias (imobiliarias), academias, contabilidade e varejo.

## Organização

`apps/institucional` preserva o site MIIND. `apps/bu1lder` preserva a apresentação de produto, o hub e as dez páginas de nicho. São duas aplicações estáticas, no mesmo domínio e com navegação entre elas, para manter isolados os estilos e as versões de bibliotecas recebidas.

A adaptação do Bu1lder substitui a camada de servidor e roteamento TanStack Start por um adaptador estático. Os componentes visuais e a copy do cliente foram mantidos. Formulários não enviam dados nesta prévia. Backend, mensuração e integrações ficam para etapa posterior; detalhes em [DEBITO.md](DEBITO.md).

Os arquivos de ambiente e as credenciais originais não fazem parte do repositório. As mídias presentes apenas como descritores Lovable foram substituídas pelos arquivos originais já fornecidos quando disponíveis. Vídeo e símbolo ausentes estão documentados como pendência.

## Build

Requer Node.js 22.12+.

```sh
npm run setup
npm run build
npm run preview
```

A saída é `dist/`. `SITE_BASE` define o prefixo, com `/miind-site/` como padrão. Para servir localmente sob o mesmo caminho do Pages, use o script `scripts/serve.mjs`.

O build cria entradas HTML para acesso direto e atualização das rotas, com caminhos reais, sem URLs com hash. GitHub Actions publica `dist/` usando o ambiente `github-pages`.

## Design system MIIND

A homepage Bu1lder, o programa de parceiros, contabilidade e agência de marketing usam o DS MIIND, com Sora, Manrope e JetBrains Mono servidas localmente. Os tokens reproduzem o DS institucional e os temas escuro/claro. A nova página de agência complementa os dez mercados recebidos e tem navegação pelo hub e pelo menu de segmentos. Os demais mercados mantêm seus estilos de origem.

A camada de estilo está em `apps/bu1lder/src/miind-ds.css`, ativada por rota em `main-static.tsx`. O desenho vetorial MIIND é preservado no lockup de marca compartilhado.

As LPs usam rodapé mínimo com marca e menu Legal, FAQ compartilhada com a homepage e perguntas específicas do nicho. Nos cadastros de LP, o segmento é um campo oculto predefinido; o cadastro do hub mantém o seletor. A página de agências inclui o simulador dos três planos de referência do programa.
