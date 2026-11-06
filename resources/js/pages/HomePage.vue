<script setup lang="ts">
import {
    Activity,
    ArrowRight,
    Check,
    Cpu,
    Database,
    Gamepad2,
    Globe,
    HardDrive,
    KeyRound,
    LayoutDashboard,
    LifeBuoy,
    Network,
    Server,
    Shield,
    ShieldCheck,
    ShoppingCart,
    Workflow,
    Zap,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';

const billing = ref<'monthly' | 'yearly'>('monthly');
const activeWorkload = ref(0);
const activeSecurity = ref(0);

const plans = [
    {
        name: 'VPS Starter',
        monthly: 29.9,
        yearly: 23.92,
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        disk: '50 GB NVMe',
    },
    {
        name: 'VPS Pro',
        monthly: 59.9,
        yearly: 47.92,
        cpu: '4 vCPU',
        ram: '8 GB RAM',
        disk: '100 GB NVMe',
        featured: true,
    },
    {
        name: 'VPS Enterprise',
        monthly: 119.9,
        yearly: 95.92,
        cpu: '8 vCPU',
        ram: '16 GB RAM',
        disk: '200 GB NVMe',
    },
    {
        name: 'VPS Titan',
        monthly: 239.9,
        yearly: 191.92,
        cpu: '16 vCPU',
        ram: '32 GB RAM',
        disk: '400 GB NVMe',
    },
];

const planPrice = (plan: (typeof plans)[number]) =>
    (billing.value === 'monthly' ? plan.monthly : plan.yearly)
        .toFixed(2)
        .replace('.', ',');

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
        'Uma VPS é um servidor virtual com CPU, RAM, disco e banda reservados. Você recebe isolamento, acesso root e liberdade para configurar a aplicação.',
    ],
    [
        'Qual a diferença entre VPS e hospedagem compartilhada?',
        'Na hospedagem compartilhada, vários sites disputam os mesmos recursos. Na VPS, sua configuração é isolada e oferece desempenho mais previsível.',
    ],
    [
        'Posso instalar Windows Server na minha VPS?',
        'Sim. Os planos Pro, Enterprise e Titan estão preparados para Windows Server, além das distribuições Linux compatíveis.',
    ],
    [
        'Recebo acesso root completo?',
        'Sim. Você pode administrar o ambiente por SSH no Linux ou acesso remoto no Windows e configurar os serviços necessários.',
    ],
    [
        'Como funciona a proteção Anti-DDoS?',
        'A infraestrutura mantém proteção de rede e mitigação automática para reduzir impactos de tráfego malicioso.',
    ],
    [
        'Posso aumentar os recursos da minha VPS depois?',
        'Sim. CPU, memória e armazenamento podem evoluir conforme a aplicação cresce.',
    ],
    [
        'Como funcionam os backups e snapshots?',
        'Snapshots registram o estado do servidor antes de mudanças importantes. Rotinas de backup podem ser configuradas conforme o plano.',
    ],
    [
        'Qual o SLA de uptime garantido?',
        'Os planos exibem o nível de disponibilidade previsto para cada configuração e as condições correspondentes no SLA.',
    ],
];

