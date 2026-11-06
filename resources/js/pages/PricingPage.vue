<script setup lang="ts">
import {
    ArrowRight,
    Check,
    Cpu,
    Gauge,
    HardDrive,
    LifeBuoy,
    MemoryStick,
    X,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';

type Billing = 'monthly' | 'yearly';
type Os = 'linux' | 'windows';
type Level = 'low' | 'medium' | 'high' | 'max';
const billing = ref<Billing>('monthly');
const vcpu = ref(4),
    ram = ref(8),
    disk = ref(100),
    bandwidth = ref(3);
const os = ref<Os>('linux');
const distro = ref('Ubuntu 24.04 LTS');
const openFaq = ref<number | null>(null);

const plans = [
    {
        id: 'vps-starter',
        name: 'VPS Starter',
        monthly: 29.9,
        yearly: 23.92,
        vcpu: 2,
        ram: 4,
        disk: 50,
        bandwidth: 1,
        features: [
            ['2 vCPU AMD EPYC', 1],
            ['4 GB RAM DDR5', 1],
            ['50 GB NVMe SSD', 1],
            ['1 TB Transferência', 1],
            ['1 IPv4 Dedicado', 1],
            ['Proteção Anti-DDoS', 1],
            ['Snapshots', 1],
            ['Painel de Controle', 1],
            ['IPv6', 0],
            ['Windows Server', 0],
        ],
    },
    {
        id: 'vps-pro',
        name: 'VPS Pro',
        monthly: 59.9,
        yearly: 47.92,
        vcpu: 4,
        ram: 8,
        disk: 100,
        bandwidth: 3,
        popular: true,
        features: [
            ['4 vCPU AMD EPYC', 1],
            ['8 GB RAM DDR5', 1],
            ['100 GB NVMe SSD', 1],
            ['3 TB Transferência', 1],
            ['1 IPv4 Dedicado', 1],
            ['Proteção Anti-DDoS', 1],
            ['Snapshots', 1],
            ['Painel de Controle', 1],
            ['IPv6', 1],
            ['Windows Server', 1],
        ],
    },
    {
        id: 'vps-enterprise',
        name: 'VPS Enterprise',
        monthly: 119.9,
        yearly: 95.92,
        vcpu: 8,
        ram: 16,
        disk: 200,
        bandwidth: 5,
        features: [
            ['8 vCPU AMD EPYC', 1],
            ['16 GB RAM DDR5', 1],
            ['200 GB NVMe SSD', 1],
            ['5 TB Transferência', 1],
            ['IPv4 + IPv6', 1],
            ['Proteção Anti-DDoS', 1],
            ['Snapshots', 1],
            ['Painel de Controle', 1],
            ['IPv6', 1],
            ['Windows Server', 1],
        ],
    },
    {
        id: 'vps-titan',
        name: 'VPS Titan',
        monthly: 239.9,
        yearly: 191.92,
        vcpu: 16,
        ram: 32,
        disk: 400,
        bandwidth: 10,
        features: [
            ['16 vCPU AMD EPYC', 1],
            ['32 GB RAM DDR5', 1],
            ['400 GB NVMe SSD', 1],
            ['10 TB Transferência', 1],
            ['IPv4 + IPv6', 1],
            ['Proteção Anti-DDoS 10 Tbps', 1],
            ['Snapshots Ilimitados', 1],
            ['SLA 99.99%', 1],
            ['Suporte Prioritário', 1],
            ['Windows Server', 1],
        ],
    },
];
const distros: Record<Os, string[]> = {
    linux: ['Ubuntu 24.04 LTS', 'Debian 13', 'AlmaLinux 9', 'Rocky Linux 9'],
    windows: ['Windows Server 2022', 'Windows Server 2019'],
};
function chooseOs(next: Os) {
    os.value = next;
    distro.value = distros[next][0]!;
}
const price = computed(() => {
    const vcpuCost = vcpu.value * 6.9,
        ramCost = ram.value * 4.9,
        diskCost = disk.value * 0.15,
        bandwidthCost = Math.max(0, bandwidth.value - 2) * 3.9,
        windowsCost = os.value === 'windows' ? 49.9 : 0,
        baseFee = 9.9;
    return {
        vcpuCost,
        ramCost,
        diskCost,
        bandwidthCost,
        windowsCost,
        baseFee,
        total:
            vcpuCost +
            ramCost +
            diskCost +
            bandwidthCost +
            windowsCost +
            baseFee,
    };
});
const money = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const planPrice = (plan: (typeof plans)[number]) =>
    money(billing.value === 'monthly' ? plan.monthly : plan.yearly);
const checkoutHref = computed(
    () =>
        `/checkout?custom=1&vcpu=${vcpu.value}&ram=${ram.value}&disk=${disk.value}&bandwidth=${bandwidth.value}&os=${os.value}&distro=${encodeURIComponent(distro.value)}`,
);
const controls = computed(() => [
    {
        key: 'vcpu',
        label: 'vCPU',
        value: vcpu.value,
        min: 1,
        max: 32,
        step: 1,
        unit: vcpu.value === 1 ? 'core' : 'cores',
    },
    {
        key: 'ram',
        label: 'Memória RAM',
        value: ram.value,
        min: 1,
        max: 128,
        step: 1,
        unit: 'GB',
    },
    {
        key: 'disk',
        label: 'Armazenamento NVMe SSD',
        value: disk.value,
        min: 20,
        max: 2000,
        step: 10,
        unit: 'GB',
    },
    {
        key: 'bandwidth',
        label: 'Transferência mensal',
        value: bandwidth.value,
        min: 2,
        max: 50,
        step: 1,
        unit: 'TB',
    },
]);
function updateControl(key: string, event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    if (key === 'vcpu') vcpu.value = value;
    if (key === 'ram') ram.value = value;
    if (key === 'disk') disk.value = value;
    if (key === 'bandwidth') bandwidth.value = value;
}
const comparisons: Array<{
    feature: string;
    shared: Level;
    vps: Level;
    cloud: Level;
    dedicated: Level;
}> = [
    {
        feature: 'Performance',
        shared: 'low',
        vps: 'high',
        cloud: 'high',
        dedicated: 'max',
    },
    {
        feature: 'Escalabilidade',
        shared: 'low',
        vps: 'medium',
        cloud: 'max',
        dedicated: 'low',
    },
    {
        feature: 'Controle',
        shared: 'low',
        vps: 'high',
        cloud: 'high',
        dedicated: 'max',
    },
    {
        feature: 'Segurança',
        shared: 'low',
        vps: 'high',
        cloud: 'high',
        dedicated: 'max',
    },
    {
        feature: 'Recursos dedicados',
        shared: 'low',
        vps: 'medium',
        cloud: 'high',
        dedicated: 'max',
    },
];
const levelCount: Record<Level, number> = {
    low: 1,
    medium: 2,
    high: 3,
    max: 4,
};
const comparisonPlans = [
    { key: 'shared' as const, label: 'Hospedagem compartilhada' },
    { key: 'vps' as const, label: 'VPS', highlight: true },
    { key: 'cloud' as const, label: 'Cloud' },
    { key: 'dedicated' as const, label: 'Servidor dedicado' },
];
const faq = [
    [
        'O que é uma VPS e por que preciso de uma?',
        'Uma VPS é um servidor virtual com recursos dedicados: CPU, RAM, disco e banda garantidos para você. Ela oferece isolamento, acesso root e performance previsível.',
    ],
    [
        'Qual a diferença entre VPS e hospedagem compartilhada?',
        'Na hospedagem compartilhada, vários sites competem pelos mesmos recursos. Na VPS, seus recursos são isolados e você administra todo o ambiente.',
    ],
    [
        'Posso instalar Windows Server na minha VPS?',
        'Sim. Os planos Pro, Enterprise e Titan suportam Windows Server 2019 e 2022. O Starter é exclusivo para Linux.',
    ],
    [
        'Recebo acesso root completo?',
        'Sim. Você recebe acesso root via SSH no Linux ou RDP no Windows e pode administrar software, firewall e serviços.',
    ],
    [
        'Como funciona a proteção Anti-DDoS?',
        'A infraestrutura inclui detecção e mitigação automáticas para reduzir impactos de tráfego malicioso.',
    ],
    [
        'Posso aumentar os recursos da minha VPS depois?',
        'Sim. CPU, RAM e disco podem evoluir conforme sua aplicação cresce, preservando dados e configurações.',
    ],
    [
        'Como funcionam os backups e snapshots?',
        'Snapshots registram o estado completo do servidor. Backups automáticos podem ser adicionados e armazenados separadamente.',
    ],
    [
        'Qual o SLA de uptime garantido?',
        'O SLA chega a 99,99% conforme o plano contratado, com as condições descritas nos termos do serviço.',
    ],
];
</script>

<template>
    <div class="overflow-hidden">
        <section class="pt-28 sm:pt-36">
            <div class="mx-auto max-w-3xl px-4 text-center">
                <p
                    class="font-mono text-xs tracking-[.2em] text-primary-light uppercase"
                >
                    Preços LIRIAS
                </p>
                <h1
                    class="mt-5 font-display text-4xl font-semibold tracking-[-.045em] sm:text-6xl"
                >
                    Preços simples e transparentes
                </h1>
                <p class="mt-5 text-lg text-muted-foreground">
                    Sem taxas escondidas, sem contratos longos. Cancele quando
                    quiser.
                </p>
            </div>
        </section>
        <section class="py-20 sm:py-28" aria-labelledby="plans-title">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid items-end gap-6 lg:grid-cols-[1.15fr_.85fr]">
                    <div>
                        <p
                            class="font-mono text-xs tracking-[.2em] text-primary-light uppercase"
                        >
                            Planos LIRIAS
                        </p>
                        <h2
                            id="plans-title"
                            class="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-.04em] sm:text-5xl"
                        >
                            Recursos para começar. Liberdade para crescer.
                        </h2>
                    </div>
                    <p
                        class="max-w-xl leading-7 text-muted-foreground lg:justify-self-end lg:text-right"
                    >
                        Escolha uma configuração objetiva, com cobrança
                        transparente e possibilidade de evolução conforme o
                        projeto exigir.
                    </p>
                </div>
                <div
                    class="mt-8 inline-flex border border-border bg-card/40 p-1"
                    role="tablist"
                >
                    <button
                        v-for="option in ['monthly', 'yearly'] as Billing[]"
                        :key="option"
                        class="px-5 py-2 text-sm font-medium"
                        :class="
                            billing === option
                                ? 'bg-foreground text-background'
                                : 'text-muted-foreground'
                        "
                        @click="billing = option"
                    >
                        {{ option === 'monthly' ? 'Mensal' : 'Anual'
                        }}<span
                            v-if="option === 'yearly'"
                            class="ml-1 text-xs text-emerald-400"
                            >-20%</span
                        >
                    </button>
                </div>
                <div class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article
                        v-for="plan in plans"
                        :key="plan.id"
                        class="relative flex flex-col rounded-lg border p-7"
                        :class="
                            plan.popular
                                ? 'border-primary/60 bg-primary/[.055]'
                                : 'border-border bg-card/45'
                        "
                    >
                        <div class="flex min-h-7 justify-between gap-3">
                            <h3 class="text-lg font-semibold">
                                {{ plan.name }}
                            </h3>
                            <span
                                v-if="plan.popular"
                                class="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-primary-light uppercase"
                                >Recomendado</span
                            >
                        </div>
                        <p class="mt-4 flex items-baseline gap-1">
                            <strong class="font-display text-3xl">{{
                                planPrice(plan)
                            }}</strong
                            ><span class="text-sm text-muted-foreground"
                                >/mês</span
                            >
                        </p>
                        <span
                            v-if="billing === 'yearly'"
                            class="mt-1 text-xs text-emerald-400"
                            >Economize 20% no plano anual</span
                        >
                        <div
                            class="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6 text-xs text-muted-foreground"
                        >
                            <span class="flex gap-2"
                                ><Cpu class="h-4 w-4 text-primary-light" />{{
                                    plan.vcpu
                                }}
                                vCPU</span
                            ><span class="flex gap-2"
                                ><MemoryStick
                                    class="h-4 w-4 text-primary-light"
                                />{{ plan.ram }} GB RAM</span
                            ><span class="flex gap-2"
                                ><HardDrive
                                    class="h-4 w-4 text-emerald-400"
                                />{{ plan.disk }} GB</span
                            ><span class="flex gap-2"
                                ><Gauge class="h-4 w-4 text-primary-light" />{{
                                    plan.bandwidth
                                }}
                                TB</span
                            >
                        </div>
                        <ul class="mt-6 flex flex-1 flex-col gap-3">
                            <li
                                v-for="feature in plan.features"
                                :key="String(feature[0])"
                                class="flex gap-2.5 text-sm"
                                :class="
                                    feature[1]
                                        ? 'text-foreground'
                                        : 'text-muted-foreground'
                                "
                            >
                                <Check
                                    v-if="feature[1]"
                                    class="h-4 w-4 shrink-0 text-emerald-400"
                                /><X v-else class="h-4 w-4 shrink-0" />{{
                                    feature[0]
                                }}
                            </li>
                        </ul>
                        <AppLink
                            :href="`/checkout?plan=${plan.id}&os=linux&goal=general`"
                            class="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg border font-semibold"
                            :class="
                                plan.popular
                                    ? 'border-primary bg-gradient-to-r from-primary to-purple-950 text-white'
                                    : 'border-border hover:bg-card'
                            "
                            >Implantar {{ plan.name }}</AppLink
                        >
                    </article>
                </div>
                <div
                    class="mt-7 flex justify-between border-l border-primary/45 pl-4 text-sm"
                >
                    <p class="text-muted-foreground">
                        Precisa de uma combinação diferente?
                    </p>
                    <a
                        href="#custom-vps-heading"
                        class="font-medium text-primary-light"
                        >Monte sua própria VPS →</a
                    >
                </div>
            </div>
        </section>
        <section class="py-20 sm:py-28" aria-labelledby="custom-vps-heading">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <p
                        class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                    >
                        Sob medida
                    </p>
                    <h2
                        id="custom-vps-heading"
                        class="mt-3 font-display text-3xl font-semibold sm:text-4xl"
                    >
                        Nenhum plano encaixou? Monte o seu
                    </h2>
                    <p class="mt-4 text-lg text-muted-foreground">
                        Escolha exatamente os recursos. O preço se atualiza em
                        tempo real.
                    </p>
                </div>
                <div
                    class="mt-12 grid border border-border bg-card/35 lg:grid-cols-[1fr_360px]"
                >
                    <div class="space-y-8 p-6 sm:p-8">
                        <label
                            v-for="control in controls"
                            :key="control.key"
                            class="block"
                            ><span
                                class="flex justify-between text-sm font-medium"
                                ><span>{{ control.label }}</span
                                ><span class="font-mono text-primary-light"
                                    >{{ control.value }}
                                    {{ control.unit }}</span
                                ></span
                            ><input
                                :value="control.value"
                                type="range"
                                :min="control.min"
                                :max="control.max"
                                :step="control.step"
                                class="mt-4 w-full accent-purple-500"
                                @input="updateControl(control.key, $event)"
                            /><span
                                class="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground"
                                ><span>{{ control.min }}</span
                                ><span>{{ control.max }}</span></span
                            ></label
                        >
                        <div>
                            <span class="text-sm font-medium"
                                >Sistema operacional</span
                            >
                            <div class="mt-3 flex flex-wrap gap-2">
                                <div
                                    class="inline-flex rounded-lg border border-border p-1"
                                >
                                    <button
                                        v-for="option in [
                                            'linux',
                                            'windows',
                                        ] as Os[]"
                                        :key="option"
                                        class="rounded-md px-4 py-2 text-sm"
                                        :class="
                                            os === option
                                                ? 'bg-primary text-white'
                                                : 'text-muted-foreground'
                                        "
                                        @click="chooseOs(option)"
                                    >
                                        {{
                                            option === 'linux'
                                                ? 'Linux'
                                                : 'Windows'
                                        }}
                                    </button>
                                </div>
                                <select
                                    v-model="distro"
                                    class="rounded-lg border border-border bg-background px-3 text-sm"
                                >
                                    <option
                                        v-for="option in distros[os]"
                                        :key="option"
                                    >
                                        {{ option }}
                                    </option>
                                </select>
                            </div>
                            <p
                                v-if="os === 'windows'"
                                class="mt-2 font-mono text-xs text-muted-foreground"
                            >
                                + {{ money(49.9) }}/mês de licença
                            </p>
                        </div>
                    </div>
                    <aside
                        class="flex flex-col justify-between border-t border-border bg-background/35 p-6 sm:p-8 lg:border-t-0 lg:border-l"
                    >
                        <div>
                            <p
                                class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                            >
                                Sua configuração
                            </p>
                            <dl class="mt-5 space-y-3 font-mono text-sm">
                                <div
                                    v-for="row in [
                                        ['vCPU', price.vcpuCost],
                                        ['RAM', price.ramCost],
                                        ['NVMe SSD', price.diskCost],
                                        [
                                            'Transferência extra',
                                            price.bandwidthCost,
                                        ],
                                        ...(price.windowsCost
                                            ? [
                                                  [
                                                      'Licença Windows',
                                                      price.windowsCost,
                                                  ],
                                              ]
                                            : []),
                                        ['Taxa base', price.baseFee],
                                    ]"
                                    :key="String(row[0])"
                                    class="flex justify-between text-muted-foreground"
                                >
                                    <dt>{{ row[0] }}</dt>
                                    <dd class="text-foreground">
                                        {{ money(Number(row[1])) }}
                                    </dd>
                                </div>
                            </dl>
                            <p
                                class="mt-6 flex items-baseline gap-1 border-t border-border pt-5"
                            >
                                <strong class="font-display text-3xl">{{
                                    money(price.total)
                                }}</strong
                                ><span class="text-sm text-muted-foreground"
                                    >/mês</span
                                >
                            </p>
                        </div>
                        <AppLink
                            :href="checkoutHref"
                            class="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-purple-950 px-5 font-semibold text-white"
                            >Criar VPS Personalizada
                            <ArrowRight class="h-4 w-4"
                        /></AppLink>
                    </aside>
                </div>
            </div>
        </section>
        <section class="py-20 sm:py-28">
            <div class="mx-auto max-w-6xl px-4">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="font-display text-3xl font-semibold sm:text-4xl">
                        Qual solução é ideal para você?
                    </h2>
                    <p class="mt-4 text-lg text-muted-foreground">
                        Compare os tipos de hospedagem e escolha o que melhor
                        atende sua aplicação.
                    </p>
                </div>
                <div
                    class="mt-12 overflow-x-auto rounded-lg border border-border"
                >
                    <table class="w-full min-w-[720px] text-sm">
                        <thead>
                            <tr class="border-b border-border bg-card/60">
                                <th class="p-4 text-left">Recurso</th>
                                <th
                                    v-for="plan in comparisonPlans"
                                    :key="plan.key"
                                    class="p-4 text-center"
                                    :class="
                                        plan.highlight
                                            ? 'bg-primary/10 text-primary-light'
                                            : 'text-muted-foreground'
                                    "
                                >
                                    {{ plan.label }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="row in comparisons"
                                :key="row.feature"
                                class="border-b border-border last:border-0"
                            >
                                <th class="p-4 text-left">{{ row.feature }}</th>
                                <td
                                    v-for="plan in comparisonPlans"
                                    :key="plan.key"
                                    class="p-4"
                                    :class="
                                        plan.highlight ? 'bg-primary/[.05]' : ''
                                    "
                                >
                                    <div class="flex justify-center gap-1">
                                        <span
                                            v-for="dot in 4"
                                            :key="dot"
                                            class="h-1.5 w-1.5 rounded-full"
                                            :class="
                                                dot <= levelCount[row[plan.key]]
                                                    ? 'bg-primary-light'
                                                    : 'bg-border'
                                            "
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="py-20 sm:py-28">
            <div
                class="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"
            >
                <div>
                    <p
                        class="font-mono text-xs tracking-[.2em] text-primary-light uppercase"
                    >
                        Antes de implantar
                    </p>
                    <h2
                        class="mt-4 font-display text-3xl font-semibold sm:text-5xl"
                    >
                        Respostas diretas para decisões técnicas.
                    </h2>
                    <p class="mt-5 leading-7 text-muted-foreground">
                        VPS, acesso, sistemas, proteção e evolução de recursos
                        explicados sem esconder limitações.
                    </p>
                    <div class="mt-8 border-l border-primary/40 pl-4">
                        <p class="flex gap-2 text-sm font-medium">
                            <LifeBuoy class="h-4 w-4 text-primary-light" />Ainda
                            precisa de ajuda?
                        </p>
                        <AppLink
                            href="/support"
                            class="mt-2 inline-flex gap-2 text-sm text-primary-light"
                            >Abrir central de suporte
                            <ArrowRight class="h-4 w-4"
                        /></AppLink>
                    </div>
                </div>
                <div class="border-t border-border">
                    <article
                        v-for="(item, index) in faq"
                        :key="item[0]"
                        class="border-b border-border"
                    >
                        <button
                            class="flex w-full items-center gap-5 py-6 text-left"
                            @click="openFaq = openFaq === index ? null : index"
                        >
                            <span
                                class="font-mono text-xs text-primary-light"
                                >{{ String(index + 1).padStart(2, '0') }}</span
                            ><span class="flex-1 font-semibold">{{
                                item[0]
                            }}</span
                            ><span>{{ openFaq === index ? '−' : '+' }}</span>
                        </button>
                        <p
                            v-if="openFaq === index"
                            class="pb-6 pl-10 leading-7 text-muted-foreground"
                        >
                            {{ item[1] }}
                        </p>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>
