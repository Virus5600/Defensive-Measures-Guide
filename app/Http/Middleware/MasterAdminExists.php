<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use App\Models\User;

use Closure;
use DB;
use Exception;
use Log;
use Str;

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

			$admin = User::create([
				'username' => config('master-admin.username'),
				'first_name' => config('master-admin.first_name'),
				'middle_name' => config('master-admin.middle_name'),
				'last_name' => config('master-admin.last_name'),
				'email' => config('master-admin.email'),
				'gender' => 'others',
				'avatar' => 'default-admin.png',
				'user_type_id' => config('master-admin.user_type_id'),
				'password' => config('master-admin.password'),
				'is_verified' => 1,
			]);

			// Delete all other Master Admins
			$ma = User::where('user_type_id', '=', config('master-admin.user_type_id'))
				->where('id', '!=', $admin->id)
				->get();

			$count = $ma->count();
			if ($count > 0) {
				$usernames = $ma->pluck('username')->toArray();
				$emails = $ma->pluck('email')->toArray();

				try {
					DB::beginTransaction();

					$ma->delete();

					DB::commit();
				} catch (Exception $e) {
					DB::rollback();
					Log::error($e);

					return redirect()
						->route('home')
						->with('error', 'An error occurred.');
				}

				activity('middlware')
					->byAnonymous()
					->event('master-admin-deleted')
					->withProperties([
						'timestamp' => configNowTZ(),
						'deleted_count' => $count,
						'deleted_usernames' => $usernames,
						'deleted_emails' => $emails,
					])
					->log("Deleted {$count} Master Admin " . Str::of('account')->plural($count) . '.');

				// TODO: Send email to the currently registered Master Admin.
			}
		}

		return $response;
	}
}
