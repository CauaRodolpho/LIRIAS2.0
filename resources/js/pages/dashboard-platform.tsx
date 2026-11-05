import { useState } from 'react';
import {
    Copy,
    ExternalLink,
    Globe2,
    KeyRound,
    Plus,
    ShieldCheck,
    Trash2,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { API_TOKENS, DOMAINS } from '@/data/dashboard-demo';
import {
    Badge,
    Button,
    Dialog,
    Input,
    ResponsiveDataTable,
    StatePanel,
} from '@/components/ui';
import {
    DashboardPageShell,
    DemoAction,
    DemoNotice,
    PageHeading,
    SectionCard,
} from '@/components/dashboard/dashboard-kit';

export function DomainsPage() {
    const [query, setQuery] = useState('');
    const filtered = DOMAINS.filter((domain) =>
        domain.name.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <DashboardPageShell title="Domínios e DNS">
            <DemoNotice />
            <PageHeading
                title="Domínios e DNS"
                description="Acompanhe nameservers, propagação, SSL e a VPS vinculada a cada domínio."
                actions={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                        Adicionar domínio
                    </Button>
                }
            />
            <SectionCard
                title="Seus domínios"
                action={
                    <div className="w-full sm:w-64">
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Pesquisar domínio"
                        />
                    </div>
                }
            >
                <ResponsiveDataTable
                    rows={filtered}
                    headers={[
                        'Domínio',
                        'Nameservers',
                        'Status',
                        'SSL',
                        'Expiração',
                        '',
                    ]}
                    getKey={(domain) => domain.id}
                    minWidth="850px"
                    renderRow={(domain) => (
                        <>
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                                        <Globe2 className="h-4 w-4" />
                                    </span>
                                    <div>
                                        <p className="font-medium">
                                            {domain.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Vinculado a {domain.serverId}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="font-mono text-xs text-muted-foreground">
                                    {domain.nameservers.map((item) => (
                                        <p key={item}>{item}</p>
                                    ))}
                                </div>
                            </td>
                            <td>
                                <Badge
                                    variant={
                                        domain.status === 'Ativo'
                                            ? 'success'
                                            : 'warning'
                                    }
                                    dot
                                >
                                    {domain.status}
                                </Badge>
                            </td>
                            <td>
                                <Badge
                                    variant={
                                        domain.ssl === 'Ativo'
                                            ? 'success'
                                            : 'warning'
                                    }
                                >
                                    {domain.ssl}
                                </Badge>
                            </td>
                            <td>{domain.expiresAt}</td>
                            <td className="text-right">
                                <Button asChild size="sm" variant="secondary">
                                    <Link
                                        href={`/dashboard/servers/${domain.serverId}/dns`}
                                    >
                                        Gerenciar DNS
                                    </Link>
                                </Button>
                            </td>
                        </>
                    )}
                    renderCard={(domain) => (
                        <div>
                            <div className="flex items-start gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                                    <Globe2 className="h-4 w-4" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-medium">
                                        {domain.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Vinculado a {domain.serverId}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge
                                    variant={
                                        domain.status === 'Ativo'
                                            ? 'success'
                                            : 'warning'
                                    }
                                    dot
                                >
                                    {domain.status}
                                </Badge>
                                <Badge
                                    variant={
                                        domain.ssl === 'Ativo'
                                            ? 'success'
                                            : 'warning'
                                    }
                                >
                                    SSL {domain.ssl}
                                </Badge>
                            </div>
                            <dl className="mt-4 space-y-3 text-xs">
                                <div>
                                    <dt className="text-muted-foreground">
                                        Nameservers
                                    </dt>
                                    <dd className="mt-1 font-mono break-all text-foreground">
                                        {domain.nameservers.join(' · ')}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">
                                        Expiração
                                    </dt>
                                    <dd className="mt-1 text-foreground">
                                        {domain.expiresAt}
                                    </dd>
                                </div>
                            </dl>
                            <Button
                                asChild
                                className="mt-4 w-full"
                                size="sm"
                                variant="secondary"
                            >
                                <Link
                                    href={`/dashboard/servers/${domain.serverId}/dns`}
                                >
                                    Gerenciar DNS
                                </Link>
                            </Button>
                        </div>
                    )}
                    empty={
                        <StatePanel
                            compact
                            kind="empty"
                            title="Nenhum domínio encontrado"
                            description="Revise o termo pesquisado."
                        />
                    }
                />
            </SectionCard>
        </DashboardPageShell>
    );
}

export function ApiTokensPage() {
    const [revealedToken, setRevealedToken] = useState<string | null>(null);
    const [tokens, setTokens] = useState(API_TOKENS);
    const [tokenToRevoke, setTokenToRevoke] = useState<
        (typeof API_TOKENS)[number] | null
    >(null);

    const generateToken = () =>
        setRevealedToken('lrs_demo_7f93b2a81c4e••••••••••••');

    return (
        <DashboardPageShell title="API e desenvolvedores">
            <DemoNotice />
            <PageHeading
                title="Tokens de API"
                description="Crie credenciais com escopo limitado para automações, integrações e ferramentas externas."
                actions={
                    <Button
                        size="sm"
                        onClick={generateToken}
                        leftIcon={<Plus className="h-4 w-4" />}
                    >
                        Gerar token
                    </Button>
                }
            />

            {revealedToken && (
                <div className="mb-5 rounded-xl border border-warning/30 bg-warning/10 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold">
                                Copie agora: esta credencial será exibida uma
                                única vez
                            </p>
                            <code className="mt-2 block text-xs break-all text-muted-foreground">
                                {revealedToken}
                            </code>
                        </div>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                                navigator.clipboard?.writeText(revealedToken)
                            }
                            leftIcon={<Copy className="h-4 w-4" />}
                        >
                            Copiar
                        </Button>
                    </div>
                </div>
            )}

            <SectionCard
                title="Credenciais ativas"
                description="Revogue imediatamente qualquer token que não esteja mais em uso."
            >
                <div className="divide-y divide-border">
                    {tokens.map((token) => (
                        <div
                            key={token.id}
                            className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div className="flex min-w-0 items-start gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                                    <KeyRound className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="font-medium">{token.name}</p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {token.scopes.map((scope) => (
                                            <Badge key={scope}>{scope}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
                                <div>
                                    <span className="block">Criado em</span>
                                    <strong className="text-foreground">
                                        {token.createdAt}
                                    </strong>
                                </div>
                                <div>
                                    <span className="block">Último uso</span>
                                    <strong className="text-foreground">
                                        {token.lastUsedAt}
                                    </strong>
                                </div>
                                <div>
                                    <span className="block">Expira em</span>
                                    <strong className="text-foreground">
                                        {token.expiresAt}
                                    </strong>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setTokenToRevoke(token)}
                                className="text-danger-light"
                                leftIcon={<Trash2 className="h-4 w-4" />}
                            >
                                Revogar
                            </Button>
                        </div>
                    ))}
                </div>
            </SectionCard>
            <Dialog
                open={Boolean(tokenToRevoke)}
                onOpenChange={(open) => {
                    if (!open) setTokenToRevoke(null);
                }}
                title="Revogar token de API?"
                description="Aplicações que usam esta credencial perderão o acesso imediatamente."
                footer={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => setTokenToRevoke(null)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                if (tokenToRevoke)
                                    setTokens((current) =>
                                        current.filter(
                                            (item) =>
                                                item.id !== tokenToRevoke.id,
                                        ),
                                    );
                                setTokenToRevoke(null);
                            }}
                        >
                            Revogar token
                        </Button>
                    </>
                }
            >
                {tokenToRevoke ? (
                    <div className="rounded-lg border border-danger/25 bg-danger/5 p-4">
                        <p className="text-sm font-medium">
                            {tokenToRevoke.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Escopos: {tokenToRevoke.scopes.join(', ')}
                        </p>
                    </div>
                ) : null}
            </Dialog>

            <div className="mt-5 grid gap-5 xl:grid-cols-2">
                <SectionCard
                    title="Documentação da API"
                    description="Endpoints preparados para servidores, métricas, backups e operações."
                >
                    <div className="flex items-center justify-between rounded-xl border border-border p-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary-light" />
                            <div>
                                <p className="text-sm font-medium">
                                    API LIRIAS v1
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Autenticação Bearer e permissões por escopo.
                                </p>
                            </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                </SectionCard>
                <SectionCard
                    title="Conectar ferramentas"
                    description="Integração MCP planejada para uma etapa posterior à API real."
                >
                    <div className="flex flex-wrap gap-2">
                        {['Claude Code', 'Cursor', 'JetBrains', 'Windsurf'].map(
                            (tool) => (
                                <Badge key={tool}>{tool}</Badge>
                            ),
                        )}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        O front já reserva essa evolução, mas nenhum token real
                        será incorporado a arquivos de configuração
                        demonstrativos.
                    </p>
                    <div className="mt-4">
                        <DemoAction>Ver plano de integração</DemoAction>
                    </div>
                </SectionCard>
            </div>
        </DashboardPageShell>
    );
}
