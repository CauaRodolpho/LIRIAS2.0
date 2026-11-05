# LIRIAS — Master Design System

Versão: 1.0  
Método: direção visual LIRIAS + refinamento Impeccable/Taste + controle UI/UX Pro Max.

## Norte do produto

LIRIAS é uma plataforma brasileira de infraestrutura VPS. A interface deve transmitir controle, clareza operacional, competência técnica e proximidade local. O produto não deve parecer um template de hospedagem, um conceito futurista sem função ou uma coleção de padrões gerados por IA.

## Princípios obrigatórios

1. **Produto antes do efeito.** Dados, tarefas e decisões têm mais peso que decoração.
2. **Violeta com função.** Marca, seleção, foco e ação primária; nunca preenchimento universal.
3. **Superfícies contínuas.** Seções formam uma narrativa, sem faixas de fundo arbitrárias.
4. **Cards com motivo.** Agrupam informação ou ação; não envolvem todo texto disponível.
5. **Brasil como contexto real.** Operação local, São Paulo e português claro, sem simular presença internacional.
6. **Estados verdadeiros.** Demo, indisponível, em preparação e operacional devem ser explícitos.
7. **Acessibilidade é acabamento.** Foco, contraste, teclado, movimento reduzido e nomes acessíveis fazem parte do visual.

## Dials UI/UX Pro Max

| Contexto                       | Variância | Movimento | Densidade |
| ------------------------------ | --------: | --------: | --------: |
| Marketing                      |      4/10 |      4/10 |      4/10 |
| Catálogo                       |      3/10 |      3/10 |      6/10 |
| Dashboard                      |      2/10 |      2/10 |      8/10 |
| Checkout e formulários         |      2/10 |      2/10 |      6/10 |
| Status, documentação e suporte |      2/10 |      2/10 |      7/10 |

Valores maiores exigem justificativa documentada no override da página.

## Tokens

Os tokens reais vivem em `src/global.css` e são expostos pelo `tailwind.config.ts`.

- **Fundo:** neutro frio; sem blocos roxos extensos.
- **Superfície:** um degrau acima do fundo, com borda discreta.
- **Texto principal:** contraste alto.
- **Texto secundário:** nunca carrega informação crítica sozinho.
- **Marca:** violeta semântico.
- **Status:** verde, âmbar e vermelho exclusivamente semânticos.
- **Raio padrão de card:** `rounded-xl`.
- **Alvo de toque:** mínimo 44×44 px.
- **Foco:** anel visível com `--ring` e offset.

Não usar cores hexadecimais diretamente em componentes quando existir token semântico.

## Tipografia

- Sora Variable: títulos principais, marca e valores-chave.
- Inter Variable: corpo, navegação, tabelas, formulários e controles.
- Monoespaçada: IP, hostname, comandos, código e identificadores.
- Corpo: mínimo recomendado de 16 px no marketing e 14 px no painel.
- Textos corridos: 45–75 caracteres por linha.
- Títulos: preferencialmente até duas linhas.
- Evitar eyebrows repetidos, caixa alta decorativa e tracking exagerado.

## Espaçamento e layout

- Escala base: 4, 8, 12, 16, 24, 32, 48, 64 e 96 px.
- Containers compartilham âncoras horizontais.
- Marketing usa espaço para hierarquia; dashboard usa proximidade para relação.
- Mobile é composição própria, não desktop comprimido.
- Tabelas só rolam horizontalmente quando não houver representação móvel mais útil.
- Nenhuma rota pode gerar scroll horizontal em 360, 390, 768, 1024, 1440 ou 1920 px.

## Cards e superfícies

Componente oficial: `src/components/ui/card.tsx`.

- `default`: conteúdo agrupado.
- `surface`: agrupamento suave e secundário.
- `interactive`: card inteiro navegável ou selecionável.
- `data`: métrica ou informação operacional.
- `commerce`: plano, pedido ou preço.
- `plain`: composição sem aparência de card.

Regras:

- Um card não recebe outra sombra local sem justificativa.
- Hover só existe quando há interação real.
- Evitar card dentro de card; prefira divisão, lista ou seção.
- Ícone em quadrado colorido não é cabeçalho padrão para toda seção.
- Grid ímpar não cria célula visual vazia.

## Botões e ações

- Uma ação primária por região visual.
- Ações secundárias são neutras.
- Destrutivas são separadas, nomeadas e confirmadas.
- Botão apenas com ícone exige `aria-label`.
- Estados obrigatórios: hover, foco, pressionado, carregando e desabilitado.
- Links não fingem ser botões quando a ação é navegação simples.

## Motion

- Microinteração: 140–180 ms.
- Painel/modal/rota: 200–280 ms.
- Entradas: deslocamento máximo usual de 16–24 px.
- Framer Motion: estado e ciclo de componente.
- GSAP: somente sequências editoriais que realmente precisem de timeline.
- Evitar animação infinita concorrente, parallax obrigatório e animação de width/height.
- `prefers-reduced-motion` remove deslocamento, looping e scroll-linked motion.

## Estados e feedback

Toda superfície de produto deve considerar:

- carregando;
- vazio;
- erro com causa e recuperação;
- offline ou dado desatualizado;
- acesso negado;
- sucesso e sucesso parcial;
- ação destrutiva em progresso.

Não usar apenas cor para comunicar estado. Incluir texto, ícone ou estrutura.

## Acessibilidade e responsividade

- WCAG AA como mínimo.
- Ordem de foco acompanha a leitura.
- Drawer/modal: foco preso, fundo inerte, Escape fecha e foco volta ao gatilho.
- Inputs têm labels visíveis e erros relacionados semanticamente.
- Gráficos incluem resumo textual, período, unidade e valor atual.
- Imagens têm `alt`, dimensões reservadas e carregamento adequado.
- Zoom não pode ser desabilitado.

## Anti-padrões Impeccable + Taste

- excesso de gradientes, glow e glassmorphism;
- seção após seção em grids idênticos de três cards;
- ícones decorativos em caixas coloridas repetidas;
- conteúdo genérico que poderia pertencer a qualquer SaaS;
- divisões de fundo sem relação com a narrativa;
- texto pequeno e cinza sustentando informação importante;
- movimento aplicado para “parecer moderno”;
- métricas fictícias apresentadas como produção;
- mistura arbitrária de raios, sombras e densidades.

## Processo de entrega

1. Ler este MASTER e o override da página.
2. Declarar tarefa principal, estado principal e ação principal.
3. Implementar usando tokens e componentes existentes.
4. Rodar `npm run type-check`, `npm run build` e `npm run audit:design`.
5. Revisar screenshots de 360 a 1920 px.
6. Corrigir achados críticos antes de concluir.
