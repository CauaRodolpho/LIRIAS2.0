export type DemoServerStatus =
    | 'running'
    | 'stopped'
    | 'rebooting'
    | 'provisioning'
    | 'error';

export interface DemoServer {
    id: string;
    name: string;
    hostname: string;
    status: DemoServerStatus;
    os: string;
    ipv4: string;
    ipv6: string;
    location: string;
    plan: string;
    cpu: number;
    ram: number;
    disk: number;
    bandwidth: number;
    uptime: string;
    validUntil: string;
}

export const DEMO_SERVERS: DemoServer[] = [
    {
        id: 'srv-lirias-01',
        name: 'lirias-prod-01',
        hostname: 'vps-01.demo.lirias.cloud',
        status: 'running',
        os: 'Debian 13',
        ipv4: '203.0.113.24',
        ipv6: '2001:db8:1200::24',
        location: 'São Paulo, BR',
        plan: 'LIRIAS Pro',
        cpu: 4,
        ram: 8,
        disk: 100,
        bandwidth: 8,
        uptime: '18 dias e 4 horas',
        validUntil: '23 set. 2027',
    },
    {
        id: 'srv-lirias-02',
        name: 'lirias-staging-01',
        hostname: 'staging.demo.lirias.cloud',
        status: 'rebooting',
        os: 'Ubuntu 24.04 LTS',
        ipv4: '203.0.113.52',
        ipv6: '2001:db8:1200::52',
        location: 'Campinas, BR',
        plan: 'LIRIAS Start',
        cpu: 2,
        ram: 4,
        disk: 60,
        bandwidth: 4,
        uptime: '6 dias e 11 horas',
        validUntil: '11 jan. 2027',
    },
    {
        id: 'srv-lirias-03',
        name: 'lirias-lab-01',
        hostname: 'lab.demo.lirias.cloud',
        status: 'stopped',
        os: 'AlmaLinux 10',
        ipv4: '203.0.113.73',
        ipv6: '2001:db8:1200::73',
        location: 'Miami, US',
        plan: 'LIRIAS Start',
        cpu: 2,
        ram: 4,
        disk: 60,
        bandwidth: 4,
        uptime: 'Desligado',
        validUntil: '02 mar. 2027',
    },
];

export const DEMO_SERVER: DemoServer = DEMO_SERVERS[0]!;

export const METRIC_SERIES = {
    cpu: [
        18, 22, 20, 28, 24, 30, 36, 31, 29, 42, 38, 35, 44, 39, 48, 46, 41, 52,
        48, 55, 51, 46, 43, 47,
    ],
    ram: [
        52, 54, 53, 55, 56, 55, 57, 58, 57, 59, 58, 60, 61, 60, 62, 61, 63, 62,
        64, 63, 65, 64, 66, 65,
    ],
    disk: [
        31, 31, 31, 32, 32, 32, 32, 33, 33, 33, 33, 33, 34, 34, 34, 34, 35, 35,
        35, 35, 36, 36, 36, 36,
    ],
    network: [
        8, 14, 10, 32, 18, 21, 12, 45, 16, 24, 20, 55, 26, 19, 38, 23, 18, 49,
        22, 31, 20, 42, 27, 33,
    ],
};

export const DOCKER_PROJECTS = [
    {
        name: 'api-principal',
        containers: 4,
        status: 'Em execução',
        tone: 'success' as const,
        updated: 'há 8 min',
    },
    {
        name: 'observabilidade',
        containers: 3,
        status: 'Em execução',
        tone: 'success' as const,
        updated: 'há 22 min',
    },
    {
        name: 'staging-web',
        containers: 2,
        status: 'Parcial',
        tone: 'warning' as const,
        updated: 'há 1 h',
    },
];

export const APP_CATALOG = [
    {
        name: 'Coolify',
        category: 'Deploy',
        description:
            'Plataforma self-hosted para publicar aplicações e bancos.',
    },
    {
        name: 'n8n',
        category: 'Automação',
        description: 'Automação visual de fluxos, integrações e rotinas.',
    },
    {
        name: 'PostgreSQL',
        category: 'Banco de dados',
        description: 'Banco relacional robusto para aplicações profissionais.',
    },
    {
        name: 'Uptime Kuma',
        category: 'Monitoramento',
        description: 'Monitoramento simples de sites, APIs e serviços.',
    },
    {
        name: 'MinIO',
        category: 'Armazenamento',
        description: 'Object storage compatível com a API S3.',
    },
    {
        name: 'WordPress',
        category: 'CMS',
        description: 'CMS pronto para blogs, páginas e portais.',
    },
];

