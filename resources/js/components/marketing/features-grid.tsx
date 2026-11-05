import {
    Check,
    Cpu,
    Gauge,
    HardDrive,
    KeyRound,
    MemoryStick,
    Network,
    Server,
    ShieldCheck,
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

const RESOURCE_LABELS = [
    { icon: Cpu, label: 'vCPU' },
    { icon: MemoryStick, label: 'RAM' },
    { icon: HardDrive, label: 'NVMe' },
] as const;

export function FeaturesGrid() {
    return (
        <section
            className="home-section home-features relative overflow-hidden py-24 sm:py-32"
            aria-labelledby="features-heading"
        >
            <div
                className="home-grid-whisper pointer-events-none absolute inset-0"
                aria-hidden="true"
            />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="grid items-end gap-7 lg:grid-cols-[1.08fr_.92fr]">
                        <div className="max-w-3xl text-left">
                            <span className="font-mono text-xs tracking-[0.22em] text-primary-light uppercase">
                                Base técnica LIRIAS
                            </span>
                            <h2
                                id="features-heading"
                                className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-4xl lg:text-5xl"
                            >
                                Tudo para operar sua VPS em um só lugar.
                            </h2>
                        </div>
                        <div className="border-l border-primary/35 pl-5 lg:mb-1 lg:justify-self-end">
                            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                                Configure os recursos, acesse o servidor e
                                acompanhe o ambiente por uma experiência
                                centralizada.
                            </p>
                            <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                                Configuração · Acesso · Monitoramento
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="mt-10 grid gap-4 lg:grid-cols-2">
                    <ScrollReveal className="lg:col-span-2" y={28}>
                        <article className="home-feature-stage relative min-h-[570px] overflow-hidden border-y border-border/70 bg-transparent p-6 sm:min-h-[620px] sm:p-9 lg:min-h-[410px] lg:p-12">
                            <div className="relative z-10 max-w-xl">
                                <span className="inline-flex h-11 w-11 items-center justify-center border border-primary/25 bg-primary/10 text-primary-light">
                                    <Gauge
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </span>
                                <h3 className="mt-7 max-w-lg text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                    Recursos definidos para cada aplicação
                                </h3>
                                <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                                    Escolha CPU, memória e armazenamento
                                    conforme a necessidade do projeto. A
                                    virtualização KVM mantém cada instância
                                    isolada.
                                </p>
                                <ul className="mt-7 grid gap-3 text-sm text-foreground sm:grid-cols-2">
                                    {[
                                        'Virtualização KVM',
                                        'Armazenamento NVMe',
                                        'Configuração por plano',
                                        'Acesso pelo painel',
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2.5"
                                        >
                                            <Check
                                                className="h-4 w-4 text-primary-light"
                                                aria-hidden="true"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div
                                className="bento-performance-visual pointer-events-none absolute -right-20 -bottom-20 h-[330px] w-[330px] sm:right-4 sm:-bottom-16 sm:h-[390px] sm:w-[390px] lg:right-16 lg:bottom-[-78px] lg:h-[440px] lg:w-[440px]"
                                aria-hidden="true"
                            >
                                <div className="bento-orbit bento-orbit-outer absolute inset-0 rounded-full" />
                                <div className="bento-orbit bento-orbit-middle absolute inset-[14%] rounded-full" />
                                <div className="bento-gauge absolute inset-[27%] rounded-full">
                                    <span className="bento-gauge-needle absolute bottom-1/2 left-1/2 h-[38%] w-1 origin-bottom rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.8)]" />
                                    <span className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-card bg-primary" />
                                </div>
                                <div className="absolute top-[16%] left-[5%] border border-primary/25 bg-card/95 px-4 py-3 backdrop-blur-md">
                                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                                        Ambiente
                                    </p>
                                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <span className="h-1.5 w-1.5 rounded-full bg-success" />{' '}
                                        pronto para configurar
                                    </p>
                                </div>
                                <div className="absolute bottom-[24%] left-[2%] flex gap-2">
                                    {RESOURCE_LABELS.map(
                                        ({ icon: Icon, label }) => (
                                            <span
                                                key={label}
                                                className="flex items-center gap-1.5 border border-border bg-card/90 px-2.5 py-2 font-mono text-[10px] text-muted-foreground backdrop-blur-md"
                                            >
                                                <Icon className="h-3 w-3 text-primary-light" />{' '}
                                                {label}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        </article>
                    </ScrollReveal>

                    <ScrollReveal y={24} delay={0.08}>
                        <article className="home-feature-row relative h-full min-h-[360px] overflow-hidden border-t border-border/70 bg-transparent p-6 sm:p-8">
                            <div className="relative z-10 max-w-md">
                                <span className="inline-flex h-10 w-10 items-center justify-center border border-primary/25 bg-primary/10 text-primary-light">
                                    <KeyRound
                                        className="h-[18px] w-[18px]"
                                        aria-hidden="true"
                                    />
                                </span>
                                <h3 className="mt-6 text-xl font-semibold text-foreground sm:text-2xl">
                                    Acesso root e liberdade de configuração
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                    Entre por SSH, escolha o sistema operacional
                                    e prepare o ambiente para a stack do seu
                                    projeto.
                                </p>
                            </div>

                            <div
                                className="bento-terminal absolute right-6 -bottom-10 left-6 overflow-hidden border border-border bg-background/95 sm:right-8 sm:left-8"
                                aria-label="Exemplo ilustrativo de terminal"
                            >
                                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                                    <span className="h-2 w-2 rounded-full bg-danger/70" />
                                    <span className="h-2 w-2 rounded-full bg-warning/70" />
                                    <span className="h-2 w-2 rounded-full bg-success/70" />
                                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                                        ssh · lirias-node-01
                                    </span>
                                </div>
                                <div className="space-y-3 p-5 font-mono text-xs">
                                    <p className="text-muted-foreground">
                                        <span className="text-primary-light">
                                            root@lirias
                                        </span>
                                        :~$ systemctl status app
                                    </p>
                                    <p className="flex items-center gap-2 text-success">
                                        <span className="h-1.5 w-1.5 rounded-full bg-success" />{' '}
                                        active (running)
                                    </p>
                                    <p className="text-muted-foreground">
                                        <span className="text-primary-light">
                                            root@lirias
                                        </span>
                                        :~${' '}
                                        <span className="terminal-caret inline-block h-3 w-1.5 bg-primary align-middle" />
                                    </p>
                                </div>
                            </div>
                        </article>
                    </ScrollReveal>

                    <ScrollReveal y={24} delay={0.14}>
                        <article className="home-feature-row relative h-full min-h-[360px] overflow-hidden border-t border-border/70 bg-transparent p-6 sm:p-8">
                            <div className="relative z-10 max-w-md">
                                <span className="inline-flex h-10 w-10 items-center justify-center border border-primary/25 bg-primary/10 text-primary-light">
                                    <Server
                                        className="h-[18px] w-[18px]"
                                        aria-hidden="true"
                                    />
                                </span>
                                <h3 className="mt-6 text-xl font-semibold text-foreground sm:text-2xl">
                                    Gestão centralizada pelo painel
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                    Consulte o estado do servidor e reúna as
                                    principais ações operacionais em uma única
                                    interface.
                                </p>
                            </div>

                            <div
                                className="bento-panel absolute right-6 -bottom-12 left-6 border border-border bg-background/95 p-4 sm:right-8 sm:left-8"
                                aria-label="Prévia ilustrativa do painel LIRIAS"
                            >
                                <div className="flex items-center justify-between border-b border-border pb-3">
                                    <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                                        LIRIAS / VISÃO GERAL
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-success">
                                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                        Em operação
                                    </span>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    {[
                                        {
                                            icon: Cpu,
                                            label: 'CPU',
                                            value: '32%',
                                        },
                                        {
                                            icon: MemoryStick,
                                            label: 'RAM',
                                            value: '4 GB',
                                        },
                                        {
                                            icon: Network,
                                            label: 'Rede',
                                            value: 'IPv4',
                                        },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div
                                            key={label}
                                            className="border border-border bg-card px-3 py-3"
                                        >
                                            <Icon
                                                className="h-3.5 w-3.5 text-primary-light"
                                                aria-hidden="true"
                                            />
                                            <p className="mt-3 text-[10px] text-muted-foreground">
                                                {label}
                                            </p>
                                            <p className="mt-0.5 font-mono text-xs font-semibold text-foreground">
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 flex items-center justify-between border border-primary/20 bg-primary/[0.05] px-3 py-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-2">
                                        <ShieldCheck className="h-3.5 w-3.5 text-primary-light" />
                                        Configurações de segurança
                                    </span>
                                    <span className="font-mono text-primary-light">
                                        abrir →
                                    </span>
                                </div>
                            </div>
                        </article>
                    </ScrollReveal>
                </div>

                <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-muted-foreground">
                    As configurações e os recursos disponíveis variam conforme o
                    plano contratado.
                </p>
            </div>
        </section>
    );
}
