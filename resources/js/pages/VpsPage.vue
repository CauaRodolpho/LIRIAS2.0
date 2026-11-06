<script setup lang="ts">
import {
    Check,
    CloudCog,
    CodeXml,
    Container,
    Database,
    HardDrive,
    Server,
    ShieldCheck,
    Terminal,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';

const props = defineProps<{ system: 'linux' | 'windows' }>();
const selected = ref(0);
const isWindows = computed(() => props.system === 'windows');
const options = computed(() =>
    isWindows.value
        ? [
              [
                  'Aplicações .NET',
                  CodeXml,
                  'Ambiente preparado para serviços e aplicações Microsoft.',
              ],
              [
                  'Desktop remoto',
                  Terminal,
                  'Acesso administrativo ao servidor com controle.',
              ],
              [
                  'Banco de dados',
                  Database,
                  'Base para workloads SQL e aplicações corporativas.',
              ],
              [
                  'Servidor personalizado',
                  CloudCog,
                  'Recursos e sistema ajustados à sua operação.',
              ],
          ]
        : [
              [
                  'API Node.js',
                  CodeXml,
                  'Aplicação, proxy reverso, SSL e banco preparados.',
              ],
              [
                  'Docker',
                  Container,
                  'Contêineres com rede, volumes e observabilidade.',
              ],
              [
                  'Automação n8n',
                  CloudCog,
                  'Workflows, webhooks e persistência própria.',
              ],
              [
                  'E-commerce',
                  Server,
                  'Recursos equilibrados para loja, cache e integrações.',
              ],
              [
                  'Banco de dados',
                  Database,
                  'Disco rápido, rede restrita e backups.',
              ],
              [
                  'Servidor personalizado',
                  HardDrive,
                  'Controle do sistema e de cada camada.',
              ],
          ],
);
</script>

<template>
    <section class="relative overflow-hidden py-20 sm:py-24">
        <div
            class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,hsl(var(--primary)/.12),transparent_35%)]"
        />
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid items-center gap-14 lg:grid-cols-2">
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        VPS {{ isWindows ? 'Windows' : 'Linux' }} · Brasil
                    </p>
                    <h1
                        class="mt-5 font-display text-5xl leading-[1.04] font-semibold tracking-tight sm:text-6xl"
                    >
                        {{
                            isWindows
                                ? 'Windows Server com recursos sob medida.'
                                : 'Linux com liberdade para construir.'
                        }}
                    </h1>
                    <p
                        class="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
                    >
                        {{
                            isWindows
                                ? 'Execute ambientes Microsoft com acesso administrativo, recursos isolados e operação nacional.'
                                : 'Escolha a distribuição, tenha acesso root e organize sua stack em uma infraestrutura brasileira.'
                        }}
                    </p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <AppLink
                            href="/checkout"
                            class="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground"
                            >Configurar VPS</AppLink
                        ><AppLink
                            href="/pricing"
                            class="rounded-lg border border-border px-6 py-3 font-semibold"
                            >Ver planos</AppLink
                        >
                    </div>
                    <ul
                        class="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"
                    >
                        <li
                            v-for="item in [
                                'Recursos isolados',
                                'Armazenamento NVMe',
                                'Acesso administrativo',
                                'Rede preparada',
                            ]"
                            :key="item"
                            class="flex gap-2"
                        >
                            <Check class="h-4 w-4 text-emerald-400" />{{ item }}
                        </li>
                    </ul>
                </div>
                <div
                    class="rounded-2xl border border-border bg-card/40 p-5 sm:p-7"
                >
                    <div
                        class="flex items-center justify-between border-b border-border pb-5"
                    >
                        <div class="flex items-center gap-3">
                            <span
                                class="grid h-11 w-11 place-items-center rounded-lg border border-primary/25 bg-primary/10"
                                ><Server class="h-5 w-5 text-primary-light"
                            /></span>
                            <div>
                                <h2 class="font-semibold">
                                    Configuração recomendada
                                </h2>
                                <p class="text-xs text-muted-foreground">
                                    São Paulo · KVM · NVMe
                                </p>
                            </div>
                        </div>
                        <span class="text-xs text-emerald-400">Disponível</span>
                    </div>
                    <dl class="mt-6 grid grid-cols-3 gap-3">
                        <div
                            v-for="metric in [
                                ['vCPU', '4'],
                                ['Memória', '8 GB'],
                                ['NVMe', '160 GB'],
                            ]"
                            :key="metric[0]"
                            class="rounded-lg border border-border bg-background/50 p-4"
                        >
                            <dt
                                class="text-[10px] tracking-wider text-muted-foreground uppercase"
                            >
                                {{ metric[0] }}
                            </dt>
                            <dd class="mt-3 font-display text-xl font-semibold">
                                {{ metric[1] }}
                            </dd>
                        </div>
                    </dl>
                    <div
                        class="mt-5 rounded-lg border border-border bg-background/50 p-4"
                    >
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground"
                                >Proteção de rede</span
                            ><ShieldCheck class="h-4 w-4 text-emerald-400" />
                        </div>
                        <div
                            class="mt-4 h-1.5 overflow-hidden rounded-full bg-border"
                        >
                            <span class="block h-full w-[84%] bg-primary" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-20">
                <p
                    class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                >
                    Escolha seu objetivo
                </p>
                <h2 class="mt-4 text-3xl font-semibold">
                    Uma base compatível com sua carga de trabalho
                </h2>
                <div class="mt-9 grid gap-3 md:grid-cols-2 lg:max-w-5xl">
                    <button
                        v-for="(option, index) in options"
                        :key="String(option[0])"
                        type="button"
                        :class="[
                            'min-h-44 rounded-xl border p-5 text-left transition',
                            selected === index
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-background/35 hover:bg-card/50',
                        ]"
                        @click="selected = index"
                    >
                        <div class="flex items-start justify-between">
                            <span
                                class="grid h-11 w-11 place-items-center rounded-lg border border-border"
                                ><component
                                    :is="option[1]"
                                    class="h-5 w-5 text-primary-light" /></span
                            ><Check
                                v-if="selected === index"
                                class="h-5 w-5 text-primary-light"
                            />
                        </div>
                        <h3 class="mt-5 text-lg font-semibold">
                            {{ option[0] }}
                        </h3>
                        <p class="mt-2 text-sm leading-6 text-muted-foreground">
                            {{ option[2] }}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
