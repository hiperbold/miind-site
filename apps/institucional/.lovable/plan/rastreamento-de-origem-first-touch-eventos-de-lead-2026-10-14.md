# Rastreamento de origem (first-touch) + eventos de lead

## 1. Cookie de primeira visita
- Script roda no carregamento de qualquer página do site.
- Se o cookie `miind_ft` ainda não existe e a URL tem parâmetros de campanha, grava o cookie com eles. Ele nunca é sobrescrito depois (primeiro acesso vale para sempre).
- Se a primeira visita não tiver parâmetros, nada é gravado (nenhum campo vazio). Uma visita futura com parâmetros passa a ser a "primeira atribuída".
- Parâmetros capturados: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `xcod`, `src`, `sck`, `fbclid`, `gclid`, `gbraid`, `wbraid`, `gad_source`, `gads`, `msclkid`, `ttclid`, `li_fat_id`. Junto: página de entrada e data.
- "Sem expiração": navegadores limitam cookies a cerca de 400 dias. O cookie usa a validade máxima e é renovado a cada visita, mantendo os valores originais.
- Os formulários (Bu1lder, Gramado, contato) passam a ler desse cookie, substituindo a captura atual por sessão.

## 2. Eventos de envio de formulário
- Após envio com sucesso de qualquer formulário: GA4 recebe `generate_lead` e o Meta Pixel recebe `Lead`, ambos com os dados de campanha (sem e-mail, nome ou telefone).
- GA4 já está instalado; será só centralizado.
- Meta Pixel ainda não existe no site: será instalado (base + PageView a cada página). Preciso do ID do Pixel (número de 15–16 dígitos do Gerenciador de Eventos da Meta).

## 3. Privacidade
- Visitantes de regiões que exigem consentimento prévio (União Europeia, Reino Unido, Suíça) não terão tags de anúncio carregadas, sem necessidade de banner. Brasil e demais regiões: rastreamento normal.
- Política de Privacidade atualizada citando Google Analytics, Meta e o cookie de origem.

## Detalhes técnicos
- `src/lib/attribution.ts`: `captureFirstTouch()`, `getAttribution()`; cookie `path=/; SameSite=Lax; Secure; max-age=34560000`, JSON codificado.
- `src/lib/metaPixel.ts`: snippet base com ID em `VITE_META_PIXEL_ID`; `fbq('track','Lead',{...},{eventID})`.
- `trackLead()` em `analytics.ts` dispara GA4 + Meta com o mesmo eventID; chamado nos pontos de sucesso dos formulários.
- Checagem de região via `/cdn-cgi/trace` antes de carregar tags.

## Pendente
- ID do Meta Pixel.
