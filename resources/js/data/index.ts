// ============================================================
// LIRIAS — Static Data Layer
// Replace with API calls when backend is ready
// ============================================================

import type { PlanDTO, ServerDTO } from '@/types';

export const PLANS_DATA: PlanDTO[] = [
    {
        id: 'vps-starter',
        name: 'VPS Starter',
        category: 'vps-linux',
        vcpu: 2,
        ram: 4,
        disk: 50,
        bandwidth: 1,
        priceMonthly: 29.9,
        priceYearly: 23.92,
        popular: false,
        osOptions: ['linux'],
        features: [
            { label: '2 vCPU AMD EPYC', included: true },
            { label: '4 GB RAM DDR5', included: true },
            { label: '50 GB NVMe SSD', included: true },
            { label: '1 TB Transferência', included: true },
            { label: '1 IPv4 Dedicado', included: true },
            { label: 'Proteção Anti-DDoS', included: true },
            { label: 'Snapshots', included: true },
            { label: 'Painel de Controle', included: true },
            { label: 'IPv6', included: false },
            { label: 'Windows Server', included: false },
        ],
    },
    {
        id: 'vps-pro',
        name: 'VPS Pro',
        category: 'vps-linux',
        vcpu: 4,
        ram: 8,
        disk: 100,
        bandwidth: 3,
        priceMonthly: 59.9,
        priceYearly: 47.92,
        popular: true,
        osOptions: ['linux', 'windows'],
        features: [
            { label: '4 vCPU AMD EPYC', included: true },
            { label: '8 GB RAM DDR5', included: true },
            { label: '100 GB NVMe SSD', included: true },
            { label: '3 TB Transferência', included: true },
            { label: '1 IPv4 Dedicado', included: true },
            { label: 'Proteção Anti-DDoS', included: true },
            { label: 'Snapshots', included: true },
            { label: 'Painel de Controle', included: true },
            { label: 'IPv6', included: true },
            { label: 'Windows Server', included: true },
        ],
    },
    {
        id: 'vps-enterprise',
        name: 'VPS Enterprise',
        category: 'vps-linux',
        vcpu: 8,
        ram: 16,
        disk: 200,
        bandwidth: 5,
        priceMonthly: 119.9,
        priceYearly: 95.92,
        popular: false,
        osOptions: ['linux', 'windows'],
        features: [
            { label: '8 vCPU AMD EPYC', included: true },
            { label: '16 GB RAM DDR5', included: true },
            { label: '200 GB NVMe SSD', included: true },
            { label: '5 TB Transferência', included: true },
            { label: 'IPv4 + IPv6', included: true },
            { label: 'Proteção Anti-DDoS', included: true },
            { label: 'Snapshots', included: true },
            { label: 'Painel de Controle', included: true },
            { label: 'IPv6', included: true },
            { label: 'Windows Server', included: true },
        ],
    },
    {
        id: 'vps-titan',
        name: 'VPS Titan',
        category: 'vps-linux',
        vcpu: 16,
        ram: 32,
        disk: 400,
        bandwidth: 10,
        priceMonthly: 239.9,
        priceYearly: 191.92,
        popular: false,
        osOptions: ['linux', 'windows'],
        features: [
            { label: '16 vCPU AMD EPYC', included: true },
            { label: '32 GB RAM DDR5', included: true },
            { label: '400 GB NVMe SSD', included: true },
            { label: '10 TB Transferência', included: true },
            { label: 'IPv4 + IPv6', included: true },
            {
                label: 'Proteção Anti-DDoS 10 Tbps',
                included: true,
                highlight: true,
            },
            { label: 'Snapshots Ilimitados', included: true },
            { label: 'SLA 99.99%', included: true },
            { label: 'Suporte Prioritário', included: true },
            { label: 'Windows Server', included: true },
        ],
    },
];
export const FAQ_DATA = [
    {
        id: 'faq-1',
        question: 'O que é uma VPS e por que preciso de uma?',
        answer: 'Uma VPS (Virtual Private Server) é um servidor virtual com recursos dedicados: CPU, RAM, disco e banda garantidos exclusivamente para você. Ao contrário da hospedagem compartilhada, você tem isolamento completo, acesso root total e performance previsível — ideal para aplicações profissionais.',
    },
    {
        id: 'faq-2',
        question: 'Qual a diferença entre VPS e hospedagem compartilhada?',
        answer: 'Na hospedagem compartilhada, centenas de sites competem pelos mesmos recursos. Na VPS, seus recursos são isolados e garantidos. Você tem desempenho consistente, segurança superior, liberdade para instalar qualquer software e controle total via acesso root.',
    },
    {
        id: 'faq-3',
        question: 'Posso instalar Windows Server na minha VPS?',
        answer: 'Sim! Os planos VPS Pro, Enterprise e Titan suportam Windows Server 2019 e 2022. A licença já está inclusa no preço. Para o VPS Starter, apenas Linux está disponível.',
    },
    {
        id: 'faq-4',
        question: 'Recebo acesso root completo?',
        answer: 'Absolutamente. Você tem controle total: acesso root via SSH (Linux) ou RDP (Windows), liberdade para instalar qualquer software, configurar firewall, gerenciar serviços e personalizar o ambiente como desejar.',
    },
    {
        id: 'faq-5',
        question: 'Como funciona a proteção Anti-DDoS?',
        answer: 'Nossa infraestrutura inclui proteção Anti-DDoS de até 10 Tbps em todos os planos, sem custo adicional. O sistema detecta e mitiga ataques automaticamente em menos de 30 segundos, sem impacto na sua aplicação.',
    },
    {
        id: 'faq-6',
        question: 'Posso aumentar os recursos da minha VPS depois?',
        answer: 'Sim. O upgrade de plano é feito pelo painel em segundos, com reinicialização mínima. Você pode aumentar CPU, RAM e disco conforme sua aplicação cresce, sem migração de dados ou perda de configurações.',
    },
    {
        id: 'faq-7',
        question: 'Como funcionam os backups e snapshots?',
        answer: 'Snapshots são cópias instantâneas do estado completo do servidor, criadas manualmente ou por agendamento. Backups automáticos diários estão disponíveis como add-on. Ambos ficam armazenados em datacenter diferente do servidor principal.',
    },
    {
        id: 'faq-8',
        question: 'Qual o SLA de uptime garantido?',
        answer: 'Garantimos 99.99% de uptime por contrato, o que equivale a menos de 52 minutos de downtime por ano. Em caso de violação do SLA, você recebe créditos automáticos na sua conta.',
    },
];

