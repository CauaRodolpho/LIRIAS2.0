import Link from '@/components/navigation/app-link';
import { ArrowRight, Circle } from 'lucide-react';
import { Button } from '@/components/ui';

export interface ProductHeroProps {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    primaryHref: string;
}

export function ProductHero({
    badge,
    title,
    highlight,
    description,
    primaryCta,
    primaryHref,
}: ProductHeroProps) {
    return (
        <section className="product-hero-canvas relative overflow-hidden pt-32 pb-20 sm:pb-24">
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:px-8">
                <div className="max-w-3xl text-left">
                    <p className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-primary-light uppercase">
                        <span
                            className="h-px w-8 bg-primary/60"
                            aria-hidden="true"
                        />
                        {badge}
                    </p>
                    <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-6xl">
                        {title}{' '}
                        <span className="text-primary">{highlight}</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        {description}
                    </p>
                    <div className="mt-8">
                        <Button
                            size="lg"
                            variant="primary"
                            rightIcon={
                                <ArrowRight
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            }
                            asChild
                        >
                            <Link href={primaryHref}>{primaryCta}</Link>
                        </Button>
                    </div>
                </div>

                <aside
                    className="border-l border-border pl-5 sm:pl-7"
                    aria-label="Base operacional LIRIAS"
                >
                    <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        Base operacional
                    </p>
                    <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
                        {[
                            ['Região', 'São Paulo, BR'],
                            ['Armazenamento', 'NVMe'],
                            ['Virtualização', 'KVM'],
                            ['Acesso', 'Root'],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="border-t border-border pt-3"
                            >
                                <dt className="text-[11px] text-muted-foreground">
                                    {label}
                                </dt>
                                <dd className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Circle
                                        className="h-1.5 w-1.5 fill-success text-success"
                                        aria-hidden="true"
                                    />
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </aside>
            </div>
        </section>
    );
}
