import Link from '@/components/navigation/app-link';
import { Check, X, Cpu, MemoryStick, HardDrive, Gauge } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import type { PlanDTO, BillingCycle } from '@/types';
import { cn } from '@/lib/utils';

export interface PricingCardProps {
    plan: PlanDTO;
    billingCycle?: BillingCycle;
    className?: string;
}

export function PricingCard({
    plan,
    billingCycle = 'monthly',
    className,
}: PricingCardProps) {
    const price =
        billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

    return (
        <div
            className={cn(
                'relative flex flex-col rounded-lg border bg-card/75 p-7 transition-[background-color,border-color] duration-200',
                plan.popular
                    ? 'border-primary/45 bg-primary/[0.045]'
                    : 'border-border/85 hover:border-border-hover hover:bg-card',
                className,
            )}
        >
            <div className="flex min-h-7 items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                </h3>
                {plan.popular && <Badge variant="primary">Recomendado</Badge>}
            </div>

            <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">
                    {formatCurrency(price)}
                </span>
                <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            {billingCycle === 'yearly' && (
                <span className="mt-1 text-xs text-success-light">
                    Economize 20% no plano anual
                </span>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Cpu
                        className="h-4 w-4 text-primary-light"
                        aria-hidden="true"
                    />
                    {plan.vcpu} vCPU
                </div>
                <div className="flex items-center gap-2">
                    <MemoryStick
                        className="h-4 w-4 text-secondary-light"
                        aria-hidden="true"
                    />
                    {plan.ram} GB RAM
                </div>
                <div className="flex items-center gap-2">
                    <HardDrive
                        className="h-4 w-4 text-success-light"
                        aria-hidden="true"
                    />
                    {plan.disk} GB NVMe
                </div>
                <div className="flex items-center gap-2">
                    <Gauge
                        className="h-4 w-4 text-primary-light"
                        aria-hidden="true"
                    />
                    {plan.bandwidth} TB Transfer
                </div>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                    <li
                        key={feature.label}
                        className="flex items-start gap-2.5 text-sm"
                    >
                        {feature.included ? (
                            <Check
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-success"
                                aria-hidden="true"
                            />
                        ) : (
                            <X
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground"
                                aria-hidden="true"
                            />
                        )}
                        <span
                            className={
                                feature.included
                                    ? 'text-foreground'
                                    : 'text-muted-foreground'
                            }
                        >
                            {feature.label}
                        </span>
                    </li>
                ))}
            </ul>

            <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                className="mt-7 w-full"
                asChild
            >
                <Link href={`/checkout?plan=${plan.id}&os=linux&goal=general`}>
                    Implantar {plan.name}
                </Link>
            </Button>
        </div>
    );
}
