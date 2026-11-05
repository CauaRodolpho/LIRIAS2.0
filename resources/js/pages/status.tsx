import { useState } from 'react';
import {
    AlertTriangle,
    Bell,
    CalendarClock,
    Check,
    CheckCircle2,
    ChevronDown,
    CircleGauge,
    Cloud,
    ExternalLink,
    Gauge,
    HardDrive,
    Info,
    Mail,
    MapPin,
    Network,
    Radio,
    Search,
    Server,
    Webhook,
    type LucideIcon,
} from 'lucide-react';
import { Badge, Button, Card, Input, ToggleRow } from '@/components/ui';
import { cn } from '@/lib/utils';

type HealthStatus = 'operational' | 'degraded' | 'maintenance' | 'outage';
type RegionId = 'all' | 'sp1' | 'cwb1' | 'for1';
type HistoryFilter = 'all' | 'resolved' | 'maintenance';

type ComponentItem = {
    name: string;
    status: HealthStatus;
    uptime: string;
};

type ComponentGroup = {
    title: string;
    description: string;
    icon: LucideIcon;
    items: ComponentItem[];
};

const STATUS_META: Record<
    HealthStatus,
    {
        label: string;
        badge: 'success' | 'warning' | 'danger' | 'info';
        dot: string;
    }
> = {
    operational: { label: 'Operacional', badge: 'success', dot: 'bg-success' },
    degraded: {
        label: 'Desempenho degradado',
        badge: 'warning',
        dot: 'bg-warning',
    },
    maintenance: { label: 'Em manutenção', badge: 'info', dot: 'bg-secondary' },
    outage: { label: 'Interrupção', badge: 'danger', dot: 'bg-danger' },
};

const COMPONENT_GROUPS: ComponentGroup[] = [
    {
        title: 'Plataforma',
        description: 'Serviços usados para acessar e administrar a conta.',
        icon: CircleGauge,
        items: [
            { name: 'Painel LIRIAS', status: 'operational', uptime: '99,99%' },
            { name: 'Autenticação', status: 'operational', uptime: '99,98%' },
            { name: 'API pública', status: 'operational', uptime: '99,97%' },
            { name: 'Faturamento', status: 'operational', uptime: '100%' },
            {
                name: 'Central de suporte',
                status: 'operational',
                uptime: '99,99%',
            },
        ],
    },
    {
        title: 'Infraestrutura VPS',
        description: 'Compute, rede, armazenamento e ciclo de vida.',
        icon: Server,
        items: [
            {
                name: 'Provisionamento',
                status: 'operational',
                uptime: '99,94%',
            },
            {
                name: 'Inicialização e reinicialização',
                status: 'operational',
                uptime: '99,96%',
            },
            { name: 'Rede pública', status: 'operational', uptime: '99,99%' },
            { name: 'Rede privada', status: 'operational', uptime: '99,98%' },
            {
                name: 'Armazenamento NVMe',
                status: 'operational',
                uptime: '99,99%',
            },
            {
                name: 'Backups e snapshots',
                status: 'maintenance',
                uptime: '99,95%',
            },
        ],
    },
    {
        title: 'Serviços gerenciados',
        description: 'Recursos adicionais conectados às VPS.',
        icon: Cloud,
        items: [
            { name: 'DNS', status: 'operational', uptime: '100%' },
            { name: 'Firewall', status: 'operational', uptime: '99,99%' },
            { name: 'Terminal web', status: 'operational', uptime: '99,97%' },
            { name: 'Monitoramento', status: 'operational', uptime: '99,96%' },
            {
                name: 'Aplicações e Docker',
                status: 'operational',
                uptime: '99,95%',
            },
        ],
    },
];

