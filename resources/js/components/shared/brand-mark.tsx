import { cn } from '@/lib/utils';

/**
 * Marca da LIRIAS — um nó de circuito com duas trilhas curtas.
 * Substitui o ícone genérico (Cloud num box com glow) por algo específico
 * do conceito "Circuito Vivo": um ponto de rede com conexões saindo dele.
 */
export function BrandMark({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 32 32"
            className={cn('h-8 w-8', className)}
            aria-hidden="true"
        >
            <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="7"
                className="fill-background-tertiary stroke-border"
                strokeWidth="1"
            />
            <path
                d="M16 9V13M16 19V23M9 16H13M19 16H23"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="3.5" fill="hsl(var(--primary))" />
            <circle
                cx="16"
                cy="16"
                r="6.5"
                stroke="hsl(var(--primary))"
                strokeOpacity="0.35"
                strokeWidth="1"
                fill="none"
            />
        </svg>
    );
}