export const OPERATING_SYSTEMS = [
    {
        name: 'Debian',
        version: '13',
        family: 'Linux',
        category: 'pure',
        recommended: true,
    },
    {
        name: 'Ubuntu',
        version: '24.04 LTS',
        family: 'Linux',
        category: 'pure',
        recommended: true,
    },
    {
        name: 'AlmaLinux',
        version: '10',
        family: 'Linux',
        category: 'pure',
        recommended: false,
    },
    {
        name: 'Rocky Linux',
        version: '9.6',
        family: 'Linux',
        category: 'pure',
        recommended: false,
    },
    {
        name: 'Fedora Cloud',
        version: '42',
        family: 'Linux',
        category: 'pure',
        recommended: false,
    },
    {
        name: 'Alpine Linux',
        version: '3.22',
        family: 'Linux',
        category: 'pure',
        recommended: false,
    },
    {
        name: 'Ubuntu + cPanel',
        version: '24.04',
        family: 'Linux',
        category: 'panel',
        recommended: true,
    },
    {
        name: 'AlmaLinux + Plesk',
        version: '9',
        family: 'Linux',
        category: 'panel',
        recommended: false,
    },
    {
        name: 'Ubuntu + Docker',
        version: '24.04',
        family: 'Linux',
        category: 'application',
        recommended: true,
    },
    {
        name: 'Ubuntu + n8n',
        version: '24.04',
        family: 'Linux',
        category: 'application',
        recommended: false,
    },
];

export const BACKUPS = [
    {
        id: 'bkp-1042',
        createdAt: '22 set. 2026, 03:15',
        size: '18,4 GB',
        type: 'Automático',
        status: 'Disponível',
        location: 'Brasil',
        os: 'Debian 13',
        restoreTime: '34 min',
    },
    {
        id: 'bkp-1035',
        createdAt: '15 set. 2026, 03:16',
        size: '18,1 GB',
        type: 'Automático',
        status: 'Disponível',
        location: 'Brasil',
        os: 'Debian 13',
        restoreTime: '32 min',
    },
    {
        id: 'snap-298',
        createdAt: '10 set. 2026, 18:42',
        size: '17,9 GB',
        type: 'Snapshot',
        status: 'Disponível',
        location: 'Brasil',
        os: 'Debian 13',
        restoreTime: '29 min',
    },
];

export const RECENT_ACTIONS = [
    {
        id: 'act-105',
        action: 'backup_create',
        status: 'Sucesso',
        origin: 'Agendamento',
        actor: 'Sistema',
        duration: '8 min',
        at: '22 set. 2026, 03:15:12',
    },
    {
        id: 'act-104',
        action: 'docker_compose_up',
        status: 'Sucesso',
        origin: 'Painel LIRIAS',
        actor: 'Rodolfo Alves',
        duration: '42 s',
        at: '21 set. 2026, 17:48:03',
    },
    {
        id: 'act-103',
        action: 'firewall_rule_update',
        status: 'Sucesso',
        origin: 'Painel LIRIAS',
        actor: 'Rodolfo Alves',
        duration: '3 s',
        at: '20 set. 2026, 10:22:41',
    },
    {
        id: 'act-102',
        action: 'server_restart',
        status: 'Executando',
        origin: 'Painel LIRIAS',
        actor: 'Equipe técnica',
        duration: '—',
        at: '18 set. 2026, 06:09:18',
    },
    {
        id: 'act-101',
        action: 'ssh_key_create',
        status: 'Falhou',
        origin: 'API',
        actor: 'deploy-ci',
        duration: '1 s',
        at: '16 set. 2026, 14:31:55',
    },
];

export const DOMAINS = [
    {
        id: 'dom-01',
        name: 'lirias.cloud',
        nameservers: ['ns1.lirias.cloud', 'ns2.lirias.cloud'],
        status: 'Ativo',
        expiresAt: '18 set. 2027',
        ssl: 'Ativo',
        serverId: 'srv-lirias-01',
    },
    {
        id: 'dom-02',
        name: 'app-lirias.dev',
        nameservers: ['ns1.lirias.cloud', 'ns2.lirias.cloud'],
        status: 'Propagando',
        expiresAt: '03 jun. 2027',
        ssl: 'Pendente',
        serverId: 'srv-lirias-02',
    },
];

export const DNS_RECORDS = [
    { type: 'A', name: '@', value: '203.0.113.24', ttl: '3600' },
    { type: 'A', name: 'app', value: '203.0.113.24', ttl: '3600' },
    { type: 'CNAME', name: 'www', value: 'lirias.example', ttl: '3600' },
    {
        type: 'TXT',
        name: '@',
        value: 'v=spf1 include:_spf.example ~all',
        ttl: '3600',
    },
];

export const API_TOKENS = [
    {
        id: 'tok-01',
        name: 'Deploy CI/CD',
        scopes: ['servers:read', 'deployments:write'],
        createdAt: '04 set. 2026',
        lastUsedAt: 'há 12 min',
        expiresAt: '04 mar. 2027',
    },
    {
        id: 'tok-02',
        name: 'Observabilidade',
        scopes: ['servers:read', 'metrics:read'],
        createdAt: '18 ago. 2026',
        lastUsedAt: 'há 2 h',
        expiresAt: 'Sem expiração',
    },
];

export const INVOICES = [
    {
        id: 'LRS-2026-009',
        description: 'LIRIAS Pro — setembro',
        amount: 'R$ 59,90',
        date: '10 set. 2026',
        status: 'Pago',
    },
    {
        id: 'LRS-2026-008',
        description: 'LIRIAS Pro — agosto',
        amount: 'R$ 59,90',
        date: '10 ago. 2026',
        status: 'Pago',
    },
    {
        id: 'LRS-2026-007',
        description: 'LIRIAS Pro — julho',
        amount: 'R$ 59,90',
        date: '10 jul. 2026',
        status: 'Pago',
    },
];
