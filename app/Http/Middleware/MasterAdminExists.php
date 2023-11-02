<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use App\Models\User;

/**
 * @package App\Http\Middleware
 *
 * @class MasterAdminExists
 *
 * @brief Middleware that checks if the given Master Admin exists.
 */
class MasterAdminExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
		$user = User::where('username', '=', config('master-admin.username'))
			->where('email', '=', config('master-admin.email'))
			->where('user_type_id', '=', config('master-admin.user_type_id'))
			->first();

		$response = $next($request);

		if (!$user) {
			session()->flash('flash_info', 'Master Admin account does not exist so a new one is created.');

			User::create([
				'username' => config('master-admin.username'),
				'first_name' => config('master-admin.first_name'),
				'middle_name' => config('master-admin.middle_name'),
				'last_name' => config('master-admin.last_name'),
				'email' => config('master-admin.email'),
				'user_type_id' => config('master-admin.user_type_id'),
				'password' => config('master-admin.password'),
			]);
		}

        return $response;
    }
}
