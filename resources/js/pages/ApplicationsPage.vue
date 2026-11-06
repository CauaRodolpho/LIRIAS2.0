<script setup lang="ts">
import {
    Bot,
    Box,
    Braces,
    Database,
    GitBranch,
    MessageSquare,
    Workflow,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';

const selected = ref('Todos');
const categories = [
    'Todos',
    'Automação',
    'Desenvolvimento',
    'CMS',
    'Banco de dados',
    'Operações',
];
const applications = [
    {
        slug: 'n8n',
        name: 'n8n',
        category: 'Automação',
        detail: 'Fluxos, webhooks e integrações em ambiente próprio.',
        icon: Workflow,
    },
    {
        slug: 'docker',
        name: 'Docker',
        category: 'Operações',
        detail: 'Aplicações e dependências em contêineres reproduzíveis.',
        icon: Box,
    },
    {
        slug: 'wordpress',
        name: 'WordPress',
        category: 'CMS',
        detail: 'Estrutura inicial para sites, blogs e páginas administrativas.',
        icon: Braces,
    },
    {
        slug: 'node',
        name: 'Node.js',
        category: 'Desenvolvimento',
        detail: 'APIs, aplicações web, workers e serviços JavaScript.',
        icon: Braces,
    },
    {
        slug: 'postgresql',
        name: 'PostgreSQL',
        category: 'Banco de dados',
        detail: 'Banco relacional para aplicações que exigem consistência.',
        icon: Database,
    },
    {
        slug: 'coolify',
        name: 'Coolify',
        category: 'Operações',
        detail: 'Implantação autogerenciada para projetos e bancos.',
        icon: Bot,
    },
    {
        slug: 'gitlab',
        name: 'GitLab',
        category: 'Desenvolvimento',
        detail: 'Repositórios, pipelines e colaboração em equipe.',
        icon: GitBranch,
    },
    {
        slug: 'chatwoot',
        name: 'Chatwoot',
        category: 'Operações',
        detail: 'Central de atendimento autogerenciada para múltiplos canais.',
        icon: MessageSquare,
    },
];
const results = computed(() =>
    selected.value === 'Todos'
        ? applications
        : applications.filter((app) => app.category === selected.value),
);
</script>

<template>
    <section class="py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl">
                <p
                    class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                >
                    Catálogo técnico
                </p>
                <h1
                    class="mt-4 font-display text-5xl font-semibold tracking-tight"
                >
                    Ambientes preparados para sua VPS.
                </h1>
                <p class="mt-5 text-lg leading-8 text-muted-foreground">
                    Explore aplicações e stacks que podem compor sua
                    infraestrutura.
                </p>
            </div>
            <div
                class="mt-10 flex gap-2 overflow-x-auto border-y border-border py-4"
                aria-label="Filtros"
            >
                <button
                    v-for="category in categories"
                    :key="category"
                    :class="[
                        'shrink-0 rounded-lg px-4 py-2 text-sm transition',
                        selected === category
                            ? 'border border-primary/50 bg-primary/10 text-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                    ]"
                    @click="selected = category"
                >
                    {{ category }}
                </button>
            </div>
            <div
                class="mt-10 flex items-end justify-between border-b border-border pb-5"
            >
                <div>
                    <p
                        class="text-xs tracking-wider text-primary-light uppercase"
                    >
                        Resultados do catálogo
                    </p>
                    <h2 class="mt-2 text-2xl font-semibold">
                        Aplicações encontradas
                    </h2>
                </div>
                <p class="text-sm text-muted-foreground">
                    <strong class="text-foreground">{{
                        results.length
                    }}</strong>
                    opções
                </p>
            </div>
            <div class="grid md:grid-cols-2">
                <AppLink
                    v-for="app in results"
                    :key="app.slug"
                    :href="`/applications/${app.slug}`"
                    class="group min-h-56 border-b border-border p-6 transition hover:bg-card/55 md:odd:border-r"
                >
                    <div class="flex items-start justify-between">
                        <span
                            class="grid h-11 w-11 place-items-center rounded-lg border border-primary/25 bg-primary/[.06]"
                            ><component
                                :is="app.icon"
                                class="h-5 w-5 text-primary-light" /></span
                        ><span
                            class="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary-light"
                            >→</span
                        >
                    </div>
                    <p
                        class="mt-6 text-[10px] font-semibold tracking-[.15em] text-primary-light uppercase"
                    >
                        {{ app.category }}
                    </p>
                    <h3 class="mt-2 text-xl font-semibold">{{ app.name }}</h3>
                    <p
                        class="mt-3 max-w-xl text-sm leading-6 text-muted-foreground"
                    >
                        {{ app.detail }}
                    </p>
                </AppLink>
            </div>
        </div>
    </section>
</template>
