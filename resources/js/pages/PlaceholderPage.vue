<script setup lang="ts">
import { ArrowLeft, Construction } from '@lucide/vue';
import AppLink from '@/components/shared/AppLink.vue';
withDefaults(defineProps<{ title?: string; notFound?: boolean }>(), {
    title: 'LIRIAS',
    notFound: false,
});
</script>

<template>
    <section
        class="grid min-h-[70vh] place-items-center px-4 py-20 text-center"
    >
        <div class="max-w-xl">
            <span
                class="mx-auto grid h-14 w-14 place-items-center rounded-xl border border-border bg-card"
                ><Construction class="h-6 w-6 text-primary-light"
            /></span>
            <p
                v-if="notFound"
                class="mt-6 font-mono text-xs text-primary-light"
            >
                ERRO 404
            </p>
            <h1 class="mt-4 font-display text-4xl font-semibold sm:text-5xl">
                {{ notFound ? 'Página não encontrada' : title }}
            </h1>
            <p class="mt-4 leading-7 text-muted-foreground">
                {{
                    notFound
                        ? 'O endereço acessado não existe ou foi movido.'
                        : 'Esta área está preparada para receber o conteúdo definitivo da plataforma.'
                }}
            </p>
            <AppLink
                href="/"
                class="mt-8 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold"
                ><ArrowLeft class="h-4 w-4" /> Voltar ao início</AppLink
            >
        </div>
    </section>
</template>
