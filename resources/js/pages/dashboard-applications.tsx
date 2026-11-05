import { useState } from 'react';
import { useParams } from '@/lib/routing';
import {
    Activity,
    ArrowLeft,
    CheckCircle2,
    Copy,
    KeyRound,
    Search,
    Terminal,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { ApplicationIcon } from '@/components/applications';
import { Badge, Button, Card, Input, Progress } from '@/components/ui';
import {
    DashboardPageShell,
    DemoNotice,
    KeyValueRows,
    PageHeading,
    SectionCard,
    ServerNavigation,
} from '@/components/dashboard/dashboard-kit';
import {
    APPLICATION_CATALOG,
    getApplicationBySlug,
} from '@/data/application-catalog';
import { DEMO_SERVER, RECENT_ACTIONS } from '@/data/dashboard-demo';

export function DashboardApplicationsPage() {
    const { serverId = DEMO_SERVER.id, appId } = useParams();
    const [query, setQuery] = useState('');
    const [stage, setStage] = useState<'configure' | 'installing' | 'ready'>(
        'configure',
    );
    const application = getApplicationBySlug(appId);
    const filtered = APPLICATION_CATALOG.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
    );

    const startDemo = () => {
        setStage('installing');
        window.setTimeout(() => setStage('ready'), 1500);
    };

    return (
        <DashboardPageShell
            title={application ? `Instalar ${application.name}` : 'Aplicações'}
        >
            <DemoNotice />
            <ServerNavigation />
            {application ? (
                <>
                    <Link
                        href={`/dashboard/servers/${serverId}/applications`}
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
                    </Link>
                    <PageHeading
                        title={`Preparar ${application.name}`}
                        description="Revise a configuração antes de simular a implantação neste servidor."
                    />
                    <div className="grid gap-5 xl:grid-cols-[1fr_.72fr]">
                        <SectionCard
                            title="Configuração"
                            description="Os campos abaixo não alteram o servidor real."
                        >
                            <div className="flex items-center gap-4 border-b border-border pb-5">
                                <ApplicationIcon application={application} />
                                <div>
                                    <h3 className="font-semibold">
                                        {application.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {application.category}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                <Input
                                    label="Servidor"
                                    value={DEMO_SERVER.name}
                                    readOnly
                                />
                                <Input
                                    label="Hostname"
                                    defaultValue={`${application.slug}.exemplo.com`}
                                />
                                <Input
                                    label="Usuário administrador"
                                    defaultValue="admin"
                                />
                                <Input
                                    label="Versão"
                                    defaultValue="Recomendada"
                                    readOnly
                                />
                            </div>
                            <div className="mt-5 rounded-xl border border-border bg-background-secondary p-4">
                                <p className="text-sm font-medium">
                                    Etapas previstas
                                </p>
                                <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {application.steps.map((step, index) => (
                                        <li
                                            key={step}
                                            className="flex items-center gap-2 text-xs text-muted-foreground"
                                        >
                                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 font-mono text-primary-light">
                                                {index + 1}
                                            </span>
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </SectionCard>
                        <SectionCard title="Resumo da simulação">
                            {stage === 'configure' && (
                                <>
                                    <KeyValueRows
                                        rows={[
                                            ['Aplicação', application.name],
                                            ['Servidor', DEMO_SERVER.name],
                                            [
                                                'Método',
                                                'Template demonstrativo',
                                            ],
                                            ['Ação real', 'Nenhuma'],
                                        ]}
                                    />
                                    <Button
                                        className="mt-6 w-full"
                                        onClick={startDemo}
                                    >
                                        Simular implantação
                                    </Button>
                                </>
                            )}
                            {stage === 'installing' && (
                                <div className="py-8 text-center">
                                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
                                        <Terminal className="h-6 w-6 animate-pulse" />
                                    </span>
                                    <h3 className="mt-4 font-semibold">
                                        Preparando a interface
                                    </h3>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Simulando as etapas de configuração.
                                    </p>
                                    <Progress value={68} className="mt-6" />
                                </div>
                            )}
                            {stage === 'ready' && (
                                <div className="py-7 text-center">
                                    <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                                    <h3 className="mt-4 text-lg font-semibold">
                                        Simulação concluída
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        O fluxo do front-end está pronto para
                                        receber o endpoint de implantação.
                                    </p>
                                    <Button
                                        variant="secondary"
                                        className="mt-6"
                                        onClick={() => setStage('configure')}
                                    >
                                        Executar novamente
                                    </Button>
                                </div>
                            )}
                        </SectionCard>
                    </div>
                </>
            ) : (
                <>
                    <PageHeading
                        title="Catálogo de aplicações"
                        description="Escolha uma stack e percorra o fluxo demonstrativo de configuração."
                        actions={
                            <div className="w-full sm:w-72">
                                <Input
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    placeholder="Pesquisar"
                                    leftIcon={<Search className="h-4 w-4" />}
                                />
                            </div>
                        }
                    />
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((item) => (
                            <Card key={item.slug} className="flex flex-col p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <ApplicationIcon application={item} />
                                    <Badge>{item.category}</Badge>
                                </div>
                                <h3 className="mt-5 font-semibold">
                                    {item.name}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                </p>
                                <Button
                                    asChild
                                    variant="secondary"
                                    size="sm"
                                    className="mt-5"
                                >
                                    <Link
                                        href={`/dashboard/servers/${serverId}/applications/${item.slug}`}
                                    >
                                        Configurar
                                    </Link>
                                </Button>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </DashboardPageShell>
    );
}

export function ServerActivityPage() {
    return (
        <DashboardPageShell title="Atividade do servidor">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Histórico de ações"
                description="Eventos demonstrativos organizados para futura integração com o registro operacional."
            />
            <SectionCard>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-sm">
                        <thead className="text-xs tracking-wider text-muted-foreground uppercase">
                            <tr>
                                <th className="pb-3 font-medium">Ação</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium">Origem</th>
                                <th className="pb-3 font-medium">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {RECENT_ACTIONS.map((item) => (
                                <tr key={`${item.action}-${item.at}`}>
                                    <td className="py-4 font-mono text-xs">
                                        {item.action}
                                    </td>
                                    <td className="py-4">
                                        <Badge variant="success" dot>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 text-muted-foreground">
                                        Painel LIRIAS
                                    </td>
                                    <td className="py-4 text-muted-foreground">
                                        {item.at}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}

export function ServerAccessPage() {
    return (
        <DashboardPageShell title="Acesso ao servidor">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Acesso e credenciais"
                description="Dados demonstrativos para organizar SSH, endereço e chaves do servidor."
            />
            <div className="grid gap-5 xl:grid-cols-2">
                <SectionCard
                    title="Conexão SSH"
                    action={
                        <button className="inline-flex items-center gap-2 text-xs font-medium text-primary-light">
                            <Copy className="h-3.5 w-3.5" /> Copiar
                        </button>
                    }
                >
                    <KeyValueRows
                        rows={[
                            ['Host', DEMO_SERVER.ipv4],
                            ['Usuário', 'root'],
                            ['Porta', '22'],
                            [
                                'Comando',
                                <code>ssh root@{DEMO_SERVER.ipv4}</code>,
                            ],
                        ]}
                    />
                </SectionCard>
                <SectionCard title="Chaves cadastradas">
                    <div className="space-y-3">
                        {['notebook-principal', 'deploy-ci'].map(
                            (key, index) => (
                                <div
                                    key={key}
                                    className="flex items-center gap-3 rounded-xl border border-border p-4"
                                >
                                    <KeyRound className="h-5 w-5 text-primary-light" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">
                                            {key}
                                        </p>
                                        <p className="truncate font-mono text-xs text-muted-foreground">
                                            SHA256:
                                            {index === 0
                                                ? 'f4R8...LIRIAS'
                                                : 'a9P2...DEPLOY'}
                                        </p>
                                    </div>
                                    <Badge variant="success">Ativa</Badge>
                                </div>
                            ),
                        )}
                    </div>
                    <Button variant="secondary" size="sm" className="mt-5">
                        Adicionar chave
                    </Button>
                </SectionCard>
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-background-secondary p-4">
                <Activity className="mt-0.5 h-5 w-5 text-primary-light" />
                <div>
                    <p className="text-sm font-medium">Integração futura</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        A API deverá retornar credenciais temporárias e
                        registrar qualquer alteração no histórico do servidor.
                    </p>
                </div>
            </div>
        </DashboardPageShell>
    );
}
