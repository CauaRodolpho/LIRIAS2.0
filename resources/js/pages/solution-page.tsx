import {
    ArrowRight,
    Bot,
    Boxes,
    Code2,
    Database,
    ShoppingBag,
    Workflow,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { Badge, Button, Card } from '@/components/ui';

const SOLUTIONS = {
    agents: {
        eyebrow: 'Agentes e serviços de IA',
        title: 'Uma base para executar agentes e serviços conectados',
        description:
            'Organize runtime, banco, filas e integrações em uma VPS sob administração da sua equipe.',
        icon: Bot,
        items: [
            [
                'Runtime configurável',
                'Prepare o ambiente para o framework e o modelo usados pelo projeto.',
                Code2,
            ],
            [
                'Dados e memória',
                'Conecte bancos, cache e armazenamento necessários para o agente.',
                Database,
            ],
            [
                'Fluxos integrados',
                'Combine APIs, webhooks e automações da operação.',
                Workflow,
            ],
        ],
    },
    ecommerce: {
        eyebrow: 'Lojas e operações digitais',
        title: 'Infraestrutura organizada para sua plataforma de vendas',
        description:
            'Visualize como aplicação, banco e serviços de apoio podem ser distribuídos no ambiente.',
        icon: ShoppingBag,
        items: [
            [
                'Aplicação',
                'Hospede a plataforma escolhida e seus processos de execução.',
                Boxes,
            ],
            [
                'Dados',
                'Planeje banco, cache e estratégia de cópias de segurança.',
                Database,
            ],
            [
                'Integrações',
                'Conecte pagamentos, estoque e ferramentas externas por API.',
                Workflow,
            ],
        ],
    },
} as const;

export default function SolutionPage({
    variant,
}: {
    variant: keyof typeof SOLUTIONS;
}) {
    const solution = SOLUTIONS[variant];
    const HeroIcon = solution.icon;
    return (
        <section className="min-h-screen pt-28 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="surface-card overflow-hidden">
                    <div className="grid lg:grid-cols-[1fr_380px]">
                        <div className="px-6 py-14 sm:px-12 lg:px-16">
                            <Badge variant="primary">{solution.eyebrow}</Badge>
                            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                                {solution.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                                {solution.description}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button
                                    asChild
                                    rightIcon={
                                        <ArrowRight className="h-4 w-4" />
                                    }
                                >
                                    <Link href="/applications">
                                        Explorar aplicações
                                    </Link>
                                </Button>
                                <Button asChild variant="secondary">
                                    <Link href="/pricing">Comparar planos</Link>
                                </Button>
                            </div>
                        </div>
                        <aside
                            className="border-t border-border bg-background-secondary p-6 lg:border-t-0 lg:border-l lg:p-8"
                            aria-label="Resumo técnico da solução"
                        >
                            <div className="flex items-center justify-between border-b border-border pb-5">
                                <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                                    Arquitetura sugerida
                                </span>
                                <HeroIcon
                                    className="h-5 w-5 text-primary-light"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="mt-5 space-y-3">
                                {solution.items.map(
                                    ([title, , Icon], index) => (
                                        <div
                                            key={title}
                                            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3.5"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary-light">
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-foreground">
                                                    {title}
                                                </p>
                                                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                                                    CAMADA{' '}
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </p>
                                            </div>
                                            <span
                                                className="h-2 w-2 rounded-full bg-success"
                                                aria-label="Disponível"
                                            />
                                        </div>
                                    ),
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {solution.items.map(([title, description, Icon]) => (
                        <Card key={title} className="p-6">
                            <Icon className="h-6 w-6 text-primary-light" />
                            <h2 className="mt-5 text-lg font-semibold">
                                {title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
