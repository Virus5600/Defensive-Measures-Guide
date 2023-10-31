<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Laravel\Sanctum\Sanctum;

use App\Jobs\AccountNotification;

use App\Models\PasswordReset;
use App\Models\User;

use DB;
use Exception;
use Log;

class AuthenticationController extends Controller
{
	protected function login(Request $req) {
		return view("login");
	}

	protected function authenticate(Request $req) {
		$user = User::where('username', '=', $req->username)->first();

		// Identifies whether the user exists or not.
		if ($user == null) {
			return redirect()
				->back()
				->with('flash_error', 'Wrong username/password!')
				->withInput($req->only('username'));
		}

		// Authenticate the user
		$authenticated = false;
		if (!$user->locked) {
			$authenticated = auth()->attempt([
				'username' => $req->username,
				'password' => $req->password
			]);
		}

		// Designate the next action depending on the authentication result
		if ($authenticated) {
			if ($user) {
				try {
					DB::beginTransaction();

					activity('authentication')
						->byAnonymous()
						->on($user)
						->event('login-success')
						->withProperties([
							'timestamp' => now()->timezone('Asia/Manila'),
							'login_attempts' => $user->login_attempts,
							'previous_auth' => $user->last_auth,
						])
						->log("User {$user->username} successfully logged in.");

					$user->login_attempts = 0;
					$user->last_auth = now()->timezone('Asia/Manila');
					$user->save();

					DB::commit();
				} catch (Exception $e) {
					DB::rollback();
					Log::error($e);
				}
			}

			$token = $user->createToken('authenticated');
			if ($expiration = config('sanctum.expiration')) {
				$model = Sanctum::$personalAccessTokenModel;
				$model::where('created_at', '<', now()->subMinutes($expiration))->delete();
			}

			session(["bearer" => $token->plainTextToken]);

			return redirect()
				->intended(route('admin.dashboard'))
				->with('flash_success', "Logged In!");
		}
		else {
			$msg = "";

			if ($user) {
				try {
					DB::beginTransaction();

					// Increase login attempts if login failed
					if ($user->login_attempts < 5) {
						$user->login_attempts = $user->login_attempts + 1;
						$msg = "Wrong username/password!";
					}
					// Lock the account if the user attempted more than 5 logins
					else {
						if ($user->locked == 0) {
							// Generate a password reset link if there are no other instances of this email in the password reset table
							if (PasswordReset::where('email', '=', $user->email)->get()->count() <= 0) {
								PasswordReset::insert([
									'email' => $user->email,
									'created_at' => now()->timezone('Asia/Manila')
								]);

								$pr = PasswordReset::where('email', '=', $user->email)->first();
								$pr->generateToken()->generateExpiration();

								activity('authentication')
									->byAnonymous()
									->on($user)
									->event('login-attempt')
									->withProperties([
										'timestamp' => now()->timezone('Asia/Manila'),
										'login_attempts' => $user->login_attempts,
										'previous_auth' => $user->last_auth,
									])
									->log("Locked account of {$user->username} ({$user->email}) after 5 incorrect attempts");
							}
							// Otherwise, fetch the row to use the already generated data
							else {
								$pr = PasswordReset::where('email', '=', $user->email)->first();

								activity('authentication')
									->byAnonymous()
									->on($user)
									->event('login-attempt')
									->withProperties([
										'timestamp' => now()->timezone('Asia/Manila'),
										'login_attempts' => $user->login_attempts,
										'previous_auth' => $user->last_auth,
									])
									->log("Login attempt to {$user->username} ($user->email) after lockout");
							}

							// Send an email to the owner of the locked account
							$args = [
								"subject" => "Your account has been locked!",
								"token" => $pr->token,
								"email" => $user->email,
								"recipients" => [$user->email]
							];
							AccountNotification::dispatch($user, "locked", $args);
						}

						$user->locked = 1;
						$user->locked_by = User::getIP();
						$msg = "Exceeded 5 tries, account locked";
					}
					$user->save();

					activity('authentication')
						->byAnonymous()
						->on($user)
						->event('login-attempt')
						->withProperties([
							'timestamp' => now()->timezone('Asia/Manila'),
							'login_attempts' => $user->login_attempts,
							'previous_auth' => $user->last_auth,
						])
						->log("Login attempted for {$user->username} ({$user->email})");

					DB::commit();
				} catch (Exception $e) {
					DB::rollback();
					Log::error($e);
				}
			}
		}

		auth()->logout();
		return redirect()
			->back()
			->with('flash_error', $msg)
			->withInput($req->only('username'));
	}

	protected function logout(Request $req) {
		if (auth()->check()) {
			$user = auth()->user();

			$token = $user->currentAccessToken();
			if ($token != null)
				$token->delete();

			auth()->logout();
			session()->flush();

			activity('user')
				->by($user)
				->on($user)
				->event('logout')
				->withProperties([
					'timestamp' => now()->timezone('Asia/Manila'),
					'login_attempts' => $user->login_attempts,
					'previous_auth' => $user->last_auth,
				])
				->log("User {$user->username} ({$user->email}) logged out");

			return redirect(route("home"))
				->with('flash_success', "Logged out!");
		}

		return redirect()
			->route("admin.dashboard")
			->with("flash_error", "Something went wrong, please try again.");
	}
}
