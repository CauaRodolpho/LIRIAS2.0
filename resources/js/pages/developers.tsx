import {
    ArrowRight,
    Braces,
    FileCode2,
    Gauge,
    GitBranch,
    TerminalSquare,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { Badge, Button } from '@/components/ui';

const resources = [
    {
        title: 'Documentação',
        description: 'Guias organizados por tarefa, sistema e nível de acesso.',
        meta: 'Linux, Windows e API',
        icon: FileCode2,
        href: '/docs',
        status: 'Em preparação',
        available: false,
    },
    {
        title: 'Catálogo de stacks',
        description:
            'Ambientes compatíveis e requisitos visíveis antes do deploy.',
        meta: '10 bases disponíveis',
        icon: Braces,
        href: '/applications',
        status: 'Disponível',
        available: true,
    },
    {
        title: 'Status da plataforma',
        description: 'Disponibilidade, manutenção e comunicação de incidentes.',
        meta: 'Operação nacional',
        icon: Gauge,
        href: '/status',
        status: 'Em preparação',
        available: false,
    },
];

export default function DevelopersPage() {
    return (
        <section className="min-h-screen pt-28 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
                    <div>
                        <Badge variant="primary">Desenvolvedores</Badge>
                        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                            Recursos para construir e operar na LIRIAS
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                            Uma área organizada para documentação, aplicações e
                            futuras integrações da plataforma.
                        </p>
                        <Button
                            asChild
                            className="mt-8"
                            rightIcon={<ArrowRight className="h-4 w-4" />}
                        >
                            <Link href="/applications">Abrir catálogo</Link>
                        </Button>
                    </div>

                    <div className="border-y border-border py-6 font-mono text-sm text-foreground lg:border-y-0 lg:border-l lg:py-2 lg:pl-10">
                        <div className="mb-5 flex items-center gap-2 border-b border-border pb-4 text-muted-foreground">
                            <TerminalSquare className="h-4 w-4" /> estrutura de
                            integração
                        </div>
                        <p>
                            <span className="text-primary-light">$</span> lirias
                            applications list
                        </p>
                        <p className="mt-4 text-muted-foreground">
                            → Catálogo carregado
                        </p>
                        <p className="text-muted-foreground">→ Rotas tipadas</p>
                        <p className="text-muted-foreground">
                            → Serviços preparados para API
                        </p>
                        <p className="mt-5">
                            <span className="text-success">✓</span> front-end
                            pronto para evoluir
                            <span className="terminal-caret ml-1 inline-block h-4 w-1.5 bg-primary-light align-middle" />
                        </p>
                    </div>
                </div>

                <div className="mt-16 divide-y divide-border border-y border-border lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                    {resources.map(
                        ({
                            title,
                            description,
                            meta,
                            icon: Icon,
                            href,
                            status,
                            available,
                        }) => (
                            <Link
                                key={title}
                                href={href}
                                className="group relative flex min-h-56 flex-col bg-transparent px-1 py-7 transition-colors outline-none hover:bg-card/35 focus-visible:bg-card/35 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset sm:px-6"
                            >
                                <span
                                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                                    aria-hidden="true"
                                />
                                <div className="flex items-start justify-between gap-4">
                                    <Icon
                                        className="h-5 w-5 text-primary-light"
                                        aria-hidden="true"
                                    />
                                    <ArrowRight
                                        className="h-4 w-4 text-muted-foreground transition-[color,transform] group-hover:translate-x-1 group-hover:text-primary-light"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h2 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                                    {title}
                                </h2>
                                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                                    {description}
                                </p>
                                <div className="mt-5 flex items-end justify-between gap-4 border-t border-border/70 pt-4">
                                    <div>
                                        <p className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                                            Escopo
                                        </p>
                                        <p className="mt-1.5 text-xs font-medium text-foreground/80">
                                            {meta}
                                        </p>
                                    </div>
                                    <span
                                        className={
                                            available
                                                ? 'inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] text-success uppercase'
                                                : 'inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase'
                                        }
                                    >
                                        <span
                                            className={
                                                available
                                                    ? 'h-1.5 w-1.5 rounded-full bg-success'
                                                    : 'h-1.5 w-1.5 rounded-full bg-muted-foreground/50'
                                            }
                                            aria-hidden="true"
                                        />
                                        {status}
                                    </span>
                                </div>
                            </Link>
                        ),
                    )}
                </div>

                <div className="mt-10 flex items-center gap-3 border-y border-border py-5 text-sm text-muted-foreground">
                    <GitBranch className="h-5 w-5 shrink-0 text-primary-light" />
                    A interface está organizada para substituir os dados
                    demonstrativos por serviços reais sem reconstruir as
                    páginas.
                </div>
            </div>
        </section>
    );
}
