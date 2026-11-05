import { useMemo, useState } from 'react';
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Cpu,
    Database,
    FileClock,
    HardDrive,
    MemoryStick,
    Search,
    Server,
    ShieldCheck,
} from 'lucide-react';
import { useParams } from '@/lib/routing';
import {
    BACKUPS,
    DEMO_SERVER,
    DEMO_SERVERS,
    METRIC_SERIES,
    OPERATING_SYSTEMS,
    RECENT_ACTIONS,
} from '@/data/dashboard-demo';
import {
    Badge,
    Button,
    ChoiceCard,
    Dialog,
    Input,
    Progress,
    ResponsiveDataTable,
    SegmentedControl,
    Select,
    StatePanel,
} from '@/components/ui';
import {
    DashboardPageShell,
    DemoNotice,
    MiniChart,
    PageHeading,
    SectionCard,
    ServerNavigation,
    StatCard,
} from '@/components/dashboard/dashboard-kit';

const PERIOD_OPTIONS = ['24 horas', '7 dias', '30 dias', '1 ano'].map(
    (value) => ({ value, label: value }),
);
const OS_CATEGORY_OPTIONS: Array<{ value: OsCategory; label: string }> = [
    { value: 'pure', label: 'SO puro' },
    { value: 'panel', label: 'SO com painel' },
    { value: 'application', label: 'SO com aplicação' },
];

