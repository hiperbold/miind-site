# MIIND / Bu1lder: pendências da prévia

Publicação inicial para revisão visual. Nenhuma divergência comercial foi resolvida nesta etapa.

## Oferta e conteúdo
- [ ] Consolidar a comissão: o hub diz 70%, os planos utilizam 40% para o parceiro.
- [ ] Validar preço, composição dos planos, prazos de implantação e participação do parceiro no excedente.
- [ ] Revisar promessas de renda, projeções, ROI e números de mercado antes de uso em campanha.
- [ ] Substituir ou identificar corretamente “caso real (hipotético)” e conferir depoimentos e autorização de uso.
- [ ] Alinhar a certificação Bu1lder com as descrições de parceiro, consultor e revendedor.
- [ ] Conferir se as páginas por mercado atendem às personas da campanha. A página de agência/gestor foi criada em /bu1lder/agencia-marketing/; a página de contabilidade ainda preserva o texto original, a revisar para o dono do escritório.
- [ ] Revisar textos e destinos de botões, menus, WhatsApp, demonstração e contato.

## Captação e tecnologia
- [ ] Conectar o formulário institucional Bu1lder a um destino real; o original apenas simulava sucesso.
- [ ] Definir destino dos cadastros de parceiros: Supabase, CRM, e-mail ou outro fluxo.
- [ ] Conectar CRM, SDR, agenda e notificações. O Pages não executa as funções de servidor do pacote original.
- [ ] Confirmar o agendamento em /typ-agendar e as páginas de captura e entrega dos e-books. Não estão implementados neste pacote.
- [ ] Configurar e validar tags de mídia, atribuição e eventos depois da revisão. A prévia está com mensuração desativada.
- [ ] Configurar o backend de blog, newsletter e administração. A prévia não consulta nem grava dados da operação real.
- [ ] Revalidar campos, permissões de contato e regras de tratamento de dados antes de ativar captação.

## Identidade e arquivos
- [x] Aplicar o DS MIIND (Sora, Manrope, JetBrains Mono; azul, ciano e violeta) à homepage Bu1lder, programa de parceiros, contabilidade e nova página de agência.
- [ ] Avaliar aplicação do DS aos outros nove mercados, que mantêm o tema original.
- [ ] Solicitar o vídeo ambient.mp4 e a imagem original logo-b.png, ausentes da exportação. A prévia usa imagem estática e logo MIIND já fornecidos, sem vídeo substituto inventado.
- [ ] Validar quais versões de páginas serão finais. A apresentação da plataforma e o hub de parceiros foram preservados em rotas separadas.
- [ ] Depois da aprovação, revisar SEO, indexação e domínio próprio. Esta publicação é uma prévia com noindex.

## Estrutura publicada
- Institucional: /miind-site/
- Bu1lder plataforma: /miind-site/bu1lder/
- Hub de parceiros: /miind-site/bu1lder/parceiros/
- Dez páginas de nicho: /miind-site/bu1lder/{nicho}/

Os caminhos incluem o nome do repositório porque esta é uma publicação de projeto no GitHub Pages. Em um domínio próprio, a raiz poderá ser / e a área do produto /bu1lder/.

## Atualização visual e página de agência
- Página /bu1lder/agencia-marketing/ criada para donos de agência e gestores de tráfego, com oportunidades no funil, papéis da parceria, objeções e link de agendamento confirmado.
- A calculadora da página de agência usa os três planos de referência já presentes no projeto, incluindo a participação de 40% adotada no simulador de contabilidade. Isso não resolve a divergência comercial de 40% x 70%. Validar oferta, critérios da certificação, uso da marca/white label e aprovação editorial antes de campanha.
- Os formulários continuam como prévia, com aviso explícito e sem transmissão de dados.
- Fontes do DS servidas localmente; temas escuro/claro e telas móveis incluídos.

## Ajustes das LPs de nicho
- Rodapé das 11 LPs limitado a Bu1lder by MIIND, links para privacidade/termos e direitos reservados. Removidos anterior/próximo segmento e retorno ao hub.
- Campo mensagem removido do cadastro de parceiros; segmento oculto e predefinido nas LPs. No hub geral, o segmento continua selecionável.
- FAQ da homepage compartilhada com todas as LPs, preservando perguntas específicas de cada nicho.
- Calculadora de agências permite escolher Essencial, Crescimento e Performance e variar de 1 a 50 clientes. Projeções usam carteira ativa por 12 meses, antes de impostos e despesas. Condições ainda dependem de validação comercial.
