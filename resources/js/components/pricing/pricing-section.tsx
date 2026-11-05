'use client';

import { useState } from 'react';
import Link from '@/components/navigation/app-link';
import { PricingCard } from '@/components/pricing/pricing-card';
import { ScrollStagger } from '@/components/motion/scroll-stagger';
import { PLANS_DATA } from '@/data';
import { BILLING_CYCLES } from '@/constants';
import type { BillingCycle } from '@/types';
import { cn } from '@/lib/utils';

export function PricingSection() {
    const [cycle, setCycle] = useState<BillingCycle>('monthly');

    return (
        <section
            className="home-section home-flow-pricing relative pt-24 pb-16 sm:pt-32 sm:pb-20"
            aria-labelledby="pricing-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-end gap-6 lg:grid-cols-[1.15fr_.85fr]">
                    <div className="max-w-2xl text-left">
                        <span className="font-mono text-xs tracking-[0.2em] text-primary-light uppercase">
                            Planos LIRIAS
                        </span>
                        <h2
                            id="pricing-heading"
                            className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-4xl lg:text-5xl"
                        >
                            Recursos para começar. Liberdade para crescer.
                        </h2>
                    </div>
                    <p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end lg:text-right">
                        Escolha uma configuração objetiva, com cobrança
                        transparente e possibilidade de evolução conforme o
                        projeto exigir.
                    </p>
                </div>

                <div className="mt-8 flex justify-start">
                    <div
                        className="inline-flex items-center gap-1 border border-border bg-background-tertiary/80 p-1"
                        role="tablist"
                        aria-label="Ciclo de cobrança"
                    >
                        {Object.entries(BILLING_CYCLES).map(([key, value]) => (
                            <button
                                key={key}
                                role="tab"
                                aria-selected={cycle === key}
                                onClick={() => setCycle(key as BillingCycle)}
                                className={cn(
                                    'px-5 py-2 text-sm font-medium transition-colors',
                                    cycle === key
                                        ? 'bg-foreground text-background'
                                        : 'text-muted-foreground hover:bg-card hover:text-foreground',
                                )}
                            >
                                {value.label}
                                {value.discount > 0 && (
                                    <span className="ml-1.5 text-xs text-success-light">
                                        -{value.discount}%
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <ScrollStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PLANS_DATA.map((plan) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            billingCycle={cycle}
                        />
                    ))}
                </ScrollStagger>

                <div className="mt-7 flex flex-col gap-2 border-l border-primary/45 pl-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-muted-foreground">
                        Precisa de uma combinação diferente de recursos?
                    </p>
                    <Link
                        href="/pricing#custom-vps-heading"
                        className="trace-link w-fit font-medium text-primary"
                    >
                        Monte sua própria VPS →
                    </Link>
                </div>
            </div>
        </section>
    );
}
