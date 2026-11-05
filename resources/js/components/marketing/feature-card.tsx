import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    accent?: 'primary' | 'secondary' | 'success';
    className?: string;
}

const accentStyles = {
    primary: 'border-primary/20 bg-primary/5 text-primary-light',
    secondary: 'border-secondary/20 bg-secondary/5 text-secondary-light',
    success: 'border-success/20 bg-success/5 text-success-light',
};

export function FeatureCard({
    icon: Icon,
    title,
    description,
    accent = 'primary',
    className,
}: FeatureCardProps) {
    return (
        <article
            className={cn(
                'group rounded-lg border border-border/80 bg-card/55 p-6 transition-[background-color,border-color] duration-200 hover:border-border-hover hover:bg-card/75',
                className,
            )}
        >
            <div
                className={cn(
                    'mb-5 flex h-10 w-10 items-center justify-center rounded-md border',
                    accentStyles[accent],
                )}
            >
                <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
            </p>
        </article>
    );
}
