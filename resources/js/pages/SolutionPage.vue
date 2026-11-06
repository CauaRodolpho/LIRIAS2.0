<script setup lang="ts">
import {
    ArrowRight,
    Bot,
    Boxes,
    Braces,
    Database,
    Globe2,
    MessageSquare,
    ShoppingBag,
    Workflow,
    Zap,
} from '@lucide/vue';
import { computed } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
const props = defineProps<{ variant: string }>();
const isAutomation = computed(() => props.variant === 'automation');
const content = computed(() =>
    props.variant === 'agents'
        ? {
              eyebrow: 'Agentes e serviços de IA',
              title: 'Uma base para executar agentes e serviços conectados',
              text: 'Organize runtime, banco, filas e integrações em uma VPS sob administração da sua equipe.',
              icon: Bot,
              items: [
                  [
                      'Runtime configurável',
                      'Prepare o ambiente para o framework e o modelo usados pelo projeto.',
                      Braces,
                  ],
                  [
                      'Dados e memória',
                      'Conecte bancos, cache e armazenamento necessários para o agente.',
                      Database,
                  ],
                  [
                      'Fluxos integrados',
                      'Combine APIs, webhooks e automações da operação.',
                      Workflow,
                  ],
              ],
          }
        : props.variant === 'ecommerce'
          ? {
                eyebrow: 'Lojas e operações digitais',
                title: 'Infraestrutura organizada para sua plataforma de vendas',
                text: 'Visualize como aplicação, banco e serviços de apoio podem ser distribuídos no ambiente.',
                icon: ShoppingBag,
                items: [
                    [
                        'Aplicação',
                        'Hospede a plataforma escolhida e seus processos de execução.',
                        Boxes,
                    ],
                    [
                        'Dados',
                        'Planeje banco, cache e estratégia de cópias de segurança.',
                        Database,
                    ],
                    [
                        'Integrações',
                        'Conecte pagamentos, estoque e ferramentas externas por API.',
                        Workflow,
                    ],
                ],
            }
          : null,
);
const automationFeatures = [
    [
        'Integrações organizadas',
        'Conecte serviços por webhooks, APIs e credenciais definidas no próprio fluxo.',
        Zap,
    ],
    [
        'Ambiente administrado',
        'Escolha recursos, domínio e políticas do servidor conforme o projeto.',
        Workflow,
    ],
    [
        'Evolução gradual',
        'Comece com um fluxo e ajuste a infraestrutura conforme a operação crescer.',
        ArrowRight,
    ],
];
const destinations = [
    [MessageSquare, 'Mensagens'],
    [Database, 'Dados'],
    [Globe2, 'APIs'],
];
</script>
<template>
    <section
        v-if="isAutomation"
        class="min-h-screen overflow-hidden pt-28 pb-24"
    >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                <div>
                    <span
                        class="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-light"
                        >Automação em VPS</span
                    >
                    <h1
                        class="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl"
                    >
                        Conecte processos com n8n em um ambiente próprio
                    </h1>
                    <p
                        class="mt-5 max-w-xl text-lg leading-8 text-muted-foreground"
                    >
                        Planeje fluxos, integrações e webhooks em uma VPS
                        administrada pela sua equipe. A experiência abaixo
                        demonstra como será o provisionamento pelo painel.
                    </p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <AppLink
                            href="/applications/n8n"
                            class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white"
                            >Explorar n8n
                            <ArrowRight class="h-4 w-4" /></AppLink
                        ><AppLink
                            href="/applications"
                            class="inline-flex min-h-11 items-center rounded-lg border border-border px-5 font-semibold"
                            >Ver catálogo</AppLink
                        >
                    </div>
                </div>
                <div
                    class="relative min-h-[430px] overflow-hidden rounded-[1.75rem] border border-border bg-card/55 p-6 sm:p-10"
                >
                    <div class="hero-grid absolute inset-0 opacity-25" />
                    <div
                        class="relative flex min-h-[350px] items-center justify-center"
                    >
                        <div
                            class="absolute top-1/2 left-0 hidden -translate-y-1/2 items-center gap-3 sm:flex"
                        >
                            <span
                                class="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-background"
                                ><Bot
                                    class="h-6 w-6 text-muted-foreground" /></span
                            ><span class="h-px w-16 bg-border" />
                        </div>
                        <div
                            class="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-[2rem] border border-primary/40 bg-primary/10 shadow-[0_0_55px_hsl(var(--primary)/.16)]"
                        >
                            <span
                                class="absolute top-4 right-4 h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                            /><Workflow
                                class="h-9 w-9 text-primary-light"
                            /><strong class="mt-3">n8n</strong
                            ><span class="text-xs text-muted-foreground"
                                >na sua VPS</span
                            >
                        </div>
                        <div
                            class="absolute top-1/2 right-0 flex -translate-y-1/2 flex-col gap-3 sm:right-2"
                        >
                            <div
                                v-for="(item, index) in destinations"
                                :key="String(item[1])"
                                class="relative flex items-center gap-3"
                            >
                                <span
                                    class="absolute right-full mr-3 hidden h-px bg-border sm:block"
                                    :style="{ width: `${54 + index * 10}px` }"
                                /><span
                                    class="grid h-12 w-12 place-items-center rounded-xl border border-border bg-background"
                                    ><component
                                        :is="item[0]"
                                        class="h-5 w-5 text-muted-foreground" /></span
                                ><span
                                    class="hidden w-20 text-sm font-medium sm:block"
                                    >{{ item[1] }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-20 grid gap-4 md:grid-cols-3">
                <article
                    v-for="item in automationFeatures"
                    :key="String(item[0])"
                    class="rounded-xl border border-border bg-card/40 p-6"
                >
                    <component
                        :is="item[2]"
                        class="h-5 w-5 text-primary-light"
                    />
                    <h2 class="mt-5 text-lg font-semibold">{{ item[0] }}</h2>
                    <p class="mt-2 text-sm leading-6 text-muted-foreground">
                        {{ item[1] }}
                    </p>
                </article>
            </div>
        </div>
    </section>
    <section v-else-if="content" class="min-h-screen pt-28 pb-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="overflow-hidden rounded-2xl border border-border bg-card/35 lg:grid lg:grid-cols-[1fr_380px]"
            >
                <div class="p-7 sm:p-12 lg:p-16">
                    <p
                        class="inline-flex rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] tracking-wider text-primary-light uppercase"
                    >
                        {{ content.eyebrow }}
                    </p>
                    <h1
                        class="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl"
                    >
                        {{ content.title }}
                    </h1>
                    <p
                        class="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground"
                    >
                        {{ content.text }}
                    </p>
                    <div class="mt-9 flex flex-wrap gap-3">
                        <AppLink
                            href="/applications"
                            class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white"
                            >Explorar aplicações
                            <ArrowRight class="h-4 w-4" /></AppLink
                        ><AppLink
                            href="/pricing"
                            class="inline-flex min-h-11 items-center rounded-lg border border-border px-5 font-semibold"
                            >Comparar planos</AppLink
                        >
                    </div>
                </div>
                <aside
                    class="border-t border-border bg-background/25 p-7 lg:border-t-0 lg:border-l"
                >
                    <div
                        class="flex items-center justify-between border-b border-border pb-5"
                    >
                        <p
                            class="font-mono text-[10px] tracking-[.18em] text-muted-foreground uppercase"
                        >
                            Arquitetura sugerida
                        </p>
                        <component
                            :is="content.icon"
                            class="h-5 w-5 text-primary-light"
                        />
                    </div>
                    <div class="mt-5 grid gap-3">
                        <article
                            v-for="(item, index) in content.items"
                            :key="String(item[0])"
                            class="flex items-center gap-3 rounded-lg border border-border bg-background/55 p-4"
                        >
                            <span
                                class="grid h-9 w-9 place-items-center rounded-md border border-primary/25 bg-primary/10"
                                ><component
                                    :is="item[2]"
                                    class="h-4 w-4 text-primary-light"
                            /></span>
                            <div>
                                <h2 class="font-semibold">{{ item[0] }}</h2>
                                <p
                                    class="text-[10px] tracking-wider text-muted-foreground uppercase"
                                >
                                    Camada
                                    {{ String(index + 1).padStart(2, '0') }}
                                </p>
                            </div>
                            <span
                                class="ml-auto h-2 w-2 rounded-full bg-emerald-400"
                            />
                        </article>
                    </div>
                </aside>
            </div>
            <div class="mt-10 grid gap-4 md:grid-cols-3">
                <article
                    v-for="item in content.items"
                    :key="String(item[0])"
                    class="rounded-xl border border-border bg-background/40 p-6"
                >
                    <component
                        :is="item[2]"
                        class="h-6 w-6 text-primary-light"
                    />
                    <h2 class="mt-5 text-lg font-semibold">{{ item[0] }}</h2>
                    <p class="mt-2 text-sm leading-6 text-muted-foreground">
                        {{ item[1] }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>
