# LIRIAS — Baseline de UI/UX

Data: 2026-11-01  
Escopo: Etapa 1 — inventário, linha de base e priorização  
Estado de publicação: nenhuma alteração enviada à Vercel

## Resultado executivo

A base visual da LIRIAS já possui identidade, tokens semânticos e componentes fundamentais. O problema principal não é falta de estilo: é a diferença de qualidade entre áreas maduras e páginas que ainda repetem padrões locais. O próximo ciclo deve reduzir variações antes de acrescentar novos efeitos.

Foram identificadas 58 declarações de rota, 30 arquivos de página, 48 arquivos de componente e 83 arquivos TSX. A fundação compartilhada é usada em boa parte do projeto, mas controles e composições locais ainda escapam do sistema.

## Escopo renderizado da auditoria

O comando `npm run audit:design` cobre estas rotas representativas:

| Jornada    | Rota            | Papel                        |
| ---------- | --------------- | ---------------------------- |
| Descoberta | `/`             | proposta de valor e entrada  |
| Catálogo   | `/applications` | busca, filtro e comparação   |
| Preço      | `/pricing`      | escolha de plano             |
| Compra     | `/checkout`     | configuração e revisão       |
| Confiança  | `/status`       | estado operacional           |
| Operação   | `/dashboard`    | visão do produto autenticado |

Matriz prevista: 360, 390, 768, 1024, 1440 e 1920 px. O desktop das rotas principais já foi inspecionado durante as revisões anteriores. A captura automatizada completa ficou preparada no script e no workflow de CI, mas não foi produzida localmente porque o ambiente atual não conseguiu baixar o Chromium do Playwright. Isso não bloqueia o inventário; a captura deve ser executada no runner antes de promover uma futura atualização.

## Arquitetura de rotas

| Grupo        | Superfícies                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Marketing    | Home, preços, catálogo/detalhe, automação, agentes, e-commerce, desenvolvedores, Linux, Windows                                        |
| Conversão    | Deploy, checkout, provisionamento, primeiro acesso                                                                                     |
| Confiança    | Suporte, documentação, status, institucional e legal                                                                                   |
| Autenticação | Login, cadastro e recuperação redirecionada                                                                                            |
| Dashboard    | Servidores, visão geral, monitoramento, Docker, apps, atividade, acesso, SO, backups, segurança, firewall, malware, DNS, configurações |
| Plataforma   | Domínios, tokens, cobrança, conta, suporte e rede                                                                                      |

Existem páginas institucionais ainda representadas pelo mesmo placeholder: Sobre, Blog, Termos, Privacidade, SLA, Cloud Hosting e Servidores dedicados. Elas não devem receber acabamento visual isolado antes de terem conteúdo e função próprios.

## Inventário de componentes

### Primitivos compartilhados

| Componente                            | Usos aproximados | Leitura                                                             |
| ------------------------------------- | ---------------: | ------------------------------------------------------------------- |
| `Button`                              |              115 | bom alcance, porém coexistindo com 59 `<button>` locais             |
| `Card`                                |               51 | base consolidada; ainda há superfícies montadas manualmente         |
| `Badge`                               |               94 | uso amplo; risco de excesso decorativo                              |
| `Input`                               |               37 | boa base, mas select/textarea ainda não têm primitivas equivalentes |
| `Accordion`                           |                1 | FAQ centralizado                                                    |
| `Progress`                            |                5 | uso pontual                                                         |
| `Slider`                              |                4 | uso pontual                                                         |
| `Skeleton`                            |                5 | cobertura insuficiente para 30 páginas                              |
| Tabs/Dialog/Modal/Table/Select/Switch |                0 | lacunas do sistema atual                                            |

### Componentes estruturais existentes

- Layouts separados para marketing e dashboard.
- Navbar e footer compartilhados.
- Kit de dashboard com `PageHeading`, `SectionCard`, métricas e ações.
- Sistema de cards com variantes semânticas.
- Componentes de motion e política visual documentada.
- Componentes específicos para pricing, aplicações, autenticação e suporte.

### Sinais de divergência

| Sinal                    | Ocorrências | Consequência                                  |
| ------------------------ | ----------: | --------------------------------------------- |
| `<button>` HTML direto   |          59 | foco, altura e estados podem divergir         |
| `<select>` HTML direto   |           5 | aparência e acessibilidade sem contrato único |
| `<textarea>` HTML direto |           2 | validação e erro inconsistentes               |
| `<input>` HTML direto    |           5 | exceções fora do componente oficial           |
| Caixa alta               |          98 | excesso de linguagem técnica/decorativa       |
| Tracking arbitrário      |          66 | aspecto artificial e baixa uniformidade       |
| `text-[…]`               |          99 | escala tipográfica fragmentada                |
| Backdrop blur            |          11 | risco de glassmorphism sem função             |
| Estilo inline            |          16 | dificulta tema, revisão e manutenção          |

