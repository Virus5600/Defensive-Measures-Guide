<?php

namespace App\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

use Barryvdh\Debugbar\Facades\Debugbar;
use Smknstd\FakerPicsumImages\FakerPicsumImagesProvider;

use Faker\Generator;
use Faker\Factory;

use BadMethodCallException;
use Exception;
use URL;
use Validator;
use Vite;

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Defines the list of environments where the application is considered to be in development
	 * and should have certain features enabled. So far, the following environments are considered
	 * as development environments:
	 * - `local`
	 * - `development`
	 * - `testing`
	 *
	 * @var array
	 */
	const DEV_ENV = [
		'local',
		'development',
		'testing'
	];

	/**
	 * A list of custom Faker classes to be implemented.
	 *
	 * @var array
	 */
	private $fakerClasses = [
		FakerPicsumImagesProvider::class,
	];

	/**
	 * A list of custom validation classes to be implemented. Each class must have a `validate` method and a `MESSAGE` constant.
	 *
	 * @var array
	 */
	private $validationClasses = [
		\App\Rules\CallableNumber::class,
		\App\Rules\LandlineNumber::class,
		\App\Rules\MobileNumber::class,
	];

	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		// If the APP_URL starts with 'https://', then force HTTPS.
		if (Str::startsWith(config('app.url'), 'https://')) {
			$this->app['request']->server->set('HTTPS', true);
		}

		if (in_array(strtolower(config('app.env')), self::DEV_ENV)) {
			// New Faker Methods
			$this->implementFakeMethods();

			// Add Debugbar to Alias
			AliasLoader::getInstance()
				->alias('Debugbar', Debugbar::class);
		}
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		// Sets Tailwind CSS as the default pagination styling.
		Paginator::useTailwind();

		// Sets the nonce for Vite and makes sure that the path is absolute (no domain).
		Vite::useCspNonce(csp_nonce());
		Vite::createAssetPathsUsing(fn(string $path) => "/{$path}");

		// Implement Custom Rules
		$this->implementCustomRules();

		if (!in_array(strtolower(config('app.env')), self::DEV_ENV)) {
			URL::forceHttps();
		}

		if (class_exists(\Barryvdh\Debugbar\Facades\Debugbar::class) && in_array(strtolower(config('app.env')), self::DEV_ENV)) {
			// Sets the CSP nonce for Debugbar.
			Debugbar::getJavascriptRenderer()
				->setCspNonce(csp_nonce());
		}
	}

	/**
	 * Implements custom methods for the Faker library defined in the `$fakerClasses` array.
	 *
	 * @return void
	 */
	private function implementFakeMethods(): void
	{
		// For when using `$this->faker` in factories...
		$this->app->singleton(
			Generator::class,
			function (): Generator {
				$faker = Factory::create(config('app.faker_locale', 'en_PH'));

				foreach ($this->fakerClasses as $class) {
					$faker->addProvider(new $class($faker));
				}

				return $faker;
			}
		);

		$this->app->bind(
			Generator::class . ":" . config('app.faker_locale', 'en_PH'),
			Generator::class
		);
	}

	/**
	 * Implements custom validation rules defined in the $validationClasses array.
	 *
	 * @return void
	 *
	 * @throws BadMethodCallException
	 * @throws Exception
	 */
	private function implementCustomRules(): void
	{
		foreach ($this->validationClasses as $class) {
			// If "validate" method isn't defined.
			if (!method_exists($class, 'validate'))
				throw new BadMethodCallException("Method 'validate' does not exist in class '{$class}'");

			// If "MESSAGE" constant isn't defined.
			if (!defined($class . '::MESSAGE'))
				throw new Exception("Constant 'MESSAGE' does not exist in class '{$class}'");

			$rule = Str::snake(class_basename($class), '_');
			$method = $class . '@pass';
			$msg = $class::MESSAGE;

			$disposable = new $class(null);
			$isImplicit = $disposable->implicit ?? false;

			if ($isImplicit) {
				Validator::extendImplicit(
					$rule,
					$method,
					$msg
				);
			} else {
				Validator::extend(
					$rule,
					$method,
					$msg
				);
			}
		}
	}
}
