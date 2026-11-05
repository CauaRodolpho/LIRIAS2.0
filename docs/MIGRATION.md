# Migração React/Vite para Laravel/Inertia

## Concluído

- Fundação oficial Laravel 13.
- Composer e scripts de desenvolvimento.
- Inertia 3 com React 19 e TypeScript.
- Wayfinder e plugin Vite configurados.
- Design system, componentes, dados e páginas da LIRIAS migrados.
- Rotas públicas, autenticação demonstrativa e dashboard cadastrados no Laravel.
- React Router removido da nova aplicação.
- Links internos adaptados para Inertia.
- Parâmetros e query string entregues pelo Laravel.
- Layouts adaptados para composição Inertia.
- Testes de contrato das rotas principais.
- Build do front-end e TypeScript validados.

## Validação no servidor

O ambiente de migração não disponibiliza PHP ou Composer. No servidor, executar:

```bash
composer run setup
composer run dev
```

Depois validar:

```bash
composer ci:check
php artisan route:list
npm run build
```

O build local do front-end foi validado com `LIRIAS_SKIP_WAYFINDER=1`; no servidor, o build normal deve executar a geração oficial do Wayfinder.
