import { lazy, Suspense, type ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { DashboardLayout, MarketingLayout } from '@/components/layout';
import { ThemeProvider } from '@/components/shared/theme-provider';

const HomePage = lazy(() => import('@/pages/home'));
const AuthPage = lazy(() => import('@/pages/auth'));
const MarketingPlaceholderPage = lazy(
    () => import('@/pages/marketing-placeholder'),
);
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const PricingPage = lazy(() => import('@/pages/pricing'));
const VpsLinuxPage = lazy(() => import('@/pages/vps-linux'));
const VpsWindowsPage = lazy(() => import('@/pages/vps-windows'));
const StatusPage = lazy(() => import('@/pages/status'));
const DocsPage = lazy(() => import('@/pages/docs'));
const SupportCenterPage = lazy(() => import('@/pages/support'));
const ApplicationsPage = lazy(() => import('@/pages/applications'));
const ApplicationDetailPage = lazy(() => import('@/pages/application-detail'));
const AutomationPage = lazy(() => import('@/pages/automation'));
const SolutionPage = lazy(() => import('@/pages/solution-page'));
const DevelopersPage = lazy(() => import('@/pages/developers'));
const LaunchpadPage = lazy(() => import('@/pages/launchpad'));
const CheckoutPage = lazy(() => import('@/pages/checkout'));
const ProvisioningPage = lazy(() => import('@/pages/provisioning'));
const FirstAccessPage = lazy(() => import('@/pages/first-access'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const DashboardPlaceholderPage = lazy(
    () => import('@/pages/dashboard-placeholder'),
);
const ServerListPage = lazy(() =>
    import('@/pages/dashboard-server-list').then((module) => ({
        default: module.ServerListPage,
    })),
);
const ServerOverviewPage = lazy(() =>
    import('@/pages/dashboard-server-overview').then((module) => ({
        default: module.ServerOverviewPage,
    })),
);
const MonitoringPage = lazy(() =>
    import('@/pages/dashboard-operations').then((module) => ({
        default: module.MonitoringPage,
    })),
);
const DockerPage = lazy(() =>
    import('@/pages/dashboard-modules').then((module) => ({
        default: module.DockerPage,
    })),
);
const OperatingSystemPage = lazy(() =>
    import('@/pages/dashboard-operations').then((module) => ({
        default: module.OperatingSystemPage,
    })),
);
const BackupsPage = lazy(() =>
    import('@/pages/dashboard-operations').then((module) => ({
        default: module.BackupsPage,
    })),
);
const SecurityPage = lazy(() =>
    import('@/pages/dashboard-security').then((module) => ({
        default: module.SecurityHubPage,
    })),
);
const FirewallPage = lazy(() =>
    import('@/pages/dashboard-security').then((module) => ({
        default: module.FirewallPage,
    })),
);
const MalwarePage = lazy(() =>
    import('@/pages/dashboard-security').then((module) => ({
        default: module.MalwarePage,
    })),
);
const DnsPage = lazy(() =>
    import('@/pages/dashboard-modules').then((module) => ({
        default: module.DnsPage,
    })),
);
const DomainsPage = lazy(() =>
    import('@/pages/dashboard-platform').then((module) => ({
        default: module.DomainsPage,
    })),
);
const ApiTokensPage = lazy(() =>
    import('@/pages/dashboard-platform').then((module) => ({
        default: module.ApiTokensPage,
    })),
);
const ServerSettingsPage = lazy(() =>
    import('@/pages/dashboard-modules').then((module) => ({
        default: module.ServerSettingsPage,
    })),
);
const BillingPage = lazy(() =>
    import('@/pages/dashboard-modules').then((module) => ({
        default: module.BillingPage,
    })),
);
const AccountPage = lazy(() =>
    import('@/pages/dashboard-modules').then((module) => ({
        default: module.AccountPage,
    })),
);
const DashboardSupportPage = lazy(() =>
    import('@/pages/dashboard-modules').then((module) => ({
        default: module.SupportPage,
    })),
);
const NetworkOverviewPage = lazy(() =>
    import('@/pages/dashboard-modules').then((module) => ({
        default: module.NetworkOverviewPage,
    })),
);
const DashboardApplicationsPage = lazy(() =>
    import('@/pages/dashboard-applications').then((module) => ({
        default: module.DashboardApplicationsPage,
    })),
);
const ServerActivityPage = lazy(() =>
    import('@/pages/dashboard-operations').then((module) => ({
        default: module.ServerActivityPage,
    })),
);
const ServerAccessPage = lazy(() =>
    import('@/pages/dashboard-applications').then((module) => ({
        default: module.ServerAccessPage,
    })),
);

interface RoutePageProps {
    screen: string;
    title?: string;
}

const dashboardScreens = new Set([
    'dashboard',
    'dashboard-placeholder',
    'server-list',
    'server-overview',
    'monitoring',
    'docker',
    'dashboard-applications',
    'server-activity',
    'server-access',
    'operating-system',
    'backups',
    'security',
    'firewall',
    'malware',
    'dns',
    'server-settings',
    'domains',
    'api-tokens',
    'billing',
    'account',
    'dashboard-support',
    'network',
]);

function PageFallback() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
            Carregando…
        </div>
    );
}

function resolveScreen(screen: string, title?: string): ReactNode {
    switch (screen) {
        case 'home':
            return <HomePage />;
        case 'auth':
            return <AuthPage />;
        case 'pricing':
            return <PricingPage />;
        case 'applications':
            return <ApplicationsPage />;
        case 'application-detail':
            return <ApplicationDetailPage />;
        case 'automation':
            return <AutomationPage />;
        case 'agents':
            return <SolutionPage variant="agents" />;
        case 'ecommerce':
            return <SolutionPage variant="ecommerce" />;
        case 'developers':
            return <DevelopersPage />;
        case 'launchpad':
            return <LaunchpadPage />;
        case 'checkout':
            return <CheckoutPage />;
        case 'provisioning':
            return <ProvisioningPage />;
        case 'first-access':
            return <FirstAccessPage />;
        case 'support-center':
            return <SupportCenterPage />;
        case 'docs':
            return <DocsPage />;
        case 'status':
            return <StatusPage />;
        case 'vps-linux':
            return <VpsLinuxPage />;
        case 'vps-windows':
            return <VpsWindowsPage />;
        case 'marketing-placeholder':
            return <MarketingPlaceholderPage title={title ?? 'LIRIAS'} />;
        case 'dashboard':
            return <DashboardPage />;
        case 'server-list':
            return <ServerListPage />;
        case 'server-overview':
            return <ServerOverviewPage />;
        case 'monitoring':
            return <MonitoringPage />;
        case 'docker':
            return <DockerPage />;
        case 'dashboard-applications':
            return <DashboardApplicationsPage />;
        case 'server-activity':
            return <ServerActivityPage />;
        case 'server-access':
            return <ServerAccessPage />;
        case 'operating-system':
            return <OperatingSystemPage />;
        case 'backups':
            return <BackupsPage />;
        case 'security':
            return <SecurityPage />;
        case 'firewall':
            return <FirewallPage />;
        case 'malware':
            return <MalwarePage />;
        case 'dns':
            return <DnsPage />;
        case 'server-settings':
            return <ServerSettingsPage />;
        case 'domains':
            return <DomainsPage />;
        case 'api-tokens':
            return <ApiTokensPage />;
        case 'billing':
            return <BillingPage />;
        case 'account':
            return <AccountPage />;
        case 'dashboard-support':
            return <DashboardSupportPage />;
        case 'network':
            return <NetworkOverviewPage />;
        case 'dashboard-placeholder':
            return (
                <DashboardPlaceholderPage
                    title={title ?? 'Página do painel não encontrada'}
                />
            );
        default:
            return <NotFoundPage />;
    }
}

export default function RoutePage({ screen, title }: RoutePageProps) {
    const content = resolveScreen(screen, title);
    const pageTitle =
        title ?? (screen === 'home' ? 'Infraestrutura VPS' : 'LIRIAS');

    return (
        <ThemeProvider>
            <Head title={pageTitle} />
            <Suspense fallback={<PageFallback />}>
                {screen === 'auth' ? (
                    content
                ) : dashboardScreens.has(screen) ? (
                    <DashboardLayout>{content}</DashboardLayout>
                ) : (
                    <MarketingLayout>{content}</MarketingLayout>
                )}
            </Suspense>
        </ThemeProvider>
    );
}
