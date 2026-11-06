<script setup lang="ts">
import { Check } from '@lucide/vue';
import AppLink from '@/components/shared/AppLink.vue';

const plans = [
    { name: 'Starter', monthly: 39.9, cpu: 2, ram: 4, disk: 80 },
    { name: 'Pro', monthly: 79.9, cpu: 4, ram: 8, disk: 160, featured: true },
    { name: 'Enterprise', monthly: 149.9, cpu: 8, ram: 16, disk: 320 },
    { name: 'Titan', monthly: 289.9, cpu: 16, ram: 32, disk: 640 },
];
</script>

<template>
    <section class="py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid gap-8 lg:grid-cols-2 lg:items-end">
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        Configurações transparentes
                    </p>
                    <h1
                        class="mt-4 font-display text-5xl font-semibold tracking-tight"
                    >
                        Recursos objetivos para cada etapa.
                    </h1>
                </div>
                <p
                    class="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end"
                >
                    Escolha a base, ajuste o ambiente e evolua conforme a
                    operação exigir.
                </p>
            </div>
            <div class="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <article
                    v-for="plan in plans"
                    :key="plan.name"
                    :class="[
                        'relative rounded-xl border p-6',
                        plan.featured
                            ? 'border-primary bg-primary/[.07]'
                            : 'border-border bg-card/40',
                    ]"
                >
                    <span
                        v-if="plan.featured"
                        class="absolute top-5 right-5 text-[10px] tracking-wider text-primary-light uppercase"
                        >Recomendado</span
                    >
                    <h2 class="text-lg font-semibold">VPS {{ plan.name }}</h2>
                    <p class="mt-6">
                        <strong class="font-display text-4xl"
                            >R$
                            {{
                                plan.monthly.toFixed(2).replace('.', ',')
                            }}</strong
                        ><span class="text-xs text-muted-foreground">/mês</span>
                    </p>
                    <ul class="mt-7 space-y-3 text-sm">
                        <li
                            v-for="feature in [
                                `${plan.cpu} vCPU`,
                                `${plan.ram} GB RAM`,
                                `${plan.disk} GB NVMe`,
                                'Snapshots',
                                'Painel de controle',
                                'Acesso root',
                            ]"
                            :key="feature"
                            class="flex gap-2 text-muted-foreground"
                        >
                            <Check class="h-4 w-4 text-emerald-400" />{{
                                feature
                            }}
                        </li>
                    </ul>
                    <AppLink
                        href="/checkout"
                        :class="[
                            'mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-lg border font-semibold',
                            plan.featured
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border hover:bg-card',
                        ]"
                        >Configurar VPS</AppLink
                    >
                </article>
            </div>
            <div class="mt-16 border-y border-border py-10 text-center">
                <p class="text-muted-foreground">
                    Nenhum plano encaixou?
                    <AppLink
                        href="/checkout"
                        class="font-semibold text-primary-light"
                        >Monte sua própria VPS</AppLink
                    >
                </p>
            </div>
        </div>
    </section>
</template>
