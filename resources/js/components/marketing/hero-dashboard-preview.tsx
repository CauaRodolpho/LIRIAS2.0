import { motion, useReducedMotion } from 'framer-motion';
import {
    Activity,
    Circle,
    Copy,
    Cpu,
    HardDrive,
    MemoryStick,
    Network,
    Power,
    RotateCw,
    Server,
    Terminal,
    type LucideIcon,
} from 'lucide-react';

const metrics: Array<{
    label: string;
    value: string;
    detail: string;
    icon: LucideIcon;
    bars: number[];
}> = [
    {
        label: 'CPU',
        value: '18%',
        detail: '4 vCPU',
        icon: Cpu,
        bars: [32, 44, 38, 62, 47, 55, 42, 68, 49, 58],
    },
    {
        label: 'Memória',
        value: '3.2 GB',
        detail: 'de 8 GB',
        icon: MemoryStick,
        bars: [48, 52, 50, 58, 54, 62, 57, 64, 59, 61],
    },
    {
        label: 'Disco',
        value: '24 GB',
        detail: 'de 160 GB',
        icon: HardDrive,
        bars: [30, 30, 31, 31, 32, 32, 33, 33, 34, 34],
    },
];

const events = [
    { label: 'Snapshot automático concluído', time: '03:17' },
    { label: 'Verificação de rede concluída', time: '02:42' },
    { label: 'Servidor reiniciado', time: 'Ontem' },
];

export function ProvisioningPreview() {
    const reducedMotion = useReducedMotion();

    return (
        <motion.section
            aria-label="Prévia ilustrativa do painel operacional de uma VPS"
            className="provision-shell relative z-10 overflow-hidden border border-primary/25 bg-card/95 text-left text-card-foreground shadow-2xl shadow-primary/10 backdrop-blur-xl"
            initial={reducedMotion ? false : { opacity: 0, x: 28, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div
                className="provision-scan pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
                aria-hidden="true"
            />

            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background-secondary/70 px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary/25 bg-primary/10 text-primary-light">
                        <Server className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold text-foreground">
                                lirias-node-01
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-success-light">
                                <span
                                    className="signal-pulse h-1.5 w-1.5 rounded-full bg-success text-success"
                                    aria-hidden="true"
                                />
                                Em operação
                            </span>
                        </div>
                        <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                            São Paulo · Debian 13 · 203.0.113.24
                        </p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-2"
                    aria-label="Ações ilustrativas"
                >
                    <button
                        type="button"
                        disabled
                        className="inline-flex cursor-default items-center gap-1.5 border border-border bg-card px-2.5 py-2 text-[11px] text-muted-foreground"
                    >
                        <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                        Console
                    </button>
                    <button
                        type="button"
                        disabled
                        className="inline-flex cursor-default items-center gap-1.5 border border-border bg-card px-2.5 py-2 text-[11px] text-muted-foreground"
                    >
                        <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                        Reiniciar
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
                {metrics.map((metric, metricIndex) => {
                    const Icon = metric.icon;
                    return (
                        <div
                            key={metric.label}
                            className="bg-card px-4 py-5 sm:px-5"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Icon
                                        className="h-3.5 w-3.5 text-primary-light"
                                        aria-hidden="true"
                                    />
                                    {metric.label}
                                </span>
                                <span className="font-mono text-xs font-medium text-foreground">
                                    {metric.value}
                                </span>
                            </div>
                            <div
                                className="mt-4 flex h-9 items-end gap-1"
                                aria-hidden="true"
                            >
                                {metric.bars.map((height, index) => (
                                    <span
                                        key={index}
                                        className="telemetry-bar flex-1 bg-primary/55"
                                        style={{
                                            height: `${height}%`,
                                            animationDelay: `${metricIndex * 180 + index * 70}ms`,
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                                {metric.detail}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid border-t border-border lg:grid-cols-[1.08fr_.92fr]">
                <div className="border-b border-border p-5 sm:p-6 lg:border-r lg:border-b-0">
                    <div className="flex items-center justify-between gap-3">
                        <p className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                            <Activity
                                className="h-3.5 w-3.5 text-primary-light"
                                aria-hidden="true"
                            />
                            Atividade recente
                        </p>
                        <span className="text-[10px] text-muted-foreground">
                            Hoje
                        </span>
                    </div>

                    <ol className="mt-4 divide-y divide-border">
                        {events.map((event, index) => (
                            <motion.li
                                key={event.label}
                                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                                initial={
                                    reducedMotion ? false : { opacity: 0, y: 6 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: reducedMotion ? 0 : 0.3,
                                    delay: reducedMotion
                                        ? 0
                                        : 0.32 + index * 0.12,
                                }}
                            >
                                <span className="flex min-w-0 items-center gap-2.5 text-xs text-foreground">
                                    <Circle
                                        className="h-2 w-2 shrink-0 fill-success text-success"
                                        aria-hidden="true"
                                    />
                                    <span className="truncate">
                                        {event.label}
                                    </span>
                                </span>
                                <time className="shrink-0 font-mono text-[10px] text-muted-foreground">
                                    {event.time}
                                </time>
                            </motion.li>
                        ))}
                    </ol>
                </div>

                <div className="p-5 sm:p-6">
                    <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                        Rede e acesso
                    </p>
                    <dl className="mt-4 space-y-3">
                        <div className="flex items-center justify-between gap-4 text-xs">
                            <dt className="flex items-center gap-2 text-muted-foreground">
                                <Network
                                    className="h-3.5 w-3.5 text-primary-light"
                                    aria-hidden="true"
                                />
                                Tráfego
                            </dt>
                            <dd className="font-mono text-foreground">
                                320 Mbps
                            </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-xs">
                            <dt className="flex items-center gap-2 text-muted-foreground">
                                <Power
                                    className="h-3.5 w-3.5 text-primary-light"
                                    aria-hidden="true"
                                />
                                Uptime
                            </dt>
                            <dd className="font-mono text-foreground">
                                99,98%
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-5 border border-border bg-background-secondary/65 p-3">
                        <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
                                Acesso SSH
                            </span>
                            <Copy
                                className="h-3.5 w-3.5 text-muted-foreground"
                                aria-hidden="true"
                            />
                        </div>
                        <p className="mt-2 truncate font-mono text-[11px] text-foreground">
                            ssh root@203.0.113.24
                        </p>
                    </div>
                </div>
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-background-secondary/55 px-5 py-3 text-[10px] text-muted-foreground sm:px-6">
                <span>Dados demonstrativos da plataforma LIRIAS</span>
                <span className="font-mono">Atualizado agora</span>
            </footer>
        </motion.section>
    );
}
