<?php
// app/Providers/MiddlewareServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\CheckUserRole;
use Illuminate\Routing\Router;

class MiddlewareServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(Router $router): void
    {
        $router->aliasMiddleware('check_role', CheckUserRole::class);
    }
}   