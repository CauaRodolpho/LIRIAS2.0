import {
    ArrowLeft,
    ArrowRight,
    Check,
    Server,
    ShieldCheck,
} from 'lucide-react';
import { useParams } from '@/lib/routing';
import Link from '@/components/navigation/app-link';
import { ApplicationIcon } from '@/components/applications';
import { Badge, Button, Card } from '@/components/ui';
import { getApplicationBySlug } from '@/data/application-catalog';

export default function ApplicationDetailPage() {
    const { slug } = useParams();
    const application = getApplicationBySlug(slug);

    if (!application) {
        return (
            <section className="flex min-h-[75vh] items-center justify-center px-4 pt-20 text-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Aplicação não encontrada
                    </h1>
                    <Button asChild variant="secondary" className="mt-6">
                        <Link href="/applications">Voltar ao catálogo</Link>
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section
            className="min-h-screen pt-28 pb-24"
            aria-labelledby="application-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link
                    href="/applications"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" /> Catálogo de aplicações
                </Link>
                <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_.82fr] lg:items-start">
                    <div>
                        <div className="flex items-center gap-4">
                            <ApplicationIcon
                                application={application}
                                className="h-14 w-14"
                            />
                            <div>
                                <Badge>{application.category}</Badge>
                                <h1
                                    id="application-heading"
                                    className="mt-2 text-4xl font-bold sm:text-5xl"
                                >
                                    {application.name}
                                </h1>
                            </div>
                        </div>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                            {application.longDescription}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button
                                asChild
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                <Link
                                    href={`/dashboard/servers/srv-lirias-01/applications/${application.slug}`}
                                >
                                    Simular implantação
                                </Link>
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href="/pricing">Ver planos</Link>
                            </Button>
                        </div>
                        <div className="mt-10 rounded-2xl border border-primary/25 bg-primary/10 p-5">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" />
                                <div>
                                    <p className="font-semibold">
                                        Fluxo demonstrativo
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        Esta página prepara a experiência do
                                        front-end. Nenhuma instalação será
                                        executada até a integração com a
                                        infraestrutura real.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="border-b border-border bg-background-secondary px-6 py-5">
                            <p className="font-mono text-xs tracking-[0.18em] text-primary-light uppercase">
                                Prévia do fluxo
                            </p>
                            <h2 className="mt-2 text-xl font-semibold">
                                Preparar {application.name}
                            </h2>
                        </div>
                        <div className="p-6">
                            <p className="text-sm font-semibold text-foreground">
                                Antes de começar
                            </p>
                            <ul className="mt-4 space-y-3">
                                {application.requirements.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-3 text-sm text-muted-foreground"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                                            <Check className="h-3 w-3" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="my-6 h-px bg-border" />
                            <p className="text-sm font-semibold text-foreground">
                                Etapas previstas
                            </p>
                            <ol className="mt-4 space-y-3">
                                {application.steps.map((step, index) => (
                                    <li
                                        key={step}
                                        className="flex items-center gap-3 text-sm"
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background font-mono text-xs text-primary-light">
                                            {index + 1}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {step}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-background-secondary p-4">
                                <Server className="h-5 w-5 text-primary-light" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Destino demonstrativo
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        lirias-prod-01
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
