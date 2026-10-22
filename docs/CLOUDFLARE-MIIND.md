# Cloudflare da MIIND: encaminhar `/bu1lder/` para o servidor da Hiperbold

Para o Diego (ou quem administra a zona `miind.com.br` no Cloudflare). Objetivo: `www.miind.com.br/bu1lder/...` passa a ser servido pelo site do Bu1lder, que roda na VPS da Hiperbold. O resto do `miind.com.br` não muda.

Servidor de origem do Bu1lder: `client-project-5-bu1lder-site.z0oemb.easypanel.host` (HTTPS, certificado válido).

## Como fazer (recomendado: Origin Rules)

1. **DNS:** criar o registro
   - Tipo `CNAME`, nome `bu1lder-origem`, destino `client-project-5-bu1lder-site.z0oemb.easypanel.host`, **com proxy ligado** (nuvem laranja).
2. **Rules › Origin Rules › Create rule**
   - Nome: `Bu1lder para a VPS da Hiperbold`.
   - Quando: *Hostname* é igual a `www.miind.com.br` **e** *URI Path* começa com `/bu1lder`.
   - Então:
     - **Host Header:** reescrever para `client-project-5-bu1lder-site.z0oemb.easypanel.host`.
     - **DNS Record:** substituir por `bu1lder-origem.miind.com.br`.
   - Salvar e colocar a regra no topo.
3. **SSL/TLS:** a zona pode continuar no modo atual se for *Full* ou *Full (strict)*: a origem tem certificado válido para o nome usado no Host Header.
4. **Cache:** criar (ou confirmar) uma *Cache Rule* que **não** guarde em cache `www.miind.com.br/bu1lder/api/*` (*Bypass cache*). As páginas podem seguir o padrão.
5. Se houver regra de redirecionamento, página de erro ou Worker do site atual que pegue qualquer caminho (ex.: `/*` para o app de página única), ela precisa deixar `/bu1lder*` de fora.

## Por que não usar um Worker

Um Worker que busca o site em outro domínio faz o Cloudflare trocar o IP do visitante pelo IP do próprio Worker. Para o site, todos os visitantes passariam a ter o mesmo IP: o limite de envios do formulário bloquearia todo mundo depois de 5 cadastros e o IP gravado no cadastro ficaria errado. Com Origin Rules, o Cloudflare entrega o pedido direto à origem com o IP real do visitante no cabeçalho `CF-Connecting-IP`, que o site já sabe ler com segurança.

## Como conferir depois

- `https://www.miind.com.br/bu1lder/` abre a homepage do Bu1lder.
- `https://www.miind.com.br/bu1lder/contabilidade` e `/bu1lder/agencia-marketing` abrem as LPs.
- `https://www.miind.com.br/bu1lder/api/saude` responde `{"ok":true}`.
- `https://www.miind.com.br/` continua sendo o site atual da MIIND.

A Hiperbold confere os formulários, o rastreamento e remove o bloqueio de indexação (`SITE_NOINDEX`) depois disso.
