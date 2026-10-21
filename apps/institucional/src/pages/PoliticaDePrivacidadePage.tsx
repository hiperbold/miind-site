import { motion } from 'framer-motion';
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }
  | {
      type: 'table';
      headers: string[];
      rows: string[][];
    };

interface Section {
  title: string;
  blocks: Block[];
}

const legalBasesRows: string[][] = [
  ['1', 'Fornecer os Serviços (autenticação, sincronização de calendário, agendamento, suporte)', 'Execução de contrato (art. 7º, V)'],
  ['2', 'Processar pagamentos e gerenciar cobrança', 'Execução de contrato (art. 7º, V) e obrigação legal/regulatória (art. 7º, II)'],
  ['3', 'Melhorar produtos, realizar análises e desenvolver novas funcionalidades', 'Legítimo interesse (art. 7º, IX)'],
  ['4', 'Comunicações transacionais (notificações de serviço, alertas de segurança)', 'Execução de contrato (art. 7º, V)'],
  ['5', 'Comunicações de marketing', 'Consentimento (art. 7º, I) ou legítimo interesse (art. 7º, IX), com direito de oposição'],
  ['6', 'Prevenção a fraudes, segurança da informação e investigação de abuso', 'Legítimo interesse (art. 7º, IX) e tutela da segurança do titular e de terceiros (art. 11, II, "g", quando envolver dados sensíveis)'],
  ['7', 'Cumprimento de obrigações legais e regulatórias', 'Art. 7º, II'],
  ['8', 'Exercício regular de direitos em processos judiciais, administrativos ou arbitrais', 'Art. 7º, VI'],
  ['9', 'Integração com Google Calendar e demais provedores de calendário (sincronização, leitura e criação de eventos)', 'Execução de contrato (art. 7º, V) e consentimento do titular para escopos (art. 7º, I)'],
  ['10', 'Uso de cookies analíticos e de marketing', 'Consentimento (art. 7º, I)'],
  ['11', 'Uso de cookies estritamente necessários e funcionais', 'Legítimo interesse (art. 7º, IX)'],
];

