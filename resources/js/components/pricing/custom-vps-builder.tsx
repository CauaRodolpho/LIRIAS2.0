'use client';

import { useMemo, useState } from 'react';
import Link from '@/components/navigation/app-link';
import { Cpu, MemoryStick, HardDrive, Gauge, ArrowRight } from 'lucide-react';
import { Slider, Button, Badge } from '@/components/ui';
import { OS_OPTIONS } from '@/constants';
import { formatCurrency } from '@/lib/utils';
import {
    calculateCustomVpsPrice,
    CUSTOM_VPS_LIMITS,
    CUSTOM_VPS_UNIT_PRICES,
} from '@/lib/custom-vps-pricing';
import type { OSType } from '@/types';
import { cn } from '@/lib/utils';

const OS_TABS: { value: OSType; label: string }[] = [
    { value: 'linux', label: 'Linux' },
    { value: 'windows', label: 'Windows' },
];

export function CustomVpsBuilder() {
    const [vcpu, setVcpu] = useState<number>(CUSTOM_VPS_LIMITS.vcpu.default);
    const [ram, setRam] = useState<number>(CUSTOM_VPS_LIMITS.ram.default);
    const [disk, setDisk] = useState<number>(CUSTOM_VPS_LIMITS.disk.default);
    const [bandwidth, setBandwidth] = useState<number>(
        CUSTOM_VPS_LIMITS.bandwidth.default,
    );
    const [os, setOs] = useState<OSType>('linux');
    const [distro, setDistro] = useState<string>(OS_OPTIONS.linux[0]);

    const price = useMemo(
        () => calculateCustomVpsPrice({ vcpu, ram, disk, bandwidth, os }),
        [vcpu, ram, disk, bandwidth, os],
    );

    function handleOsChange(next: OSType) {
        setOs(next);
        setDistro(OS_OPTIONS[next][0]);
    }

    const checkoutHref = `/checkout?custom=1&vcpu=${vcpu}&ram=${ram}&disk=${disk}&bandwidth=${bandwidth}&os=${os}&distro=${encodeURIComponent(distro)}`;

    return (
        <section
            className="py-20 sm:py-28"
            aria-labelledby="custom-vps-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Sob medida
                    </p>
                    <h2
                        id="custom-vps-heading"
                        className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Nenhum plano encaixou? Monte o seu
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Escolha exatamente vCPU, RAM, NVMe SSD, tráfego e
                        sistema operacional. O preço se atualiza em tempo real.
                    </p>
                </div>

                <div className="trace-card mt-12 grid grid-cols-1 gap-0 border border-border bg-card lg:grid-cols-[1fr_360px]">
                    {/* Controles */}
                    <div className="flex flex-col gap-8 p-6 sm:p-8">
                        <Slider
                            id="vcpu-slider"
                            label="vCPU"
                            valueLabel={`${vcpu} ${vcpu === 1 ? 'core' : 'cores'}`}
                            min={CUSTOM_VPS_LIMITS.vcpu.min}
                            max={CUSTOM_VPS_LIMITS.vcpu.max}
                            step={CUSTOM_VPS_LIMITS.vcpu.step}
                            value={vcpu}
                            onChange={(e) => setVcpu(Number(e.target.value))}
                        />
                        <Slider
                            id="ram-slider"
                            label="Memória RAM"
                            valueLabel={`${ram} GB`}
                            min={CUSTOM_VPS_LIMITS.ram.min}
                            max={CUSTOM_VPS_LIMITS.ram.max}
                            step={CUSTOM_VPS_LIMITS.ram.step}
                            value={ram}
                            onChange={(e) => setRam(Number(e.target.value))}
                        />
                        <Slider
                            id="disk-slider"
                            label="Armazenamento NVMe SSD"
                            valueLabel={`${disk} GB`}
                            min={CUSTOM_VPS_LIMITS.disk.min}
                            max={CUSTOM_VPS_LIMITS.disk.max}
                            step={CUSTOM_VPS_LIMITS.disk.step}
                            value={disk}
                            onChange={(e) => setDisk(Number(e.target.value))}
                        />
                        <Slider
                            id="bandwidth-slider"
                            label="Transferência mensal"
                            valueLabel={`${bandwidth} TB`}
                            min={CUSTOM_VPS_LIMITS.bandwidth.min}
                            max={CUSTOM_VPS_LIMITS.bandwidth.max}
                            step={CUSTOM_VPS_LIMITS.bandwidth.step}
                            value={bandwidth}
                            onChange={(e) =>
                                setBandwidth(Number(e.target.value))
                            }
                        />

                        {/* Sistema operacional */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-foreground">
                                Sistema operacional
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background-tertiary p-1">
                                    {OS_TABS.map((tab) => (
                                        <button
                                            key={tab.value}
                                            type="button"
                                            onClick={() =>
                                                handleOsChange(tab.value)
                                            }
                                            className={cn(
                                                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                                                os === tab.value
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:text-foreground',
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <select
                                    value={distro}
                                    onChange={(e) => setDistro(e.target.value)}
                                    aria-label="Distribuição"
                                    className="rounded-lg border border-input bg-background-tertiary px-3 py-1.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                >
                                    {OS_OPTIONS[os].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {os === 'windows' && (
                                <span className="font-mono text-xs text-muted-foreground">
                                    +{' '}
                                    {formatCurrency(
                                        CUSTOM_VPS_UNIT_PRICES.windowsLicenseFee,
                                    )}
                                    /mês de licença Windows Server
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Resumo de preço */}
                    <div className="flex flex-col justify-between gap-6 border-t border-border bg-background-tertiary/40 p-6 sm:p-8 lg:border-t-0 lg:border-l">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Sua configuração
                            </span>

                            <dl className="mt-4 flex flex-col gap-3 font-mono text-sm">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <dt className="flex items-center gap-2">
                                        <Cpu
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                        vCPU
                                    </dt>
                                    <dd className="text-foreground">
                                        {formatCurrency(price.vcpuCost)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <dt className="flex items-center gap-2">
                                        <MemoryStick
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                        RAM
                                    </dt>
                                    <dd className="text-foreground">
                                        {formatCurrency(price.ramCost)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <dt className="flex items-center gap-2">
                                        <HardDrive
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                        NVMe SSD
                                    </dt>
                                    <dd className="text-foreground">
                                        {formatCurrency(price.diskCost)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <dt className="flex items-center gap-2">
                                        <Gauge
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                        Transferência extra
                                    </dt>
                                    <dd className="text-foreground">
                                        {formatCurrency(price.bandwidthCost)}
                                    </dd>
                                </div>
                                {price.windowsLicenseCost > 0 && (
                                    <div className="flex items-center justify-between text-muted-foreground">
                                        <dt>Licença Windows</dt>
                                        <dd className="text-foreground">
                                            {formatCurrency(
                                                price.windowsLicenseCost,
                                            )}
                                        </dd>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <dt>Taxa base (IP, backup, suporte)</dt>
                                    <dd className="text-foreground">
                                        {formatCurrency(price.baseFee)}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-5 flex items-baseline gap-1 border-t border-border pt-5">
                                <span className="font-mono text-3xl font-bold text-foreground">
                                    {formatCurrency(price.total)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    /mês
                                </span>
                            </div>
                            <Badge variant="default" className="mt-2">
                                {bandwidth} TB inclui{' '}
                                {CUSTOM_VPS_UNIT_PRICES.bandwidthIncludedTb} TB
                                grátis
                            </Badge>
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            rightIcon={<ArrowRight className="h-4 w-4" />}
                            asChild
                            className="w-full"
                        >
                            <Link href={checkoutHref}>
                                Criar VPS Personalizada
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
