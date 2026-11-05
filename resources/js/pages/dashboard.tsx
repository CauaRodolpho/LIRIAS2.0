import Link from '@/components/navigation/app-link';
import {
    Activity,
    ArrowRight,
    Box,
    Cpu,
    HardDrive,
    MemoryStick,
    Server as ServerIcon,
    ShieldCheck,
} from 'lucide-react';
import { Badge, Button, Card, DataList, DataListItem } from '@/components/ui';
import {
    DashboardPageShell,
    DemoNotice,
    MiniChart,
    PageHeading,
    SectionCard,
    StatCard,
} from '@/components/dashboard';
import {
    DEMO_SERVER,
    METRIC_SERIES,
    RECENT_ACTIONS,
} from '@/data/dashboard-demo';

export default function DashboardPage() {
    return (
        <DashboardPageShell title="Visão geral">
            <DemoNotice />
            <PageHeading
                title="Olá, Rodolfo"
                description="Aqui está um resumo do ambiente LIRIAS e da sua infraestrutura demonstrativa."
                actions={
                    <Button asChild size="sm">
                        <Link href="/dashboard/servers">
                            Ver servidores
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                }
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Servidores ativos"
                    value="1"
                    detail="1 de 1 disponível"
                    icon={<ServerIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="CPU atual"
                    value="47%"
                    detail="4 vCPU"
                    icon={<Cpu className="h-5 w-5" />}
                />
                <StatCard
                    label="Memória"
                    value="65%"
                    detail="5,2 de 8 GB"
                    icon={<MemoryStick className="h-5 w-5" />}
                />
                <StatCard
                    label="Armazenamento"
                    value="36%"
                    detail="36 de 100 GB"
                    icon={<HardDrive className="h-5 w-5" />}
                />
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <SectionCard
                    title="Seu servidor"
                    action={
                        <Badge variant="success" dot>
                            Em atividade
                        </Badge>
                    }
                >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                                <ServerIcon className="h-6 w-6" />
                            </span>
                            <div>
                                <p className="font-semibold">
                                    {DEMO_SERVER.name}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {DEMO_SERVER.os} · {DEMO_SERVER.location} ·{' '}
                                    {DEMO_SERVER.ipv4}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    CPU
                                </p>
                                <p className="mt-1 font-medium">4 vCPU</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    RAM
                                </p>
                                <p className="mt-1 font-medium">8 GB</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    NVMe
                                </p>
                                <p className="mt-1 font-medium">100 GB</p>
                            </div>
                        </div>
                        <Button asChild size="sm" variant="secondary">
                            <Link href={`/dashboard/servers/${DEMO_SERVER.id}`}>
                                Gerenciar
                            </Link>
                        </Button>
                    </div>
                </SectionCard>
                <SectionCard
                    title="Saúde do ambiente"
                    action={
                        <ShieldCheck className="h-5 w-5 text-success-light" />
                    }
                >
                    <div className="flex min-h-28 flex-col justify-center">
                        <p className="text-2xl font-semibold">Operacional</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Nenhum incidente demonstrativo.
                        </p>
                        <div className="mt-4 flex gap-1">
                            {Array.from({ length: 18 }).map((_, index) => (
                                <span
                                    key={index}
                                    className="h-6 flex-1 rounded-sm bg-success/70"
                                />
                            ))}
                        </div>
                    </div>
                </SectionCard>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
                <SectionCard
                    title="CPU nas últimas 24 horas"
                    action={<span className="text-sm font-semibold">47%</span>}
                >
                    <MiniChart
                        values={METRIC_SERIES.cpu}
                        label="CPU nas últimas 24 horas"
                    />
                </SectionCard>
                <SectionCard
                    title="Atividade recente"
                    action={
                        <Link
                            href={`/dashboard/servers/${DEMO_SERVER.id}/activity`}
                            className="text-xs font-medium text-primary-light"
                        >
                            Ver todas
                        </Link>
                    }
                >
                    <DataList>
                        {RECENT_ACTIONS.slice(0, 3).map((item) => (
                            <DataListItem
                                key={item.action}
                                leading={
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                                        <Activity className="h-4 w-4" />
                                    </span>
                                }
                                title={
                                    <code className="text-xs">
                                        {item.action}
                                    </code>
                                }
                                description={item.at}
                                meta={<Badge variant="success">Sucesso</Badge>}
                            />
                        ))}
                    </DataList>
                </SectionCard>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                    [
                        Box,
                        'Aplicações Docker',
                        'Gerencie projetos e catálogo',
                        `/dashboard/servers/${DEMO_SERVER.id}/docker`,
                    ],
                    [
                        ShieldCheck,
                        'Segurança',
                        'Firewall, SSH e scanner',
                        `/dashboard/servers/${DEMO_SERVER.id}/security`,
                    ],
                    [
                        Activity,
                        'Monitoramento',
                        'CPU, memória, disco e rede',
                        `/dashboard/servers/${DEMO_SERVER.id}/monitoring`,
                    ],
                ].map(([Icon, title, description, href]) => {
                    const I = Icon as typeof Box;
                    return (
                        <Link key={String(title)} href={String(href)}>
                            <Card
                                variant="interactive"
                                className="flex h-full items-center gap-4 p-5"
                            >
                                <I className="h-5 w-5 text-primary-light" />
                                <div className="flex-1">
                                    <p className="font-medium">
                                        {String(title)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {String(description)}
                                    </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </DashboardPageShell>
    );
}