const REGIONS = [
    {
        id: 'sp1' as const,
        code: 'SP1',
        city: 'São Paulo',
        country: 'SP',
        status: 'operational' as const,
        latency: '12 ms',
        compute: 'Operacional',
        network: 'Operacional',
        storage: 'Operacional',
    },
    {
        id: 'cwb1' as const,
        code: 'CWB1',
        city: 'Curitiba',
        country: 'PR',
        status: 'maintenance' as const,
        latency: '21 ms',
        compute: 'Operacional',
        network: 'Operacional',
        storage: 'Manutenção',
    },
    {
        id: 'for1' as const,
        code: 'FOR1',
        city: 'Fortaleza',
        country: 'CE',
        status: 'operational' as const,
        latency: '48 ms',
        compute: 'Operacional',
        network: 'Operacional',
        storage: 'Operacional',
    },
];

const INCIDENT_TIMELINE = [
    {
        time: '14:10',
        status: 'Investigando',
        description:
            'Identificamos aumento no tempo de criação de snapshots na região CWB1.',
    },
    {
        time: '14:24',
        status: 'Identificado',
        description:
            'A causa foi isolada em um conjunto de nós de armazenamento.',
    },
    {
        time: '14:38',
        status: 'Mitigando',
        description:
            'Novas solicitações foram direcionadas para capacidade saudável.',
    },
    {
        time: '14:52',
        status: 'Monitorando',
        description: 'Os tempos estão retornando ao intervalo esperado.',
    },
];

const MAINTENANCES = [
    {
        date: 'Hoje',
        time: '23:00–23:30',
        title: 'Atualização do serviço de snapshots',
        region: 'CWB1 · Curitiba',
        impact: 'Criação de snapshots pode apresentar atrasos.',
        action: 'Nenhuma ação necessária',
    },
    {
        date: '02 nov',
        time: '02:00–03:00',
        title: 'Manutenção da rede privada',
        region: 'SP1 · São Paulo',
        impact: 'Novas redes podem levar até 5 minutos para ficar disponíveis.',
        action: 'Evite alterações durante a janela',
    },
];

const HISTORY_ITEMS = [
    {
        id: 1,
        date: '28 out 2026',
        title: 'Atraso na coleta de métricas',
        region: 'SP1',
        duration: '24 min',
        type: 'resolved' as const,
        severity: 'Baixa',
    },
    {
        id: 2,
        date: '21 out 2026',
        title: 'Falhas intermitentes no terminal web',
        region: 'Nacional',
        duration: '41 min',
        type: 'resolved' as const,
        severity: 'Média',
    },
    {
        id: 3,
        date: '14 out 2026',
        title: 'Atualização programada do DNS',
        region: 'Nacional',
        duration: '32 min',
        type: 'maintenance' as const,
        severity: 'Manutenção',
    },
    {
        id: 4,
        date: '06 out 2026',
        title: 'Provisionamento lento em CWB1',
        region: 'CWB1',
        duration: '18 min',
        type: 'resolved' as const,
        severity: 'Baixa',
    },
];

