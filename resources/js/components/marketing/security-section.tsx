import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    Activity,
    ChevronRight,
    HardDrive,
    KeyRound,
    Server,
    Shield,
    type LucideIcon,
} from 'lucide-react';

import { SECURITY_FEATURES_DATA } from '@/data';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
    KeyRound,
    Shield,
    Activity,
    HardDrive,
};

export function SecuritySection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const reduceMotion = useReducedMotion();
    const activeFeature =
        SECURITY_FEATURES_DATA[activeIndex] ?? SECURITY_FEATURES_DATA[0]!;

    return (
        <section
            className="home-section relative overflow-hidden py-24 sm:py-32"
            aria-labelledby="security-heading"
        >
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-8">
                <div>
                    <p className="font-mono text-xs tracking-[0.22em] text-primary-light uppercase">
                        Controles do ambiente
                    </p>
                    <h2
                        id="security-heading"
                        className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Segurança construída em camadas
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                        Cada controle atua em uma parte diferente da operação.
                        Selecione uma camada para entender o papel dela no
                        servidor.
                    </p>

                    <div className="mt-8 border-l border-primary/45 py-1 pl-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                                <Shield
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </span>
                            <div>
                                <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                                    Camada selecionada
                                </p>
                                <p className="mt-0.5 text-sm font-semibold text-foreground">
                                    {activeFeature.title}
                                </p>
                            </div>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activeFeature.title}
                                initial={
                                    reduceMotion ? false : { opacity: 0, y: 8 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={
                                    reduceMotion
                                        ? undefined
                                        : { opacity: 0, y: -6 }
                                }
                                transition={{
                                    duration: reduceMotion ? 0 : 0.25,
                                }}
                                className="mt-4 min-h-[52px] text-sm leading-6 text-muted-foreground"
                            >
                                {activeFeature.description}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>

                <div
                    className="relative"
                    role="list"
                    aria-label="Camadas de segurança da VPS"
                >
                    <div
                        className="security-flow-track absolute top-8 bottom-16 left-[27px] w-px bg-border sm:left-[31px]"
                        aria-hidden="true"
                    >
                        <span className="security-flow-signal absolute left-1/2 h-16 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-primary to-transparent" />
                    </div>

                    <div className="space-y-3">
                        {SECURITY_FEATURES_DATA.map((feature, index) => {
                            const Icon = ICONS[feature.icon] ?? Shield;
                            const selected = activeIndex === index;
                            return (
                                <motion.button
                                    key={feature.title}
                                    type="button"
                                    role="listitem"
                                    onClick={() => setActiveIndex(index)}
                                    onFocus={() => setActiveIndex(index)}
                                    whileHover={
                                        reduceMotion ? undefined : { x: 4 }
                                    }
                                    transition={{ duration: 0.18 }}
                                    aria-pressed={selected}
                                    className={cn(
                                        'group relative flex w-full items-center gap-4 border-b border-border/70 px-0 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:gap-5 sm:py-5',
                                        selected
                                            ? 'border-primary/55 bg-primary/[0.035]'
                                            : 'bg-transparent hover:border-border-hover hover:bg-primary/[0.025]',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border bg-background/60 transition-colors sm:h-12 sm:w-12',
                                            selected
                                                ? 'border-primary/45 text-primary-light'
                                                : 'border-border text-muted-foreground group-hover:text-foreground',
                                        )}
                                    >
                                        <Icon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        {selected && (
                                            <span
                                                className="signal-pulse absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary text-primary"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                                            Camada{' '}
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="mt-1 block text-sm font-semibold text-foreground sm:text-base">
                                            {feature.title}
                                        </span>
                                    </span>
                                    <ChevronRight
                                        className={cn(
                                            'h-4 w-4 shrink-0 transition-transform',
                                            selected
                                                ? 'translate-x-0 text-primary-light'
                                                : '-translate-x-1 text-muted-foreground',
                                        )}
                                        aria-hidden="true"
                                    />
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="relative z-10 mt-5 flex items-center gap-4 border border-primary/35 bg-primary/10 p-4 sm:ml-12 sm:p-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/35 bg-primary/10 text-primary-light">
                            <Server className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                            <p className="font-mono text-[10px] tracking-[0.16em] text-primary-light uppercase">
                                Destino dos controles
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground">
                                Seu ambiente VPS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
