<script setup lang="ts">
import {
    Activity,
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Bot,
    Braces,
    Check,
    Clock3,
    Code2,
    Copy,
    Database,
    FileCode2,
    Gamepad2,
    Gauge,
    Globe2,
    LifeBuoy,
    LockKeyhole,
    Network,
    Rocket,
    Search,
    Server,
    ShieldCheck,
    ShoppingBag,
    TerminalSquare,
    Workflow,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
const props = defineProps<{
    variant: 'docs' | 'support' | 'developers' | 'launchpad';
}>();
const query = ref('');
const system = ref('Todos');
const selectedArticle = ref(0);
const copied = ref(false);
const supportStep = ref(1);
const supportCreated = ref(false);
const serverId = ref('srv-lirias-01');
const category = ref('access');
const severity = ref('Médio');
const description = ref('');
const deployStep = ref(0);
const goal = ref(2);
const demand = ref(1);
const priorities = ref(['docker', 'backup']);
const articles = [
    [
        'Conectar à VPS Linux por SSH',
        'Acesse o servidor com uma chave segura e valide a identidade do host.',
        'Linux',
        '6 min',
        'ssh root@203.0.113.42',
    ],
    [
        'Conectar à VPS Windows por RDP',
        'Baixe o arquivo RDP, valide o certificado e inicie uma sessão protegida.',
        'Windows',
        '7 min',
        '',
    ],
    [
        'Criar as primeiras regras de firewall',
        'Libere somente os serviços necessários para sua aplicação.',
        'Todos',
        '10 min',
        '',
    ],
    [
        'Restaurar uma VPS usando backup',
        'Revise o ponto de recuperação antes de restaurar.',
        'Todos',
        '12 min',
        '',
    ],
    [
        'Apontar um domínio para a VPS',
        'Configure registros A e AAAA e acompanhe o DNS.',
        'Todos',
        '9 min',
        '',
    ],
    [
        'Instalar Docker no Ubuntu',
        'Instale o engine oficial e valide o serviço.',
        'Linux',
        '14 min',
        'docker run --rm hello-world',
    ],
    [
        'Publicar uma aplicação ASP.NET no IIS',
        'Configure o pool e publique o projeto.',
        'Windows',
        '18 min',
        '',
    ],
    [
        'Investigar uso elevado de CPU',
        'Identifique processos, horários e mudanças relacionadas.',
        'Todos',
        '11 min',
        '',
    ],
];
const filteredArticles = computed(() => {
    const term = query.value.toLocaleLowerCase('pt-BR');
    return articles.filter(
        (a) =>
            (system.value === 'Todos' ||
                a[2] === system.value ||
                a[2] === 'Todos') &&
            (!term ||
                `${a[0]} ${a[1]}`.toLocaleLowerCase('pt-BR').includes(term)),
    );
});
async function copy() {
    const command = articles[selectedArticle.value]?.[4];
    if (!command) return;
    await navigator.clipboard.writeText(command);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
}
const servers = [
    ['srv-lirias-01', 'lirias-node-01', 'Ubuntu 24.04', 'SP1 · São Paulo'],
    [
        'srv-lirias-02',
        'windows-prod-01',
        'Windows Server 2025',
        'CWB1 · Curitiba',
    ],
    ['srv-lirias-03', 'automation-01', 'Debian 13', 'FOR1 · Fortaleza'],
];
const tickets = [
    ['LIR-2048', 'Falha intermitente ao conectar por SSH', 'Em análise'],
    ['LIR-2019', 'Dúvida sobre retenção de backups', 'Aguardando cliente'],
    ['LIR-1987', 'Configuração de domínio concluída', 'Resolvido'],
];
const goals = [
    [
        'Site ou aplicação web',
        'Landing pages, portais e aplicações modernas.',
        Globe2,
        'VPS Starter',
        'Ubuntu 24.04 LTS',
    ],
    [
        'API ou SaaS',
        'Backends, workers, filas e serviços conectados.',
        Code2,
        'VPS Pro',
        'Ubuntu 24.04 LTS',
    ],
    [
        'Automação com n8n',
        'Fluxos, webhooks e integrações entre sistemas.',
        Workflow,
        'VPS Pro',
        'Debian 13',
    ],
    [
        'E-commerce',
        'Loja, banco de dados, cache e integrações.',
        ShoppingBag,
        'VPS Pro',
        'Ubuntu 24.04 LTS',
    ],
    [
        'Agente ou serviço de IA',
        'Agentes, modelos, APIs e bases vetoriais.',
        Bot,
        'VPS Enterprise',
        'Ubuntu 24.04 LTS',
    ],
    [
        'Servidor de jogos',
        'Comunidades, sessões online e servidores com mods.',
        Gamepad2,
        'VPS Enterprise',
        'Debian 13',
    ],
];
const demands = [
    ['Começando', 'Projeto novo, testes ou tráfego inicial.'],
    ['Em crescimento', 'Uso constante e espaço para evoluir.'],
    ['Operação intensa', 'Mais acessos, processos e dados simultâneos.'],
];
const priorityItems = [
    [
        'docker',
        'Ambiente com Docker',
        'Aplicações isoladas e implantação reproduzível.',
        Braces,
    ],
    [
        'database',
        'Banco no mesmo servidor',
        'Reserve mais memória para dados e cache.',
        Database,
    ],
    [
        'backup',
        'Recuperação simplificada',
        'Inclua snapshots na preparação do ambiente.',
        ShieldCheck,
    ],
];
function togglePriority(id: string) {
    priorities.value = priorities.value.includes(id)
        ? priorities.value.filter((i) => i !== id)
        : [...priorities.value, id];
}
</script>
<template>
    <main v-if="variant === 'docs'" class="pb-24">
        <section class="border-b border-border">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <p
                    class="flex items-center gap-2 text-xs font-semibold tracking-[.18em] text-primary-light uppercase"
                >
                    <BookOpen class="h-4 w-4" />Central de conhecimento
                </p>
                <div
                    class="mt-6 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"
                >
                    <div>
                        <h1
                            class="font-display text-4xl font-semibold sm:text-5xl"
                        >
                            Documentação feita para executar, não apenas
                            consultar.
                        </h1>
                        <p
                            class="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground"
                        >
                            Guias orientados por tarefa para configurar,
                            proteger e operar VPS Linux e Windows.
                        </p>
                    </div>
                    <label
                        class="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-card/40 px-4"
                        ><Search class="h-5 w-5 text-muted-foreground" /><input
                            v-model="query"
                            class="w-full bg-transparent outline-none"
                            placeholder="Pesquisar procedimento"
                    /></label>
                </div>
            </div>
        </section>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mt-10 flex gap-2">
                <button
                    v-for="item in ['Todos', 'Linux', 'Windows']"
                    :key="item"
                    class="rounded-lg border px-4 py-2 text-sm"
                    :class="
                        system === item
                            ? 'border-primary bg-primary/10'
                            : 'border-border'
                    "
                    @click="system = item"
                >
                    {{ item }}
                </button>
            </div>
            <div class="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
                <div class="divide-y divide-border border-y border-border">
                    <button
                        v-for="(article, index) in filteredArticles"
                        :key="article[0]"
                        class="w-full p-5 text-left"
                        :class="
                            articles[selectedArticle] === article
                                ? 'bg-primary/[.07]'
                                : ''
                        "
                        @click="selectedArticle = articles.indexOf(article)"
                    >
                        <div class="flex justify-between">
                            <strong>{{ article[0] }}</strong
                            ><span class="text-xs text-muted-foreground">{{
                                article[3]
                            }}</span>
                        </div>
                        <p class="mt-2 text-sm text-muted-foreground">
                            {{ article[1] }}
                        </p>
                        <span
                            class="mt-3 inline-block text-[10px] text-primary-light uppercase"
                            >{{ article[2] }}</span
                        >
                    </button>
                    <p
                        v-if="!filteredArticles.length"
                        class="p-8 text-center text-muted-foreground"
                    >
                        Nenhum guia encontrado.
                    </p>
                </div>
                <article
                    class="sticky top-24 self-start rounded-xl border border-border bg-card/45 p-6"
                >
                    <p class="text-xs text-primary-light uppercase">
                        Procedimento selecionado
                    </p>
                    <h2 class="mt-3 text-2xl font-semibold">
                        {{ articles[selectedArticle]?.[0] }}
                    </h2>
                    <p class="mt-3 leading-7 text-muted-foreground">
                        {{ articles[selectedArticle]?.[1] }}
                    </p>
                    <div
                        v-if="articles[selectedArticle]?.[4]"
                        class="mt-6 flex items-center justify-between rounded-lg bg-background p-4 font-mono text-sm"
                    >
                        <code>{{ articles[selectedArticle]?.[4] }}</code
                        ><button @click="copy">
                            <Check
                                v-if="copied"
                                class="h-4 w-4 text-emerald-400"
                            /><Copy v-else class="h-4 w-4" />
                        </button>
                    </div>
                    <h3 class="mt-7 font-semibold">Etapas</h3>
                    <ol class="mt-4 space-y-3">
                        <li
                            v-for="(step, index) in [
                                'Revise os requisitos do procedimento.',
                                'Aplique a mudança em uma janela controlada.',
                                'Valide o serviço e registre o resultado.',
                            ]"
                            :key="step"
                            class="flex gap-3 text-sm text-muted-foreground"
                        >
                            <span class="text-primary-light"
                                >0{{ index + 1 }}</span
                            >{{ step }}
                        </li>
                    </ol>
                </article>
            </div>
        </div>
    </main>
    <main v-else-if="variant === 'support'" class="pb-24">
        <section class="border-b border-border">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <span
                    class="inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400"
                    >● Infraestrutura nacional operacional</span
                >
                <p class="mt-6 font-mono text-xs text-primary-light uppercase">
                    Central de suporte
                </p>
                <h1
                    class="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-5xl"
                >
                    Resolva primeiro. Abra um chamado com contexto quando
                    precisar.
                </h1>
                <p class="mt-5 max-w-2xl leading-7 text-muted-foreground">
                    Diagnóstico guiado, prioridade clara e acompanhamento em um
                    só lugar.
                </p>
            </div>
        </section>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <section class="py-14">
                <div class="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
                    <label
                        class="rounded-xl border border-border bg-card/40 p-6"
                        ><span class="font-semibold"
                            >O que está acontecendo?</span
                        ><span
                            class="mt-4 flex items-center gap-3 rounded-lg border border-border px-4"
                            ><Search class="h-4 w-4" /><input
                                v-model="query"
                                class="h-11 w-full bg-transparent outline-none"
                                placeholder="Ex.: acesso por SSH" /></span
                    ></label>
                    <div class="grid gap-3 sm:grid-cols-2">
                        <AppLink
                            v-for="article in filteredArticles.slice(0, 4)"
                            :key="article[0]"
                            href="/docs"
                            class="rounded-lg border border-border p-4"
                            ><div class="flex justify-between">
                                <span class="text-xs text-primary-light">{{
                                    article[2]
                                }}</span
                                ><span class="text-xs text-muted-foreground">{{
                                    article[3]
                                }}</span>
                            </div>
                            <strong class="mt-3 block text-sm">{{
                                article[0]
                            }}</strong></AppLink
                        >
                    </div>
                </div>
            </section>
            <section id="novo-chamado" class="border-t border-border py-14">
                <div class="flex justify-between">
                    <div>
                        <p class="text-xs text-primary-light uppercase">
                            Atendimento guiado
                        </p>
                        <h2 class="mt-3 text-3xl font-semibold">
                            Abra um chamado melhor estruturado
                        </h2>
                    </div>
                    <span
                        class="h-fit rounded-full bg-primary/10 px-3 py-1 text-xs text-primary-light"
                        >Etapa {{ supportStep }} de 4</span
                    >
                </div>
                <div class="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div
                        class="overflow-hidden rounded-xl border border-border"
                    >
                        <div class="grid grid-cols-4 border-b border-border">
                            <span
                                v-for="(item, index) in [
                                    'Servidor',
                                    'Assunto',
                                    'Impacto',
                                    'Revisão',
                                ]"
                                :key="item"
                                class="p-3 text-center text-xs"
                                :class="
                                    supportStep === index + 1
                                        ? 'bg-primary/10 text-primary-light'
                                        : 'text-muted-foreground'
                                "
                                >{{ item }}</span
                            >
                        </div>
                        <div class="p-6">
                            <div
                                v-if="supportCreated"
                                class="py-12 text-center"
                            >
                                <Check
                                    class="mx-auto h-10 w-10 text-emerald-400"
                                />
                                <h3 class="mt-4 text-2xl font-semibold">
                                    Chamado demonstrativo criado
                                </h3>
                                <button
                                    class="mt-5 rounded-lg border border-border px-4 py-2"
                                    @click="
                                        supportCreated = false;
                                        supportStep = 1;
                                    "
                                >
                                    Criar outro
                                </button>
                            </div>
                            <template v-else
                                ><div
                                    v-if="supportStep === 1"
                                    class="grid gap-3"
                                >
                                    <button
                                        v-for="server in servers"
                                        :key="server[0]"
                                        class="rounded-lg border p-4 text-left"
                                        :class="
                                            serverId === server[0]
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border'
                                        "
                                        @click="serverId = server[0]"
                                    >
                                        <strong>{{ server[1] }}</strong>
                                        <p
                                            class="mt-1 text-sm text-muted-foreground"
                                        >
                                            {{ server[2] }} · {{ server[3] }}
                                        </p>
                                    </button>
                                </div>
                                <div
                                    v-else-if="supportStep === 2"
                                    class="grid gap-3 sm:grid-cols-2"
                                >
                                    <button
                                        v-for="item in [
                                            [
                                                'access',
                                                'Acesso SSH ou RDP',
                                                LockKeyhole,
                                            ],
                                            [
                                                'performance',
                                                'Desempenho',
                                                Activity,
                                            ],
                                            ['network', 'Rede e DNS', Server],
                                            [
                                                'security',
                                                'Segurança',
                                                ShieldCheck,
                                            ],
                                            [
                                                'backup',
                                                'Backup e recuperação',
                                                BookOpen,
                                            ],
                                            [
                                                'other',
                                                'Outro assunto',
                                                LifeBuoy,
                                            ],
                                        ]"
                                        :key="String(item[0])"
                                        class="rounded-lg border p-4 text-left"
                                        :class="
                                            category === item[0]
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border'
                                        "
                                        @click="category = String(item[0])"
                                    >
                                        <component
                                            :is="item[2]"
                                            class="h-5 w-5 text-primary-light"
                                        /><strong class="mt-3 block">{{
                                            item[1]
                                        }}</strong>
                                    </button>
                                </div>
                                <div
                                    v-else-if="supportStep === 3"
                                    class="grid gap-3"
                                >
                                    <button
                                        v-for="item in [
                                            'Baixo',
                                            'Médio',
                                            'Alto',
                                            'Crítico',
                                        ]"
                                        :key="item"
                                        class="rounded-lg border p-4 text-left"
                                        :class="
                                            severity === item
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border'
                                        "
                                        @click="severity = item"
                                    >
                                        <strong>{{ item }}</strong>
                                        <p
                                            class="mt-1 text-sm text-muted-foreground"
                                        >
                                            {{
                                                item === 'Crítico'
                                                    ? 'Produção parada ou risco ativo.'
                                                    : 'Defina o nível de impacto na operação.'
                                            }}
                                        </p>
                                    </button>
                                </div>
                                <div v-else>
                                    <dl class="space-y-3 text-sm">
                                        <div class="flex justify-between">
                                            <dt class="text-muted-foreground">
                                                Servidor
                                            </dt>
                                            <dd>{{ serverId }}</dd>
                                        </div>
                                        <div class="flex justify-between">
                                            <dt class="text-muted-foreground">
                                                Assunto
                                            </dt>
                                            <dd>{{ category }}</dd>
                                        </div>
                                        <div class="flex justify-between">
                                            <dt class="text-muted-foreground">
                                                Prioridade
                                            </dt>
                                            <dd>{{ severity }}</dd>
                                        </div>
                                    </dl>
                                    <textarea
                                        v-model="description"
                                        class="mt-5 min-h-28 w-full rounded-lg border border-border bg-background p-4"
                                        placeholder="Descreva o problema"
                                    />
                                </div>
                                <div class="mt-6 flex justify-between">
                                    <button
                                        class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 disabled:opacity-40"
                                        :disabled="supportStep === 1"
                                        @click="supportStep--"
                                    >
                                        <ArrowLeft
                                            class="h-4 w-4"
                                        />Voltar</button
                                    ><button
                                        class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white"
                                        @click="
                                            supportStep < 4
                                                ? supportStep++
                                                : (supportCreated = true)
                                        "
                                    >
                                        {{
                                            supportStep < 4
                                                ? 'Continuar'
                                                : 'Criar chamado'
                                        }}<ArrowRight class="h-4 w-4" />
                                    </button></div
                            ></template>
                        </div>
                    </div>
                    <aside
                        class="rounded-xl border border-border bg-card/35 p-5"
                    >
                        <p class="text-xs text-primary-light uppercase">
                            Resumo
                        </p>
                        <p class="mt-4 text-sm text-muted-foreground">
                            O chamado demonstra o fluxo e não transmite dados.
                        </p>
                    </aside>
                </div>
            </section>
            <section class="border-t border-border py-14">
                <h2 class="text-3xl font-semibold">
                    Seus chamados demonstrativos
                </h2>
                <div
                    class="mt-6 divide-y divide-border rounded-xl border border-border"
                >
                    <div
                        v-for="ticket in tickets"
                        :key="ticket[0]"
                        class="grid gap-3 p-5 sm:grid-cols-[110px_1fr_auto]"
                    >
                        <strong class="text-primary-light">{{
                            ticket[0]
                        }}</strong
                        ><span>{{ ticket[1] }}</span
                        ><span class="text-xs text-muted-foreground">{{
                            ticket[2]
                        }}</span>
                    </div>
                </div>
            </section>
        </div>
    </main>
    <main v-else-if="variant === 'developers'" class="min-h-screen pt-28 pb-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
                <div>
                    <span
                        class="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary-light"
                        >Desenvolvedores</span
                    >
                    <h1
                        class="mt-5 font-display text-4xl font-semibold sm:text-5xl"
                    >
                        Recursos para construir e operar na LIRIAS
                    </h1>
                    <p
                        class="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground"
                    >
                        Uma área organizada para documentação, aplicações e
                        futuras integrações da plataforma.
                    </p>
                    <AppLink
                        href="/applications"
                        class="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white"
                        >Abrir catálogo <ArrowRight class="h-4 w-4"
                    /></AppLink>
                </div>
                <div
                    class="border-y border-border py-6 font-mono text-sm lg:border-y-0 lg:border-l lg:pl-10"
                >
                    <p
                        class="mb-5 flex gap-2 border-b border-border pb-4 text-muted-foreground"
                    >
                        <TerminalSquare class="h-4 w-4" />estrutura de
                        integração
                    </p>
                    <p>
                        <span class="text-primary-light">$</span> lirias
                        applications list
                    </p>
                    <p class="mt-4 text-muted-foreground">
                        → Catálogo carregado<br />→ Rotas tipadas<br />→
                        Serviços preparados para API
                    </p>
                    <p class="mt-5 text-emerald-400">
                        ✓ front-end pronto para evoluir
                    </p>
                </div>
            </div>
            <div
                class="mt-16 divide-y divide-border border-y border-border lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0"
            >
                <AppLink
                    v-for="item in [
                        [
                            'Documentação',
                            'Guias organizados por tarefa, sistema e nível de acesso.',
                            'Linux, Windows e API',
                            FileCode2,
                            '/docs',
                            'Em preparação',
                        ],
                        [
                            'Catálogo de stacks',
                            'Ambientes compatíveis e requisitos visíveis antes do deploy.',
                            '10 bases disponíveis',
                            Braces,
                            '/applications',
                            'Disponível',
                        ],
                        [
                            'Status da plataforma',
                            'Disponibilidade, manutenção e comunicação de incidentes.',
                            'Operação nacional',
                            Gauge,
                            '/status',
                            'Em preparação',
                        ],
                    ]"
                    :key="String(item[0])"
                    :href="String(item[4])"
                    class="group flex min-h-56 flex-col p-7"
                    ><component
                        :is="item[3]"
                        class="h-5 w-5 text-primary-light"
                    />
                    <h2 class="mt-6 text-lg font-semibold">{{ item[0] }}</h2>
                    <p
                        class="mt-2 flex-1 text-sm leading-6 text-muted-foreground"
                    >
                        {{ item[1] }}
                    </p>
                    <div class="mt-5 border-t border-border pt-4">
                        <p class="text-xs">{{ item[2] }}</p>
                        <span
                            class="mt-2 block text-[10px] uppercase"
                            :class="
                                item[5] === 'Disponível'
                                    ? 'text-emerald-400'
                                    : 'text-muted-foreground'
                            "
                            >● {{ item[5] }}</span
                        >
                    </div></AppLink
                >
            </div>
        </div>
    </main>
    <main v-else class="relative min-h-screen overflow-hidden pt-28 pb-20">
        <div class="hero-grid absolute inset-0 opacity-45" />
        <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <span
                    class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary-light"
                    ><Network class="h-4 w-4" />LIRIAS Deploy</span
                >
                <h1
                    class="mt-6 font-display text-4xl font-semibold sm:text-6xl"
                >
                    Seu projeto entra.
                    <span class="text-primary-light"
                        >A infraestrutura sai definida.</span
                    >
                </h1>
                <p class="mt-5 text-lg text-muted-foreground">
                    Transforme o cenário da sua aplicação em uma configuração
                    inicial sem começar por uma tabela de especificações.
                </p>
            </div>
            <ol class="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-2">
                <li
                    v-for="(item, index) in [
                        'Projeto',
                        'Demanda',
                        'Prioridades',
                        'Recomendação',
                    ]"
                    :key="item"
                >
                    <div
                        class="h-1 rounded-full"
                        :class="
                            index <= deployStep ? 'bg-primary' : 'bg-border'
                        "
                    />
                    <span
                        class="mt-2 block text-center text-xs"
                        :class="
                            index <= deployStep
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                        "
                        >{{ item }}</span
                    >
                </li>
            </ol>
            <div class="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
                <section
                    class="min-h-[34rem] border-y border-border p-5 sm:p-8"
                >
                    <div
                        v-if="deployStep === 0"
                        class="grid gap-3 sm:grid-cols-2"
                    >
                        <button
                            v-for="(item, index) in goals"
                            :key="String(item[0])"
                            class="rounded-xl border p-5 text-left"
                            :class="
                                goal === index
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border'
                            "
                            @click="goal = index"
                        >
                            <component
                                :is="item[2]"
                                class="h-5 w-5 text-primary-light"
                            />
                            <h2 class="mt-4 font-semibold">{{ item[0] }}</h2>
                            <p class="mt-2 text-sm text-muted-foreground">
                                {{ item[1] }}
                            </p>
                        </button>
                    </div>
                    <div v-else-if="deployStep === 1" class="grid gap-3">
                        <button
                            v-for="(item, index) in demands"
                            :key="item[0]"
                            class="rounded-xl border p-5 text-left"
                            :class="
                                demand === index
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border'
                            "
                            @click="demand = index"
                        >
                            <strong>0{{ index + 1 }} · {{ item[0] }}</strong>
                            <p class="mt-2 text-sm text-muted-foreground">
                                {{ item[1] }}
                            </p>
                        </button>
                    </div>
                    <div v-else-if="deployStep === 2" class="grid gap-3">
                        <button
                            v-for="item in priorityItems"
                            :key="String(item[0])"
                            class="flex items-center gap-4 rounded-xl border p-5 text-left"
                            :class="
                                priorities.includes(String(item[0]))
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border'
                            "
                            @click="togglePriority(String(item[0]))"
                        >
                            <component
                                :is="item[3]"
                                class="h-5 w-5 text-primary-light"
                            /><span class="flex-1"
                                ><strong>{{ item[1] }}</strong
                                ><span
                                    class="mt-1 block text-sm text-muted-foreground"
                                    >{{ item[2] }}</span
                                ></span
                            ><Check
                                v-if="priorities.includes(String(item[0]))"
                                class="h-5 w-5 text-primary-light"
                            />
                        </button>
                    </div>
                    <div v-else class="py-8">
                        <span class="text-xs text-emerald-400"
                            >● Recomendação pronta</span
                        >
                        <h2 class="mt-4 text-3xl font-semibold">
                            {{ goals[goal]?.[3] }}
                        </h2>
                        <p class="mt-3 text-muted-foreground">
                            {{ goals[goal]?.[4] }} · {{ demands[demand]?.[0] }}
                        </p>
                        <div class="mt-8 grid gap-3 sm:grid-cols-3">
                            <div
                                v-for="metric in [
                                    ['vCPU', goal >= 4 ? '8' : '4'],
                                    ['RAM', goal >= 4 ? '16 GB' : '8 GB'],
                                    ['NVMe', goal >= 4 ? '200 GB' : '100 GB'],
                                ]"
                                :key="metric[0]"
                                class="rounded-lg border border-border p-4"
                            >
                                <span class="text-xs text-muted-foreground">{{
                                    metric[0]
                                }}</span
                                ><strong class="mt-2 block">{{
                                    metric[1]
                                }}</strong>
                            </div>
                        </div>
                        <AppLink
                            href="/checkout"
                            class="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white"
                            >Continuar para configuração
                            <ArrowRight class="h-4 w-4"
                        /></AppLink>
                    </div>
                    <div class="mt-8 flex justify-between">
                        <button
                            class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 disabled:opacity-40"
                            :disabled="deployStep === 0"
                            @click="deployStep--"
                        >
                            <ArrowLeft class="h-4 w-4" />Voltar</button
                        ><button
                            v-if="deployStep < 3"
                            class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white"
                            @click="deployStep++"
                        >
                            Continuar <ArrowRight class="h-4 w-4" /></button
                        ><button
                            v-else
                            class="rounded-lg border border-border px-4 py-2"
                            @click="deployStep = 0"
                        >
                            Recomeçar
                        </button>
                    </div>
                </section>
                <aside class="rounded-xl border border-border bg-card/45 p-6">
                    <p class="text-xs text-primary-light uppercase">
                        Resumo ao vivo
                    </p>
                    <h2 class="mt-4 text-xl font-semibold">
                        {{ goals[goal]?.[0] }}
                    </h2>
                    <p class="mt-2 text-sm text-muted-foreground">
                        {{ goals[goal]?.[1] }}
                    </p>
                    <dl
                        class="mt-6 space-y-4 border-t border-border pt-5 text-sm"
                    >
                        <div class="flex justify-between">
                            <dt class="text-muted-foreground">Demanda</dt>
                            <dd>{{ demands[demand]?.[0] }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-muted-foreground">Sistema</dt>
                            <dd>{{ goals[goal]?.[4] }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-muted-foreground">Prioridades</dt>
                            <dd>{{ priorities.length }}</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </div>
    </main>
</template>
