import { MoreVertical, Cpu, MemoryStick } from 'lucide-react';
import { Badge } from '@/components/ui';
import { STATUS_LABELS } from '@/constants';
import type { ServerDTO, BadgeVariant } from '@/types';

export function ServerRow({ server }: { server: ServerDTO }) {
    const status = STATUS_LABELS[server.status];

    return (
        <div className="surface-card surface-card-interactive flex items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                    <Cpu className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                        {server.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                        {server.os} · {server.datacenter} · {server.ipv4}
                    </p>
                </div>
            </div>

            <div className="hidden items-center gap-6 sm:flex">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                    {server.cpu} vCPU
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MemoryStick className="h-3.5 w-3.5" aria-hidden="true" />
                    {server.ram} GB
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Badge variant={status.color as BadgeVariant} dot>
                    {status.label}
                </Badge>
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label={`Mais opções para ${server.name}`}
                >
                    <MoreVertical className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