export function MonitoringPage() {
    const [period, setPeriod] = useState('24 horas');
    const charts = [
        {
            title: 'Uso da CPU',
            value: '47%',
            unit: '%',
            values: METRIC_SERIES.cpu,
            icon: Cpu,
        },
        {
            title: 'Uso de memória',
            value: '5,2 / 8 GB',
            unit: '%',
            values: METRIC_SERIES.ram,
            icon: MemoryStick,
        },
        {
            title: 'Espaço em disco',
            value: '36 / 100 GB',
            unit: '%',
            values: METRIC_SERIES.disk,
            icon: HardDrive,
        },
        {
            title: 'Tráfego de rede',
            value: '18,6 MB/s',
            unit: 'MB/s',
            values: METRIC_SERIES.network,
            icon: Activity,
        },
    ];

    return (
        <DashboardPageShell title="Monitoramento">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Uso do servidor"
                description="Consulte consumo, tendências e limites antes que afetem suas aplicações."
                actions={
                    <SegmentedControl
                        label="Período do monitoramento"
                        value={period}
                        options={PERIOD_OPTIONS}
                        onChange={setPeriod}
                    />
                }
            />
            <div className="grid gap-5 xl:grid-cols-2">
                {charts.map(({ title, value, unit, values, icon: Icon }) => {
                    const average = Math.round(
                        values.reduce((total, current) => total + current, 0) /
                            values.length,
                    );
                    return (
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
                            <div className="mb-4 grid grid-cols-3 gap-3">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase">
                                        Mínimo
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {Math.min(...values)} {unit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase">
                                        Média
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {average} {unit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase">
                                        Máximo
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {Math.max(...values)} {unit}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 text-[10px] text-muted-foreground">
                                <span>Início</span>
                                <span className="text-center">⅓</span>
                                <span className="text-center">⅔</span>
                                <span className="text-right">Agora</span>
                            </div>
                            <MiniChart
                                values={values}
                                label={`${title}, ${period}`}
                                className="h-36"
                            />
                        </SectionCard>
                    );
                })}
            </div>
            <div className="mt-5 flex gap-3 rounded-xl border border-success/25 bg-success/10 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success-light" />
                <div>
                    <p className="text-sm font-medium">
                        Recursos dentro dos limites
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Nenhuma métrica ultrapassou o limite configurado neste
                        período.
                    </p>
                </div>
            </div>
        </DashboardPageShell>
    );
}

export function ServerActivityPage() {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('Todos');
    const filtered = RECENT_ACTIONS.filter(
        (item) =>
            item.action.toLowerCase().includes(query.toLowerCase()) &&
            (status === 'Todos' || item.status === status),
    );
    const badgeVariant = (value: string) =>
        value === 'Sucesso'
            ? ('success' as const)
            : value === 'Falhou'
              ? ('danger' as const)
              : ('warning' as const);

    return (
        <DashboardPageShell title="Atividade do servidor">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Histórico de ações"
                description="Audite operações iniciadas pelo painel, pela API e por rotinas automáticas."
            />
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row">
                <div className="flex-1">
                    <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Pesquisar ação"
                        leftIcon={<Search className="h-4 w-4" />}
                    />
                </div>
                <Select
                    aria-label="Filtrar pelo status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="sm:min-w-48"
                >
                    <option>Todos</option>
                    <option>Sucesso</option>
                    <option>Executando</option>
                    <option>Falhou</option>
                </Select>
            </div>
            <SectionCard>
                <ResponsiveDataTable
                    rows={filtered}
                    headers={[
                        'Ação',
                        'Status',
                        'Origem',
                        'Responsável',
                        'Duração',
                        'Data',
                    ]}
                    getKey={(item) => item.id}
                    renderRow={(item) => (
                        <>
                            <td className="py-4 font-mono text-xs">
                                {item.action}
                            </td>
                            <td>
                                <Badge variant={badgeVariant(item.status)} dot>
                                    {item.status}
                                </Badge>
                            </td>
                            <td>{item.origin}</td>
                            <td>{item.actor}</td>
                            <td>{item.duration}</td>
                            <td className="text-muted-foreground">{item.at}</td>
                        </>
                    )}
                    renderCard={(item) => (
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <code className="text-xs font-medium text-foreground">
                                    {item.action}
                                </code>
                                <Badge variant={badgeVariant(item.status)} dot>
                                    {item.status}
                                </Badge>
                            </div>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                                <div>
                                    <dt className="text-muted-foreground">
                                        Origem
                                    </dt>
                                    <dd className="mt-1 text-foreground">
                                        {item.origin}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">
                                        Responsável
                                    </dt>
                                    <dd className="mt-1 text-foreground">
                                        {item.actor}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">
                                        Duração
                                    </dt>
                                    <dd className="mt-1 text-foreground">
                                        {item.duration}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">
                                        Data
                                    </dt>
                                    <dd className="mt-1 text-foreground">
                                        {item.at}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    )}
                    empty={
                        <StatePanel
                            compact
                            kind="empty"
                            title="Nenhuma operação encontrada"
                            description="Ajuste a pesquisa ou o filtro de status."
                        />
                    }
                />
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span>{filtered.length} operações encontradas</span>
                    <span>Página 1 de 1</span>
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}

export function BackupsPage() {
    const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
    const [restoring, setRestoring] = useState(false);

    const restore = () => {
        setRestoring(true);
        window.setTimeout(() => {
            setRestoring(false);
            setSelectedBackup(null);
        }, 1800);
    };

    return (
        <DashboardPageShell title="Backups e snapshots">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Backups e snapshots"
                description="Proteção automática, pontos manuais e restauração controlada da instância."
                actions={<Button size="sm">Criar snapshot</Button>}
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
                    detail="Armazenadas separadamente"
                    icon={<FileClock className="h-5 w-5" />}
                />
                <StatCard
                    label="Próximo backup"
                    value="4 dias"
                    detail="Execução automática"
                    icon={<Database className="h-5 w-5" />}
                />
            </div>
            <SectionCard
                title="Pontos disponíveis"
                action={
                    <Button size="sm" variant="secondary">
                        Gerenciar programação
                    </Button>
                }
            >
                <ResponsiveDataTable
                    rows={BACKUPS}
                    headers={[
                        'Criação',
                        'Tipo',
                        'Local',
                        'Tamanho',
                        'Sistema',
                        'Restauração',
                        '',
                    ]}
                    getKey={(item) => item.id}
                    minWidth="900px"
                    renderRow={(item) => (
                        <>
                            <td className="py-4">{item.createdAt}</td>
                            <td>
                                <Badge>{item.type}</Badge>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.size}</td>
                            <td>{item.os}</td>
                            <td>{item.restoreTime}</td>
                            <td className="text-right">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setSelectedBackup(item.id)}
                                >
                                    Restaurar
                                </Button>
                            </td>
                        </>
                    )}
                    renderCard={(item) => (
                        <div>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-medium">
                                        {item.createdAt}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {item.os} · {item.location}
                                    </p>
                                </div>
                                <Badge>{item.type}</Badge>
                            </div>
                            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <dt className="text-muted-foreground">
                                        Tamanho
                                    </dt>
                                    <dd className="mt-1 text-foreground">
                                        {item.size}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">
                                        Tempo estimado
                                    </dt>
                                    <dd className="mt-1 text-foreground">
                                        {item.restoreTime}
                                    </dd>
                                </div>
                            </dl>
                            <Button
                                className="mt-4 w-full"
                                size="sm"
                                variant="secondary"
                                onClick={() => setSelectedBackup(item.id)}
                            >
                                Restaurar este ponto
                            </Button>
                        </div>
                    )}
                />
            </SectionCard>
            <Dialog
                open={Boolean(selectedBackup)}
                onOpenChange={(open) => {
                    if (!open && !restoring) setSelectedBackup(null);
                }}
                title={`Restaurar ${selectedBackup ?? 'backup'}?`}
                description="O estado atual da VPS será substituído. Durante a restauração, outras operações ficarão bloqueadas."
                footer={
                    <>
                        <Button
                            variant="secondary"
                            disabled={restoring}
                            onClick={() => setSelectedBackup(null)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            disabled={restoring}
                            isLoading={restoring}
                            onClick={restore}
                        >
                            {restoring
                                ? 'Restaurando'
                                : 'Confirmar restauração'}
                        </Button>
                    </>
                }
            >
                <div className="flex gap-3 rounded-lg border border-warning/30 bg-warning/10 p-4">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-warning-light" />
                    <p className="text-sm leading-6 text-muted-foreground">
                        Confirme que existe uma cópia recente dos dados criados
                        após este ponto de restauração.
                    </p>
                </div>
                {restoring ? <Progress value={68} className="mt-4" /> : null}
            </Dialog>
        </DashboardPageShell>
    );
}

type OsCategory = 'pure' | 'panel' | 'application';

export function OperatingSystemPage() {
    const { serverId = DEMO_SERVER.id } = useParams();
    const server =
        DEMO_SERVERS.find((item) => item.id === serverId) ?? DEMO_SERVER;
    const [category, setCategory] = useState<OsCategory>('pure');
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string | null>(null);
    const [confirmation, setConfirmation] = useState('');
    const filtered = useMemo(
        () =>
            OPERATING_SYSTEMS.filter(
                (os) =>
                    os.category === category &&
                    os.name.toLowerCase().includes(query.toLowerCase()),
            ),
        [category, query],
    );

    return (
        <DashboardPageShell title="Sistema operacional">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Sistema operacional"
                description="Consulte a instalação atual e prepare imagens puras, painéis ou aplicações pré-configuradas."
            />
            <SectionCard title="Sistema atual" className="mb-5">
                <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                        <Server className="h-6 w-6" />
                    </span>
                    <div>
                        <p className="font-semibold">{server.os}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kernel 6.12 · x86_64 · instalação limpa
                        </p>
                    </div>
                    <Badge variant="success" className="ml-auto">
                        Em uso
                    </Badge>
                </div>
            </SectionCard>
            <SectionCard
                title="Mudar sistema"
                description="Escolha uma imagem. A reinstalação apaga permanentemente os dados da VPS."
                action={
                    <div className="w-full sm:w-64">
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Pesquisar sistema"
                        />
                    </div>
                }
            >
                <SegmentedControl
                    className="mb-5"
                    label="Tipo de imagem"
                    value={category}
                    options={OS_CATEGORY_OPTIONS}
                    onChange={setCategory}
                />
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((os) => (
                        <ChoiceCard
                            key={os.name}
                            selected={selected === os.name}
                            onSelect={() => {
                                setSelected(os.name);
                                setConfirmation('');
                            }}
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
            </SectionCard>
            <Dialog
                open={Boolean(selected)}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelected(null);
                        setConfirmation('');
                    }
                }}
                title={`Reinstalar com ${selected ?? 'nova imagem'}?`}
                description="A reinstalação apaga permanentemente o sistema e os dados atuais da VPS."
                footer={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSelected(null);
                                setConfirmation('');
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            disabled={confirmation !== server.hostname}
                            onClick={() => {
                                setSelected(null);
                                setConfirmation('');
                            }}
                        >
                            Reinstalar sistema
                        </Button>
                    </>
                }
            >
                <div className="rounded-lg border border-danger/25 bg-danger/5 p-4">
                    <p className="text-sm leading-6 text-muted-foreground">
                        Confirme o backup e digite{' '}
                        <strong className="text-foreground">
                            {server.hostname}
                        </strong>{' '}
                        para liberar a ação.
                    </p>
                    <Input
                        className="mt-4"
                        label="Hostname da VPS"
                        value={confirmation}
                        onChange={(event) =>
                            setConfirmation(event.target.value)
                        }
                        placeholder={server.hostname}
                        autoComplete="off"
                    />
                </div>
            </Dialog>
            <SectionCard
                title="Licenças"
                description="Painéis comerciais poderão exigir uma licença vinculada ao plano."
                className="mt-5"
            >
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-medium">Nenhuma licença ativa</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            cPanel, Plesk e outros painéis aparecerão aqui.
                        </p>
                    </div>
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}
