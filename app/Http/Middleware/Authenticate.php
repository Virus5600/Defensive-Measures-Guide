<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
	/**
	 * Get the path the user should be redirected to when they are not authenticated.
	 */
	protected function redirectTo(Request $request): ?string
	{
		if ($request->expectsJson()) {
			session("flash_error", "You need to be logged in to access this page.");
			return route('login');
		}

		return null;
	}
}