const sections: Section[] = [
  {
    title: '1. Introdução',
    blocks: [
      {
        type: 'p',
        text: 'A presente Política de Privacidade ("Política") tem por objetivo informar, de forma transparente, como a Miind Tech Ltda., sociedade empresária limitada inscrita no CNPJ/MF sob o nº 63.165.058/0001-05, com sede em Porto Alegre/RS (doravante "miind"), realiza o Tratamento de Dados Pessoais no contexto de suas atividades, em observância à Lei nº 13.709/2018 ("LGPD"), ao Regulamento (UE) 2016/679 ("GDPR"), quando aplicável, e às demais normas de proteção de dados vigentes.',
      },
      { type: 'p', text: 'Para fins desta Política, adotam-se as seguintes definições:' },
      {
        type: 'list',
        items: [
          '“Dados Pessoais”: qualquer informação relacionada a pessoa natural identificada ou identificável, conforme definido pela LGPD e, quando aplicável, pelo GDPR e demais legislações de proteção de dados aplicáveis.',
          '“Serviços”: todos os sites, aplicações (incluindo aplicações web, móveis e em nuvem), ferramentas, plataformas, APIs e funcionalidades oferecidas pela miind, excluindo aplicações de terceiros.',
          '“Site”: o endereço https://www.miind.com.br e quaisquer outros domínios próprios da miind que façam referência a esta Política.',
          '“Usuário” ou “você”: a pessoa natural que acessa o Site, cria conta nos Serviços ou de qualquer forma interage com a miind.',
          '“Titular”: pessoa natural a quem se referem os Dados Pessoais, nos termos do art. 5º, V, da LGPD.',
          '“Tratamento”: toda operação realizada com Dados Pessoais, como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle, modificação, comunicação, transferência, difusão ou extração.',
        ],
      },
    ],
  },
  {
    title: '2. A quem se aplica?',
    blocks: [
      {
        type: 'p',
        text: 'Esta Política rege os tratamentos em que a miind figura como Controladora de Dados Pessoais — situação que ocorre, por exemplo, quando você navega pelo Site, solicita uma demonstração, contrata nossos planos, mantém vínculo empregatício/societário conosco ou interage com nossas campanhas.',
      },
      {
        type: 'p',
        text: 'Há, contudo, hipóteses em que a miind atua como Operadora: trata-se dos cenários nos quais nossos clientes utilizam os Serviços para gerenciar agendamentos, convidar terceiros para reuniões ou integrar calendários e sistemas internos. Nesses casos, o cliente é o Controlador dos dados de seus convidados/contatos, cabendo à miind tratá-los de acordo com as instruções contratuais recebidas, no âmbito do Contrato de Operador (DPA) firmado e dos Termos de Uso. Se você é convidado de uma reunião agendada por um cliente nosso e deseja exercer direitos sobre seus dados, recomendamos contato direto com tal Controlador.',
      },
    ],
  },
  {
    title: '3. Quais são as informações que Coletamos e Tratamos?',
    blocks: [
      { type: 'p', text: '3.1. Informações fornecidas diretamente por você' },
      {
        type: 'list',
        items: [
          'Navegação e formulários no Site: nome, e-mail corporativo, telefone, empresa e cargo, fornecidos em formulários de demonstração, contato ou download de materiais.',
          'Criação de conta: nome, e-mail, username e senha (armazenada com hash criptográfico, jamais em texto puro). Caso opte por login federado (ex.: Google Sign-In), receberemos as informações básicas do perfil autorizadas no fluxo OAuth.',
          'Dados de cobrança: ao contratar plano pago, o processamento da transação é realizado por processadores de pagamento terceiros (ex.: Stripe, Pagar.me, Mercado Pago), que coletam diretamente os dados completos do cartão. A miind retém apenas dados não-sensíveis de referência (últimos 4 dígitos, bandeira, validade e token do processador).',
          'Marketing e relacionamento: dados voluntariamente prestados em webinars, newsletters, eventos e canais sociais.',
          'Suporte e pesquisas: conteúdo das interações com nossa equipe de atendimento, pesquisas de satisfação (NPS), entrevistas, mentorias e focus groups.',
        ],
      },
      { type: 'p', text: '3.2. Informações coletadas via integrações (Google e demais provedores)' },
      {
        type: 'p',
        text: 'Quando você autoriza a miind a se conectar ao seu Google Calendar (ou serviços equivalentes como Microsoft Outlook/365), coletamos, quando aplicável, conforme os escopos OAuth aprovados por você:',
      },
      {
        type: 'list',
        items: [
          'Dados do perfil Google: nome, endereço de e-mail e foto de perfil.',
          'Dados de calendário: lista de calendários, eventos (título, data, hora, descrição, participantes, status de presença), disponibilidade (free/busy) e identificadores de eventos.',
          'Tokens OAuth: access token e refresh token armazenados de forma cifrada para manter a integração ativa.',
        ],
      },
      {
        type: 'note',
        text: 'Esses dados são tratados estritamente conforme as limitações de uso e finalidades previstas nesta Política. Você pode revogar o acesso a qualquer momento em https://myaccount.google.com/permissions ou nas configurações da sua conta miind.',
      },
      { type: 'p', text: '3.3. Informações coletadas automaticamente' },
      {
        type: 'list',
        items: [
          'Dados de log e dispositivo: endereço IP, modelo do dispositivo, sistema operacional, tipo de navegador, identificador único do dispositivo, operadora móvel, fuso horário e localização aproximada.',
          'Cookies e armazenamento local: utilizamos cookies de sessão e cookies persistentes. Detalhes no item 12.',
          'Dados de uso: funcionalidades acessadas, frequência de uso, telas visualizadas, eventos de erro e métricas de desempenho.',
        ],
      },
      { type: 'p', text: '3.4. Informações de fontes de terceiros' },
      {
        type: 'p',
        text: 'Podemos receber Dados Pessoais de parceiros de geração de leads, redes sociais profissionais e provedores de enriquecimento de dados (ex.: nome, cargo, empresa, e-mail corporativo), utilizados para esforços de vendas e marketing, sempre com base legal adequada.',
      },
    ],
  },
  {
    title: '4. Finalidades e Bases Legais do Tratamento (art. 7º e 11 da LGPD)',
    blocks: [
      {
        type: 'table',
        headers: ['#', 'Finalidade', 'Base Legal LGPD'],
        rows: legalBasesRows,
      },
      {
        type: 'p',
        text: 'Para titulares no EEE/UK, as bases legais correspondentes do GDPR são: (a) performance of a contract; (b) legitimate interests; (c) consent; e (d) legal obligation.',
      },
    ],
  },
  {
    title: '5. Os dados são compartilhados? Em quais hipóteses?',
    blocks: [
      {
        type: 'p',
        text: 'Os Dados Pessoais que tratamos, bem como determinados registros de atividades, podem ser compartilhados nas seguintes situações:',
      },
      {
        type: 'list',
        items: [
          'Autoridades públicas: podemos compartilhar informações com autoridades judiciais, administrativas ou governamentais sempre que houver obrigação legal, solicitação formal ou ordem judicial que nos imponha tal fornecimento.',
          'Prestadores de serviços e parceiros: podemos compartilhar dados com fornecedores, parceiros comerciais e prestadores de serviços que nos auxiliam na execução, melhoria ou viabilização dos Serviços e eventos que oferecemos. Quando aplicável, esse compartilhamento ocorrerá mediante sua autorização.',
          'Operações societárias: em casos de reorganizações empresariais, como fusões, cisões, aquisições ou incorporações, o compartilhamento poderá ocorrer automaticamente, respeitando os limites legais e contratuais.',
          'Operadores e prestadores de serviço (cloud, e-mail transacional, pagamento, suporte, analytics): vinculados a Acordo de Tratamento de Dados (DPA) com cláusulas de confidencialidade e segurança.',
          'Mediante seu consentimento.',
        ],
      },
      {
        type: 'p',
        text: 'Se você tiver dúvidas sobre com quem seus Dados Pessoais podem ser compartilhados, nossos canais oficiais de atendimento, indicados nesta Política, estão disponíveis para esclarecimentos.',
      },
      {
        type: 'note',
        text: 'A miind não vende Dados Pessoais. Não utilizamos dados obtidos das APIs do Google para servir publicidade.',
      },
    ],
  },
  {
    title: '6. Conformidade com a Política do Google API Services (Limited Use)',
    blocks: [
      {
        type: 'p',
        text: 'O uso e a transferência, pela miind, de informações obtidas das APIs do Google para qualquer outra aplicação observará a Google API Services User Data Policy, incluindo, em especial, os requisitos de Uso Limitado (Limited Use Requirements).',
      },
      {
        type: 'p',
        text: 'Especificamente em relação aos dados acessados via escopos restritos do Google (entre eles os do Google Calendar), a miind declara:',
      },
      {
        type: 'list',
        items: [
          '6.1. Finalidade de uso. Os dados do Google são utilizados única e exclusivamente para fornecer ou aprimorar funcionalidades visíveis ao Usuário dentro da interface dos Serviços miind — tais como leitura de agenda para sincronização, exibição de disponibilidade, criação, atualização e exclusão de eventos autorizados pelo Usuário.',
          '6.2. Transferência a terceiros. A miind não transfere dados obtidos das APIs do Google a terceiros, salvo nas hipóteses expressamente autorizadas pela política do Google: (i) quando estritamente necessário para fornecer ou aprimorar funcionalidades voltadas ao Usuário, por meio de subcontratados (operadores de nuvem e infraestrutura) sujeitos a obrigações contratuais equivalentes; (ii) para cumprimento de obrigação legal; ou (iii) no contexto de operação societária (fusão, aquisição ou alienação de ativos), hipótese na qual o Usuário será previamente notificado.',
          '6.3. Vedação ao uso publicitário. A miind não utiliza dados obtidos das APIs do Google — nem quaisquer dados deles derivados — para fins de publicidade, advertising direcionado, retargeting, profiling publicitário ou mensuração de campanhas.',
          '6.4. Vedação ao treinamento de modelos de IA generalizada. A miind não utiliza dados obtidos das APIs do Google para desenvolver, treinar, refinar ou melhorar modelos de inteligência artificial ou machine learning generalizados, próprios ou de terceiros. Eventuais funcionalidades baseadas em IA aplicadas sobre dados do Google operam estritamente dentro da sessão do Usuário e não retroalimentam modelos.',
          '6.5. Acesso humano. A miind não permite a leitura de dados do Google por seres humanos, exceto: (i) mediante consentimento afirmativo e específico do Usuário; (ii) quando necessário para fins de segurança da informação (ex.: investigação de incidentes ou abuso); (iii) para cumprimento de obrigação legal; ou (iv) quando os dados estejam agregados e anonimizados, sem possibilidade de reidentificação, utilizados unicamente para operações internas.',
          '6.6. Armazenamento e proteção. Os dados acessados via APIs do Google são armazenados apenas na medida estritamente necessária ao funcionamento da integração autorizada pelo Usuário. Quando armazenados, são protegidos com criptografia em repouso (AES-256) e em trânsito (TLS 1.2 ou superior), com controles de acesso baseados em função (RBAC) e segregação de ambientes. Tokens OAuth são armazenados em cofre criptografado e revogados imediatamente após a desconexão da integração pelo Usuário.',
        ],
      },
    ],
  },
  {
    title: '7. Transferência Internacional de Dados',
    blocks: [
      {
        type: 'p',
        text: 'A miind pode transferir Dados Pessoais para fora do Brasil, especialmente para os Estados Unidos, onde estão localizados alguns de nossos operadores de nuvem. Tais transferências observarão o art. 33 da LGPD, mediante:',
      },
      {
        type: 'list',
        items: [
          'Cláusulas contratuais padrão com os operadores;',
          'Garantias específicas e verificáveis de nível adequado de proteção;',
          'Ou, conforme o caso, consentimento específico e em destaque do titular.',
        ],
      },
    ],
  },
  {
    title: '8. Direitos do Titular (art. 18, LGPD) — Quais são seus direitos e como exercê-los?',
    blocks: [
      {
        type: 'p',
        text: 'Seus Dados Pessoais pertencem a você, e a legislação aplicável estabelece uma série de direitos que podem ser exercidos mediante solicitação enviada ao nosso canal de atendimento, conforme indicado nesta Política:',
      },
      {
        type: 'list',
        items: [
          'Acesso e confirmação do tratamento: solicitar a confirmação da existência de tratamento e acessar seus Dados Pessoais, inclusive por meio de cópias dos registros que mantemos.',
          'Correção: solicitar a correção de Dados Pessoais incompletos, inexatos ou desatualizados.',
          'Portabilidade: solicitar que seus Dados Pessoais sejam fornecidos em formato estruturado e interoperável, respeitando nossa propriedade intelectual e segredos de negócio.',
          'Anonimização, bloqueio ou eliminação dos dados, quando aplicável.',
          'Informações sobre compartilhamento com terceiros, observados os limites de sigilo comercial e propriedade intelectual.',
          'Revogação do consentimento: a revogação não afeta a legalidade do tratamento realizado anteriormente. Caso o consentimento seja essencial para o funcionamento de nossos serviços, eles poderão se tornar indisponíveis.',
          'Oposição ao tratamento quando não concordar com determinada finalidade.',
          'Revisão de decisões automatizadas: indicar os interesses que possam ter sido afetados.',
          'Acesso a cláusulas contratuais quando os dados forem transferidos internacionalmente, respeitado o sigilo comercial.',
          'Autenticação de identidade: poderemos solicitar confirmação de identidade e informações adicionais ao exercer seus direitos.',
          'Possibilidade de não atendimento em situações que envolvam violação de propriedade intelectual, segredos de negócio ou base legal para manutenção dos dados.',
          'Prazo de resposta: comprometemo-nos a responder em prazo razoável e em conformidade com a LGPD e demais normas aplicáveis.',
          'Petição à ANPD: você pode peticionar diretamente à Agência Nacional de Proteção de Dados caso entenda que seus direitos não foram atendidos.',
        ],
      },
      {
        type: 'p',
        text: 'Para exercer seus direitos, envie solicitação para dpo@miind.com.br ou utilize o canal contato@miind.com.br. Podemos solicitar informações adicionais para confirmar sua identidade antes de atender ao pedido. Comprometemo-nos a responder às solicitações no prazo de 15 (quinze) dias, conforme art. 19 da LGPD para o direito de acesso, e em prazo razoável e proporcional para os demais direitos, podendo ser prorrogado mediante justificativa.',
      },
    ],
  },
  {
    title: '9. Revogação do acesso ao Google',
    blocks: [
      {
        type: 'p',
        text: 'Para revogar especificamente as permissões concedidas à miind sobre seu Google Calendar, acesse https://myaccount.google.com/permissions ou desconecte a integração em Configurações > Integrações na sua conta miind.',
      },
    ],
  },
  {
    title: '10. Crianças e Adolescentes',
    blocks: [
      {
        type: 'p',
        text: 'Os Serviços miind são destinados ao público adulto e ao ambiente corporativo, não sendo direcionados a crianças (menores de 12 anos) ou adolescentes (entre 12 e 18 anos incompletos). A miind não coleta intencionalmente Dados Pessoais desses públicos.',
      },
      {
        type: 'p',
        text: 'Caso identifiquemos coleta inadvertida, os dados serão eliminados sem demora, salvo quando a manutenção for exigida por lei. O tratamento de dados de crianças, quando excepcionalmente ocorrer, observará o art. 14 da LGPD, com consentimento específico e em destaque fornecido por ao menos um dos pais ou pelo responsável legal, no melhor interesse da criança.',
      },
    ],
  },
  {
    title: '11. Segurança e Retenção',
    blocks: [
      {
        type: 'p',
        text: 'Adotamos medidas técnicas e organizacionais adequadas para proteger os Dados Pessoais contra acesso não autorizado, perda, alteração ou destruição, incluindo:',
      },
      {
        type: 'list',
        items: [
          'Criptografia em trânsito (TLS 1.2+) e em repouso (AES-256);',
          'Controles de acesso baseados em função (RBAC) e princípio do menor privilégio;',
          'Monitoramento contínuo, logs de auditoria e detecção de anomalias;',
          'Segregação de ambientes (produção, homologação, desenvolvimento);',
          'Treinamento periódico da equipe em privacidade e segurança;',
          'Avaliações de risco e Data Protection Impact Assessments (DPIA) quando aplicável.',
        ],
      },
      {
        type: 'p',
        text: 'Retenção: mantemos os Dados Pessoais pelo tempo necessário ao cumprimento das finalidades, observados os prazos legais. Encerrada a relação, os dados são eliminados ou anonimizados, salvo hipóteses previstas no art. 16 da LGPD.',
      },
    ],
  },
  {
    title: '12. Cookies',
    blocks: [
      {
        type: 'p',
        text: 'A miind utiliza cookies e tecnologias similares de armazenamento local para viabilizar o funcionamento do Site e aprimorar a experiência de navegação. Você pode, a qualquer tempo, gerenciar suas preferências nas configurações do seu navegador.',
      },
      { type: 'p', text: 'Categorias utilizadas:' },
      {
        type: 'list',
        items: [
          'Cookies estritamente necessários: indispensáveis ao funcionamento do Site, garantindo autenticação, segurança e roteamento. Não podem ser desativados.',
          'Cookies funcionais: memorizam preferências (idioma, região, layout) e habilitam recursos integrados (compartilhamento social, chat de atendimento).',
          'Cookies analíticos e de desempenho: mensuram, em base agregada, o uso do Site (páginas mais visitadas, tempo de permanência, origem de tráfego). Utilizamos ferramentas como Google Analytics, sujeitas às respectivas políticas de privacidade.',
          'Cookies de marketing e atribuição: o cookie "miind_ft" guarda, por até 400 dias, os parâmetros de campanha do seu primeiro acesso (como UTMs, gclid e fbclid), que são anexados aos formulários enviados. Também utilizamos o Meta Pixel (Meta Platforms) e o Google Analytics (Google) para mensurar visitas e envios de formulário (evento de lead), sem envio de nome, e-mail ou telefone. Em regiões que exigem consentimento prévio (como União Europeia e Reino Unido), essas ferramentas não são carregadas. Você pode removê-los a qualquer momento nas configurações do navegador ou solicitar a exclusão pelo contato@miind.com.br. Não utilizamos cookies de marketing para tratar dados oriundos das APIs do Google.',
        ],
      },
      {
        type: 'p',
        text: 'Quanto à duração, os cookies podem ser de sessão (excluídos ao fechar o navegador) ou persistentes (permanecem por período pré-definido ou até serem removidos manualmente).',
      },
    ],
  },
  {
    title: '13. Links de Terceiros',
    blocks: [
      {
        type: 'p',
        text: 'Nosso Site pode conter links para sites e aplicações de terceiros (incluindo Google, Microsoft, redes sociais). Esta Política não se aplica a tais terceiros, e recomendamos a leitura das respectivas políticas de privacidade. A miind não se responsabiliza pelas práticas de privacidade desses terceiros.',
      },
    ],
  },
  {
    title: '14. Como garantimos a segurança dos seus dados pessoais',
    blocks: [
      {
        type: 'p',
        text: 'Práticas de Segurança e Governança. Para resguardar a sua privacidade e proteger os seus Dados Pessoais, contamos com um Programa de Governança em Privacidade e Segurança da Informação que contém regras de boas práticas, suportadas por Políticas, Normas e Procedimentos internos, que estabelecem as diretrizes adotadas em relação ao tratamento de dados pessoais.',
      },
      {
        type: 'p',
        text: 'Tratamento por terceiros sob nossa diretriz. Buscamos avaliar cuidadosamente nossos parceiros e prestadores de serviços, de forma a assegurar que a maturidade em privacidade e segurança da informação esteja em nível satisfatório, bem como firmamos contratos com cláusulas de proteção de dados pessoais, alocando de modo claro as responsabilidades.',
      },
    ],
  },
  {
    title: '15. Encarregado pelo Tratamento de Dados Pessoais (DPO)',
    blocks: [
      { type: 'p', text: 'Em cumprimento ao art. 41 da LGPD, a miind designou seu Encarregado:' },
      {
        type: 'list',
        items: [
          'Nome: Anderson Nunes dos Santos',
          'E-mail: dpo@miind.com.br / anderson.nunes@miind.com.br',
        ],
      },
    ],
  },
  {
    title: '16. Alterações desta Política',
    blocks: [
      {
        type: 'p',
        text: 'Esta Política pode ser atualizada a qualquer momento, conforme necessidades legais, operacionais ou relacionadas ao tratamento de dados pessoais. Em caso de alterações materiais, a alteração ficará relatada por aviso no Site da miind (https://www.miind.com.br/), com antecedência razoável à entrada em vigor. Recomendamos que consulte esta página periodicamente. A data da última atualização constará no topo do documento.',
      },
    ],
  },
  {
    title: '17. Contato',
    blocks: [
      {
        type: 'p',
        text: 'Para qualquer dúvida, solicitação ou reclamação relacionada a esta Política ou ao tratamento de seus dados pela miind, contate-nos:',
      },
      {
        type: 'list',
        items: [
          'E-mail (Privacidade): privacidade@miind.com.br',
          'E-mail (DPO): dpo@miind.com.br',
          'Endereço: Rua Cidade de Uberlândia, 37 — Jardim Europa, Porto Alegre/RS, 91.360-030',
        ],
      },
    ],
  },
  {
    title: '18. Lei aplicável',
    blocks: [
      {
        type: 'p',
        text: 'Esta Política será interpretada de acordo com a legislação brasileira, no idioma português.',
      },
      {
        type: 'note',
        text: 'POLÍTICA DE PRIVACIDADE — miind · Versão 1.1 · Vigência desde: 01/11/2025 · Última atualização: 21 de maio de 2026. Versão anterior disponível mediante solicitação ao DPO.',
      },
    ],
  },
];

