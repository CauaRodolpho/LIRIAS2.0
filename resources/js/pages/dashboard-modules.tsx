import { useMemo, useState } from 'react';
import Link from '@/components/navigation/app-link';
import {
    Activity,
    AlertTriangle,
    Box,
    Check,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Cloud,
    Container,
    Copy,
    Cpu,
    CreditCard,
    Database,
    Download,
    FileClock,
    Gauge,
    Globe2,
    HardDrive,
    KeyRound,
    LifeBuoy,
    LockKeyhole,
    MemoryStick,
    Network,
    Plus,
    Power,
    Search,
    Server,
    ShieldCheck,
    Terminal,
    Trash2,
    UserRound,
    Wifi,
} from 'lucide-react';
import {
    Badge,
    Button,
    Card,
    ChoiceCard,
    Input,
    Progress,
    SegmentedControl,
    Select,
} from '@/components/ui';
import {
    APP_CATALOG,
    BACKUPS,
    DEMO_SERVER,
    DNS_RECORDS,
    DOCKER_PROJECTS,
    INVOICES,
    METRIC_SERIES,
    OPERATING_SYSTEMS,
    RECENT_ACTIONS,
} from '@/data/dashboard-demo';
import {
    DashboardPageShell,
    DemoAction,
    DemoNotice,
    KeyValueRows,
    MiniChart,
    PageHeading,
    SectionCard,
    ServerNavigation,
    StatCard,
} from '@/components/dashboard/dashboard-kit';

const MONITORING_PERIODS = ['24 horas', '7 dias', '30 dias'].map((value) => ({
    value,
    label: value,
}));
const DOCKER_TABS = [
    { value: 'projects', label: 'Projetos' },
    { value: 'credentials', label: 'Credenciais' },
    { value: 'catalog', label: 'Catálogo' },
] as const;

function ServerShell({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <DashboardPageShell title={title}>
            <DemoNotice />
            <ServerNavigation />
            {children}
        </DashboardPageShell>
    );
}

