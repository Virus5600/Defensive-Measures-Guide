<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Closure;
use Log;

class Permissions
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 */
	public function handle(Request $req, Closure $next): Response
	{
		if (!auth()->check())
			return redirect()->intended();

		$user->auth()->user();

		if ($user->hasPermission($permissions)) {
			return $next($req);
		}
		else {
			activity('middleware')
				->by($user)
				->on($user)
				->event('access-attempt')
				->withProperties([
					'timestamp' => now()->timezone('Asia/Manila'),
					'login_attempts' => $user->login_attempts,
					'previous_auth' => $user->last_auth,
				])
				->log("User {$user->email} attempted to access <a href='{$req->fullUrl()}'>{$req->getRequestUri()}</a>");

				return redirect()
					->route('admin.dashboard')
					->with('flash_info', 'Access Denied')
					->with('has_icon', 'true')
					->with('message', 'Redirected back to previous page.')
					->with('has_timer', true)
					->with('duration', '5000');
		}

		return $next($req);
	}
}