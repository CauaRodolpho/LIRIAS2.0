<script setup lang="ts">
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
import BrandMark from '@/components/shared/BrandMark.vue';

const props = defineProps<{ mode: 'login' | 'register' }>();
const visible = ref(false);
const isRegister = computed(() => props.mode === 'register');
</script>

<template>
    <section
        class="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-12 text-foreground"
    >
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,hsl(var(--primary)/.16),transparent_35%)]"
        />
        <div
            class="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl backdrop-blur lg:grid lg:grid-cols-2"
        >
            <aside
                class="hidden min-h-[650px] flex-col justify-between border-r border-border bg-primary/[.06] p-12 lg:flex"
            >
                <BrandMark />
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        Infraestrutura LIRIAS
                    </p>
                    <h1 class="mt-5 font-display text-4xl font-semibold">
                        Controle sua operação em uma experiência centralizada.
                    </h1>
                    <p class="mt-5 leading-7 text-muted-foreground">
                        Servidores, rede, backups e aplicações em uma visão
                        preparada para crescer.
                    </p>
                </div>
                <p class="text-xs text-muted-foreground">
                    São Paulo · Brasil · Operação nacional
                </p>
            </aside>
            <div class="p-6 sm:p-10 lg:p-12">
                <div class="lg:hidden"><BrandMark /></div>
                <p class="mt-10 text-sm text-primary-light lg:mt-0">
                    {{ isRegister ? 'Comece agora' : 'Bem-vindo de volta' }}
                </p>
                <h2 class="mt-2 text-3xl font-semibold">
                    {{ isRegister ? 'Crie sua conta' : 'Entre na sua conta' }}
                </h2>
                <p class="mt-3 text-sm text-muted-foreground">
                    {{
                        isRegister
                            ? 'Organize sua infraestrutura em poucos passos.'
                            : 'Acesse o painel para acompanhar seus ambientes.'
                    }}
                </p>
                <form class="mt-8 grid gap-5" @submit.prevent>
                    <label
                        v-if="isRegister"
                        class="grid gap-2 text-sm font-medium"
                        >Nome completo<span
                            class="flex items-center gap-3 rounded-lg border border-border bg-background/55 px-4"
                            ><UserRound
                                class="h-4 w-4 text-muted-foreground" /><input
                                class="h-12 flex-1 bg-transparent outline-none"
                                autocomplete="name" /></span></label
                    ><label class="grid gap-2 text-sm font-medium"
                        >E-mail<span
                            class="flex items-center gap-3 rounded-lg border border-border bg-background/55 px-4"
                            ><Mail
                                class="h-4 w-4 text-muted-foreground" /><input
                                type="email"
                                class="h-12 flex-1 bg-transparent outline-none"
                                autocomplete="email" /></span></label
                    ><label class="grid gap-2 text-sm font-medium"
                        >Senha<span
                            class="flex items-center gap-3 rounded-lg border border-border bg-background/55 px-4"
                            ><LockKeyhole
                                class="h-4 w-4 text-muted-foreground" /><input
                                :type="visible ? 'text' : 'password'"
                                class="h-12 min-w-0 flex-1 bg-transparent outline-none"
                                :autocomplete="
                                    isRegister
                                        ? 'new-password'
                                        : 'current-password'
                                " /><button
                                type="button"
                                class="grid h-10 w-10 place-items-center"
                                :aria-label="
                                    visible ? 'Ocultar senha' : 'Mostrar senha'
                                "
                                @click="visible = !visible"
                            >
                                <EyeOff v-if="visible" class="h-4 w-4" /><Eye
                                    v-else
                                    class="h-4 w-4"
                                /></button></span></label
                    ><button
                        class="min-h-12 rounded-lg bg-primary font-semibold text-primary-foreground"
                    >
                        {{ isRegister ? 'Criar conta' : 'Entrar' }}
                    </button>
                </form>
                <p class="mt-6 text-center text-sm text-muted-foreground">
                    {{
                        isRegister
                            ? 'Já possui conta?'
                            : 'Ainda não possui conta?'
                    }}
                    <AppLink
                        :href="isRegister ? '/login' : '/register'"
                        class="font-semibold text-primary-light"
                        >{{ isRegister ? 'Entrar' : 'Criar conta' }}</AppLink
                    >
                </p>
            </div>
        </div>
    </section>
</template>
