<script setup lang="ts">
import {
    Activity,
    Box,
    Check,
    Cpu,
    Database,
    HardDrive,
    KeyRound,
    Network,
    RefreshCw,
    Server,
    Settings,
    ShieldCheck,
} from '@lucide/vue';
import { computed } from 'vue';

const props = defineProps<{ screen: string; title?: string }>();
const config = computed(() => {
    const map: Record<
        string,
        { title: string; description: string; icon: unknown }
    > = {
        dashboard: {
            title: 'Visão geral',
            description: 'Acompanhe seus servidores e a saúde da operação.',
            icon: Activity,
        },
        'server-list': {
            title: 'Servidores',
            description: 'Ambientes disponíveis na sua infraestrutura.',
            icon: Server,
        },
        'server-overview': {
            title: 'srv-lirias-01',
            description: 'Recursos, rede e atividade do servidor.',
            icon: Server,
        },
        monitoring: {
            title: 'Monitoramento',
            description: 'Uso de CPU, memória, disco e rede.',
            icon: Activity,
        },
        docker: {
            title: 'Docker',
            description: 'Contêineres, imagens, volumes e redes.',
            icon: Box,
        },
        'dashboard-applications': {
            title: 'Aplicações',
            description: 'Serviços instalados e catálogo disponível.',
            icon: Box,
        },
        'server-activity': {
            title: 'Atividade recente',
            description: 'Histórico operacional do ambiente.',
            icon: RefreshCw,
        },
        'server-access': {
            title: 'Acesso',
            description: 'Credenciais, SSH e chaves autorizadas.',
            icon: KeyRound,
        },
        'operating-system': {
            title: 'Sistema operacional',
            description: 'Imagem instalada e opções compatíveis.',
            icon: HardDrive,
        },
        backups: {
            title: 'Snapshots e backups',
            description: 'Pontos de recuperação do servidor.',
            icon: Database,
        },
        security: {
            title: 'Segurança',
            description: 'Camadas de proteção e recomendações.',
            icon: ShieldCheck,
        },
        firewall: {
            title: 'Firewall',
            description: 'Regras de entrada e saída da rede.',
            icon: ShieldCheck,
        },
        malware: {
            title: 'Scanner de malware',
            description: 'Verificações e arquivos em quarentena.',
            icon: ShieldCheck,
        },
        dns: {
            title: 'Gerenciador de DNS',
            description: 'Domínios e registros vinculados ao servidor.',
            icon: Network,
        },
        domains: {
            title: 'Domínios',
            description: 'Zonas e apontamentos gerenciados.',
            icon: Network,
        },
        'api-tokens': {
            title: 'Tokens de API',
            description: 'Credenciais de integração e automação.',
            icon: KeyRound,
        },
        network: {
            title: 'Rede',
            description: 'Endereços, tráfego e conectividade.',
            icon: Network,
        },
        billing: {
            title: 'Cobrança',
            description: 'Plano, consumo e histórico financeiro.',
            icon: Database,
        },
        account: {
            title: 'Conta',
            description: 'Perfil, preferências e segurança.',
            icon: Settings,
        },
        'server-settings': {
            title: 'Configurações',
            description: 'Ajustes e ações do servidor.',
            icon: Settings,
        },
        'dashboard-support': {
            title: 'Suporte',
            description: 'Atendimentos relacionados à infraestrutura.',
            icon: Activity,
        },
    };
    return (
        map[props.screen] ?? {
            title: props.title ?? 'Painel LIRIAS',
            description: 'Área operacional da infraestrutura.',
            icon: Server,
        }
    );
});
const metrics = [
    { label: 'CPU', value: '9,2%', icon: Cpu, level: 34 },
    { label: 'Memória', value: '3,6 GB', icon: Database, level: 58 },
    { label: 'Disco', value: '32 GB', icon: HardDrive, level: 42 },
    { label: 'Rede', value: '320 Mbps', icon: Network, level: 66 },
];
</script>

