import {
    Braces,
    CloudCog,
    Code2,
    Container,
    Database,
    GitBranch,
    HardDrive,
    MessagesSquare,
    PanelTop,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import type { CatalogApplication } from '@/data/application-catalog';
import { cn } from '@/lib/utils';

const ICONS: Record<CatalogApplication['icon'], LucideIcon> = {
    Workflow,
    Container,
    PanelTop,
    Braces,
    Code2,
    Database,
    HardDrive,
    CloudCog,
    GitBranch,
    MessagesSquare,
};

export function ApplicationIcon({
    application,
    className,
}: {
    application: CatalogApplication;
    className?: string;
}) {
    const Icon = ICONS[application.icon];
    return (
        <span
            className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-card',
                className,
            )}
            style={{
                borderColor: `${application.accent}55`,
                color: application.accent,
            }}
            aria-hidden="true"
        >
            <Icon className="h-5 w-5" />
        </span>
    );
}
