import { useState } from 'react';
import {
    Activity,
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Check,
    CheckCircle2,
    Clock3,
    FileClock,
    LifeBuoy,
    LockKeyhole,
    Search,
    Send,
    Server,
    ShieldCheck,
    Stethoscope,
    TicketCheck,
} from 'lucide-react';
import AppLink from '@/components/navigation/app-link';
import {
    Badge,
    Button,
    Card,
    ChoiceCard,
    Input,
    Textarea,
    ToggleRow,
} from '@/components/ui';
import {
    DEMO_SERVERS_FOR_SUPPORT,
    DOC_ARTICLES,
    SUPPORT_TICKETS,
} from '@/data/help-center-demo';
import { cn } from '@/lib/utils';

type Severity = 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
type FormState = {
    serverId: string;
    category: string;
    severity: Severity;
    diagnostics: boolean;
    description: string;
};

const CATEGORIES = [
    { id: 'access', label: 'Acesso SSH ou RDP', icon: LockKeyhole },
    { id: 'performance', label: 'Desempenho', icon: Activity },
    { id: 'network', label: 'Rede e DNS', icon: Server },
    { id: 'security', label: 'Segurança', icon: ShieldCheck },
    { id: 'backup', label: 'Backup e recuperação', icon: FileClock },
    { id: 'other', label: 'Outro assunto', icon: LifeBuoy },
];

const SEVERITIES: {
    id: Severity;
    title: string;
    description: string;
    response: string;
}[] = [
    {
        id: 'Baixo',
        title: 'Dúvida ou orientação',
        description: 'Sem impacto na operação.',
        response: 'Resposta inicial em até 8h úteis',
    },
    {
        id: 'Médio',
        title: 'Impacto parcial',
        description: 'Serviço degradado, mas disponível.',
        response: 'Resposta inicial em até 4h',
    },
    {
        id: 'Alto',
        title: 'Serviço indisponível',
        description: 'Uma carga importante está parada.',
        response: 'Resposta inicial em até 1h',
    },
    {
        id: 'Crítico',
        title: 'Impacto generalizado',
        description: 'Produção parada ou risco ativo.',
        response: 'Resposta inicial em até 20 min',
    },
];

const INITIAL_FORM: FormState = {
    serverId: DEMO_SERVERS_FOR_SUPPORT[0]!.id,
    category: 'access',
    severity: 'Médio',
    diagnostics: true,
    description: '',
};

