<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Closure;
use Exception;

class AccountVerified
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 * @param  string $status Either 'verified' or 'unverified'
	 */
	public function handle(Request $request, Closure $next, string $status): Response
	{
		if (!in_array($status, ['verified', 'unverified'])) {
			throw new Exception('Invalid status provided.');
		}

		if (!auth()->check()) {
			return redirect()->intended();
		}

		$user = auth()->user();

		if ($status == 'verified') {
			if ($user->is_verified === 0) {
				return redirect()->route('verification.index');
			}

			return $next($request);
		}

		if ($status == 'unverified') {
			if ($user->is_verified === 0) {
				return $next($request);
			}

			return redirect()->route('home');
		}
	}
}
