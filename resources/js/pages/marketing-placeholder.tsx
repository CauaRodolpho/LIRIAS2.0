import { ArrowLeft, Construction } from 'lucide-react';
import AppLink from '@/components/navigation/app-link';
import { Button } from '@/components/ui';

export default function MarketingPlaceholderPage({ title }: { title: string }) {
    return (
        <section
            className="flex min-h-[70vh] items-center py-32"
            aria-labelledby="placeholder-title"
        >
            <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-primary-light">
                    <Construction className="h-6 w-6" aria-hidden="true" />
                </span>
                <h1
                    id="placeholder-title"
                    className="mt-6 text-4xl font-bold text-foreground sm:text-5xl"
                >
                    {title}
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                    Esta página faz parte do protótipo front-end e está em
                    preparação. A rota já está pronta para receber o conteúdo
                    definitivo.
                </p>
                <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                    className="mt-8"
                >
                    <AppLink href="/">Voltar ao início</AppLink>
                </Button>
            </div>
        </section>
    );
}
