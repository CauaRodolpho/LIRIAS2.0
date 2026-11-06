<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle2,
    Clipboard,
    Cpu,
    CreditCard,
    Gauge,
    HardDrive,
    KeyRound,
    MapPin,
    MemoryStick,
    QrCode,
    ReceiptText,
    Server,
    ShieldCheck,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
const props = defineProps<{
    stage?: 'checkout' | 'provisioning' | 'first-access';
    query?: Record<string, string>;
    params?: Record<string, string>;
}>();
const billing = ref('yearly');
const region = ref('sp1');
const payment = ref('pix');
const accepted = ref(false);
const coupon = ref('');
const couponApplied = ref(false);
const billingData = ref({ name: '', email: '', document: '' });
const copied = ref('');
const completed = ref(['access']);
const config = computed(() => ({
    name: props.query?.name || 'VPS Pro',
    goal: props.query?.goal || 'Aplicação e serviços',
    vcpu: Number(props.query?.vcpu || 4),
    ram: Number(props.query?.ram || 8),
    disk: Number(props.query?.disk || 100),
    bandwidth: Number(props.query?.bandwidth || 3),
    os: props.query?.os || 'linux',
    osLabel:
        props.query?.distro ||
        (props.query?.os === 'windows'
            ? 'Windows Server 2022'
            : 'Ubuntu 24.04 LTS'),
    price: Number(props.query?.price || 59.9),
}));
const regions = [
    ['sp1', 'SP1', 'São Paulo', '12 ms', 'Disponível'],
    ['cwb1', 'CWB1', 'Curitiba', '21 ms', 'Disponível'],
    ['for1', 'FOR1', 'Fortaleza', '48 ms', 'Disponível'],
];
const cycles = [
    ['monthly', 'Mensal', 1, 0],
    ['yearly', 'Anual', 12, 0.2],
    ['biennial', 'Bienal', 24, 0.3],
];
const methods = [
    ['pix', 'PIX', QrCode, 'Confirmação rápida demonstrativa'],
    ['card', 'Cartão', CreditCard, 'Cobrança recorrente demonstrativa'],
    ['invoice', 'Boleto', ReceiptText, 'Vencimento em três dias úteis'],
];
const multiplier = computed(() =>
    billing.value === 'monthly' ? 1 : billing.value === 'yearly' ? 12 : 24,
);
const discount = computed(() =>
    billing.value === 'monthly' ? 0 : billing.value === 'yearly' ? 0.2 : 0.3,
);
const subtotal = computed(() => config.value.price * multiplier.value);
const total = computed(
    () =>
        subtotal.value *
        (1 - discount.value) *
        (couponApplied.value ? 0.95 : 1),
);
const money = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
function applyCoupon() {
    couponApplied.value = coupon.value.trim().toUpperCase() === 'LIRIAS5';
}
function provision() {
    if (!accepted.value) return;
    router.visit(
        `/provisioning/LIR-DEMO-2052?region=${region.value}&os=${config.value.os}&vcpu=${config.value.vcpu}&ram=${config.value.ram}&disk=${config.value.disk}`,
    );
}
async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    copied.value = label;
    setTimeout(() => (copied.value = ''), 1500);
}
function toggle(id: string) {
    completed.value = completed.value.includes(id)
        ? completed.value.filter((i) => i !== id)
        : [...completed.value, id];
}
const provisioningSteps = [
    ['order', 'Pedido validado', 'Configuração e região confirmadas.'],
    [
        'resources',
        'Recursos reservados',
        'CPU, memória e armazenamento alocados.',
    ],
    ['system', 'Sistema preparado', 'Imagem oficial instalada e atualizada.'],
    [
        'network',
        'Rede configurada',
        'IPv4, IPv6 e firewall inicial preparados.',
    ],
    [
        'access',
        'Acesso protegido',
        'Credenciais e chave administrativa organizadas.',
    ],
];
</script>
<template>
    <main
        v-if="stage === 'checkout' || !stage"
        class="min-h-screen pt-28 pb-24"
    >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end"
            >
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        LIRIAS Deploy / revisão
                    </p>
                    <h1
                        class="mt-3 font-display text-3xl font-semibold sm:text-4xl"
                    >
                        Revise sua infraestrutura antes de ativar
                    </h1>
                    <p class="mt-3 max-w-2xl text-sm text-muted-foreground">
                        Configuração, compatibilidade, região e cobrança em uma
                        única etapa transparente.
                    </p>
                </div>
                <span
                    class="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300"
                    >Checkout demonstrativo</span
                >
            </div>
            <div class="mt-8 grid gap-6 xl:grid-cols-[1fr_390px]">
                <div class="space-y-8">
                    <section
                        class="overflow-hidden rounded-xl border border-border"
                    >
                        <div
                            class="flex justify-between border-b border-border bg-card/50 p-5"
                        >
                            <div>
                                <p
                                    class="text-xs text-muted-foreground uppercase"
                                >
                                    Configuração escolhida
                                </p>
                                <h2 class="mt-2 text-xl font-semibold">
                                    {{ config.name }}
                                </h2>
                                <p class="mt-1 text-sm text-muted-foreground">
                                    {{ config.goal }}
                                </p>
                            </div>
                            <AppLink
                                href="/deploy"
                                class="inline-flex h-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm"
                                ><ArrowLeft class="h-4 w-4" />Alterar</AppLink
                            >
                        </div>
                        <div
                            class="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            <div
                                v-for="item in [
                                    [
                                        Cpu,
                                        'Processamento',
                                        `${config.vcpu} vCPU`,
                                    ],
                                    [
                                        MemoryStick,
                                        'Memória',
                                        `${config.ram} GB RAM`,
                                    ],
                                    [
                                        HardDrive,
                                        'Armazenamento',
                                        `${config.disk} GB NVMe`,
                                    ],
                                    [
                                        Gauge,
                                        'Transferência',
                                        `${config.bandwidth} TB`,
                                    ],
                                ]"
                                :key="String(item[1])"
                                class="rounded-lg border border-border p-4"
                            >
                                <component
                                    :is="item[0]"
                                    class="h-4 w-4 text-primary-light"
                                />
                                <p
                                    class="mt-3 text-[10px] text-muted-foreground uppercase"
                                >
                                    {{ item[1] }}
                                </p>
                                <strong class="mt-1 block text-sm">{{
                                    item[2]
                                }}</strong>
                            </div>
                        </div>
                        <div class="border-t border-border p-5">
                            <p class="text-xs text-muted-foreground uppercase">
                                Sistema operacional
                            </p>
                            <strong class="mt-2 block">{{
                                config.osLabel
                            }}</strong>
                        </div>
                    </section>
                    <section>
                        <p class="text-xs text-primary-light">01</p>
                        <h2 class="mt-2 text-xl font-semibold">
                            Escolha a região
                        </h2>
                        <div class="mt-4 grid gap-3 md:grid-cols-3">
                            <button
                                v-for="item in regions"
                                :key="item[0]"
                                class="rounded-xl border p-4 text-left"
                                :class="
                                    region === item[0]
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border'
                                "
                                @click="region = String(item[0])"
                            >
                                <div class="flex justify-between">
                                    <span
                                        class="font-mono text-xs text-primary-light"
                                        >{{ item[1] }}</span
                                    ><CheckCircle2
                                        v-if="region === item[0]"
                                        class="h-4 w-4 text-primary-light"
                                    />
                                </div>
                                <strong class="mt-3 block text-sm">{{
                                    item[2]
                                }}</strong>
                                <p class="mt-1 text-xs text-muted-foreground">
                                    {{ item[3] }} · {{ item[4] }}
                                </p>
                            </button>
                        </div>
                    </section>
                    <section>
                        <p class="text-xs text-primary-light">02</p>
                        <h2 class="mt-2 text-xl font-semibold">
                            Defina o ciclo
                        </h2>
                        <div class="mt-4 grid gap-3 md:grid-cols-3">
                            <button
                                v-for="item in cycles"
                                :key="item[0]"
                                class="rounded-xl border p-4 text-left"
                                :class="
                                    billing === item[0]
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border'
                                "
                                @click="billing = String(item[0])"
                            >
                                <strong>{{ item[1] }}</strong
                                ><span
                                    v-if="Number(item[3])"
                                    class="float-right text-xs text-emerald-400"
                                    >-{{ Number(item[3]) * 100 }}%</span
                                >
                                <p class="mt-2 text-xs text-muted-foreground">
                                    {{ item[2] }}
                                    {{
                                        Number(item[2]) === 1 ? 'mês' : 'meses'
                                    }}
                                </p>
                            </button>
                        </div>
                    </section>
                    <section class="rounded-xl border border-border p-5">
                        <p class="text-xs text-primary-light">03</p>
                        <h2 class="mt-2 text-xl font-semibold">
                            Compatibilidade e proteção
                        </h2>
                        <div class="mt-5 grid gap-3 sm:grid-cols-2">
                            <div
                                v-for="item in [
                                    [
                                        'Recursos compatíveis',
                                        `${config.ram} GB de RAM atendem à stack selecionada.`,
                                    ],
                                    [
                                        'Sistema validado',
                                        `${config.osLabel} possui imagem oficial.`,
                                    ],
                                    [
                                        'Proteção inicial',
                                        'Firewall básico e mitigação DDoS preparados.',
                                    ],
                                    [
                                        'Margem de crescimento',
                                        'Configuração com margem para a carga demonstrativa.',
                                    ],
                                ]"
                                :key="item[0]"
                                class="flex gap-3 rounded-lg border border-border p-4"
                            >
                                <Check class="h-4 w-4 text-emerald-400" />
                                <div>
                                    <strong class="text-sm">{{
                                        item[0]
                                    }}</strong>
                                    <p
                                        class="mt-1 text-xs text-muted-foreground"
                                    >
                                        {{ item[1] }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <p class="text-xs text-primary-light">04</p>
                        <h2 class="mt-2 text-xl font-semibold">
                            Método demonstrativo
                        </h2>
                        <div class="mt-4 grid gap-3 md:grid-cols-3">
                            <button
                                v-for="item in methods"
                                :key="String(item[0])"
                                class="rounded-xl border p-4 text-left"
                                :class="
                                    payment === item[0]
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border'
                                "
                                @click="payment = String(item[0])"
                            >
                                <component
                                    :is="item[2]"
                                    class="h-5 w-5 text-primary-light"
                                /><strong class="mt-3 block text-sm">{{
                                    item[1]
                                }}</strong>
                                <p class="mt-1 text-xs text-muted-foreground">
                                    {{ item[3] }}
                                </p>
                            </button>
                        </div>
                        <div class="mt-4 rounded-xl border border-border p-5">
                            <div
                                class="flex gap-3 rounded-lg border border-amber-400/25 bg-amber-400/5 p-4"
                            >
                                <AlertTriangle class="h-4 w-4 text-amber-400" />
                                <p class="text-xs text-muted-foreground">
                                    Use apenas dados fictícios. Nenhuma cobrança
                                    será processada.
                                </p>
                            </div>
                            <div class="mt-5 grid gap-4 sm:grid-cols-2">
                                <input
                                    v-model="billingData.name"
                                    class="h-12 rounded-lg border border-border bg-background px-4"
                                    placeholder="Nome ou razão social"
                                /><input
                                    v-model="billingData.email"
                                    class="h-12 rounded-lg border border-border bg-background px-4"
                                    placeholder="E-mail de cobrança"
                                /><input
                                    v-model="billingData.document"
                                    class="h-12 rounded-lg border border-border bg-background px-4"
                                    placeholder="CPF ou CNPJ fictício"
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <aside
                    class="h-fit rounded-xl border border-border bg-card/50 p-6 xl:sticky xl:top-24"
                >
                    <p class="text-xs text-primary-light uppercase">
                        Resumo do pedido
                    </p>
                    <h2 class="mt-3 text-xl font-semibold">
                        {{ config.name }}
                    </h2>
                    <dl
                        class="mt-6 space-y-3 border-y border-border py-5 text-sm"
                    >
                        <div class="flex justify-between">
                            <dt class="text-muted-foreground">Subtotal</dt>
                            <dd>{{ money(subtotal) }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-muted-foreground">
                                Desconto do ciclo
                            </dt>
                            <dd class="text-emerald-400">
                                -{{ money(subtotal * discount) }}
                            </dd>
                        </div>
                        <div v-if="couponApplied" class="flex justify-between">
                            <dt class="text-muted-foreground">Cupom LIRIAS5</dt>
                            <dd class="text-emerald-400">-5%</dd>
                        </div>
                    </dl>
                    <p class="mt-5 flex items-end justify-between">
                        <span>Total</span
                        ><strong class="font-display text-3xl">{{
                            money(total)
                        }}</strong>
                    </p>
                    <div class="mt-5 flex gap-2">
                        <input
                            v-model="coupon"
                            class="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3"
                            placeholder="Cupom"
                        /><button
                            class="rounded-lg border border-border px-3 text-sm"
                            @click="applyCoupon"
                        >
                            Aplicar
                        </button>
                    </div>
                    <p
                        v-if="coupon && !couponApplied"
                        class="mt-2 text-xs text-muted-foreground"
                    >
                        Use LIRIAS5 para a demonstração.
                    </p>
                    <label
                        class="mt-6 flex items-start gap-2 text-sm text-muted-foreground"
                        ><input
                            v-model="accepted"
                            type="checkbox"
                            class="mt-1"
                        />Confirmo que este é um fluxo demonstrativo.</label
                    ><button
                        class="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-white disabled:opacity-40"
                        :disabled="!accepted"
                        @click="provision"
                    >
                        Ativar pedido demonstrativo
                        <ArrowRight class="h-4 w-4" />
                    </button>
                </aside>
            </div>
        </div>
    </main>
    <main v-else-if="stage === 'provisioning'" class="min-h-screen pt-28 pb-24">
        <div class="mx-auto max-w-5xl px-4 sm:px-6">
            <div class="text-center">
                <span
                    class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10"
                    ><Server class="h-7 w-7 animate-pulse text-primary-light"
                /></span>
                <p class="mt-6 font-mono text-xs text-primary-light uppercase">
                    Pedido {{ params?.orderId || 'LIR-DEMO-2052' }}
                </p>
                <h1
                    class="mt-4 font-display text-4xl font-semibold sm:text-5xl"
                >
                    Estamos preparando sua VPS.
                </h1>
                <p class="mt-5 text-lg text-muted-foreground">
                    O fluxo abaixo representa o provisionamento demonstrativo.
                </p>
            </div>
            <div class="mt-12 overflow-hidden rounded-xl border border-border">
                <div
                    v-for="(item, index) in provisioningSteps"
                    :key="item[0]"
                    class="flex items-center gap-4 border-b border-border p-5 last:border-0"
                >
                    <span
                        class="grid h-10 w-10 place-items-center rounded-lg bg-emerald-400/10 text-emerald-400"
                        ><Check class="h-4 w-4"
                    /></span>
                    <div class="flex-1">
                        <strong>{{ item[1] }}</strong>
                        <p class="mt-1 text-sm text-muted-foreground">
                            {{ item[2] }}
                        </p>
                    </div>
                    <span class="text-xs text-emerald-400">Concluído</span>
                </div>
            </div>
            <AppLink
                href="/first-access/LIR-DEMO-2052"
                class="mx-auto mt-8 flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white"
                >Continuar para primeiro acesso <ArrowRight class="h-4 w-4"
            /></AppLink>
        </div>
    </main>
    <main v-else class="min-h-screen pt-28 pb-24">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <div class="grid gap-10 lg:grid-cols-[1fr_340px]">
                <div>
                    <span
                        class="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400"
                        >● Ambiente pronto</span
                    >
                    <h1
                        class="mt-5 font-display text-4xl font-semibold sm:text-5xl"
                    >
                        Seu primeiro acesso começa com segurança.
                    </h1>
                    <p class="mt-4 text-lg text-muted-foreground">
                        Revise credenciais, localização e tarefas recomendadas
                        antes de colocar a VPS em produção.
                    </p>
                    <div class="mt-8 grid gap-4 sm:grid-cols-2">
                        <div
                            v-for="field in [
                                ['IP público', '203.0.113.42'],
                                [
                                    'Usuário',
                                    config.os === 'windows'
                                        ? 'Administrador'
                                        : 'root',
                                ],
                                ['Hostname', 'lirias-prod-01'],
                                ['Sistema', config.osLabel],
                            ]"
                            :key="field[0]"
                            class="rounded-xl border border-border p-4"
                        >
                            <p
                                class="text-[10px] text-muted-foreground uppercase"
                            >
                                {{ field[0] }}
                            </p>
                            <div class="mt-2 flex justify-between">
                                <strong>{{ field[1] }}</strong
                                ><button @click="copy(field[0], field[1])">
                                    <Check
                                        v-if="copied === field[0]"
                                        class="h-4 w-4 text-emerald-400"
                                    /><Clipboard v-else class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <h2 class="mt-10 text-2xl font-semibold">
                        Checklist inicial
                    </h2>
                    <div
                        class="mt-4 divide-y divide-border rounded-xl border border-border"
                    >
                        <button
                            v-for="item in [
                                [
                                    'access',
                                    'Validar o acesso administrativo',
                                    'Conecte via SSH ou RDP.',
                                ],
                                [
                                    'firewall',
                                    'Restringir portas administrativas',
                                    'Permita apenas origens confiáveis.',
                                ],
                                [
                                    'updates',
                                    'Atualizar o sistema',
                                    'Instale correções de segurança.',
                                ],
                                [
                                    'backup',
                                    'Ativar uma rotina de backup',
                                    'Defina pontos de recuperação.',
                                ],
                            ]"
                            :key="item[0]"
                            class="flex w-full gap-4 p-4 text-left"
                            @click="toggle(item[0])"
                        >
                            <span
                                class="grid h-8 w-8 place-items-center rounded-lg border"
                                :class="
                                    completed.includes(item[0])
                                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400'
                                        : 'border-border text-primary-light'
                                "
                                ><Check
                                    v-if="completed.includes(item[0])"
                                    class="h-4 w-4" /><ShieldCheck
                                    v-else
                                    class="h-4 w-4" /></span
                            ><span
                                ><strong
                                    :class="
                                        completed.includes(item[0])
                                            ? 'text-muted-foreground line-through'
                                            : ''
                                    "
                                    >{{ item[1] }}</strong
                                ><span
                                    class="mt-1 block text-xs text-muted-foreground"
                                    >{{ item[2] }}</span
                                ></span
                            >
                        </button>
                    </div>
                </div>
                <aside class="space-y-4">
                    <div class="rounded-xl border border-border p-5">
                        <KeyRound class="h-5 w-5 text-primary-light" />
                        <h2 class="mt-4 font-semibold">
                            Acesso administrativo
                        </h2>
                        <p class="mt-2 text-xs text-muted-foreground">
                            A senha temporária não é exibida no protótipo. No
                            produto real ela aparecerá uma única vez.
                        </p>
                    </div>
                    <div class="rounded-xl border border-border p-5">
                        <MapPin class="h-5 w-5 text-primary-light" />
                        <h2 class="mt-4 font-semibold">São Paulo, Brasil</h2>
                        <p class="mt-2 text-xs text-muted-foreground">
                            {{ config.vcpu }} vCPU · {{ config.ram }} GB RAM ·
                            {{ config.disk }} GB NVMe
                        </p>
                    </div>
                    <div
                        class="rounded-xl border border-primary/20 bg-primary/5 p-5"
                    >
                        <ShieldCheck class="h-5 w-5 text-primary-light" />
                        <h2 class="mt-4 font-semibold">
                            Próximo passo recomendado
                        </h2>
                        <p class="mt-2 text-xs text-muted-foreground">
                            Cadastre uma chave SSH ou restrinja o RDP antes de
                            publicar serviços.
                        </p>
                        <AppLink
                            href="/docs"
                            class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white"
                            >Abrir guia <ArrowRight class="h-4 w-4"
                        /></AppLink>
                    </div>
                </aside>
            </div>
        </div>
    </main>
</template>
