'use client';

import { useCountUp } from '@/hooks';
import { STATS } from '@/constants';

function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
    const numericTarget = parseFloat(stat.value);
    const { value, ref } = useCountUp(numericTarget, 1800);
    const decimals = stat.value.includes('.') ? 2 : 0;

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className="flex flex-col items-center text-center"
        >
            <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-bold text-foreground sm:text-4xl">
                    {value.toFixed(decimals)}
                </span>
                <span className="text-2xl font-bold text-primary-light sm:text-3xl">
                    {stat.suffix}
                </span>
            </div>
            <span className="mt-2 text-sm font-medium text-foreground">
                {stat.label}
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground">
                {stat.description}
            </span>
        </div>
    );
}

export function StatsSection() {
    return (
        <section
            className="relative border-y border-border bg-background-secondary py-16"
            aria-label="Estatísticas da empresa"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
                    {STATS.map((stat) => (
                        <StatItem key={stat.label} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
