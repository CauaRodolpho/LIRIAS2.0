<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_home_is_rendered_by_laravel_and_inertia(): void
    {
        $response = $this->get(route('home'));

        $response->assertOk()->assertInertia(
            fn (Assert $page) => $page
                ->component('route-page')
                ->where('screen', 'home')
                ->where('route.name', 'home')
        );
    }

    public function test_dynamic_route_parameters_are_shared_with_react(): void
    {
        $response = $this->get(route('applications.show', ['slug' => 'docker']));

        $response->assertOk()->assertInertia(
            fn (Assert $page) => $page
                ->component('route-page')
                ->where('screen', 'application-detail')
                ->where('route.params.slug', 'docker')
        );
    }

    public function test_dashboard_server_route_is_resolved_by_laravel(): void
    {
        $response = $this->get(route('dashboard.servers.show', ['serverId' => 'srv-lirias-01']));

        $response->assertOk()->assertInertia(
            fn (Assert $page) => $page
                ->component('route-page')
                ->where('screen', 'server-overview')
                ->where('route.params.serverId', 'srv-lirias-01')
        );
    }

    public function test_legacy_shortcuts_redirect_to_the_canonical_laravel_route(): void
    {
        $this->get('/launchpad')->assertRedirect('/deploy');
        $this->get('/dashboard/backups')->assertRedirect('/dashboard/servers/srv-lirias-01/backups');
    }
}
