<script setup lang="ts">
import {
    Activity,
    Boxes,
    CreditCard,
    Database,
    Globe2,
    HardDrive,
    KeyRound,
    LayoutDashboard,
    Menu,
    Network,
    Server,
    Settings,
    ShieldCheck,
    X,
} from '@lucide/vue';
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
import BrandMark from '@/components/shared/BrandMark.vue';

const open = ref(false);
const page = usePage();
const currentUrl = computed(() => page.url.split('?')[0]);
const groups = [
    {
        label: 'Conta',
        links: [
            { label: 'Visão geral', href: '/dashboard', icon: LayoutDashboard },
            { label: 'Servidores', href: '/dashboard/servers', icon: Server },
        ],
    },
    {
        label: 'Servidor atual',
        links: [
            {
                label: 'Visão da VPS',
                href: '/dashboard/servers/srv-lirias-01',
                icon: Server,
            },
            {
                label: 'Monitoramento',
                href: '/dashboard/servers/srv-lirias-01/monitoring',
                icon: Activity,
            },
            {
                label: 'Docker',
                href: '/dashboard/servers/srv-lirias-01/docker',
                icon: Boxes,
            },
            {
                label: 'Aplicações',
                href: '/dashboard/servers/srv-lirias-01/applications',
                icon: Boxes,
            },
            {
                label: 'Acesso',
                href: '/dashboard/servers/srv-lirias-01/access',
                icon: KeyRound,
            },
            {
                label: 'Sistema operacional',
                href: '/dashboard/servers/srv-lirias-01/os',
                icon: HardDrive,
            },
            {
                label: 'Backups',
                href: '/dashboard/servers/srv-lirias-01/backups',
                icon: Database,
            },
            {
                label: 'Atividade',
                href: '/dashboard/servers/srv-lirias-01/activity',
                icon: Activity,
            },
            {
                label: 'Configurações',
                href: '/dashboard/servers/srv-lirias-01/settings',
                icon: Settings,
            },
        ],
    },
    {
        label: 'Proteção e rede',
        links: [
            {
                label: 'Segurança',
                href: '/dashboard/servers/srv-lirias-01/security',
                icon: ShieldCheck,
            },
            {
                label: 'Firewall',
                href: '/dashboard/servers/srv-lirias-01/security/firewall',
                icon: ShieldCheck,
            },
            {
                label: 'Scanner de malware',
                href: '/dashboard/servers/srv-lirias-01/security/malware',
                icon: ShieldCheck,
            },
            { label: 'Rede', href: '/dashboard/network', icon: Network },
            {
                label: 'DNS',
                href: '/dashboard/servers/srv-lirias-01/dns',
                icon: Globe2,
            },
            { label: 'Domínios', href: '/dashboard/domains', icon: Globe2 },
        ],
    },
    {
        label: 'Plataforma',
        links: [
            {
                label: 'Tokens de API',
                href: '/dashboard/developers/api-tokens',
                icon: KeyRound,
            },
            { label: 'Cobrança', href: '/dashboard/billing', icon: CreditCard },
            { label: 'Conta', href: '/dashboard/account', icon: Settings },
            { label: 'Suporte', href: '/dashboard/support', icon: Activity },
        ],
    },
];

function active(href: string) {
    return href === '/dashboard'
        ? currentUrl.value === href
        : currentUrl.value === href || currentUrl.value.startsWith(`${href}/`);
}
</script>

<template>
    <div
        class="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[250px_1fr]"
    >
        <aside
            :class="[
                'fixed inset-y-0 left-0 z-50 w-[min(88vw,285px)] overflow-y-auto border-r border-border bg-background p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:translate-x-0',
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
            <nav class="mt-6 grid gap-6 pb-24" aria-label="Painel">
                <section v-for="group in groups" :key="group.label">
                    <p
                        class="px-3 font-mono text-[9px] tracking-[.16em] text-muted-foreground uppercase"
                    >
                        {{ group.label }}
                    </p>
                    <div class="mt-2 grid gap-1">
                        <AppLink
                            v-for="item in group.links"
                            :key="item.href"
                            :href="item.href"
                            class="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm transition"
                            :class="
                                active(item.href)
                                    ? 'bg-primary/10 text-foreground'
                                    : 'text-muted-foreground hover:bg-card hover:text-foreground'
                            "
                            @click="open = false"
                        >
                            <component
                                :is="item.icon"
                                class="h-4 w-4"
                                :class="
                                    active(item.href)
                                        ? 'text-primary-light'
                                        : ''
                                "
                            />
                            {{ item.label }}
                        </AppLink>
                    </div>
                </section>
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
