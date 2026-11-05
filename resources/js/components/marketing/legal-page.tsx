import type { ReactNode } from 'react';

export function LegalPage({
    title,
    updatedAt,
    children,
}: {
    title: string;
    updatedAt: string;
    children: ReactNode;
}) {
    return (
        <div className="pt-24">
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {title}
                </h1>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                    Última atualização: {updatedAt}
                </p>

                <div className="prose-legal mt-10 flex flex-col gap-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function LegalSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                {children}
            </div>
        </section>
    );
}
