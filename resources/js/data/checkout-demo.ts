import { PLANS_DATA } from '@/data';
import { calculateCustomVpsPrice } from '@/lib/custom-vps-pricing';

export type BillingCycleId = 'monthly' | 'quarterly' | 'yearly';
export type PaymentMethodId = 'pix' | 'card' | 'boleto';
export type RegionId = 'sp1' | 'cwb1' | 'for1';
export type ProvisioningState = 'waiting' | 'running' | 'complete';

export interface CheckoutConfiguration {
    planId: string;
    planName: string;
    goal: string;
    os: 'linux' | 'windows';
    osLabel: string;
    vcpu: number;
    ram: number;
    disk: number;
    bandwidth: number;
    stack: string[];
    baseMonthly: number;
    custom: boolean;
}

export interface ProvisioningStep {
    id: string;
    title: string;
    description: string;
    detail: string;
}

export const BILLING_CYCLES = [
    { id: 'monthly' as const, label: 'Mensal', months: 1, discount: 0 },
    {
        id: 'quarterly' as const,
        label: 'Trimestral',
        months: 3,
        discount: 0.08,
    },
    { id: 'yearly' as const, label: 'Anual', months: 12, discount: 0.2 },
];

export const REGIONS = [
    {
        id: 'sp1' as const,
        code: 'SP1',
        city: 'São Paulo',
        latency: '12 ms',
        availability: 'Imediata',
    },
    {
        id: 'cwb1' as const,
        code: 'CWB1',
        city: 'Curitiba',
        latency: '21 ms',
        availability: 'Imediata',
    },
    {
        id: 'for1' as const,
        code: 'FOR1',
        city: 'Fortaleza',
        latency: '48 ms',
        availability: 'Até 5 min',
    },
];

export const PAYMENT_METHODS = [
    {
        id: 'pix' as const,
        label: 'Pix',
        description: 'Confirmação demonstrativa imediata',
    },
    {
        id: 'card' as const,
        label: 'Cartão',
        description: 'Dados fictícios, sem processamento',
    },
    {
        id: 'boleto' as const,
        label: 'Boleto',
        description: 'Vencimento demonstrativo em 3 dias',
    },
];

export const PROVISIONING_STEPS: ProvisioningStep[] = [
    {
        id: 'order',
        title: 'Pedido validado',
        description: 'Configuração, região e ciclo conferidos.',
        detail: 'ORDER_VALIDATED',
    },
    {
        id: 'capacity',
        title: 'Recursos reservados',
        description: 'vCPU, memória e NVMe separados no cluster.',
        detail: 'CAPACITY_RESERVED',
    },
    {
        id: 'image',
        title: 'Sistema instalado',
        description:
            'Imagem oficial aplicada e atualizações iniciais concluídas.',
        detail: 'IMAGE_APPLIED',
    },
    {
        id: 'network',
        title: 'Rede e proteção',
        description: 'IPv4, firewall básico e mitigação DDoS preparados.',
        detail: 'NETWORK_READY',
    },
    {
        id: 'stack',
        title: 'Stack configurada',
        description:
            'Componentes selecionados preparados para o primeiro acesso.',
        detail: 'STACK_CONFIGURED',
    },
    {
        id: 'ready',
        title: 'VPS pronta',
        description: 'Credenciais temporárias emitidas e painel liberado.',
        detail: 'SERVER_READY',
    },
];

const GOAL_LABELS: Record<string, string> = {
    website: 'Site ou aplicação web',
    api: 'API ou SaaS',
    automation: 'Automação com n8n',
    ecommerce: 'E-commerce',
    ai: 'Agente ou serviço de IA',
    games: 'Servidor de jogos',
    general: 'Projeto personalizado',
};

const GOAL_STACKS: Record<string, string[]> = {
    website: ['Nginx', 'Node.js', 'SSL'],
    api: ['Docker', 'Node.js', 'PostgreSQL'],
    automation: ['n8n', 'Docker', 'PostgreSQL'],
    ecommerce: ['WooCommerce', 'MariaDB', 'Redis'],
    ai: ['Docker', 'Python', 'PostgreSQL'],
    games: ['LinuxGSM', 'Docker', 'Backups'],
    general: ['Docker', 'Monitoramento'],
};

export function readCheckoutConfiguration(
    params: URLSearchParams,
): CheckoutConfiguration {
    const custom = params.get('custom') === '1';
    const requestedPlan =
        PLANS_DATA.find((plan) => plan.id === params.get('plan')) ??
        PLANS_DATA[1]!;
    const os = params.get('os') === 'windows' ? 'windows' : 'linux';
    const goal = params.get('goal') ?? 'general';

    if (custom) {
        const vcpu = Number(params.get('vcpu')) || 4;
        const ram = Number(params.get('ram')) || 8;
        const disk = Number(params.get('disk')) || 100;
        const bandwidth = Number(params.get('bandwidth')) || 3;
        const price = calculateCustomVpsPrice({
            vcpu,
            ram,
            disk,
            bandwidth,
            os,
        });

        return {
            planId: 'custom',
            planName: 'VPS Personalizada',
            goal: GOAL_LABELS[goal] ?? GOAL_LABELS.general!,
            os,
            osLabel:
                params.get('distro') ??
                (os === 'windows' ? 'Windows Server 2025' : 'Ubuntu 24.04 LTS'),
            vcpu,
            ram,
            disk,
            bandwidth,
            stack: GOAL_STACKS[goal] ?? GOAL_STACKS.general!,
            baseMonthly: price.total,
            custom: true,
        };
    }

    const stack = params.get('stack')?.split(',').filter(Boolean);
    return {
        planId: requestedPlan.id,
        planName: requestedPlan.name,
        goal: GOAL_LABELS[goal] ?? GOAL_LABELS.general!,
        os,
        osLabel:
            params.get('distro') ??
            (os === 'windows' ? 'Windows Server 2025' : 'Ubuntu 24.04 LTS'),
        vcpu: requestedPlan.vcpu,
        ram: requestedPlan.ram,
        disk: requestedPlan.disk,
        bandwidth: requestedPlan.bandwidth,
        stack: stack?.length
            ? stack
            : (GOAL_STACKS[goal] ?? GOAL_STACKS.general!),
        baseMonthly: requestedPlan.priceMonthly,
        custom: false,
    };
}

export function calculateOrderPrice(monthly: number, cycle: BillingCycleId) {
    const selected =
        BILLING_CYCLES.find((item) => item.id === cycle) ?? BILLING_CYCLES[0]!;
    const subtotal = monthly * selected.months;
    const discount = subtotal * selected.discount;
    return {
        months: selected.months,
        subtotal,
        discount,
        total: subtotal - discount,
        effectiveMonthly: (subtotal - discount) / selected.months,
    };
}

export function buildFlowQuery(
    configuration: CheckoutConfiguration,
    region: RegionId,
) {
    const params = new URLSearchParams({
        plan: configuration.planId,
        name: configuration.planName,
        goal: configuration.goal,
        os: configuration.os,
        distro: configuration.osLabel,
        vcpu: String(configuration.vcpu),
        ram: String(configuration.ram),
        disk: String(configuration.disk),
        bandwidth: String(configuration.bandwidth),
        stack: configuration.stack.join(','),
        region,
    });
    return params.toString();
}
