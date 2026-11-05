export type DocCategoryId =
    | 'getting-started'
    | 'linux'
    | 'windows'
    | 'access'
    | 'network'
    | 'security'
    | 'backups'
    | 'applications'
    | 'monitoring'
    | 'api';

export type DocArticle = {
    id: string;
    title: string;
    description: string;
    category: DocCategoryId;
    system: 'Linux' | 'Windows' | 'Todos';
    difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
    minutes: number;
    popular?: boolean;
    command?: string;
};

export const DOC_CATEGORIES = [
    {
        id: 'getting-started' as const,
        title: 'Primeiros passos',
        description: 'Do acesso inicial à primeira aplicação.',
        count: 12,
    },
    {
        id: 'linux' as const,
        title: 'VPS Linux',
        description: 'Ubuntu, Debian, AlmaLinux e Rocky Linux.',
        count: 26,
    },
    {
        id: 'windows' as const,
        title: 'VPS Windows',
        description: 'RDP, IIS, SQL Server e PowerShell.',
        count: 18,
    },
    {
        id: 'access' as const,
        title: 'SSH e RDP',
        description: 'Acesso remoto, usuários e credenciais.',
        count: 15,
    },
    {
        id: 'network' as const,
        title: 'Rede e DNS',
        description: 'Domínios, IPs, portas e conectividade.',
        count: 21,
    },
    {
        id: 'security' as const,
        title: 'Segurança',
        description: 'Firewall, chaves, certificados e resposta.',
        count: 19,
    },
    {
        id: 'backups' as const,
        title: 'Backups',
        description: 'Cópias, snapshots e recuperação.',
        count: 14,
    },
    {
        id: 'applications' as const,
        title: 'Docker e aplicações',
        description: 'Stacks, contêineres e publicação.',
        count: 24,
    },
    {
        id: 'monitoring' as const,
        title: 'Monitoramento',
        description: 'Métricas, alertas e diagnóstico.',
        count: 11,
    },
    {
        id: 'api' as const,
        title: 'API e automação',
        description: 'Tokens, endpoints e webhooks.',
        count: 17,
    },
];

export const DOC_ARTICLES: DocArticle[] = [
    {
        id: 'connect-ssh',
        title: 'Conectar à VPS Linux por SSH',
        description:
            'Acesse o servidor com uma chave segura e valide a identidade do host.',
        category: 'access',
        system: 'Linux',
        difficulty: 'Iniciante',
        minutes: 6,
        popular: true,
        command: 'ssh root@203.0.113.42',
    },
    {
        id: 'connect-rdp',
        title: 'Conectar à VPS Windows por RDP',
        description:
            'Baixe o arquivo RDP, valide o certificado e inicie uma sessão protegida.',
        category: 'access',
        system: 'Windows',
        difficulty: 'Iniciante',
        minutes: 7,
        popular: true,
    },
    {
        id: 'firewall-first-rules',
        title: 'Criar as primeiras regras de firewall',
        description:
            'Libere somente SSH, RDP, HTTP e HTTPS conforme a necessidade da aplicação.',
        category: 'security',
        system: 'Todos',
        difficulty: 'Iniciante',
        minutes: 10,
        popular: true,
    },
    {
        id: 'restore-backup',
        title: 'Restaurar uma VPS usando backup',
        description:
            'Revise o ponto de recuperação e entenda o impacto antes de restaurar.',
        category: 'backups',
        system: 'Todos',
        difficulty: 'Intermediário',
        minutes: 12,
        popular: true,
    },
    {
        id: 'point-domain',
        title: 'Apontar um domínio para a VPS',
        description:
            'Configure registros A e AAAA e acompanhe a propagação do DNS.',
        category: 'network',
        system: 'Todos',
        difficulty: 'Iniciante',
        minutes: 9,
        popular: true,
    },
    {
        id: 'install-docker',
        title: 'Instalar Docker no Ubuntu',
        description:
            'Prepare o repositório oficial, instale o engine e valide o serviço.',
        category: 'applications',
        system: 'Linux',
        difficulty: 'Intermediário',
        minutes: 14,
        command: 'docker run --rm hello-world',
    },
    {
        id: 'publish-dotnet-iis',
        title: 'Publicar uma aplicação ASP.NET no IIS',
        description:
            'Instale o Hosting Bundle, configure o pool e publique o projeto.',
        category: 'windows',
        system: 'Windows',
        difficulty: 'Intermediário',
        minutes: 18,
    },
    {
        id: 'cpu-high',
        title: 'Investigar uso elevado de CPU',
        description:
            'Identifique processos, horários e mudanças relacionadas ao aumento.',
        category: 'monitoring',
        system: 'Todos',
        difficulty: 'Intermediário',
        minutes: 11,
    },
];

export const QUICKSTARTS = [
    {
        id: 'linux',
        title: 'Primeira VPS Linux',
        system: 'Linux',
        progress: 3,
        steps: [
            'Criar a VPS',
            'Configurar chave SSH',
            'Atualizar o sistema',
            'Criar regras de firewall',
            'Apontar domínio',
            'Instalar SSL',
            'Ativar backup',
        ],
    },
    {
        id: 'windows',
        title: 'Primeira VPS Windows',
        system: 'Windows',
        progress: 2,
        steps: [
            'Criar o servidor',
            'Configurar acesso RDP',
            'Restringir origem',
            'Configurar IIS',
            'Publicar aplicação',
            'Programar atualizações',
            'Ativar backup',
        ],
    },
];

export const DEMO_SERVERS_FOR_SUPPORT = [
    {
        id: 'srv-lirias-01',
        name: 'lirias-node-01',
        system: 'Ubuntu 24.04',
        region: 'SP1 · São Paulo',
        status: 'Operacional',
    },
    {
        id: 'srv-lirias-02',
        name: 'windows-prod-01',
        system: 'Windows Server 2025',
        region: 'CWB1 · Curitiba',
        status: 'Operacional',
    },
    {
        id: 'srv-lirias-03',
        name: 'automation-01',
        system: 'Debian 13',
        region: 'FOR1 · Fortaleza',
        status: 'Operacional',
    },
];

export const SUPPORT_TICKETS = [
    {
        id: 'LIR-2048',
        subject: 'Falha intermitente ao conectar por SSH',
        server: 'lirias-node-01',
        severity: 'Médio',
        status: 'Em análise',
        updated: 'Hoje, 14:32',
    },
    {
        id: 'LIR-2019',
        subject: 'Dúvida sobre retenção de backups',
        server: 'automation-01',
        severity: 'Baixo',
        status: 'Aguardando cliente',
        updated: 'Ontem, 17:08',
    },
    {
        id: 'LIR-1987',
        subject: 'Configuração de domínio concluída',
        server: 'lirias-node-01',
        severity: 'Baixo',
        status: 'Resolvido',
        updated: '24 out, 11:20',
    },
];
