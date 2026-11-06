<script setup lang="ts">
import {
    Activity,
    AlertTriangle,
    Bell,
    CheckCircle2,
    ChevronDown,
    Cloud,
    Info,
    MapPin,
    Search,
    Server,
} from '@lucide/vue';
import { computed, ref } from 'vue';
type Health = 'operational' | 'maintenance';
const query = ref('');
const result = ref<'idle' | 'affected' | 'unaffected'>('idle');
const region = ref('all');
const historyFilter = ref('all');
const openGroup = ref(0);
const channels = ref(['E-mail']);
const groups = [
    {
        title: 'Plataforma',
        description: 'Serviços usados para acessar e administrar a conta.',
        icon: Activity,
        items: [
            ['Painel LIRIAS', 'operational', '99,99%'],
            ['Autenticação', 'operational', '99,98%'],
            ['API pública', 'operational', '99,97%'],
            ['Faturamento', 'operational', '100%'],
            ['Central de suporte', 'operational', '99,99%'],
        ],
    },
    {
        title: 'Infraestrutura VPS',
        description: 'Compute, rede, armazenamento e ciclo de vida.',
        icon: Server,
        items: [
            ['Provisionamento', 'operational', '99,94%'],
            ['Inicialização e reinicialização', 'operational', '99,96%'],
            ['Rede pública', 'operational', '99,99%'],
            ['Rede privada', 'operational', '99,98%'],
            ['Armazenamento NVMe', 'operational', '99,99%'],
            ['Backups e snapshots', 'maintenance', '99,95%'],
        ],
    },
    {
        title: 'Serviços gerenciados',
        description: 'Recursos adicionais conectados às VPS.',
        icon: Cloud,
        items: [
            ['DNS', 'operational', '100%'],
            ['Firewall', 'operational', '99,99%'],
            ['Terminal web', 'operational', '99,97%'],
            ['Monitoramento', 'operational', '99,96%'],
            ['Aplicações e Docker', 'operational', '99,95%'],
        ],
    },
];
const regions = [
    {
        id: 'sp1',
        code: 'SP1',
        city: 'São Paulo',
        state: 'SP',
        status: 'operational',
        latency: '12 ms',
    },
    {
        id: 'cwb1',
        code: 'CWB1',
        city: 'Curitiba',
        state: 'PR',
        status: 'maintenance',
        latency: '21 ms',
    },
    {
        id: 'for1',
        code: 'FOR1',
        city: 'Fortaleza',
        state: 'CE',
        status: 'operational',
        latency: '48 ms',
    },
];
const visibleRegions = computed(() =>
    region.value === 'all'
        ? regions
        : regions.filter((item) => item.id === region.value),
);
const history = [
    [
        '28 out 2026',
        'Atraso na coleta de métricas',
        'SP1',
        '24 min',
        'resolved',
    ],
    [
        '21 out 2026',
        'Falhas intermitentes no terminal web',
        'Nacional',
        '41 min',
        'resolved',
    ],
    [
        '14 out 2026',
        'Atualização programada do DNS',
        'Nacional',
        '32 min',
        'maintenance',
    ],
    [
        '06 out 2026',
        'Provisionamento lento em CWB1',
        'CWB1',
        '18 min',
        'resolved',
    ],
];
const visibleHistory = computed(() =>
    historyFilter.value === 'all'
        ? history
        : history.filter((item) => item[4] === historyFilter.value),
);
function check() {
    const value = query.value.trim().toLowerCase();
    result.value =
        value.includes('cwb') || value.includes('backup')
            ? 'affected'
            : 'unaffected';
}
function toggle(channel: string) {
    channels.value = channels.value.includes(channel)
        ? channels.value.filter((item) => item !== channel)
        : [...channels.value, channel];
}
</script>
<template>
    <main class="min-h-screen pt-28 pb-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
            >
                <Info class="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                <p class="text-xs leading-5 text-muted-foreground">
                    <strong class="text-foreground"
                        >Status Center em modo demonstrativo.</strong
                    >
                    Estados, métricas, regiões e incidentes não representam
                    disponibilidade real.
                </p>
            </div>
            <section
                class="mt-5 overflow-hidden rounded-3xl border border-emerald-500/25 bg-card/50"
            >
                <div
                    class="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center"
                >
                    <div class="flex items-start gap-5">
                        <span
                            class="relative mt-1 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-400"
                            ><span
                                class="absolute inset-0 animate-ping rounded-2xl border border-emerald-400/25 motion-reduce:animate-none" /><CheckCircle2
                                class="relative h-7 w-7"
                        /></span>
                        <div>
                            <span
                                class="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400"
                                >● Estado nacional</span
                            >
                            <h1
                                class="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                            >
                                Todos os sistemas principais estão operacionais
                            </h1>
                            <p
                                class="mt-3 max-w-2xl leading-7 text-muted-foreground"
                            >
                                Existe uma manutenção controlada no serviço de
                                snapshots em Curitiba, sem impacto nas VPS em
                                execução.
                            </p>
                            <p
                                class="mt-4 font-mono text-[11px] tracking-[.15em] text-muted-foreground uppercase"
                            >
                                Última atualização demonstrativa: hoje, 15:02
                                BRT
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div
                            v-for="metric in [
                                ['99,98%', 'Uptime 90 dias'],
                                ['86 ms', 'Latência da API'],
                                ['99,94%', 'Provisionamentos'],
                                ['18 min', 'Recuperação média'],
                            ]"
                            :key="metric[1]"
                            class="rounded-xl border border-border bg-background/50 p-4"
                        >
                            <strong class="text-xl">{{ metric[0] }}</strong>
                            <p class="mt-1 text-xs text-muted-foreground">
                                {{ metric[1] }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section
                class="mt-6 rounded-2xl border border-border bg-card/35 p-5 sm:p-7"
            >
                <div
                    class="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center"
                >
                    <div>
                        <p
                            class="font-mono text-xs tracking-[.17em] text-primary-light uppercase"
                        >
                            Impacto personalizado
                        </p>
                        <h2 class="mt-3 text-2xl font-semibold">
                            Minha VPS foi afetada?
                        </h2>
                        <p class="mt-2 text-sm leading-6 text-muted-foreground">
                            Servidores contendo “CWB” ou “BACKUP” simulam
                            impacto parcial.
                        </p>
                    </div>
                    <div>
                        <div class="flex gap-3">
                            <label
                                class="flex min-h-11 flex-1 items-center gap-3 rounded-lg border border-border bg-background px-4"
                                ><Search
                                    class="h-4 w-4 text-muted-foreground" /><input
                                    v-model="query"
                                    class="w-full bg-transparent outline-none"
                                    placeholder="Ex.: srv-cwb-backup-01"
                                    @keyup.enter="check" /></label
                            ><button
                                class="rounded-lg bg-primary px-5 font-semibold text-white"
                                @click="check"
                            >
                                Verificar
                            </button>
                        </div>
                        <p
                            v-if="result !== 'idle'"
                            class="mt-3 rounded-lg border p-3 text-sm"
                            :class="
                                result === 'affected'
                                    ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                                    : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                            "
                        >
                            {{
                                result === 'affected'
                                    ? 'Impacto parcial simulado: acompanhe a manutenção CWB1.'
                                    : 'Nenhum impacto demonstrativo identificado para esta VPS.'
                            }}
                        </p>
                    </div>
                </div>
            </section>
            <section class="mt-20">
                <p
                    class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                >
                    Saúde dos serviços
                </p>
                <h2
                    class="mt-4 font-display text-3xl font-semibold sm:text-4xl"
                >
                    Infraestrutura organizada por contexto
                </h2>
                <div class="mt-10 space-y-4">
                    <article
                        v-for="(group, index) in groups"
                        :key="group.title"
                        class="overflow-hidden rounded-xl border border-border"
                    >
                        <button
                            class="flex w-full items-center gap-4 p-5 text-left"
                            @click="
                                openGroup = openGroup === index ? -1 : index
                            "
                        >
                            <span
                                class="grid h-10 w-10 place-items-center rounded-lg border border-border"
                                ><component
                                    :is="group.icon"
                                    class="h-5 w-5 text-primary-light" /></span
                            ><span class="flex-1"
                                ><strong>{{ group.title }}</strong
                                ><span
                                    class="mt-1 block text-sm text-muted-foreground"
                                    >{{ group.description }}</span
                                ></span
                            ><ChevronDown
                                class="h-5 w-5 transition"
                                :class="openGroup === index ? 'rotate-180' : ''"
                            />
                        </button>
                        <div
                            v-if="openGroup === index"
                            class="border-t border-border"
                        >
                            <div
                                v-for="item in group.items"
                                :key="String(item[0])"
                                class="grid gap-2 border-b border-border/70 px-5 py-4 last:border-0 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                            >
                                <span>{{ item[0] }}</span
                                ><span class="text-xs text-muted-foreground"
                                    >90 dias: {{ item[2] }}</span
                                ><span
                                    class="text-xs"
                                    :class="
                                        item[1] === 'operational'
                                            ? 'text-emerald-400'
                                            : 'text-blue-400'
                                    "
                                    >●
                                    {{
                                        item[1] === 'operational'
                                            ? 'Operacional'
                                            : 'Em manutenção'
                                    }}</span
                                >
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section class="mt-20">
                <div class="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p
                            class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                        >
                            Regiões brasileiras
                        </p>
                        <h2 class="mt-4 font-display text-3xl font-semibold">
                            Operação local e nacional
                        </h2>
                    </div>
                    <div class="flex gap-2">
                        <button
                            v-for="item in [
                                { id: 'all', code: 'Todas' },
                                ...regions,
                            ]"
                            :key="item.id"
                            class="rounded-lg border px-3 py-2 text-sm"
                            :class="
                                region === item.id
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border text-muted-foreground'
                            "
                            @click="region = item.id"
                        >
                            {{ item.code }}
                        </button>
                    </div>
                </div>
                <div class="mt-8 grid gap-4 md:grid-cols-3">
                    <article
                        v-for="item in visibleRegions"
                        :key="item.id"
                        class="rounded-xl border border-border bg-card/35 p-6"
                    >
                        <div class="flex justify-between">
                            <MapPin class="h-5 w-5 text-primary-light" /><span
                                class="text-xs"
                                :class="
                                    item.status === 'operational'
                                        ? 'text-emerald-400'
                                        : 'text-blue-400'
                                "
                                >●
                                {{
                                    item.status === 'operational'
                                        ? 'Operacional'
                                        : 'Manutenção'
                                }}</span
                            >
                        </div>
                        <h3 class="mt-5 text-xl font-semibold">
                            {{ item.city }}, {{ item.state }}
                        </h3>
                        <p class="mt-2 text-sm text-muted-foreground">
                            Latência demonstrativa {{ item.latency }}
                        </p>
                        <dl
                            class="mt-5 space-y-2 border-t border-border pt-4 text-sm"
                        >
                            <div
                                v-for="service in [
                                    'Compute',
                                    'Rede',
                                    'Armazenamento',
                                ]"
                                :key="service"
                                class="flex justify-between"
                            >
                                <dt class="text-muted-foreground">
                                    {{ service }}
                                </dt>
                                <dd>
                                    {{
                                        service === 'Armazenamento' &&
                                        item.id === 'cwb1'
                                            ? 'Manutenção'
                                            : 'Operacional'
                                    }}
                                </dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </section>
            <section class="mt-20 grid gap-6 lg:grid-cols-2">
                <article
                    class="rounded-xl border border-amber-400/25 bg-card/35 p-6"
                >
                    <div class="flex gap-3">
                        <AlertTriangle class="h-5 w-5 text-amber-400" />
                        <div>
                            <p class="text-xs text-amber-300 uppercase">
                                Incidente ativo
                            </p>
                            <h2 class="mt-2 text-xl font-semibold">
                                Atraso na criação de snapshots
                            </h2>
                            <p class="mt-2 text-sm text-muted-foreground">
                                CWB1 · Curitiba · Monitorando
                            </p>
                        </div>
                    </div>
                    <ol class="mt-6 space-y-4 border-l border-border pl-5">
                        <li
                            v-for="item in [
                                ['14:10', 'Investigando'],
                                ['14:24', 'Identificado'],
                                ['14:38', 'Mitigando'],
                                ['14:52', 'Monitorando'],
                            ]"
                            :key="item[0]"
                            class="text-sm"
                        >
                            <strong>{{ item[0] }} · {{ item[1] }}</strong>
                        </li>
                    </ol>
                </article>
                <article class="rounded-xl border border-border bg-card/35 p-6">
                    <p class="font-mono text-xs text-primary-light uppercase">
                        Manutenções programadas
                    </p>
                    <div class="mt-5 space-y-5">
                        <div
                            v-for="item in [
                                [
                                    'Hoje · 23:00–23:30',
                                    'Atualização do serviço de snapshots',
                                    'CWB1 · Curitiba',
                                ],
                                [
                                    '02 nov · 02:00–03:00',
                                    'Manutenção da rede privada',
                                    'SP1 · São Paulo',
                                ],
                            ]"
                            :key="item[1]"
                            class="border-t border-border pt-4"
                        >
                            <strong>{{ item[1] }}</strong>
                            <p class="mt-1 text-sm text-muted-foreground">
                                {{ item[0] }} · {{ item[2] }}
                            </p>
                        </div>
                    </div>
                </article>
            </section>
            <section class="mt-20">
                <div class="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p
                            class="font-mono text-xs text-primary-light uppercase"
                        >
                            Histórico
                        </p>
                        <h2 class="mt-3 text-3xl font-semibold">
                            Eventos recentes
                        </h2>
                    </div>
                    <div class="flex gap-2">
                        <button
                            v-for="item in [
                                ['all', 'Todos'],
                                ['resolved', 'Resolvidos'],
                                ['maintenance', 'Manutenções'],
                            ]"
                            :key="item[0]"
                            class="rounded-lg border px-3 py-2 text-sm"
                            :class="
                                historyFilter === item[0]
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border'
                            "
                            @click="historyFilter = item[0]"
                        >
                            {{ item[1] }}
                        </button>
                    </div>
                </div>
                <div
                    class="mt-6 divide-y divide-border rounded-xl border border-border"
                >
                    <div
                        v-for="item in visibleHistory"
                        :key="item[1]"
                        class="grid gap-2 p-5 sm:grid-cols-[130px_1fr_auto]"
                    >
                        <span class="text-sm text-muted-foreground">{{
                            item[0]
                        }}</span
                        ><strong
                            >{{ item[1] }}
                            <span
                                class="ml-2 text-xs font-normal text-muted-foreground"
                                >{{ item[2] }}</span
                            ></strong
                        ><span class="text-sm text-muted-foreground">{{
                            item[3]
                        }}</span>
                    </div>
                </div>
            </section>
            <section
                class="mt-20 rounded-2xl border border-border bg-card/35 p-6 sm:p-8"
            >
                <div class="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                    <div>
                        <Bell class="h-5 w-5 text-primary-light" />
                        <h2 class="mt-4 text-2xl font-semibold">
                            Receba atualizações
                        </h2>
                        <p class="mt-2 text-sm text-muted-foreground">
                            Escolha os canais para acompanhar incidentes e
                            manutenção.
                        </p>
                    </div>
                    <div class="grid gap-3 sm:grid-cols-3">
                        <button
                            v-for="channel in ['E-mail', 'Webhook', 'Painel']"
                            :key="channel"
                            class="rounded-xl border p-4 text-left"
                            :class="
                                channels.includes(channel)
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border'
                            "
                            @click="toggle(channel)"
                        >
                            <span class="text-sm font-medium">{{
                                channel
                            }}</span
                            ><span
                                class="mt-2 block text-xs text-muted-foreground"
                                >{{
                                    channels.includes(channel)
                                        ? 'Ativado'
                                        : 'Desativado'
                                }}</span
                            >
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>
