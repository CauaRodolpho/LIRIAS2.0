import { useState } from 'react';
import { useParams, useSearchParams } from '@/lib/routing';
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Clipboard,
    ExternalLink,
    FileKey2,
    Globe2,
    KeyRound,
    LockKeyhole,
    MapPin,
    Server,
    ShieldCheck,
    Terminal,
} from 'lucide-react';
import AppLink from '@/components/navigation/app-link';
import { Badge, Button, Card } from '@/components/ui';
import { REGIONS } from '@/data/checkout-demo';
import { cn } from '@/lib/utils';

const SECURITY_STEPS = [
    {
        id: 'credentials',
        title: 'Salvar os dados de acesso',
        description:
            'Guarde usuário e credencial temporária em um cofre seguro.',
        icon: LockKeyhole,
    },
    {
        id: 'key',
        title: 'Adicionar uma chave SSH',
        description:
            'Use autenticação por chave e reduza dependência de senha.',
        icon: FileKey2,
    },
    {
        id: 'firewall',
        title: 'Revisar o firewall',
        description:
            'Libere somente portas e origens necessárias para sua aplicação.',
        icon: ShieldCheck,
    },
    {
        id: 'backup',
        title: 'Ativar o primeiro backup',
        description:
            'Crie um ponto de recuperação antes de publicar dados reais.',
        icon: Server,
    },
    {
        id: 'domain',
        title: 'Conectar um domínio',
        description: 'Aponte o DNS e emita o certificado da aplicação.',
        icon: Globe2,
    },
];

