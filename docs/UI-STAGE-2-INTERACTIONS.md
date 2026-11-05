# LIRIAS — Etapa 2: sistema de interação

Data: 2026-11-01  
Publicação: não enviada à Vercel

## Objetivo

Reduzir padrões locais e criar uma linguagem única para seleção, formulário, estados, listas e confirmações sensíveis. A etapa evita redesenhar o site inteiro antes de comprovar o sistema em superfícies representativas.

## Componentes adicionados

| Componente         | Contrato                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| `Select`           | label, ajuda, erro, foco e ícone padronizados                               |
| `Textarea`         | label, ajuda, erro e redimensionamento controlado                           |
| `SegmentedControl` | filtro horizontal responsivo com seleção acessível                          |
| `Dialog`           | foco preso, Escape, fundo inerte, restauração de foco e mobile bottom-sheet |
| `StatePanel`       | empty, error, loading, offline, stale, forbidden e success                  |
| `DataList`         | lista operacional adaptável sem forçar tabela no mobile                     |

## Aplicação piloto

- **Navbar mobile:** o conteúdo da aplicação fica inerte enquanto o drawer está aberto; scroll, Escape, foco e retorno ao gatilho permanecem controlados.
- **Catálogo:** categorias usam `SegmentedControl` com contagem e o resultado vazio usa `StatePanel`.
- **Dashboard:** atividade recente usa `DataList`; troca de servidor usa `Select`.
- **Firewall:** exclusão exige `Dialog` com contexto da regra, cancelamento e confirmação explícita.
- **Suporte:** campos longos usam `Textarea` e o sucesso do formulário usa o mesmo contrato de estado.

## Validação executada

- `npm run type-check`: aprovado.
- Fluxo do catálogo: busca sem resultado, estado vazio e ação de limpeza verificados no navegador.
- Fluxo do firewall: abertura do diálogo, contexto da regra, Escape e restauração de foco verificados no navegador.
- Revisão React/Vercel: sem waterfall, busca remota ou estado derivado por efeito introduzido; listas mantêm chaves estáveis e módulos pesados continuam carregados por rota.
- Sem alteração de dados externos ou backend; ações continuam demonstrativas.

## Qualidade visual automatizada

O script agora cobre seis rotas, seis larguras e dois temas: 72 capturas por execução. O workflow existente instala Chromium, executa build, roda a auditoria e publica o relatório como artefato. A execução completa permanece obrigatória antes de promover uma futura versão na Vercel.

## Próximo corte recomendado

Na Etapa 3, migrar controles locais por domínio, começando por operações do servidor, suporte e status. Depois extrair os blocos compartilhados entre VPS Linux e Windows. Evitar migração mecânica de todos os botões: ações compostas, cards selecionáveis e switches precisam de contratos próprios.
