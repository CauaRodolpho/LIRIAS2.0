<script setup lang="ts">
import { Bot, Braces, Database, ShoppingBag, Workflow } from '@lucide/vue';
import { computed } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';

const props = defineProps<{ variant: string }>();
const content = computed(() =>
    props.variant === 'agents'
        ? {
              eyebrow: 'Agentes e serviços de IA',
              title: 'Uma base para executar agentes e serviços conectados',
              text: 'Organize runtime, banco, filas e integrações em uma VPS sob administração da sua equipe.',
              icon: Bot,
              layers: [
                  ['Runtime configurável', Braces],
                  ['Dados e memória', Database],
                  ['Fluxos integrados', Workflow],
              ],
          }
        : props.variant === 'automation'
          ? {
                eyebrow: 'Automação autogerenciada',
                title: 'Fluxos sob controle da sua infraestrutura',
                text: 'Execute automações, webhooks e integrações com uma base previsível.',
                icon: Workflow,
                layers: [
                    ['Workflows', Workflow],
                    ['Persistência', Database],
                    ['Integrações', Braces],
                ],
            }
          : {
                eyebrow: 'Lojas e operações digitais',
                title: 'Infraestrutura organizada para sua plataforma de vendas',
                text: 'Distribua aplicação, banco e serviços de apoio em um ambiente controlado.',
                icon: ShoppingBag,
                layers: [
                    ['Aplicação', ShoppingBag],
                    ['Dados', Database],
                    ['Integrações', Workflow],
                ],
            },
);
</script>

<template>
    <section class="py-16 sm:py-24">
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
                        class="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl"
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
                            class="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
                            >Explorar aplicações</AppLink
                        ><AppLink
                            href="/pricing"
                            class="rounded-lg border border-border px-5 py-3 font-semibold"
                            >Comparar planos</AppLink
                        >
                    </div>
                </div>
                <aside
                    class="border-t border-border p-7 lg:border-t-0 lg:border-l"
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
                            v-for="(layer, index) in content.layers"
                            :key="String(layer[0])"
                            class="flex items-center gap-3 rounded-lg border border-border bg-background/55 p-4"
                        >
                            <span
                                class="grid h-9 w-9 place-items-center rounded-md border border-primary/25 bg-primary/10"
                                ><component
                                    :is="layer[1]"
                                    class="h-4 w-4 text-primary-light"
                            /></span>
                            <div>
                                <h2 class="font-semibold">{{ layer[0] }}</h2>
                                <p
                                    class="text-[10px] tracking-wider text-muted-foreground uppercase"
                                >
                                    Camada 0{{ index + 1 }}
                                </p>
                            </div>
                            <span
                                class="ml-auto h-2 w-2 rounded-full bg-emerald-400"
                            />
                        </article>
                    </div>
                </aside>
            </div>
            <div class="mt-6 grid gap-4 md:grid-cols-3">
                <article
                    v-for="layer in content.layers"
                    :key="String(layer[0])"
                    class="rounded-xl border border-border bg-background/40 p-6"
                >
                    <component
                        :is="layer[1]"
                        class="h-5 w-5 text-primary-light"
                    />
                    <h2 class="mt-6 text-lg font-semibold">{{ layer[0] }}</h2>
                    <p class="mt-2 text-sm leading-6 text-muted-foreground">
                        Camada preparada para integrar a operação com clareza e
                        controle.
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>
