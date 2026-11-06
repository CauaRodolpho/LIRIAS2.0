<script setup lang="ts">
import {
    Activity,
    AppWindow,
    ArrowRight,
    Boxes,
    Check,
    CloudCog,
    CodeXml,
    Container,
    Database,
    GitBranch,
    HardDrive,
    KeyRound,
    Network,
    RefreshCcw,
    Server,
    ShieldCheck,
    Terminal,
    Undo2,
    Workflow,
} from '@lucide/vue';
import { computed, ref, watch } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
const props = defineProps<{ system: 'linux' | 'windows' }>();
const selected = ref(0);
const isWindows = computed(() => props.system === 'windows');
watch(isWindows, () => (selected.value = 0));
const linux = [
    {
        title: 'API Node.js',
        description:
            'Aplicação, proxy reverso, SSL e banco preparados para publicar.',
        icon: CodeXml,
        plan: 'LIRIAS KVM 2',
        system: 'Ubuntu 24.04 LTS',
        stack: 'Node.js · Nginx · PostgreSQL',
        resources: '2 vCPU · 8 GB RAM · 100 GB NVMe',
        score: 92,
    },
    {
        title: 'Docker',
        description:
            'Ambiente para contêineres com rede, volumes e observabilidade.',
        icon: Container,
        plan: 'LIRIAS KVM 2',
        system: 'Debian 13',
        stack: 'Docker · Compose · Portainer',
        resources: '2 vCPU · 8 GB RAM · 100 GB NVMe',
        score: 94,
    },
    {
        title: 'Automação n8n',
        description:
            'Workflows, webhooks e persistência em infraestrutura própria.',
        icon: Workflow,
        plan: 'LIRIAS KVM 2',
        system: 'Ubuntu 24.04 LTS',
        stack: 'n8n · PostgreSQL · Redis',
        resources: '2 vCPU · 8 GB RAM · 100 GB NVMe',
        score: 89,
    },
    {
        title: 'E-commerce',
        description:
            'Recursos equilibrados para loja, cache, banco e integrações.',
        icon: Boxes,
        plan: 'LIRIAS KVM 4',
        system: 'AlmaLinux 9',
        stack: 'Nginx · MariaDB · Redis',
        resources: '4 vCPU · 16 GB RAM · 200 GB NVMe',
        score: 87,
    },
    {
        title: 'Banco de dados',
        description: 'Disco rápido, rede restrita e política de backup.',
        icon: Database,
        plan: 'LIRIAS KVM 4',
        system: 'Rocky Linux 9',
        stack: 'PostgreSQL · Backup diário',
        resources: '4 vCPU · 16 GB RAM · 200 GB NVMe',
        score: 95,
    },
    {
        title: 'Servidor personalizado',
        description: 'Controle o sistema, os recursos e cada camada.',
        icon: CloudCog,
        plan: 'Configuração manual',
        system: 'Você escolhe',
        stack: 'Stack personalizada',
        resources: 'Recursos sob medida',
        score: 76,
    },
];
const windows = [
    {
        title: 'Aplicação ASP.NET',
        description: 'Runtime, IIS, HTTPS e observabilidade preparados.',
        icon: CodeXml,
        plan: 'LIRIAS Windows 2',
        system: 'Windows Server 2025',
        stack: 'IIS · .NET 9 · PowerShell',
        resources: '4 vCPU · 8 GB RAM · 120 GB NVMe',
        score: 92,
    },
    {
        title: 'Hospedagem com IIS',
        description: 'Sites, certificados, pools de aplicação e logs.',
        icon: AppWindow,
        plan: 'LIRIAS Windows 2',
        system: 'Windows Server 2022',
        stack: 'IIS · TLS · Web Deploy',
        resources: '4 vCPU · 8 GB RAM · 120 GB NVMe',
        score: 94,
    },
    {
        title: 'SQL Server',
        description: 'Disco rápido, backup e rede restrita por padrão.',
        icon: Database,
        plan: 'LIRIAS Windows 4',
        system: 'Windows Server 2025',
        stack: 'SQL Server 2022 Express',
        resources: '6 vCPU · 16 GB RAM · 240 GB NVMe',
        score: 95,
    },
    {
        title: 'Área de trabalho remota',
        description: 'RDP protegido e sessões monitoradas.',
        icon: Terminal,
        plan: 'LIRIAS Windows 4',
        system: 'Windows Server 2025',
        stack: 'RDP · NLA · Admin Center',
        resources: '6 vCPU · 16 GB RAM · 240 GB NVMe',
        score: 89,
    },
    {
        title: 'Sistema legado',
        description: 'Compatibilidade e migração gradual para aplicações.',
        icon: Boxes,
        plan: 'Avaliação recomendada',
        system: 'Windows Server 2022',
        stack: 'IIS · .NET Framework · SQL',
        resources: 'Dimensionamento assistido',
        score: 84,
    },
    {
        title: 'Servidor personalizado',
        description: 'Escolha versão, recursos, funções e acesso.',
        icon: CloudCog,
        plan: 'Configuração manual',
        system: 'Você escolhe',
        stack: 'Componentes personalizados',
        resources: 'Recursos sob medida',
        score: 76,
    },
];
const workloads = computed(() => (isWindows.value ? windows : linux));
const current = computed(() => workloads.value[selected.value]!);
const versions = computed(() =>
    isWindows.value
        ? [
              [
                  'Windows Server 2025',
                  'Recomendado',
                  'Novos projetos e modernização',
              ],
              [
                  'Windows Server 2022',
                  'Estável',
                  'Produção e sistemas existentes',
              ],
              ['Windows Server 2019', 'Compatibilidade', 'Legado controlado'],
              [
                  'Windows + SQL Express',
                  'Banco incluso',
                  'APIs e sistemas internos',
              ],
          ]
        : [
              ['Ubuntu', '24.04 LTS', 'APIs, Docker e aplicações modernas'],
              ['Debian', '13', 'Serviços estáveis e previsíveis'],
              ['AlmaLinux', '9', 'Ecossistema Enterprise Linux'],
              ['Rocky Linux', '9', 'Produção e bancos de dados'],
          ],
);
const checks = computed(() =>
    isWindows.value
        ? [
              [
                  'Network Level Authentication',
                  'Autenticação antes da sessão',
                  true,
              ],
              ['Origem permitida', 'Acesso limitado aos IPs da equipe', true],
              ['Certificado RDP', 'Certificado válido e monitorado', true],
              ['MFA administrativo', 'Camada ainda não configurada', false],
          ]
        : [
              ['Firewall', 'Portas necessárias liberadas', true],
              ['Chave SSH', 'Acesso administrativo protegido', true],
              ['Backups', 'Cópia automática diária', true],
              ['Atualizações', '3 pacotes aguardando revisão', false],
          ],
);
const migrations = [
    ['01', 'Inventário', 'Aplicação, banco, DNS, arquivos e dependências.'],
    ['02', 'Compatibilidade', 'Sistema, runtime e dependências verificados.'],
    ['03', 'Ensaio isolado', 'Nova VPS validada sem alterar o ambiente atual.'],
    ['04', 'Virada assistida', 'Sincronização, acesso e DNS acompanhados.'],
];
</script>
<template>
    <main class="overflow-hidden">
        <section class="relative isolate overflow-hidden py-20 sm:py-28">
            <div class="hero-grid absolute inset-0 -z-20 opacity-45" />
            <div
                class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_20%,hsl(var(--primary)/.14),transparent_38%)]"
            />
            <div
                class="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_.95fr] lg:px-8"
            >
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        VPS {{ isWindows ? 'Windows' : 'Linux' }} · Brasil
                    </p>
                    <h1
                        class="mt-5 font-display text-5xl leading-[1.02] font-semibold tracking-[-.05em] sm:text-6xl"
                    >
                        {{
                            isWindows
                                ? 'Windows Server com recursos sob medida.'
                                : 'Linux com liberdade para construir.'
                        }}
                    </h1>
                    <p
                        class="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
                    >
                        {{
                            isWindows
                                ? 'Execute ambientes Microsoft com acesso administrativo, recursos isolados e operação nacional.'
                                : 'Escolha a distribuição, tenha acesso root e organize sua stack em uma infraestrutura brasileira.'
                        }}
                    </p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#configurador"
                            class="inline-flex min-h-12 items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-purple-950 px-6 font-semibold text-white"
                            >Configurar VPS <ArrowRight class="h-4 w-4" /></a
                        ><AppLink
                            href="/pricing"
                            class="inline-flex min-h-12 items-center rounded-lg border border-border px-6 font-semibold"
                            >Ver planos</AppLink
                        >
                    </div>
                    <ul
                        class="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"
                    >
                        <li
                            v-for="item in [
                                'Recursos isolados',
                                'Armazenamento NVMe',
                                'Acesso administrativo',
                                'Rede preparada',
                            ]"
                            :key="item"
                            class="flex gap-2"
                        >
                            <Check class="h-4 w-4 text-emerald-400" />{{ item }}
                        </li>
                    </ul>
                </div>
                <div class="rounded-2xl border border-border bg-card/55 p-6">
                    <div
                        class="flex items-center justify-between border-b border-border pb-5"
                    >
                        <div class="flex gap-3">
                            <span
                                class="grid h-11 w-11 place-items-center rounded-lg border border-primary/25 bg-primary/10"
                                ><Server class="h-5 w-5 text-primary-light"
                            /></span>
                            <div>
                                <h2 class="font-semibold">
                                    {{ current.title }}
                                </h2>
                                <p class="text-xs text-muted-foreground">
                                    São Paulo · KVM · NVMe
                                </p>
                            </div>
                        </div>
                        <span class="text-xs text-emerald-400">Disponível</span>
                    </div>
                    <dl class="mt-6 grid grid-cols-3 gap-3">
                        <div
                            v-for="metric in [
                                ['vCPU', '4'],
                                ['Memória', '8 GB'],
                                ['NVMe', isWindows ? '120 GB' : '100 GB'],
                            ]"
                            :key="metric[0]"
                            class="rounded-lg border border-border bg-background/50 p-4"
                        >
                            <dt
                                class="text-[10px] text-muted-foreground uppercase"
                            >
                                {{ metric[0] }}
                            </dt>
                            <dd class="mt-3 font-display text-xl font-semibold">
                                {{ metric[1] }}
                            </dd>
                        </div>
                    </dl>
                    <div
                        class="mt-5 rounded-lg border border-border bg-background/50 p-4"
                    >
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">{{
                                isWindows
                                    ? 'Segurança inicial'
                                    : 'Prontidão operacional'
                            }}</span
                            ><strong>{{ current.score }}%</strong>
                        </div>
                        <div
                            class="mt-4 h-1.5 overflow-hidden rounded-full bg-border"
                        >
                            <span
                                class="block h-full bg-primary transition-all"
                                :style="{ width: `${current.score}%` }"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            id="configurador"
            class="border-y border-border py-20 sm:py-24"
        >
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p
                    class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                >
                    Configuração orientada pelo projeto
                </p>
                <h2
                    class="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-5xl"
                >
                    Comece pelo que você quer construir
                </h2>
                <p class="mt-4 max-w-2xl leading-7 text-muted-foreground">
                    A LIRIAS transforma o objetivo em uma recomendação clara de
                    sistema, recursos, stack e proteção.
                </p>
                <div class="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
                    <div class="grid gap-3 sm:grid-cols-2">
                        <button
                            v-for="(item, index) in workloads"
                            :key="item.title"
                            class="min-h-40 rounded-xl border p-5 text-left"
                            :class="
                                selected === index
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border bg-background/30 hover:bg-card/50'
                            "
                            @click="selected = index"
                        >
                            <div class="flex justify-between">
                                <span
                                    class="grid h-10 w-10 place-items-center rounded-lg border border-border"
                                    ><component
                                        :is="item.icon"
                                        class="h-5 w-5 text-primary-light" /></span
                                ><Check
                                    v-if="selected === index"
                                    class="h-5 w-5 text-primary-light"
                                />
                            </div>
                            <h3 class="mt-4 font-semibold">{{ item.title }}</h3>
                            <p
                                class="mt-2 text-sm leading-6 text-muted-foreground"
                            >
                                {{ item.description }}
                            </p>
                        </button>
                    </div>
                    <aside
                        class="overflow-hidden rounded-xl border border-border bg-card/50"
                    >
                        <div
                            class="border-b border-border bg-background/40 px-6 py-4"
                        >
                            <p
                                class="font-mono text-[10px] tracking-[.18em] text-primary-light uppercase"
                            >
                                Arquitetura recomendada
                            </p>
                            <h3 class="mt-1 text-lg font-semibold">
                                {{ current.title }}
                            </h3>
                        </div>
                        <div class="p-6">
                            <div class="grid gap-3 sm:grid-cols-2">
                                <div
                                    v-for="item in [
                                        [Server, 'Plano', current.plan],
                                        [
                                            isWindows ? AppWindow : Terminal,
                                            'Sistema',
                                            current.system,
                                        ],
                                        [
                                            Activity,
                                            'Recursos',
                                            current.resources,
                                        ],
                                        [HardDrive, 'Stack', current.stack],
                                    ]"
                                    :key="String(item[1])"
                                    class="rounded-lg border border-border bg-background/45 p-4"
                                >
                                    <component
                                        :is="item[0]"
                                        class="h-4 w-4 text-primary-light"
                                    />
                                    <p
                                        class="mt-3 text-[10px] tracking-wider text-muted-foreground uppercase"
                                    >
                                        {{ item[1] }}
                                    </p>
                                    <p class="mt-1 text-sm font-medium">
                                        {{ item[2] }}
                                    </p>
                                </div>
                            </div>
                            <div
                                class="mt-6 rounded-lg border border-border p-4"
                            >
                                <div class="flex justify-between text-sm">
                                    <span>{{
                                        isWindows
                                            ? 'Segurança inicial'
                                            : 'Prontidão inicial'
                                    }}</span
                                    ><strong class="text-xl"
                                        >{{ current.score }}%</strong
                                    >
                                </div>
                                <div class="mt-3 h-2 rounded-full bg-border">
                                    <div
                                        class="h-full rounded-full bg-primary"
                                        :style="{ width: `${current.score}%` }"
                                    />
                                </div>
                            </div>
                            <AppLink
                                href="/deploy"
                                class="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-white"
                                >Personalizar esta configuração
                                <ArrowRight class="h-4 w-4"
                            /></AppLink>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
        <section class="py-20 sm:py-24">
            <div
                class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"
            >
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        {{
                            isWindows
                                ? 'Acesso RDP protegido'
                                : 'Ambiente preparado'
                        }}
                    </p>
                    <h2
                        class="mt-4 font-display text-3xl font-semibold sm:text-4xl"
                    >
                        {{
                            isWindows
                                ? 'Acesso administrativo com contexto e controle.'
                                : 'Segurança, acesso e recuperação antes do deploy.'
                        }}
                    </h2>
                    <p class="mt-4 leading-7 text-muted-foreground">
                        Revise os itens importantes antes de colocar a carga em
                        produção.
                    </p>
                </div>
                <div class="border-y border-border">
                    <div
                        v-for="item in checks"
                        :key="String(item[0])"
                        class="flex items-center gap-4 border-b border-border p-5 last:border-0"
                    >
                        <span
                            class="grid h-9 w-9 place-items-center rounded-lg"
                            :class="
                                item[2]
                                    ? 'bg-emerald-400/10 text-emerald-400'
                                    : 'bg-amber-400/10 text-amber-400'
                            "
                            ><Check v-if="item[2]" class="h-4 w-4" /><RefreshCcw
                                v-else
                                class="h-4 w-4"
                        /></span>
                        <div class="flex-1">
                            <p class="font-medium">{{ item[0] }}</p>
                            <p class="text-sm text-muted-foreground">
                                {{ item[1] }}
                            </p>
                        </div>
                        <span
                            class="text-xs"
                            :class="
                                item[2] ? 'text-emerald-400' : 'text-amber-400'
                            "
                            >{{ item[2] ? 'Ativo' : 'Revisar' }}</span
                        >
                    </div>
                </div>
            </div>
        </section>
        <section class="border-y border-border py-20 sm:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p
                    class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                >
                    {{
                        isWindows
                            ? 'Versões disponíveis'
                            : 'Sistemas disponíveis'
                    }}
                </p>
                <h2
                    class="mt-4 font-display text-3xl font-semibold sm:text-4xl"
                >
                    Escolha uma base compatível com o projeto.
                </h2>
                <div
                    class="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4"
                >
                    <article
                        v-for="version in versions"
                        :key="version[0]"
                        class="bg-background p-6"
                    >
                        <p
                            class="text-[10px] tracking-wider text-primary-light uppercase"
                        >
                            {{ version[1] }}
                        </p>
                        <h3 class="mt-3 text-lg font-semibold">
                            {{ version[0] }}
                        </h3>
                        <p class="mt-3 text-sm leading-6 text-muted-foreground">
                            {{ version[2] }}
                        </p>
                    </article>
                </div>
            </div>
        </section>
        <section class="py-20 sm:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
                    <div>
                        <p
                            class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                        >
                            Migração assistida
                        </p>
                        <h2
                            class="mt-4 font-display text-3xl font-semibold sm:text-4xl"
                        >
                            Mude de ambiente com um caminho de volta.
                        </h2>
                    </div>
                    <ol
                        class="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2"
                    >
                        <li
                            v-for="step in migrations"
                            :key="step[0]"
                            class="bg-background p-6"
                        >
                            <span
                                class="font-mono text-xs text-primary-light"
                                >{{ step[0] }}</span
                            >
                            <h3 class="mt-3 font-semibold">{{ step[1] }}</h3>
                            <p
                                class="mt-2 text-sm leading-6 text-muted-foreground"
                            >
                                {{ step[2] }}
                            </p>
                        </li>
                    </ol>
                </div>
                <div
                    class="mt-16 flex flex-col justify-between gap-6 rounded-3xl border border-primary/25 bg-card/55 p-8 lg:flex-row lg:items-center"
                >
                    <div>
                        <p class="text-xs text-primary-light uppercase">
                            VPS {{ isWindows ? 'Windows' : 'Linux' }} LIRIAS
                        </p>
                        <h2 class="mt-3 font-display text-3xl font-semibold">
                            {{
                                isWindows
                                    ? 'Administração Windows sem custos escondidos.'
                                    : 'Controle técnico sem operar no escuro.'
                            }}
                        </h2>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <AppLink
                            href="/deploy"
                            class="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white"
                            >Configurar minha VPS
                            <ArrowRight class="h-4 w-4" /></AppLink
                        ><AppLink
                            href="/pricing"
                            class="inline-flex min-h-12 items-center rounded-lg border border-border px-5 font-semibold"
                            >Comparar planos</AppLink
                        >
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
