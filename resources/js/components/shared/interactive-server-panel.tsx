'use client';

import { useState } from 'react';
import { Cpu, Gauge, Globe2, Shield, Camera, Activity } from 'lucide-react';
import { useLiveMetric } from '@/hooks';
import { cn } from '@/lib/utils';

type TabId = 'metrics' | 'network' | 'security';

const TABS: { id: TabId; label: string }[] = [
    { id: 'metrics', label: 'Métricas' },
    { id: 'network', label: 'Rede' },
    { id: 'security', label: 'Segurança' },
];

/**
 * Painel interativo usado nas páginas de login/registro — três abas
 * (Métricas, Rede, Segurança) com dados que oscilam sutilmente em
 * tempo real, simulando um servidor de fato em atividade.
 */
export function InteractiveServerPanel() {
    const [tab, setTab] = useState<TabId>('metrics');
    const cpu = useLiveMetric(34, 3);
    const ram = useLiveMetric(58, 2);
    const disk = useLiveMetric(22, 1.5);
    const network = useLiveMetric(41, 4);

    return (
        <div className="trace-card w-full max-w-sm border border-border bg-card/90 p-6 shadow-card-hover backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs text-muted-foreground">
                    lirias-node-01
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-success">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="signal-pulse absolute h-1.5 w-1.5 rounded-full text-success" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
                    </span>
                    Online
                </span>
            </div>

            {/* Abas */}
            <div className="mt-4 inline-flex w-full items-center gap-1 rounded-lg border border-border bg-background-tertiary p-1">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={cn(
                            'flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
                            tab === t.id
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'metrics' && (
                <div className="mt-4 flex flex-col gap-3">
                    {[
                        { label: 'CPU', value: cpu, icon: Cpu },
                        { label: 'RAM', value: ram, icon: Gauge },
                        { label: 'Disk I/O', value: disk, icon: Activity },
                    ].map((m) => (
                        <div key={m.label}>
                            <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <m.icon
                                        className="h-3 w-3"
                                        aria-hidden="true"
                                    />
                                    {m.label}
                                </span>
                                <span className="font-mono text-foreground">
                                    {m.value}%
                                </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-accent">
                                <div
                                    className="h-full rounded-full bg-primary transition-[width] duration-[1800ms] ease-out"
                                    style={{ width: `${m.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'network' && (
                <div className="mt-4 flex flex-col gap-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between rounded-lg bg-background-tertiary px-3 py-2">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Globe2
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                            IPv4
                        </span>
                        <span className="text-foreground">187.45.12.8</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background-tertiary px-3 py-2">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Globe2
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                            IPv6
                        </span>
                        <span className="text-success">Ativo</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background-tertiary px-3 py-2">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Activity
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                            Tráfego
                        </span>
                        <span className="text-foreground">{network} Mbps</span>
                    </div>
                </div>
            )}

            {tab === 'security' && (
                <div className="mt-4 flex flex-col gap-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between rounded-lg bg-background-tertiary px-3 py-2">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Shield
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                            Anti-DDoS
                        </span>
                        <span className="text-success">10 Tbps</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background-tertiary px-3 py-2">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Shield
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                            Firewall
                        </span>
                        <span className="text-success">Ativo</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background-tertiary px-3 py-2">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Camera
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                            Snapshots
                        </span>
                        <span className="text-foreground">3 ativos</span>
                    </div>
                </div>
            )}
        </div>
    );
}
