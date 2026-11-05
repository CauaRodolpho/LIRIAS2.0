import {
    ArrowRight,
    Bot,
    Database,
    Globe2,
    MessageSquare,
    Workflow,
    Zap,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { Badge, Button, Card } from '@/components/ui';

const destinations = [
    { icon: MessageSquare, label: 'Mensagens' },
    { icon: Database, label: 'Dados' },
    { icon: Globe2, label: 'APIs' },
];

export default function AutomationPage() {
    return (
        <section
            className="min-h-screen overflow-hidden pt-28 pb-24"
            aria-labelledby="automation-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                    <div>
                        <Badge variant="primary">Automação em VPS</Badge>
                        <h1
                            id="automation-heading"
                            className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl"
                        >
                            Conecte processos com n8n em um ambiente próprio
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                            Planeje fluxos, integrações e webhooks em uma VPS
                            administrada pela sua equipe. A experiência abaixo
                            demonstra como será o provisionamento pelo painel.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button
                                asChild
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                <Link href="/applications/n8n">
                                    Explorar n8n
                                </Link>
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href="/applications">Ver catálogo</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="automation-canvas relative min-h-[430px] overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 sm:p-10">
                        <div className="relative flex min-h-[350px] items-center justify-center">
                            <div className="absolute top-1/2 left-0 hidden -translate-y-1/2 items-center gap-3 sm:flex">
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground">
                                    <Bot className="h-6 w-6" />
                                </span>
                                <span className="automation-line relative h-px w-16 bg-border" />
                            </div>
                            <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-[2rem] border border-primary/40 bg-primary/10 shadow-[0_0_55px_hsl(var(--primary)/0.16)]">
                                <span className="signal-pulse absolute top-4 right-4 h-2 w-2 rounded-full bg-success text-success" />
                                <Workflow className="h-9 w-9 text-primary-light" />
                                <strong className="mt-3">n8n</strong>
                                <span className="text-xs text-muted-foreground">
                                    na sua VPS
                                </span>
                            </div>
                            <div className="absolute top-1/2 right-0 flex -translate-y-1/2 flex-col gap-3 sm:right-2">
                                {destinations.map(
                                    ({ icon: Icon, label }, index) => (
                                        <div
                                            key={label}
                                            className="relative flex items-center gap-3"
                                        >
                                            <span
                                                className="automation-branch absolute right-full mr-3 hidden h-px bg-border sm:block"
                                                style={{
                                                    width: `${54 + index * 10}px`,
                                                }}
                                            />
                                            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <span className="hidden w-20 text-sm font-medium sm:block">
                                                {label}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid gap-4 md:grid-cols-3">
                    {[
                        [
                            'Integrações organizadas',
                            'Conecte serviços por webhooks, APIs e credenciais definidas no próprio fluxo.',
                            Zap,
                        ],
                        [
                            'Ambiente administrado',
                            'Escolha recursos, domínio e políticas do servidor conforme o projeto.',
                            Workflow,
                        ],
                        [
                            'Evolução gradual',
                            'Comece com um fluxo e ajuste a infraestrutura conforme a operação crescer.',
                            ArrowRight,
                        ],
                    ].map(([title, description, Icon]) => {
                        const ItemIcon = Icon as typeof Zap;
                        return (
                            <Card key={String(title)} className="p-6">
                                <ItemIcon className="h-5 w-5 text-primary-light" />
                                <h2 className="mt-5 text-lg font-semibold">
                                    {String(title)}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {String(description)}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
