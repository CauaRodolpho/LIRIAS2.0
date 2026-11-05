<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class LiriasPageController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $parameters = $request->route()?->parameters() ?? [];
        $screen = (string) ($parameters['screen'] ?? 'not-found');
        $title = isset($parameters['title']) ? (string) $parameters['title'] : null;
        unset($parameters['screen'], $parameters['title']);

        return Inertia::render('route-page', [
            'screen' => $screen,
            'title' => $title,
            'route' => [
                'name' => $request->route()?->getName(),
                'params' => $parameters,
                'query' => $request->query(),
            ],
        ]);
    }
}