export const USE_CASES_DATA = [
    {
        id: 'websites',
        title: 'Hospedagem de Sites',
        description:
            'Hospede sites e aplicações web com liberdade para configurar a stack do seu projeto.',
        icon: 'Globe',
        techs: ['WordPress', 'Laravel', 'Next.js', 'Astro'],
        color: 'blue',
    },
    {
        id: 'apis',
        title: 'APIs & Microsserviços',
        description:
            'Execute backends, workers e integrações com as ferramentas que sua equipe já utiliza.',
        icon: 'Zap',
        techs: ['Node.js', 'NestJS', 'Django', 'FastAPI', 'Spring Boot'],
        color: 'purple',
    },
    {
        id: 'databases',
        title: 'Bancos de Dados',
        description:
            'Configure bancos relacionais, NoSQL e cache de acordo com a arquitetura da aplicação.',
        icon: 'Database',
        techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
        color: 'green',
    },
    {
        id: 'saas',
        title: 'Aplicações SaaS',
        description:
            'Reúna aplicação, serviços e rotinas de deploy em um ambiente sob seu controle.',
        icon: 'LayoutDashboard',
        techs: ['Docker', 'Kubernetes', 'CI/CD', 'Auto-scale'],
        color: 'orange',
    },
    {
        id: 'games',
        title: 'Servidores de Jogos',
        description:
            'Crie ambientes próprios para comunidades, partidas e servidores com mods.',
        icon: 'Gamepad2',
        techs: ['Minecraft', 'FiveM', 'Rust', 'Valheim', 'Terraria'],
        color: 'pink',
    },
    {
        id: 'ecommerce',
        title: 'E-commerce',
        description:
            'Hospede sua plataforma e conecte os serviços que fazem parte da operação da loja.',
        icon: 'ShoppingCart',
        techs: ['Magento', 'WooCommerce', 'Shopify', 'VTEX'],
        color: 'teal',
    },
];

export const SECURITY_FEATURES_DATA = [
    {
        title: 'Acesso e credenciais',
        description:
            'Chaves SSH e credenciais organizam quem pode entrar no ambiente e como esse acesso acontece.',
        icon: 'KeyRound',
    },
    {
        title: 'Regras de rede',
        description:
            'O firewall permite definir portas, protocolos e origens autorizadas para acessar a VPS.',
        icon: 'Shield',
    },
    {
        title: 'Visibilidade operacional',
        description:
            'Métricas de uso e histórico de ações ajudam a acompanhar o comportamento do servidor.',
        icon: 'Activity',
    },
    {
        title: 'Pontos de recuperação',
        description:
            'Snapshots podem registrar o estado do ambiente antes de atualizações ou mudanças importantes.',
        icon: 'HardDrive',
    },
];

// ─── Mock Servers (Dashboard Demo Data) ───────────────────────
// Replace with serverService.list() when backend is available

export const SERVERS_DATA: ServerDTO[] = [
    {
        id: 'srv-001',
        name: 'lirias-node-01',
        hostname: 'lirias-node-01',
        status: 'running',
        os: 'Ubuntu 24.04 LTS',
        osType: 'linux',
        ipv4: '187.45.12.8',
        ipv6: '2a02:4780::1',
        datacenter: 'São Paulo',
        plan: 'VPS Pro',
        cpu: 4,
        ram: 8,
        disk: 100,
        bandwidth: 3,
        createdAt: '2025-11-02T10:00:00Z',
    },
    {
        id: 'srv-002',
        name: 'lirias-stage-01',
        hostname: 'lirias-stage-01',
        status: 'running',
        os: 'Debian 12',
        osType: 'linux',
        ipv4: '187.45.12.19',
        datacenter: 'Frankfurt',
        plan: 'VPS Starter',
        cpu: 2,
        ram: 4,
        disk: 50,
        bandwidth: 1,
        createdAt: '2025-12-14T10:00:00Z',
    },
    {
        id: 'srv-003',
        name: 'lirias-db-01',
        hostname: 'lirias-db-01',
        status: 'rebooting',
        os: 'Rocky Linux 9',
        osType: 'linux',
        ipv4: '187.45.13.4',
        ipv6: '2a02:4780::2',
        datacenter: 'Miami',
        plan: 'VPS Enterprise',
        cpu: 8,
        ram: 16,
        disk: 200,
        bandwidth: 5,
        createdAt: '2026-01-20T10:00:00Z',
    },
    {
        id: 'srv-004',
        name: 'lirias-win-01',
        hostname: 'lirias-win-01',
        status: 'stopped',
        os: 'Windows Server 2022',
        osType: 'windows',
        ipv4: '187.45.14.21',
        datacenter: 'São Paulo',
        plan: 'VPS Pro',
        cpu: 4,
        ram: 8,
        disk: 100,
        bandwidth: 3,
        createdAt: '2026-02-05T10:00:00Z',
    },
];
