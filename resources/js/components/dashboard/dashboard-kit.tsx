import type { ReactNode } from 'react';
import Link from '@/components/navigation/app-link';
import {
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from '@/lib/routing';
import { ChevronRight, FlaskConical, Server } from 'lucide-react';
import { Badge, Button, Card, Select } from '@/components/ui';
import { DEMO_SERVER, DEMO_SERVERS } from '@/data/dashboard-demo';
import { DashboardTopbar } from './dashboard-topbar';
import { cn } from '@/lib/utils';

export function DashboardPageShell({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    const { openNavigation } = useOutletContext<{
        openNavigation: () => void;
    }>();
    return (
        <>
            <DashboardTopbar title={title} onOpenNavigation={openNavigation} />
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </div>
        </>
    );
}

export function DemoNotice() {
    return (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm">
            <FlaskConical
                className="mt-0.5 h-4 w-4 shrink-0 text-primary-light"
                aria-hidden="true"
            />
            <div>
                <p className="font-medium text-foreground">
                    Ambiente demonstrativo
                </p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    Os dados desta interface são fictícios. Os controles estão
                    preparados para integração com a API e não executam ações
                    reais.
                </p>
            </div>
        </div>
    );
}

export function PageHeading({
    title,
    description,
    actions,
}: {
    title: string;
    description?: string;
    actions?: ReactNode;
}) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h2 className="text-2xl font-semibold text-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
    );
}

export function SectionCard({
    title,
    description,
    action,
    children,
    className,
}: {
    title?: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <Card className={cn('overflow-hidden', className)}>
            {(title || description || action) && (
                <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        {title && (
                            <h3 className="font-semibold text-foreground">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                    {action}
                </div>
            )}
            <div className="p-5">{children}</div>
        </Card>
    );
}

export function StatCard({
    label,
    value,
    detail,
    icon,
}: {
    label: string;
    value: string;
    detail?: string;
    icon?: ReactNode;
}) {
    return (
        <Card variant="data" className="p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
                        {label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-foreground">
                        {value}
                    </p>
                    {detail && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {detail}
                        </p>
                    )}
                </div>
                {icon && (
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                        {icon}
                    </span>
                )}
            </div>
        </Card>
    );
}

export function MiniChart({
    values,
    label,
    className,
}: {
    values: number[];
    label: string;
    className?: string;
}) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const points = values
        .map(
            (value, index) =>
                `${(index / (values.length - 1)) * 100},${42 - ((value - min) / range) * 34}`,
        )
        .join(' ');
    const gradientId = `chart-${label.replace(/\s/g, '-')}`;
    return (
        <svg
            viewBox="0 0 100 48"
            role="img"
            aria-label={label}
            className={cn('h-20 w-full overflow-visible', className)}
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.28"
                    />
                    <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0"
                    />
                </linearGradient>
            </defs>
            <path
                d={`M ${points} L 100,48 L 0,48 Z`}
                fill={`url(#${gradientId})`}
            />
            <polyline
                points={points}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

const SERVER_TABS = [
    ['Visão geral', ''],
    ['Monitoramento', '/monitoring'],
    ['Docker', '/docker'],
    ['Aplicações', '/applications'],
    ['Sistema e painel', '/os'],
    ['Backups', '/backups'],
    ['Segurança', '/security'],
    ['DNS', '/dns'],
    ['Acesso', '/access'],
    ['Atividade', '/activity'],
    ['Configurações', '/settings'],
] as const;

const statusLabel = {
    running: 'Online',
    stopped: 'Desligado',
    rebooting: 'Reiniciando',
    provisioning: 'Provisionando',
    error: 'Com erro',
} as const;

export function ServerNavigation() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { serverId = DEMO_SERVER.id } = useParams();
    const server =
        DEMO_SERVERS.find((item) => item.id === serverId) ?? DEMO_SERVER;
    const basePath = `/dashboard/servers/${server.id}`;

    return (
        <div className="mb-6 space-y-3">
            <div className="surface-card flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                        <Server className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-foreground">
                                {server.name}
                            </p>
                            <Badge
                                variant={
                                    server.status === 'running'
                                        ? 'success'
                                        : server.status === 'error'
                                          ? 'danger'
                                          : 'warning'
                                }
                                dot
                            >
                                {statusLabel[server.status]}
                            </Badge>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                            {server.hostname} · {server.ipv4}
                        </p>
                    </div>
                </div>
                <div className="w-full sm:w-auto">
                    <Select
                        label="Trocar VPS"
                        value={server.id}
                        onChange={(event) =>
                            navigate(`/dashboard/servers/${event.target.value}`)
                        }
                        className="h-10 sm:min-w-48"
                    >
                        {DEMO_SERVERS.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Server className="h-3.5 w-3.5" />
                <Link
                    href="/dashboard/servers"
                    className="hover:text-foreground"
                >
                    Servidores
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{server.name}</span>
            </div>

            <nav
                className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1"
                aria-label="Seções do servidor"
            >
                {SERVER_TABS.map(([label, suffix]) => {
                    const href = `${basePath}${suffix}`;
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                                'shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                                active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                            )}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export function KeyValueRows({ rows }: { rows: Array<[string, ReactNode]> }) {
    return (
        <dl className="divide-y divide-border">
            {rows.map(([label, value]) => (
                <div
                    key={label}
                    className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="text-sm font-medium text-foreground">
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

export function DemoAction({
    children,
    tone = 'default',
}: {
    children: ReactNode;
    tone?: 'default' | 'danger';
}) {
    return (
        <Button
            type="button"
            title="Ação demonstrativa"
            size="xs"
            variant={tone === 'danger' ? 'danger' : 'secondary'}
        >
            {children}
        </Button>
    );
}
