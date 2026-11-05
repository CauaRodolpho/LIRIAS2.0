import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    Activity,
    ArrowLeft,
    ArrowRight,
    Bot,
    Check,
    Code2,
    Database,
    Gamepad2,
    Globe2,
    HardDrive,
    KeyRound,
    Layers3,
    MemoryStick,
    Network,
    RotateCcw,
    Server,
    ShieldCheck,
    ShoppingBag,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { AnimatedGridBackground } from '@/components/shared';
import { Badge, Button } from '@/components/ui';
import { PLANS_DATA } from '@/data';
import { cn } from '@/lib/utils';

type GoalId = 'website' | 'api' | 'automation' | 'ecommerce' | 'ai' | 'games';
type DemandId = 'start' | 'growth' | 'scale';
type PriorityId = 'docker' | 'database' | 'backup';

type Goal = {
    id: GoalId;
    title: string;
    description: string;
    stack: string[];
    os: string;
    basePlan: number;
    icon: LucideIcon;
};

const GOALS: Goal[] = [
    {
        id: 'website',
        title: 'Site ou aplicação web',
        description: 'Landing pages, portais e aplicações modernas.',
        stack: ['Nginx', 'Node.js', 'SSL'],
        os: 'Ubuntu 24.04 LTS',
        basePlan: 0,
        icon: Globe2,
    },
    {
        id: 'api',
        title: 'API ou SaaS',
        description: 'Backends, workers, filas e serviços conectados.',
        stack: ['Docker', 'Node.js', 'PostgreSQL'],
        os: 'Ubuntu 24.04 LTS',
        basePlan: 1,
        icon: Code2,
    },
    {
        id: 'automation',
        title: 'Automação com n8n',
        description: 'Fluxos, webhooks e integrações entre sistemas.',
        stack: ['n8n', 'Docker', 'PostgreSQL'],
        os: 'Debian 13',
        basePlan: 1,
        icon: Workflow,
    },
    {
        id: 'ecommerce',
        title: 'E-commerce',
        description: 'Loja, banco de dados, cache e integrações.',
        stack: ['WooCommerce', 'MariaDB', 'Redis'],
        os: 'Ubuntu 24.04 LTS',
        basePlan: 1,
        icon: ShoppingBag,
    },
    {
        id: 'ai',
        title: 'Agente ou serviço de IA',
        description: 'Agentes, modelos, APIs e bases vetoriais.',
        stack: ['Docker', 'Python', 'PostgreSQL'],
        os: 'Ubuntu 24.04 LTS',
        basePlan: 2,
        icon: Bot,
    },
    {
        id: 'games',
        title: 'Servidor de jogos',
        description: 'Comunidades, sessões online e servidores com mods.',
        stack: ['LinuxGSM', 'Docker', 'Backups'],
        os: 'Debian 13',
        basePlan: 2,
        icon: Gamepad2,
    },
];

const DEMANDS: Array<{
    id: DemandId;
    title: string;
    description: string;
    level: number;
}> = [
    {
        id: 'start',
        title: 'Começando',
        description: 'Projeto novo, testes ou tráfego inicial.',
        level: 0,
    },
    {
        id: 'growth',
        title: 'Em crescimento',
        description: 'Uso constante e espaço para evoluir.',
        level: 1,
    },
    {
        id: 'scale',
        title: 'Operação intensa',
        description: 'Mais acessos, processos e dados simultâneos.',
        level: 2,
    },
];

const PRIORITIES: Array<{
    id: PriorityId;
    title: string;
    description: string;
    icon: LucideIcon;
}> = [
    {
        id: 'docker',
        title: 'Ambiente com Docker',
        description: 'Aplicações isoladas e implantação reproduzível.',
        icon: Layers3,
    },
    {
        id: 'database',
        title: 'Banco no mesmo servidor',
        description: 'Reserve mais memória para dados e cache.',
        icon: Database,
    },
    {
        id: 'backup',
        title: 'Recuperação simplificada',
        description: 'Inclua snapshots na preparação do ambiente.',
        icon: ShieldCheck,
    },
];

