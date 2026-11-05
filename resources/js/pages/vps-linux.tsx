import { useState } from 'react';
import {
    Activity,
    ArrowRight,
    Boxes,
    CheckCircle2,
    ChevronRight,
    CircleGauge,
    CloudCog,
    Code2,
    Container,
    Database,
    GitBranch,
    HardDrive,
    KeyRound,
    Layers3,
    LockKeyhole,
    Network,
    PackageCheck,
    RefreshCcw,
    Rocket,
    Server,
    ShieldCheck,
    Terminal,
    Undo2,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import {
    VpsConfigurationItem as ConfigurationItem,
    VpsHeroMetric as HeroMetric,
    VpsMetricCard as MetricCard,
    VpsSectionHeading as SectionHeading,
} from '@/components/marketing/vps-shared';
import { VpsWorkloadSelector } from '@/components/marketing/vps-workload-selector';
import { AnimatedGridBackground } from '@/components/shared';
import { Badge, Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

type WorkloadId =
    | 'node'
    | 'docker'
    | 'automation'
    | 'commerce'
    | 'database'
    | 'custom';

type Workload = {
    id: WorkloadId;
    title: string;
    description: string;
    icon: LucideIcon;
    plan: string;
    system: string;
    stack: string;
    readiness: number;
    resources: string;
};

const WORKLOADS: Workload[] = [
    {
        id: 'node',
        title: 'API Node.js',
        description:
            'Aplicação, proxy reverso, SSL e banco preparados para publicar.',
        icon: Code2,
        plan: 'LIRIAS KVM 2',
        system: 'Ubuntu 24.04 LTS',
        stack: 'Node.js · Nginx · PostgreSQL',
        readiness: 92,
        resources: '2 vCPU · 8 GB RAM · 100 GB NVMe',
    },
    {
        id: 'docker',
        title: 'Docker',
        description:
            'Ambiente para contêineres com rede, volumes e observabilidade.',
        icon: Container,
        plan: 'LIRIAS KVM 2',
        system: 'Debian 13',
        stack: 'Docker · Compose · Portainer',
        readiness: 94,
        resources: '2 vCPU · 8 GB RAM · 100 GB NVMe',
    },
    {
        id: 'automation',
        title: 'Automação n8n',
        description:
            'Workflows, webhooks e persistência em uma infraestrutura própria.',
        icon: Workflow,
        plan: 'LIRIAS KVM 2',
        system: 'Ubuntu 24.04 LTS',
        stack: 'n8n · PostgreSQL · Redis',
        readiness: 89,
        resources: '2 vCPU · 8 GB RAM · 100 GB NVMe',
    },
    {
        id: 'commerce',
        title: 'E-commerce',
        description:
            'Recursos equilibrados para loja, cache, banco e integrações.',
        icon: Boxes,
        plan: 'LIRIAS KVM 4',
        system: 'AlmaLinux 9',
        stack: 'Nginx · MariaDB · Redis',
        readiness: 87,
        resources: '4 vCPU · 16 GB RAM · 200 GB NVMe',
    },
    {
        id: 'database',
        title: 'Banco de dados',
        description:
            'Disco rápido, rede restrita e política de backup recomendada.',
        icon: Database,
        plan: 'LIRIAS KVM 4',
        system: 'Rocky Linux 9',
        stack: 'PostgreSQL · Backup diário',
        readiness: 95,
        resources: '4 vCPU · 16 GB RAM · 200 GB NVMe',
    },
    {
        id: 'custom',
        title: 'Servidor personalizado',
        description:
            'Controle o sistema, os recursos e cada camada da configuração.',
        icon: CloudCog,
        plan: 'Configuração manual',
        system: 'Você escolhe',
        stack: 'Stack personalizada',
        readiness: 76,
        resources: 'Recursos sob medida',
    },
];

const DISTRIBUTIONS = [
    {
        name: 'Ubuntu',
        version: '24.04 LTS',
        tag: 'Recomendado',
        description:
            'Ecossistema amplo e ótima escolha para APIs, Docker e aplicações modernas.',
    },
    {
        name: 'Debian',
        version: '13',
        tag: 'Estabilidade',
        description:
            'Base enxuta e previsível para serviços que valorizam consistência.',
    },
    {
        name: 'AlmaLinux',
        version: '9',
        tag: 'Corporativo',
        description:
            'Compatibilidade com o ecossistema Enterprise Linux e ciclos longos.',
    },
    {
        name: 'Rocky Linux',
        version: '9',
        tag: 'Produção',
        description:
            'Ambiente empresarial robusto para aplicações e bancos de dados.',
    },
];

const MISSION_NAV_ITEMS: Array<{ label: string; icon: LucideIcon }> = [
    { label: 'Visão geral', icon: CircleGauge },
    { label: 'Monitoramento', icon: Activity },
    { label: 'Segurança', icon: ShieldCheck },
    { label: 'Backups', icon: RefreshCcw },
    { label: 'Rede', icon: Network },
];

const READINESS_ITEMS = [
    ['Firewall', 'Portas necessárias liberadas', true],
    ['Chave SSH', 'Acesso administrativo protegido', true],
    ['Backups', 'Cópia automática diária', true],
    ['Atualizações', '3 pacotes aguardando revisão', false],
] as const;

const CHANGE_STEPS = [
    {
        icon: GitBranch,
        title: 'Visualize o impacto',
        description:
            'Veja serviços afetados, indisponibilidade estimada e dependências antes de confirmar.',
    },
    {
        icon: PackageCheck,
        title: 'Proteja o estado atual',
        description:
            'A LIRIAS verifica o backup mais recente e sugere um ponto de restauração.',
    },
    {
        icon: Undo2,
        title: 'Tenha um caminho de volta',
        description:
            'Cada mudança registra resultado, responsável e estratégia de recuperação.',
    },
];

const MIGRATION_STEPS = [
    ['01', 'Mapeamento', 'Aplicação, banco, DNS, arquivos e dependências.'],
    ['02', 'Ensaio', 'Configuração validada sem alterar o ambiente atual.'],
    ['03', 'Transferência', 'Dados sincronizados e serviços verificados.'],
    ['04', 'Virada segura', 'DNS atualizado com acompanhamento da propagação.'],
];

export default function VpsLinuxPage() {
    const [selectedId, setSelectedId] = useState<WorkloadId>('node');
    const selected =
        WORKLOADS.find((workload) => workload.id === selectedId) ??
        WORKLOADS[0]!;

    return (
        <main className="overflow-hidden">
            <LinuxHero selected={selected} />

            <section
                className="relative isolate overflow-hidden border-y border-border py-20 sm:py-24"
                id="configurador"
            >
                <AnimatedGridBackground className="workload-selector-grid opacity-65" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Configuração orientada pelo projeto"
                        title="Comece pelo que você quer construir"
                        description="A LIRIAS transforma o objetivo da aplicação em uma recomendação clara de sistema, recursos, stack e proteção."
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
                        <VpsWorkloadSelector
                            items={WORKLOADS}
                            selectedId={selectedId}
                            onSelect={(id) => setSelectedId(id as WorkloadId)}
                            label="Escolha o tipo de projeto Linux"
                        />

                        <Card className="relative overflow-hidden p-0">
                            <div className="border-b border-border bg-background-secondary px-6 py-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-mono text-[10px] tracking-[0.18em] text-primary-light uppercase">
                                            Arquitetura recomendada
                                        </p>
                                        <h3 className="mt-1 text-lg font-semibold text-foreground">
                                            {selected.title}
                                        </h3>
                                    </div>
                                    <Badge variant="success" dot>
                                        Pronta para revisar
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <ConfigurationItem
                                        label="Plano"
                                        value={selected.plan}
                                        icon={Server}
                                    />
                                    <ConfigurationItem
                                        label="Sistema"
                                        value={selected.system}
                                        icon={Terminal}
                                    />
                                    <ConfigurationItem
                                        label="Recursos"
                                        value={selected.resources}
                                        icon={Activity}
                                    />
                                    <ConfigurationItem
                                        label="Stack"
                                        value={selected.stack}
                                        icon={Layers3}
                                    />
                                </div>

                                <div className="mt-6 rounded-lg border border-border bg-background p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">
                                            Prontidão inicial
                                        </span>
                                        <strong className="text-xl text-foreground">
                                            {selected.readiness}%
                                        </strong>
                                    </div>
                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-background-tertiary">
                                        <div
                                            className="h-full rounded-full bg-primary transition-[background-color,border-color,width] duration-300"
                                            style={{
                                                width: `${selected.readiness}%`,
                                            }}
                                        />
                                    </div>
                                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                                        Estimativa demonstrativa baseada em
                                        segurança, backup, acesso e
                                        observabilidade.
                                    </p>
                                </div>

                                <Button
                                    asChild
                                    className="mt-6 w-full"
                                    rightIcon={
                                        <ArrowRight className="h-4 w-4" />
                                    }
                                >
                                    <Link href="/deploy">
                                        Personalizar esta configuração
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <ReadinessSection />
            <SafeChangesSection />
            <DistributionsSection />
            <OperationsSection />
            <MigrationSection />

            <section className="py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card px-6 py-12 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,hsl(var(--primary)/0.14),transparent_36%)]"
                            aria-hidden="true"
                        />
                        <div className="relative max-w-2xl">
                            <Badge variant="primary">VPS Linux LIRIAS</Badge>
                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Controle técnico sem operar no escuro.
                            </h2>
                            <p className="mt-4 text-base leading-7 text-muted-foreground">
                                Configure a infraestrutura pelo objetivo do
                                projeto e acompanhe segurança, desempenho e
                                mudanças em um único lugar.
                            </p>
                        </div>
                        <div className="relative mt-8 flex flex-wrap gap-3 lg:mt-0 lg:justify-end">
                            <Button
                                asChild
                                size="lg"
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                <Link href="/deploy">Configurar minha VPS</Link>
                            </Button>
                            <Button asChild size="lg" variant="secondary">
                                <Link href="/pricing">Comparar planos</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function LinuxHero({ selected }: { selected: Workload }) {
    return (
        <section className="hero-background relative min-h-[820px] overflow-hidden pt-32 pb-24 sm:pt-36">
            <div
                className="hero-main-grid pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                <div className="animated-grid-plane absolute" />
                <div className="animated-grid-vignette absolute inset-0" />
            </div>
            <div
                className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-5xl bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.14),transparent_68%)]"
                aria-hidden="true"
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
                <div>
                    <Badge variant="primary">
                        VPS Linux · LIRIAS Mission Control
                    </Badge>
                    <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Sua infraestrutura Linux,{' '}
                        <span className="text-primary-light">
                            pronta para produção.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                        Escolha o que deseja construir. A LIRIAS organiza
                        sistema, recursos, proteção e operação sem esconder o
                        controle técnico.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                            asChild
                            size="lg"
                            rightIcon={<ArrowRight className="h-4 w-4" />}
                        >
                            <a href="#configurador">
                                Montar minha configuração
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/pricing">Ver planos</Link>
                        </Button>
                    </div>
                    <div className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border py-4">
                        <HeroMetric value="99,9%" label="Disponibilidade" />
                        <HeroMetric value="NVMe" label="Armazenamento" />
                        <HeroMetric value="Root" label="Controle total" />
                    </div>
                </div>

                <MissionControlPreview selected={selected} />
            </div>
        </section>
    );
}

function MissionControlPreview({ selected }: { selected: Workload }) {
    return (
        <div className="relative mx-auto w-full max-w-2xl">
            <div
                className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-background-secondary px-5 py-3.5">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-success" />
                        <span className="font-mono text-[11px] text-muted-foreground">
                            LIRIAS MISSION CONTROL
                        </span>
                    </div>
                    <Badge variant="success">Operacional</Badge>
                </div>

                <div className="grid md:grid-cols-[180px_1fr]">
                    <aside className="hidden border-r border-border bg-background p-4 md:block">
                        {MISSION_NAV_ITEMS.map(
                            ({ label, icon: Icon }, index) => (
                                <div
                                    key={label}
                                    className={cn(
                                        'mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs',
                                        index === 0
                                            ? 'bg-primary/10 font-medium text-primary-light'
                                            : 'text-muted-foreground',
                                    )}
                                >
                                    <Icon
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                    />
                                    {label}
                                </div>
                            ),
                        )}
                    </aside>

                    <div className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Servidor recomendado
                                </p>
                                <p className="mt-1 font-semibold text-foreground">
                                    lirias-linux-01
                                </p>
                                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                                    {selected.system}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                    Prontidão
                                </p>
                                <p className="mt-1 text-2xl font-bold text-foreground">
                                    {selected.readiness}
                                    <span className="text-sm text-muted-foreground">
                                        /100
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-background-tertiary">
                            <div
                                className="h-full rounded-full bg-primary transition-[background-color,border-color,width] duration-300"
                                style={{ width: `${selected.readiness}%` }}
                            />
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-2">
                            <MetricCard
                                label="CPU"
                                value="18%"
                                bars={[38, 56, 44, 70, 48, 64]}
                            />
                            <MetricCard
                                label="RAM"
                                value="3.2 GB"
                                bars={[32, 39, 42, 48, 46, 51]}
                            />
                            <MetricCard
                                label="DISCO"
                                value="28%"
                                bars={[25, 26, 28, 28, 29, 31]}
                            />
                        </div>

                        <div className="mt-4 rounded-lg border border-border bg-background p-4">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-medium text-foreground">
                                    Próxima recomendação
                                </span>
                                <Badge variant="warning">1 ação</Badge>
                            </div>
                            <div className="mt-3 flex items-start gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning-light">
                                    <PackageCheck className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-xs font-medium text-foreground">
                                        Revisar atualizações pendentes
                                    </p>
                                    <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                                        3 pacotes podem ser atualizados com
                                        baixo impacto.
                                    </p>
                                </div>
                                <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReadinessSection() {
    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
                <div>
                    <SectionHeading
                        eyebrow="Índice de prontidão"
                        title="Saiba se a VPS está realmente pronta"
                        description="Recursos deixam de ser configurações isoladas e passam a formar uma leitura objetiva de segurança, continuidade e operação."
                        align="left"
                    />
                    <div className="mt-8 space-y-3">
                        {READINESS_ITEMS.map(([title, description, ready]) => (
                            <div
                                key={title}
                                className="surface-card flex items-center gap-4 p-4"
                            >
                                <span
                                    className={cn(
                                        'flex h-9 w-9 items-center justify-center rounded-lg',
                                        ready
                                            ? 'bg-success/10 text-success-light'
                                            : 'bg-warning/10 text-warning-light',
                                    )}
                                >
                                    {ready ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                        <RefreshCcw className="h-4 w-4" />
                                    )}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-foreground">
                                        {title}
                                    </p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                                <Badge variant={ready ? 'success' : 'warning'}>
                                    {ready ? 'Pronto' : 'Revisar'}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                <Card className="relative overflow-hidden p-6 sm:p-8">
                    <div
                        className="absolute top-0 right-0 h-48 w-48 bg-[radial-gradient(circle,hsl(var(--primary)/0.15),transparent_68%)]"
                        aria-hidden="true"
                    />
                    <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center">
                        <div className="relative flex h-48 w-48 shrink-0 items-center justify-center rounded-full border-[18px] border-primary/10">
                            <div className="absolute inset-[-18px] rotate-45 rounded-full border-[18px] border-transparent border-t-primary-light border-r-primary" />
                            <div className="text-center">
                                <strong className="text-5xl font-bold text-foreground">
                                    82
                                </strong>
                                <p className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">
                                    de 100
                                </p>
                            </div>
                        </div>
                        <div>
                            <Badge variant="warning" dot>
                                Atenção recomendada
                            </Badge>
                            <h3 className="mt-4 text-2xl font-semibold text-foreground">
                                Funcional, mas ainda não ideal para produção.
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                Existem atualizações pendentes e o plano de
                                recuperação ainda não foi testado.
                            </p>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-5"
                            >
                                Ver plano de melhoria
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}

function SafeChangesSection() {
    return (
        <section className="border-y border-border bg-background-secondary/65 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Mudanças seguras"
                    title="Entenda antes de executar. Recupere se precisar."
                    description="Ações críticas mostram impacto, proteção disponível e caminho de retorno antes da confirmação."
                />
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {CHANGE_STEPS.map(
                        ({ icon: Icon, title, description }, index) => (
                            <Card key={title} className="relative p-6">
                                <span className="absolute top-4 right-5 font-mono text-xs text-muted-foreground">
                                    0{index + 1}
                                </span>
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary-light">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h3 className="mt-6 text-lg font-semibold text-foreground">
                                    {title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                    {description}
                                </p>
                            </Card>
                        ),
                    )}
                </div>
                <div className="mt-5 grid gap-4 rounded-2xl border border-warning/25 bg-warning/5 p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10 text-warning-light">
                        <LockKeyhole className="h-5 w-5" />
                    </span>
                    <div>
                        <p className="font-semibold text-foreground">
                            Reinstalação do sistema operacional
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            O último backup foi criado há 3 dias. Gere um ponto
                            de restauração antes de continuar.
                        </p>
                    </div>
                    <Button variant="secondary" size="sm">
                        Criar backup primeiro
                    </Button>
                </div>
            </div>
        </section>
    );
}

function DistributionsSection() {
    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Distribuições Linux"
                    title="Escolha com contexto, não por tentativa"
                    description="Cada opção apresenta o cenário em que funciona melhor. Você continua com acesso root e liberdade para personalizar."
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {DISTRIBUTIONS.map((distribution) => (
                        <Card
                            key={distribution.name}
                            variant="interactive"
                            className="group p-6"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-lg font-bold text-primary-light">
                                    {distribution.name.slice(0, 1)}
                                </span>
                                <Badge variant="primary">
                                    {distribution.tag}
                                </Badge>
                            </div>
                            <h3 className="mt-6 text-lg font-semibold text-foreground">
                                {distribution.name}
                            </h3>
                            <p className="mt-1 font-mono text-xs text-primary-light">
                                {distribution.version}
                            </p>
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                {distribution.description}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary-light">
                                Ver compatibilidade{' '}
                                <ChevronRight className="h-3.5 w-3.5" />
                            </span>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function OperationsSection() {
    return (
        <section className="border-y border-border bg-background-secondary/65 py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
                <div>
                    <SectionHeading
                        eyebrow="Centro de operações"
                        title="Métricas, segurança e mudanças na mesma visão"
                        description="O Mission Control conecta o que aconteceu no servidor com o impacto em desempenho, segurança e disponibilidade."
                        align="left"
                    />
                    <ul className="mt-7 space-y-4">
                        {[
                            [
                                'Telemetria compreensível',
                                'CPU, memória, disco e tráfego acompanhados por período.',
                            ],
                            [
                                'Alertas acionáveis',
                                'Cada aviso informa o problema, o impacto e a ação recomendada.',
                            ],
                            [
                                'Linha do tempo operacional',
                                'Backups, reinícios, regras e implantações reunidos em ordem.',
                            ],
                        ].map(([title, description]) => (
                            <li key={title} className="flex gap-3">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-light" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {title}
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <Card className="overflow-hidden p-0">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                Linha do tempo operacional
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                lirias-linux-01
                            </p>
                        </div>
                        <Badge variant="success" dot>
                            Ao vivo
                        </Badge>
                    </div>
                    <div className="divide-y divide-border">
                        <TimelineItem
                            icon={Rocket}
                            title="Aplicação publicada"
                            detail="api-production · versão 2.4.1"
                            time="agora"
                            tone="primary"
                        />
                        <TimelineItem
                            icon={ShieldCheck}
                            title="Firewall sincronizado"
                            detail="6 regras aplicadas sem conflito"
                            time="há 8 min"
                            tone="success"
                        />
                        <TimelineItem
                            icon={HardDrive}
                            title="Backup concluído"
                            detail="18,4 GB · verificação aprovada"
                            time="04:00"
                            tone="success"
                        />
                        <TimelineItem
                            icon={KeyRound}
                            title="Chave SSH adicionada"
                            detail="caua@workstation · ED25519"
                            time="ontem"
                            tone="primary"
                        />
                    </div>
                </Card>
            </div>
        </section>
    );
}

function MigrationSection() {
    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Migração guiada"
                    title="Traga sua aplicação sem improvisar a virada"
                    description="Um fluxo demonstrativo organiza levantamento, ensaio, transferência e DNS para reduzir riscos."
                />
                <div className="relative mt-12 grid gap-4 md:grid-cols-4">
                    <div
                        className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-border md:block"
                        aria-hidden="true"
                    />
                    {MIGRATION_STEPS.map(([number, title, description]) => (
                        <div
                            key={number}
                            className="relative rounded-lg border border-border bg-card p-5"
                        >
                            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-background font-mono text-sm font-semibold text-primary-light">
                                {number}
                            </span>
                            <h3 className="mt-5 font-semibold text-foreground">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <Button
                        asChild
                        variant="secondary"
                        rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                        <Link href="/support">Planejar uma migração</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({
    icon: Icon,
    title,
    detail,
    time,
    tone,
}: {
    icon: LucideIcon;
    title: string;
    detail: string;
    time: string;
    tone: 'primary' | 'success';
}) {
    return (
        <div className="flex items-start gap-4 p-5">
            <span
                className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    tone === 'success'
                        ? 'bg-success/10 text-success-light'
                        : 'bg-primary/10 text-primary-light',
                )}
            >
                <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                    {detail}
                </p>
            </div>
            <time className="shrink-0 text-[10px] text-muted-foreground">
                {time}
            </time>
        </div>
    );
}
