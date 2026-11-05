import { useState } from 'react';
import {
    ArrowRight,
    BookOpen,
    Check,
    ChevronRight,
    Clock3,
    Code2,
    Copy,
    FileText,
    Gauge,
    Info,
    KeyRound,
    Search,
    Server,
    ShieldCheck,
    Terminal,
    Workflow,
} from 'lucide-react';
import AppLink from '@/components/navigation/app-link';
import { Badge, Button, Card, Input } from '@/components/ui';
import {
    DOC_ARTICLES,
    DOC_CATEGORIES,
    QUICKSTARTS,
    type DocArticle,
} from '@/data/help-center-demo';
import { cn } from '@/lib/utils';

type SystemFilter = 'Todos' | 'Linux' | 'Windows';

const ARTICLE_DETAILS: Record<
    string,
    {
        objective: string;
        prerequisites: string[];
        steps: string[];
        warning?: string;
    }
> = {
    'connect-ssh': {
        objective:
            'Abrir uma sessão SSH protegida e confirmar a identidade da sua VPS Linux.',
        prerequisites: [
            'IP público do servidor',
            'Usuário autorizado',
            'Chave privada armazenada localmente',
        ],
        steps: [
            'Abra o terminal no seu computador.',
            'Execute o comando usando o IP da VPS.',
            'Compare a impressão digital exibida com a do painel.',
            'Confirme a conexão e valide o usuário ativo.',
        ],
        warning: 'Nunca envie sua chave privada por chamado ou mensagem.',
    },
    'connect-rdp': {
        objective:
            'Acessar o ambiente gráfico do Windows Server com o menor privilégio necessário.',
        prerequisites: [
            'IP público',
            'Usuário do Windows',
            'RDP liberado somente para seu IP',
        ],
        steps: [
            'Abra o aplicativo Conexão de Área de Trabalho Remota.',
            'Informe o IP e o usuário.',
            'Valide o certificado apresentado.',
            'Conecte e altere a senha temporária.',
        ],
    },
    'firewall-first-rules': {
        objective:
            'Reduzir a superfície de exposição liberando apenas os serviços necessários.',
        prerequisites: [
            'Lista de portas da aplicação',
            'Seu IP de origem',
            'Acesso administrativo',
        ],
        steps: [
            'Mantenha uma sessão de recuperação aberta.',
            'Crie regras para SSH ou RDP limitadas ao seu IP.',
            'Libere HTTP e HTTPS quando necessário.',
            'Teste o acesso antes de remover regras antigas.',
        ],
        warning:
            'Uma regra incorreta pode bloquear seu próprio acesso ao servidor.',
    },
};

function getArticleDetails(article: DocArticle) {
    return (
        ARTICLE_DETAILS[article.id] ?? {
            objective: article.description,
            prerequisites: [
                'Acesso ao painel LIRIAS',
                'Backup recente quando houver alteração de sistema',
            ],
            steps: [
                'Revise os requisitos do procedimento.',
                'Aplique a mudança em uma janela controlada.',
                'Valide o serviço e registre o resultado.',
            ],
        }
    );
}

