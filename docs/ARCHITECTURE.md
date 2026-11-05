# Arquitetura da LIRIAS 2.0

## Responsabilidades

- Laravel é a fonte da verdade para URLs, redirects, parâmetros e respostas HTTP.
- Inertia transporta a página e suas propriedades para o React sem uma API de navegação separada.
- React implementa a interface, os estados demonstrativos e as interações.
- Wayfinder gera representações TypeScript das rotas Laravel durante o desenvolvimento e o build.
- Vite compila TypeScript, React, Tailwind e os recursos estáticos.

## Navegação

O projeto não utiliza `react-router-dom`. Todas as rotas públicas e do painel estão registradas em `routes/web.php`. O controller `LiriasPageController` entrega ao Inertia:

- `screen`: tela React que será exibida;
- `title`: título da página;
- `route.name`: nome da rota Laravel;
- `route.params`: parâmetros dinâmicos;
- `route.query`: query string.

O componente `resources/js/pages/route-page.tsx` seleciona a experiência visual e aplica o layout de marketing, autenticação ou dashboard.

## Compatibilidade durante a migração

`resources/js/lib/routing.tsx` substitui temporariamente os hooks antes fornecidos pelo React Router. Essa camada lê parâmetros do Inertia e realiza navegação com `router.visit`. Ela permite preservar os componentes visuais enquanto a aplicação adota rotas Laravel gradualmente.

## Dados

Esta fase continua sendo um protótipo front-end. Os dados demonstrativos permanecem em `resources/js/data` e nenhuma API externa é necessária para navegar ou visualizar o produto.

## Produção

Em produção, Nginx ou Apache deve apontar para `public/`. `composer run dev` é apenas para desenvolvimento. O deploy compila os assets e executa Laravel por PHP-FPM.