export default function FirstAccessPage() {
    const { serverId = 'lirias-node-new' } = useParams();
    const [searchParams] = useSearchParams();
    const [completed, setCompleted] = useState<string[]>(['credentials']);
    const [copied, setCopied] = useState<string | null>(null);

    const isWindows = searchParams.get('os') === 'windows';
    const region =
        REGIONS.find((item) => item.id === searchParams.get('region')) ??
        REGIONS[0]!;
    const ip = '187.45.12.42';
    const command = isWindows ? `mstsc /v:${ip}` : `ssh root@${ip}`;
    const completion = Math.round(
        (completed.length / SECURITY_STEPS.length) * 100,
    );

    function toggleStep(id: string) {
        setCompleted((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    }

    async function copyValue(id: string, value: string) {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(id);
            window.setTimeout(() => setCopied(null), 1600);
        } catch {
            setCopied(null);
        }
    }

    return (
        <main className="min-h-screen bg-background pt-28 pb-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-success/25 bg-success/5 p-6 sm:p-8">
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div className="flex items-start gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success/10 text-success-light">
                                <CheckCircle2 className="h-6 w-6" />
                            </span>
                            <div>
                                <Badge variant="success">
                                    Provisionamento concluído
                                </Badge>
                                <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                                    Prepare o primeiro acesso com segurança
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                                    Sua VPS demonstrativa está pronta. Conclua
                                    os controles essenciais antes de publicar
                                    uma aplicação.
                                </p>
                            </div>
                        </div>
                        <Button
                            asChild
                            variant="secondary"
                            rightIcon={<ExternalLink className="h-4 w-4" />}
                        >
                            <AppLink href="/dashboard/servers/srv-lirias-01">
                                Abrir no painel
                            </AppLink>
                        </Button>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="space-y-6">
                        <Card className="overflow-hidden p-0">
                            <div className="border-b border-border bg-background-secondary p-5">
                                <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                    Servidor demonstrativo
                                </p>
                                <h2 className="mt-2 text-xl font-semibold text-foreground">
                                    {serverId}
                                </h2>
                            </div>
                            <div className="grid gap-4 p-5 sm:grid-cols-2">
                                <ServerField
                                    label="Endereço IPv4"
                                    value={ip}
                                    onCopy={() => copyValue('ip', ip)}
                                    copied={copied === 'ip'}
                                />
                                <ServerField
                                    label="Hostname"
                                    value="lirias-node-new.hstgr.cloud"
                                    onCopy={() =>
                                        copyValue(
                                            'host',
                                            'lirias-node-new.hstgr.cloud',
                                        )
                                    }
                                    copied={copied === 'host'}
                                />
                                <ServerField
                                    label="Sistema operacional"
                                    value={
                                        searchParams.get('distro') ??
                                        'Ubuntu 24.04 LTS'
                                    }
                                />
                                <ServerField
                                    label="Região"
                                    value={`${region.code} · ${region.city}`}
                                />
                            </div>
                            <div className="border-t border-border p-5">
                                <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                    Comando de acesso
                                </p>
                                <div className="mt-3 flex flex-col gap-3 rounded-xl border border-border bg-[#08070b] p-4 text-white sm:flex-row sm:items-center">
                                    <Terminal className="h-4 w-4 shrink-0 text-primary-light" />
                                    <code className="min-w-0 flex-1 overflow-x-auto font-mono text-xs">
                                        {command}
                                    </code>
                                    <Button
                                        size="xs"
                                        variant="secondary"
                                        onClick={() =>
                                            copyValue('command', command)
                                        }
                                        leftIcon={
                                            copied === 'command' ? (
                                                <Check className="h-3.5 w-3.5" />
                                            ) : (
                                                <Clipboard className="h-3.5 w-3.5" />
                                            )
                                        }
                                    >
                                        {copied === 'command'
                                            ? 'Copiado'
                                            : 'Copiar'}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                <div>
                                    <p className="font-mono text-xs text-primary-light">
                                        CHECKLIST
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                        Antes de colocar em produção
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        Os itens podem virar tarefas
                                        persistentes quando o backend estiver
                                        conectado.
                                    </p>
                                </div>
                                <Badge
                                    variant={
                                        completion === 100
                                            ? 'success'
                                            : 'primary'
                                    }
                                >
                                    {completion}% concluído
                                </Badge>
                            </div>
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-background-tertiary">
                                <div
                                    className="h-full rounded-full bg-primary transition-[width]"
                                    style={{ width: `${completion}%` }}
                                />
                            </div>
                            <div className="mt-5 divide-y divide-border rounded-xl border border-border">
                                {SECURITY_STEPS.map(
                                    ({
                                        id,
                                        title,
                                        description,
                                        icon: Icon,
                                    }) => {
                                        const done = completed.includes(id);
                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                aria-pressed={done}
                                                onClick={() => toggleStep(id)}
                                                className="flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-card-hover"
                                            >
                                                <span
                                                    className={cn(
                                                        'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border',
                                                        done
                                                            ? 'border-success/30 bg-success/10 text-success-light'
                                                            : 'border-border bg-background text-primary-light',
                                                    )}
                                                >
                                                    {done ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <Icon className="h-4 w-4" />
                                                    )}
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span
                                                        className={cn(
                                                            'block text-sm font-semibold',
                                                            done
                                                                ? 'text-muted-foreground line-through'
                                                                : 'text-foreground',
                                                        )}
                                                    >
                                                        {title}
                                                    </span>
                                                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                                        {description}
                                                    </span>
                                                </span>
                                            </button>
                                        );
                                    },
                                )}
                            </div>
                        </Card>
                    </div>

                    <aside className="space-y-4">
                        <Card className="p-5">
                            <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                Acesso administrativo
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-primary-light">
                                    <KeyRound className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {isWindows ? 'Administrador' : 'root'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {isWindows
                                            ? 'RDP protegido'
                                            : 'SSH recomendado por chave'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 rounded-xl border border-warning/25 bg-warning/5 p-4">
                                <p className="text-xs leading-5 text-muted-foreground">
                                    A senha temporária não é exibida neste
                                    protótipo. No produto real, ela deverá
                                    aparecer uma única vez ou ser substituída
                                    por chave.
                                </p>
                            </div>
                        </Card>

                        <Card className="p-5">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-primary-light" />
                                <div>
                                    <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                        Localização
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {region.city}, Brasil
                                    </p>
                                </div>
                            </div>
                            <dl className="mt-5 space-y-3 text-xs">
                                <InfoRow
                                    label="Plano"
                                    value={
                                        searchParams.get('name') ?? 'VPS Pro'
                                    }
                                />
                                <InfoRow
                                    label="vCPU"
                                    value={searchParams.get('vcpu') ?? '4'}
                                />
                                <InfoRow
                                    label="Memória"
                                    value={`${searchParams.get('ram') ?? '8'} GB`}
                                />
                                <InfoRow
                                    label="NVMe"
                                    value={`${searchParams.get('disk') ?? '100'} GB`}
                                />
                            </dl>
                        </Card>

                        <Card className="border-primary/20 bg-primary/5 p-5">
                            <ShieldCheck className="h-5 w-5 text-primary-light" />
                            <h3 className="mt-4 font-semibold text-foreground">
                                Próximo passo recomendado
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                {isWindows
                                    ? 'Restrinja a porta RDP à origem confiável e altere a senha temporária.'
                                    : 'Cadastre uma chave SSH, valide o acesso e só depois desative autenticação por senha.'}
                            </p>
                            <Button
                                asChild
                                size="sm"
                                className="mt-5 w-full"
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                <AppLink href="/docs">
                                    Abrir guia correspondente
                                </AppLink>
                            </Button>
                        </Card>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function ServerField({
    label,
    value,
    onCopy,
    copied = false,
}: {
    label: string;
    value: string;
    onCopy?: () => void;
    copied?: boolean;
}) {
    return (
        <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
            <div className="mt-2 flex items-center gap-3">
                <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                    {value}
                </p>
                {onCopy ? (
                    <button
                        type="button"
                        onClick={onCopy}
                        aria-label={`Copiar ${label}`}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-success-light" />
                        ) : (
                            <Clipboard className="h-4 w-4" />
                        )}
                    </button>
                ) : null}
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-medium text-foreground">{value}</dd>
        </div>
    );
}
