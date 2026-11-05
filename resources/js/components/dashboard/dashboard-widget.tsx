import type { LucideIcon } from 'lucide-react';
import { Progress } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface DashboardWidgetProps {
    icon: LucideIcon;
    label: string;
    value: string;
    progress?: number;
    variant?: 'primary' | 'success' | 'warning' | 'danger';
    className?: string;
}

export function DashboardWidget({
    icon: Icon,
    label,
    value,
    progress,
    variant = 'primary',
    className,
}: DashboardWidgetProps) {
    return (
        <div className={cn('surface-card p-4', className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                </div>
                <span className="text-sm font-semibold text-foreground">
                    {value}
                </span>
            </div>
            {progress !== undefined && (
                <div className="mt-3">
                    <Progress value={progress} variant={variant} />
                </div>
            )}
        </div>
    );
}
