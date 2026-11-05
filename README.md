# LIRIAS 2.0

Nova base da plataforma LIRIAS, estruturada com Laravel, Composer, Inertia, React, TypeScript, Wayfinder, Vite e Tailwind CSS.

## Arquitetura

- Laravel controla rotas, controllers e respostas HTTP.
- Inertia conecta as rotas Laravel às páginas React.
- React e React DOM implementam a interface e as interações.
- Wayfinder gera funções TypeScript tipadas para rotas e controllers.
- Vite compila os recursos do front-end.

Não utilizamos React Router nem uma API separada para a navegação entre páginas.

## Desenvolvimento

Requisitos: PHP 8.3+, Composer, Node.js e npm.

```bash
composer run setup
composer run dev
```

## Build de produção

```bash
composer install --no-dev --optimize-autoloader
npm ci
php artisan route:clear
npm run build
php artisan optimize
```

O servidor web deve apontar para a pasta `public/`.

## Migração

A interface original em React/Vite será transportada progressivamente na branch `migration/react-interface`. A versão anterior continuará preservada em seu repositório original.
