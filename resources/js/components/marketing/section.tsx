import type { HTMLAttributes, ReactNode } from 'react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

export function Section({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
    return (
        <section className={className} {...props}>
            {children}
        </section>
    );
}

export function Container({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
    return (
        <div
            className={
                className ?? 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'
            }
            {...props}
        >
            {children}
        </div>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    className,
}: {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    className?: string;
}) {
    return (
        <div className={className ?? 'mx-auto max-w-2xl text-center'}>
            <ScrollReveal>
                {eyebrow && (
                    <p className="font-mono text-[10px] font-medium tracking-[0.16em] text-primary-light uppercase">
                        {eyebrow}
                    </p>
                )}
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-4xl">
                    {title}
                </h2>
                {description && (
                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                        {description}
                    </p>
                )}
            </ScrollReveal>
        </div>
    );
}
