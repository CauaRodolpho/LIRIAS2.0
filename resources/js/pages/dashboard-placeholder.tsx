import { Construction } from 'lucide-react';
import { useOutletContext } from '@/lib/routing';
import { DashboardTopbar } from '@/components/dashboard';

export default function DashboardPlaceholderPage({ title }: { title: string }) {
    const { openNavigation } = useOutletContext<{
        openNavigation: () => void;
    }>();

    return (
        <>
            <DashboardTopbar title={title} onOpenNavigation={openNavigation} />
            <div className="flex flex-1 items-center justify-center overflow-y-auto p-6">
                <div className="surface-card max-w-md p-8 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                        <Construction className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 text-xl font-semibold text-foreground">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Este módulo faz parte do próximo ciclo do painel. A rota
                        já está estruturada para receber a interface e os dados
                        do backend.
                    </p>
                </div>
            </div>
        </>
    );
}