export default function StatusPage() {
    const [serverQuery, setServerQuery] = useState('');
    const [queryResult, setQueryResult] = useState<
        'idle' | 'unaffected' | 'affected'
    >('idle');
    const [regionFilter, setRegionFilter] = useState<RegionId>('all');
    const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all');
    const [subscriptions, setSubscriptions] = useState<string[]>(['E-mail']);

    const visibleRegions =
        regionFilter === 'all'
            ? REGIONS
            : REGIONS.filter((region) => region.id === regionFilter);
    const visibleHistory =
        historyFilter === 'all'
            ? HISTORY_ITEMS
            : HISTORY_ITEMS.filter((item) => item.type === historyFilter);

    const checkServer = () => {
        const normalized = serverQuery.trim().toLowerCase();
        setQueryResult(
            normalized.includes('cwb') || normalized.includes('backup')
                ? 'affected'
                : 'unaffected',
        );
    };

    const toggleSubscription = (channel: string) => {
        setSubscriptions((current) =>
            current.includes(channel)
                ? current.filter((item) => item !== channel)
                : [...current, channel],
        );
    };

    return (
        <main className="min-h-screen bg-background pt-28 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <DemoBanner />

                <section className="mt-5 overflow-hidden rounded-3xl border border-success/25 bg-card">
                    <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
                        <div className="flex items-start gap-5">
                            <span className="relative mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-success/10 text-success-light">
                                <span className="absolute inset-0 animate-ping rounded-2xl border border-success/25 motion-reduce:animate-none" />
                                <CheckCircle2 className="relative h-7 w-7" />
                            </span>
                            <div>
                                <Badge variant="success" dot>
                                    Estado nacional
                                </Badge>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    Todos os sistemas principais estão
                                    operacionais
                                </h1>
                                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                    Existe uma manutenção controlada no serviço
                                    de snapshots em Curitiba, sem impacto nas
                                    VPS em execução.
                                </p>
                                <p className="mt-4 font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                                    Última atualização demonstrativa: hoje,
                                    15:02 BRT
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                            <StatusMetric
                                value="99,98%"
                                label="Uptime 90 dias"
                            />
                            <StatusMetric
                                value="86 ms"
                                label="Latência da API"
                            />
                            <StatusMetric
                                value="99,94%"
                                label="Provisionamentos"
                            />
                            <StatusMetric
                                value="18 min"
                                label="Recuperação média"
                            />
                        </div>
                    </div>
                </section>

                <ImpactLookup
                    query={serverQuery}
                    result={queryResult}
                    onQueryChange={setServerQuery}
                    onCheck={checkServer}
                />

                <section className="mt-20">
                    <SectionHeading
                        eyebrow="Saúde dos serviços"
                        title="Infraestrutura organizada por contexto"
                        description="Expanda cada grupo para consultar componentes, estado atual e disponibilidade demonstrativa dos últimos 90 dias."
                    />
                    <div className="mt-10 space-y-4">
                        {COMPONENT_GROUPS.map((group) => (
                            <ComponentGroupCard
                                key={group.title}
                                group={group}
                            />
                        ))}
                    </div>
                </section>

                <RegionsSection
                    selected={regionFilter}
                    onSelect={setRegionFilter}
                    regions={visibleRegions}
                />
                <IncidentSection />
                <MaintenanceSection />
                <HistorySection
                    filter={historyFilter}
                    onFilter={setHistoryFilter}
                    items={visibleHistory}
                />
                <NotificationSection
                    selected={subscriptions}
                    onToggle={toggleSubscription}
                />
            </div>
        </main>
    );
}

function DemoBanner() {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
            <p className="text-xs leading-5 text-muted-foreground">
                <strong className="text-foreground">
                    Status Center em modo demonstrativo.
                </strong>{' '}
                Estados, métricas, regiões, datas e incidentes desta página não
                representam a disponibilidade real da infraestrutura.
            </p>
        </div>
    );
}

