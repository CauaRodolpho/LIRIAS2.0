# Etapa 4 — Dados responsivos e ações seguras

Data: 2026-11-01

## Resultado

A etapa consolida o comportamento operacional do dashboard em telas pequenas e remove ações críticas de clique único.

### Dados operacionais

- Novo `ResponsiveDataTable`, com tabela semântica no desktop e leitura em cartões compactos no mobile.
- Histórico de ações, backups, domínios e regras de firewall migrados para o mesmo padrão.
- Estados vazios orientam a próxima ação nos filtros e pesquisas.
- Informações secundárias passam a ter rótulos explícitos no mobile, sem depender da posição de uma coluna.

### Segurança de interação

- Restauração de backup continua protegida por confirmação e estado de processamento.
- Reinstalação de sistema continua exigindo a digitação do hostname.
- Revogação de token agora exibe escopos e impacto antes de confirmar.
- Desativação do firewall agora exige confirmação e explica o risco operacional.
- Exclusão de regra continua exibindo porta, protocolo e origem antes da ação final.

### Estados do produto

O `StatePanel` compartilhado cobre: `loading`, `empty`, `error`, `offline`, `stale`, `forbidden` e `success`. Nesta etapa, os filtros sem resultado passaram a usar o estado vazio em vez de deixar uma área em branco.

## Validação

- `npm run type-check`: aprovado.
- `npm run build`: aprovado.
- Revisão React: sem efeitos desnecessários, chaves estáveis, tipos genéricos preservados e controles com nomes acessíveis.
- A prévia gerenciada iniciou corretamente em `terminal.local:4173`; o serviço de navegador ficou indisponível durante a captura final. A matriz visual deve ser executada antes da publicação na Vercel.

## Próximo gate

Executar a matriz visual desktop/mobile nas rotas críticas e corrigir qualquer P1 antes do deploy. Nenhuma publicação na Vercel foi feita nesta etapa.