export default function SupportCenterPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [created, setCreated] = useState(false);
    const [articleQuery, setArticleQuery] = useState('');

    const selectedServer =
        DEMO_SERVERS_FOR_SUPPORT.find(
            (server) => server.id === form.serverId,
        ) ?? DEMO_SERVERS_FOR_SUPPORT[0]!;
    const selectedCategory =
        CATEGORIES.find((category) => category.id === form.category) ??
        CATEGORIES[0]!;
    const severity =
        SEVERITIES.find((item) => item.id === form.severity) ?? SEVERITIES[1]!;
    const normalizedQuery = articleQuery.trim().toLocaleLowerCase('pt-BR');
    const suggestedArticles = DOC_ARTICLES.filter(
        (article) =>
            !normalizedQuery ||
            `${article.title} ${article.description}`
                .toLocaleLowerCase('pt-BR')
                .includes(normalizedQuery),
    ).slice(0, 4);

    function updateForm<Key extends keyof FormState>(
        key: Key,
        value: FormState[Key],
    ) {
        setForm((current) => ({ ...current, [key]: value }));
    }

    function nextStep() {
        setStep((current) => Math.min(current + 1, 4));
    }

    function previousStep() {
        setStep((current) => Math.max(current - 1, 1));
    }

    function createDemoTicket() {
        setCreated(true);
    }

    function resetFlow() {
        setCreated(false);
        setStep(1);
        setForm(INITIAL_FORM);
    }

    return (
        <main className="bg-background pb-24">
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <Badge variant="success" dot>
                        Infraestrutura nacional operacional
                    </Badge>
                    <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
                        <div>
                            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary-light uppercase">
                                Central de suporte
                            </p>
                            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-foreground sm:text-5xl">
                                Resolva primeiro. Abra um chamado com contexto
                                quando precisar.
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                                Diagnóstico guiado, documentação relacionada,
                                prioridade clara e acompanhamento em um só
                                lugar.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Button
                                asChild
                                variant="secondary"
                                leftIcon={<BookOpen className="h-4 w-4" />}
                            >
                                <AppLink href="/docs">
                                    Consultar documentação
                                </AppLink>
                            </Button>
                            <Button
                                asChild
                                variant="secondary"
                                leftIcon={<Activity className="h-4 w-4" />}
                            >
                                <AppLink href="/status">
                                    Ver status da plataforma
                                </AppLink>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-10 flex items-start gap-3 rounded-lg border border-primary/20 bg-card px-4 py-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                        <p className="text-xs leading-5 text-muted-foreground">
                            <strong className="text-foreground">
                                Protótipo demonstrativo.
                            </strong>{' '}
                            O envio abaixo não cria um chamado real e nenhum
                            dado é transmitido.
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <section className="py-16">
                    <SectionTitle
                        eyebrow="Ajuda rápida"
                        title="Talvez a resposta já esteja aqui"
                        description="Busque primeiro nos procedimentos recomendados para Linux e Windows."
                    />
                    <div className="mt-8 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
                        <Card className="p-6">
                            <Input
                                value={articleQuery}
                                onChange={(event) =>
                                    setArticleQuery(event.target.value)
                                }
                                label="O que está acontecendo?"
                                leftIcon={<Search className="h-4 w-4" />}
                                placeholder="Ex.: não consigo acessar por SSH"
                            />
                            <p className="mt-4 text-xs leading-5 text-muted-foreground">
                                A busca usa apenas o catálogo demonstrativo
                                desta versão.
                            </p>
                        </Card>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {suggestedArticles.map((article) => (
                                <AppLink
                                    key={article.id}
                                    href="/docs"
                                    className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-card-hover"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <Badge>{article.system}</Badge>
                                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                            <Clock3 className="h-3 w-3" />
                                            {article.minutes} min
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm font-semibold text-foreground">
                                        {article.title}
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                        {article.description}
                                    </p>
                                </AppLink>
                            ))}
                            {!suggestedArticles.length ? (
                                <Card className="p-6 text-center sm:col-span-2">
                                    <Search className="mx-auto h-5 w-5 text-muted-foreground" />
                                    <p className="mt-3 text-sm font-semibold text-foreground">
                                        Nenhum guia encontrado
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Continue abaixo para abrir um
                                        atendimento guiado.
                                    </p>
                                </Card>
                            ) : null}
                        </div>
                    </div>
                </section>

                <section
                    className="border-t border-border py-16"
                    id="novo-chamado"
                >
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <SectionTitle
                            eyebrow="Atendimento guiado"
                            title="Abra um chamado melhor estruturado"
                            description="O fluxo coleta apenas o necessário e mostra exatamente o que poderá acompanhar o pedido."
                        />
                        <Badge variant="primary">Etapa {step} de 4</Badge>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <Card className="overflow-hidden p-0">
                            <div className="grid grid-cols-4 border-b border-border">
                                {[
                                    'Servidor',
                                    'Assunto',
                                    'Impacto',
                                    'Revisão',
                                ].map((label, index) => {
                                    const number = index + 1;
                                    return (
                                        <div
                                            key={label}
                                            className={cn(
                                                'border-r border-border px-2 py-3 text-center text-[11px] last:border-r-0 sm:text-xs',
                                                step === number
                                                    ? 'bg-primary/10 font-semibold text-primary-light'
                                                    : number < step
                                                      ? 'text-success-light'
                                                      : 'text-muted-foreground',
                                            )}
                                        >
                                            {number < step ? '✓ ' : ''}
                                            {label}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-5 sm:p-7">
                                {created ? (
                                    <SuccessState onReset={resetFlow} />
                                ) : (
                                    <>
                                        {step === 1 ? (
                                            <ServerStep
                                                value={form.serverId}
                                                onChange={(value) =>
                                                    updateForm(
                                                        'serverId',
                                                        value,
                                                    )
                                                }
                                            />
                                        ) : null}
                                        {step === 2 ? (
                                            <CategoryStep
                                                value={form.category}
                                                onChange={(value) =>
                                                    updateForm(
                                                        'category',
                                                        value,
                                                    )
                                                }
                                            />
                                        ) : null}
                                        {step === 3 ? (
                                            <ImpactStep
                                                severity={form.severity}
                                                diagnostics={form.diagnostics}
                                                description={form.description}
                                                onSeverity={(value) =>
                                                    updateForm(
                                                        'severity',
                                                        value,
                                                    )
                                                }
                                                onDiagnostics={(value) =>
                                                    updateForm(
                                                        'diagnostics',
                                                        value,
                                                    )
                                                }
                                                onDescription={(value) =>
                                                    updateForm(
                                                        'description',
                                                        value,
                                                    )
                                                }
                                            />
                                        ) : null}
                                        {step === 4 ? (
                                            <ReviewStep
                                                server={selectedServer}
                                                category={
                                                    selectedCategory.label
                                                }
                                                severity={severity}
                                                form={form}
                                            />
                                        ) : null}
                                        <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-border pt-5 sm:flex-row">
                                            <Button
                                                variant="ghost"
                                                onClick={previousStep}
                                                disabled={step === 1}
                                                leftIcon={
                                                    <ArrowLeft className="h-4 w-4" />
                                                }
                                            >
                                                Voltar
                                            </Button>
                                            {step < 4 ? (
                                                <Button
                                                    onClick={nextStep}
                                                    rightIcon={
                                                        <ArrowRight className="h-4 w-4" />
                                                    }
                                                >
                                                    Continuar
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={createDemoTicket}
                                                    rightIcon={
                                                        <Send className="h-4 w-4" />
                                                    }
                                                >
                                                    Criar chamado demonstrativo
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </Card>

                        <aside className="space-y-4">
                            <Card className="p-5">
                                <Stethoscope className="h-5 w-5 text-primary-light" />
                                <h3 className="mt-4 font-semibold text-foreground">
                                    Diagnóstico transparente
                                </h3>
                                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                    Quando autorizado, o chamado poderá incluir:
                                </p>
                                <ul className="mt-4 space-y-2">
                                    {[
                                        'ID e sistema do servidor',
                                        'Região e estado dos recursos',
                                        'Métricas recentes',
                                        'Ações e eventos selecionados',
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-2 text-xs text-muted-foreground"
                                        >
                                            <Check className="h-3.5 w-3.5 shrink-0 text-success-light" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                            <Card className="border-success/20 bg-success/5 p-5">
                                <ShieldCheck className="h-5 w-5 text-success-light" />
                                <h3 className="mt-4 font-semibold text-foreground">
                                    Segredos ficam de fora
                                </h3>
                                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                    Senhas, chaves SSH, tokens, conteúdo de
                                    arquivos e variáveis secretas nunca devem
                                    ser anexados automaticamente.
                                </p>
                            </Card>
                            <Card className="p-5">
                                <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                    Resposta inicial estimada
                                </p>
                                <p className="mt-3 text-lg font-semibold text-foreground">
                                    {severity.response}
                                </p>
                                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                    Estimativa de primeiro contato, não prazo de
                                    resolução.
                                </p>
                            </Card>
                        </aside>
                    </div>
                </section>

                <section className="border-t border-border py-16">
                    <SectionTitle
                        eyebrow="Acompanhamento"
                        title="Seus chamados demonstrativos"
                        description="Status, prioridade e última atualização sem esconder o histórico do atendimento."
                    />
                    <Card className="mt-8 overflow-hidden p-0">
                        <div className="divide-y divide-border">
                            {SUPPORT_TICKETS.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="grid gap-4 p-5 sm:grid-cols-[110px_1fr_auto] sm:items-center"
                                >
                                    <div>
                                        <p className="font-mono text-xs font-semibold text-primary-light">
                                            {ticket.id}
                                        </p>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                            {ticket.updated}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            {ticket.subject}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {ticket.server} · Prioridade{' '}
                                            {ticket.severity.toLocaleLowerCase(
                                                'pt-BR',
                                            )}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={
                                            ticket.status === 'Resolvido'
                                                ? 'success'
                                                : ticket.status === 'Em análise'
                                                  ? 'warning'
                                                  : 'info'
                                        }
                                    >
                                        {ticket.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>
        </main>
    );
}

function ServerStep({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <StepHeading
                icon={Server}
                title="Qual servidor precisa de ajuda?"
                description="Selecione a VPS para vincular contexto e região ao chamado."
            />
            <div className="mt-6 grid gap-3">
                {DEMO_SERVERS_FOR_SUPPORT.map((server) => (
                    <ChoiceCard
                        key={server.id}
                        selected={value === server.id}
                        onSelect={() => onChange(server.id)}
                        leading={
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-primary-light">
                                <Server className="h-4 w-4" />
                            </span>
                        }
                        title={server.name}
                        description={`${server.system} · ${server.region}`}
                        meta={
                            <Badge variant="success" dot>
                                {server.status}
                            </Badge>
                        }
                    />
                ))}
            </div>
        </div>
    );
}

function CategoryStep({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <StepHeading
                icon={LifeBuoy}
                title="Sobre o que você precisa falar?"
                description="A categoria certa direciona o atendimento sem pedir que você conheça nossa estrutura interna."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {CATEGORIES.map(({ id, label, icon: Icon }) => (
                    <ChoiceCard
                        key={id}
                        selected={value === id}
                        onSelect={() => onChange(id)}
                        leading={
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                                <Icon className="h-4 w-4" />
                            </span>
                        }
                        title={label}
                    />
                ))}
            </div>
        </div>
    );
}

function ImpactStep({
    severity,
    diagnostics,
    description,
    onSeverity,
    onDiagnostics,
    onDescription,
}: {
    severity: Severity;
    diagnostics: boolean;
    description: string;
    onSeverity: (value: Severity) => void;
    onDiagnostics: (value: boolean) => void;
    onDescription: (value: string) => void;
}) {
    return (
        <div>
            <StepHeading
                icon={AlertTriangle}
                title="Qual é o impacto real?"
                description="Escolha pela consequência para o negócio. A prioridade poderá ser revisada pela equipe."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SEVERITIES.map((item) => (
                    <ChoiceCard
                        key={item.id}
                        selected={severity === item.id}
                        onSelect={() => onSeverity(item.id)}
                        title={`${item.id} · ${item.title}`}
                        description={item.description}
                        meta={
                            <span className="text-[11px] font-medium text-primary-light">
                                {item.response}
                            </span>
                        }
                    />
                ))}
            </div>
            <Textarea
                id="support-description"
                label="Descreva o que ocorreu"
                value={description}
                onChange={(event) => onDescription(event.target.value)}
                rows={4}
                placeholder="Quando começou, qual mensagem apareceu e o que você já tentou?"
                className="mt-6"
            />
            <ToggleRow
                className="mt-5"
                checked={diagnostics}
                onCheckedChange={onDiagnostics}
                title="Autorizar diagnóstico técnico seguro"
                description="Inclui metadados e métricas do servidor. Não inclui senhas, chaves, tokens ou conteúdo dos seus arquivos."
            />
        </div>
    );
}

function ReviewStep({
    server,
    category,
    severity,
    form,
}: {
    server: (typeof DEMO_SERVERS_FOR_SUPPORT)[number];
    category: string;
    severity: (typeof SEVERITIES)[number];
    form: FormState;
}) {
    return (
        <div>
            <StepHeading
                icon={TicketCheck}
                title="Revise antes de enviar"
                description="Confira o escopo demonstrativo e o que seria compartilhado com o suporte."
            />
            <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-background">
                {[
                    ['Servidor', `${server.name} · ${server.system}`],
                    ['Região', server.region],
                    ['Assunto', category],
                    ['Impacto', `${severity.id} · ${severity.title}`],
                    [
                        'Diagnóstico',
                        form.diagnostics ? 'Autorizado' : 'Não autorizado',
                    ],
                    [
                        'Descrição',
                        form.description || 'Nenhuma descrição adicionada',
                    ],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="grid gap-1 p-4 sm:grid-cols-[140px_1fr]"
                    >
                        <span className="text-xs text-muted-foreground">
                            {label}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SuccessState({ onReset }: { onReset: () => void }) {
    return (
        <div className="py-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success-light">
                <CheckCircle2 className="h-7 w-7" />
            </span>
            <Badge className="mt-5" variant="success">
                Demonstração concluída
            </Badge>
            <h3 className="mt-4 text-2xl font-semibold text-foreground">
                Chamado LIR-DEMO-2051 preparado
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                Nenhuma informação foi enviada. Na integração futura, esta
                confirmação exibirá o protocolo real e iniciará a linha do tempo
                do atendimento.
            </p>
            <Button className="mt-6" variant="secondary" onClick={onReset}>
                Criar outra simulação
            </Button>
        </div>
    );
}

function StepHeading({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof Server;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary-light">
                <Icon className="h-5 w-5" />
            </span>
            <div>
                <h3 className="text-xl font-semibold text-foreground">
                    {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}

function SectionTitle({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary-light uppercase">
                {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}
