# Etapa 5 — Quality gates

Data: 2026-11-01  
Publicação: não enviada à Vercel

## Entregas

- Comando único `npm run quality` para TypeScript, auditoria estática, testes de contratos, build e orçamento de desempenho.
- Auditoria estática de controles semânticos, `alt`, foco e transições genéricas.
- Cinco testes de contrato para metadados, diálogo, tabela responsiva, rotas críticas e ações destrutivas.
- Orçamento automatizado: chunk máximo de 500 kB e JavaScript total de 1 MB.
- Auditoria visual ampliada de 6 para 12 rotas, mantendo seis viewports e dois temas: 144 capturas por execução.
- Novos checks renderizados para controles interativos aninhados e diálogos sem título acessível.
- CI atualizado para bloquear type-check, auditoria estática, testes, build, orçamento e falhas visuais P1.
- Cinco ocorrências de `transition-all` substituídas por listas explícitas de propriedades.

## Resultado local

| Gate                  | Resultado                            |
| --------------------- | ------------------------------------ |
| TypeScript            | aprovado                             |
| Auditoria estática    | 0 achados, 0 bloqueadores            |
| Contratos de UI       | 5/5 aprovados                        |
| Build de produção     | aprovado                             |
| Maior chunk           | 432,9 kB / 500 kB                    |
| JavaScript total lazy | 933,9 kB / 1.024 kB                  |
| Amostra renderizada   | aprovada                             |
| Diálogo por teclado   | foco, Escape e restauração aprovados |

## Matriz visual

A matriz completa agora cobre:

- 12 rotas;
- 6 larguras: 360, 390, 768, 1024, 1440 e 1920 px;
- temas claro e escuro;
- 144 capturas e verificações por execução.

O Chromium não está disponível no executor local. O workflow instala o navegador oficialmente no GitHub Actions e executa a matriz antes de aceitar a entrega. A ausência dessa execução local não foi mascarada como aprovação.

## Gate para Vercel

O código está preparado para CI. A publicação continua bloqueada até a matriz concluir sem achados altos, sem erros da aplicação e sem P1 pendente.
