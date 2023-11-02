<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Carbon\Carbon;

use Laravel\Sanctum\PersonalAccessToken;

use Closure;

class Permissions
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 */
	public function handle(Request $req, Closure $next, ...$permissions): Response
	{
		if (!auth()->check()) {
			return redirect()->intended();
		}

		$user = auth()->user();
		$sanctum = false;

		if (in_array('sanctum', $permissions)) {
			if ($user->tokens()->count() <= 0) {
				return $this->logSanctumActivity($user);
			}
			else {
				$token = PersonalAccessToken::findToken(session()->get('bearer'));

				if ($token == null) {
					return $this->logSanctumActivity($user);
				}
				else {
					$expiration = config('sanctum.expiration');

					if (Carbon::parse($token->created_at)->lte(now()->subMinutes($expiration)))
						return $this->logSanctumActivity($user);
					else {
						$sanctum = true;
					}
				}
			}
		}

		if ($user->hasPermission($permissions) || $sanctum) {
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

	private function logSanctumActivity($user) {
		activity('middleware')
			->byAnonymous()
			->on($user)
			->event('logged-out')
			->withProperties([
				'first_name' => $user->first_name,
				'middle_name' => $user->middle_name,
				'last_name' => $user->last_name,
				'suffix' => $user->suffix,
				'is_avatar_link' => $user->is_avatar_link,
				'avatar' => $user->avatar,
				'email' => $user->email,
				'type_id' => $user->type,
				'last_auth' => $user->last_auth
			])
			->log("User {$user->email} was logged out due to missing PAT");

		if (auth()->check())
			auth()->guard('web')->logout();
		session()->flush();

		return redirect()->route("login")
			->with("flash_error", "Token expired or missing, please login again")
			->with('has_timer', true)
			->with('duration', '5000');
	}
}
