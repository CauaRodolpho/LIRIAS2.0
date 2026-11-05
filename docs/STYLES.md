# Estrutura de estilos

O ponto de entrada global é `resources/css/app.css`. Ele carrega o Tailwind CSS
e os módulos visuais da LIRIAS na ordem necessária para preservar a cascata.

## Diretórios

- `foundations/`: tipografia, tokens de tema e estilos globais de base.
- `components/`: superfícies, padrões reutilizáveis, seletores, interações e ações.
- `pages/`: composições específicas de páginas e da Home.
- `layouts/`: regras estruturais compartilhadas, como footer e canvas de marketing.
- `effects/`: efeitos ambientais e decorativos.

## Regras de manutenção

1. Importe módulos globais somente em `app.css`.
2. Preserve a ordem `foundations → components → pages → layouts`.
3. Prefira tokens já definidos antes de criar cores, sombras ou espaçamentos novos.
4. Coloque uma regra no módulo mais específico possível; não crie outro arquivo
   global monolítico.
5. Mantenha estilos locais próximos do componente quando não forem compartilhados.

O projeto usa Tailwind CSS 4. Por isso, os módulos permanecem em CSS nativo em
vez de SCSS: a organização por imports é mantida sem adicionar uma etapa de Sass
incompatível com o fluxo recomendado pelo Tailwind 4.
