import { useState } from 'react';
import { useNavigate, useSearchParams } from '@/lib/routing';
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle2,
    Cpu,
    CreditCard,
    Gauge,
    HardDrive,
    Info,
    MapPin,
    MemoryStick,
    QrCode,
    ReceiptText,
    Server,
    ShieldCheck,
    WalletCards,
} from 'lucide-react';
import AppLink from '@/components/navigation/app-link';
import { Badge, Button, Card, Input } from '@/components/ui';
import {
    BILLING_CYCLES,
    PAYMENT_METHODS,
    REGIONS,
    buildFlowQuery,
    calculateOrderPrice,
    readCheckoutConfiguration,
    type BillingCycleId,
    type PaymentMethodId,
    type RegionId,
} from '@/data/checkout-demo';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const configuration = readCheckoutConfiguration(searchParams);
    const [billingCycle, setBillingCycle] = useState<BillingCycleId>('yearly');
    const [region, setRegion] = useState<RegionId>('sp1');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('pix');
    const [accepted, setAccepted] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [billing, setBilling] = useState({
        name: '',
        email: '',
        document: '',
    });

    const pricing = calculateOrderPrice(
        configuration.baseMonthly,
        billingCycle,
    );
    const couponDiscount = couponApplied ? pricing.total * 0.05 : 0;
    const total = pricing.total - couponDiscount;
    const selectedRegion =
        REGIONS.find((item) => item.id === region) ?? REGIONS[0]!;
    const compatible = configuration.os === 'linux' || configuration.ram >= 8;

    function continueToProvisioning() {
        if (!accepted) return;
        const query = buildFlowQuery(configuration, region);
        navigate(
            `/provisioning/LIR-DEMO-2052?${query}&cycle=${billingCycle}&payment=${paymentMethod}`,
        );
    }

    function applyCoupon() {
        setCouponApplied(
            coupon.trim().toLocaleUpperCase('pt-BR') === 'LIRIAS5',
        );
    }

    return (
        <main className="min-h-screen bg-background pt-28 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
                    <div>
                        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary-light uppercase">
                            LIRIAS Deploy / revisão
                        </p>
                        <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                            Revise sua infraestrutura antes de ativar
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Configuração, compatibilidade, região e cobrança
                            reunidas em uma única etapa transparente.
                        </p>
                    </div>
                    <Badge variant="warning">Checkout demonstrativo</Badge>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
                    <div className="space-y-6">
                        <Card className="overflow-hidden p-0">
                            <div className="flex flex-col gap-4 border-b border-border bg-background-secondary p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                        Configuração escolhida
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                                        {configuration.planName}
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {configuration.goal}
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    size="sm"
                                    variant="secondary"
                                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                                >
                                    <AppLink href="/deploy">
                                        Alterar configuração
                                    </AppLink>
                                </Button>
                            </div>
                            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
                                <Resource
                                    icon={Cpu}
                                    label="Processamento"
                                    value={`${configuration.vcpu} vCPU`}
                                />
                                <Resource
                                    icon={MemoryStick}
                                    label="Memória"
                                    value={`${configuration.ram} GB RAM`}
                                />
                                <Resource
                                    icon={HardDrive}
                                    label="Armazenamento"
                                    value={`${configuration.disk} GB NVMe`}
                                />
                                <Resource
                                    icon={Gauge}
                                    label="Transferência"
                                    value={`${configuration.bandwidth} TB`}
                                />
                            </div>
                            <div className="grid gap-5 border-t border-border p-5 md:grid-cols-2">
                                <div>
                                    <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                        Sistema operacional
                                    </p>
                                    <p className="mt-2 text-sm font-semibold text-foreground">
                                        {configuration.osLabel}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {configuration.os === 'linux'
                                            ? 'Acesso administrativo via SSH'
                                            : 'Acesso administrativo via RDP'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                        Stack inicial
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {configuration.stack.map((item) => (
                                            <Badge key={item}>{item}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <section>
                            <SectionHeading
                                number="01"
                                title="Escolha a região"
                                description="Operação nacional com indicação de latência e disponibilidade demonstrativas."
                            />
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                {REGIONS.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        aria-pressed={region === item.id}
                                        onClick={() => setRegion(item.id)}
                                        className={cn(
                                            'surface-card surface-card-interactive p-4 text-left',
                                            region === item.id &&
                                                'border-primary/40 bg-primary/10',
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-mono text-xs text-primary-light">
                                                {item.code}
                                            </span>
                                            {region === item.id ? (
                                                <CheckCircle2 className="h-4 w-4 text-primary-light" />
                                            ) : null}
                                        </div>
                                        <p className="mt-3 text-sm font-semibold text-foreground">
                                            {item.city}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {item.latency} estimados ·{' '}
                                            {item.availability}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <SectionHeading
                                number="02"
                                title="Defina o ciclo"
                                description="O desconto é mostrado separadamente, sem esconder o valor total contratado."
                            />
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                {BILLING_CYCLES.map((cycle) => (
                                    <button
                                        key={cycle.id}
                                        type="button"
                                        aria-pressed={billingCycle === cycle.id}
                                        onClick={() =>
                                            setBillingCycle(cycle.id)
                                        }
                                        className={cn(
                                            'surface-card surface-card-interactive p-4 text-left',
                                            billingCycle === cycle.id &&
                                                'border-primary/40 bg-primary/10',
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-foreground">
                                                {cycle.label}
                                            </span>
                                            {cycle.discount ? (
                                                <Badge variant="success">
                                                    -
                                                    {Math.round(
                                                        cycle.discount * 100,
                                                    )}
                                                    %
                                                </Badge>
                                            ) : null}
                                        </div>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            {cycle.months}{' '}
                                            {cycle.months === 1
                                                ? 'mês'
                                                : 'meses'}{' '}
                                            ·{' '}
                                            {formatCurrency(
                                                calculateOrderPrice(
                                                    configuration.baseMonthly,
                                                    cycle.id,
                                                ).effectiveMonthly,
                                            )}
                                            /mês
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <Card className="p-5">
                            <SectionHeading
                                number="03"
                                title="Compatibilidade e proteção"
                                description="A LIRIAS explica o que será preparado antes de ativar o pedido."
                            />
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <Compatibility
                                    status="success"
                                    title="Recursos compatíveis"
                                    detail={`${configuration.ram} GB de RAM e ${configuration.vcpu} vCPU atendem à stack selecionada.`}
                                />
                                <Compatibility
                                    status="success"
                                    title="Sistema validado"
                                    detail={`${configuration.osLabel} possui imagem oficial disponível em ${selectedRegion.code}.`}
                                />
                                <Compatibility
                                    status="success"
                                    title="Proteção inicial"
                                    detail="Firewall básico, mitigação DDoS e acesso administrativo serão preparados."
                                />
                                <Compatibility
                                    status={compatible ? 'success' : 'warning'}
                                    title="Margem de crescimento"
                                    detail={
                                        compatible
                                            ? 'Configuração com margem para a carga demonstrativa.'
                                            : 'Recomendamos ao menos 8 GB para Windows em produção.'
                                    }
                                />
                            </div>
                        </Card>

                        <section>
                            <SectionHeading
                                number="04"
                                title="Método demonstrativo"
                                description="Nenhuma cobrança será processada e os dados abaixo não serão enviados."
                            />
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                {PAYMENT_METHODS.map((method) => {
                                    const Icon =
                                        method.id === 'pix'
                                            ? QrCode
                                            : method.id === 'card'
                                              ? CreditCard
                                              : ReceiptText;
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            aria-pressed={
                                                paymentMethod === method.id
                                            }
                                            onClick={() =>
                                                setPaymentMethod(method.id)
                                            }
                                            className={cn(
                                                'surface-card surface-card-interactive p-4 text-left',
                                                paymentMethod === method.id &&
                                                    'border-primary/40 bg-primary/10',
                                            )}
                                        >
                                            <Icon className="h-5 w-5 text-primary-light" />
                                            <p className="mt-3 text-sm font-semibold text-foreground">
                                                {method.label}
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                {method.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                            <Card className="mt-4 p-5">
                                <div className="flex items-start gap-3 rounded-xl border border-warning/25 bg-warning/5 p-4">
                                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-light" />
                                    <p className="text-xs leading-5 text-muted-foreground">
                                        <strong className="text-foreground">
                                            Use apenas dados fictícios.
                                        </strong>{' '}
                                        Esta interface existe para validar o
                                        fluxo e será substituída pelo provedor
                                        de pagamentos do backend.
                                    </p>
                                </div>
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Nome ou razão social"
                                        value={billing.name}
                                        onChange={(event) =>
                                            setBilling((current) => ({
                                                ...current,
                                                name: event.target.value,
                                            }))
                                        }
                                        placeholder="Empresa Demo Ltda."
                                    />
                                    <Input
                                        label="E-mail de cobrança"
                                        type="email"
                                        value={billing.email}
                                        onChange={(event) =>
                                            setBilling((current) => ({
                                                ...current,
                                                email: event.target.value,
                                            }))
                                        }
                                        placeholder="financeiro@exemplo.com"
                                    />
                                    <Input
                                        label="CPF ou CNPJ fictício"
                                        value={billing.document}
                                        onChange={(event) =>
                                            setBilling((current) => ({
                                                ...current,
                                                document: event.target.value,
                                            }))
                                        }
                                        placeholder="000.000.000-00"
                                    />
                                    <div className="flex gap-2">
                                        <Input
                                            label="Cupom demonstrativo"
                                            value={coupon}
                                            onChange={(event) => {
                                                setCoupon(event.target.value);
                                                setCouponApplied(false);
                                            }}
                                            placeholder="Experimente LIRIAS5"
                                            className="min-w-0"
                                        />
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="mt-[26px]"
                                            onClick={applyCoupon}
                                        >
                                            Aplicar
                                        </Button>
                                    </div>
                                </div>
                                {coupon ? (
                                    <p
                                        className={cn(
                                            'mt-3 text-xs',
                                            couponApplied
                                                ? 'text-success-light'
                                                : 'text-muted-foreground',
                                        )}
                                    >
                                        {couponApplied
                                            ? 'Cupom aplicado: 5% de desconto demonstrativo.'
                                            : 'Cupom ainda não validado.'}
                                    </p>
                                ) : null}
                            </Card>
                        </section>
                    </div>

                    <aside className="xl:sticky xl:top-24 xl:self-start">
                        <Card className="overflow-hidden p-0">
                            <div className="border-b border-border bg-background-secondary p-5">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-primary-light">
                                        <WalletCards className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Resumo do pedido
                                        </p>
                                        <p className="font-semibold text-foreground">
                                            LIR-DEMO-2052
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <dl className="space-y-3 text-sm">
                                    <PriceRow
                                        label={`${configuration.planName} × ${pricing.months}`}
                                        value={formatCurrency(pricing.subtotal)}
                                    />
                                    <PriceRow
                                        label="Desconto do ciclo"
                                        value={
                                            pricing.discount
                                                ? `- ${formatCurrency(pricing.discount)}`
                                                : formatCurrency(0)
                                        }
                                        positive
                                    />
                                    {couponApplied ? (
                                        <PriceRow
                                            label="Cupom LIRIAS5"
                                            value={`- ${formatCurrency(couponDiscount)}`}
                                            positive
                                        />
                                    ) : null}
                                    <PriceRow
                                        label="Ativação"
                                        value="Grátis"
                                        positive
                                    />
                                </dl>
                                <div className="mt-5 border-t border-border pt-5">
                                    <div className="flex items-end justify-between gap-4">
                                        <span className="text-sm font-semibold text-foreground">
                                            Total demonstrativo
                                        </span>
                                        <span className="text-2xl font-bold text-foreground">
                                            {formatCurrency(total)}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-right text-xs text-muted-foreground">
                                        {formatCurrency(total / pricing.months)}
                                        /mês efetivos
                                    </p>
                                </div>
                                <div className="mt-5 rounded-xl border border-border bg-background-secondary p-4 text-xs leading-5 text-muted-foreground">
                                    <p className="flex items-center gap-2 font-semibold text-foreground">
                                        <MapPin className="h-4 w-4 text-primary-light" />
                                        {selectedRegion.code} ·{' '}
                                        {selectedRegion.city}
                                    </p>
                                    <p className="mt-2">
                                        {configuration.osLabel}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setAccepted(!accepted)}
                                    aria-pressed={accepted}
                                    className="mt-5 flex w-full items-start gap-3 text-left"
                                >
                                    <span
                                        className={cn(
                                            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                                            accepted
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border',
                                        )}
                                    >
                                        {accepted ? (
                                            <Check className="h-3.5 w-3.5" />
                                        ) : null}
                                    </span>
                                    <span className="text-xs leading-5 text-muted-foreground">
                                        Confirmo que esta é uma simulação e que
                                        nenhum pagamento ou provisionamento real
                                        será realizado.
                                    </span>
                                </button>
                                <Button
                                    className="mt-5 w-full"
                                    size="lg"
                                    disabled={!accepted}
                                    onClick={continueToProvisioning}
                                    rightIcon={
                                        <ArrowRight className="h-4 w-4" />
                                    }
                                >
                                    Confirmar simulação
                                </Button>
                                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                                    <ShieldCheck className="h-3.5 w-3.5" />{' '}
                                    Fluxo preparado para integração segura
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function Resource({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Server;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-background p-4">
            <Icon className="h-4 w-4 text-primary-light" />
            <p className="mt-3 text-[10px] tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
                {value}
            </p>
        </div>
    );
}

function SectionHeading({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <div>
            <p className="font-mono text-xs text-primary-light">{number}</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
                {title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

function Compatibility({
    status,
    title,
    detail,
}: {
    status: 'success' | 'warning';
    title: string;
    detail: string;
}) {
    return (
        <div
            className={cn(
                'flex gap-3 rounded-xl border p-4',
                status === 'success'
                    ? 'border-success/20 bg-success/5'
                    : 'border-warning/25 bg-warning/5',
            )}
        >
            {status === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-light" />
            ) : (
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-warning-light" />
            )}
            <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {detail}
                </p>
            </div>
        </div>
    );
}

function PriceRow({
    label,
    value,
    positive = false,
}: {
    label: string;
    value: string;
    positive?: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd
                className={
                    positive
                        ? 'font-medium text-success-light'
                        : 'font-medium text-foreground'
                }
            >
                {value}
            </dd>
        </div>
    );
}
