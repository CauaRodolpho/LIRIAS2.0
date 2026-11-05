# LIRIAS — Etapa 3: consolidação por domínio

Data: 2026-11-01  
Publicação: não enviada à Vercel

## Objetivo

Aplicar o sistema de interação da Etapa 2 em fluxos operacionais reais e remover duplicações visuais entre páginas de produto. O trabalho priorizou consistência funcional, sem transformar toda interação em um componente genérico.

## Novos contratos

| Componente   | Aplicação                                                                       |
| ------------ | ------------------------------------------------------------------------------- |
| `ChoiceCard` | servidor, categoria, impacto, sistema operacional e opções selecionáveis        |
| `ToggleRow`  | diagnóstico autorizado e canais de notificação                                  |
| `vps-shared` | títulos de seção, configuração, métricas e caixas informativas de Linux/Windows |

## Migrações executadas

### Operações do servidor

- Monitoramento usa `SegmentedControl` para os períodos.
- Histórico usa `Select` para o status.
- Restauração de backup usa `Dialog` com contexto, progresso e bloqueio durante a ação.
- Sistema operacional usa `SegmentedControl` e `ChoiceCard`.
- Reinstalação usa diálogo destrutivo e exige o hostname correto.
- Gerenciador Docker usa o mesmo padrão segmentado.
- DNS usa o `Select` oficial.
- Download de fatura usa o contrato oficial de botão com nome acessível.

### Suporte

- Servidor, categoria e severidade usam `ChoiceCard`.
- Diagnóstico técnico usa `ToggleRow` com semântica de switch.
- O campo de relato permanece no `Textarea` padronizado.

### Status Center

- Canais de alerta usam `ToggleRow`.
- Estado ativo/inativo é comunicado semanticamente por `role="switch"` e `aria-checked`.
- A operação continua local e demonstrativa.

### VPS Linux e Windows

- Quatro componentes duplicados foram extraídos para `components/marketing/vps-shared.tsx`.
- Tipografia técnica decorativa foi reduzida nos componentes compartilhados.
- Métricas numéricas passaram a usar algarismos tabulares.
- Conteúdo e identidade específicos de cada sistema foram preservados.

## Resultado mensurável

| Indicador          | Antes da Etapa 3 | Depois |
| ------------------ | ---------------: | -----: |
| `<button>` local   |               58 |     48 |
| `<select>` local   |                5 |      3 |
| `ChoiceCard`       |                0 | 6 usos |
| `ToggleRow`        |                0 | 2 usos |
| `SegmentedControl` |                1 | 5 usos |
| `Dialog`           |                1 | 3 usos |

Os controles restantes não devem ser migrados apenas para reduzir contagem. Alguns representam accordions, cards inteiros navegáveis ou interações específicas e precisam de análise própria.

## Validação

- TypeScript: aprovado.
- Build de produção: aprovado.
- Monitoramento: período e layout verificados no navegador.
- Sistema operacional: escolha e diálogo destrutivo verificados.
- Suporte: opções com estado selecionado e semântica acessível verificadas.
- Status Center: alternância de notificação verificada de `true` para `false`.
- Linux e Windows: ambas as rotas renderizadas após a extração compartilhada.
- Console: nenhum erro originado pela aplicação nas rotas testadas.
- Revisão React/Vercel: opções estáticas foram elevadas ao módulo; nenhum efeito ou waterfall novo foi introduzido.

## Próximo corte

A Etapa 4 deve padronizar dados operacionais responsivos: substituir tabelas críticas por representações móveis úteis, consolidar confirmações destrutivas restantes e implementar os estados loading/empty/error/stale/forbidden nas páginas do dashboard. Depois disso, executar a matriz de 72 capturas no CI e corrigir os P1 antes da Vercel.
