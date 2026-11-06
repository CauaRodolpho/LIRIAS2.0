<script setup lang="ts">
import {
    Activity,
    AlertTriangle,
    AppWindow,
    ArrowRight,
    Box,
    Check,
    ChevronRight,
    Clipboard,
    Cloud,
    Container,
    Cpu,
    Database,
    FileClock,
    Globe2,
    HardDrive,
    KeyRound,
    MemoryStick,
    Network,
    Plus,
    Power,
    RefreshCw,
    Search,
    Server,
    Settings,
    ShieldCheck,
    Terminal,
    Trash2,
    UserRound,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
const props = defineProps<{ screen: string; title?: string }>();
const query = ref('');
const status = ref('all');
const period = ref('24 horas');
const dockerTab = ref('projects');
const osQuery = ref('');
const selectedOs = ref('');
const copied = ref('');
const servers = [
    {
        id: 'srv-lirias-01',
        name: 'lirias-node-01',
        os: 'Debian 13',
        host: 'node-01.lirias.cloud',
        ip: '203.0.113.24',
        plan: 'VPS Pro',
        cpu: 4,
        ram: 8,
        location: 'São Paulo',
        status: 'running',
        valid: '06 dez 2026',
    },
    {
        id: 'srv-lirias-02',
        name: 'windows-prod-01',
        os: 'Windows Server 2025',
        host: 'win-prod.lirias.cloud',
        ip: '203.0.113.31',
        plan: 'VPS Enterprise',
        cpu: 8,
        ram: 16,
        location: 'Curitiba',
        status: 'rebooting',
        valid: '14 dez 2026',
    },
    {
        id: 'srv-lirias-03',
        name: 'automation-01',
        os: 'Ubuntu 24.04',
        host: 'automation.lirias.cloud',
        ip: '203.0.113.38',
        plan: 'VPS Starter',
        cpu: 2,
        ram: 4,
        location: 'Fortaleza',
        status: 'stopped',
        valid: '22 dez 2026',
    },
];
const filteredServers = computed(() =>
    servers.filter(
        (s) =>
            (status.value === 'all' || s.status === status.value) &&
            `${s.name} ${s.os} ${s.host} ${s.ip}`
                .toLowerCase()
                .includes(query.value.toLowerCase()),
    ),
);
const metrics = [
    [
        'CPU',
        '47%',
        '4 vCPU',
        Cpu,
        [18, 23, 28, 24, 31, 38, 42, 36, 47, 43, 39, 47],
    ],
    [
        'Memória',
        '5,2 GB',
        'de 8 GB',
        MemoryStick,
        [38, 42, 44, 47, 52, 58, 61, 64, 62, 65, 64, 65],
    ],
    [
        'Disco',
        '36 GB',
        'de 100 GB',
        HardDrive,
        [31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 36, 36],
    ],
    [
        'Rede',
        '18,6 MB/s',
        '320 Mbps',
        Network,
        [12, 24, 18, 38, 27, 46, 31, 54, 36, 62, 43, 52],
    ],
];
const actions = [
    ['backup_create', 'Sucesso', 'Hoje, 03:17'],
    ['network_check', 'Sucesso', 'Hoje, 02:42'],
    ['docker_compose_up', 'Sucesso', 'Ontem, 18:10'],
    ['ct_restart', 'Sucesso', '05 nov, 13:45'],
    ['system_update', 'Sucesso', '04 nov, 09:20'],
];
const projects = [
    ['site-lirias', '4 contêineres', 'Em atividade', 'há 8 min'],
    ['automation-stack', '3 contêineres', 'Em atividade', 'há 1h'],
    ['analytics', '2 contêineres', 'Parado', 'ontem'],
];
const apps = [
    ['n8n', 'Automação', 'Fluxos e integrações em ambiente próprio.'],
    ['Docker', 'Operações', 'Contêineres e projetos Compose.'],
    [
        'PostgreSQL',
        'Banco de dados',
        'Banco relacional gerenciado pela equipe.',
    ],
    ['Coolify', 'Operações', 'Painel autogerenciado de implantação.'],
];
const osList = [
    'Debian 13',
    'Ubuntu 24.04 LTS',
    'AlmaLinux 9',
    'Rocky Linux 9',
    'Windows Server 2025',
    'Windows Server 2022',
];
const filteredOs = computed(() =>
    osList.filter((os) =>
        os.toLowerCase().includes(osQuery.value.toLowerCase()),
    ),
);
const map: Record<
    string,
    { title: string; description: string; icon: unknown }
> = {
    dashboard: {
        title: 'Olá, Rodolfo',
        description:
            'Aqui está um resumo do ambiente LIRIAS e da sua infraestrutura demonstrativa.',
        icon: Activity,
    },
    'server-list': {
        title: 'Seus servidores',
        description:
            'Gerencie todas as instâncias, seus estados e o acesso ao ambiente operacional.',
        icon: Server,
    },
    'server-overview': {
        title: 'Visão geral',
        description:
            'Estado atual, consumo de recursos, acesso e atalhos desta instância.',
        icon: Server,
    },
    monitoring: {
        title: 'Uso do servidor',
        description:
            'Séries temporais demonstrativas de CPU, memória, disco e rede.',
        icon: Activity,
    },
    docker: {
        title: 'Gerenciador Docker',
        description:
            'Projetos Compose, credenciais privadas e catálogo de aplicações.',
        icon: Container,
    },
    'dashboard-applications': {
        title: 'Aplicações',
        description:
            'Serviços instalados e catálogo disponível para implantação.',
        icon: Box,
    },
    'server-activity': {
        title: 'Atividade recente',
        description: 'Histórico de ações administrativas e automáticas.',
        icon: RefreshCw,
    },
    'server-access': {
        title: 'Acesso ao servidor',
        description: 'Credenciais, chaves SSH e sessões administrativas.',
        icon: KeyRound,
    },
    'operating-system': {
        title: 'Sistema operacional',
        description:
            'Consulte a imagem atual e prepare uma reinstalação segura.',
        icon: HardDrive,
    },
    backups: {
        title: 'Snapshots e backups',
        description: 'Pontos de recuperação e política de retenção.',
        icon: Database,
    },
    security: {
        title: 'Segurança',
        description: 'Postura do ambiente, recomendações e controles ativos.',
        icon: ShieldCheck,
    },
    firewall: {
        title: 'Firewall',
        description: 'Regras de entrada e saída aplicadas à VPS.',
        icon: ShieldCheck,
    },
    malware: {
        title: 'Scanner de malware',
        description: 'Verificações recentes, arquivos e quarentena.',
        icon: ShieldCheck,
    },
    dns: {
        title: 'Gerenciador de DNS',
        description: 'Zonas e registros vinculados ao servidor.',
        icon: Network,
    },
    domains: {
        title: 'Domínios',
        description: 'Domínios conectados à conta e estado do DNS.',
        icon: Globe2,
    },
    'api-tokens': {
        title: 'Tokens de API',
        description: 'Credenciais para integração e automação.',
        icon: KeyRound,
    },
    network: {
        title: 'Rede',
        description: 'Endereços públicos, tráfego e conectividade.',
        icon: Network,
    },
    billing: {
        title: 'Cobrança',
        description: 'Plano, próxima cobrança e histórico financeiro.',
        icon: Database,
    },
    account: {
        title: 'Conta',
        description: 'Perfil, preferências e segurança da conta.',
        icon: Settings,
    },
    'server-settings': {
        title: 'Configurações',
        description: 'Identidade, manutenção e ações críticas do servidor.',
        icon: Settings,
    },
    'dashboard-support': {
        title: 'Suporte',
        description: 'Atendimentos associados à infraestrutura.',
        icon: Activity,
    },
};
const config = computed(
    () =>
        map[props.screen] || {
            title: props.title || 'Painel LIRIAS',
            description: 'Área operacional da infraestrutura.',
            icon: Server,
        },
);
const operational = computed(
    () =>
        ({
            'server-access': {
                stats: [
                    ['Usuário principal', 'root'],
                    ['Chaves SSH', '2 ativas'],
                    ['Último acesso', 'Hoje, 14:32'],
                ],
                rows: [
                    ['Chave notebook pessoal', 'SHA256:q8y…', 'Ativa'],
                    ['Chave CI/CD', 'SHA256:7ab…', 'Ativa'],
                    ['Senha root', 'Desativada', 'Protegido'],
                ],
            },
            backups: {
                stats: [
                    ['Backups automáticos', 'Semanalmente'],
                    ['Último backup', '06 nov, 01:49'],
                    ['Retenção', '2 cópias'],
                ],
                rows: [
                    ['06 nov 2026 · 01:49', '16,91 GB', 'Disponível'],
                    ['30 out 2026 · 03:27', '16,43 GB', 'Disponível'],
                ],
            },
            security: {
                stats: [
                    ['Pontuação', '86/100'],
                    ['Alertas ativos', '1'],
                    ['Controles', '7 ativos'],
                ],
                rows: [
                    ['Acesso por chave SSH', 'Recomendado', 'Ativo'],
                    ['Firewall de rede', '6 regras', 'Ativo'],
                    ['Atualizações automáticas', 'Pacotes críticos', 'Ativo'],
                    ['MFA administrativo', 'Conta principal', 'Revisar'],
                ],
            },
            firewall: {
                stats: [
                    ['Regras ativas', '6'],
                    ['Portas expostas', '3'],
                    ['Bloqueios hoje', '142'],
                ],
                rows: [
                    ['SSH', 'TCP 22', 'Seu IP'],
                    ['HTTP', 'TCP 80', 'Todos'],
                    ['HTTPS', 'TCP 443', 'Todos'],
                    ['PostgreSQL', 'TCP 5432', 'Rede privada'],
                ],
            },
            malware: {
                stats: [
                    ['Última verificação', 'Hoje, 02:00'],
                    ['Arquivos verificados', '184.220'],
                    ['Ameaças', '0'],
                ],
                rows: [
                    ['Verificação completa', '06 nov, 02:00', 'Limpo'],
                    ['Verificação rápida', '05 nov, 14:20', 'Limpo'],
                    ['Diretório /var/www', '04 nov, 08:10', 'Limpo'],
                ],
            },
            dns: {
                stats: [
                    ['Zonas', '2'],
                    ['Registros', '8'],
                    ['Propagação', 'Concluída'],
                ],
                rows: [
                    ['@', 'A', '203.0.113.24'],
                    ['www', 'CNAME', 'lirias.app'],
                    ['api', 'A', '203.0.113.24'],
                    ['@', 'MX', 'mail.lirias.app'],
                ],
            },
            domains: {
                stats: [
                    ['Domínios', '2'],
                    ['SSL ativo', '2'],
                    ['Expiram em', '284 dias'],
                ],
                rows: [
                    ['lirias.app', 'DNS conectado', 'Ativo'],
                    ['api.lirias.app', 'SSL válido', 'Ativo'],
                ],
            },
            'api-tokens': {
                stats: [
                    ['Tokens ativos', '2'],
                    ['Último uso', 'Hoje, 11:20'],
                    ['Escopos', '5'],
                ],
                rows: [
                    ['deploy-production', 'servers:read, deploy:write', 'Hoje'],
                    ['monitoring-readonly', 'metrics:read', 'Ontem'],
                ],
            },
            network: {
                stats: [
                    ['IPv4 público', '203.0.113.24'],
                    ['IPv6', 'Ativo'],
                    ['Tráfego', '0,8 / 3 TB'],
                ],
                rows: [
                    ['Interface pública', '203.0.113.24/24', 'Online'],
                    ['Rede privada', '10.0.4.12/24', 'Online'],
                    ['Gateway', '203.0.113.1', 'Disponível'],
                ],
            },
            billing: {
                stats: [
                    ['Plano atual', 'VPS Pro'],
                    ['Mensalidade', 'R$ 59,90'],
                    ['Próxima cobrança', '06 dez'],
                ],
                rows: [
                    ['Fatura #1042', '06 nov 2026', 'Pago'],
                    ['Fatura #1018', '06 out 2026', 'Pago'],
                    ['Fatura #994', '06 set 2026', 'Pago'],
                ],
            },
            account: {
                stats: [
                    ['Nome', 'Rodolfo'],
                    ['E-mail', 'contato@lirias.app'],
                    ['MFA', 'Ativo'],
                ],
                rows: [
                    ['Perfil público', 'Nome e e-mail', 'Atualizado'],
                    [
                        'Autenticação em duas etapas',
                        'Aplicativo autenticador',
                        'Ativo',
                    ],
                    ['Sessões conectadas', '2 dispositivos', 'Revisar'],
                ],
            },
            'server-settings': {
                stats: [
                    ['Hostname', 'node-01.lirias.cloud'],
                    ['Fuso horário', 'America/Sao_Paulo'],
                    ['Modo', 'Produção'],
                ],
                rows: [
                    ['Nome do servidor', 'lirias-node-01', 'Editar'],
                    ['Reinicialização automática', 'Desativada', 'Configurar'],
                    ['Proteção contra exclusão', 'Ativa', 'Protegido'],
                ],
            },
            'dashboard-support': {
                stats: [
                    ['Chamados abertos', '1'],
                    ['Tempo médio', '2h 18min'],
                    ['Resolvidos', '12'],
                ],
                rows: [
                    [
                        'LIR-2048',
                        'Falha intermitente ao conectar por SSH',
                        'Em análise',
                    ],
                    [
                        'LIR-2019',
                        'Dúvida sobre retenção de backups',
                        'Aguardando cliente',
                    ],
                    [
                        'LIR-1987',
                        'Configuração de domínio concluída',
                        'Resolvido',
                    ],
                ],
            },
        })[props.screen],
);
async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    copied.value = label;
    setTimeout(() => (copied.value = ''), 1300);
}
</script>
<template>
    <section>
        <div
            class="mb-5 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
        >
            <AlertTriangle class="mt-0.5 h-4 w-4 text-primary-light" />
            <p class="text-xs leading-5 text-muted-foreground">
                <strong class="text-foreground">Painel demonstrativo.</strong>
                As ações e métricas não alteram uma infraestrutura real.
            </p>
        </div>
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
            <div class="flex gap-2">
                <button
                    class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm hover:bg-card"
                >
                    <RefreshCw class="h-4 w-4" />Atualizar</button
                ><button
                    v-if="screen === 'server-list' || screen === 'docker'"
                    class="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white"
                >
                    <Plus class="h-4 w-4" />{{
                        screen === 'server-list' ? 'Criar VPS' : 'Novo projeto'
                    }}
                </button>
            </div>
        </div>
        <template v-if="screen === 'dashboard'"
            ><div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article
                    v-for="item in [
                        ['Servidores ativos', '1', '1 de 1 disponível', Server],
                        ['CPU atual', '47%', '4 vCPU', Cpu],
                        ['Memória', '65%', '5,2 de 8 GB', MemoryStick],
                        ['Armazenamento', '36%', '36 de 100 GB', HardDrive],
                    ]"
                    :key="String(item[0])"
                    class="rounded-xl border border-border bg-card/35 p-5"
                >
                    <component
                        :is="item[3]"
                        class="h-5 w-5 text-primary-light"
                    />
                    <p class="mt-5 text-xs text-muted-foreground">
                        {{ item[0] }}
                    </p>
                    <strong class="mt-1 block text-2xl">{{ item[1] }}</strong
                    ><span class="text-xs text-muted-foreground">{{
                        item[2]
                    }}</span>
                </article>
            </div>
            <div class="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <article class="rounded-xl border border-border p-6">
                    <div
                        class="flex flex-col justify-between gap-5 lg:flex-row lg:items-center"
                    >
                        <div class="flex gap-4">
                            <span
                                class="grid h-12 w-12 place-items-center rounded-xl bg-primary/10"
                                ><Server class="h-6 w-6 text-primary-light"
                            /></span>
                            <div>
                                <strong>lirias-node-01</strong>
                                <p class="mt-1 text-xs text-muted-foreground">
                                    Debian 13 · São Paulo · 203.0.113.24
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-8 text-center text-sm">
                            <span>4 vCPU</span><span>8 GB RAM</span
                            ><span>100 GB NVMe</span>
                        </div>
                        <AppLink
                            href="/dashboard/servers/srv-lirias-01"
                            class="rounded-lg border border-border px-4 py-2 text-sm"
                            >Gerenciar</AppLink
                        >
                    </div>
                </article>
                <article class="rounded-xl border border-border p-6">
                    <ShieldCheck class="h-5 w-5 text-emerald-400" /><strong
                        class="mt-4 block text-xl"
                        >Operacional</strong
                    >
                    <p class="text-sm text-muted-foreground">
                        Nenhum incidente demonstrativo.
                    </p>
                    <div class="mt-4 flex gap-1">
                        <span
                            v-for="n in 18"
                            :key="n"
                            class="h-6 flex-1 rounded-sm bg-emerald-400/70"
                        />
                    </div>
                </article>
            </div>
            <div class="mt-5 grid gap-5 xl:grid-cols-2">
                <ChartCard :metric="metrics[0]" /><ActionTable
                    :rows="actions.slice(0, 3)"
                /></div
        ></template>
        <template v-else-if="screen === 'server-list'"
            ><div
                class="mt-6 flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row"
            >
                <label
                    class="flex flex-1 items-center gap-3 rounded-lg border border-border px-4"
                    ><Search class="h-4 w-4" /><input
                        v-model="query"
                        class="h-11 w-full bg-transparent outline-none"
                        placeholder="Pesquisar por nome, IP, sistema ou hostname" /></label
                ><select
                    v-model="status"
                    class="rounded-lg border border-border bg-background px-3"
                >
                    <option value="all">Todos os status</option>
                    <option value="running">Em atividade</option>
                    <option value="rebooting">Reiniciando</option>
                    <option value="stopped">Desligado</option>
                </select>
            </div>
            <div class="mt-5 overflow-hidden rounded-xl border border-border">
                <div
                    v-for="server in filteredServers"
                    :key="server.id"
                    class="grid gap-4 border-b border-border p-5 last:border-0 lg:grid-cols-[1.4fr_.9fr_.8fr_.8fr_auto] lg:items-center"
                >
                    <div class="flex gap-3">
                        <span
                            class="grid h-11 w-11 place-items-center rounded-xl bg-primary/10"
                            ><Server class="h-5 w-5 text-primary-light"
                        /></span>
                        <div>
                            <strong>{{ server.name }}</strong>
                            <p class="text-xs text-muted-foreground">
                                {{ server.os }} · {{ server.host }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="font-mono text-sm">{{ server.ip }}</p>
                        <p class="text-xs text-muted-foreground">
                            IPv4 público
                        </p>
                    </div>
                    <div>
                        <strong class="text-sm">{{ server.plan }}</strong>
                        <p class="text-xs text-muted-foreground">
                            {{ server.cpu }} vCPU · {{ server.ram }} GB
                        </p>
                    </div>
                    <span
                        class="w-fit rounded-full px-3 py-1 text-xs"
                        :class="
                            server.status === 'running'
                                ? 'bg-emerald-400/10 text-emerald-400'
                                : server.status === 'rebooting'
                                  ? 'bg-amber-400/10 text-amber-400'
                                  : 'bg-card text-muted-foreground'
                        "
                        >●
                        {{
                            server.status === 'running'
                                ? 'Em atividade'
                                : server.status === 'rebooting'
                                  ? 'Reiniciando'
                                  : 'Desligado'
                        }}</span
                    ><AppLink
                        :href="`/dashboard/servers/${server.id}`"
                        class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm"
                        >Gerenciar <ChevronRight class="h-4 w-4"
                    /></AppLink>
                </div>
                <p v-if="!filteredServers.length" class="p-12 text-center">
                    Nenhum servidor encontrado.
                </p>
            </div></template
        >
        <template v-else-if="screen === 'server-overview'"
            ><div class="mt-6 rounded-xl border border-border p-6">
                <div
                    class="flex flex-col justify-between gap-5 xl:flex-row xl:items-center"
                >
                    <div class="flex gap-4">
                        <span
                            class="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10"
                            ><Cloud class="h-7 w-7 text-primary-light"
                        /></span>
                        <div>
                            <h2 class="text-lg font-semibold">
                                lirias-node-01
                                <span class="ml-2 text-xs text-emerald-400"
                                    >● Online</span
                                >
                            </h2>
                            <p class="mt-1 text-sm text-muted-foreground">
                                Debian 13 · KVM · São Paulo
                            </p>
                        </div>
                    </div>
                    <dl class="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                        <div
                            v-for="row in [
                                ['Plano', 'VPS Pro'],
                                ['Validade', '06 dez 2026'],
                                ['Uptime', '99,98%'],
                                ['IPv4', '203.0.113.24'],
                            ]"
                            :key="row[0]"
                        >
                            <dt class="text-xs text-muted-foreground">
                                {{ row[0] }}
                            </dt>
                            <dd class="mt-1 text-sm font-medium">
                                {{ row[1] }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    v-for="item in metrics"
                    :key="String(item[0])"
                    :metric="item"
                />
            </div>
            <div class="mt-5 grid gap-5 xl:grid-cols-2">
                <InfoCard
                    title="Acesso ao servidor"
                    :rows="[
                        ['Comando SSH', 'ssh root@203.0.113.24'],
                        ['Usuário', 'root'],
                        ['IPv6', '2001:db8::24'],
                        ['Chaves SSH', '2 cadastradas'],
                    ]"
                /><InfoCard
                    title="Detalhes do plano"
                    :rows="[
                        ['Plano atual', 'VPS Pro'],
                        ['Processamento', '4 vCPU AMD EPYC'],
                        ['Memória', '8 GB DDR5'],
                        ['Armazenamento', '100 GB NVMe'],
                    ]"
                />
            </div>
            <ActionTable class="mt-5" :rows="actions.slice(0, 4)"
        /></template>
        <template v-else-if="screen === 'monitoring'"
            ><div class="mt-6 flex gap-2">
                <button
                    v-for="item in ['24 horas', '7 dias', '30 dias']"
                    :key="item"
                    class="rounded-lg border px-4 py-2 text-sm"
                    :class="
                        period === item
                            ? 'border-primary bg-primary/10'
                            : 'border-border'
                    "
                    @click="period = item"
                >
                    {{ item }}
                </button>
            </div>
            <div class="mt-5 grid gap-5 xl:grid-cols-2">
                <ChartCard
                    v-for="metric in metrics"
                    :key="String(metric[0])"
                    :metric="metric"
                /></div
        ></template>
        <template v-else-if="screen === 'docker'"
            ><div class="mt-6 flex gap-2">
                <button
                    v-for="item in [
                        ['projects', 'Projetos'],
                        ['credentials', 'Credenciais'],
                        ['catalog', 'Catálogo'],
                    ]"
                    :key="item[0]"
                    class="rounded-lg border px-4 py-2 text-sm"
                    :class="
                        dockerTab === item[0]
                            ? 'border-primary bg-primary/10'
                            : 'border-border'
                    "
                    @click="dockerTab = item[0]"
                >
                    {{ item[1] }}
                </button>
            </div>
            <div
                v-if="dockerTab === 'projects'"
                class="mt-5 divide-y divide-border rounded-xl border border-border"
            >
                <div
                    v-for="project in projects"
                    :key="project[0]"
                    class="flex items-center gap-4 p-5"
                >
                    <span
                        class="grid h-10 w-10 place-items-center rounded-xl bg-primary/10"
                        ><Container class="h-5 w-5 text-primary-light"
                    /></span>
                    <div class="flex-1">
                        <strong>{{ project[0] }}</strong>
                        <p class="text-xs text-muted-foreground">
                            {{ project[1] }} · atualizado {{ project[3] }}
                        </p>
                    </div>
                    <span
                        class="text-xs"
                        :class="
                            project[2] === 'Em atividade'
                                ? 'text-emerald-400'
                                : 'text-muted-foreground'
                        "
                        >● {{ project[2] }}</span
                    ><button
                        class="rounded-lg border border-border px-3 py-2 text-sm"
                    >
                        Gerenciar
                    </button>
                </div>
            </div>
            <div
                v-else-if="dockerTab === 'credentials'"
                class="mt-5 rounded-xl border border-border py-16 text-center"
            >
                <KeyRound class="mx-auto h-7 w-7 text-primary-light" />
                <h2 class="mt-4 text-xl font-semibold">Registros privados</h2>
                <p class="mt-2 text-sm text-muted-foreground">
                    Adicione credenciais para baixar imagens privadas.
                </p>
                <button
                    class="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                    Adicionar credencial
                </button>
            </div>
            <div v-else class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <AppCard v-for="app in apps" :key="app[0]" :app="app" /></div
        ></template>
        <template v-else-if="screen === 'dashboard-applications'"
            ><div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <AppCard v-for="app in apps" :key="app[0]" :app="app" /></div
        ></template>
        <template v-else-if="screen === 'server-activity'"
            ><ActionTable class="mt-6" :rows="actions"
        /></template>
        <template v-else-if="screen === 'operating-system'"
            ><div class="mt-6 rounded-xl border border-border p-6">
                <div class="flex gap-4">
                    <span
                        class="grid h-12 w-12 place-items-center rounded-xl bg-primary/10"
                        ><Terminal class="h-6 w-6 text-primary-light"
                    /></span>
                    <div>
                        <strong>Debian 13</strong>
                        <p class="mt-1 text-sm text-muted-foreground">
                            Kernel 6.12 · x86_64 · instalação limpa
                        </p>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <label
                    class="flex items-center gap-3 rounded-lg border border-border px-4"
                    ><Search class="h-4 w-4" /><input
                        v-model="osQuery"
                        class="h-11 w-full bg-transparent outline-none"
                        placeholder="Pesquisar sistema"
                /></label>
                <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <button
                        v-for="os in filteredOs"
                        :key="os"
                        class="rounded-xl border p-5 text-left"
                        :class="
                            selectedOs === os
                                ? 'border-primary bg-primary/10'
                                : 'border-border'
                        "
                        @click="selectedOs = os"
                    >
                        <HardDrive class="h-5 w-5 text-primary-light" /><strong
                            class="mt-4 block"
                            >{{ os }}</strong
                        >
                        <p class="mt-2 text-xs text-muted-foreground">
                            Imagem oficial disponível
                        </p>
                    </button>
                </div>
            </div>
            <div
                class="mt-6 flex items-center justify-between rounded-xl border border-red-500/25 p-5"
            >
                <div>
                    <strong>Reinstalar sistema operacional</strong>
                    <p class="text-sm text-muted-foreground">
                        Esta ação apaga todos os dados da VPS.
                    </p>
                </div>
                <button
                    class="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400"
                >
                    Reinstalar
                </button>
            </div></template
        >
        <template v-else-if="operational"
            ><div class="mt-6 grid gap-4 sm:grid-cols-3">
                <article
                    v-for="item in operational.stats"
                    :key="item[0]"
                    class="rounded-xl border border-border bg-card/35 p-5"
                >
                    <p class="text-xs text-muted-foreground">{{ item[0] }}</p>
                    <strong class="mt-2 block text-xl">{{ item[1] }}</strong>
                </article>
            </div>
            <div class="mt-5 overflow-hidden rounded-xl border border-border">
                <div class="border-b border-border p-5">
                    <h2 class="font-semibold">{{ config.title }}</h2>
                </div>
                <div class="divide-y divide-border">
                    <div
                        v-for="row in operational.rows"
                        :key="row[0]"
                        class="grid gap-2 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-center"
                    >
                        <strong class="text-sm">{{ row[0] }}</strong
                        ><span class="text-sm text-muted-foreground">{{
                            row[1]
                        }}</span
                        ><span class="text-xs text-primary-light">{{
                            row[2]
                        }}</span>
                    </div>
                </div>
            </div>
            <div
                v-if="screen === 'server-settings' || screen === 'api-tokens'"
                class="mt-6 flex justify-end"
            >
                <button
                    class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                    <Plus class="h-4 w-4" />{{
                        screen === 'api-tokens'
                            ? 'Criar token'
                            : 'Salvar alterações'
                    }}
                </button>
            </div></template
        >
    </section>