## Duplicações e pontos de consolidação

1. Filtros e barras de pesquisa repetem combinações de `Input`, `select` e botões em catálogo, servidores, operações, sistema operacional, domínios e aplicações.
2. Seletores segmentados são montados localmente em páginas de operação e poderiam usar uma única primitiva.
3. Avisos demonstrativos aparecem com estrutura e linguagem diferentes em marketing, checkout, suporte e dashboard.
4. Confirmações destrutivas são blocos inline; falta um contrato comum de diálogo, progresso e resultado.
5. Listas operacionais simulam tabelas com grids locais; falta padrão responsivo de lista/tabela.
6. Estados vazio, erro, sem permissão, offline e desatualizado ainda não formam um kit reutilizável.
7. Ações com ícone e botões compactos possuem implementações paralelas no navbar, dashboard e páginas.

## Arquivos com maior risco de manutenção

| Arquivo                        | Linhas aproximadas | Risco                                         |
| ------------------------------ | -----------------: | --------------------------------------------- |
| `pages/vps-windows.tsx`        |                639 | página longa com muitas composições locais    |
| `pages/vps-linux.tsx`          |                599 | duplicação provável com Windows               |
| `pages/status.tsx`             |                435 | muitos estados, filtros e seções em um módulo |
| `components/layout/navbar.tsx` |                312 | desktop, dropdown e mobile concentrados       |
| `pages/launchpad.tsx`          |                267 | fluxo multi-etapas acoplado                   |
| `pages/dashboard-modules.tsx`  |                230 | domínios distintos no mesmo arquivo           |
| `pages/support.tsx`            |                222 | fluxo, conteúdo e histórico juntos            |

## Priorização P0–P3

### P0 — verdade e segurança do produto

- Preços, recursos, cupons e compatibilidade devem ser validados no backend antes de produção.
- Métricas e estados demonstrativos precisam continuar explicitamente identificados.
- Ações destrutivas precisam de autorização, confirmação, idempotência e trilha de auditoria.
- Rotas por servidor devem validar propriedade e permissão no backend.

### P1 — uso, acessibilidade e responsividade

- Concluir auditoria automatizada nas seis larguras e nos dois temas.
- Corrigir navegação mobile com foco preso, fundo inerte, Escape e restauração de foco.
- Criar Dialog/Modal, Select, Textarea e padrão responsivo de Table/List.
- Garantir alvos de 44×44 px, foco visível e ausência de overflow.
- Implementar estados loading, empty, error, offline, stale e forbidden.

### P2 — consistência e redução da “cara de IA”

- Substituir controles HTML repetidos pelas primitivas oficiais.
- Reduzir caixa alta, tracking, badges e ícones em caixas quando não comunicarem estado.
- Extrair blocos comuns entre Linux e Windows.
- Dividir páginas acima de 250–300 linhas por domínio e responsabilidade.
- Eliminar estilos inline e valores arbitrários quando já houver token.
- Variar a composição editorial sem criar novas superfícies decorativas.

### P3 — acabamento

- Padronizar números tabulares, unidades, datas e horários.
- Ajustar microcopy, estados de clipboard e mensagens de conclusão.
- Refinar skeletons por contexto.
- Afinar motion e remover efeitos que não ajudam a tarefa.

## Baseline de qualidade

| Gate                          | Estado na Etapa 1                       |
| ----------------------------- | --------------------------------------- |
| Inventário de rotas           | concluído                               |
| Inventário de componentes     | concluído                               |
| Duplicações e padrões locais  | concluído                               |
| Priorização P0–P3             | concluído                               |
| TypeScript                    | deve permanecer verde antes de publicar |
| Build de produção             | deve permanecer verde antes de publicar |
| Captura 6 viewports × 6 rotas | preparada; execução pendente no CI      |
| Tema claro/escuro             | deve entrar na expansão do script       |
| Atualização da Vercel         | não executada nesta etapa               |

## Entrada objetiva para a Etapa 2

A Etapa 2 deve começar pelo sistema de interação, não por novas páginas:

1. Criar `Select`, `Textarea`, `SegmentedControl`, `Dialog` e `DataList` responsiva.
2. Definir `EmptyState`, `ErrorState`, `LoadingState`, `StaleState` e `PermissionState`.
3. Migrar primeiro navbar mobile, catálogo, dashboard overview e uma ação destrutiva.
4. Rodar a matriz visual completa e corrigir P1 antes de expandir para as demais rotas.
5. Somente depois gerar preview da Vercel para aprovação; produção continua bloqueada até aceite explícito.
