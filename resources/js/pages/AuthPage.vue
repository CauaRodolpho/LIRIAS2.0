<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    Info,
    LockKeyhole,
    Mail,
    Server,
    ServerCog,
    ShieldCheck,
    UserRound,
} from '@lucide/vue';
import { computed, reactive, ref, watch } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
import BrandMark from '@/components/shared/BrandMark.vue';
import ThemeToggle from '@/components/shared/ThemeToggle.vue';
const props = defineProps<{ mode: 'login' | 'register' }>();
const active = ref(props.mode);
watch(
    () => props.mode,
    (value) => (active.value = value),
);
const isLogin = computed(() => active.value === 'login');
const visible = ref(false);
const loading = ref(false);
const form = reactive({
    name: '',
    email: '',
    password: '',
    confirm: '',
    remember: false,
    terms: false,
});
const errors = reactive<Record<string, string>>({});
const strength = computed(() =>
    form.password.length === 0
        ? 0
        : form.password.length < 6
          ? 1
          : form.password.length < 10
            ? 2
            : 3,
);
function changeMode(mode: 'login' | 'register') {
    if (mode === active.value) return;
    active.value = mode;
    Object.keys(errors).forEach((key) => delete errors[key]);
    window.setTimeout(
        () =>
            router.visit(mode === 'login' ? '/login' : '/register', {
                preserveState: true,
            }),
        480,
    );
}
function validate() {
    Object.keys(errors).forEach((key) => delete errors[key]);
    if (!isLogin.value && !form.name) errors.name = 'Informe seu nome completo';
    if (!form.email) errors.email = 'Informe seu email';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
        errors.email = 'Email inválido';
    if (!form.password)
        errors.password = isLogin.value
            ? 'Informe sua senha'
            : 'Crie uma senha';
    else if (!isLogin.value && form.password.length < 8)
        errors.password = 'Mínimo de 8 caracteres';
    if (!isLogin.value && form.password !== form.confirm)
        errors.confirm = 'As senhas não coincidem';
    if (!isLogin.value && !form.terms)
        errors.terms = 'Você precisa aceitar os termos';
    return Object.keys(errors).length === 0;
}
async function submit() {
    if (!validate()) return;
    loading.value = true;
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    window.localStorage.setItem(
        'lirias-demo-session',
        JSON.stringify({
            email: form.email,
            ...(!isLogin.value ? { name: form.name } : {}),
            createdAt: new Date().toISOString(),
            demo: true,
        }),
    );
    router.visit('/dashboard');
}
</script>
<template>
    <main
        class="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6"
    >
        <div class="hero-grid absolute inset-0 opacity-45" />
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_28%_25%,hsl(var(--primary)/.15),transparent_35%)]"
        />
        <div class="absolute top-4 left-4 z-30 sm:top-6 sm:left-6">
            <AppLink
                href="/"
                class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                ><ArrowLeft class="h-4 w-4" />Voltar ao início</AppLink
            >
        </div>
        <div class="absolute top-4 right-4 z-30 sm:top-6 sm:right-6">
            <ThemeToggle />
        </div>
        <section
            class="relative z-10 min-h-[680px] w-full max-w-5xl overflow-hidden border border-border bg-card shadow-2xl"
            :aria-label="isLogin ? 'Acesso à conta' : 'Criação de conta'"
        >
            <div class="relative min-h-[680px] md:block">
                <div
                    class="auth-form absolute inset-y-0 left-0 z-10 flex w-full items-start overflow-y-auto bg-card px-5 py-8 transition-transform duration-500 sm:px-10 md:w-1/2 lg:px-14"
                    :class="
                        !isLogin ? 'md:translate-x-full' : 'md:items-center'
                    "
                >
                    <div class="mx-auto w-full max-w-md">
                        <AppLink
                            href="/"
                            class="mb-7 flex w-fit items-center gap-3"
                            ><BrandMark /><span
                                class="font-display text-lg font-semibold tracking-[.2em]"
                                >LIRIAS</span
                            ></AppLink
                        ><Transition name="auth-content" mode="out-in"
                            ><div :key="active">
                                <div class="mb-7">
                                    <span
                                        class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary-light"
                                        ><Server class="h-3.5 w-3.5" />Área do
                                        cliente</span
                                    >
                                    <h1
                                        class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
                                    >
                                        {{
                                            isLogin
                                                ? 'Acesse sua conta'
                                                : 'Crie sua conta'
                                        }}
                                    </h1>
                                    <p
                                        class="mt-2 text-sm leading-6 text-muted-foreground"
                                    >
                                        {{
                                            isLogin
                                                ? 'Entre para acompanhar e gerenciar sua infraestrutura.'
                                                : 'Cadastre seus dados para preparar seu primeiro ambiente.'
                                        }}
                                    </p>
                                </div>
                                <form
                                    class="flex flex-col gap-5"
                                    novalidate
                                    @submit.prevent="submit"
                                >
                                    <div
                                        class="flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/10 p-3 text-xs leading-5 text-muted-foreground"
                                    >
                                        <Info
                                            class="mt-0.5 h-4 w-4 shrink-0 text-primary-light"
                                        /><span>{{
                                            isLogin
                                                ? 'Ambiente demonstrativo: use qualquer email válido e senha para acessar o painel. Nenhuma conta real será criada.'
                                                : 'Cadastro demonstrativo: os dados ficam somente neste navegador e não criam uma conta real.'
                                        }}</span>
                                    </div>
                                    <label
                                        v-if="!isLogin"
                                        class="grid gap-2 text-sm font-medium"
                                        >Nome completo<span
                                            class="flex items-center gap-3 rounded-lg border bg-background/55 px-4"
                                            :class="
                                                errors.name
                                                    ? 'border-red-500'
                                                    : 'border-border'
                                            "
                                            ><UserRound
                                                class="h-4 w-4 text-muted-foreground" /><input
                                                v-model="form.name"
                                                class="h-12 flex-1 bg-transparent outline-none"
                                                placeholder="João da Silva"
                                                autocomplete="name" /></span
                                        ><span
                                            v-if="errors.name"
                                            class="text-xs text-red-400"
                                            >{{ errors.name }}</span
                                        ></label
                                    >
                                    <label
                                        class="grid gap-2 text-sm font-medium"
                                        >Email<span
                                            class="flex items-center gap-3 rounded-lg border bg-background/55 px-4"
                                            :class="
                                                errors.email
                                                    ? 'border-red-500'
                                                    : 'border-border'
                                            "
                                            ><Mail
                                                class="h-4 w-4 text-muted-foreground" /><input
                                                v-model="form.email"
                                                type="email"
                                                class="h-12 flex-1 bg-transparent outline-none"
                                                placeholder="voce@empresa.com"
                                                autocomplete="email" /></span
                                        ><span
                                            v-if="errors.email"
                                            class="text-xs text-red-400"
                                            >{{ errors.email }}</span
                                        ></label
                                    >
                                    <label
                                        class="grid gap-2 text-sm font-medium"
                                        >Senha<span
                                            class="flex items-center gap-3 rounded-lg border bg-background/55 px-4"
                                            :class="
                                                errors.password
                                                    ? 'border-red-500'
                                                    : 'border-border'
                                            "
                                            ><LockKeyhole
                                                class="h-4 w-4 text-muted-foreground" /><input
                                                v-model="form.password"
                                                :type="
                                                    visible
                                                        ? 'text'
                                                        : 'password'
                                                "
                                                class="h-12 min-w-0 flex-1 bg-transparent outline-none"
                                                :placeholder="
                                                    isLogin
                                                        ? '••••••••'
                                                        : 'Mínimo 8 caracteres'
                                                " /><button
                                                type="button"
                                                class="grid h-10 w-10 place-items-center"
                                                @click="visible = !visible"
                                            >
                                                <EyeOff
                                                    v-if="visible"
                                                    class="h-4 w-4"
                                                /><Eye
                                                    v-else
                                                    class="h-4 w-4"
                                                /></button></span
                                        ><span
                                            v-if="errors.password"
                                            class="text-xs text-red-400"
                                            >{{ errors.password }}</span
                                        ></label
                                    >
                                    <div v-if="!isLogin" class="-mt-3">
                                        <div class="grid grid-cols-3 gap-1.5">
                                            <span
                                                v-for="level in 3"
                                                :key="level"
                                                class="h-1 rounded-full"
                                                :class="
                                                    strength >= level
                                                        ? strength === 1
                                                            ? 'bg-red-500'
                                                            : strength === 2
                                                              ? 'bg-amber-400'
                                                              : 'bg-emerald-400'
                                                        : 'bg-border'
                                                "
                                            />
                                        </div>
                                        <p
                                            class="mt-1.5 text-xs text-muted-foreground"
                                        >
                                            {{
                                                strength === 0
                                                    ? 'Use pelo menos 8 caracteres.'
                                                    : strength === 1
                                                      ? 'Senha fraca'
                                                      : strength === 2
                                                        ? 'Senha média'
                                                        : 'Senha forte'
                                            }}
                                        </p>
                                    </div>
                                    <label
                                        v-if="!isLogin"
                                        class="grid gap-2 text-sm font-medium"
                                        >Confirmar senha<span
                                            class="flex items-center gap-3 rounded-lg border bg-background/55 px-4"
                                            :class="
                                                errors.confirm
                                                    ? 'border-red-500'
                                                    : 'border-border'
                                            "
                                            ><LockKeyhole
                                                class="h-4 w-4 text-muted-foreground" /><input
                                                v-model="form.confirm"
                                                type="password"
                                                class="h-12 flex-1 bg-transparent outline-none"
                                                placeholder="Repita a senha" /></span
                                        ><span
                                            v-if="errors.confirm"
                                            class="text-xs text-red-400"
                                            >{{ errors.confirm }}</span
                                        ></label
                                    >
                                    <div
                                        v-if="isLogin"
                                        class="flex items-center justify-between text-sm"
                                    >
                                        <label
                                            class="flex gap-2 text-muted-foreground"
                                            ><input
                                                v-model="form.remember"
                                                type="checkbox"
                                            />Lembrar de mim</label
                                        ><AppLink
                                            href="/forgot-password"
                                            class="text-primary-light"
                                            >Esqueceu a senha?</AppLink
                                        >
                                    </div>
                                    <div v-else>
                                        <label
                                            class="flex items-start gap-2.5 text-sm text-muted-foreground"
                                            ><input
                                                v-model="form.terms"
                                                type="checkbox"
                                                class="mt-0.5"
                                            /><span
                                                >Concordo com os
                                                <AppLink
                                                    href="/terms"
                                                    class="text-primary-light"
                                                    >Termos de Uso</AppLink
                                                >
                                                e a
                                                <AppLink
                                                    href="/privacy"
                                                    class="text-primary-light"
                                                    >Política de
                                                    Privacidade</AppLink
                                                ></span
                                            ></label
                                        >
                                        <p
                                            v-if="errors.terms"
                                            class="mt-1 text-xs text-red-400"
                                        >
                                            {{ errors.terms }}
                                        </p>
                                    </div>
                                    <button
                                        class="min-h-12 rounded-lg bg-primary font-semibold text-white disabled:opacity-60"
                                        :disabled="loading"
                                    >
                                        {{
                                            loading
                                                ? 'Aguarde…'
                                                : isLogin
                                                  ? 'Entrar'
                                                  : 'Criar conta'
                                        }}
                                    </button>
                                    <p
                                        class="text-center text-sm text-muted-foreground"
                                    >
                                        {{
                                            isLogin
                                                ? 'Não tem uma conta?'
                                                : 'Já tem uma conta?'
                                        }}
                                        <button
                                            type="button"
                                            class="font-medium text-primary-light"
                                            @click="
                                                changeMode(
                                                    isLogin
                                                        ? 'register'
                                                        : 'login',
                                                )
                                            "
                                        >
                                            {{
                                                isLogin
                                                    ? 'Criar conta'
                                                    : 'Fazer login'
                                            }}
                                        </button>
                                    </p>
                                </form>
                            </div></Transition
                        >
                    </div>
                </div>
                <aside
                    class="auth-visual absolute inset-y-0 left-0 z-20 hidden w-1/2 flex-col justify-center overflow-hidden bg-primary px-12 text-white transition-transform duration-500 md:flex"
                    :class="isLogin ? 'translate-x-full' : 'translate-x-0'"
                >
                    <div
                        class="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:48px_48px] opacity-25"
                    />
                    <Transition name="auth-content" mode="out-in"
                        ><div :key="active" class="relative z-10 max-w-sm">
                            <span
                                class="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10"
                                ><ServerCog
                                    v-if="isLogin"
                                    class="h-5 w-5" /><ShieldCheck
                                    v-else
                                    class="h-5 w-5"
                            /></span>
                            <h2 class="mt-6 text-3xl font-semibold">
                                {{
                                    isLogin
                                        ? 'Novo por aqui?'
                                        : 'Bem-vindo de volta'
                                }}
                            </h2>
                            <p class="mt-3 leading-6 opacity-80">
                                {{
                                    isLogin
                                        ? 'Crie sua conta e centralize servidores, segurança e monitoramento em um só painel.'
                                        : 'Se você já possui uma conta, entre para continuar gerenciando sua infraestrutura.'
                                }}
                            </p>
                            <button
                                class="mt-7 inline-flex h-11 items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 text-sm font-medium hover:bg-white/20"
                                @click="
                                    changeMode(isLogin ? 'register' : 'login')
                                "
                            >
                                {{ isLogin ? 'Criar conta' : 'Fazer login'
                                }}<ArrowRight
                                    class="h-4 w-4"
                                    :class="!isLogin ? 'rotate-180' : ''"
                                />
                            </button></div
                    ></Transition>
                </aside>
            </div>
        </section>
    </main>
</template>
<style scoped>
.auth-content-enter-active,
.auth-content-leave-active {
    transition: all 0.28s ease;
}
.auth-content-enter-from {
    opacity: 0;
    transform: translateX(24px);
}
.auth-content-leave-to {
    opacity: 0;
    transform: translateX(-22px);
}
@media (max-width: 767px) {
    .auth-form {
        position: relative;
        min-height: 680px;
    }
}
</style>
