<script setup lang="ts">
import {
    Check,
    ChevronRight,
    Cpu,
    HardDrive,
    MemoryStick,
    Server,
} from '@lucide/vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    stage?: 'checkout' | 'provisioning' | 'first-access';
}>();
const step = ref(0);
const selected = ref(1);
const plans = [
    { name: 'Starter', cpu: 2, ram: 4, disk: 80, price: 39.9 },
    { name: 'Pro', cpu: 4, ram: 8, disk: 160, price: 79.9 },
    { name: 'Enterprise', cpu: 8, ram: 16, disk: 320, price: 149.9 },
];
const plan = computed(() => plans[selected.value]);
</script>

<template>
    <section class="py-16 sm:py-20">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <div
                v-if="stage && stage !== 'checkout'"
                class="mx-auto max-w-3xl text-center"
            >
                <span
                    class="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-500/30 bg-emerald-500/10"
                    ><Check class="h-7 w-7 text-emerald-400"
                /></span>
                <p
                    class="mt-6 font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                >
                    {{
                        stage === 'provisioning'
                            ? 'Provisionamento em andamento'
                            : 'Primeiro acesso'
                    }}
                </p>
                <h1 class="mt-4 font-display text-5xl font-semibold">
                    {{
                        stage === 'provisioning'
                            ? 'Estamos preparando sua VPS.'
                            : 'Seu ambiente está pronto.'
                    }}
                </h1>
                <p class="mt-5 text-lg text-muted-foreground">
                    Recursos, sistema, rede e acesso estão sendo organizados
                    para sua operação.
                </p>
                <div
                    class="mt-10 divide-y divide-border rounded-xl border border-border text-left"
                >
                    <div
                        v-for="(item, index) in [
                            'Recursos reservados',
                            'Sistema preparado',
                            'Rede configurada',
                            'Acesso protegido',
                        ]"
                        :key="item"
                        class="flex items-center gap-4 p-5"
                    >
                        <span
                            class="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/10 text-sm text-emerald-400"
                            >0{{ index + 1 }}</span
                        ><span class="font-medium">{{ item }}</span
                        ><Check class="ml-auto h-4 w-4 text-emerald-400" />
                    </div>
                </div>
            </div>
            <template v-else
                ><div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        Configurar infraestrutura
                    </p>
                    <h1 class="mt-4 font-display text-5xl font-semibold">
                        Monte sua VPS com clareza.
                    </h1>
                    <p class="mt-5 text-lg text-muted-foreground">
                        Escolha os recursos e revise antes de provisionar.
                    </p>
                </div>
                <div class="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
                    <div class="rounded-xl border border-border p-6 sm:p-8">
                        <p class="text-xs text-primary-light">
                            ETAPA 0{{ step + 1 }}
                        </p>
                        <h2 class="mt-3 text-2xl font-semibold">
                            {{
                                step === 0
                                    ? 'Escolha a configuração'
                                    : step === 1
                                      ? 'Defina o sistema'
                                      : 'Revise o ambiente'
                            }}
                        </h2>
                        <div
                            v-if="step === 0"
                            class="mt-7 grid gap-3 sm:grid-cols-3"
                        >
                            <button
                                v-for="(item, index) in plans"
                                :key="item.name"
                                :class="[
                                    'rounded-xl border p-5 text-left',
                                    selected === index
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border',
                                ]"
                                @click="selected = index"
                            >
                                <Server
                                    class="h-5 w-5 text-primary-light"
                                /><strong class="mt-5 block">{{
                                    item.name
                                }}</strong
                                ><span
                                    class="mt-2 block text-sm text-muted-foreground"
                                    >{{ item.cpu }} vCPU ·
                                    {{ item.ram }} GB</span
                                >
                            </button>
                        </div>
                        <div
                            v-else-if="step === 1"
                            class="mt-7 grid gap-3 sm:grid-cols-2"
                        >
                            <button
                                v-for="system in [
                                    'Debian 13',
                                    'Ubuntu 24.04',
                                    'AlmaLinux 10',
                                    'Windows Server',
                                ]"
                                :key="system"
                                class="rounded-xl border border-border p-5 text-left hover:border-primary"
                            >
                                <HardDrive
                                    class="h-5 w-5 text-primary-light"
                                /><strong class="mt-4 block">{{
                                    system
                                }}</strong>
                            </button>
                        </div>
                        <div
                            v-else
                            class="mt-7 rounded-xl border border-border p-5"
                        >
                            <p class="text-sm text-muted-foreground">
                                A configuração está pronta para seguir ao
                                provisionamento demonstrativo.
                            </p>
                        </div>
                        <div
                            class="mt-8 flex justify-between border-t border-border pt-6"
                        >
                            <button
                                class="rounded-lg px-4 py-3 text-sm"
                                :disabled="step === 0"
                                @click="step = Math.max(0, step - 1)"
                            >
                                Voltar</button
                            ><button
                                class="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
                                @click="step = Math.min(2, step + 1)"
                            >
                                {{ step === 2 ? 'Confirmar' : 'Continuar'
                                }}<ChevronRight class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <aside
                        class="h-fit rounded-xl border border-border bg-card/45 p-6 lg:sticky lg:top-24"
                    >
                        <p
                            class="text-xs tracking-wider text-primary-light uppercase"
                        >
                            Configuração ao vivo
                        </p>
                        <h2 class="mt-3 text-2xl font-semibold">
                            VPS {{ plan.name }}
                        </h2>
                        <p class="mt-4">
                            <strong class="font-display text-3xl"
                                >R$
                                {{
                                    plan.price.toFixed(2).replace('.', ',')
                                }}</strong
                            ><span class="text-xs text-muted-foreground"
                                >/mês</span
                            >
                        </p>
                        <dl class="mt-6 grid grid-cols-3 gap-2">
                            <div
                                v-for="metric in [
                                    [Cpu, plan.cpu, 'vCPU'],
                                    [MemoryStick, `${plan.ram} GB`, 'RAM'],
                                    [HardDrive, `${plan.disk} GB`, 'NVMe'],
                                ]"
                                :key="String(metric[2])"
                                class="rounded-lg border border-border p-3"
                            >
                                <component
                                    :is="metric[0]"
                                    class="h-4 w-4 text-primary-light"
                                />
                                <dd class="mt-3 font-semibold">
                                    {{ metric[1] }}
                                </dd>
                                <dt class="text-[10px] text-muted-foreground">
                                    {{ metric[2] }}
                                </dt>
                            </div>
                        </dl>
                    </aside>
                </div></template
            >
        </div>
    </section>
</template>
