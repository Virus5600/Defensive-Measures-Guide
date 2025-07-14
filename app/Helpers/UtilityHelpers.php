<?php

if (!function_exists('configNowTZ')) {
	/**
	 * Gets the immediate datetime right in this very moment using the default timezone
	 * provided in the configuration file. If the timezone is not set, it will default
	 * to using "UTC". This could be changed by providing a default timezone in the
	 * `$default` parameter.
	 *
	 * @param string $default The default fallback timezone. Defaults to "UTC".
	 *
	 * @return \Carbon\Carbon
	 */
	function configNowTZ(string $default = 'UTC'): \Carbon\Carbon
	{
		return now()
			->timezone(config('app.timezone', $default));
	}
}

if (!function_exists('activeRoute')) {
	/**
	 * Checks if the current route is the same as the provided route name.
	 *
	 * @param string $routeName The route name to check against.
	 * @param string $activeClass The class to return if the route is active.
	 *
	 * @return string
	 */
	function activeRoute(string $routeName, string $activeClass = 'active'): string
	{
		return Route::is($routeName) ? $activeClass : '';
	}
}

if (!function_exists('activeURL')) {
	/**
	 * Checks if the current URL is the same as the provided URL pattern.
	 *
	 * @param string $urlPattern The URL pattern to check against.
	 * @param string $activeClass The class to return if the route is active.
	 *
	 * @return string
	 */
	function activeURL(string $urlPattern, string $activeClass = 'active'): string
	{
		return Request::is($urlPattern) ? $activeClass : '';
	}
}

if (!function_exists('activeFullURL')) {
	/**
	 * Checks if the current full URL is the same as the provided URL pattern.
	 *
	 * @param string $urlPattern The full URL to check against.
	 * @param string $activeClass The class to return if the route is active.
	 *
	 * @return string
	 */
	function activeFullURL(string $urlPattern, string $activeClass = 'active'): string
	{
		return Request::fullUrlIs($urlPattern) ? $activeClass : '';
	}
}

if (!function_exists('getFAI')) {
	/**
	 * Gets the Font Awesome Icon class names based on the `icon-families.json` file
	 * from the Font Awesome metadata.
	 *
	 * @return array
	 */
	function getFAI(): array
	{
		$allIcons = \Storage::disk('public')
			->json('fonts/fontawesome/icon-families.json');

		$freeIcons = [];

		foreach ($allIcons as $icon => $data) {
			$freeStyles = [];

			$styles = $data['familyStylesByLicense'];
			if (array_key_exists('free', $styles)) {
				foreach ($styles['free'] as $style) {
					array_push(
						$freeStyles,
						$style['style']
					);
				}
			}

			if (!empty($freeStyles)) {
				$freeIcons[$icon] = $freeStyles;
			}
		}

		return $freeIcons;
	}
}

if (!function_exists('camel')) {
	/**
	 * Converts a string to camelCase.
	 *
	 * @param string $string The string to convert.
	 *
	 * @return string
	 */
	function camel(string $string): string
	{
		return Str::camel($string);
	}
}

if (!function_exists('pascal')) {
	/**
	 * Converts a string to PascalCase.
	 *
	 * @param string $string The string to convert.
	 *
	 * @return string
	 */
	function pascal(string $string): string
	{
		return ucfirst(camel($string));
	}
}

if (!function_exists('clamp')) {
	/**
	 * Clamps a number between a minimum and maximum value.
	 *
	 * @param int|float $value The value to clamp.
	 * @param int|float $min The minimum value.
	 * @param int|float $max The maximum value.
	 *
	 * @return int|float
	 */
	function clamp(int|float $value, int|float $min, int|float $max): int|float
	{
		return max($min, min($value, $max));
	}
}

if (!function_exists('storageAsset')) {
	/**
	 * Generate an asset URL for a file stored in a specified disk.
	 *
	 * If the file does not exist, it returns the default value, if it exists, otherwise, it
	 * will still return null.
	 *
	 * @param string $disk The disk where the file is stored.
	 * @param string $path The path to the file.
	 * @param string|null $default The default value to return if the asset does not exist.
	 *
	 * @return string|null The full URL to the asset if it exists. Otherwise, returns the default
	 * value or null.
	 */
	function storageAsset(string $disk, string $path, ?string $default = null): ?string
	{
		if (storageAssetExists($disk, $path)) {
			return Storage::disk($disk)->url($path);
		}

		if (!empty($default) && storageAssetExists($disk, $default)) {
			return Storage::disk($disk)->url($default);
		}

		return null;
	}
}

if (!function_exists('storageAssetExists')) {
	/**
	 * Checks if a file exists in a specified storage disk.
	 *
	 * @param string $disk The disk where the file is stored.
	 * @param string $path The path to the file.
	 *
	 * @return bool Returns true if the file exists, false otherwise.
	 */
	function storageAssetExists(string $disk, string $path): bool
	{
		return Storage::disk($disk)->exists($path);
	}
}

if (!function_exists('inDev')) {
	/**
	 * Checks if the application is running in a development environment.
	 *
	 * @return bool Returns true if the application is in development, false otherwise.
	 */
	function inDev(): bool
	{
		return in_array(config('app.env'), ['local', 'development', 'testing']);
	}
}

if (!function_exists('hasAlpha')) {
	/**
	 * Checks the image pixel-by-pixel to see if it has a transparency.
	 *
	 * @param Intervention\Image\Image The image to test.
	 *
	 * @return bool Whether the image has transparency or not.
	 */
	function hasAlpha(Intervention\Image\Image $image): bool
	{
		for ($x = 0; $x < $image->width(); $x++) {
			for ($y = 0; $y < $image->height(); $y++) {
				$color = $image->pickColor($x, $y);

				if ($color->isTransparent()) {
					return true;
				}
			}
		}

		return false;
	}
}