const renderBlock = (block: Block, idx: number) => {
  switch (block.type) {
    case 'p':
      return (
        <p key={idx} className="text-sm leading-7 text-muted-foreground">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul key={idx} className="space-y-2.5 text-sm leading-7 text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 font-mono text-xs text-brand-cyan pt-1">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <p
          key={idx}
          className="rounded-md border-l-2 border-brand-cyan/70 bg-brand-cyan/5 px-4 py-3 text-sm italic leading-7 text-foreground/85"
        >
          {block.text}
        </p>
      );
    case 'table':
      return (
        <div key={idx} className="overflow-x-auto rounded-md border border-border bg-surface-1">
          <Table>
            <TableHeader>
              <TableRow>
                {block.headers.map((h) => (
                  <TableHead key={h} className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.rows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell
                      key={j}
                      className={j === 0 ? 'w-10 font-mono text-brand-cyan' : 'align-top text-sm text-muted-foreground'}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    default:
      return null;
  }
};

const PoliticaDePrivacidadePage = () => {
  useSeo({
    title: 'Política de privacidade · MIIND',
    description: 'Como a MIIND coleta, usa e protege seus dados — em conformidade com a LGPD.',
    canonical: 'https://www.miind.com.br/politica-de-privacidade',
  });
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-20">
        <div className="absolute top-0 left-0 right-0 h-[420px] mesh-bg opacity-80 pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 right-0 h-[420px] system-grid opacity-40 pointer-events-none -z-10" />

        <section className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Link
              to="/"
              className="ink-link mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 text-brand-cyan" />
              Voltar para o site
            </Link>

            <div className="eyebrow mb-6"><span>LEGAL // PRIVACIDADE</span></div>
            <h1 className="display-l mb-5">
              Política de <span className="text-aurora">Privacidade</span>
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
              Vigência: 01/11/2025 · Última atualização: 21 de maio de 2026 · Versão 1.1
            </p>
            <p className="lead">
              Esta Política descreve como a Miind Tech Ltda. coleta, utiliza, compartilha e
              protege os Dados Pessoais tratados em suas atividades, em observância à LGPD,
              ao GDPR (quando aplicável) e às demais normas vigentes.
            </p>
          </motion.div>
        </section>

        <section className="container-editorial mt-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl space-y-5"
          >
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="bento-card p-6 sm:p-7 rounded-xl"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  {String(i + 1).padStart(2, '0')} // SEÇÃO
                </div>
                <h2 className="font-display text-lg sm:text-xl font-semibold">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.blocks.map((block, idx) => renderBlock(block, idx))}
                </div>
              </div>
            ))}

            <div className="pt-6">
              <Link
                to="/termos-de-servico"
                className="ink-link inline-flex items-center gap-2 text-sm font-medium text-foreground/85 hover:text-foreground"
              >
                <FileText className="h-4 w-4 text-brand-cyan" />
                Ver Termos de Serviço
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidadePage;
