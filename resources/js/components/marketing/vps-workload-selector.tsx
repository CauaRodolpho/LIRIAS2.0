import { Check, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type WorkloadOption = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

export function VpsWorkloadSelector({
    items,
    selectedId,
    onSelect,
    label,
}: {
    items: readonly WorkloadOption[];
    selectedId: string;
    onSelect: (id: string) => void;
    label: string;
}) {
    return (
        <div
            className="grid gap-3 sm:grid-cols-2"
            role="group"
            aria-label={label}
        >
            {items.map((item) => {
                const Icon = item.icon;
                const active = item.id === selectedId;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        aria-pressed={active}
                        className={cn(
                            'group relative min-h-44 overflow-hidden rounded-xl border p-5 text-left backdrop-blur-[2px] transition-[background-color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
                            active
                                ? 'border-primary/75 bg-primary/[0.12] shadow-[inset_0_1px_0_hsl(var(--primary-light)/0.12)]'
                                : 'border-border/80 bg-background/20 hover:border-border-hover hover:bg-card/35',
                        )}
                    >
                        <span
                            className={cn(
                                'flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-200',
                                active
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border/80 bg-background/35 text-primary-light group-hover:border-primary/35 group-hover:bg-primary/[0.07]',
                            )}
                        >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>

                        {active ? (
                            <span
                                className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
                                aria-hidden="true"
                            >
                                <Check className="h-4 w-4" strokeWidth={2.5} />
                            </span>
                        ) : null}

                        <span className="mt-5 block font-semibold text-foreground">
                            {item.title}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                            {item.description}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