const workloads = [
    {
        title: 'Hospedagem de Sites',
        description:
            'Sites e aplicações web com liberdade para configurar sua stack.',
        techs: ['WordPress', 'Laravel', 'Next.js', 'Astro'],
        route: ['Aplicação', 'VPS LIRIAS', 'Visitantes'],
        icon: Globe,
    },
    {
        title: 'APIs & Microsserviços',
        description:
            'Backends, workers e integrações com as ferramentas da equipe.',
        techs: ['Node.js', 'NestJS', 'Django', 'FastAPI'],
        route: ['Clientes', 'VPS LIRIAS', 'Serviços'],
        icon: Zap,
    },
    {
        title: 'Bancos de Dados',
        description: 'Bancos relacionais, NoSQL e cache sob sua administração.',
        techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
        route: ['Aplicação', 'VPS LIRIAS', 'Dados'],
        icon: Database,
    },
    {
        title: 'Aplicações SaaS',
        description:
            'Aplicação, serviços e rotinas de deploy no mesmo ambiente.',
        techs: ['Docker', 'CI/CD', 'Workers'],
        route: ['Equipe', 'VPS LIRIAS', 'Clientes'],
        icon: LayoutDashboard,
    },
    {
        title: 'Servidores de Jogos',
        description:
            'Ambientes próprios para comunidades e servidores com mods.',
        techs: ['LinuxGSM', 'Docker', 'Backups'],
        route: ['Jogadores', 'VPS LIRIAS', 'Sessões'],
        icon: Gamepad2,
    },
    {
        title: 'E-commerce',
        description:
            'Plataforma, cache, banco e integrações da operação da loja.',
        techs: ['WooCommerce', 'MariaDB', 'Redis'],
        route: ['Loja', 'VPS LIRIAS', 'Pagamentos'],
        icon: ShoppingCart,
    },
];
const selectedWorkload = computed(() => workloads[activeWorkload.value]!);

