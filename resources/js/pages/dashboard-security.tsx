import { useState } from 'react';
import { useParams } from '@/lib/routing';
import Link from '@/components/navigation/app-link';
import {
    AlertTriangle,
    CheckCircle2,
    KeyRound,
    Plus,
    ShieldCheck,
    Trash2,
} from 'lucide-react';
import {
    Badge,
    Button,
    Card,
    Dialog,
    Input,
    Progress,
    ResponsiveDataTable,
    StatePanel,
} from '@/components/ui';
import {
    DashboardPageShell,
    DemoNotice,
    PageHeading,
    SectionCard,
    ServerNavigation,
} from '@/components/dashboard/dashboard-kit';

type FirewallRule = {
    id: string;
    name: string;
    protocol: 'TCP' | 'UDP' | 'ICMP';
    port: string;
    source: string;
    action: 'Permitir' | 'Bloquear';
};

const initialRules: FirewallRule[] = [
    {
        id: 'fw-1',
        name: 'SSH administrativo',
        protocol: 'TCP',
        port: '22',
        source: '198.51.100.18/32',
        action: 'Permitir',
    },
    {
        id: 'fw-2',
        name: 'HTTP',
        protocol: 'TCP',
        port: '80',
        source: 'Todos',
        action: 'Permitir',
    },
    {
        id: 'fw-3',
        name: 'HTTPS',
        protocol: 'TCP',
        port: '443',
        source: 'Todos',
        action: 'Permitir',
    },
];

export function SecurityHubPage() {
    const { serverId = 'srv-lirias-01' } = useParams();
    return (
        <DashboardPageShell title="Segurança">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Segurança da VPS"
                description="Acesso, proteção de rede e integridade do servidor em uma visão operacional."
            />
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    [
                        'Firewall gerenciado',
                        '3 regras ativas',
                        'Rede protegida',
                        '/firewall',
                    ],
                    [
                        'Scanner de malware',
                        'Verificação concluída',
                        '0 ameaças',
                        '/malware',
                    ],
                    [
                        'Chaves SSH',
                        '2 chaves cadastradas',
                        'Senha desativada',
                        '/access',
                    ],
                ].map(([title, description, status, suffix]) => (
                    <Card key={title} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                                <ShieldCheck className="h-5 w-5" />
                            </span>
                            <Badge variant="success" dot>
                                {status}
                            </Badge>
                        </div>
                        <h3 className="mt-5 font-semibold">{title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="mt-5"
                        >
                            <Link
                                href={`/dashboard/servers/${serverId}${suffix}`}
                            >
                                Gerenciar
                            </Link>
                        </Button>
                    </Card>
                ))}
            </div>
            <SectionCard title="Recomendações" className="mt-5">
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-warning-light" />
                        <div>
                            <p className="text-sm font-medium">
                                Revise a origem da porta SSH
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Mantenha a porta 22 restrita ao IP da equipe.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 rounded-xl border border-success/30 bg-success/10 p-4">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success-light" />
                        <div>
                            <p className="text-sm font-medium">
                                Autenticação por chave ativa
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                O acesso por senha está desabilitado.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionCard>
        </DashboardPageShell>
    );
}

