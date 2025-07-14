<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\View\Composers\PermissionsComposer;
use App\View\Composers\WebInfoComposer;

use App\Models\Settings;

use Debugbar;
use Exception;
use Log;
use Schema;

class ViewLayoutServiceProvider extends ServiceProvider
{
	/**
	 * Register services.
	 */
	public function register(): void
	{
		//
	}

	/**
	 * Bootstrap services.
	 */
	public function boot(): void
	{
		// Sets the nonce for the CSP when in dev/local environment.
		if (in_array(strtolower(config('app.env')), AppServiceProvider::DEV_ENV) || config('app.debug')) {
			Debugbar::getJavascriptRenderer()->setCspNonce(csp_nonce());
		}

		// Data attachments to the views.
		try {
			// Website information.
			if (Schema::hasTable("settings") && Settings::count() > 0) {
				view()->composer('*', WebInfoComposer::class);
			}

			// Permissions.
			view()->composer('auth.*', PermissionsComposer::class);
		} catch (Exception $e) {
			Log::error($e);
		}
	}
}