const STEPS = ['Projeto', 'Demanda', 'Prioridades', 'Recomendação'];

export default function LaunchpadPage() {
    const reducedMotion = useReducedMotion();
    const [step, setStep] = useState(0);
    const [goalId, setGoalId] = useState<GoalId>('automation');
    const [demandId, setDemandId] = useState<DemandId>('growth');
    const [priorities, setPriorities] = useState<PriorityId[]>([
        'docker',
        'backup',
    ]);

    const goal = GOALS.find((item) => item.id === goalId) ?? GOALS[0]!;
    const demand = DEMANDS.find((item) => item.id === demandId) ?? DEMANDS[0]!;
    const plan = useMemo(() => {
        const databaseBoost = priorities.includes('database') ? 1 : 0;
        const index = Math.min(
            Math.max(goal.basePlan, demand.level) + databaseBoost,
            PLANS_DATA.length - 1,
        );
        return PLANS_DATA[index]!;
    }, [demand.level, goal.basePlan, priorities]);

    const togglePriority = (id: PriorityId) => {
        setPriorities((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const restart = () => {
        setGoalId('automation');
        setDemandId('growth');
        setPriorities(['docker', 'backup']);
        setStep(0);
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-background pt-28 pb-20 sm:pt-32">
            <AnimatedGridBackground className="opacity-70" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <Badge variant="primary">
                        <Network className="h-3.5 w-3.5" /> Lirias Deploy
                    </Badge>
                    <h1 className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-6xl">
                        Seu projeto entra.{' '}
                        <span className="text-primary">
                            A infraestrutura sai definida.
                        </span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        Transforme o cenário da sua aplicação em uma
                        configuração inicial de VPS, sistema e stack — sem
                        começar por uma tabela de especificações.
                    </p>
                </div>

                <ol
                    className="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-2"
                    aria-label="Etapas da recomendação"
                >
                    {STEPS.map((label, index) => (
                        <li key={label} className="min-w-0">
                            <div
                                className={cn(
                                    'h-1 rounded-full transition-colors',
                                    index <= step ? 'bg-primary' : 'bg-border',
                                )}
                            />
                            <span
                                className={cn(
                                    'mt-2 block truncate text-center text-[11px] font-medium sm:text-xs',
                                    index <= step
                                        ? 'text-foreground'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {label}
                            </span>
                        </li>
                    ))}
                </ol>

                <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
                    <section
                        className="min-h-[34rem] border-y border-border bg-transparent p-5 sm:p-8"
                        aria-live="polite"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={
                                    reducedMotion
                                        ? false
                                        : { opacity: 0, x: 18 }
                                }
                                animate={{ opacity: 1, x: 0 }}
                                exit={
                                    reducedMotion
                                        ? undefined
                                        : { opacity: 0, x: -18 }
                                }
                                transition={{
                                    duration: reducedMotion ? 0 : 0.22,
                                }}
                            >
                                {step === 0 && (
                                    <StepShell
                                        number="01"
                                        title="O que você quer colocar online?"
                                        description="Escolha o cenário mais próximo. Você poderá ajustar tudo depois."
                                    >
                                        <div
                                            className="grid gap-3 sm:grid-cols-2"
                                            role="radiogroup"
                                            aria-label="Tipo de projeto"
                                        >
                                            {GOALS.map((item) => (
                                                <ChoiceCard
                                                    key={item.id}
                                                    selected={
                                                        goalId === item.id
                                                    }
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                    icon={item.icon}
                                                    onClick={() =>
                                                        setGoalId(item.id)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </StepShell>
                                )}

                                {step === 1 && (
                                    <StepShell
                                        number="02"
                                        title="Qual é o momento do projeto?"
                                        description="A demanda ajuda a reservar recursos sem começar com capacidade desnecessária."
                                    >
                                        <div
                                            className="grid gap-3"
                                            role="radiogroup"
                                            aria-label="Nível de demanda"
                                        >
                                            {DEMANDS.map((item, index) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={
                                                        demandId === item.id
                                                    }
                                                    onClick={() =>
                                                        setDemandId(item.id)
                                                    }
                                                    className={cn(
                                                        'group flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-[background-color,border-color] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:p-5',
                                                        demandId === item.id
                                                            ? 'border-primary bg-primary/10'
                                                            : 'border-border bg-background/45 hover:border-border-hover hover:bg-accent/50',
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border font-display text-sm font-semibold',
                                                            demandId === item.id
                                                                ? 'border-primary/30 bg-primary text-primary-foreground'
                                                                : 'border-border bg-card text-muted-foreground',
                                                        )}
                                                    >
                                                        0{index + 1}
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block font-semibold text-foreground">
                                                            {item.title}
                                                        </span>
                                                        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                                                            {item.description}
                                                        </span>
                                                    </span>
                                                    {demandId === item.id && (
                                                        <Check className="h-5 w-5 shrink-0 text-primary-light" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </StepShell>
                                )}

                                {step === 2 && (
                                    <StepShell
                                        number="03"
                                        title="O que é prioridade para você?"
                                        description="Selecione quantas opções precisar para refinar a configuração."
                                    >
                                        <div className="grid gap-3">
                                            {PRIORITIES.map((item) => {
                                                const selected =
                                                    priorities.includes(
                                                        item.id,
                                                    );
                                                const Icon = item.icon;
                                                return (
                                                    <button
                                                        key={item.id}
                                                        type="button"
                                                        aria-pressed={selected}
                                                        onClick={() =>
                                                            togglePriority(
                                                                item.id,
                                                            )
                                                        }
                                                        className={cn(
                                                            'flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-[background-color,border-color] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:p-5',
                                                            selected
                                                                ? 'border-primary bg-primary/10'
                                                                : 'border-border bg-background/45 hover:border-border-hover hover:bg-accent/50',
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border',
                                                                selected
                                                                    ? 'border-primary/30 bg-primary text-primary-foreground'
                                                                    : 'border-border bg-card text-muted-foreground',
                                                            )}
                                                        >
                                                            <Icon className="h-5 w-5" />
                                                        </span>
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block font-semibold text-foreground">
                                                                {item.title}
                                                            </span>
                                                            <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                                                                {
                                                                    item.description
                                                                }
                                                            </span>
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
                                                                selected
                                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                                    : 'border-border',
                                                            )}
                                                            aria-hidden="true"
                                                        >
                                                            {selected && (
                                                                <Check className="h-4 w-4" />
                                                            )}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </StepShell>
                                )}

                                {step === 3 && (
                                    <StepShell
                                        number="04"
                                        title="Sua base está pronta"
                                        description="Esta é uma recomendação demonstrativa. Recursos e stack continuam ajustáveis antes da contratação."
                                    >
                                        <div className="rounded-lg border border-primary/25 bg-primary/10 p-5 sm:p-6">
                                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <Badge
                                                        variant="success"
                                                        dot
                                                    >
                                                        Configuração compatível
                                                    </Badge>
                                                    <h2 className="mt-4 text-2xl font-semibold text-foreground">
                                                        {goal.title}
                                                    </h2>
                                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                        Preparada para um
                                                        projeto{' '}
                                                        {demand.title.toLowerCase()}
                                                        , com espaço para
                                                        evoluir.
                                                    </p>
                                                </div>
                                                <div className="rounded-lg border border-primary/20 bg-background/65 px-4 py-3 text-left sm:text-right">
                                                    <p className="text-xs text-muted-foreground">
                                                        Plano recomendado
                                                    </p>
                                                    <p className="mt-1 font-display text-lg font-semibold text-primary-light">
                                                        {plan.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {goal.stack.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <ProvisioningSequence
                                            reducedMotion={Boolean(
                                                reducedMotion,
                                            )}
                                        />

                                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                            <Button
                                                size="lg"
                                                asChild
                                                rightIcon={
                                                    <ArrowRight className="h-4 w-4" />
                                                }
                                            >
                                                <Link
                                                    href={`/checkout?plan=${plan.id}&goal=${goal.id}&os=${goal.os.startsWith('Windows') ? 'windows' : 'linux'}&distro=${encodeURIComponent(goal.os)}&stack=${encodeURIComponent(goal.stack.join(','))}`}
                                                >
                                                    Continuar para revisão
                                                </Link>
                                            </Button>
                                            <Button
                                                size="lg"
                                                variant="secondary"
                                                asChild
                                            >
                                                <Link href="/pricing">
                                                    Comparar todos os planos
                                                </Link>
                                            </Button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={restart}
                                            className="mx-auto mt-5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                                        >
                                            <RotateCcw className="h-4 w-4" />{' '}
                                            Refazer recomendação
                                        </button>
                                    </StepShell>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {step < 3 && (
                            <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={step === 0}
                                    onClick={() =>
                                        setStep((current) =>
                                            Math.max(0, current - 1),
                                        )
                                    }
                                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setStep((current) =>
                                            Math.min(3, current + 1),
                                        )
                                    }
                                    rightIcon={
                                        <ArrowRight className="h-4 w-4" />
                                    }
                                >
                                    {step === 2
                                        ? 'Ver recomendação'
                                        : 'Continuar'}
                                </Button>
                            </div>
                        )}
                    </section>

                    <aside
                        className="sticky top-24 overflow-hidden border-y border-border bg-card/45"
                        aria-label="Resumo da configuração"
                    >
                        <div className="border-b border-border bg-primary/10 p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="font-mono text-[10px] tracking-[0.18em] text-primary-light uppercase">
                                        Configuração / ao vivo
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                                        {plan.name}
                                    </h2>
                                </div>
                                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary text-primary-foreground">
                                    <Server className="h-5 w-5" />
                                </span>
                            </div>
                            <div className="mt-5 flex items-end gap-1">
                                <span className="font-display text-3xl font-semibold text-foreground">
                                    R${' '}
                                    {plan.priceMonthly
                                        .toFixed(2)
                                        .replace('.', ',')}
                                </span>
                                <span className="pb-1 text-xs text-muted-foreground">
                                    /mês
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <dl className="grid grid-cols-3 gap-2">
                                <Metric
                                    icon={Server}
                                    label="vCPU"
                                    value={String(plan.vcpu)}
                                    load={56}
                                    delay={0}
                                />
                                <Metric
                                    icon={MemoryStick}
                                    label="RAM"
                                    value={`${plan.ram} GB`}
                                    load={72}
                                    delay={0.12}
                                />
                                <Metric
                                    icon={HardDrive}
                                    label="NVMe"
                                    value={`${plan.disk} GB`}
                                    load={44}
                                    delay={0.24}
                                />
                            </dl>
                            <div className="mt-5 space-y-4 border-t border-border pt-5 text-sm">
                                <SummaryRow
                                    label="Projeto"
                                    value={goal.title}
                                />
                                <SummaryRow
                                    label="Demanda"
                                    value={demand.title}
                                />
                                <SummaryRow label="Sistema" value={goal.os} />
                                <SummaryRow
                                    label="Transferência"
                                    value={`${plan.bandwidth} TB`}
                                />
                            </div>
                            <div className="mt-5 rounded-lg border border-border bg-background/55 p-4">
                                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                    Stack sugerida
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {goal.stack.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-md bg-accent px-2.5 py-1 text-xs text-foreground"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-4 text-xs leading-5 text-muted-foreground">
                                Estimativa para planejamento. A contratação e o
                                provisionamento real serão conectados ao backend
                                posteriormente.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function StepShell({
    number,
    title,
    description,
    children,
}: {
    number: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className="font-mono text-xs tracking-[0.18em] text-primary-light uppercase">
                Etapa {number}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
            </h2>
            <p className="mt-2 mb-6 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {description}
            </p>
            {children}
        </div>
    );
}

function ChoiceCard({
    selected,
    title,
    description,
    icon: Icon,
    onClick,
}: {
    selected: boolean;
    title: string;
    description: string;
    icon: LucideIcon;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={onClick}
            className={cn(
                'relative flex min-h-36 flex-col items-start rounded-lg border p-4 text-left transition-[background-color,border-color] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:p-5',
                selected
                    ? 'border-primary bg-primary/10 shadow-[inset_0_0_0_1px_hsl(var(--primary)/.15)]'
                    : 'border-border bg-background/45 hover:border-border-hover hover:bg-accent/50',
            )}
        >
            <span
                className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg border',
                    selected
                        ? 'border-primary/30 bg-primary text-primary-foreground'
                        : 'border-border bg-card text-primary-light',
                )}
            >
                <Icon className="h-5 w-5" />
            </span>
            <span className="mt-4 font-semibold text-foreground">{title}</span>
            <span className="mt-1 text-sm leading-5 text-muted-foreground">
                {description}
            </span>
            {selected && (
                <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                </span>
            )}
        </button>
    );
}

function Metric({
    icon: Icon,
    label,
    value,
    load,
    delay,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
    load: number;
    delay: number;
}) {
    return (
        <div className="rounded-lg border border-border bg-background/55 p-3">
            <div className="flex items-center justify-between gap-2">
                <Icon className="h-4 w-4 text-primary-light" />
                <dd className="font-display text-sm font-semibold text-foreground">
                    {value}
                </dd>
            </div>
            <dt className="mt-3 text-[10px] tracking-wider text-muted-foreground uppercase">
                {label}
            </dt>
            <span className="mt-2 block h-1 overflow-hidden rounded-full bg-border">
                <motion.span
                    className="block h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${load}%` }}
                    transition={{
                        duration: 0.75,
                        delay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />
            </span>
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="max-w-[62%] text-right font-medium text-foreground">
                {value}
            </dd>
        </div>
    );
}

const PROVISIONING_SEQUENCE = [
    {
        label: 'Recursos reservados',
        detail: 'CPU, memória e NVMe',
        icon: Server,
    },
    {
        label: 'Sistema preparado',
        detail: 'Imagem e serviços essenciais',
        icon: HardDrive,
    },
    {
        label: 'Rede configurada',
        detail: 'Endereço e regras iniciais',
        icon: Network,
    },
    {
        label: 'Acesso protegido',
        detail: 'Credenciais e recuperação',
        icon: KeyRound,
    },
];

function ProvisioningSequence({ reducedMotion }: { reducedMotion: boolean }) {
    return (
        <div className="mt-5 overflow-hidden rounded-lg border border-border bg-[#08070b] p-4 text-white sm:p-5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-white/55 uppercase">
                    <Activity className="h-3.5 w-3.5 text-primary-light" />{' '}
                    Sequência de provisionamento
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] text-success-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />{' '}
                    Simulação concluída
                </span>
            </div>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                {PROVISIONING_SEQUENCE.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.li
                            key={item.label}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: reducedMotion ? 0 : 0.3,
                                delay: reducedMotion ? 0 : index * 0.14,
                            }}
                            className="flex items-center gap-3 border border-white/10 bg-white/[0.035] p-3"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-success/30 bg-success/10 text-success-light">
                                <Icon className="h-4 w-4" />
                            </span>
                            <span>
                                <span className="block text-xs font-medium text-white">
                                    {item.label}
                                </span>
                                <span className="mt-0.5 block text-[10px] text-white/45">
                                    {item.detail}
                                </span>
                            </span>
                        </motion.li>
                    );
                })}
            </ol>
        </div>
    );
}
