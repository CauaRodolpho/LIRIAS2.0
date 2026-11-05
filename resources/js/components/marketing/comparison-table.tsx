import { cn } from '@/lib/utils';

type Level = 'low' | 'medium' | 'high' | 'max';
type PlanKey = 'shared' | 'vps' | 'cloud' | 'dedicated';

const LEVEL_CONFIG: Record<
    Level,
    { label: string; dots: number; color: string }
> = {
    low: { label: 'Baixo', dots: 1, color: 'bg-muted-foreground' },
    medium: { label: 'Médio', dots: 2, color: 'bg-warning' },
    high: { label: 'Alto', dots: 3, color: 'bg-secondary' },
    max: { label: 'Máximo', dots: 4, color: 'bg-success' },
};

interface ComparisonRow {
    feature: string;
    shared: Level;
    vps: Level;
    cloud: Level;
    dedicated: Level;
}

const ROWS: ComparisonRow[] = [
    {
        feature: 'Performance',
        shared: 'low',
        vps: 'high',
        cloud: 'high',
        dedicated: 'max',
    },
    {
        feature: 'Escalabilidade',
        shared: 'low',
        vps: 'medium',
        cloud: 'max',
        dedicated: 'low',
    },
    {
        feature: 'Controle',
        shared: 'low',
        vps: 'high',
        cloud: 'high',
        dedicated: 'max',
    },
    {
        feature: 'Segurança',
        shared: 'low',
        vps: 'high',
        cloud: 'high',
        dedicated: 'max',
    },
    {
        feature: 'Recursos dedicados',
        shared: 'low',
        vps: 'medium',
        cloud: 'high',
        dedicated: 'max',
    },
];

const PLAN_TYPES: Array<{ key: PlanKey; label: string; highlight: boolean }> = [
    { key: 'shared', label: 'Hospedagem compartilhada', highlight: false },
    { key: 'vps', label: 'VPS', highlight: true },
    { key: 'cloud', label: 'Cloud', highlight: false },
    { key: 'dedicated', label: 'Servidor dedicado', highlight: false },
];

function LevelIndicator({
    level,
    showLabel = false,
}: {
    level: Level;
    showLabel?: boolean;
}) {
    const config = LEVEL_CONFIG[level];
    return (
        <div className="flex items-center justify-end gap-1 sm:justify-center">
            <span
                className={cn(
                    'mr-2 text-xs font-medium text-muted-foreground',
                    !showLabel && 'sr-only',
                )}
            >
                {config.label}
            </span>
            {Array.from({ length: 4 }).map((_, index) => (
                <span
                    key={index}
                    className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        index < config.dots ? config.color : 'bg-accent',
                    )}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

export function ComparisonTable() {
    return (
        <section
            className="overflow-hidden py-20 sm:py-28"
            aria-labelledby="comparison-heading"
        >
            <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2
                        id="comparison-heading"
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Qual solução é ideal para você?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Compare os tipos de hospedagem e escolha o que melhor
                        atende sua aplicação.
                    </p>
                </div>

                <div className="mt-10 grid gap-3 sm:hidden">
                    {PLAN_TYPES.map((plan) => (
                        <article
                            key={plan.key}
                            className={cn(
                                'rounded-lg border bg-card/75 p-4',
                                plan.highlight
                                    ? 'border-primary/45 bg-primary/[0.035]'
                                    : 'border-border',
                            )}
                        >
                            <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                                <h3 className="font-semibold text-foreground">
                                    {plan.label}
                                </h3>
                                {plan.highlight && (
                                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-primary-light uppercase">
                                        Recomendado
                                    </span>
                                )}
                            </div>
                            <dl className="mt-3 space-y-3">
                                {ROWS.map((row) => (
                                    <div
                                        key={row.feature}
                                        className="flex items-center justify-between gap-4"
                                    >
                                        <dt className="text-sm text-muted-foreground">
                                            {row.feature}
                                        </dt>
                                        <dd>
                                            <LevelIndicator
                                                level={row[plan.key]}
                                                showLabel
                                            />
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </article>
                    ))}
                </div>

                <div className="mt-12 hidden max-w-full overflow-x-auto rounded-lg border border-border sm:block">
                    <table className="w-full min-w-[640px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-border bg-background-tertiary">
                                <th
                                    scope="col"
                                    className="p-4 text-left font-medium text-muted-foreground"
                                >
                                    Recurso
                                </th>
                                {PLAN_TYPES.map((type) => (
                                    <th
                                        key={type.key}
                                        scope="col"
                                        className={cn(
                                            'p-4 text-center font-medium',
                                            type.highlight
                                                ? 'bg-primary/10 text-primary-light'
                                                : 'text-muted-foreground',
                                        )}
                                    >
                                        {type.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ROWS.map((row, index) => (
                                <tr
                                    key={row.feature}
                                    className={cn(
                                        index % 2 === 0
                                            ? 'bg-card'
                                            : 'bg-card/50',
                                    )}
                                >
                                    <th
                                        scope="row"
                                        className="p-4 text-left font-medium text-foreground"
                                    >
                                        {row.feature}
                                    </th>
                                    <td className="p-4">
                                        <LevelIndicator level={row.shared} />
                                    </td>
                                    <td className="bg-primary/5 p-4">
                                        <LevelIndicator level={row.vps} />
                                    </td>
                                    <td className="p-4">
                                        <LevelIndicator level={row.cloud} />
                                    </td>
                                    <td className="p-4">
                                        <LevelIndicator level={row.dedicated} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
