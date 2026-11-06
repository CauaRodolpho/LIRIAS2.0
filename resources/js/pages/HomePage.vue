<script setup lang="ts">
import {
    Activity,
    ArrowRight,
    Check,
    Cpu,
    Database,
    HardDrive,
    KeyRound,
    Network,
    Server,
    ShieldCheck,
    Workflow,
} from '@lucide/vue';
import AppLink from '@/components/shared/AppLink.vue';

const plans = [
    {
        name: 'Starter',
        price: '39,90',
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        disk: '80 GB NVMe',
    },
    {
        name: 'Pro',
        price: '79,90',
        cpu: '4 vCPU',
        ram: '8 GB RAM',
        disk: '160 GB NVMe',
        featured: true,
    },
    {
        name: 'Enterprise',
        price: '149,90',
        cpu: '8 vCPU',
        ram: '16 GB RAM',
        disk: '320 GB NVMe',
    },
];

const operational = [
    {
        code: 'KVM-01',
        title: 'Virtualização KVM',
        detail: 'Recursos isolados',
        icon: Cpu,
    },
    {
        code: 'NVME-02',
        title: 'Armazenamento NVMe',
        detail: 'Leitura e gravação rápidas',
        icon: HardDrive,
    },
    {
        code: 'ROOT-03',
        title: 'Acesso root',
        detail: 'Controle do ambiente',
        icon: KeyRound,
    },
    {
        code: 'NET-04',
        title: 'IPv4 e IPv6',
        detail: 'Conectividade preparada',
        icon: Network,
    },
];

const faq = [
    [
        'O que é uma VPS e por que preciso de uma?',
        'Uma VPS oferece recursos isolados e controle administrativo para hospedar aplicações, serviços, bancos e automações.',
    ],
    [
        'Posso instalar Linux ou Windows?',
        'Sim. A configuração pode ser preparada para distribuições Linux compatíveis ou Windows Server conforme o plano.',
    ],
    [
        'Como funcionam backups e snapshots?',
        'Snapshots preservam um ponto do servidor. Backups podem seguir uma rotina definida conforme a necessidade operacional.',
    ],
    [
        'Consigo aumentar os recursos depois?',
        'A arquitetura foi pensada para permitir evolução de CPU, memória e armazenamento conforme o projeto crescer.',
    ],
];
</script>

