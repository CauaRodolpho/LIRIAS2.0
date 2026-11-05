import type { ServerStatus } from './index';

export type AsyncActionStatus =
    | 'pending'
    | 'running'
    | 'succeeded'
    | 'failed'
    | 'cancelled';
export type AsyncActionOrigin = 'panel' | 'api' | 'schedule' | 'system';

export interface ServerActionDTO {
    id: string;
    serverId: string;
    type: string;
    status: AsyncActionStatus;
    origin: AsyncActionOrigin;
    actor?: string;
    progress?: number;
    message?: string;
    errorCode?: string;
    startedAt: string;
    finishedAt?: string;
}

export interface ServerSummaryDTO {
    id: string;
    name: string;
    hostname: string;
    ipv4: string;
    status: ServerStatus;
    os: string;
    plan: string;
    region: string;
    expiresAt: string;
}

export type BackupType = 'automatic' | 'snapshot';
export type BackupStatus =
    | 'creating'
    | 'available'
    | 'restoring'
    | 'failed'
    | 'expired';

export interface BackupDTO {
    id: string;
    serverId: string;
    type: BackupType;
    status: BackupStatus;
    sizeBytes: number;
    location: string;
    os: string;
    estimatedRestoreSeconds?: number;
    createdAt: string;
    expiresAt?: string;
}

export type FirewallProtocol = 'TCP' | 'UDP' | 'ICMP' | 'GRE';
export type FirewallAction = 'allow' | 'deny';

export interface FirewallRuleDTO {
    id: string;
    firewallId: string;
    name: string;
    protocol: FirewallProtocol;
    portFrom?: number;
    portTo?: number;
    source: string;
    action: FirewallAction;
    priority: number;
    enabled: boolean;
}

export interface FirewallDTO {
    id: string;
    name: string;
    serverId: string;
    active: boolean;
    syncStatus: 'synced' | 'pending' | 'failed';
    rules: FirewallRuleDTO[];
    updatedAt: string;
}

export type MalwareScannerStatus =
    | 'unsupported'
    | 'not_installed'
    | 'installing'
    | 'inactive'
    | 'ready'
    | 'scanning'
    | 'failed';

export interface MalwareScanDTO {
    id: string;
    serverId: string;
    status: 'running' | 'clean' | 'threats_found' | 'failed';
    scannedFiles: number;
    compromisedFiles: number;
    maliciousFiles: number;
    quarantinedFiles: number;
    repairedFiles: number;
    progress?: number;
    startedAt: string;
    finishedAt?: string;
}

export interface MalwareProtectionDTO {
    serverId: string;
    scannerStatus: MalwareScannerStatus;
    engine: string;
    automaticRemoval: boolean;
    lastScan?: MalwareScanDTO;
    compatibleOperatingSystems: string[];
}

export type OperatingSystemCategory = 'pure' | 'panel' | 'application';

export interface OperatingSystemImageDTO {
    id: string;
    name: string;
    version: string;
    category: OperatingSystemCategory;
    architecture: string;
    recommended: boolean;
    licenseRequired: boolean;
    compatibleFeatures: string[];
}

export interface DomainDTO {
    id: string;
    name: string;
    status: 'active' | 'propagating' | 'expired' | 'error';
    nameservers: string[];
    sslStatus: 'active' | 'pending' | 'expired' | 'disabled';
    serverId?: string;
    expiresAt: string;
}

export type DnsRecordType =
    | 'A'
    | 'AAAA'
    | 'CNAME'
    | 'TXT'
    | 'MX'
    | 'SRV'
    | 'CAA'
    | 'NS';

export interface DnsRecordDTO {
    id: string;
    domainId: string;
    type: DnsRecordType;
    name: string;
    value: string;
    ttl: number;
    priority?: number;
}

export interface ApiTokenDTO {
    id: string;
    name: string;
    scopes: string[];
    createdAt: string;
    expiresAt?: string;
    lastUsedAt?: string;
    revokedAt?: string;
}

export interface ApiTokenCreatedDTO extends ApiTokenDTO {
    token: string;
}
