import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { ApplicationIcon } from '@/components/applications';
import {
    Badge,
    Button,
    Input,
    SegmentedControl,
    StatePanel,
} from '@/components/ui';
import {
    APPLICATION_CATALOG,
    APPLICATION_CATEGORIES,
} from '@/data/application-catalog';

export default function ApplicationsPage() {
    const [query, setQuery] = useState('');
    const [category, setCategory] =
        useState<(typeof APPLICATION_CATEGORIES)[number]>('Todos');
    const reduceMotion = useReducedMotion();

    const applications = useMemo(() => {
        const term = query.trim().toLocaleLowerCase('pt-BR');
        return APPLICATION_CATALOG.filter((application) => {
            const matchesCategory =
                category === 'Todos' || application.category === category;
            const matchesTerm =
                !term ||
                `${application.name} ${application.description} ${application.category}`
                    .toLocaleLowerCase('pt-BR')
                    .includes(term);
            return matchesCategory && matchesTerm;
        });
    }, [category, query]);

    const hasActiveFilter = category !== 'Todos' || query.trim() !== '';
    const categoryOptions = APPLICATION_CATEGORIES.map((item) => ({
        value: item,
        label: item,
        count:
            item === 'Todos'
                ? APPLICATION_CATALOG.length
                : APPLICATION_CATALOG.filter(
                      (application) => application.category === item,
                  ).length,
    }));

    return (
        <section
            className="min-h-screen pt-28 pb-24"
            aria-labelledby="applications-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_.72fr] lg:items-end">
                    <div>
                        <Badge variant="primary">Catálogo LIRIAS</Badge>
                        <h1
                            id="applications-heading"
                            className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                        >
                            Encontre a base certa para o seu projeto
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            Explore aplicações e stacks compatíveis com
                            ambientes VPS. A implantação exibida nesta versão é
                            demonstrativa.
                        </p>
                    </div>

                    <div className="border-b border-border pb-2 transition-colors focus-within:border-primary/60">
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Pesquisar aplicação ou categoria"
                            leftIcon={<Search className="h-4 w-4" />}
                            aria-label="Pesquisar no catálogo"
                            className="border-0 bg-transparent shadow-none focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <SegmentedControl
                        label="Filtrar aplicações por categoria"
                        value={category}
                        options={categoryOptions}
                        onChange={setCategory}
                    />
                </div>

                <section
                    className="mt-12"
                    aria-labelledby="application-directory-heading"
                >
                    <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.18em] text-primary-light uppercase">
                                {hasActiveFilter
                                    ? 'Resultados do catálogo'
                                    : 'Biblioteca de ambientes'}
                            </p>
                            <h2
                                id="application-directory-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight text-foreground"
                            >
                                {hasActiveFilter
                                    ? 'Aplicações encontradas'
                                    : 'Aplicações e stacks'}
                            </h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                                {applications.length}
                            </strong>{' '}
                            {applications.length === 1
                                ? 'ambiente disponível'
                                : 'ambientes disponíveis'}
                        </p>
                    </div>

                    {applications.length > 0 ? (
                        <motion.div
                            layout
                            className="mt-6 grid border-y border-border lg:grid-cols-2"
                        >
                            <AnimatePresence initial={false} mode="popLayout">
                                {applications.map((application) => (
                                    <motion.div
                                        layout
                                        key={application.slug}
                                        className="border-b border-border bg-background last:border-b-0 lg:[&:nth-child(odd)]:border-r lg:[&:nth-last-child(-n+2)]:border-b-0"
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, y: 8 }
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={
                                            reduceMotion
                                                ? undefined
                                                : { opacity: 0, y: -6 }
                                        }
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link
                                            href={`/applications/${application.slug}`}
                                            aria-label={`Abrir configuração de ${application.name}`}
                                            className="group relative flex h-full min-h-48 flex-col bg-background px-5 py-6 transition-colors duration-200 outline-none hover:bg-card/70 focus-visible:z-10 focus-visible:bg-card/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset sm:px-6"
                                        >
                                            <span
                                                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                                                aria-hidden="true"
                                            />

                                            <div className="flex items-start justify-between gap-4">
                                                <ApplicationIcon
                                                    application={application}
                                                />
                                                <ArrowRight
                                                    className="mt-1 h-4 w-4 text-muted-foreground transition-[color,transform] group-hover:translate-x-1 group-hover:text-primary-light group-focus-visible:translate-x-1 group-focus-visible:text-primary-light"
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            <div className="mt-5">
                                                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                                                    {application.category}
                                                </p>
                                                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                                                    {application.name}
                                                </h3>
                                            </div>

                                            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                                                {application.description}
                                            </p>

                                            <div className="mt-5 border-t border-border/70 pt-4">
                                                <p className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                                                    Requisito base
                                                </p>
                                                <p className="mt-1.5 truncate text-xs font-medium text-foreground/80">
                                                    {
                                                        application
                                                            .requirements[0]
                                                    }
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="mt-6 border-y border-dashed border-border">
                            <StatePanel
                                kind="empty"
                                title="Nenhuma aplicação encontrada"
                                description="Tente outro termo ou remova o filtro selecionado."
                                action={
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => {
                                            setQuery('');
                                            setCategory('Todos');
                                        }}
                                    >
                                        Limpar filtros
                                    </Button>
                                }
                            />
                        </div>
                    )}
                </section>
            </div>
        </section>
    );
}
