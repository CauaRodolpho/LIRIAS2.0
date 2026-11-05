import { useState } from 'react';
import {
    Activity,
    AppWindow,
    ArrowRight,
    Boxes,
    CalendarClock,
    CheckCircle2,
    ChevronRight,
    CircleGauge,
    Clock3,
    CloudCog,
    Code2,
    Database,
    Download,
    FileCheck2,
    Globe2,
    LockKeyhole,
    Monitor,
    PackageCheck,
    Power,
    RefreshCcw,
    Server,
    ShieldCheck,
    Terminal,
    UserRound,
    UsersRound,
    Wrench,
    type LucideIcon,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import {
    VpsConfigurationItem as ConfigurationItem,
    VpsHeroMetric as HeroMetric,
    VpsInfoBox as InfoBox,
    VpsMetricCard as MetricCard,
    VpsSectionHeading as SectionHeading,
} from '@/components/marketing/vps-shared';
import { VpsWorkloadSelector } from '@/components/marketing/vps-workload-selector';
import { AnimatedGridBackground } from '@/components/shared';
import { Badge, Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

type WindowsWorkloadId =
    | 'dotnet'
    | 'iis'
    | 'sql'
    | 'remote'
    | 'legacy'
    | 'custom';

type WindowsWorkload = {
    id: WindowsWorkloadId;
    title: string;
    description: string;
    icon: LucideIcon;
    plan: string;
    system: string;
    stack: string;
    resources: string;
    security: number;
};

const WINDOWS_WORKLOADS: WindowsWorkload[] = [
    {
        id: 'dotnet',
        title: 'Aplicação ASP.NET',
        description:
            'Runtime, IIS, HTTPS e observabilidade preparados para publicar.',
        icon: Code2,
        plan: 'LIRIAS Windows 2',
        system: 'Windows Server 2025',
        stack: 'IIS · .NET 9 · PowerShell',
        resources: '4 vCPU · 8 GB RAM · 120 GB NVMe',
        security: 92,
    },
    {
        id: 'iis',
        title: 'Hospedagem com IIS',
        description:
            'Sites, certificados, pools de aplicação e logs centralizados.',
        icon: Globe2,
        plan: 'LIRIAS Windows 2',
        system: 'Windows Server 2022',
        stack: 'IIS · TLS · Web Deploy',
        resources: '4 vCPU · 8 GB RAM · 120 GB NVMe',
        security: 94,
    },
    {
        id: 'sql',
        title: 'SQL Server',
        description:
            'Ambiente com disco rápido, backup e rede restrita por padrão.',
        icon: Database,
        plan: 'LIRIAS Windows 4',
        system: 'Windows Server 2025',
        stack: 'SQL Server 2022 Express',
        resources: '6 vCPU · 16 GB RAM · 240 GB NVMe',
        security: 95,
    },
    {
        id: 'remote',
        title: 'Área de trabalho remota',
        description:
            'Ambiente administrativo com RDP protegido e sessões monitoradas.',
        icon: Monitor,
        plan: 'LIRIAS Windows 4',
        system: 'Windows Server 2025',
        stack: 'RDP · NLA · Windows Admin Center',
        resources: '6 vCPU · 16 GB RAM · 240 GB NVMe',
        security: 89,
    },
    {
        id: 'legacy',
        title: 'Sistema legado',
        description:
            'Compatibilidade, inventário e migração gradual para aplicações existentes.',
        icon: Boxes,
        plan: 'Avaliação recomendada',
        system: 'Windows Server 2022',
        stack: 'IIS · .NET Framework · SQL',
        resources: 'Dimensionamento assistido',
        security: 84,
    },
    {
        id: 'custom',
        title: 'Servidor personalizado',
        description:
            'Escolha versão, recursos, funções do Windows e política de acesso.',
        icon: CloudCog,
        plan: 'Configuração manual',
        system: 'Você escolhe',
        stack: 'Componentes personalizados',
        resources: 'Recursos sob medida',
        security: 76,
    },
];

const WINDOWS_CONTROL_NAV: Array<{ label: string; icon: LucideIcon }> = [
    { label: 'Visão geral', icon: CircleGauge },
    { label: 'Sessões RDP', icon: UsersRound },
    { label: 'Serviços', icon: Wrench },
    { label: 'Atualizações', icon: RefreshCcw },
    { label: 'Segurança', icon: ShieldCheck },
];

const RDP_SECURITY_ITEMS = [
    [
        'Network Level Authentication',
        'Autenticação exigida antes de iniciar a sessão',
        true,
    ],
    ['Origem permitida', 'Acesso limitado aos IPs da equipe', true],
    ['Certificado RDP', 'Certificado válido e monitorado', true],
    ['MFA administrativo', 'Camada adicional ainda não configurada', false],
] as const;

const WINDOWS_VERSIONS = [
    {
        name: 'Windows Server 2025',
        label: 'Recomendado',
        description:
            'Versão atual para novas aplicações, administração moderna e segurança aprimorada.',
        use: 'Novos projetos e modernização',
    },
    {
        name: 'Windows Server 2022',
        label: 'Estável',
        description:
            'Opção consolidada para aplicações corporativas e compatibilidade de fornecedores.',
        use: 'Produção e sistemas existentes',
    },
    {
        name: 'Windows Server 2019',
        label: 'Compatibilidade',
        description:
            'Disponível para cargas que ainda dependem de versões e componentes anteriores.',
        use: 'Legado controlado',
    },
    {
        name: 'Windows + SQL Express',
        label: 'Banco incluso',
        description:
            'Modelo inicial para aplicações que precisam de SQL Server sem licença comercial.',
        use: 'APIs e sistemas internos',
    },
];

const LICENSE_ROWS = [
    ['Infraestrutura', '4 vCPU · 8 GB · 120 GB NVMe', 'R$ 119,90'],
    ['Windows Server', 'Licença da imagem oficial', 'R$ 52,00'],
    ['SQL Server Express', 'Edição gratuita', 'R$ 0,00'],
    ['Backup automático', '7 pontos de restauração', 'R$ 18,00'],
];

const MIGRATION_STEPS = [
    ['01', 'Inventário', 'Aplicações, serviços, usuários, banco e licenças.'],
    [
        '02',
        'Compatibilidade',
        'Versões do Windows, .NET, IIS e dependências verificadas.',
    ],
    [
        '03',
        'Ensaio isolado',
        'Nova VPS validada sem interferir no ambiente atual.',
    ],
    [
        '04',
        'Virada assistida',
        'Sincronização final, acesso e DNS acompanhados.',
    ],
];

export default function VpsWindowsPage() {
    const [selectedId, setSelectedId] = useState<WindowsWorkloadId>('dotnet');
    const selected =
        WINDOWS_WORKLOADS.find((workload) => workload.id === selectedId) ??
        WINDOWS_WORKLOADS[0]!;

    return (
        <main className="overflow-hidden">
            <WindowsHero selected={selected} />

            <section
                id="configurador-windows"
                className="relative isolate overflow-hidden border-y border-border py-20 sm:py-24"
            >
                <AnimatedGridBackground className="workload-selector-grid opacity-65" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Configuração orientada pela carga"
                        title="Comece pelo ambiente que precisa executar"
                        description="A LIRIAS recomenda versão, recursos, componentes e proteção com base no cenário Windows escolhido."
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
                        <VpsWorkloadSelector
                            items={WINDOWS_WORKLOADS}
                            selectedId={selectedId}
                            onSelect={(id) =>
                                setSelectedId(id as WindowsWorkloadId)
                            }
                            label="Escolha o tipo de ambiente Windows"
                        />

                        <Card className="overflow-hidden p-0">
                            <div className="border-b border-border bg-background-secondary px-6 py-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-mono text-[10px] tracking-[0.18em] text-primary-light uppercase">
                                            Ambiente recomendado
                                        </p>
                                        <h3 className="mt-1 text-lg font-semibold text-foreground">
                                            {selected.title}
                                        </h3>
                                    </div>
                                    <Badge variant="success" dot>
                                        Compatível
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <ConfigurationItem
                                        icon={Server}
                                        label="Plano"
                                        value={selected.plan}
                                    />
                                    <ConfigurationItem
                                        icon={AppWindow}
                                        label="Sistema"
                                        value={selected.system}
                                    />
                                    <ConfigurationItem
                                        icon={Activity}
                                        label="Recursos"
                                        value={selected.resources}
                                    />
                                    <ConfigurationItem
                                        icon={Terminal}
                                        label="Componentes"
                                        value={selected.stack}
                                    />
                                </div>
                                <div className="mt-6 rounded-lg border border-border bg-background p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">
                                            Segurança inicial
                                        </span>
                                        <strong className="text-xl text-foreground">
                                            {selected.security}%
                                        </strong>
                                    </div>
                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-background-tertiary">
                                        <div
                                            className="h-full rounded-full bg-primary transition-[background-color,border-color,width] duration-300"
                                            style={{
                                                width: `${selected.security}%`,
                                            }}
                                        />
                                    </div>
                                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                                        Estimativa demonstrativa baseada em
                                        acesso, rede, atualização e recuperação.
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
                                        Personalizar este ambiente
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <RdpSecuritySection />
            <SessionsSection />
            <UpdatesSection />
            <VersionsSection />
            <LicensingSection />
            <MigrationSection />

            <section className="py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card px-6 py-12 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,hsl(var(--primary)/0.14),transparent_36%)]"
                            aria-hidden="true"
                        />
                        <div className="relative max-w-2xl">
                            <Badge variant="primary">VPS Windows LIRIAS</Badge>
                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Administração Windows sem custos escondidos.
                            </h2>
                            <p className="mt-4 text-base leading-7 text-muted-foreground">
                                Configure o servidor pelo projeto, proteja o
                                acesso RDP e acompanhe sessões, serviços,
                                atualizações e licenças.
                            </p>
                        </div>
                        <div className="relative mt-8 flex flex-wrap gap-3 lg:mt-0 lg:justify-end">
                            <Button
                                asChild
                                size="lg"
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                <Link href="/deploy">
                                    Configurar VPS Windows
                                </Link>
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

function WindowsHero({ selected }: { selected: WindowsWorkload }) {
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
                        VPS Windows · LIRIAS Windows Control
                    </Badge>
                    <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Windows Server pronto para{' '}
                        <span className="text-primary-light">
                            trabalhar com segurança.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                        Configure aplicações, acesso remoto e serviços Microsoft
                        com visibilidade sobre proteção, atualizações e
                        licenciamento.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                            asChild
                            size="lg"
                            rightIcon={<ArrowRight className="h-4 w-4" />}
                        >
                            <a href="#configurador-windows">
                                Montar meu ambiente
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/pricing">Ver planos</Link>
                        </Button>
                    </div>
                    <div className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border py-4">
                        <HeroMetric value="RDP" label="Acesso protegido" />
                        <HeroMetric value="NLA" label="Autenticação" />
                        <HeroMetric value="Root" label="Administrador" />
                    </div>
                </div>

                <WindowsControlPreview selected={selected} />
            </div>
        </section>
    );
}

function WindowsControlPreview({ selected }: { selected: WindowsWorkload }) {
    return (
        <div className="relative mx-auto w-full max-w-2xl">
            <div
                className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-background-secondary px-5 py-3.5">
                    <div className="flex items-center gap-2">
                        <span
                            className="grid h-5 w-5 grid-cols-2 gap-0.5"
                            aria-hidden="true"
                        >
                            <i className="bg-primary-light" />
                            <i className="bg-primary-light" />
                            <i className="bg-primary-light" />
                            <i className="bg-primary-light" />
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                            LIRIAS WINDOWS CONTROL
                        </span>
                    </div>
                    <Badge variant="success">Operacional</Badge>
                </div>

                <div className="grid md:grid-cols-[180px_1fr]">
                    <aside className="hidden border-r border-border bg-background p-4 md:block">
                        {WINDOWS_CONTROL_NAV.map(
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
                                    Servidor Windows
                                </p>
                                <p className="mt-1 font-semibold text-foreground">
                                    lirias-win-01
                                </p>
                                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                                    {selected.system}
                                </p>
                            </div>
                            <Badge variant="success" dot>
                                RDP protegido
                            </Badge>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-2">
                            <MetricCard
                                label="CPU"
                                value="22%"
                                bars={[32, 58, 43, 70, 51, 66]}
                            />
                            <MetricCard
                                label="RAM"
                                value="4.8 GB"
                                bars={[42, 46, 51, 54, 58, 56]}
                            />
                            <MetricCard
                                label="SESSÕES"
                                value="3 ativas"
                                bars={[28, 28, 46, 46, 64, 64]}
                            />
                        </div>

                        <div className="mt-4 rounded-lg border border-border bg-background p-4">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-medium text-foreground">
                                    Estado operacional
                                </span>
                                <span className="text-lg font-bold text-foreground">
                                    {selected.security}
                                    <span className="text-xs text-muted-foreground">
                                        /100
                                    </span>
                                </span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-background-tertiary">
                                <div
                                    className="h-full rounded-full bg-primary transition-[background-color,border-color,width] duration-300"
                                    style={{ width: `${selected.security}%` }}
                                />
                            </div>
                            <div className="mt-4 flex items-start gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning-light">
                                    <RefreshCcw className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-xs font-medium text-foreground">
                                        Reinicialização recomendada
                                    </p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        Janela disponível hoje, 23:00.
                                    </p>
                                </div>
                                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RdpSecuritySection() {
    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
                <div>
                    <SectionHeading
                        eyebrow="Índice de segurança RDP"
                        title="Acesso remoto com postura visível"
                        description="A LIRIAS transforma configurações técnicas de acesso em uma leitura clara, com prioridade e ação recomendada."
                        align="left"
                    />
                    <div className="mt-8 space-y-3">
                        {RDP_SECURITY_ITEMS.map(
                            ([title, description, ready]) => (
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
                                            <LockKeyhole className="h-4 w-4" />
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
                                    <Badge
                                        variant={ready ? 'success' : 'warning'}
                                    >
                                        {ready ? 'Ativo' : 'Configurar'}
                                    </Badge>
                                </div>
                            ),
                        )}
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
                                    86
                                </strong>
                                <p className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">
                                    de 100
                                </p>
                            </div>
                        </div>
                        <div>
                            <Badge variant="warning" dot>
                                1 melhoria recomendada
                            </Badge>
                            <h3 className="mt-4 text-2xl font-semibold text-foreground">
                                RDP protegido e restrito à equipe.
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                NLA, origem permitida e certificado estão
                                ativos. Configure MFA para fortalecer o acesso
                                administrativo.
                            </p>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-5"
                            >
                                Ver recomendações
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}

function SessionsSection() {
    const [activeOnly, setActiveOnly] = useState(true);
    const sessions = [
        {
            user: 'Administrador',
            origin: 'São Paulo, BR',
            duration: '2h 18min',
            state: 'Ativa',
            load: '1.8 GB',
        },
        {
            user: 'caua.dev',
            origin: 'Campinas, BR',
            duration: '46min',
            state: 'Ativa',
            load: '1.2 GB',
        },
        {
            user: 'suporte',
            origin: 'São Paulo, BR',
            duration: 'Encerrada há 12min',
            state: 'Encerrada',
            load: '—',
        },
    ];
    const visibleSessions = activeOnly
        ? sessions.filter((session) => session.state === 'Ativa')
        : sessions;

    return (
        <section className="border-y border-border bg-background-secondary/65 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Central de sessões"
                    title="Saiba quem está conectado antes de agir"
                    description="Visualize origem, duração e consumo das sessões administrativas em uma interface pronta para a futura API."
                />

                <Card className="mt-10 overflow-hidden p-0">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
                        <div>
                            <p className="font-semibold text-foreground">
                                Sessões remotas
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                lirias-win-01 · RDP com NLA
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant={activeOnly ? 'primary' : 'secondary'}
                                onClick={() => setActiveOnly(true)}
                            >
                                Ativas
                            </Button>
                            <Button
                                size="sm"
                                variant={!activeOnly ? 'primary' : 'secondary'}
                                onClick={() => setActiveOnly(false)}
                            >
                                Todas
                            </Button>
                            <Button
                                size="sm"
                                variant="secondary"
                                leftIcon={<Download className="h-4 w-4" />}
                            >
                                Arquivo RDP
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="bg-background text-xs tracking-wider text-muted-foreground uppercase">
                                <tr>
                                    {[
                                        'Usuário',
                                        'Origem',
                                        'Duração',
                                        'Memória',
                                        'Status',
                                        '',
                                    ].map((label) => (
                                        <th
                                            key={label}
                                            className="px-5 py-3 font-medium"
                                        >
                                            {label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {visibleSessions.map((session) => (
                                    <tr key={session.user} className="bg-card">
                                        <td className="px-5 py-4">
                                            <span className="flex items-center gap-2 font-medium text-foreground">
                                                <UserRound className="h-4 w-4 text-primary-light" />
                                                {session.user}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-muted-foreground">
                                            {session.origin}
                                        </td>
                                        <td className="px-5 py-4 text-muted-foreground">
                                            {session.duration}
                                        </td>
                                        <td className="px-5 py-4 text-muted-foreground">
                                            {session.load}
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge
                                                variant={
                                                    session.state === 'Ativa'
                                                        ? 'success'
                                                        : 'default'
                                                }
                                                dot
                                            >
                                                {session.state}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Button
                                                size="xs"
                                                variant="ghost"
                                                disabled={
                                                    session.state !== 'Ativa'
                                                }
                                            >
                                                Gerenciar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </section>
    );
}

function UpdatesSection() {
    const [scheduled, setScheduled] = useState(false);

    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
                <div>
                    <SectionHeading
                        eyebrow="Atualizações controladas"
                        title="Planeje a reinicialização antes da indisponibilidade"
                        description="Veja patches, serviços afetados, backup disponível e janela de manutenção antes de aplicar alterações."
                        align="left"
                    />
                    <ul className="mt-7 space-y-4">
                        {[
                            [
                                'Impacto explicado',
                                '2 serviços serão reiniciados e a sessão RDP poderá ser interrompida.',
                            ],
                            [
                                'Proteção verificada',
                                'Snapshot criado hoje às 04:00 e validado com sucesso.',
                            ],
                            [
                                'Retorno documentado',
                                'Plano de recuperação disponível caso a atualização falhe.',
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
                            <p className="font-semibold text-foreground">
                                Windows Update
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                3 atualizações de segurança disponíveis
                            </p>
                        </div>
                        <Badge variant={scheduled ? 'success' : 'warning'} dot>
                            {scheduled ? 'Agendado' : 'Reinício necessário'}
                        </Badge>
                    </div>
                    <div className="p-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <InfoBox
                                icon={CalendarClock}
                                label="Janela sugerida"
                                value="Hoje, 23:00–23:20"
                            />
                            <InfoBox
                                icon={Clock3}
                                label="Indisponibilidade"
                                value="Aproximadamente 6 min"
                            />
                            <InfoBox
                                icon={PackageCheck}
                                label="Backup disponível"
                                value="Hoje às 04:00"
                            />
                            <InfoBox
                                icon={Power}
                                label="Serviços afetados"
                                value="IIS e SQL Express"
                            />
                        </div>
                        <div className="mt-5 rounded-xl border border-warning/25 bg-warning/5 p-4">
                            <p className="text-sm font-medium text-foreground">
                                A sessão RDP ativa será desconectada.
                            </p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Os usuários conectados devem salvar o trabalho
                                antes da janela programada.
                            </p>
                        </div>
                        <Button
                            className="mt-5 w-full"
                            onClick={() => setScheduled((value) => !value)}
                        >
                            {scheduled
                                ? 'Cancelar agendamento demonstrativo'
                                : 'Agendar manutenção'}
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    );
}

function VersionsSection() {
    return (
        <section className="border-y border-border bg-background-secondary/65 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Imagens oficiais"
                    title="A versão certa para cada aplicação"
                    description="Compare compatibilidade e propósito antes de selecionar o sistema da VPS."
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {WINDOWS_VERSIONS.map((version) => (
                        <Card
                            key={version.name}
                            variant="interactive"
                            className="group p-6"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <span
                                    className="grid h-12 w-12 grid-cols-2 gap-0.5 rounded-lg border border-border bg-background p-3"
                                    aria-hidden="true"
                                >
                                    <i className="bg-primary-light" />
                                    <i className="bg-primary-light" />
                                    <i className="bg-primary-light" />
                                    <i className="bg-primary-light" />
                                </span>
                                <Badge variant="primary">{version.label}</Badge>
                            </div>
                            <h3 className="mt-6 text-lg font-semibold text-foreground">
                                {version.name}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {version.description}
                            </p>
                            <p className="mt-5 border-t border-border pt-4 text-xs font-medium text-primary-light">
                                {version.use}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LicensingSection() {
    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
                <div>
                    <SectionHeading
                        eyebrow="Licenciamento transparente"
                        title="Veja infraestrutura e software separadamente"
                        description="A estimativa demonstra como a LIRIAS poderá explicar cada componente antes da contratação, evitando valores inesperados."
                        align="left"
                    />
                    <div className="mt-7 rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <div className="flex gap-3">
                            <FileCheck2 className="h-5 w-5 shrink-0 text-primary-light" />
                            <p className="text-sm leading-6 text-muted-foreground">
                                <strong className="text-foreground">
                                    Protótipo:
                                </strong>{' '}
                                os valores abaixo são apenas demonstrativos e
                                serão substituídos pelo catálogo comercial real.
                            </p>
                        </div>
                    </div>
                </div>

                <Card className="overflow-hidden p-0">
                    <div className="border-b border-border px-5 py-4">
                        <p className="font-semibold text-foreground">
                            Estimativa mensal
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            ASP.NET · Windows Server 2025
                        </p>
                    </div>
                    <div className="divide-y divide-border">
                        {LICENSE_ROWS.map(([item, detail, price]) => (
                            <div
                                key={item}
                                className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4 sm:grid-cols-[150px_1fr_auto]"
                            >
                                <p className="text-sm font-medium text-foreground">
                                    {item}
                                </p>
                                <p className="hidden text-sm text-muted-foreground sm:block">
                                    {detail}
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                    {price}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end justify-between border-t border-border bg-background-secondary px-5 py-5">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Total demonstrativo
                            </p>
                            <p className="mt-1 text-2xl font-bold text-foreground">
                                R$ 189,90
                                <span className="text-sm font-normal text-muted-foreground">
                                    /mês
                                </span>
                            </p>
                        </div>
                        <Button size="sm" variant="secondary">
                            Detalhar licenças
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    );
}

function MigrationSection() {
    return (
        <section className="border-y border-border bg-background-secondary/65 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Migração Windows"
                    title="Compatibilidade verificada antes da virada"
                    description="Um fluxo demonstrativo organiza aplicações, versões, banco, acesso e licenças antes de transferir a operação."
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
                        <Link href="/support">Planejar migração Windows</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