</template>

<script lang="ts">
import { defineComponent, h, type PropType } from 'vue';
const MetricCard = defineComponent({
    props: { metric: { type: Array as PropType<any[]>, required: true } },
    setup: (props) => () =>
        h(
            'article',
            { class: 'rounded-xl border border-border bg-card/35 p-5' },
            [
                h(props.metric[3], { class: 'h-5 w-5 text-primary-light' }),
                h(
                    'p',
                    { class: 'mt-5 text-xs text-muted-foreground' },
                    props.metric[0],
                ),
                h('strong', { class: 'mt-1 block text-2xl' }, props.metric[1]),
                h(
                    'span',
                    { class: 'text-xs text-muted-foreground' },
                    props.metric[2],
                ),
            ],
        ),
});
const ChartCard = defineComponent({
    props: { metric: { type: Array as PropType<any[]>, required: true } },
    setup: (props) => () =>
        h(
            'article',
            { class: 'rounded-xl border border-border bg-card/25 p-6' },
            [
                h('div', { class: 'flex justify-between' }, [
                    h('h2', { class: 'font-semibold' }, props.metric[0]),
                    h('strong', props.metric[1]),
                ]),
                h(
                    'div',
                    { class: 'mt-6 flex h-32 items-end gap-1' },
                    (props.metric[4] as number[]).map((value, index) =>
                        h('span', {
                            key: index,
                            class: 'flex-1 rounded-t bg-primary/65',
                            style: { height: `${value}%` },
                        }),
                    ),
                ),
                h(
                    'div',
                    {
                        class: 'mt-3 flex justify-between text-[10px] text-muted-foreground',
                    },
                    [h('span', '-24h'), h('span', 'Agora')],
                ),
            ],
        ),
});
const ActionTable = defineComponent({
    props: { rows: { type: Array as PropType<string[][]>, required: true } },
    setup: (props) => () =>
        h(
            'article',
            { class: 'overflow-hidden rounded-xl border border-border' },
            [
                h('div', { class: 'border-b border-border p-5' }, [
                    h('h2', { class: 'font-semibold' }, 'Ações recentes'),
                ]),
                h(
                    'div',
                    { class: 'divide-y divide-border' },
                    props.rows.map((row) =>
                        h(
                            'div',
                            {
                                class: 'grid gap-2 p-4 sm:grid-cols-[1fr_auto_180px]',
                            },
                            [
                                h('code', { class: 'text-xs' }, row[0]),
                                h(
                                    'span',
                                    { class: 'text-xs text-emerald-400' },
                                    `● ${row[1]}`,
                                ),
                                h(
                                    'span',
                                    { class: 'text-xs text-muted-foreground' },
                                    row[2],
                                ),
                            ],
                        ),
                    ),
                ),
            ],
        ),
});
const InfoCard = defineComponent({
    props: {
        title: String,
        rows: { type: Array as PropType<string[][]>, required: true },
    },
    setup: (props) => () =>
        h('article', { class: 'rounded-xl border border-border p-6' }, [
            h('h2', { class: 'font-semibold' }, props.title),
            h(
                'dl',
                { class: 'mt-5 space-y-4 text-sm' },
                props.rows.map((row) =>
                    h('div', { class: 'flex justify-between gap-4' }, [
                        h('dt', { class: 'text-muted-foreground' }, row[0]),
                        h('dd', { class: 'font-medium' }, row[1]),
                    ]),
                ),
            ),
        ]),
});
const AppCard = defineComponent({
    props: { app: { type: Array as PropType<string[]>, required: true } },
    setup: (props) => () =>
        h(
            'article',
            { class: 'rounded-xl border border-border bg-card/35 p-5' },
            [
                h('div', { class: 'flex justify-between' }, [
                    h(Box, { class: 'h-5 w-5 text-primary-light' }),
                    h(
                        'span',
                        {
                            class: 'text-[10px] text-muted-foreground uppercase',
                        },
                        props.app[1],
                    ),
                ]),
                h('h2', { class: 'mt-5 font-semibold' }, props.app[0]),
                h(
                    'p',
                    { class: 'mt-2 text-sm text-muted-foreground' },
                    props.app[2],
                ),
                h(
                    'button',
                    { class: 'mt-5 text-sm font-semibold text-primary-light' },
                    'Gerenciar →',
                ),
            ],
        ),
});
export default {
    components: { MetricCard, ChartCard, ActionTable, InfoCard, AppCard },
};
</script>
