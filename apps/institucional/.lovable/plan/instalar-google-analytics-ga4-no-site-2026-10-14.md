# Instalar Google Analytics (GA4) no site

## Objetivo
Carregar a tag do Google (gtag.js) em todas as páginas, contar page views em cada troca de página e registrar envios de formulário como evento `generate_lead`, junto com as UTMs que já capturamos.

## Ponto importante
O ID salvo como segredo (`GOOGLE_ANALYTICS_MEASUREMENT_ID`) só pode ser lido pelo servidor. O navegador não tem acesso a ele. Esse ID (formato `G-XXXXXXX`) é público por natureza: aparece no código de qualquer site que usa GA. Então ele precisa ser lido pelo navegador. Dá para fazer isso de duas formas:
1. Conectar o Google Analytics pelo conector nativo (recomendado). O ID passa a ficar disponível para o navegador.
2. Você informa o ID `G-...` no chat e eu coloco direto no código.

## O que muda
- Novo módulo de analytics que carrega o gtag.js uma vez, quando o app abre. Só carrega se houver um ID configurado.
- Page view enviado a cada troca de página (o site é uma única página com navegação interna).
- Evento `generate_lead` nos formulários Bu1lder e no formulário de contato, com segmento e UTMs.
- Nenhuma outra mudança de layout ou conteúdo.

## Detalhes técnicos
- `src/lib/analytics.ts`: injeta o script, define `dataLayer`/`gtag`, `gtag('config', id, { send_page_view: false })`.
- Componente de rastreamento de rota dentro do Router, usando `useLocation` para enviar `page_view`.
- Chamar `trackEvent('generate_lead', {...})` depois que o envio dos formulários dá certo.
- Tipagem global de `window.gtag` / `window.dataLayer`.