const securityLayers = [
    {
        title: 'Acesso e credenciais',
        description:
            'Chaves SSH e credenciais organizam quem pode entrar no ambiente.',
        icon: KeyRound,
    },
    {
        title: 'Regras de rede',
        description:
            'O firewall define portas, protocolos e origens autorizadas.',
        icon: Shield,
    },
    {
        title: 'Visibilidade operacional',
        description:
            'Métricas e histórico ajudam a acompanhar o comportamento do servidor.',
        icon: Activity,
    },
    {
        title: 'Pontos de recuperação',
        description:
            'Snapshots registram o estado antes de atualizações importantes.',
        icon: HardDrive,
    },
];
const selectedSecurity = computed(() => securityLayers[activeSecurity.value]!);
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
                        Infraestrutura nacional disponível
                    </p>
                    <h1
                        class="mt-6 max-w-2xl font-display text-5xl leading-[.96] font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl"
                    >
                        Infraestrutura VPS<br /><span class="text-primary-light"
                            >sob seu controle.</span
                        >
                    </h1>
                    <p
                        class="mt-7 max-w-xl text-lg leading-8 text-muted-foreground"
                    >
                        Servidores virtuais no Brasil com recursos dedicados,
                        armazenamento NVMe e um painel direto para acompanhar
                        sua operação.
                    </p>
                    <div class="mt-9 flex flex-col gap-3 sm:flex-row">
                        <AppLink
                            href="/deploy"
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
                <div
                    class="mt-8 inline-flex border border-border bg-background-tertiary/80 p-1"
                    role="tablist"
                    aria-label="Ciclo de cobrança"
                >
                    <button
                        type="button"
                        :class="[
                            'px-5 py-2 text-sm font-medium',
                            billing === 'monthly'
                                ? 'bg-foreground text-background'
                                : 'text-muted-foreground',
                        ]"
                        @click="billing = 'monthly'"
                    >
                        Mensal
                    </button>
                    <button
                        type="button"
                        :class="[
                            'px-5 py-2 text-sm font-medium',
                            billing === 'yearly'
                                ? 'bg-foreground text-background'
                                : 'text-muted-foreground',
                        ]"
                        @click="billing = 'yearly'"
                    >
                        Anual <span class="text-xs text-emerald-400">-20%</span>
                    </button>
                </div>
                <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                            {{ plan.name }}
                        </h3>
                        <p class="mt-6">
                            <span class="font-display text-4xl font-semibold"
                                >R$ {{ planPrice(plan) }}</span
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
                            >Configurar plano</AppLink
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

        <section
            class="border-b border-border/60 py-24 sm:py-32"
            aria-labelledby="workloads-heading"
        >
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                    <div>
                        <p
                            class="font-mono text-xs tracking-[.2em] text-primary-light uppercase"
                        >
                            Cargas de trabalho
                        </p>
                        <h2
                            id="workloads-heading"
                            class="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl"
                        >
                            Uma infraestrutura, diferentes projetos.
                        </h2>
                    </div>
                    <p
                        class="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end"
                    >
                        Selecione um cenário para visualizar como a aplicação, a
                        VPS e os serviços se conectam.
                    </p>
                </div>
                <div
                    class="mt-12 grid overflow-hidden border-y border-border lg:grid-cols-[.72fr_1.28fr]"
                >
                    <div
                        class="border-b border-border lg:border-r lg:border-b-0"
                        role="tablist"
                        aria-label="Cargas de trabalho"
                    >
                        <button
                            v-for="(workload, index) in workloads"
                            :key="workload.title"
                            type="button"
                            role="tab"
                            :aria-selected="activeWorkload === index"
                            :class="[
                                'group flex w-full items-center gap-4 border-b border-border px-5 py-5 text-left transition last:border-b-0',
                                activeWorkload === index
                                    ? 'bg-primary/[.07]'
                                    : 'hover:bg-card/50',
                            ]"
                            @click="activeWorkload = index"
                        >
                            <component
                                :is="workload.icon"
                                :class="[
                                    'h-5 w-5',
                                    activeWorkload === index
                                        ? 'text-primary-light'
                                        : 'text-muted-foreground',
                                ]"
                            /><span class="font-semibold">{{
                                workload.title
                            }}</span
                            ><ArrowRight
                                class="ml-auto h-4 w-4 text-muted-foreground"
                            />
                        </button>
                    </div>
                    <Transition name="content" mode="out-in">
                        <article
                            :key="selectedWorkload.title"
                            class="flex min-h-[500px] flex-col p-6 sm:p-9 lg:p-12"
                        >
                            <div class="flex items-start justify-between gap-5">
                                <div>
                                    <p
                                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                                    >
                                        Arquitetura sugerida
                                    </p>
                                    <h3 class="mt-3 text-3xl font-semibold">
                                        {{ selectedWorkload.title }}
                                    </h3>
                                    <p
                                        class="mt-4 max-w-xl leading-7 text-muted-foreground"
                                    >
                                        {{ selectedWorkload.description }}
                                    </p>
                                </div>
                                <span
                                    class="hidden h-14 w-14 items-center justify-center border border-primary/25 bg-primary/[.06] sm:flex"
                                    ><component
                                        :is="selectedWorkload.icon"
                                        class="h-6 w-6 text-primary-light"
                                /></span>
                            </div>
                            <div class="mt-10 grid gap-3 sm:grid-cols-3">
                                <div
                                    v-for="(
                                        step, index
                                    ) in selectedWorkload.route"
                                    :key="step"
                                    :class="[
                                        'border p-4',
                                        index === 1
                                            ? 'border-primary/40 bg-primary/10'
                                            : 'border-border bg-background/70',
                                    ]"
                                >
                                    <p
                                        class="font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
                                    >
                                        Etapa {{ index + 1 }}
                                    </p>
                                    <p class="mt-4 font-semibold">{{ step }}</p>
                                </div>
                            </div>
                            <div class="mt-auto border-t border-border pt-6">
                                <p class="text-sm text-muted-foreground">
                                    Tecnologias compatíveis com este cenário:
                                </p>
                                <div class="mt-4 flex flex-wrap gap-2">
                                    <span
                                        v-for="tech in selectedWorkload.techs"
                                        :key="tech"
                                        class="border border-border bg-card/60 px-3 py-1.5 text-xs"
                                        >{{ tech }}</span
                                    >
                                </div>
                            </div>
                        </article>
                    </Transition>
                </div>
            </div>
        </section>

        <section class="py-24 sm:py-32" aria-labelledby="security-heading">
            <div
                class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-8"
            >
                <div>
                    <p
                        class="font-mono text-xs tracking-[.2em] text-primary-light uppercase"
                    >
                        Controles do ambiente
                    </p>
                    <h2
                        id="security-heading"
                        class="mt-4 font-display text-4xl font-semibold tracking-tight"
                    >
                        Segurança construída em camadas
                    </h2>
                    <p class="mt-5 text-lg leading-8 text-muted-foreground">
                        Cada controle atua em uma parte diferente da operação.
                        Selecione uma camada para entender seu papel.
                    </p>
                    <div class="mt-8 border-l border-primary/45 pl-5">
                        <p
                            class="text-xs tracking-wider text-muted-foreground uppercase"
                        >
                            Camada selecionada
                        </p>
                        <h3 class="mt-2 font-semibold">
                            {{ selectedSecurity.title }}
                        </h3>
                        <Transition name="content" mode="out-in"
                            ><p
                                :key="selectedSecurity.title"
                                class="mt-4 min-h-14 text-sm leading-6 text-muted-foreground"
                            >
                                {{ selectedSecurity.description }}
                            </p></Transition
                        >
                    </div>
                </div>
                <div>
                    <div class="space-y-1">
                        <button
                            v-for="(layer, index) in securityLayers"
                            :key="layer.title"
                            type="button"
                            :aria-pressed="activeSecurity === index"
                            :class="[
                                'flex w-full items-center gap-5 border-b px-0 py-5 text-left transition',
                                activeSecurity === index
                                    ? 'border-primary/55 bg-primary/[.035]'
                                    : 'border-border hover:bg-primary/[.025]',
                            ]"
                            @click="activeSecurity = index"
                        >
                            <span
                                :class="[
                                    'grid h-12 w-12 place-items-center border',
                                    activeSecurity === index
                                        ? 'border-primary/45 text-primary-light'
                                        : 'border-border text-muted-foreground',
                                ]"
                                ><component
                                    :is="layer.icon"
                                    class="h-5 w-5" /></span
                            ><span
                                ><span
                                    class="font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
                                    >Camada
                                    {{
                                        String(index + 1).padStart(2, '0')
                                    }}</span
                                ><strong class="mt-1 block">{{
                                    layer.title
                                }}</strong></span
                            ><ArrowRight
                                class="ml-auto h-4 w-4 text-muted-foreground"
                            />
                        </button>
                    </div>
                    <div
                        class="mt-5 flex items-center gap-4 border border-primary/35 bg-primary/10 p-5"
                    >
                        <Server class="h-5 w-5 text-primary-light" />
                        <div>
                            <p
                                class="text-[10px] tracking-wider text-primary-light uppercase"
                            >
                                Destino dos controles
                            </p>
                            <p class="mt-1 font-semibold">Seu ambiente VPS</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24">
            <div
                class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-8"
            >
                <div class="lg:sticky lg:top-28 lg:self-start">
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        Antes de implantar
                    </p>
                    <h2
                        class="mt-4 max-w-md font-display text-4xl font-semibold sm:text-5xl"
                    >
                        Respostas diretas para decisões técnicas.
                    </h2>
                    <p class="mt-5 max-w-md leading-7 text-muted-foreground">
                        VPS, acesso, sistemas, proteção e evolução de recursos
                        explicados com clareza.
                    </p>
                    <AppLink
                        href="/support"
                        class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-light"
                        ><LifeBuoy class="h-4 w-4" /> Abrir central de suporte
                        <ArrowRight class="h-4 w-4"
                    /></AppLink>
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

.content-enter-active,
.content-leave-active {
    transition:
        opacity 180ms ease,
        transform 180ms ease;
}

.content-enter-from {
    opacity: 0;
    transform: translateX(12px);
}

.content-leave-to {
    opacity: 0;
    transform: translateX(-8px);
}

@media (prefers-reduced-motion: reduce) {
    .content-enter-active,
    .content-leave-active {
        transition: none;
    }
}
</style>
