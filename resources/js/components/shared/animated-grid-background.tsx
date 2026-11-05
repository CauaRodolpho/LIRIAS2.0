import { cn } from '@/lib/utils';

export function AnimatedGridBackground({
    variant = 'page',
    className,
}: {
    variant?: 'page' | 'hero';
    className?: string;
}) {
    if (variant === 'hero') {
        return (
            <div
                className={cn(
                    'pointer-events-none absolute inset-0',
                    className,
                )}
                aria-hidden="true"
            >
                <div className="hero-horizon absolute" />
                <div className="hero-grid absolute" />
            </div>
        );
    }

    return (
        <div
            className={cn(
                'animated-grid-background pointer-events-none absolute inset-0 overflow-hidden',
                className,
            )}
            aria-hidden="true"
        >
            <div className="animated-grid-plane absolute" />
            <div className="infra-data-layer absolute inset-0">
                <span className="infra-route infra-route-one" />
                <span className="infra-route infra-route-two" />
                <span className="infra-route infra-route-three" />
                <span className="infra-node infra-node-one" />
                <span className="infra-node infra-node-two" />
                <span className="infra-node infra-node-three" />
            </div>
            <div className="animated-grid-vignette absolute inset-0" />
        </div>
    );
}
