<script setup lang="ts">
import { Menu, X } from '@lucide/vue';
import { onBeforeUnmount, ref, watch } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
import BrandMark from '@/components/shared/BrandMark.vue';
import ThemeToggle from '@/components/shared/ThemeToggle.vue';

const menuOpen = ref(false);

const navigation = [
    { label: 'Produtos', href: '/applications' },
    { label: 'VPS Linux', href: '/vps-linux' },
    { label: 'VPS Windows', href: '/vps-windows' },
    { label: 'Preços', href: '/pricing' },
    { label: 'Documentação', href: '/docs' },
];

watch(menuOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : '';
});

onBeforeUnmount(() => {
    document.body.style.overflow = '';
});
</script>

<template>
    <div class="min-h-screen bg-background text-foreground">
        <a
            href="#main-content"
            class="sr-only z-[100] bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
            Ir para o conteúdo
        </a>

        <header
            class="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl"
        >
            <div
                class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
            >
                <AppLink href="/" class="shrink-0"><BrandMark /></AppLink>

                <nav
                    class="hidden items-center gap-7 lg:flex"
                    aria-label="Navegação principal"
                >
                    <AppLink
                        v-for="item in navigation"
                        :key="item.href"
                        :href="item.href"
                        class="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                    >
                        {{ item.label }}
                    </AppLink>
                </nav>

                <div class="hidden items-center gap-3 lg:flex">
                    <ThemeToggle />
                    <AppLink
                        href="/login"
                        class="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        Login
                    </AppLink>
                    <AppLink
                        href="/register"
                        class="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/60 bg-gradient-to-r from-primary to-purple-950 px-5 text-sm font-semibold text-white shadow-[0_10px_28px_-14px_hsl(var(--primary))] transition hover:-translate-y-0.5"
                    >
                        Criar conta
                    </AppLink>
                </div>

                <button
                    type="button"
                    class="grid h-11 w-11 place-items-center rounded-lg border border-border text-foreground lg:hidden"
                    :aria-expanded="menuOpen"
                    aria-controls="mobile-navigation"
                    :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
                    @click="menuOpen = !menuOpen"
                >
                    <X v-if="menuOpen" class="h-5 w-5" />
                    <Menu v-else class="h-5 w-5" />
                </button>
            </div>

            <Transition name="menu">
                <div
                    v-if="menuOpen"
                    id="mobile-navigation"
                    class="fixed inset-x-0 top-[73px] h-[calc(100dvh-73px)] overflow-y-auto border-b border-border bg-background p-5 lg:hidden"
                >
                    <nav class="grid gap-2" aria-label="Navegação mobile">
                        <AppLink
                            v-for="item in navigation"
                            :key="item.href"
                            :href="item.href"
                            class="rounded-lg border border-transparent px-4 py-4 text-base font-medium hover:border-border hover:bg-card"
                            @click="menuOpen = false"
                        >
                            {{ item.label }}
                        </AppLink>
                    </nav>
                    <div class="mt-6 grid gap-3 border-t border-border pt-6">
                        <AppLink
                            href="/login"
                            class="rounded-lg border border-border px-4 py-3 text-center"
                            >Login</AppLink
                        >
                        <AppLink
                            href="/register"
                            class="rounded-lg bg-primary px-4 py-3 text-center font-semibold text-primary-foreground"
                        >
                            Criar conta
                        </AppLink>
                    </div>
                </div>
            </Transition>
        </header>

        <main id="main-content" class="min-h-[70vh] pt-[72px]">
            <slot />
        </main>

        <footer class="border-t border-border/70">
            <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div
                    class="flex flex-col gap-10 border-b border-border pb-12 lg:flex-row lg:items-start lg:justify-between"
                >
                    <div class="max-w-sm">
                        <BrandMark />
                        <p class="mt-5 text-sm leading-6 text-muted-foreground">
                            Infraestrutura VPS nacional para configurar, operar
                            e evoluir projetos com clareza.
                        </p>
                        <AppLink
                            href="/status"
                            class="mt-5 inline-flex items-center gap-2 text-sm text-emerald-400"
                        >
                            <span class="h-2 w-2 rounded-full bg-emerald-400" />
                            Infraestrutura nacional operacional
                        </AppLink>
                    </div>
                    <div class="grid grid-cols-2 gap-10 text-sm sm:grid-cols-4">
                        <div
                            v-for="group in [
                                ['Empresa', ['Sobre nós', 'Blog', 'Contato']],
                                [
                                    'Produtos',
                                    ['VPS Linux', 'VPS Windows', 'Aplicações'],
                                ],
                                [
                                    'Suporte',
                                    [
                                        'Central de ajuda',
                                        'Documentação',
                                        'Status',
                                    ],
                                ],
                                ['Legal', ['Termos', 'Privacidade', 'SLA']],
                            ]"
                            :key="String(group[0])"
                        >
                            <h2
                                class="text-xs font-semibold tracking-[0.14em] uppercase"
                            >
                                {{ group[0] }}
                            </h2>
                            <ul class="mt-4 space-y-3 text-muted-foreground">
                                <li
                                    v-for="link in group[1]"
                                    :key="String(link)"
                                >
                                    {{ link }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-3 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between"
                >
                    <p>© 2026 LIRIAS. Todos os direitos reservados.</p>
                    <p>SÃO PAULO · BRASIL · VPS NACIONAL</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
    transition:
        opacity 180ms ease,
        transform 180ms ease;
}
.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
