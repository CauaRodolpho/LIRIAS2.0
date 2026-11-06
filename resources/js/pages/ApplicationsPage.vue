<script setup lang="ts">
import {
    ArrowLeft,
    ArrowRight,
    Bot,
    Box,
    Braces,
    Check,
    Code2,
    Database,
    GitBranch,
    HardDrive,
    MessageSquare,
    PanelTop,
    Search,
    Server,
    ShieldCheck,
    Workflow,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';

const props = defineProps<{ detail?: boolean; slug?: string }>();
const query = ref('');
const category = ref('Todos');
const categories = [
    'Todos',
    'Automação',
    'Desenvolvimento',
    'CMS',
    'Banco de dados',
    'Operações',
];
const apps = [
    {
        slug: 'n8n',
        name: 'n8n',
        category: 'Automação',
        icon: Workflow,
        accent: '#ea4b71',
        description:
            'Crie fluxos de automação e conecte serviços em um ambiente próprio.',
        long: 'Uma opção para equipes que desejam executar fluxos do n8n em uma VPS sob sua administração, com liberdade para configurar integrações e variáveis do ambiente.',
        requirements: [
            'Docker e Docker Compose',
            'Domínio ou subdomínio',
            'Configuração de HTTPS',
        ],
        steps: [
            'Escolher a VPS',
            'Definir domínio e credenciais',
            'Revisar a configuração',
            'Iniciar a implantação',
        ],
    },
    {
        slug: 'docker',
        name: 'Docker',
        category: 'Operações',
        icon: Box,
        accent: '#2496ed',
        description:
            'Organize aplicações e dependências em contêineres reproduzíveis.',
        long: 'Prepare a VPS para executar serviços em contêineres, projetos Compose e imagens armazenadas em registros públicos ou privados.',
        requirements: [
            'Distribuição Linux compatível',
            'Acesso administrativo',
            'Portas necessárias liberadas',
        ],
        steps: [
            'Selecionar o servidor',
            'Revisar pacotes',
            'Preparar o serviço',
            'Validar a instalação',
        ],
    },
    {
        slug: 'wordpress',
        name: 'WordPress',
        category: 'CMS',
        icon: PanelTop,
        accent: '#21759b',
        description:
            'Estrutura inicial para sites, blogs e páginas administráveis.',
        long: 'Visualize uma instalação composta por servidor web, banco de dados e WordPress, com campos preparados para domínio e acesso administrativo.',
        requirements: ['Domínio configurado', 'Servidor web', 'Banco de dados'],
        steps: [
            'Selecionar domínio',
            'Criar administrador',
            'Revisar recursos',
            'Iniciar a implantação',
        ],
    },
    {
        slug: 'nodejs',
        name: 'Node.js',
        category: 'Desenvolvimento',
        icon: Braces,
        accent: '#3c873a',
        description:
            'Ambiente para APIs, aplicações web, workers e serviços JavaScript.',
        long: 'Prepare uma base de execução para aplicações Node.js com variáveis de ambiente, porta de serviço e processo de inicialização configuráveis.',
        requirements: [
            'Repositório da aplicação',
            'Versão do Node.js',
            'Comando de inicialização',
        ],
        steps: [
            'Conectar o projeto',
            'Definir variáveis',
            'Configurar execução',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'laravel',
        name: 'Laravel',
        category: 'Desenvolvimento',
        icon: Code2,
        accent: '#ff2d20',
        description:
            'Base preparada para aplicações PHP construídas com Laravel.',
        long: 'Organize runtime PHP, servidor web, filas e conexão com banco para receber uma aplicação Laravel.',
        requirements: ['Projeto Laravel', 'PHP e Composer', 'Banco de dados'],
        steps: [
            'Conectar o projeto',
            'Configurar o ambiente',
            'Preparar dependências',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'postgresql',
        name: 'PostgreSQL',
        category: 'Banco de dados',
        icon: Database,
        accent: '#336791',
        description:
            'Banco relacional para aplicações que exigem consistência e consultas avançadas.',
        long: 'Planeje uma instância PostgreSQL com usuário, banco inicial, porta e política de acesso definidos antes da implantação.',
        requirements: [
            'Armazenamento disponível',
            'Política de acesso',
            'Rotina de cópia definida',
        ],
        steps: [
            'Definir versão',
            'Criar credenciais',
            'Configurar acesso',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'redis',
        name: 'Redis',
        category: 'Banco de dados',
        icon: HardDrive,
        accent: '#dc382d',
        description:
            'Cache e armazenamento em memória para filas, sessões e dados temporários.',
        long: 'Prepare uma instância Redis para cache, sessões ou filas com autenticação e limite de memória configuráveis.',
        requirements: [
            'Memória reservada',
            'Rede privada recomendada',
            'Política de persistência',
        ],
        steps: [
            'Definir memória',
            'Configurar autenticação',
            'Escolher persistência',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'coolify',
        name: 'Coolify',
        category: 'Operações',
        icon: Bot,
        accent: '#7c3aed',
        description:
            'Interface de implantação autogerenciada para projetos e bancos de dados.',
        long: 'Use uma VPS para avaliar uma plataforma autogerenciada de deploy com projetos, serviços e bancos centralizados.',
        requirements: ['VPS Linux dedicada', 'Docker', 'Domínio para o painel'],
        steps: [
            'Selecionar o servidor',
            'Definir domínio',
            'Preparar o ambiente',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'gitlab',
        name: 'GitLab',
        category: 'Desenvolvimento',
        icon: GitBranch,
        accent: '#fc6d26',
        description:
            'Repositórios, pipelines e colaboração em uma instalação administrada pela equipe.',
        long: 'Planeje uma instalação autogerenciada para código e integração contínua, considerando armazenamento, memória e domínio dedicado.',
        requirements: [
            'Recursos compatíveis',
            'Domínio dedicado',
            'Política de backup',
        ],
        steps: [
            'Selecionar recursos',
            'Definir domínio',
            'Configurar administrador',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'chatwoot',
        name: 'Chatwoot',
        category: 'Operações',
        icon: MessageSquare,
        accent: '#1f93ff',
        description:
            'Central de atendimento autogerenciada para múltiplos canais.',
        long: 'Visualize a composição de uma central de atendimento com aplicação, banco, cache e serviços necessários.',
        requirements: ['Docker', 'PostgreSQL e Redis', 'Domínio configurado'],
        steps: [
            'Selecionar a VPS',
            'Definir domínio',
            'Criar administrador',
            'Revisar a implantação',
        ],
    },
];
const results = computed(() => {
    const term = query.value.trim().toLocaleLowerCase('pt-BR');
    return apps.filter(
        (app) =>
            (category.value === 'Todos' || app.category === category.value) &&
            (!term ||
                `${app.name} ${app.description} ${app.category}`
                    .toLocaleLowerCase('pt-BR')
                    .includes(term)),
    );
});
const current = computed(() => apps.find((app) => app.slug === props.slug));
function clear() {
    query.value = '';
    category.value = 'Todos';
}
</script>

<template>
    <section v-if="detail && current" class="min-h-screen pt-28 pb-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AppLink
                href="/applications"
                class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                ><ArrowLeft class="h-4 w-4" /> Catálogo de aplicações</AppLink
            >
            <div
                class="mt-8 grid gap-10 lg:grid-cols-[1fr_.82fr] lg:items-start"
            >
                <div>
                    <div class="flex items-center gap-4">
                        <span
                            class="grid h-14 w-14 place-items-center rounded-xl border"
                            :style="{
                                borderColor: `${current.accent}66`,
                                backgroundColor: `${current.accent}14`,
                                color: current.accent,
                            }"
                            ><component :is="current.icon" class="h-6 w-6"
                        /></span>
                        <div>
                            <span
                                class="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                                >{{ current.category }}</span
                            >
                            <h1
                                class="mt-2 font-display text-4xl font-semibold sm:text-5xl"
                            >
                                {{ current.name }}
                            </h1>
                        </div>
                    </div>
                    <p
                        class="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
                    >
                        {{ current.long }}
                    </p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <AppLink
                            :href="`/dashboard/servers/srv-lirias-01/applications/${current.slug}`"
                            class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white"
                            >Simular implantação
                            <ArrowRight class="h-4 w-4" /></AppLink
                        ><AppLink
                            href="/pricing"
                            class="inline-flex min-h-11 items-center rounded-lg border border-border px-5 font-semibold"
                            >Ver planos</AppLink
                        >
                    </div>
                    <div
                        class="mt-10 rounded-2xl border border-primary/25 bg-primary/10 p-5"
                    >
                        <div class="flex gap-3">
                            <ShieldCheck
                                class="mt-0.5 h-5 w-5 shrink-0 text-primary-light"
                            />
                            <div>
                                <p class="font-semibold">Fluxo demonstrativo</p>
                                <p
                                    class="mt-1 text-sm leading-6 text-muted-foreground"
                                >
                                    Esta página prepara a experiência do
                                    front-end. Nenhuma instalação será executada
                                    até a integração com a infraestrutura real.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <aside
                    class="overflow-hidden rounded-2xl border border-border bg-card/55"
                >
                    <div
                        class="border-b border-border bg-background/45 px-6 py-5"
                    >
                        <p
                            class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                        >
                            Prévia do fluxo
                        </p>
                        <h2 class="mt-2 text-xl font-semibold">
                            Preparar {{ current.name }}
                        </h2>
                    </div>
                    <div class="p-6">
                        <p class="text-sm font-semibold">Antes de começar</p>
                        <ul class="mt-4 space-y-3">
                            <li
                                v-for="item in current.requirements"
                                :key="item"
                                class="flex gap-3 text-sm text-muted-foreground"
                            >
                                <span
                                    class="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/10 text-emerald-400"
                                    ><Check class="h-3 w-3" /></span
                                >{{ item }}
                            </li>
                        </ul>
                        <div class="my-6 h-px bg-border" />
                        <p class="text-sm font-semibold">Etapas previstas</p>
                        <ol class="mt-4 space-y-3">
                            <li
                                v-for="(step, index) in current.steps"
                                :key="step"
                                class="flex items-center gap-3 text-sm"
                            >
                                <span
                                    class="grid h-7 w-7 place-items-center rounded-lg border border-border font-mono text-xs text-primary-light"
                                    >{{ index + 1 }}</span
                                ><span class="text-muted-foreground">{{
                                    step
                                }}</span>
                            </li>
                        </ol>
                        <div
                            class="mt-6 flex items-center gap-3 rounded-xl border border-border bg-background/45 p-4"
                        >
                            <Server class="h-5 w-5 text-primary-light" />
                            <div>
                                <p class="text-sm font-medium">
                                    Destino demonstrativo
                                </p>
                                <p class="text-xs text-muted-foreground">
                                    lirias-prod-01
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </section>
    <section
        v-else-if="detail"
        class="grid min-h-[75vh] place-items-center px-4 text-center"
    >
        <div>
            <h1 class="text-3xl font-semibold">Aplicação não encontrada</h1>
            <AppLink
                href="/applications"
                class="mt-6 inline-flex rounded-lg border border-border px-5 py-3"
                >Voltar ao catálogo</AppLink
            >
        </div>
    </section>
    <section v-else class="min-h-screen pt-28 pb-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_.72fr] lg:items-end"
            >
                <div>
                    <span
                        class="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-light"
                        >Catálogo LIRIAS</span
                    >
                    <h1
                        class="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl"
                    >
                        Encontre a base certa para o seu projeto
                    </h1>
                    <p
                        class="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
                    >
                        Explore aplicações e stacks compatíveis com ambientes
                        VPS. A implantação exibida nesta versão é demonstrativa.
                    </p>
                </div>
                <label
                    class="flex items-center gap-3 border-b border-border pb-3 focus-within:border-primary"
                    ><Search class="h-4 w-4 text-muted-foreground" /><input
                        v-model="query"
                        class="w-full bg-transparent outline-none"
                        placeholder="Pesquisar aplicação ou categoria"
                /></label>
            </div>
            <div
                class="mt-8 flex gap-2 overflow-x-auto"
                aria-label="Filtrar aplicações"
            >
                <button
                    v-for="item in categories"
                    :key="item"
                    class="shrink-0 rounded-lg border px-4 py-2 text-sm"
                    :class="
                        category === item
                            ? 'border-primary/50 bg-primary/10 text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    "
                    @click="category = item"
                >
                    {{ item }}
                    <span class="ml-1 text-xs opacity-60">{{
                        item === 'Todos'
                            ? apps.length
                            : apps.filter((app) => app.category === item).length
                    }}</span>
                </button>
            </div>
            <div
                class="mt-12 flex items-end justify-between gap-4 border-b border-border pb-5"
            >
                <div>
                    <p
                        class="text-xs font-semibold tracking-[.18em] text-primary-light uppercase"
                    >
                        {{
                            category !== 'Todos' || query
                                ? 'Resultados do catálogo'
                                : 'Biblioteca de ambientes'
                        }}
                    </p>
                    <h2 class="mt-2 text-2xl font-semibold">
                        {{
                            category !== 'Todos' || query
                                ? 'Aplicações encontradas'
                                : 'Aplicações e stacks'
                        }}
                    </h2>
                </div>
                <p class="text-sm text-muted-foreground">
                    <strong class="text-foreground">{{
                        results.length
                    }}</strong>
                    ambientes disponíveis
                </p>
            </div>
            <TransitionGroup
                v-if="results.length"
                name="catalog"
                tag="div"
                class="mt-6 grid border-y border-border lg:grid-cols-2"
                ><AppLink
                    v-for="app in results"
                    :key="app.slug"
                    :href="`/applications/${app.slug}`"
                    class="group relative flex min-h-48 flex-col border-b border-border px-5 py-6 transition hover:bg-card/55 lg:odd:border-r"
                    ><div class="flex justify-between">
                        <span
                            class="grid h-11 w-11 place-items-center rounded-lg border"
                            :style="{
                                borderColor: `${app.accent}55`,
                                backgroundColor: `${app.accent}12`,
                                color: app.accent,
                            }"
                            ><component :is="app.icon" class="h-5 w-5" /></span
                        ><ArrowRight
                            class="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary-light"
                        />
                    </div>
                    <p
                        class="mt-5 text-[10px] font-semibold tracking-[.14em] text-muted-foreground uppercase"
                    >
                        {{ app.category }}
                    </p>
                    <h3 class="mt-2 text-lg font-semibold">{{ app.name }}</h3>
                    <p
                        class="mt-2 flex-1 text-sm leading-6 text-muted-foreground"
                    >
                        {{ app.description }}
                    </p>
                    <div class="mt-5 border-t border-border/70 pt-4">
                        <p
                            class="text-[10px] font-semibold tracking-[.12em] text-muted-foreground uppercase"
                        >
                            Requisito base
                        </p>
                        <p class="mt-1.5 text-xs font-medium">
                            {{ app.requirements[0] }}
                        </p>
                    </div></AppLink
                ></TransitionGroup
            >
            <div
                v-else
                class="mt-6 border-y border-dashed border-border py-16 text-center"
            >
                <p class="text-xl font-semibold">
                    Nenhuma aplicação encontrada
                </p>
                <p class="mt-2 text-muted-foreground">
                    Tente outro termo ou remova o filtro selecionado.
                </p>
                <button
                    class="mt-5 rounded-lg border border-border px-4 py-2 text-sm"
                    @click="clear"
                >
                    Limpar filtros
                </button>
            </div>
        </div>
    </section>
</template>
<style scoped>
.catalog-enter-active,
.catalog-leave-active {
    transition: all 0.2s ease;
}
.catalog-enter-from,
.catalog-leave-to {
    opacity: 0;
    transform: translateY(8px);
}
</style>
