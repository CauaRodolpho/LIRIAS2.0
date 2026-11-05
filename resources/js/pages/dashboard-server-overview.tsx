import {
    Activity,
    Cpu,
    HardDrive,
    KeyRound,
    MemoryStick,
    Power,
    Server,
    ShieldCheck,
    Terminal,
} from 'lucide-react';
import { useParams } from '@/lib/routing';
import Link from '@/components/navigation/app-link';
import {
    DEMO_SERVER,
    DEMO_SERVERS,
    RECENT_ACTIONS,
} from '@/data/dashboard-demo';
import { Badge, Button } from '@/components/ui';
import {
    DashboardPageShell,
    DemoAction,
    DemoNotice,
    KeyValueRows,
    PageHeading,
    SectionCard,
    ServerNavigation,
    StatCard,
} from '@/components/dashboard/dashboard-kit';

const statusLabel = {
    running: 'Online',
    stopped: 'Desligado',
    rebooting: 'Reiniciando',
    provisioning: 'Provisionando',
    error: 'Com erro',
} as const;

export function ServerOverviewPage() {
    const { serverId = DEMO_SERVER.id } = useParams();
    const server =
        DEMO_SERVERS.find((item) => item.id === serverId) ?? DEMO_SERVER;
    const running = server.status === 'running';

    return (
        <DashboardPageShell title="Visão geral da VPS">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Visão geral"
                description="Estado atual, consumo de recursos, acesso e atalhos operacionais desta instância."
                actions={
                    <>
                        <DemoAction>
                            <Power className="mr-1 inline h-3.5 w-3.5" />
                            {running ? 'Reiniciar' : 'Iniciar'}
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
                            <Server className="h-7 w-7" />
                        </span>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-semibold">
                                    {server.name}
                                </h3>
                                <Badge
                                    variant={
                                        running
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
                            <p className="mt-1 text-sm text-muted-foreground">
                                {server.os} · KVM · {server.location}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                        {[
                            ['Plano', server.plan],
                            ['Validade', server.validUntil],
                            ['Uptime', server.uptime],
                            ['IPv4', server.ipv4],
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
                    value={running ? '47%' : '0%'}
                    detail={`${server.cpu} vCPU`}
                    icon={<Cpu className="h-5 w-5" />}
                />
                <StatCard
                    label="Memória"
                    value={
                        running
                            ? `${Math.round(server.ram * 0.65 * 10) / 10} GB`
                            : '0 GB'
                    }
                    detail={`de ${server.ram} GB`}
                    icon={<MemoryStick className="h-5 w-5" />}
                />
                <StatCard
                    label="Disco"
                    value={`${Math.round(server.disk * 0.36)} GB`}
                    detail={`de ${server.disk} GB`}
                    icon={<HardDrive className="h-5 w-5" />}
                />
                <StatCard
                    label="Banda"
                    value="0,8 TB"
                    detail={`de ${server.bandwidth} TB`}
                    icon={<Activity className="h-5 w-5" />}
                />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-2">
                <SectionCard
                    title="Acesso ao servidor"
                    action={<DemoAction>Copiar SSH</DemoAction>}
                >
                    <KeyValueRows
                        rows={[
                            [
                                'Comando SSH',
                                <code>ssh root@{server.ipv4}</code>,
                            ],
                            ['Usuário', 'root'],
                            ['IPv6', server.ipv6],
                            ['Hostname', server.hostname],
                        ]}
                    />
                </SectionCard>
                <SectionCard
                    title="Detalhes do plano"
                    action={<DemoAction>Fazer upgrade</DemoAction>}
                >
                    <KeyValueRows
                        rows={[
                            ['Plano atual', server.plan],
                            ['Processamento', `${server.cpu} vCPU AMD EPYC`],
                            ['Memória', `${server.ram} GB DDR5`],
                            ['Armazenamento', `${server.disk} GB NVMe`],
                            ['Renovação automática', 'Ativa'],
                        ]}
                    />
                </SectionCard>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    [
                        KeyRound,
                        'Chaves SSH',
                        '2 cadastradas',
                        `/dashboard/servers/${server.id}/access`,
                    ],
                    [
                        ShieldCheck,
                        'Firewall',
                        '3 regras ativas',
                        `/dashboard/servers/${server.id}/security/firewall`,
                    ],
                    [
                        HardDrive,
                        'Backups',
                        '3 disponíveis',
                        `/dashboard/servers/${server.id}/backups`,
                    ],
                    [
                        ShieldCheck,
                        'Malware',
                        'Protegido',
                        `/dashboard/servers/${server.id}/security/malware`,
                    ],
                ].map(([Icon, title, detail, href]) => {
                    const I = Icon as typeof KeyRound;
                    return (
                        <Link
                            key={String(title)}
                            href={String(href)}
                            className="surface-card surface-card-interactive flex items-center gap-3 p-4"
                        >
                            <I className="h-5 w-5 text-primary-light" />
                            <div>
                                <p className="text-sm font-medium">
                                    {String(title)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {String(detail)}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <SectionCard
                title="Ações recentes"
                className="mt-5"
                action={
                    <Link
                        href={`/dashboard/servers/${server.id}/activity`}
                        className="text-xs font-medium text-primary-light"
                    >
                        Ver todas
                    </Link>
                }
            >
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-sm">
                        <thead className="text-xs tracking-wider text-muted-foreground uppercase">
                            <tr>
                                <th className="pb-3 font-medium">Ação</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium">
                                    Responsável
                                </th>
                                <th className="pb-3 font-medium">
                                    Executada em
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {RECENT_ACTIONS.slice(0, 4).map((item) => (
                                <tr key={item.id}>
                                    <td className="py-3 font-mono text-xs">
                                        {item.action}
                                    </td>
                                    <td>
                                        <Badge
                                            variant={
                                                item.status === 'Sucesso'
                                                    ? 'success'
                                                    : item.status === 'Falhou'
                                                      ? 'danger'
                                                      : 'warning'
                                            }
                                            dot
                                        >
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td>{item.actor}</td>
                                    <td className="text-muted-foreground">
                                        {item.at}
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