<template>
    <div class="home-page-flow overflow-hidden">
        <section
            class="relative isolate min-h-[760px] overflow-hidden border-b border-border/60"
        >
            <div class="hero-grid absolute inset-0 -z-20 opacity-60" />
            <div
                class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_65%_35%,hsl(var(--primary)/.18),transparent_36%)]"
            />
            <div
                class="mx-auto grid min-h-[690px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8"
            >
                <div>
                    <p
                        class="font-mono text-xs tracking-[0.18em] text-primary-light uppercase"
                    >
                        Infraestrutura nacional · São Paulo
                    </p>
                    <h1
                        class="mt-6 max-w-2xl font-display text-5xl leading-[.96] font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl"
                    >
                        Sua VPS.<br /><span class="text-primary-light"
                            >Sob seu controle.</span
                        >
                    </h1>
                    <p
                        class="mt-7 max-w-xl text-lg leading-8 text-muted-foreground"
                    >
                        Servidores virtuais no Brasil com recursos dedicados,
                        armazenamento NVMe e uma experiência clara para
                        acompanhar sua operação.
                    </p>
                    <div class="mt-9 flex flex-col gap-3 sm:flex-row">
                        <AppLink
                            href="/checkout"
                            class="inline-flex min-h-13 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-purple-950 px-6 font-semibold text-white shadow-[0_16px_40px_-18px_hsl(var(--primary))] transition hover:-translate-y-0.5"
                        >
                            Criar minha VPS <ArrowRight class="h-4 w-4" />
                        </AppLink>
                        <AppLink
                            href="/pricing"
                            class="inline-flex min-h-13 items-center justify-center rounded-lg border border-border bg-background/50 px-6 font-semibold hover:bg-card"
                        >
                            Ver planos
                        </AppLink>
                    </div>
                    <div
                        class="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
                    >
                        <span
                            v-for="item in [
                                'Datacenter em São Paulo',
                                'Virtualização KVM',
                                'Armazenamento NVMe',
                            ]"
                            :key="item"
                            class="inline-flex items-center gap-2"
                        >
                            <Check class="h-4 w-4 text-primary-light" />
                            {{ item }}
                        </span>
                    </div>
                </div>

                <div class="relative mx-auto w-full max-w-2xl">
                    <div
                        class="absolute -inset-10 -z-10 bg-primary/10 blur-3xl"
                    />
                    <article
                        class="overflow-hidden rounded-xl border border-primary/30 bg-card/85 shadow-2xl backdrop-blur"
                    >
                        <header
                            class="flex items-center justify-between border-b border-border px-5 py-4"
                        >
                            <div class="flex items-center gap-3">
                                <span
                                    class="grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/10"
                                    ><Server class="h-5 w-5 text-primary-light"
                                /></span>
                                <div>
                                    <p class="font-semibold">srv-lirias-01</p>
                                    <p class="text-xs text-muted-foreground">
                                        São Paulo · Debian 13
                                    </p>
                                </div>
                            </div>
                            <span
                                class="inline-flex items-center gap-2 text-xs text-emerald-400"
                                ><span
                                    class="h-2 w-2 rounded-full bg-emerald-400"
                                />
                                Online</span
                            >
                        </header>
                        <div class="grid border-b border-border sm:grid-cols-3">
                            <div
                                v-for="metric in [
                                    ['CPU', '18%', 38],
                                    ['Memória', '3.2 GB', 62],
                                    ['Disco', '24 GB', 28],
                                ]"
                                :key="metric[0]"
                                class="border-b border-border p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
                            >
                                <div
                                    class="flex justify-between text-xs text-muted-foreground"
                                >
                                    <span>{{ metric[0] }}</span
                                    ><strong class="text-foreground">{{
                                        metric[1]
                                    }}</strong>
                                </div>
                                <div
                                    class="mt-5 flex h-9 items-end gap-1"
                                    aria-hidden="true"
                                >
                                    <span
                                        v-for="n in 9"
                                        :key="n"
                                        class="flex-1 bg-primary/50"
                                        :style="{
                                            height: `${12 + ((n * Number(metric[2])) % 26)}px`,
                                        }"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="grid sm:grid-cols-[1.15fr_.85fr]">
                            <div
                                class="border-b border-border p-5 sm:border-r sm:border-b-0"
                            >
                                <p
                                    class="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase"
                                >
                                    Atividade recente
                                </p>
                                <ul class="mt-4 divide-y divide-border text-sm">
                                    <li
                                        v-for="activity in [
                                            'Snapshot automático concluído',
                                            'Verificação de rede concluída',
                                            'Servidor reiniciado',
                                        ]"
                                        :key="activity"
                                        class="flex items-center gap-3 py-3"
                                    >
                                        <span
                                            class="h-2 w-2 rounded-full bg-emerald-400"
                                        />
                                        {{ activity }}
                                    </li>
                                </ul>
                            </div>
                            <div class="p-5">
                                <p
                                    class="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase"
                                >
                                    Rede e acesso
                                </p>
                                <dl class="mt-4 space-y-3 text-sm">
                                    <div class="flex justify-between">
                                        <dt class="text-muted-foreground">
                                            Tráfego
                                        </dt>
                                        <dd>320 Mbps</dd>
                                    </div>
                                    <div class="flex justify-between">
                                        <dt class="text-muted-foreground">
                                            Uptime
                                        </dt>
                                        <dd>99,98%</dd>
                                    </div>
                                </dl>
                                <div
                                    class="mt-5 border border-border bg-background/45 p-3 font-mono text-xs"
                                >
                                    ssh root@203.0.113.24
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="border-b border-border/60">
            <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div
                    class="flex items-center justify-between text-[10px] tracking-[.18em] text-muted-foreground uppercase"
                >
                    <span>Base operacional</span
                    ><span class="text-emerald-400">● 4 camadas ativas</span>
                </div>
                <div
                    class="relative mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <span
                        class="absolute top-1.5 right-0 left-0 hidden h-px bg-border lg:block"
                    />
                    <article
                        v-for="item in operational"
                        :key="item.code"
                        class="relative"
                    >
                        <span
                            class="relative z-10 block h-3 w-3 rounded-full border border-primary bg-background ring-4 ring-background"
                        />
                        <p
                            class="mt-7 font-mono text-[10px] tracking-[.15em] text-primary-light"
                        >
                            {{ item.code }}
                        </p>
                        <h2 class="mt-2 flex items-center gap-2 font-semibold">
                            <component
                                :is="item.icon"
                                class="h-4 w-4 text-primary-light"
                            />{{ item.title }}
                        </h2>
                        <p class="mt-1 text-xs text-muted-foreground">
                            {{ item.detail }}
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section class="relative py-24">
            <div
                class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/.11),transparent_70%)]"
            />
            <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid items-end gap-8 lg:grid-cols-2">
                    <div>
                        <p
                            class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                        >
                            Planos LIRIAS
                        </p>
                        <h2
                            class="mt-4 max-w-xl font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
                        >
                            Recursos para começar. Liberdade para crescer.
                        </h2>
                    </div>
                    <p
                        class="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end"
                    >
                        Escolha uma configuração objetiva, com cobrança
                        transparente e possibilidade de evolução.
                    </p>
                </div>
                <div class="mt-12 grid gap-5 lg:grid-cols-3">
                    <article
                        v-for="plan in plans"
                        :key="plan.name"
                        :class="[
                            'relative rounded-xl border p-6',
                            plan.featured
                                ? 'border-primary bg-primary/[.07] shadow-[0_20px_60px_-35px_hsl(var(--primary))]'
                                : 'border-border bg-card/45',
                        ]"
                    >
                        <span
                            v-if="plan.featured"
                            class="absolute top-5 right-5 rounded-md bg-primary/15 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-primary-light uppercase"
                            >Mais escolhido</span
                        >
                        <h3 class="text-lg font-semibold">
                            VPS {{ plan.name }}
                        </h3>
                        <p class="mt-6">
                            <span class="font-display text-4xl font-semibold"
                                >R$ {{ plan.price }}</span
                            ><span class="text-sm text-muted-foreground"
                                >/mês</span
                            >
                        </p>
                        <ul
                            class="mt-7 space-y-3 text-sm text-muted-foreground"
                        >
                            <li
                                v-for="value in [
                                    plan.cpu,
                                    plan.ram,
                                    plan.disk,
                                    'Acesso root',
                                    'IPv4 e IPv6',
                                ]"
                                :key="value"
                                class="flex gap-2"
                            >
                                <Check class="h-4 w-4 text-emerald-400" />{{
                                    value
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
                            >Configurar {{ plan.name }}</AppLink
                        >
                    </article>
                </div>
            </div>
        </section>

        <section class="border-y border-border/60 py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="max-w-2xl">
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        Operação centralizada
                    </p>
                    <h2
                        class="mt-4 font-display text-4xl font-semibold tracking-tight"
                    >
                        Tudo para operar sua VPS em um só lugar.
                    </h2>
                </div>
                <div
                    class="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4"
                >
                    <article
                        v-for="feature in [
                            [
                                ShieldCheck,
                                'Proteção de rede',
                                'Regras claras para reduzir exposição.',
                            ],
                            [
                                Database,
                                'Backups e snapshots',
                                'Recuperação preparada para incidentes.',
                            ],
                            [
                                Workflow,
                                'Aplicações integradas',
                                'Ambientes prontos para sua operação.',
                            ],
                            [
                                Activity,
                                'Monitoramento',
                                'Uso e eventos em uma visão objetiva.',
                            ],
                        ]"
                        :key="feature[1]"
                        class="bg-background p-6"
                    >
                        <component
                            :is="feature[0]"
                            class="h-5 w-5 text-primary-light"
                        />
                        <h3 class="mt-7 font-semibold">{{ feature[1] }}</h3>
                        <p class="mt-2 text-sm leading-6 text-muted-foreground">
                            {{ feature[2] }}
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section class="py-24">
            <div class="mx-auto max-w-4xl px-4 sm:px-6">
                <div class="text-center">
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        Dúvidas frequentes
                    </p>
                    <h2 class="mt-4 font-display text-4xl font-semibold">
                        Antes de implantar sua VPS
                    </h2>
                </div>
                <div
                    class="mt-10 divide-y divide-border border-y border-border"
                >
                    <details
                        v-for="item in faq"
                        :key="item[0]"
                        class="group py-1"
                    >
                        <summary
                            class="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold"
                        >
                            <span>{{ item[0] }}</span
                            ><span
                                class="text-primary-light transition group-open:rotate-45"
                                >+</span
                            >
                        </summary>
                        <p
                            class="max-w-2xl pb-5 text-sm leading-6 text-muted-foreground"
                        >
                            {{ item[1] }}
                        </p>
                    </details>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.hero-grid {
    background-image:
        linear-gradient(hsl(var(--border) / 0.45) 1px, transparent 1px),
        linear-gradient(90deg, hsl(var(--border) / 0.45) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: linear-gradient(to bottom, black, transparent 94%);
    transform: perspective(700px) rotateX(52deg) scale(1.45) translateY(-8%);
    transform-origin: top;
}
</style>
