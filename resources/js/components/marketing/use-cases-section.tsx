import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ArrowRight,
    Boxes,
    Database,
    Gamepad2,
    Globe,
    LayoutDashboard,
    Server,
    ShoppingCart,
    Zap,
    type LucideIcon,
} from 'lucide-react';

import { USE_CASES_DATA } from '@/data';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
    Globe,
    Zap,
    Database,
    LayoutDashboard,
    Gamepad2,
    ShoppingCart,
};

const WORKLOAD_DETAILS: Record<
    string,
    { eyebrow: string; route: [string, string, string]; note: string }
> = {
    websites: {
        eyebrow: 'Experiência web',
        route: ['Código', 'VPS LIRIAS', 'Aplicação web'],
        note: 'Organize aplicação, servidor web e banco de dados no ambiente que fizer sentido para o projeto.',
    },
    apis: {
        eyebrow: 'Serviços conectados',
        route: ['Repositório', 'VPS LIRIAS', 'API'],
        note: 'Execute serviços, workers e integrações com liberdade para escolher sua própria stack.',
    },
    databases: {
        eyebrow: 'Dados sob controle',
        route: ['Aplicação', 'VPS LIRIAS', 'Banco de dados'],
        note: 'Defina engine, usuários, permissões e rotina de manutenção conforme a necessidade do sistema.',
    },
    saas: {
        eyebrow: 'Produto em evolução',
        route: ['Deploy', 'VPS LIRIAS', 'Produto SaaS'],
        note: 'Reúna aplicação e serviços de apoio em uma infraestrutura que você administra.',
    },
    games: {
        eyebrow: 'Sessões online',
        route: ['Jogadores', 'VPS LIRIAS', 'Servidor do jogo'],
        note: 'Configure o servidor, os mods e as regras da comunidade em um ambiente próprio.',
    },
    ecommerce: {
        eyebrow: 'Operação de loja',
        route: ['Catálogo', 'VPS LIRIAS', 'Loja online'],
        note: 'Hospede a plataforma e conecte pagamentos, estoque e serviços usados pela operação.',
    },
};

export function UseCasesSection() {
    const firstCase = USE_CASES_DATA[0]!;
    const [activeId, setActiveId] = useState(firstCase.id);
    const reduceMotion = useReducedMotion();
    const activeCase =
        USE_CASES_DATA.find((item) => item.id === activeId) ?? firstCase;
    const activeDetail =
        WORKLOAD_DETAILS[activeCase.id] ?? WORKLOAD_DETAILS.websites!;
    const ActiveIcon = ICONS[activeCase.icon] ?? Globe;

    return (
        <section
            className="home-section py-24 sm:py-32"
            aria-labelledby="usecases-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="font-mono text-xs tracking-[0.22em] text-primary-light uppercase">
                        Cargas de trabalho
                    </p>
                    <h2
                        id="usecases-heading"
                        className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Um servidor. Diferentes formas de construir.
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Escolha um cenário para visualizar como a VPS pode
                        entrar na arquitetura do seu projeto.
                    </p>
                </div>

                <div className="mt-12 grid overflow-hidden border-y border-border/70 bg-transparent lg:grid-cols-[0.72fr_1.28fr]">
                    <div
                        className="flex gap-1 overflow-x-auto border-b border-border/70 bg-transparent py-3 lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0 lg:py-5 lg:pr-5"
                        role="tablist"
                        aria-label="Escolha uma carga de trabalho"
                    >
                        {USE_CASES_DATA.map((useCase) => {
                            const Icon = ICONS[useCase.icon] ?? Globe;
                            const selected = useCase.id === activeCase.id;
                            return (
                                <button
                                    key={useCase.id}
                                    type="button"
                                    role="tab"
                                    id={`workload-tab-${useCase.id}`}
                                    aria-controls="workload-panel"
                                    aria-selected={selected}
                                    onClick={() => setActiveId(useCase.id)}
                                    className={cn(
                                        'group relative flex min-w-[178px] items-center gap-3 border-l-2 px-3.5 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none lg:min-w-0',
                                        selected
                                            ? 'border-primary bg-primary/[0.055] text-foreground'
                                            : 'border-transparent text-muted-foreground hover:border-border-hover hover:text-foreground',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex h-9 w-9 shrink-0 items-center justify-center border transition-colors',
                                            selected
                                                ? 'border-primary/35 bg-primary/10 text-primary-light'
                                                : 'border-border bg-background text-muted-foreground group-hover:text-foreground',
                                        )}
                                    >
                                        <Icon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-semibold">
                                            {useCase.title}
                                        </span>
                                        <span className="mt-0.5 hidden text-xs text-muted-foreground lg:block">
                                            {
                                                WORKLOAD_DETAILS[useCase.id]
                                                    ?.eyebrow
                                            }
                                        </span>
                                    </span>
                                    <ArrowRight
                                        className={cn(
                                            'hidden h-4 w-4 transition-transform lg:block',
                                            selected
                                                ? 'translate-x-0 text-primary-light'
                                                : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                                        )}
                                        aria-hidden="true"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div className="workload-canvas relative min-h-[500px] overflow-hidden p-6 sm:p-9 lg:p-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCase.id}
                                id="workload-panel"
                                role="tabpanel"
                                aria-labelledby={`workload-tab-${activeCase.id}`}
                                initial={
                                    reduceMotion ? false : { opacity: 0, x: 18 }
                                }
                                animate={{ opacity: 1, x: 0 }}
                                exit={
                                    reduceMotion
                                        ? undefined
                                        : { opacity: 0, x: -14 }
                                }
                                transition={{
                                    duration: reduceMotion ? 0 : 0.32,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="relative flex h-full flex-col"
                            >
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <p className="font-mono text-xs tracking-[0.18em] text-primary-light uppercase">
                                            {activeDetail.eyebrow}
                                        </p>
                                        <h3 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                                            {activeCase.title}
                                        </h3>
                                        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                                            {activeCase.description}
                                        </p>
                                    </div>
                                    <span className="hidden h-14 w-14 shrink-0 items-center justify-center border border-primary/25 bg-primary/[0.06] text-primary-light sm:flex">
                                        <ActiveIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>

                                <div className="mt-10 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                                    {activeDetail.route.map((step, index) => {
                                        const StepIcon =
                                            index === 0
                                                ? Boxes
                                                : index === 1
                                                  ? Server
                                                  : ActiveIcon;
                                        return (
                                            <div
                                                key={step}
                                                className="contents"
                                            >
                                                <div
                                                    className={cn(
                                                        'relative rounded-xl border p-4',
                                                        index === 1
                                                            ? 'border-primary/40 bg-primary/10'
                                                            : 'border-border bg-background/80',
                                                    )}
                                                >
                                                    <StepIcon
                                                        className={cn(
                                                            'h-5 w-5',
                                                            index === 1
                                                                ? 'text-primary-light'
                                                                : 'text-muted-foreground',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                                                        Etapa {index + 1}
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                                        {step}
                                                    </p>
                                                </div>
                                                {index <
                                                    activeDetail.route.length -
                                                        1 && (
                                                    <div
                                                        className="relative hidden h-px w-7 overflow-hidden bg-border sm:block"
                                                        aria-hidden="true"
                                                    >
                                                        <span className="workload-route-signal absolute inset-y-0 w-3 bg-primary" />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto pt-10">
                                    <div className="border-t border-border pt-5">
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {activeDetail.note}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {activeCase.techs.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-[11px] text-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