export default function DocsPage() {
    const [query, setQuery] = useState('');
    const [system, setSystem] = useState<SystemFilter>('Todos');
    const [selectedArticle, setSelectedArticle] = useState<DocArticle>(
        DOC_ARTICLES[0]!,
    );
    const [copied, setCopied] = useState(false);
    const [journeyProgress, setJourneyProgress] = useState<
        Record<string, number>
    >(
        Object.fromEntries(
            QUICKSTARTS.map((journey) => [journey.id, journey.progress]),
        ),
    );

    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    const articles = DOC_ARTICLES.filter((article) => {
        const matchesSystem =
            system === 'Todos' ||
            article.system === system ||
            article.system === 'Todos';
        const matchesQuery =
            !normalizedQuery ||
            `${article.title} ${article.description}`
                .toLocaleLowerCase('pt-BR')
                .includes(normalizedQuery);
        return matchesSystem && matchesQuery;
    });
    const details = getArticleDetails(selectedArticle);

    async function copyCommand() {
        if (!selectedArticle.command) return;
        try {
            await navigator.clipboard.writeText(selectedArticle.command);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    }

    function advanceJourney(id: string, total: number) {
        setJourneyProgress((current) => ({
            ...current,
            [id]: Math.min((current[id] ?? 0) + 1, total),
        }));
    }

    return (
        <main className="bg-background pb-24">
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary-light uppercase">
                        <BookOpen className="h-4 w-4" /> Central de conhecimento
                    </div>
                    <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                        <div>
                            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Documentação para operar sua VPS com segurança
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                                Guias objetivos para Linux, Windows, rede,
                                segurança, backups, aplicações e automação —
                                organizados por tarefa, não por produto.
                            </p>
                        </div>
                        <div className="rounded-lg border border-primary/20 bg-card p-5">
                            <div className="flex items-start gap-3">
                                <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" />
                                <p className="text-sm leading-6 text-muted-foreground">
                                    <strong className="text-foreground">
                                        Conteúdo demonstrativo.
                                    </strong>{' '}
                                    Esta central representa a experiência final
                                    do produto. Comandos e procedimentos deverão
                                    ser revisados antes do uso em produção.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 max-w-4xl rounded-lg border border-border bg-card p-3">
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            leftIcon={<Search className="h-4 w-4" />}
                            placeholder="Busque por SSH, RDP, firewall, backup, Docker..."
                            aria-label="Buscar na documentação"
                            className="border-0 bg-transparent focus:ring-0"
                        />
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <section className="py-16">
                    <SectionTitle
                        eyebrow="Jornadas orientadas"
                        title="Comece pelo seu sistema"
                        description="Acompanhe uma sequência segura desde o provisionamento até backup e publicação."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        {QUICKSTARTS.map((journey) => {
                            const progress = journeyProgress[journey.id] ?? 0;
                            const complete = progress === journey.steps.length;
                            return (
                                <Card key={journey.id} className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary-light">
                                            {journey.system === 'Linux' ? (
                                                <Terminal className="h-5 w-5" />
                                            ) : (
                                                <Server className="h-5 w-5" />
                                            )}
                                        </span>
                                        <Badge
                                            variant={
                                                complete ? 'success' : 'primary'
                                            }
                                        >
                                            {complete
                                                ? 'Concluído'
                                                : `${progress}/${journey.steps.length} etapas`}
                                        </Badge>
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-foreground">
                                        {journey.title}
                                    </h3>
                                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-background-tertiary">
                                        <div
                                            className="h-full rounded-full bg-primary transition-[width]"
                                            style={{
                                                width: `${(progress / journey.steps.length) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <ol className="mt-5 grid gap-2 sm:grid-cols-2">
                                        {journey.steps.map((step, index) => (
                                            <li
                                                key={step}
                                                className="flex items-center gap-2 text-xs text-muted-foreground"
                                            >
                                                <span
                                                    className={cn(
                                                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
                                                        index < progress
                                                            ? 'border-success/30 bg-success/10 text-success-light'
                                                            : 'border-border',
                                                    )}
                                                >
                                                    {index < progress ? (
                                                        <Check className="h-3 w-3" />
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                    <Button
                                        className="mt-6"
                                        size="sm"
                                        variant={
                                            complete ? 'secondary' : 'primary'
                                        }
                                        disabled={complete}
                                        onClick={() =>
                                            advanceJourney(
                                                journey.id,
                                                journey.steps.length,
                                            )
                                        }
                                        rightIcon={
                                            <ArrowRight className="h-4 w-4" />
                                        }
                                    >
                                        {complete
                                            ? 'Jornada concluída'
                                            : 'Concluir próxima etapa'}
                                    </Button>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                <section className="border-t border-border py-16">
                    <SectionTitle
                        eyebrow="Biblioteca"
                        title="Explore por assunto"
                        description="Categorias preparadas para crescer sem misturar orientação, referência técnica e suporte."
                    />
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {DOC_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setQuery(category.title)}
                                className="rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-card-hover"
                            >
                                <p className="text-sm font-semibold text-foreground">
                                    {category.title}
                                </p>
                                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                    {category.description}
                                </p>
                                <p className="mt-4 font-mono text-[11px] text-primary-light">
                                    {category.count} conteúdos
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="border-t border-border py-16">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <SectionTitle
                            eyebrow="Guias"
                            title={
                                query
                                    ? 'Resultados da busca'
                                    : 'Artigos essenciais'
                            }
                            description="Selecione um artigo para visualizar o procedimento estruturado."
                        />
                        <div
                            className="flex gap-2"
                            role="group"
                            aria-label="Filtrar por sistema"
                        >
                            {(['Todos', 'Linux', 'Windows'] as const).map(
                                (item) => (
                                    <Button
                                        key={item}
                                        size="sm"
                                        variant={
                                            system === item
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        aria-pressed={system === item}
                                        onClick={() => setSystem(item)}
                                    >
                                        {item}
                                    </Button>
                                ),
                            )}
                        </div>
                    </div>
                    <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
                        <div className="space-y-3">
                            {articles.length ? (
                                articles.map((article) => (
                                    <button
                                        key={article.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedArticle(article)
                                        }
                                        aria-pressed={
                                            selectedArticle.id === article.id
                                        }
                                        className={cn(
                                            'w-full rounded-lg border p-4 text-left transition-colors',
                                            selectedArticle.id === article.id
                                                ? 'border-primary/40 bg-primary/10'
                                                : 'border-border bg-card hover:bg-card-hover',
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-semibold text-foreground">
                                                    {article.title}
                                                </span>
                                                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                                    {article.description}
                                                </span>
                                                <span className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                                                    <span>
                                                        {article.system}
                                                    </span>
                                                    <span>
                                                        {article.difficulty}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <Clock3 className="h-3 w-3" />
                                                        {article.minutes} min
                                                    </span>
                                                </span>
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <Card className="p-8 text-center">
                                    <Search className="mx-auto h-6 w-6 text-muted-foreground" />
                                    <p className="mt-3 text-sm font-semibold text-foreground">
                                        Nenhum conteúdo encontrado
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Tente outro termo ou sistema.
                                    </p>
                                </Card>
                            )}
                        </div>

                        <Card className="overflow-hidden p-0">
                            <div className="border-b border-border p-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="primary">
                                        {selectedArticle.system}
                                    </Badge>
                                    <Badge>{selectedArticle.difficulty}</Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {selectedArticle.minutes} min
                                    </span>
                                </div>
                                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                                    {selectedArticle.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                    {details.objective}
                                </p>
                            </div>
                            <div className="space-y-7 p-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground">
                                        Antes de começar
                                    </h4>
                                    <ul className="mt-3 space-y-2">
                                        {details.prerequisites.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-2 text-sm text-muted-foreground"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-light" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground">
                                        Procedimento
                                    </h4>
                                    <ol className="mt-3 space-y-3">
                                        {details.steps.map((step, index) => (
                                            <li
                                                key={step}
                                                className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-muted-foreground"
                                            >
                                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary-light">
                                                    {index + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                {selectedArticle.command ? (
                                    <div className="overflow-hidden rounded-lg border border-border bg-background/55">
                                        <div className="flex items-center justify-between border-b border-border px-4 py-2">
                                            <span className="font-mono text-[11px] text-muted-foreground">
                                                Terminal
                                            </span>
                                            <Button
                                                size="xs"
                                                variant="ghost"
                                                onClick={copyCommand}
                                                leftIcon={
                                                    copied ? (
                                                        <Check className="h-3.5 w-3.5" />
                                                    ) : (
                                                        <Copy className="h-3.5 w-3.5" />
                                                    )
                                                }
                                            >
                                                {copied ? 'Copiado' : 'Copiar'}
                                            </Button>
                                        </div>
                                        <pre className="overflow-x-auto p-4 font-mono text-xs text-foreground">
                                            <code>
                                                {selectedArticle.command}
                                            </code>
                                        </pre>
                                    </div>
                                ) : null}
                                {details.warning ? (
                                    <div className="flex gap-3 rounded-lg border border-warning/25 bg-warning/5 p-4">
                                        <ShieldCheck className="h-5 w-5 shrink-0 text-warning-light" />
                                        <p className="text-xs leading-5 text-muted-foreground">
                                            {details.warning}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </Card>
                    </div>
                </section>

                <section className="border-t border-border py-16">
                    <SectionTitle
                        eyebrow="Para desenvolvedores"
                        title="Referência de API separada dos tutoriais"
                        description="Endpoints previsíveis, exemplos curtos e autenticação explícita para integrar o futuro backend."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        <ReferenceCard
                            icon={KeyRound}
                            title="Autenticação"
                            code="Authorization: Bearer lir_••••"
                            description="Tokens com escopos e expiração controlada."
                        />
                        <ReferenceCard
                            icon={Code2}
                            title="Servidores"
                            code="GET /v1/servers/{serverId}"
                            description="Consulte estado, sistema e região da VPS."
                        />
                        <ReferenceCard
                            icon={Workflow}
                            title="Ações assíncronas"
                            code="POST /v1/servers/{id}/actions"
                            description="Acompanhe reinícios, backups e reinstalações por ID."
                        />
                    </div>
                    <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center">
                        <div>
                            <p className="font-semibold text-foreground">
                                Não encontrou o que precisava?
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Abra um atendimento guiado com contexto técnico
                                e diagnóstico opcional.
                            </p>
                        </div>
                        <Button
                            asChild
                            rightIcon={<ArrowRight className="h-4 w-4" />}
                        >
                            <AppLink href="/support">Ir para o suporte</AppLink>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
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

function ReferenceCard({
    icon: Icon,
    title,
    code,
    description,
}: {
    icon: typeof Gauge;
    title: string;
    code: string;
    description: string;
}) {
    return (
        <Card className="p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-primary-light">
                <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
            <code className="mt-5 block overflow-x-auto rounded-lg bg-background/55 p-3 font-mono text-xs text-foreground">
                {code}
            </code>
        </Card>
    );
}
