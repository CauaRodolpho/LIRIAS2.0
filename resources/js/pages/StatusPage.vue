<script setup lang="ts">
import { Activity, CheckCircle2, Clock3, MapPin } from '@lucide/vue';
const services = [
    'Painel LIRIAS',
    'Provisionamento VPS',
    'Rede nacional',
    'DNS',
    'Backups',
    'Central de suporte',
];
</script>

<template>
    <section class="py-20 sm:py-24">
        <div class="mx-auto max-w-5xl px-4 sm:px-6">
            <div
                class="flex flex-col gap-8 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between"
            >
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        Status da infraestrutura
                    </p>
                    <h1 class="mt-4 font-display text-5xl font-semibold">
                        Operação nacional estável.
                    </h1>
                    <p class="mt-5 max-w-2xl text-lg text-muted-foreground">
                        Acompanhamento local da infraestrutura LIRIAS no Brasil.
                    </p>
                </div>
                <span
                    class="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400"
                    ><CheckCircle2 class="h-4 w-4" /> Todos os sistemas
                    operacionais</span
                >
            </div>
            <div
                class="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2"
            >
                <article
                    v-for="service in services"
                    :key="service"
                    class="flex items-center justify-between bg-background p-5"
                >
                    <div class="flex items-center gap-3">
                        <Activity class="h-4 w-4 text-primary-light" /><span
                            class="font-medium"
                            >{{ service }}</span
                        >
                    </div>
                    <span class="text-xs text-emerald-400">Operacional</span>
                </article>
            </div>
            <div class="mt-10 grid gap-5 sm:grid-cols-3">
                <article class="border-t border-border pt-5">
                    <MapPin class="h-5 w-5 text-primary-light" />
                    <h2 class="mt-5 font-semibold">São Paulo, Brasil</h2>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Operação local e nacional.
                    </p>
                </article>
                <article class="border-t border-border pt-5">
                    <Clock3 class="h-5 w-5 text-primary-light" />
                    <h2 class="mt-5 font-semibold">Última atualização</h2>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Atualizado há poucos minutos.
                    </p>
                </article>
                <article class="border-t border-border pt-5">
                    <CheckCircle2 class="h-5 w-5 text-primary-light" />
                    <h2 class="mt-5 font-semibold">Sem incidentes ativos</h2>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Nenhum impacto identificado.
                    </p>
                </article>
            </div>
            <div class="mt-16">
                <h2 class="text-2xl font-semibold">Histórico recente</h2>
                <div class="mt-5 rounded-xl border border-border">
                    <div
                        v-for="month in [
                            'Novembro de 2026',
                            'Outubro de 2026',
                            'Setembro de 2026',
                        ]"
                        :key="month"
                        class="flex items-center justify-between border-b border-border p-5 last:border-b-0"
                    >
                        <span>{{ month }}</span
                        ><span class="text-sm text-emerald-400"
                            >Disponibilidade integral</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
