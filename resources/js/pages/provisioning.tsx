import { useState } from 'react';
import { useParams, useSearchParams } from '@/lib/routing';
import {
    Activity,
    ArrowRight,
    Check,
    CircleDashed,
    Clock3,
    Cpu,
    HardDrive,
    Loader2,
    MapPin,
    MemoryStick,
    Network,
    Server,
    ShieldCheck,
    TerminalSquare,
} from 'lucide-react';
import AppLink from '@/components/navigation/app-link';
import { Badge, Button, Card } from '@/components/ui';
import { PROVISIONING_STEPS, REGIONS } from '@/data/checkout-demo';
import { cn } from '@/lib/utils';

export default function ProvisioningPage() {
    const { orderId = 'LIR-DEMO-2052' } = useParams();
    const [searchParams] = useSearchParams();
    const [activeStep, setActiveStep] = useState(0);

    const region =
        REGIONS.find((item) => item.id === searchParams.get('region')) ??
        REGIONS[0]!;
    const complete = activeStep >= PROVISIONING_STEPS.length;
    const progress = Math.min(
        (activeStep / PROVISIONING_STEPS.length) * 100,
        100,
    );
    const serverQuery = searchParams.toString();

    function advanceSimulation() {
        setActiveStep((current) =>
            Math.min(current + 1, PROVISIONING_STEPS.length),
        );
    }

    return (
        <main className="min-h-screen bg-background pt-28 pb-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge
                                variant={complete ? 'success' : 'primary'}
                                dot
                            >
                                {complete
                                    ? 'VPS preparada'
                                    : 'Provisionamento demonstrativo'}
                            </Badge>
                            <span className="font-mono text-xs text-muted-foreground">
                                {orderId}
                            </span>
                        </div>
                        <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                            {complete
                                ? 'Sua VPS está pronta para o primeiro acesso'
                                : 'Preparando sua infraestrutura'}
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Cada etapa representa uma ação assíncrona que
                            futuramente será atualizada pelo backend por
                            eventos.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card px-4 py-3">
                        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                            Região selecionada
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <MapPin className="h-4 w-4 text-primary-light" />
                            {region.code} · {region.city}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <Card className="overflow-hidden p-0">
                        <div className="border-b border-border bg-background-secondary p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                        Progresso técnico
                                    </p>
                                    <p className="mt-2 text-xl font-semibold text-foreground">
                                        {complete
                                            ? '6 de 6 etapas concluídas'
                                            : `${activeStep} de ${PROVISIONING_STEPS.length} etapas concluídas`}
                                    </p>
                                </div>
                                <span className="font-mono text-xl font-semibold text-primary-light">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-background-tertiary">
                                <div
                                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <div className="relative space-y-1 before:absolute before:top-6 before:bottom-6 before:left-[19px] before:w-px before:bg-border">
                                {PROVISIONING_STEPS.map((step, index) => {
                                    const done = index < activeStep;
                                    const running =
                                        index === activeStep && !complete;
                                    return (
                                        <div
                                            key={step.id}
                                            className="relative grid grid-cols-[40px_1fr_auto] gap-4 rounded-xl p-3"
                                        >
                                            <span
                                                className={cn(
                                                    'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-card',
                                                    done
                                                        ? 'border-success/40 text-success-light'
                                                        : running
                                                          ? 'border-primary/40 text-primary-light'
                                                          : 'border-border text-muted-foreground',
                                                )}
                                            >
                                                {done ? (
                                                    <Check className="h-5 w-5" />
                                                ) : running ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <CircleDashed className="h-5 w-5" />
                                                )}
                                            </span>
                                            <div className="py-1">
                                                <p
                                                    className={cn(
                                                        'text-sm font-semibold',
                                                        done || running
                                                            ? 'text-foreground'
                                                            : 'text-muted-foreground',
                                                    )}
                                                >
                                                    {step.title}
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                    {step.description}
                                                </p>
                                            </div>
                                            <div className="hidden py-1 text-right sm:block">
                                                <p className="font-mono text-[10px] text-muted-foreground">
                                                    {step.detail}
                                                </p>
                                                <Badge
                                                    className="mt-2"
                                                    variant={
                                                        done
                                                            ? 'success'
                                                            : running
                                                              ? 'primary'
                                                              : 'default'
                                                    }
                                                >
                                                    {done
                                                        ? 'Concluída'
                                                        : running
                                                          ? 'Executando'
                                                          : 'Aguardando'}
                                                </Badge>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 flex flex-col justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
                                <p className="text-xs leading-5 text-muted-foreground">
                                    {complete
                                        ? 'Simulação finalizada. Nenhum recurso real foi criado.'
                                        : 'Avance manualmente para testar os estados da interface.'}
                                </p>
                                {complete ? (
                                    <Button
                                        asChild
                                        rightIcon={
                                            <ArrowRight className="h-4 w-4" />
                                        }
                                    >
                                        <AppLink
                                            href={`/first-access/lirias-node-new?${serverQuery}`}
                                        >
                                            Configurar primeiro acesso
                                        </AppLink>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={advanceSimulation}
                                        rightIcon={
                                            <ArrowRight className="h-4 w-4" />
                                        }
                                    >
                                        Avançar simulação
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>

                    <aside className="space-y-4">
                        <Card className="p-5">
                            <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                Configuração reservada
                            </p>
                            <h2 className="mt-2 text-lg font-semibold text-foreground">
                                {searchParams.get('name') ?? 'VPS Pro'}
                            </h2>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <MiniMetric
                                    icon={Cpu}
                                    label="vCPU"
                                    value={searchParams.get('vcpu') ?? '4'}
                                />
                                <MiniMetric
                                    icon={MemoryStick}
                                    label="RAM"
                                    value={`${searchParams.get('ram') ?? '8'} GB`}
                                />
                                <MiniMetric
                                    icon={HardDrive}
                                    label="NVMe"
                                    value={`${searchParams.get('disk') ?? '100'} GB`}
                                />
                                <MiniMetric
                                    icon={Network}
                                    label="Tráfego"
                                    value={`${searchParams.get('bandwidth') ?? '3'} TB`}
                                />
                            </div>
                            <div className="mt-4 rounded-xl border border-border bg-background-secondary p-4">
                                <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                    Sistema
                                </p>
                                <p className="mt-2 text-sm font-medium text-foreground">
                                    {searchParams.get('distro') ??
                                        'Ubuntu 24.04 LTS'}
                                </p>
                            </div>
                        </Card>

                        <Card className="border-primary/20 bg-primary/5 p-5">
                            <Activity className="h-5 w-5 text-primary-light" />
                            <h3 className="mt-4 font-semibold text-foreground">
                                Preparado para eventos reais
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                Cada código técnico poderá mapear uma ação do
                                backend, progresso, falha, tentativa e mensagem
                                operacional.
                            </p>
                        </Card>

                        <Card className="p-5">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-success-light" />
                                <p className="text-sm font-semibold text-foreground">
                                    Segurança por padrão
                                </p>
                            </div>
                            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                                <li>Firewall básico preparado</li>
                                <li>Credencial temporária protegida</li>
                                <li>Chave SSH recomendada</li>
                                <li>Backup sugerido no primeiro acesso</li>
                            </ul>
                        </Card>
                    </aside>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <StatusFact
                        icon={Clock3}
                        label="Tempo estimado"
                        value={complete ? 'Concluído' : '2–5 minutos'}
                    />
                    <StatusFact
                        icon={TerminalSquare}
                        label="Acesso inicial"
                        value={
                            searchParams.get('os') === 'windows' ? 'RDP' : 'SSH'
                        }
                    />
                    <StatusFact
                        icon={Server}
                        label="Cluster"
                        value={`${region.code}-COMPUTE-01`}
                    />
                </div>
            </div>
        </main>
    );
}

function MiniMetric({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Cpu;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-lg border border-border bg-background p-3">
            <Icon className="h-4 w-4 text-primary-light" />
            <p className="mt-2 text-[10px] text-muted-foreground uppercase">
                {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
                {value}
            </p>
        </div>
    );
}

function StatusFact({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Server;
    label: string;
    value: string;
}) {
    return (
        <Card className="flex items-center gap-4 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-primary-light">
                <Icon className="h-5 w-5" />
            </span>
            <div>
                <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                    {value}
                </p>
            </div>
        </Card>
    );
}
