export type ApplicationCategory =
    | 'Automação'
    | 'Desenvolvimento'
    | 'CMS'
    | 'Banco de dados'
    | 'Operações';

export interface CatalogApplication {
    slug: string;
    name: string;
    shortName: string;
    category: ApplicationCategory;
    description: string;
    longDescription: string;
    icon:
        | 'Workflow'
        | 'Container'
        | 'PanelTop'
        | 'Braces'
        | 'Code2'
        | 'Database'
        | 'HardDrive'
        | 'CloudCog'
        | 'GitBranch'
        | 'MessagesSquare';
    accent: string;
    featured?: boolean;
    requirements: string[];
    steps: string[];
}

export const APPLICATION_CATEGORIES = [
    'Todos',
    'Automação',
    'Desenvolvimento',
    'CMS',
    'Banco de dados',
    'Operações',
] as const;

export const APPLICATION_CATALOG: CatalogApplication[] = [
    {
        slug: 'n8n',
        name: 'n8n',
        shortName: 'n8n',
        category: 'Automação',
        icon: 'Workflow',
        accent: '#ea4b71',
        featured: true,
        description:
            'Crie fluxos de automação e conecte serviços em um ambiente próprio.',
        longDescription:
            'Uma opção para equipes que desejam executar fluxos do n8n em uma VPS sob sua administração, com liberdade para configurar integrações e variáveis do ambiente.',
        requirements: [
            'Docker e Docker Compose',
            'Domínio ou subdomínio',
            'Configuração de HTTPS',
        ],
        steps: [
            'Escolher a VPS',
            'Definir domínio e credenciais',
            'Revisar a configuração',
            'Iniciar a implantação',
        ],
    },
    {
        slug: 'docker',
        name: 'Docker',
        shortName: 'DK',
        category: 'Operações',
        icon: 'Container',
        accent: '#2496ed',
        featured: true,
        description:
            'Organize aplicações e dependências em contêineres reproduzíveis.',
        longDescription:
            'Prepare a VPS para executar serviços em contêineres, projetos Compose e imagens armazenadas em registros públicos ou privados.',
        requirements: [
            'Distribuição Linux compatível',
            'Acesso administrativo',
            'Portas necessárias liberadas',
        ],
        steps: [
            'Selecionar o servidor',
            'Revisar pacotes',
            'Preparar o serviço',
            'Validar a instalação',
        ],
    },
    {
        slug: 'wordpress',
        name: 'WordPress',
        shortName: 'WP',
        category: 'CMS',
        icon: 'PanelTop',
        accent: '#21759b',
        featured: true,
        description:
            'Estrutura inicial para sites, blogs e páginas administráveis.',
        longDescription:
            'Visualize uma instalação composta por servidor web, banco de dados e WordPress, com campos preparados para domínio e acesso administrativo.',
        requirements: ['Domínio configurado', 'Servidor web', 'Banco de dados'],
        steps: [
            'Selecionar domínio',
            'Criar administrador',
            'Revisar recursos',
            'Iniciar a implantação',
        ],
    },
    {
        slug: 'nodejs',
        name: 'Node.js',
        shortName: 'JS',
        category: 'Desenvolvimento',
        icon: 'Braces',
        accent: '#3c873a',
        featured: true,
        description:
            'Ambiente para APIs, aplicações web, workers e serviços JavaScript.',
        longDescription:
            'Prepare uma base de execução para aplicações Node.js com variáveis de ambiente, porta de serviço e processo de inicialização configuráveis.',
        requirements: [
            'Repositório da aplicação',
            'Versão do Node.js',
            'Comando de inicialização',
        ],
        steps: [
            'Conectar o projeto',
            'Definir variáveis',
            'Configurar execução',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'laravel',
        name: 'Laravel',
        shortName: 'LA',
        category: 'Desenvolvimento',
        icon: 'Code2',
        accent: '#ff2d20',
        description:
            'Base preparada para aplicações PHP construídas com Laravel.',
        longDescription:
            'Organize runtime PHP, servidor web, filas e conexão com banco para receber uma aplicação Laravel.',
        requirements: ['Projeto Laravel', 'PHP e Composer', 'Banco de dados'],
        steps: [
            'Conectar o projeto',
            'Configurar o ambiente',
            'Preparar dependências',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'postgresql',
        name: 'PostgreSQL',
        shortName: 'PG',
        category: 'Banco de dados',
        icon: 'Database',
        accent: '#336791',
        featured: true,
        description:
            'Banco relacional para aplicações que exigem consistência e consultas avançadas.',
        longDescription:
            'Planeje uma instância PostgreSQL com usuário, banco inicial, porta e política de acesso definidos antes da implantação.',
        requirements: [
            'Armazenamento disponível',
            'Política de acesso',
            'Rotina de cópia definida',
        ],
        steps: [
            'Definir versão',
            'Criar credenciais',
            'Configurar acesso',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'redis',
        name: 'Redis',
        shortName: 'RD',
        category: 'Banco de dados',
        icon: 'HardDrive',
        accent: '#dc382d',
        description:
            'Cache e armazenamento em memória para filas, sessões e dados temporários.',
        longDescription:
            'Prepare uma instância Redis para cache, sessões ou filas com autenticação e limite de memória configuráveis.',
        requirements: [
            'Memória reservada',
            'Rede privada recomendada',
            'Política de persistência',
        ],
        steps: [
            'Definir memória',
            'Configurar autenticação',
            'Escolher persistência',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'coolify',
        name: 'Coolify',
        shortName: 'CF',
        category: 'Operações',
        icon: 'CloudCog',
        accent: '#7c3aed',
        description:
            'Interface de implantação autogerenciada para projetos e bancos de dados.',
        longDescription:
            'Use uma VPS para avaliar uma plataforma autogerenciada de deploy com projetos, serviços e bancos centralizados.',
        requirements: ['VPS Linux dedicada', 'Docker', 'Domínio para o painel'],
        steps: [
            'Selecionar o servidor',
            'Definir domínio',
            'Preparar o ambiente',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'gitlab',
        name: 'GitLab',
        shortName: 'GL',
        category: 'Desenvolvimento',
        icon: 'GitBranch',
        accent: '#fc6d26',
        description:
            'Repositórios, pipelines e colaboração em uma instalação administrada pela equipe.',
        longDescription:
            'Planeje uma instalação autogerenciada para código e integração contínua, considerando armazenamento, memória e domínio dedicado.',
        requirements: [
            'Recursos compatíveis',
            'Domínio dedicado',
            'Política de backup',
        ],
        steps: [
            'Selecionar recursos',
            'Definir domínio',
            'Configurar administrador',
            'Revisar a implantação',
        ],
    },
    {
        slug: 'chatwoot',
        name: 'Chatwoot',
        shortName: 'CW',
        category: 'Operações',
        icon: 'MessagesSquare',
        accent: '#1f93ff',
        description:
            'Central de atendimento autogerenciada para múltiplos canais.',
        longDescription:
            'Visualize a composição de uma central de atendimento com aplicação, banco, cache e serviços necessários.',
        requirements: ['Docker', 'PostgreSQL e Redis', 'Domínio configurado'],
        steps: [
            'Selecionar a VPS',
            'Definir domínio',
            'Criar administrador',
            'Revisar a implantação',
        ],
    },
];

export function getApplicationBySlug(slug?: string) {
    return APPLICATION_CATALOG.find((application) => application.slug === slug);
}
