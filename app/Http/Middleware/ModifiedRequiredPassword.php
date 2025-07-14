<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\RequirePassword;
use Symfony\Component\HttpFoundation\Response;

use Closure;

class ModifiedRequiredPassword extends RequirePassword
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @param  string|null  $redirectToRoute
	 * @param  string|int|null  $passwordTimeoutSeconds
	 */
	public function handle($request, Closure $next, $redirectToRoute = null, $passwordTimeoutSeconds = null): Response
	{
		// Store the previous URL before the password confirmation page
		session()->put('before-confirm-password', $request->session()->get('_previous')['url']);

		return parent::handle($request, $next, $redirectToRoute, $passwordTimeoutSeconds);
	}
}
