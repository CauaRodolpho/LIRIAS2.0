import { Cpu, HardDrive, KeyRound, Network } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

const TECHNICAL_ITEMS = [
    {
        icon: Cpu,
        code: 'KVM-01',
        label: 'Virtualização KVM',
        detail: 'Recursos isolados',
    },
    {
        icon: HardDrive,
        code: 'NVME-02',
        label: 'Armazenamento NVMe',
        detail: 'Leitura e gravação rápidas',
    },
    {
        icon: KeyRound,
        code: 'ROOT-03',
        label: 'Acesso root',
        detail: 'Controle do ambiente',
    },
    {
        icon: Network,
        code: 'NET-04',
        label: 'IPv4 e IPv6',
        detail: 'Conectividade preparada',
    },
] as const;

export function TechnicalStrip() {
    return (
        <section
            className="technical-bridge relative z-30 -mt-9 px-4 sm:-mt-11 sm:px-6 lg:px-8"
            aria-label="Base técnica da plataforma"
        >
            <ScrollReveal y={14}>
                <div className="technical-rail relative mx-auto max-w-6xl py-5 sm:py-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                            Base operacional
                        </p>
                        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-success-light uppercase">
                            <span
                                className="signal-pulse h-1.5 w-1.5 rounded-full bg-success text-success"
                                aria-hidden="true"
                            />
                            4 camadas ativas
                        </p>
                    </div>

                    <div className="technical-rail-track relative grid gap-0 lg:grid-cols-4">
                        {TECHNICAL_ITEMS.map(
                            ({ icon: Icon, code, label, detail }) => (
                                <div
                                    key={label}
                                    className="technical-rail-item group relative grid grid-cols-[28px_1fr] gap-4 pb-6 pl-1 last:pb-0 lg:block lg:pr-6 lg:pb-0 lg:pl-0"
                                >
                                    <div className="relative flex justify-center lg:mb-5 lg:block">
                                        <span className="technical-rail-node relative z-10 mt-1 block h-2.5 w-2.5 rounded-full border border-primary/70 bg-background transition-colors group-hover:bg-primary lg:mt-0" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="font-mono text-[9px] tracking-[0.14em] text-primary-light uppercase">
                                            {code}
                                        </span>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Icon
                                                className="h-3.5 w-3.5 shrink-0 text-primary-light"
                                                aria-hidden="true"
                                            />
                                            <strong className="truncate text-sm font-semibold text-foreground">
                                                {label}
                                            </strong>
                                        </div>
                                        <span className="mt-1 block text-[11px] text-muted-foreground">
                                            {detail}
                                        </span>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
