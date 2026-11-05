import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VpsSectionHeading({
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
            <p className="text-xs font-semibold tracking-[0.14em] text-primary-light uppercase">
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

export function VpsConfigurationItem({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: LucideIcon;
}) {
    return (
        <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs">{label}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-foreground">
                {value}
            </p>
        </div>
    );
}

export function VpsHeroMetric({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div className="px-3 first:pl-0">
            <p className="text-lg font-bold text-foreground tabular-nums">
                {value}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
        </div>
    );
}

export function VpsMetricCard({
    label,
    value,
    bars,
}: {
    label: string;
    value: string;
    bars: number[];
}) {
    return (
        <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[10px] font-medium text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground tabular-nums">
                {value}
            </p>
            <div className="mt-3 flex h-7 items-end gap-1" aria-hidden="true">
                {bars.map((height, index) => (
                    <span
                        key={index}
                        className="w-full rounded-sm bg-primary/45"
                        style={{ height: `${height}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

export function VpsInfoBox({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return <VpsConfigurationItem icon={Icon} label={label} value={value} />;
}
