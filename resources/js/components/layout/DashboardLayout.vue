<script setup lang="ts">
import {
    Activity,
    Boxes,
    CreditCard,
    LayoutDashboard,
    Menu,
    Network,
    Server,
    Settings,
    ShieldCheck,
    X,
} from '@lucide/vue';
import { ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
import BrandMark from '@/components/shared/BrandMark.vue';

const open = ref(false);
const links = [
    { label: 'Visão geral', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Servidores', href: '/dashboard/servers', icon: Server },
    {
        label: 'Aplicações',
        href: '/dashboard/servers/srv-lirias-01/applications',
        icon: Boxes,
    },
    {
        label: 'Monitoramento',
        href: '/dashboard/servers/srv-lirias-01/monitoring',
        icon: Activity,
    },
    {
        label: 'Segurança',
        href: '/dashboard/servers/srv-lirias-01/security',
        icon: ShieldCheck,
    },
    { label: 'Rede', href: '/dashboard/network', icon: Network },
    { label: 'Cobrança', href: '/dashboard/billing', icon: CreditCard },
    { label: 'Configurações', href: '/dashboard/settings', icon: Settings },
];
</script>

<template>
    <div
        class="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[250px_1fr]"
    >
        <aside
            :class="[
                'fixed inset-y-0 left-0 z-50 w-[min(86vw,270px)] border-r border-border bg-background p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:translate-x-0',
                open ? 'translate-x-0' : '-translate-x-full',
            ]"
        >
            <div class="flex h-14 items-center justify-between px-2">
                <AppLink href="/"><BrandMark /></AppLink>
                <button
                    class="grid h-10 w-10 place-items-center lg:hidden"
                    aria-label="Fechar menu"
                    @click="open = false"
                >
                    <X class="h-5 w-5" />
                </button>
            </div>
            <nav class="mt-8 grid gap-1" aria-label="Painel">
                <AppLink
                    v-for="item in links"
                    :key="item.href"
                    :href="item.href"
                    class="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
                    @click="open = false"
                >
                    <component
                        :is="item.icon"
                        class="h-4 w-4 text-primary-light"
                    />
                    {{ item.label }}
                </AppLink>
            </nav>
            <div
                class="absolute right-4 bottom-5 left-4 border-t border-border pt-4 text-xs text-muted-foreground"
            >
                <p class="font-medium text-foreground">srv-lirias-01</p>
                <p class="mt-1 flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-emerald-400" />
                    Operacional
                </p>
            </div>
        </aside>

        <div
            v-if="open"
            class="fixed inset-0 z-40 bg-black/60 lg:hidden"
            @click="open = false"
        />

        <div class="min-w-0">
            <header
                class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6"
            >
                <button
                    class="grid h-11 w-11 place-items-center rounded-lg border border-border lg:hidden"
                    aria-label="Abrir menu"
                    @click="open = true"
                >
                    <Menu class="h-5 w-5" />
                </button>
                <div class="ml-auto flex items-center gap-3 text-sm">
                    <span class="hidden text-muted-foreground sm:block"
                        >São Paulo, Brasil</span
                    >
                    <span
                        class="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400"
                        >Operacional</span
                    >
                </div>
            </header>
            <main id="main-content" class="p-4 sm:p-6 lg:p-8"><slot /></main>
        </div>
    </div>
</template>
