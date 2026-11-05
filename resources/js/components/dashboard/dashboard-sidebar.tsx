'use client';

import Link from '@/components/navigation/app-link';
import { useCurrentPath } from '@/hooks/use-current-path';
import {
    Activity,
    ArrowLeft,
    Boxes,
    Container,
    CreditCard,
    DatabaseBackup,
    Globe2,
    KeyRound,
    LayoutDashboard,
    LifeBuoy,
    LogOut,
    MonitorCog,
    Server,
    Settings2,
    ShieldCheck,
    UserRound,
} from 'lucide-react';
import { DEMO_SERVER, DEMO_SERVERS } from '@/data/dashboard-demo';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
    className?: string;
    onNavigate?: () => void;
}

const ACCOUNT_ITEMS = [
    { label: 'Início', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Servidores', href: '/dashboard/servers', icon: Server },
    { label: 'Domínios e DNS', href: '/dashboard/domains', icon: Globe2 },
    { label: 'Faturamento', href: '/dashboard/billing', icon: CreditCard },
    { label: 'Suporte', href: '/dashboard/support', icon: LifeBuoy },
    { label: 'Conta e equipe', href: '/dashboard/account', icon: UserRound },
    {
        label: 'API e desenvolvedores',
        href: '/dashboard/developers/api-tokens',
        icon: Settings2,
    },
];

const SERVER_ITEMS = [
    { label: 'Visão geral', suffix: '', icon: LayoutDashboard },
    { label: 'Monitoramento', suffix: '/monitoring', icon: Activity },
    { label: 'Docker', suffix: '/docker', icon: Container },
    { label: 'Aplicações', suffix: '/applications', icon: Boxes },
    { label: 'Sistema operacional', suffix: '/os', icon: MonitorCog },
    { label: 'Backups', suffix: '/backups', icon: DatabaseBackup },
    { label: 'Segurança', suffix: '/security', icon: ShieldCheck },
    { label: 'Acesso SSH', suffix: '/access', icon: KeyRound },
    { label: 'DNS da VPS', suffix: '/dns', icon: Globe2 },
    { label: 'Atividade', suffix: '/activity', icon: Activity },
    { label: 'Configurações', suffix: '/settings', icon: Settings2 },
];

export function DashboardSidebar({
    className,
    onNavigate,
}: DashboardSidebarProps) {
    const pathname = useCurrentPath();
    const match = pathname.match(/^\/dashboard\/servers\/([^/]+)/);
    const serverId = match?.[1];
    const server =
        DEMO_SERVERS.find((item) => item.id === serverId) ?? DEMO_SERVER;
    const insideServer = Boolean(serverId);

    return (
        <aside
            className={cn(
                'hidden w-64 flex-shrink-0 flex-col border-r border-border bg-background-secondary lg:flex',
                className,
            )}
        >
            <div className="flex h-16 items-center gap-2 border-b border-border px-6">
                <span className="font-display text-xl font-semibold tracking-[0.22em] text-foreground">
                    LIRIAS
                </span>
            </div>

            <nav
                className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
                aria-label="Navegação do painel"
            >
                {insideServer ? (
                    <>
                        <Link
                            href="/dashboard/servers"
                            onClick={onNavigate}
                            className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" /> Todos os
                            servidores
                        </Link>
                        <div className="surface-card mb-4 p-3">
                            <div className="flex items-center gap-2">
                                <Server className="h-4 w-4 text-primary-light" />
                                <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                                    {server.name}
                                </p>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2">
                                <span className="truncate text-[11px] text-muted-foreground">
                                    {server.ipv4}
                                </span>
                                <Badge
                                    variant={
                                        server.status === 'running'
                                            ? 'success'
                                            : 'warning'
                                    }
                                    dot
                                >
                                    {server.status === 'running'
                                        ? 'Online'
                                        : 'Atenção'}
                                </Badge>
                            </div>
                        </div>
                        <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                            Gerenciar VPS
                        </p>
                        {SERVER_ITEMS.map((item) => {
                            const href = `/dashboard/servers/${server.id}${item.suffix}`;
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={onNavigate}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                        active
                                            ? 'bg-primary/10 text-primary-light'
                                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                                    )}
                                >
                                    <item.icon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </>
                ) : (
                    <>
                        <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                            Sua conta
                        </p>
                        {ACCOUNT_ITEMS.map((item) => {
                            const active =
                                item.href === '/dashboard'
                                    ? pathname === item.href
                                    : pathname === item.href ||
                                      pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onNavigate}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                        active
                                            ? 'bg-primary/10 text-primary-light'
                                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                                    )}
                                >
                                    <item.icon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </>
                )}
            </nav>

            <div className="border-t border-border p-4">
                <Link
                    href="/login"
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Sair
                </Link>
            </div>
        </aside>
    );
}
