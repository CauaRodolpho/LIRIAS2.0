'use client';

import { useState } from 'react';
import {
    Cpu,
    MemoryStick,
    HardDrive,
    Activity,
    Globe2,
    Shield,
    Camera,
    Database,
} from 'lucide-react';
import { Badge } from '@/components/ui';
import { DashboardWidget } from '@/components/dashboard/dashboard-widget';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { useLiveMetric } from '@/hooks';
import { cn } from '@/lib/utils';

type TabId = 'overview' | 'network' | 'security';

const TABS: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Visão geral' },
    { id: 'network', label: 'Rede' },
    { id: 'security', label: 'Segurança' },
];

export function DashboardPreview() {
    const [tab, setTab] = useState<TabId>('overview');
    const cpu = useLiveMetric(34, 3);
    const ram = useLiveMetric(58, 2);
    const disk = useLiveMetric(22, 1.5);
    const network = useLiveMetric(41, 4);

    return (
        <section
            className="home-section py-24 sm:py-32"
            aria-labelledby="dashboard-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <ScrollReveal>
                        <h2
                            id="dashboard-heading"
                            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                        >
                            Um painel feito para quem leva infraestrutura a
                            sério
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                            Monitore CPU, RAM, armazenamento e tráfego de rede
                            em tempo real. Gerencie firewall, snapshots e
                            backups sem sair do navegador.
                        </p>
                        <ul className="mt-8 flex flex-col gap-4">
                            {[
                                'Métricas em tempo real com histórico de 30 dias',
                                'Gerenciamento de firewall com regras customizadas',
                                'Snapshots com 1 clique e restauração instantânea',
                                'Backups automáticos com retenção configurável',
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-foreground"
                                >
                                    <span
                                        className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                                        aria-hidden="true"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </ScrollReveal>

                    {/* Mockup interativo */}
                    <ScrollReveal y={40} delay={0.1}>
                        <div className="trace-card border border-border bg-card p-6 shadow-card-hover">
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground">
                                        lirias-node-01
                                    </h3>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        VPS Pro · São Paulo
                                    </p>
                                </div>
                                <Badge variant="success" dot>
                                    Online
                                </Badge>
                            </div>

                            {/* Abas */}
                            <div className="mt-4 inline-flex w-full items-center gap-1 rounded-lg border border-border bg-background-tertiary p-1">
                                {TABS.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setTab(t.id)}
                                        className={cn(
                                            'flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                                            tab === t.id
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {tab === 'overview' && (
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <DashboardWidget
                                        icon={Cpu}
                                        label="CPU Usage"
                                        value={`${cpu}%`}
                                        progress={cpu}
                                        variant="primary"
                                    />
                                    <DashboardWidget
                                        icon={MemoryStick}
                                        label="RAM Usage"
                                        value={`${ram}%`}
                                        progress={ram}
                                        variant="success"
                                    />
                                    <DashboardWidget
                                        icon={HardDrive}
                                        label="Storage"
                                        value={`${disk}%`}
                                        progress={disk}
                                        variant="success"
                                    />
                                    <DashboardWidget
                                        icon={Activity}
                                        label="Network"
                                        value={`${network * 10} Mbps`}
                                        progress={network}
                                        variant="primary"
                                    />
                                </div>
                            )}

                            {tab === 'network' && (
                                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center justify-between rounded-md bg-background-tertiary px-3 py-2.5">
                                        <span className="flex items-center gap-1.5 text-muted-foreground">
                                            <Globe2
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />{' '}
                                            IPv4
                                        </span>
                                        <span className="font-mono text-foreground">
                                            187.45.12.8
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-md bg-background-tertiary px-3 py-2.5">
                                        <span className="flex items-center gap-1.5 text-muted-foreground">
                                            <Globe2
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />{' '}
                                            IPv6
                                        </span>
                                        <span className="font-mono text-foreground">
                                            Ativo
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-between rounded-md bg-background-tertiary px-3 py-2.5">
                                        <span className="flex items-center gap-1.5 text-muted-foreground">
                                            <Activity
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />{' '}
                                            Tráfego atual
                                        </span>
                                        <span className="font-mono text-foreground">
                                            {network * 10} Mbps
                                        </span>
                                    </div>
                                </div>
                            )}

                            {tab === 'security' && (
                                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center justify-between rounded-md bg-background-tertiary px-3 py-2.5">
                                        <span className="flex items-center gap-1.5 text-muted-foreground">
                                            <Shield
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />{' '}
                                            Firewall
                                        </span>
                                        <Badge variant="success">Ativo</Badge>
                                    </div>
                                    <div className="flex items-center justify-between rounded-md bg-background-tertiary px-3 py-2.5">
                                        <span className="flex items-center gap-1.5 text-muted-foreground">
                                            <Camera
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />{' '}
                                            Snapshots
                                        </span>
                                        <span className="text-foreground">
                                            3 ativos
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-between rounded-md bg-background-tertiary px-3 py-2.5">
                                        <span className="flex items-center gap-1.5 text-muted-foreground">
                                            <Database
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />{' '}
                                            Último Backup
                                        </span>
                                        <span className="text-foreground">
                                            Hoje, 03:00 — Concluído
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