function ImpactLookup({
    query,
    result,
    onQueryChange,
    onCheck,
}: {
    query: string;
    result: 'idle' | 'unaffected' | 'affected';
    onQueryChange: (value: string) => void;
    onCheck: () => void;
}) {
    return (
        <section className="mt-6 rounded-2xl border border-border bg-background-secondary p-5 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
                <div>
                    <p className="font-mono text-xs font-semibold tracking-[0.17em] text-primary-light uppercase">
                        Impacto personalizado
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-foreground">
                        Minha VPS foi afetada?
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Digite um identificador demonstrativo. Servidores
                        contendo “CWB” ou “BACKUP” simulam impacto parcial.
                    </p>
                </div>
                <div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Input
                            value={query}
                            onChange={(event) =>
                                onQueryChange(event.target.value)
                            }
                            onKeyDown={(event) =>
                                event.key === 'Enter' && onCheck()
                            }
                            placeholder="Ex.: lirias-node-01"
                            aria-label="Identificador da VPS"
                            className="flex-1"
                        />
                        <Button
                            onClick={onCheck}
                            disabled={!query.trim()}
                            leftIcon={<Search className="h-4 w-4" />}
                        >
                            Verificar impacto
                        </Button>
                    </div>
                    {result !== 'idle' ? (
                        <div
                            className={cn(
                                'mt-3 flex items-start gap-3 rounded-xl border p-4',
                                result === 'affected'
                                    ? 'border-warning/25 bg-warning/5'
                                    : 'border-success/25 bg-success/5',
                            )}
                            role="status"
                        >
                            {result === 'affected' ? (
                                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-light" />
                            ) : (
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-light" />
                            )}
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    {result === 'affected'
                                        ? 'Possível impacto parcial'
                                        : 'Nenhum impacto identificado'}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    {result === 'affected'
                                        ? 'Snapshots podem apresentar atraso. A VPS continua em execução e não exige ação.'
                                        : 'Os serviços relacionados a esta VPS aparecem operacionais no cenário demonstrativo.'}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

function ComponentGroupCard({ group }: { group: ComponentGroup }) {
    const Icon = group.icon;
    const summaryStatus: HealthStatus = group.items.some(
        (item) => item.status === 'outage',
    )
        ? 'outage'
        : group.items.some((item) => item.status === 'degraded')
          ? 'degraded'
          : group.items.some((item) => item.status === 'maintenance')
            ? 'maintenance'
            : 'operational';
    const meta = STATUS_META[summaryStatus];

    return (
        <details
            className="group overflow-hidden rounded-2xl border border-border bg-card"
            open={group.title === 'Infraestrutura VPS'}
        >
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-inset sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary-light">
                    <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">
                        {group.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {group.description}
                    </p>
                </div>
                <Badge variant={meta.badge} dot>
                    {meta.label}
                </Badge>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-border">
                {group.items.map((item) => {
                    const itemMeta = STATUS_META[item.status];
                    return (
                        <div
                            key={item.name}
                            className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_120px_180px] sm:px-6"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={cn(
                                        'h-2 w-2 rounded-full',
                                        itemMeta.dot,
                                    )}
                                />
                                <p className="text-sm font-medium text-foreground">
                                    {item.name}
                                </p>
                            </div>
                            <p className="hidden text-right font-mono text-xs text-muted-foreground sm:block">
                                {item.uptime} em 90 dias
                            </p>
                            <div className="text-right">
                                <Badge variant={itemMeta.badge}>
                                    {itemMeta.label}
                                </Badge>
                            </div>
                        </div>
                    );
                })}
            </div>
        </details>
    );
}

function RegionsSection({
    selected,
    onSelect,
    regions,
}: {
    selected: RegionId;
    onSelect: (id: RegionId) => void;
    regions: typeof REGIONS;
}) {
    return (
        <section className="mt-20">
            <SectionHeading
                eyebrow="Regiões"
                title="Estado por localização"
                description="Compare compute, rede, armazenamento e latência aproximada de cada região demonstrativa."
            />
            <div
                className="mt-8 flex flex-wrap justify-center gap-2"
                role="group"
                aria-label="Filtrar regiões"
            >
                {[
                    ['all', 'Todas'],
                    ['sp1', 'São Paulo'],
                    ['cwb1', 'Curitiba'],
                    ['for1', 'Fortaleza'],
                ].map(([id, label]) => (
                    <Button
                        key={id}
                        size="sm"
                        variant={selected === id ? 'primary' : 'secondary'}
                        onClick={() => onSelect(id as RegionId)}
                    >
                        {label}
                    </Button>
                ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {regions.map((region) => {
                    const meta = STATUS_META[region.status];
                    return (
                        <Card key={region.id} className="p-6">
                            <div className="flex items-start justify-between gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-primary-light">
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <Badge variant={meta.badge} dot>
                                    {meta.label}
                                </Badge>
                            </div>
                            <p className="mt-5 font-mono text-xs text-primary-light">
                                {region.code}
                            </p>
                            <h3 className="mt-1 text-lg font-semibold text-foreground">
                                {region.city}, {region.country}
                            </h3>
                            <div className="mt-5 space-y-3 border-t border-border pt-4">
                                <RegionRow
                                    icon={Server}
                                    label="Compute"
                                    value={region.compute}
                                />
                                <RegionRow
                                    icon={Network}
                                    label="Rede"
                                    value={region.network}
                                />
                                <RegionRow
                                    icon={HardDrive}
                                    label="Armazenamento"
                                    value={region.storage}
                                />
                                <RegionRow
                                    icon={Gauge}
                                    label="Latência aproximada"
                                    value={region.latency}
                                />
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}

function IncidentSection() {
    return (
        <section className="mt-20">
            <SectionHeading
                eyebrow="Incidente em acompanhamento"
                title="Atualizações organizadas em uma linha do tempo"
                description="Cada comunicação informa impacto, região, mitigação e quando será publicada a próxima atualização."
            />
            <Card className="mt-10 overflow-hidden p-0">
                <div className="border-b border-warning/25 bg-warning/5 p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning-light">
                                <AlertTriangle className="h-5 w-5" />
                            </span>
                            <div>
                                <Badge variant="warning" dot>
                                    Monitorando
                                </Badge>
                                <h3 className="mt-3 text-xl font-semibold text-foreground">
                                    Atraso na criação de snapshots em Curitiba
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    VPS em execução não foram afetadas. Próxima
                                    atualização demonstrativa às 15:20 BRT.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg border border-border bg-card px-3 py-2 text-right">
                            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                Severidade
                            </p>
                            <p className="mt-1 text-sm font-semibold text-warning-light">
                                Baixa
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-[1fr_280px]">
                    <div className="p-5 sm:p-6">
                        <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-border">
                            {INCIDENT_TIMELINE.map((entry, index) => (
                                <div
                                    key={entry.time}
                                    className="relative grid grid-cols-[12px_52px_1fr] gap-3"
                                >
                                    <span
                                        className={cn(
                                            'relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 border-card',
                                            index ===
                                                INCIDENT_TIMELINE.length - 1
                                                ? 'bg-warning'
                                                : 'bg-primary',
                                        )}
                                    />
                                    <time className="font-mono text-xs text-muted-foreground">
                                        {entry.time}
                                    </time>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            {entry.status}
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            {entry.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <aside className="border-t border-border bg-background-secondary p-5 lg:border-t-0 lg:border-l">
                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            Escopo do impacto
                        </p>
                        <div className="mt-4 space-y-4">
                            <IncidentFact
                                label="Região"
                                value="CWB1 · Curitiba"
                            />
                            <IncidentFact
                                label="Serviço"
                                value="Backups e snapshots"
                            />
                            <IncidentFact
                                label="Ação do cliente"
                                value="Nenhuma necessária"
                            />
                            <IncidentFact
                                label="VPS em execução"
                                value="Não afetadas"
                            />
                        </div>
                    </aside>
                </div>
            </Card>
        </section>
    );
}

function MaintenanceSection() {
    return (
        <section className="mt-20">
            <SectionHeading
                eyebrow="Manutenções programadas"
                title="Planejamento no horário do cliente"
                description="As janelas abaixo usam BRT como exemplo e explicam duração, impacto esperado e necessidade de ação."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {MAINTENANCES.map((maintenance) => (
                    <Card key={maintenance.title} className="p-6">
                        <div className="flex items-start gap-4">
                            <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary-light">
                                <span className="text-[9px] uppercase">
                                    {maintenance.date.split(' ')[0]}
                                </span>
                                <strong className="text-sm">
                                    {maintenance.date.split(' ')[1] ?? '29'}
                                </strong>
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="info">Programada</Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {maintenance.time} BRT
                                    </span>
                                </div>
                                <h3 className="mt-3 font-semibold text-foreground">
                                    {maintenance.title}
                                </h3>
                                <p className="mt-1 text-xs text-primary-light">
                                    {maintenance.region}
                                </p>
                                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                    {maintenance.impact}
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-foreground">
                                    <Check className="h-4 w-4 text-success-light" />
                                    {maintenance.action}
                                </div>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="mt-5 w-full"
                            leftIcon={<CalendarClock className="h-4 w-4" />}
                        >
                            Adicionar ao calendário
                        </Button>
                    </Card>
                ))}
            </div>
        </section>
    );
}

function HistorySection({
    filter,
    onFilter,
    items,
}: {
    filter: HistoryFilter;
    onFilter: (filter: HistoryFilter) => void;
    items: typeof HISTORY_ITEMS;
}) {
    return (
        <section className="mt-20">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <SectionHeading
                    eyebrow="Histórico"
                    title="Incidentes e manutenções anteriores"
                    description="Consulte duração, escopo e classificação dos eventos demonstrativos."
                    align="left"
                />
                <div
                    className="flex gap-2"
                    role="group"
                    aria-label="Filtrar histórico"
                >
                    <Button
                        size="sm"
                        variant={filter === 'all' ? 'primary' : 'secondary'}
                        onClick={() => onFilter('all')}
                    >
                        Todos
                    </Button>
                    <Button
                        size="sm"
                        variant={
                            filter === 'resolved' ? 'primary' : 'secondary'
                        }
                        onClick={() => onFilter('resolved')}
                    >
                        Incidentes
                    </Button>
                    <Button
                        size="sm"
                        variant={
                            filter === 'maintenance' ? 'primary' : 'secondary'
                        }
                        onClick={() => onFilter('maintenance')}
                    >
                        Manutenções
                    </Button>
                </div>
            </div>
            <Card className="mt-8 overflow-hidden p-0">
                <div className="divide-y divide-border">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="grid gap-3 p-5 sm:grid-cols-[120px_1fr_auto] sm:items-center"
                        >
                            <div>
                                <p className="font-mono text-xs text-muted-foreground">
                                    {item.date}
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    {item.duration}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    {item.title}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {item.region}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={
                                        item.type === 'resolved'
                                            ? 'success'
                                            : 'info'
                                    }
                                >
                                    {item.type === 'resolved'
                                        ? 'Resolvido'
                                        : 'Concluída'}
                                </Badge>
                                <Button
                                    size="xs"
                                    variant="ghost"
                                    rightIcon={
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    }
                                >
                                    Detalhes
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
}

function NotificationSection({
    selected,
    onToggle,
}: {
    selected: string[];
    onToggle: (channel: string) => void;
}) {
    const channels = [
        { name: 'E-mail', icon: Mail, description: 'Incidentes e manutenções' },
        {
            name: 'Webhook',
            icon: Webhook,
            description: 'Integração com seus sistemas',
        },
        {
            name: 'Discord',
            icon: Radio,
            description: 'Atualizações em um canal',
        },
    ];

    return (
        <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card p-6 sm:p-10">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,hsl(var(--primary)/0.14),transparent_34%)]"
                    aria-hidden="true"
                />
                <div className="relative grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
                    <div>
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary-light">
                            <Bell className="h-5 w-5" />
                        </span>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
                            Receba apenas os alertas importantes para você
                        </h2>
                        <p className="mt-4 text-sm leading-6 text-muted-foreground">
                            Escolha canais e, futuramente, filtre por região,
                            componente e severidade.
                        </p>
                    </div>
                    <div className="space-y-3">
                        {channels.map(({ name, icon: Icon, description }) => {
                            const active = selected.includes(name);
                            return (
                                <ToggleRow
                                    key={name}
                                    checked={active}
                                    onCheckedChange={() => onToggle(name)}
                                    leading={
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-primary-light">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                    }
                                    title={name}
                                    description={description}
                                />
                            );
                        })}
                        <Button
                            className="mt-2 w-full"
                            disabled={selected.length === 0}
                        >
                            Salvar preferências demonstrativas
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'center',
}: {
    eyebrow: string;
    title: string;
    description: string;
    align?: 'left' | 'center';
}) {
    return (
        <div
            className={cn(
                'max-w-3xl',
                align === 'center' && 'mx-auto text-center',
            )}
        >
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary-light uppercase">
                {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

function StatusMetric({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-lg font-bold text-foreground">{value}</p>
            <p className="mt-1 text-[10px] tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
        </div>
    );
}

function RegionRow({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-xs text-muted-foreground">
                {label}
            </span>
            <span className="text-xs font-medium text-foreground">{value}</span>
        </div>
    );
}

function IncidentFact({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
        </div>
    );
}