export function FirewallPage() {
    const [rules, setRules] = useState(initialRules);
    const [groupActive, setGroupActive] = useState(true);
    const [creating, setCreating] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState<FirewallRule | null>(null);
    const [confirmDisable, setConfirmDisable] = useState(false);

    const addRule = () => {
        setRules((current) => [
            ...current,
            {
                id: `fw-${Date.now()}`,
                name: 'Nova regra HTTPS',
                protocol: 'TCP',
                port: '8443',
                source: 'Todos',
                action: 'Permitir',
            },
        ]);
        setCreating(false);
    };

    const deleteRule = () => {
        if (!ruleToDelete) return;
        setRules((current) =>
            current.filter((item) => item.id !== ruleToDelete.id),
        );
        setRuleToDelete(null);
    };

    return (
        <DashboardPageShell title="Firewall">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Firewall gerenciado"
                description="Controle o tráfego antes que ele alcance o sistema operacional da VPS."
                actions={
                    <>
                        <Badge
                            variant={groupActive ? 'success' : 'warning'}
                            dot
                        >
                            {groupActive
                                ? 'Ativo e sincronizado'
                                : 'Desativado'}
                        </Badge>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                                groupActive
                                    ? setConfirmDisable(true)
                                    : setGroupActive(true)
                            }
                        >
                            {groupActive ? 'Desativar' : 'Ativar'}
                        </Button>
                    </>
                }
            />

            {rules.length === 0 ? (
                <SectionCard>
                    <StatePanel
                        kind="empty"
                        title="Adicione sua primeira regra"
                        description="Sem regras de entrada, o grupo bloqueia todo o tráfego. Libere somente os serviços necessários."
                        action={
                            <Button
                                size="sm"
                                onClick={() => setCreating(true)}
                                leftIcon={<Plus className="h-4 w-4" />}
                            >
                                Adicionar regra
                            </Button>
                        }
                    />
                </SectionCard>
            ) : (
                <SectionCard
                    title="Grupo principal"
                    description="Aplicado a esta VPS. Alterações do front serão sincronizadas pelo futuro backend."
                    action={
                        <Button
                            size="sm"
                            onClick={() => setCreating(true)}
                            leftIcon={<Plus className="h-4 w-4" />}
                        >
                            Nova regra
                        </Button>
                    }
                >
                    {creating && (
                        <div className="mb-5 grid gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4 md:grid-cols-4">
                            <Input
                                label="Nome"
                                defaultValue="Nova regra HTTPS"
                            />
                            <Input label="Porta" defaultValue="8443" />
                            <Input label="Origem" defaultValue="Todos" />
                            <div className="flex items-end gap-2">
                                <Button size="sm" onClick={addRule}>
                                    Adicionar
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setCreating(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    )}
                    <ResponsiveDataTable
                        rows={rules}
                        headers={[
                            'Regra',
                            'Protocolo',
                            'Porta',
                            'Origem',
                            'Ação',
                            '',
                        ]}
                        getKey={(rule) => rule.id}
                        renderRow={(rule) => (
                            <>
                                <td className="py-4 font-medium">
                                    {rule.name}
                                </td>
                                <td>{rule.protocol}</td>
                                <td className="font-mono">{rule.port}</td>
                                <td>{rule.source}</td>
                                <td>
                                    <Badge
                                        variant={
                                            rule.action === 'Permitir'
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {rule.action}
                                    </Badge>
                                </td>
                                <td className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="xs"
                                        className="h-10 w-10 px-0 text-danger-light"
                                        aria-label={`Excluir ${rule.name}`}
                                        onClick={() => setRuleToDelete(rule)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </>
                        )}
                        renderCard={(rule) => (
                            <div>
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-medium">
                                            {rule.name}
                                        </p>
                                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                                            {rule.port}/{rule.protocol}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={
                                            rule.action === 'Permitir'
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {rule.action}
                                    </Badge>
                                </div>
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Origem
                                        </p>
                                        <p className="mt-1 text-sm">
                                            {rule.source}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-danger-light"
                                        leftIcon={
                                            <Trash2 className="h-4 w-4" />
                                        }
                                        onClick={() => setRuleToDelete(rule)}
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        )}
                    />
                </SectionCard>
            )}
            <div className="mt-5 flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4">
                <AlertTriangle className="h-5 w-5 shrink-0 text-warning-light" />
                <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                        Proteja seu acesso:
                    </strong>{' '}
                    antes de remover uma regra SSH, confirme que existe outra
                    origem autorizada.
                </p>
            </div>
            <Dialog
                open={Boolean(ruleToDelete)}
                onOpenChange={(open) => {
                    if (!open) setRuleToDelete(null);
                }}
                title="Excluir regra do firewall?"
                description="A alteração pode interromper o acesso ao serviço associado. Revise os dados antes de confirmar."
                footer={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => setRuleToDelete(null)}
                        >
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={deleteRule}>
                            Excluir regra
                        </Button>
                    </>
                }
            >
                {ruleToDelete ? (
                    <dl className="divide-y divide-border rounded-lg border border-border bg-background">
                        <div className="flex justify-between gap-4 p-4">
                            <dt className="text-sm text-muted-foreground">
                                Regra
                            </dt>
                            <dd className="text-sm font-medium text-foreground">
                                {ruleToDelete.name}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-4 p-4">
                            <dt className="text-sm text-muted-foreground">
                                Porta
                            </dt>
                            <dd className="font-mono text-sm text-foreground">
                                {ruleToDelete.port}/{ruleToDelete.protocol}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-4 p-4">
                            <dt className="text-sm text-muted-foreground">
                                Origem
                            </dt>
                            <dd className="text-sm text-foreground">
                                {ruleToDelete.source}
                            </dd>
                        </div>
                    </dl>
                ) : null}
            </Dialog>
            <Dialog
                open={confirmDisable}
                onOpenChange={setConfirmDisable}
                title="Desativar o firewall?"
                description="A VPS deixará de receber a proteção das regras deste grupo até que ele seja reativado."
                footer={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => setConfirmDisable(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setGroupActive(false);
                                setConfirmDisable(false);
                            }}
                        >
                            Desativar firewall
                        </Button>
                    </>
                }
            >
                <div className="flex gap-3 rounded-lg border border-warning/30 bg-warning/10 p-4">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-warning-light" />
                    <p className="text-sm leading-6 text-muted-foreground">
                        Confirme apenas se existe outra camada de proteção
                        configurada no sistema operacional.
                    </p>
                </div>
            </Dialog>
        </DashboardPageShell>
    );
}

type ScannerState = 'ready' | 'scanning' | 'threats';

export function MalwarePage() {
    const [state, setState] = useState<ScannerState>('ready');
    const [automaticRemoval, setAutomaticRemoval] = useState(false);

    const scan = () => {
        setState('scanning');
        window.setTimeout(() => setState('ready'), 1600);
    };

    return (
        <DashboardPageShell title="Scanner de malware">
            <DemoNotice />
            <ServerNavigation />
            <PageHeading
                title="Scanner de malware"
                description="Verifique arquivos, acompanhe quarentena e defina a resposta automática a ameaças."
                actions={
                    <Button
                        size="sm"
                        onClick={scan}
                        disabled={state === 'scanning'}
                    >
                        {state === 'scanning'
                            ? 'Verificando…'
                            : 'Executar verificação'}
                    </Button>
                }
            />
            <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
                <SectionCard
                    title="Última verificação"
                    action={
                        <Badge
                            variant={
                                state === 'threats'
                                    ? 'danger'
                                    : state === 'scanning'
                                      ? 'warning'
                                      : 'success'
                            }
                            dot
                        >
                            {state === 'scanning'
                                ? 'Em andamento'
                                : state === 'threats'
                                  ? 'Ameaças encontradas'
                                  : 'Protegido'}
                        </Badge>
                    }
                >
                    <div className="flex min-h-56 flex-col items-center justify-center text-center">
                        <span className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-success/15 text-3xl font-semibold text-foreground">
                            {state === 'threats' ? '3' : '0'}
                        </span>
                        <p className="mt-4 font-medium">
                            {state === 'scanning'
                                ? 'Analisando o sistema'
                                : state === 'threats'
                                  ? 'Arquivos exigem atenção'
                                  : 'Nenhuma ameaça encontrada'}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            24.862 arquivos verificados · hoje às 04:00
                        </p>
                        {state === 'scanning' && (
                            <Progress value={68} className="mt-5 max-w-sm" />
                        )}
                    </div>
                </SectionCard>
                <SectionCard
                    title="Proteção automática"
                    action={
                        <button
                            type="button"
                            onClick={() =>
                                setAutomaticRemoval((value) => !value)
                            }
                            className="text-xs font-medium text-primary-light"
                        >
                            {automaticRemoval ? 'Desativar' : 'Ativar'}
                        </button>
                    }
                >
                    <div className="space-y-4">
                        <div className="rounded-xl border border-border p-4">
                            <div className="flex items-center justify-between">
                                <p className="font-medium">
                                    Remoção automática
                                </p>
                                <Badge
                                    variant={
                                        automaticRemoval ? 'success' : 'warning'
                                    }
                                >
                                    {automaticRemoval ? 'Ativa' : 'Inativa'}
                                </Badge>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                                Arquivos identificados serão isolados antes da
                                correção.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-background-tertiary p-4">
                                <p className="text-2xl font-semibold">0</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Em quarentena
                                </p>
                            </div>
                            <div className="rounded-xl bg-background-tertiary p-4">
                                <p className="text-2xl font-semibold">0</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Corrigidos
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                            <KeyRound className="mt-0.5 h-4 w-4 text-primary-light" />
                            <div>
                                <p className="text-sm font-medium">
                                    Motor LIRIAS Guard
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Compatível com Debian 13 e atualizado hoje.
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </DashboardPageShell>
    );
}
