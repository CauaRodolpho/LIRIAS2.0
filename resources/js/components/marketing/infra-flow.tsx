'use client';

import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User, Wifi, Server, HardDrive, AppWindow } from 'lucide-react';
import { enterTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';

const NODES: { label: string; icon: ReactNode; highlight?: boolean }[] = [
    { label: 'Usuário', icon: <User className="h-4 w-4" aria-hidden="true" /> },
    { label: 'Rede', icon: <Wifi className="h-4 w-4" aria-hidden="true" /> },
    {
        label: 'Infraestrutura',
        icon: <Server className="h-4 w-4" aria-hidden="true" />,
    },
    {
        label: 'VPS',
        icon: <HardDrive className="h-4 w-4" aria-hidden="true" />,
        highlight: true,
    },
    {
        label: 'Aplicação',
        icon: <AppWindow className="h-4 w-4" aria-hidden="true" />,
    },
];

export function InfraFlow() {
    const reduced = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const ratio = (event.clientX - rect.left) / rect.width;
        const index = Math.min(
            NODES.length - 1,
            Math.max(0, Math.round(ratio * (NODES.length - 1))),
        );
        setActiveIndex(index);
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveIndex(null)}
            className="relative mx-auto flex w-full max-w-3xl items-start justify-between px-2"
            role="img"
            aria-label="Fluxo de infraestrutura: Usuário, Rede, Infraestrutura, VPS e Aplicação conectados"
        >
            {NODES.map((node, index) => {
                const isActive = activeIndex === index;
                const connectionActive =
                    activeIndex !== null &&
                    (activeIndex === index || activeIndex === index + 1);

                return (
                    <div
                        key={node.label}
                        className="relative flex flex-1 items-start last:flex-none"
                    >
                        <motion.div
                            initial={reduced ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                ...enterTransition,
                                delay: reduced ? 0 : index * 0.04,
                            }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div
                                className={cn(
                                    'flex h-11 w-11 items-center justify-center rounded-md border transition-[background-color,border-color,color] duration-200',
                                    node.highlight
                                        ? 'border-primary/55 bg-primary/10 text-primary-light'
                                        : 'border-border bg-background-tertiary text-muted-foreground',
                                    isActive &&
                                        'border-primary/70 bg-primary/10 text-primary-light',
                                )}
                            >
                                {node.icon}
                            </div>
                            <span
                                className={cn(
                                    'font-mono text-[11px] tracking-wide uppercase transition-colors duration-200',
                                    isActive
                                        ? 'text-primary-light'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {node.label}
                            </span>
                        </motion.div>

                        {index < NODES.length - 1 && (
                            <div className="relative top-[22px] mx-1 h-px flex-1 bg-border">
                                <motion.div
                                    initial={reduced ? false : { scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                        ...enterTransition,
                                        delay: reduced
                                            ? 0
                                            : 0.08 + index * 0.04,
                                    }}
                                    style={{ transformOrigin: 'left' }}
                                    className={cn(
                                        'absolute inset-0 h-px transition-colors duration-200',
                                        connectionActive
                                            ? 'bg-primary/70'
                                            : 'bg-border',
                                    )}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
