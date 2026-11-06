<script setup lang="ts">
import { BookOpen, Braces, LifeBuoy, Rocket, Search } from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';

const props = defineProps<{
    variant: 'docs' | 'support' | 'developers' | 'launchpad';
}>();
const query = ref('');
const content = computed(
    () =>
        ({
            docs: {
                eyebrow: 'Documentação',
                title: 'Encontre o caminho técnico com clareza.',
                text: 'Guias para configurar, proteger e operar sua infraestrutura.',
                icon: BookOpen,
            },
            support: {
                eyebrow: 'Central de ajuda',
                title: 'Suporte para manter sua operação avançando.',
                text: 'Pesquise respostas ou acompanhe seus atendimentos.',
                icon: LifeBuoy,
            },
            developers: {
                eyebrow: 'Desenvolvedores',
                title: 'Integre a infraestrutura ao seu fluxo.',
                text: 'Referências para automação, tokens e integrações.',
                icon: Braces,
            },
            launchpad: {
                eyebrow: 'LIRIAS Deploy',
                title: 'Prepare um ambiente em poucos passos.',
                text: 'Escolha a aplicação, recursos e parâmetros antes de implantar.',
                icon: Rocket,
            },
        })[props.variant],
);
const cards = computed(() =>
    props.variant === 'launchpad'
        ? ['Aplicação', 'Dados', 'Integrações', 'Revisar implantação']
        : [
              'Primeiros passos',
              'Servidores e acesso',
              'Rede e DNS',
              'Backups e segurança',
              'Aplicações',
              'Cobrança e conta',
          ],
);
</script>

<template>
    <section class="py-20 sm:py-24">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <div class="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
                <div>
                    <p
                        class="font-mono text-xs tracking-[.18em] text-primary-light uppercase"
                    >
                        {{ content.eyebrow }}
                    </p>
                    <h1
                        class="mt-4 max-w-3xl font-display text-5xl font-semibold tracking-tight"
                    >
                        {{ content.title }}
                    </h1>
                    <p
                        class="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground"
                    >
                        {{ content.text }}
                    </p>
                </div>
                <div
                    class="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-4"
                >
                    <Search class="h-5 w-5 text-muted-foreground" /><input
                        v-model="query"
                        class="min-w-0 flex-1 bg-transparent text-sm outline-none"
                        :placeholder="
                            variant === 'launchpad'
                                ? 'Pesquisar aplicação'
                                : 'Pesquisar conteúdo'
                        "
                    />
                </div>
            </div>
            <div
                class="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
            >
                <article
                    v-for="(card, index) in cards"
                    :key="card"
                    class="group min-h-52 bg-background p-6 transition hover:bg-card/70"
                >
                    <div class="flex justify-between">
                        <span
                            class="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/[.06]"
                            ><component
                                :is="content.icon"
                                class="h-4 w-4 text-primary-light" /></span
                        ><span
                            class="text-muted-foreground group-hover:text-primary-light"
                            >0{{ index + 1 }}</span
                        >
                    </div>
                    <h2 class="mt-8 text-lg font-semibold">{{ card }}</h2>
                    <p class="mt-2 text-sm leading-6 text-muted-foreground">
                        Orientações objetivas para configurar e avançar com
                        segurança.
                    </p>
                    <AppLink
                        :href="variant === 'launchpad' ? '/checkout' : '/docs'"
                        class="mt-5 inline-block text-sm font-semibold text-primary-light"
                        >Acessar →</AppLink
                    >
                </article>
            </div>
            <div
                v-if="variant === 'support'"
                class="mt-12 border-t border-border pt-10"
            >
                <h2 class="text-2xl font-semibold">Atendimentos recentes</h2>
                <div
                    class="mt-5 divide-y divide-border rounded-xl border border-border"
                >
                    <div
                        v-for="ticket in [
                            [
                                'LIR-2048',
                                'Falha intermitente ao conectar por SSH',
                                'Em análise',
                            ],
                            [
                                'LIR-2019',
                                'Dúvida sobre retenção de backups',
                                'Aguardando cliente',
                            ],
                            [
                                'LIR-1987',
                                'Configuração de domínio concluída',
                                'Resolvido',
                            ],
                        ]"
                        :key="ticket[0]"
                        class="grid gap-2 p-5 sm:grid-cols-[110px_1fr_auto] sm:items-center"
                    >
                        <strong class="text-sm text-primary-light">{{
                            ticket[0]
                        }}</strong
                        ><span>{{ ticket[1] }}</span
                        ><span class="text-xs text-muted-foreground">{{
                            ticket[2]
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
