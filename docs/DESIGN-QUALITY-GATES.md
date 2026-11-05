# Design Quality Gates

Este documento transforma a direção visual em critérios verificáveis.

## Gate local

Na primeira execução:

```bash
npx playwright install chromium
```

Depois:

```bash
npm run type-check
npm run build
npm run preview -- --host 127.0.0.1
npm run audit:design
```

O audit pressupõe a prévia em `http://127.0.0.1:4173` e grava resultados em `audit-output/`.
Se o Chromium já estiver instalado em um caminho personalizado, defina `PW_EXECUTABLE_PATH`.

## Rotas críticas

- `/`
- `/applications`
- `/pricing`
- `/checkout?plan=vps-pro&os=linux&goal=general`
- `/status`
- `/dashboard`
- `/dashboard/servers/srv-lirias-01`
- `/dashboard/servers/srv-lirias-01/activity`
- `/dashboard/servers/srv-lirias-01/backups`
- `/dashboard/servers/srv-lirias-01/security/firewall`
- `/dashboard/domains`
- `/dashboard/developers/api-tokens`

## Viewports

360, 390, 768, 1024, 1440 e 1920 px.

## Falhas que bloqueiam entrega

- scroll horizontal;
- controle sem nome acessível;
- ausência de foco visível na amostra;
- imagem sem `alt`;
- meta viewport ou `lang` ausente;
- erro JavaScript da aplicação;
- rota crítica sem `h1`;
- falha de build ou TypeScript.

## Avisos que exigem revisão humana

- alvo de toque menor que 44×44 px;
- imagem sem dimensões reservadas;
- contraste aproximado abaixo de AA;
- múltiplos `h1`;
- densidade ou composição incoerente com o override.

O audit é heurístico. Impeccable/Taste continuam necessários para avaliar hierarquia, autenticidade, clareza e excesso decorativo.

Com 12 rotas, seis viewports e dois temas, cada execução produz 144 capturas.
