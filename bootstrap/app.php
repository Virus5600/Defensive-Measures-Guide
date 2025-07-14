<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

/**
 * Middleware that are used globally.
 * These middleware are applied to all requests and are not specific to any route.
 * They are typically used for tasks like handling asset URLs, adding security headers, etc.
 */
$globalMiddleware = [
	\Spatie\Csp\AddCspHeaders::class,
	\App\Http\Middleware\TunnelAssets::class,
];

/**
 * Middleware that are used as aliases.
 * These are used to simplify the middleware usage in routes.
 */
$aliasMiddleware = [
	'check.admin' => \App\Http\Middleware\MasterAdminExists::class,
	'verified' => \App\Http\Middleware\AccountVerified::class,
	'password.confirm' => \App\Http\Middleware\ModifiedRequiredPassword::class,
];

/**
 * Custom exceptions that are handled by the application.
 * These exceptions are used to provide a consistent error response format.
 */
$customExceptions = [
	\App\Exceptions\AuthorizationException::class,
	\App\Exceptions\ModelNotFoundException::class,
	\App\Exceptions\NotFoundHttpException::class,
	\App\Exceptions\TokenMismatchException::class,
];

return Application::configure(basePath: dirname(__DIR__))
	->withRouting(
		web: __DIR__ . '/../routes/web.php',
		// api: __DIR__ . '/../routes/api.php',
		commands: __DIR__ . '/../routes/console.php',
		health: '/up',
	)
	->withMiddleware(function (Middleware $middleware) use ($globalMiddleware, $aliasMiddleware) {
		$middleware->trustProxies(
			headers: Request::HEADER_X_FORWARDED_FOR |
				Request::HEADER_X_FORWARDED_HOST |
				Request::HEADER_X_FORWARDED_PORT |
				Request::HEADER_X_FORWARDED_PROTO |
				Request::HEADER_X_FORWARDED_AWS_ELB
		);

		$middleware->trustProxies(at: '*');

		// Handles the middleware registration
		foreach ($globalMiddleware as $middlewareClass) {
			$middleware->append($middlewareClass);
		}

		// Middleware aliases
		$middleware->alias($aliasMiddleware);

		// Redirections
		$middleware->redirectTo(
			guests: '/',
			users: '/dashboard',
		);
	})
	->withExceptions(function (Exceptions $exceptions) use ($customExceptions) {
		$exceptions->dontFlash([
			'current_password',
			'password',
			'password_confirmation',
		]);

		foreach ($customExceptions as $exceptionClass) {
			$parentClass = get_parent_class($exceptionClass);
			$exceptions->map($parentClass, $exceptionClass);
		}
	})->create();