export function ServerListPage() {
    return (
        <DashboardPageShell title="Servidores">
            <DemoNotice />
            <PageHeading
                title="Seus servidores"
                description="Acompanhe o estado, os recursos e o acesso às suas instâncias."
                actions={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                        Criar VPS
                    </Button>
                }
            />
            <Card className="overflow-hidden">
                <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 border-b border-border px-5 py-3 text-xs font-medium tracking-wider text-muted-foreground uppercase md:grid">
                    <span>Servidor</span>
                    <span>Endereço</span>
                    <span>Plano</span>
                    <span>Status</span>
                    <span>Ação</span>
                </div>
                <div className="grid gap-4 p-5 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-center">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                            <Server className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="font-semibold text-foreground">
                                {DEMO_SERVER.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {DEMO_SERVER.os} · KVM
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="font-mono text-sm text-foreground">
                            {DEMO_SERVER.ipv4}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            IPv4 público
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            {DEMO_SERVER.plan}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {DEMO_SERVER.cpu} vCPU · {DEMO_SERVER.ram} GB
                        </p>
                    </div>
                    <Badge variant="success" dot className="w-fit">
                        Em atividade
                    </Badge>
                    <Button asChild size="sm" variant="secondary">
                        <Link href={`/dashboard/servers/${DEMO_SERVER.id}`}>
                            Gerenciar
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </Card>
        </DashboardPageShell>
    );
}

export function ServerOverviewPage() {
    return (
        <ServerShell title="Visão geral da VPS">
            <PageHeading
                title="Visão geral"
                description="Estado atual, consumo de recursos e dados essenciais da instância."
                actions={
                    <>
                        <DemoAction>
                            <Power className="mr-1 inline h-3.5 w-3.5" />
                            Reiniciar
                        </DemoAction>
                        <Button
                            size="sm"
                            leftIcon={<Terminal className="h-4 w-4" />}
                        >
                            Abrir terminal
                        </Button>
                    </>
                }
            />
            <SectionCard className="mb-5">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
                            <Cloud className="h-7 w-7" />
                        </span>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-semibold">
                                    {DEMO_SERVER.name}
                                </h3>
                                <Badge variant="success" dot>
                                    Online
                                </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {DEMO_SERVER.os} · KVM · {DEMO_SERVER.location}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                        {[
                            ['Plano', DEMO_SERVER.plan],
                            ['Validade', DEMO_SERVER.validUntil],
                            ['Uptime', DEMO_SERVER.uptime],
                            ['IPv4', DEMO_SERVER.ipv4],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <p className="text-xs text-muted-foreground">
                                    {label}
                                </p>
                                <p className="mt-1 text-sm font-medium">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionCard>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="CPU"
                    value="47%"
                    detail={`${DEMO_SERVER.cpu} vCPU`}
                    icon={<Cpu className="h-5 w-5" />}
                />
                <StatCard
                    label="Memória"
                    value="5,2 GB"
                    detail={`de ${DEMO_SERVER.ram} GB`}
                    icon={<MemoryStick className="h-5 w-5" />}
                />
                <StatCard
                    label="Disco"
                    value="36 GB"
                    detail={`de ${DEMO_SERVER.disk} GB`}
                    icon={<HardDrive className="h-5 w-5" />}
                />
                <StatCard
                    label="Banda"
                    value="0,8 TB"
                    detail={`de ${DEMO_SERVER.bandwidth} TB`}
                    icon={<Activity className="h-5 w-5" />}
                />
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
                <SectionCard
                    title="Acesso ao servidor"
                    action={
                        <DemoAction>
                            <Copy className="mr-1 inline h-3.5 w-3.5" />
                            Copiar SSH
                        </DemoAction>
                    }
                >
                    <KeyValueRows
                        rows={[
                            [
                                'Comando SSH',
                                <code>ssh root@{DEMO_SERVER.ipv4}</code>,
                            ],
                            ['Usuário', 'root'],
                            ['IPv6', DEMO_SERVER.ipv6],
                            ['Chaves SSH', '2 cadastradas'],
                        ]}
                    />
                </SectionCard>
                <SectionCard
                    title="Detalhes do plano"
                    action={<DemoAction>Fazer upgrade</DemoAction>}
                >
                    <KeyValueRows
                        rows={[
                            ['Plano atual', DEMO_SERVER.plan],
                            [
                                'Processamento',
                                `${DEMO_SERVER.cpu} vCPU AMD EPYC`,
                            ],
                            ['Memória', `${DEMO_SERVER.ram} GB DDR5`],
                            ['Armazenamento', `${DEMO_SERVER.disk} GB NVMe`],
                        ]}
                    />
                </SectionCard>
            </div>
            <SectionCard title="Ações recentes" className="mt-5">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left text-sm">
                        <thead className="text-xs tracking-wider text-muted-foreground uppercase">
                            <tr>
                                <th className="pb-3 font-medium">Ação</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium">
                                    Executada em
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {RECENT_ACTIONS.slice(0, 4).map((item) => (
                                <tr key={item.action}>
                                    <td className="py-3 font-mono text-xs">
                                        {item.action}
                                    </td>
                                    <td className="py-3">
                                        <Badge variant="success" dot>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="py-3 text-muted-foreground">
                                        {item.at}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
        </ServerShell>
    );
}

export function MonitoringPage() {
    const [period, setPeriod] = useState('24 horas');
    const charts = [
        {
            title: 'Uso da CPU',
            value: '47%',
            values: METRIC_SERIES.cpu,
            icon: Cpu,
        },
        {
            title: 'Uso de memória',
            value: '5,2 / 8 GB',
            values: METRIC_SERIES.ram,
            icon: MemoryStick,
        },
        {
            title: 'Espaço em disco',
            value: '36 / 100 GB',
            values: METRIC_SERIES.disk,
            icon: HardDrive,
        },
        {
            title: 'Tráfego de rede',
            value: '18,6 MB/s',
            values: METRIC_SERIES.network,
            icon: Network,
        },
    ];
    return (
        <ServerShell title="Monitoramento">
            <PageHeading
                title="Uso do servidor"
                description="Séries temporais demonstrativas para validar a hierarquia e a leitura dos gráficos."
                actions={
                    <SegmentedControl
                        label="Período"
                        value={period}
                        options={MONITORING_PERIODS}
                        onChange={setPeriod}
                    />
                }
            />
            <div className="grid gap-5 xl:grid-cols-2">
                {charts.map(({ title, value, values, icon: Icon }) => (
                    <SectionCard
                        key={title}
                        title={title}
                        action={
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-primary-light" />
                                <strong>{value}</strong>
                            </div>
                        }
                    >
                        <div className="mb-2 grid grid-cols-4 text-[10px] text-muted-foreground">
                            <span>Agora -24h</span>
                            <span className="text-center">-16h</span>
                            <span className="text-center">-8h</span>
                            <span className="text-right">Agora</span>
                        </div>
                        <MiniChart
                            values={values}
                            label={`${title}, ${period}`}
                        />
                    </SectionCard>
                ))}
            </div>
        </ServerShell>
    );
}

export function DockerPage() {
    const [tab, setTab] = useState<'projects' | 'credentials' | 'catalog'>(
        'projects',
    );
    return (
        <ServerShell title="Gerenciador Docker">
            <PageHeading
                title="Gerenciador Docker"
                description="Projetos Compose, credenciais privadas e catálogo de aplicações."
                actions={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                        Novo projeto
                    </Button>
                }
            />
            <SegmentedControl
                className="mb-5 w-fit"
                label="Área do Docker"
                value={tab}
                options={DOCKER_TABS}
                onChange={setTab}
            />
            {tab === 'projects' && (
                <SectionCard title="Projetos Compose">
                    <div className="divide-y divide-border">
                        {DOCKER_PROJECTS.map((project) => (
                            <div
                                key={project.name}
                                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                                        <Container className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-medium">
                                            {project.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {project.containers} contêineres ·
                                            atualizado {project.updated}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={project.tone} dot>
                                        {project.status}
                                    </Badge>
                                    <DemoAction>Gerenciar</DemoAction>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}
            {tab === 'credentials' && (
                <SectionCard>
                    <div className="flex min-h-64 flex-col items-center justify-center text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
                            <KeyRound className="h-6 w-6" />
                        </span>
                        <h3 className="mt-4 text-lg font-semibold">
                            Registros privados
                        </h3>
                        <p className="mt-2 max-w-md text-sm text-muted-foreground">
                            Adicione credenciais para baixar imagens de
                            registros Docker privados.
                        </p>
                        <Button
                            className="mt-5"
                            size="sm"
                            leftIcon={<Plus className="h-4 w-4" />}
                        >
                            Adicionar credencial
                        </Button>
                    </div>
                </SectionCard>
            )}
            {tab === 'catalog' && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {APP_CATALOG.map((app) => (
                        <Card key={app.name} className="p-5">
                            <div className="flex items-start justify-between">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                                    <Box className="h-5 w-5" />
                                </span>
                                <Badge>{app.category}</Badge>
                            </div>
                            <h3 className="mt-4 font-semibold">{app.name}</h3>
                            <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">
                                {app.description}
                            </p>
                            <DemoAction>Implantar</DemoAction>
                        </Card>
                    ))}
                </div>
            )}
        </ServerShell>
    );
}

export function OperatingSystemPage() {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string | null>(null);
    const filtered = useMemo(
        () =>
            OPERATING_SYSTEMS.filter((os) =>
                os.name.toLowerCase().includes(query.toLowerCase()),
            ),
        [query],
    );
    return (
        <ServerShell title="Sistema operacional">
            <PageHeading
                title="Sistema operacional"
                description="Consulte o sistema atual e prepare uma reinstalação segura."
            />
            <SectionCard title="Sistema atual" className="mb-5">
                <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                        <Terminal className="h-6 w-6" />
                    </span>
                    <div>
                        <p className="font-semibold">{DEMO_SERVER.os}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kernel 6.12 · Arquitetura x86_64 · instalação limpa
                        </p>
                    </div>
                </div>
            </SectionCard>
            <SectionCard
                title="Alterar sistema"
                description="A reinstalação apaga permanentemente os dados do servidor."
                action={
                    <div className="w-full sm:w-64">
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Pesquisar sistema"
                            leftIcon={<Search className="h-4 w-4" />}
                        />
                    </div>
                }
            >
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((os) => (
                        <ChoiceCard
                            key={os.name}
                            selected={selected === os.name}
                            onSelect={() => setSelected(os.name)}
                            title={os.name}
                            description={`Versão ${os.version}`}
                            meta={
                                os.recommended ? (
                                    <Badge variant="primary">Recomendado</Badge>
                                ) : undefined
                            }
                        />
                    ))}
                </div>
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-light" />
                    <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Atenção:</strong> a
                        seleção é apenas demonstrativa. A ação real exigirá
                        confirmação por senha e backup recente.
                    </p>
                </div>
            </SectionCard>
        </ServerShell>
    );
}

export function BackupsPage() {
    return (
        <ServerShell title="Backups e snapshots">
            <PageHeading
                title="Backups e snapshots"
                description="Pontos de restauração armazenados separadamente da instância principal."
                actions={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                        Criar snapshot
                    </Button>
                }
            />
            <div className="mb-5 grid gap-4 sm:grid-cols-3">
                <StatCard
                    label="Rotina"
                    value="Semanal"
                    detail="Domingo às 03:15"
                    icon={<Clock3 className="h-5 w-5" />}
                />
                <StatCard
                    label="Retenção"
                    value="3 cópias"
                    detail="Política atual"
                    icon={<FileClock className="h-5 w-5" />}
                />
                <StatCard
                    label="Espaço usado"
                    value="54,4 GB"
                    detail="Backups isolados"
                    icon={<Database className="h-5 w-5" />}
                />
            </div>
            <SectionCard
                title="Pontos disponíveis"
                action={<DemoAction>Gerenciar agenda</DemoAction>}
            >
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-sm">
                        <thead className="text-xs tracking-wider text-muted-foreground uppercase">
                            <tr>
                                {[
                                    'Criação',
                                    'Tipo',
                                    'Tamanho',
                                    'Status',
                                    '',
                                ].map((label) => (
                                    <th
                                        key={label}
                                        className="pb-3 font-medium"
                                    >
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {BACKUPS.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-4">{item.createdAt}</td>
                                    <td>
                                        <Badge>{item.type}</Badge>
                                    </td>
                                    <td>{item.size}</td>
                                    <td>
                                        <Badge variant="success" dot>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="text-right">
                                        <DemoAction>Restaurar</DemoAction>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
            <SectionCard title="Histórico de operações" className="mt-5">
                <div className="divide-y divide-border">
                    {RECENT_ACTIONS.map((item) => (
                        <div
                            key={item.action}
                            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                        >
                            <code className="text-xs">{item.action}</code>
                            <div className="flex items-center gap-3">
                                <Badge variant="success" dot>
                                    {item.status}
                                </Badge>
                                <span className="hidden text-xs text-muted-foreground sm:block">
                                    {item.at}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </ServerShell>
    );
}

export function SecurityPage() {
    return (
        <ServerShell title="Segurança">
            <PageHeading
                title="Segurança"
                description="Chaves de acesso, firewall e proteção do sistema em uma única visão."
            />
            <div className="grid gap-4 sm:grid-cols-3">
                <StatCard
                    label="Chaves SSH"
                    value="2"
                    detail="Acesso por senha desativado"
                    icon={<KeyRound className="h-5 w-5" />}
                />
                <StatCard
                    label="Regras de firewall"
                    value="4"
                    detail="3 permitir · 1 negar"
                    icon={<ShieldCheck className="h-5 w-5" />}
                />
                <StatCard
                    label="Última verificação"
                    value="Hoje"
                    detail="Nenhuma ameaça"
                    icon={<CheckCircle2 className="h-5 w-5" />}
                />
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
                <SectionCard
                    title="Firewall"
                    action={
                        <Button
                            size="sm"
                            leftIcon={<Plus className="h-4 w-4" />}
                        >
                            Nova regra
                        </Button>
                    }
                >
                    <div className="divide-y divide-border">
                        {[
                            ['SSH', 'TCP · 22', 'Seu IP'],
                            ['HTTP', 'TCP · 80', 'Todos'],
                            ['HTTPS', 'TCP · 443', 'Todos'],
                            ['Banco de dados', 'TCP · 5432', 'Rede privada'],
                        ].map(([name, port, source]) => (
                            <div
                                key={name}
                                className="grid grid-cols-[1fr_auto] gap-3 py-3 first:pt-0 last:pb-0 sm:grid-cols-3"
                            >
                                <div>
                                    <p className="text-sm font-medium">
                                        {name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {port}
                                    </p>
                                </div>
                                <span className="hidden text-sm text-muted-foreground sm:block">
                                    {source}
                                </span>
                                <Badge variant="success" className="h-fit">
                                    Permitir
                                </Badge>
                            </div>
                        ))}
                    </div>
                </SectionCard>
                <SectionCard
                    title="Scanner de malware"
                    action={
                        <Badge variant="success" dot>
                            Protegido
                        </Badge>
                    }
                >
                    <div className="flex min-h-48 flex-col items-center justify-center text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-success/20 text-success-light">
                            <ShieldCheck className="h-7 w-7" />
                        </span>
                        <p className="mt-4 text-2xl font-semibold">0 ameaças</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Última verificação hoje às 04:00
                        </p>
                        <DemoAction>Executar verificação</DemoAction>
                    </div>
                </SectionCard>
            </div>
            <SectionCard
                title="Chaves SSH"
                className="mt-5"
                action={<DemoAction>Adicionar chave</DemoAction>}
            >
                <div className="divide-y divide-border">
                    {[
                        [
                            'Notebook principal',
                            'SHA256:qR4w…Px1',
                            '18 set. 2026',
                        ],
                        ['Deploy CI/CD', 'SHA256:nB7k…4fA', '04 set. 2026'],
                    ].map(([name, fingerprint, date]) => (
                        <div
                            key={name}
                            className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-sm font-medium">{name}</p>
                                <p className="mt-1 font-mono text-xs text-muted-foreground">
                                    {fingerprint}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground">
                                    Adicionada em {date}
                                </span>
                                <DemoAction tone="danger">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </DemoAction>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </ServerShell>
    );
}

export function DnsPage() {
    const [name, setName] = useState('');
    return (
        <ServerShell title="DNS">
            <PageHeading
                title="Gerenciador DNS"
                description="Zona demonstrativa vinculada à VPS e pronta para integração com o provedor DNS."
            />
            <SectionCard title="Adicionar registro" className="mb-5">
                <div className="grid gap-3 md:grid-cols-[110px_1fr_1.5fr_110px_auto]">
                    <Select aria-label="Tipo de registro">
                        <option>A</option>
                        <option>AAAA</option>
                        <option>CNAME</option>
                        <option>TXT</option>
                    </Select>
                    <Input
                        placeholder="Nome"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input placeholder="Valor ou destino" />
                    <Input placeholder="TTL" defaultValue="3600" />
                    <Button>Adicionar</Button>
                </div>
            </SectionCard>
            <SectionCard title="Zona lirias.example">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead className="text-xs tracking-wider text-muted-foreground uppercase">
                            <tr>
                                {['Tipo', 'Nome', 'Valor', 'TTL', ''].map(
                                    (label) => (
                                        <th
                                            key={label}
                                            className="pb-3 font-medium"
                                        >
                                            {label}
                                        </th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {DNS_RECORDS.map((record, index) => (
                                <tr
                                    key={`${record.type}-${record.name}-${index}`}
                                >
                                    <td className="py-4">
                                        <Badge variant="primary">
                                            {record.type}
                                        </Badge>
                                    </td>
                                    <td>{record.name}</td>
                                    <td className="max-w-sm truncate font-mono text-xs">
                                        {record.value}
                                    </td>
                                    <td>{record.ttl}</td>
                                    <td className="text-right">
                                        <DemoAction>Editar</DemoAction>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
        </ServerShell>
    );
}

export function ServerSettingsPage() {
    return (
        <ServerShell title="Configurações da VPS">
            <PageHeading
                title="Configurações"
                description="Parâmetros administrativos e ações de recuperação da instância."
            />
            <SectionCard
                title="Acesso root"
                description="Defina uma senha forte apenas quando o acesso por senha estiver habilitado."
                className="mb-5"
            >
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                        type="password"
                        placeholder="Nova senha root"
                        className="sm:min-w-[420px]"
                    />
                    <Button>Salvar senha</Button>
                </div>
            </SectionCard>
            <SectionCard title="Configurações da VPS">
                <div className="divide-y divide-border">
                    {[
                        [
                            ShieldCheck,
                            'Redefinir firewall',
                            'Restaura as regras padrão caso seu IP seja bloqueado',
                            'Redefinir',
                        ],
                        [
                            KeyRound,
                            'Redefinir SSH',
                            'Restaura a configuração do serviço SSH sem apagar suas chaves',
                            'Redefinir',
                        ],
                        [
                            Cloud,
                            'Nome do host',
                            DEMO_SERVER.hostname,
                            'Alterar',
                        ],
                        [
                            Database,
                            'Resolvedores DNS',
                            'Automático · provedor LIRIAS',
                            'Alterar',
                        ],
                        [
                            Trash2,
                            'Limpar logs desnecessários',
                            'Remove logs antigos para liberar espaço em disco',
                            'Executar',
                        ],
                    ].map(([Icon, title, description, action]) => {
                        const I = Icon as typeof ShieldCheck;
                        return (
                            <div
                                key={String(title)}
                                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background-tertiary text-muted-foreground">
                                        <I className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {String(title)}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                            {String(description)}
                                        </p>
                                    </div>
                                </div>
                                <DemoAction>{String(action)}</DemoAction>
                            </div>
                        );
                    })}
                </div>
            </SectionCard>
            <SectionCard
                title="Zona de risco"
                description="Estas ações podem interromper serviços ou apagar dados."
                className="mt-5 border-danger/25"
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-medium">
                            Reinstalar sistema operacional
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Exige confirmação por senha e verificação de backup.
                        </p>
                    </div>
                    <DemoAction tone="danger">Preparar reinstalação</DemoAction>
                </div>
            </SectionCard>
        </ServerShell>
    );
}

export function BillingPage() {
    return (
        <DashboardPageShell title="Faturamento">
            <DemoNotice />
            <PageHeading
                title="Faturamento"
                description="Plano atual, método de pagamento e histórico de faturas."
                actions={
                    <Button
                        size="sm"
                        leftIcon={<Download className="h-4 w-4" />}
                    >
                        Exportar histórico
                    </Button>
                }
            />
            <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
                <SectionCard
                    title="Assinatura atual"
                    action={
                        <Badge variant="success" dot>
                            Ativa
                        </Badge>
                    }
                >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-2xl font-semibold">LIRIAS Pro</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                4 vCPU · 8 GB RAM · 100 GB NVMe
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-2xl font-semibold">R$ 59,90</p>
                            <p className="text-xs text-muted-foreground">
                                por mês · próxima cobrança 10 out.
                            </p>
                        </div>
                    </div>
                    <Progress value={72} className="mt-5" />
                </SectionCard>
                <SectionCard title="Forma de pagamento">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                            <CreditCard className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="font-medium">Mastercard •••• 4242</p>
                            <p className="text-xs text-muted-foreground">
                                Expira em 08/29
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <DemoAction>Alterar pagamento</DemoAction>
                    </div>
                </SectionCard>
            </div>
            <SectionCard title="Faturas" className="mt-5">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-sm">
                        <thead className="text-xs tracking-wider text-muted-foreground uppercase">
                            <tr>
                                {[
                                    'Fatura',
                                    'Descrição',
                                    'Data',
                                    'Valor',
                                    'Status',
                                    '',
                                ].map((label) => (
                                    <th
                                        key={label}
                                        className="pb-3 font-medium"
                                    >
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {INVOICES.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className="py-4 font-mono text-xs">
                                        {invoice.id}
                                    </td>
                                    <td>{invoice.description}</td>
                                    <td>{invoice.date}</td>
                                    <td className="font-medium">
                                        {invoice.amount}
                                    </td>
                                    <td>
                                        <Badge variant="success" dot>
                                            {invoice.status}
                                        </Badge>
                                    </td>
                                    <td className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            className="h-10 w-10 px-0 text-primary-light"
                                            aria-label={`Baixar ${invoice.id}`}
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}

export function AccountPage() {
    return (
        <DashboardPageShell title="Conta">
            <DemoNotice />
            <PageHeading
                title="Conta e equipe"
                description="Dados do perfil, segurança de acesso e permissões da organização."
            />
            <div className="grid gap-5 xl:grid-cols-2">
                <SectionCard title="Perfil">
                    <div className="mb-5 flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary-light">
                            RA
                        </span>
                        <div>
                            <p className="font-semibold">Rodolfo Alves</p>
                            <p className="text-sm text-muted-foreground">
                                Administrador da organização
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Input label="Nome" defaultValue="Rodolfo Alves" />
                        <Input
                            label="E-mail"
                            defaultValue="rodolfo@exemplo.com"
                        />
                    </div>
                    <Button size="sm" className="mt-5">
                        Salvar perfil
                    </Button>
                </SectionCard>
                <SectionCard title="Segurança da conta">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
                            <div className="flex items-center gap-3">
                                <LockKeyhole className="h-5 w-5 text-primary-light" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Autenticação em duas etapas
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Adicione proteção ao acesso do painel.
                                    </p>
                                </div>
                            </div>
                            <Badge variant="warning">Pendente</Badge>
                        </div>
                        <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
                            <div className="flex items-center gap-3">
                                <KeyRound className="h-5 w-5 text-primary-light" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Senha da conta
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Atualizada há 42 dias.
                                    </p>
                                </div>
                            </div>
                            <DemoAction>Alterar</DemoAction>
                        </div>
                    </div>
                </SectionCard>
            </div>
            <SectionCard
                title="Equipe"
                className="mt-5"
                action={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                        Convidar pessoa
                    </Button>
                }
            >
                <div className="divide-y divide-border">
                    {[
                        [
                            'Rodolfo Alves',
                            'rodolfo@exemplo.com',
                            'Proprietário',
                        ],
                        ['Equipe técnica', 'devops@exemplo.com', 'Operador'],
                    ].map(([name, email, role]) => (
                        <div
                            key={email}
                            className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background-tertiary">
                                    <UserRound className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium">
                                        {name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {email}
                                    </p>
                                </div>
                            </div>
                            <Badge>{role}</Badge>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}

export function SupportPage() {
    return (
        <DashboardPageShell title="Suporte">
            <DemoNotice />
            <PageHeading
                title="Central de suporte"
                description="Abra solicitações e acompanhe o histórico de atendimento."
                actions={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                        Novo chamado
                    </Button>
                }
            />
            <div className="grid gap-4 sm:grid-cols-3">
                <StatCard
                    label="Status da plataforma"
                    value="Operacional"
                    detail="Todos os serviços"
                    icon={<Check className="h-5 w-5" />}
                />
                <StatCard
                    label="Tempo estimado"
                    value="até 4h"
                    detail="Plano LIRIAS Pro"
                    icon={<Clock3 className="h-5 w-5" />}
                />
                <StatCard
                    label="Chamados abertos"
                    value="1"
                    detail="Aguardando sua resposta"
                    icon={<LifeBuoy className="h-5 w-5" />}
                />
            </div>
            <SectionCard title="Seus chamados" className="mt-5">
                <div className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium">
                                #2048 · Dúvida sobre chave SSH
                            </p>
                            <Badge variant="warning">Aguardando cliente</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Atualizado ontem às 16:20
                        </p>
                    </div>
                    <DemoAction>Ver chamado</DemoAction>
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}

export function NetworkOverviewPage() {
    return (
        <DashboardPageShell title="Rede e DNS">
            <DemoNotice />
            <PageHeading
                title="Rede e DNS"
                description="Endereçamento público, tráfego e acesso ao gerenciador DNS da instância."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="IPv4 público"
                    value={DEMO_SERVER.ipv4}
                    detail="Endereço demonstrativo"
                    icon={<Globe2 className="h-5 w-5" />}
                />
                <StatCard
                    label="Entrada"
                    value="2,8 MB/s"
                    detail="Agora"
                    icon={<Download className="h-5 w-5" />}
                />
                <StatCard
                    label="Saída"
                    value="1,4 MB/s"
                    detail="Agora"
                    icon={<Wifi className="h-5 w-5" />}
                />
                <StatCard
                    label="Transferência"
                    value="0,8 TB"
                    detail="de 8 TB mensais"
                    icon={<Gauge className="h-5 w-5" />}
                />
            </div>
            <SectionCard title="Acesso rápido" className="mt-5">
                <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                        href={`/dashboard/servers/${DEMO_SERVER.id}/dns`}
                        className="flex items-center justify-between rounded-xl border border-border p-4 hover:border-primary/40"
                    >
                        <div className="flex items-center gap-3">
                            <Database className="h-5 w-5 text-primary-light" />
                            <div>
                                <p className="font-medium">Gerenciador DNS</p>
                                <p className="text-xs text-muted-foreground">
                                    Editar registros da zona
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href={`/dashboard/servers/${DEMO_SERVER.id}/monitoring`}
                        className="flex items-center justify-between rounded-xl border border-border p-4 hover:border-primary/40"
                    >
                        <div className="flex items-center gap-3">
                            <Activity className="h-5 w-5 text-primary-light" />
                            <div>
                                <p className="font-medium">Tráfego de rede</p>
                                <p className="text-xs text-muted-foreground">
                                    Consultar histórico de uso
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}
