import { ArrowLeft } from 'lucide-react';
import AppLink from '@/components/navigation/app-link';
import { Button } from '@/components/ui';

export default function NotFoundPage() {
    return (
        <main
            id="main-content"
            className="flex min-h-screen items-center justify-center bg-background px-4"
        >
            <div className="max-w-lg text-center">
                <p className="font-mono text-sm font-semibold text-primary-light">
                    ERRO 404
                </p>
                <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
                    Página não encontrada
                </h1>
                <p className="mt-4 text-muted-foreground">
                    O endereço acessado não existe ou foi movido.
                </p>
                <Button
                    asChild
                    variant="primary"
                    size="lg"
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                    className="mt-8"
                >
                    <AppLink href="/">Voltar ao início</AppLink>
                </Button>
            </div>
        </main>
    );
}
