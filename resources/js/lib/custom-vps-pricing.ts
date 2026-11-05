import type { OSType } from '@/types';

/**
 * Preço por unidade de recurso do configurador "Personalizar VPS".
 * Modelo por à-la-carte, no padrão adotado por provedores como Cloudzy e
 * HOSTKEY: cada recurso (vCPU, RAM, SSD, tráfego extra) tem um preço
 * unitário fixo, somado a uma taxa base (IP dedicado, backup e suporte).
 *
 * Por natureza, uma configuração montada à la carte tende a custar um
 * pouco mais que o plano fechado equivalente — é o preço da flexibilidade
 * de escolher exatamente o que você precisa.
 */
export const CUSTOM_VPS_UNIT_PRICES = {
    vcpuPerCore: 6.9,
    ramPerGb: 4.9,
    diskPerGb: 0.15,
    bandwidthIncludedTb: 2,
    bandwidthPerExtraTb: 3.9,
    baseFee: 9.9,
    windowsLicenseFee: 49.9,
} as const;

export const CUSTOM_VPS_LIMITS = {
    vcpu: { min: 1, max: 32, step: 1, default: 4 },
    ram: { min: 1, max: 128, step: 1, default: 8 },
    disk: { min: 20, max: 2000, step: 10, default: 100 },
    bandwidth: { min: 2, max: 50, step: 1, default: 3 },
} as const;

export interface CustomVpsConfig {
    vcpu: number;
    ram: number;
    disk: number;
    bandwidth: number;
    os: OSType;
}

export interface CustomVpsPriceBreakdown {
    vcpuCost: number;
    ramCost: number;
    diskCost: number;
    bandwidthCost: number;
    windowsLicenseCost: number;
    baseFee: number;
    total: number;
}

export function calculateCustomVpsPrice(
    config: CustomVpsConfig,
): CustomVpsPriceBreakdown {
    const extraBandwidth = Math.max(
        0,
        config.bandwidth - CUSTOM_VPS_UNIT_PRICES.bandwidthIncludedTb,
    );

    const vcpuCost = config.vcpu * CUSTOM_VPS_UNIT_PRICES.vcpuPerCore;
    const ramCost = config.ram * CUSTOM_VPS_UNIT_PRICES.ramPerGb;
    const diskCost = config.disk * CUSTOM_VPS_UNIT_PRICES.diskPerGb;
    const bandwidthCost =
        extraBandwidth * CUSTOM_VPS_UNIT_PRICES.bandwidthPerExtraTb;
    const windowsLicenseCost =
        config.os === 'windows' ? CUSTOM_VPS_UNIT_PRICES.windowsLicenseFee : 0;
    const baseFee = CUSTOM_VPS_UNIT_PRICES.baseFee;

    const total =
        vcpuCost +
        ramCost +
        diskCost +
        bandwidthCost +
        windowsLicenseCost +
        baseFee;

    return {
        vcpuCost,
        ramCost,
        diskCost,
        bandwidthCost,
        windowsLicenseCost,
        baseFee,
        total,
    };
}
