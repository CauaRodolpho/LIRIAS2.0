<?php

use App\Http\Controllers\LiriasPageController;
use Illuminate\Support\Facades\Route;

$page = static function (string $uri, string $screen, string $name, ?string $title = null): void {
    $route = Route::get($uri, LiriasPageController::class)
        ->defaults('screen', $screen)
        ->name($name);

    if ($title !== null) {
        $route->defaults('title', $title);
    }
};

$page('/', 'home', 'home', 'Infraestrutura VPS');
$page('/pricing', 'pricing', 'pricing', 'Preços');
$page('/applications', 'applications', 'applications.index', 'Aplicações');
$page('/applications/{slug}', 'application-detail', 'applications.show', 'Aplicação');
$page('/solutions/automation', 'automation', 'solutions.automation', 'Automação');
$page('/solutions/ai-agents', 'agents', 'solutions.ai-agents', 'Agentes e serviços de IA');
$page('/solutions/ecommerce', 'ecommerce', 'solutions.ecommerce', 'E-commerce');
$page('/developers', 'developers', 'developers', 'Desenvolvedores');
$page('/deploy', 'launchpad', 'deploy', 'LIRIAS Deploy');
Route::redirect('/launchpad', '/deploy', 301);
$page('/checkout', 'checkout', 'checkout', 'Revisão da configuração');
$page('/provisioning/{orderId}', 'provisioning', 'provisioning', 'Provisionamento');
$page('/first-access/{serverId}', 'first-access', 'first-access', 'Primeiro acesso');
$page('/support', 'support-center', 'support', 'Central de ajuda');
$page('/docs', 'docs', 'docs', 'Documentação');
$page('/status', 'status', 'status', 'Status da plataforma');
$page('/about', 'marketing-placeholder', 'about', 'Sobre a plataforma');
$page('/blog', 'marketing-placeholder', 'blog', 'Conteúdos e atualizações');
$page('/terms', 'marketing-placeholder', 'terms', 'Termos de uso');
$page('/privacy', 'marketing-placeholder', 'privacy', 'Política de privacidade');
$page('/sla', 'marketing-placeholder', 'sla', 'Acordo de nível de serviço');
$page('/vps-linux', 'vps-linux', 'vps.linux', 'VPS Linux');
$page('/vps-windows', 'vps-windows', 'vps.windows', 'VPS Windows');
$page('/cloud-hosting', 'marketing-placeholder', 'cloud-hosting', 'Cloud Hosting');
$page('/dedicated-servers', 'marketing-placeholder', 'dedicated-servers', 'Servidores dedicados');

$page('/login', 'auth', 'login', 'Entrar');
$page('/register', 'auth', 'register', 'Criar conta');
Route::redirect('/forgot-password', '/login');

$page('/dashboard', 'dashboard', 'dashboard', 'Visão geral');
$page('/dashboard/servers', 'server-list', 'dashboard.servers.index', 'Servidores');
$page('/dashboard/servers/{serverId}', 'server-overview', 'dashboard.servers.show', 'Servidor');
$page('/dashboard/servers/{serverId}/monitoring', 'monitoring', 'dashboard.servers.monitoring', 'Monitoramento');
$page('/dashboard/servers/{serverId}/docker', 'docker', 'dashboard.servers.docker', 'Docker');
$page('/dashboard/servers/{serverId}/applications', 'dashboard-applications', 'dashboard.servers.applications.index', 'Aplicações');
$page('/dashboard/servers/{serverId}/applications/{appId}', 'dashboard-applications', 'dashboard.servers.applications.show', 'Aplicação');
$page('/dashboard/servers/{serverId}/activity', 'server-activity', 'dashboard.servers.activity', 'Atividade');
$page('/dashboard/servers/{serverId}/access', 'server-access', 'dashboard.servers.access', 'Acesso');
$page('/dashboard/servers/{serverId}/os', 'operating-system', 'dashboard.servers.os', 'Sistema operacional');
$page('/dashboard/servers/{serverId}/backups', 'backups', 'dashboard.servers.backups', 'Backups');
$page('/dashboard/servers/{serverId}/security', 'security', 'dashboard.servers.security', 'Segurança');
$page('/dashboard/servers/{serverId}/security/firewall', 'firewall', 'dashboard.servers.firewall', 'Firewall');
$page('/dashboard/servers/{serverId}/security/malware', 'malware', 'dashboard.servers.malware', 'Scanner de malware');
$page('/dashboard/servers/{serverId}/dns', 'dns', 'dashboard.servers.dns', 'DNS');
$page('/dashboard/servers/{serverId}/settings', 'server-settings', 'dashboard.servers.settings', 'Configurações');
$page('/dashboard/domains', 'domains', 'dashboard.domains', 'Domínios');
$page('/dashboard/developers/api-tokens', 'api-tokens', 'dashboard.api-tokens', 'Tokens de API');
$page('/dashboard/billing', 'billing', 'dashboard.billing', 'Cobrança');
$page('/dashboard/account', 'account', 'dashboard.account', 'Conta');
$page('/dashboard/support', 'dashboard-support', 'dashboard.support', 'Suporte');
$page('/dashboard/network', 'network', 'dashboard.network', 'Rede');

Route::redirect('/dashboard/backups', '/dashboard/servers/srv-lirias-01/backups');
Route::redirect('/dashboard/firewall', '/dashboard/servers/srv-lirias-01/security/firewall');
Route::redirect('/dashboard/settings', '/dashboard/servers/srv-lirias-01/settings');

Route::fallback(LiriasPageController::class)->defaults('screen', 'not-found')->name('not-found');
