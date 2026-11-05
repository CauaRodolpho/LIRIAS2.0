import { useMemo, useState } from 'react';
import {
    ChevronRight,
    MoreHorizontal,
    Plus,
    Search,
    Server,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { DEMO_SERVERS, type DemoServerStatus } from '@/data/dashboard-demo';
import { Badge, Button, Card, Input } from '@/components/ui';
import {
    DashboardPageShell,
    DemoNotice,
    PageHeading,
} from '@/components/dashboard/dashboard-kit';

const statusMeta: Record<
    DemoServerStatus,
    { label: string; variant: 'success' | 'warning' | 'danger' | 'default' }
> = {
    running: { label: 'Em atividade', variant: 'success' },
    stopped: { label: 'Desligado', variant: 'default' },
    rebooting: { label: 'Reiniciando', variant: 'warning' },
    provisioning: { label: 'Provisionando', variant: 'warning' },
    error: { label: 'Com erro', variant: 'danger' },
};

export function ServerListPage() {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<'all' | DemoServerStatus>('all');
    const filtered = useMemo(
        () =>
            DEMO_SERVERS.filter((server) => {
                const matchesQuery = [
                    server.name,
                    server.hostname,
                    server.ipv4,
                    server.os,
                ].some((value) =>
                    value.toLowerCase().includes(query.toLowerCase()),
                );
                return (
                    matchesQuery &&
                    (status === 'all' || server.status === status)
                );
            }),
        [query, status],
    );

    return (
        <DashboardPageShell title="Servidores">
            <DemoNotice />
            <PageHeading
                title="Seus servidores"
                description="Gerencie todas as instâncias, seus estados e o acesso ao ambiente operacional."
                actions={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                        Criar VPS
                    </Button>
                }
            />

            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                    <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Pesquisar por nome, IP, sistema ou hostname"
                        leftIcon={<Search className="h-4 w-4" />}
                    />
                </div>
                <select
                    value={status}
                    onChange={(event) =>
                        setStatus(
                            event.target.value as 'all' | DemoServerStatus,
                        )
                    }
                    className="h-11 rounded-xl border border-input bg-background-tertiary px-3 text-sm text-foreground"
                >
                    <option value="all">Todos os status</option>
                    <option value="running">Em atividade</option>
                    <option value="rebooting">Reiniciando</option>
                    <option value="stopped">Desligado</option>
                    <option value="error">Com erro</option>
                </select>
            </div>

            <Card className="overflow-hidden">
                <div className="hidden grid-cols-[1.45fr_.9fr_.8fr_.8fr_.8fr_auto] gap-4 border-b border-border px-5 py-3 text-xs font-medium tracking-wider text-muted-foreground uppercase lg:grid">
                    <span>Servidor</span>
                    <span>Endereço</span>
                    <span>Plano</span>
                    <span>Região</span>
                    <span>Status</span>
                    <span>Ações</span>
                </div>
                <div className="divide-y divide-border">
                    {filtered.map((server) => {
                        const meta = statusMeta[server.status];
                        return (
                            <div
                                key={server.id}
                                className="grid gap-4 p-5 lg:grid-cols-[1.45fr_.9fr_.8fr_.8fr_.8fr_auto] lg:items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                                        <Server className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-semibold">
                                            {server.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {server.os} · {server.hostname}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-mono text-sm">
                                        {server.ipv4}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        IPv4 público
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        {server.plan}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {server.cpu} vCPU · {server.ram} GB
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm">{server.location}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Expira {server.validUntil}
                                    </p>
                                </div>
                                <Badge
                                    variant={meta.variant}
                                    dot
                                    className="w-fit"
                                >
                                    {meta.label}
                                </Badge>
                                <div className="flex items-center gap-2">
                                    <Button
                                        asChild
                                        size="sm"
                                        variant="secondary"
                                    >
                                        <Link
                                            href={`/dashboard/servers/${server.id}`}
                                        >
                                            Gerenciar
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <button
                                        aria-label={`Mais ações para ${server.name}`}
                                        className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {filtered.length === 0 && (
                        <div className="p-12 text-center">
                            <p className="font-medium">
                                Nenhum servidor encontrado
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Revise a pesquisa ou o filtro selecionado.
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </DashboardPageShell>
    );
}