<template>
    <section>
        <div
            class="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between"
        >
            <div>
                <p
                    class="font-mono text-[10px] tracking-[.18em] text-primary-light uppercase"
                >
                    Painel / {{ screen }}
                </p>
                <h1 class="mt-3 text-3xl font-semibold">{{ config.title }}</h1>
                <p class="mt-2 text-sm text-muted-foreground">
                    {{ config.description }}
                </p>
            </div>
            <button
                class="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-card"
            >
                <RefreshCw class="h-4 w-4" /> Atualizar
            </button>
        </div>
        <div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article
                v-for="metric in metrics"
                :key="metric.label"
                class="rounded-xl border border-border bg-card/35 p-5"
            >
                <div class="flex justify-between">
                    <span
                        class="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/[.06]"
                        ><component
                            :is="metric.icon"
                            class="h-4 w-4 text-primary-light" /></span
                    ><span class="text-xs text-emerald-400">Estável</span>
                </div>
                <p class="mt-6 text-xs text-muted-foreground">
                    {{ metric.label }}
                </p>
                <p class="mt-1 font-display text-2xl font-semibold">
                    {{ metric.value }}
                </p>
                <div class="mt-4 h-1 overflow-hidden rounded-full bg-border">
                    <span
                        class="block h-full bg-primary"
                        :style="{ width: `${metric.level}%` }"
                    />
                </div>
            </article>
        </div>
        <div class="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <article
                class="rounded-xl border border-border bg-card/25 p-5 sm:p-6"
            >
                <div class="flex items-center justify-between">
                    <h2 class="font-semibold">Atividade operacional</h2>
                    <span class="text-xs text-muted-foreground">Hoje</span>
                </div>
                <div class="mt-5 divide-y divide-border">
                    <div
                        v-for="event in [
                            ['Snapshot automático concluído', '03:17'],
                            ['Verificação de rede concluída', '02:42'],
                            ['Aplicação atualizada', 'Ontem'],
                            ['Servidor reiniciado', '2 dias'],
                        ]"
                        :key="event[0]"
                        class="flex items-center gap-3 py-4 text-sm"
                    >
                        <span
                            class="h-2 w-2 rounded-full bg-emerald-400"
                        /><span>{{ event[0] }}</span
                        ><span class="ml-auto text-xs text-muted-foreground">{{
                            event[1]
                        }}</span>
                    </div>
                </div>
            </article>
            <article
                class="rounded-xl border border-border bg-card/25 p-5 sm:p-6"
            >
                <h2 class="font-semibold">Estado do ambiente</h2>
                <div
                    class="mt-5 rounded-lg border border-border bg-background/45 p-4"
                >
                    <div class="flex items-center gap-3">
                        <span
                            class="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10"
                            ><Check class="h-5 w-5 text-emerald-400"
                        /></span>
                        <div>
                            <p class="font-medium">Operacional</p>
                            <p class="text-xs text-muted-foreground">
                                Todos os serviços respondendo
                            </p>
                        </div>
                    </div>
                </div>
                <dl class="mt-5 space-y-4 text-sm">
                    <div class="flex justify-between">
                        <dt class="text-muted-foreground">Região</dt>
                        <dd>São Paulo</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-muted-foreground">Sistema</dt>
                        <dd>Debian 13</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-muted-foreground">Uptime</dt>
                        <dd>99,98%</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-muted-foreground">IPv4</dt>
                        <dd class="font-mono text-xs">203.0.113.24</dd>
                    </div>
                </dl>
            </article>
        </div>
        <div class="mt-6 overflow-hidden rounded-xl border border-border">
            <div class="border-b border-border p-5">
                <h2 class="font-semibold">Recursos e ações</h2>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3">
                <button
                    v-for="action in [
                        ['Console', Server],
                        ['Rede e DNS', Network],
                        ['Segurança', ShieldCheck],
                        ['Backups', Database],
                        ['Aplicações', Box],
                        ['Configurações', Settings],
                    ]"
                    :key="String(action[0])"
                    class="flex min-h-20 items-center gap-3 border-b border-border px-5 text-left last:border-b-0 hover:bg-card/50 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
                >
                    <component
                        :is="action[1]"
                        class="h-4 w-4 text-primary-light"
                    /><span class="text-sm font-medium">{{ action[0] }}</span
                    ><span class="ml-auto text-muted-foreground">→</span>
                </button>
            </div>
        </div>
    </section>
</template>
