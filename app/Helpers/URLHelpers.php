<?php

if (!function_exists('extractQueryParams')) {
	/**
	 * Extracts all the query parameters from the given URL, which will then be
	 * returned as an array. If no query parameters are found, an empty array
	 * will be returned.
	 *
	 * @param string $url The URL to extract the query parameters from.
	 *
	 * @return array
	 */
	function extractQueryParams(string $url): array
	{
		$parsedURL = parse_url($url);

		if (!array_key_exists('query', $parsedURL))
			return [];

		parse_str($parsedURL['query'], $output);

		return $output;
	}
}

if (!function_exists('relRoute')) {
	/**
	 * Generates a relative URL for the given route, with the given parameters.
	 * If the route is not found, an empty string will be returned.
	 *
	 * @param string $route  The route to generate the URL for.
	 * @param array  $params The parameters to pass to the route.
	 *
	 * @return string
	 */
	function relRoute(string $route, array $params = []): string
	{
		return route($route, $params, false);
	}
}

if (!function_exists('viteAsset')) {
	/**
	 * Generates the URL for the given asset, which is located in the Vite build
	 * directory. If the build directory is not set, the asset will be loaded
	 * using its default build directory.
	 *
	 * @param string      $asset    The asset to generate the URL for.
	 * @param string|null $buildDir The build directory to use for the asset.
	 *
	 * @return string
	 */
	function viteAsset(string $asset, ?string $buildDir): string
	{
		return Vite::asset($asset, $buildDir);
	}
}

if (!function_exists('isUrl')) {
	/**
	 * Checks if the current URL matches the given URL. If the URL matches, the
	 * function will return `true`. Otherwise, it will return `false`.
	 *
	 * The URL should be a relative URL, such as `/dashboard`.
	 *
	 * @param string $url The URL to check against.
	 *
	 * @return bool
	 *
	 * @see isFullURL()
	 * @see isRoute()
	 */
	function isUrl(string $url): bool
	{
		return Request::is($url);
	}
}

if (!function_exists('isFullUrl')) {
	/**
	 * Checks if the current full URL matches the given URL pattern. If the URL
	 * pattern matches, the function will return `true`. Otherwise, it will
	 * return `false`.
	 *
	 * The URL pattern can include query parameters and wildcards.
	 *
	 * @param string|array $urlPattern The URL pattern to check against. This can be a string or an array of strings.
	 *
	 * @return bool
	 *
	 * @see isUrl()
	 * @see isRoute()
	 */
	function isFullUrl(string|array ...$urlPattern): bool
	{
		$urlPatterns = [];

		if (is_array($urlPattern)) {
			if (count($urlPattern) > 0) {
				foreach ($urlPattern as $patternArr) {
					if (is_array($patternArr)) {
						array_push($urlPatterns, ...$patternArr);
					} else {
						array_push($urlPatterns, $patternArr);
					}
				}
			} else {
				$urlPatterns = $urlPattern;
			}
		} else {
			$urlPatterns = [$urlPattern];
		}

		return Request::fullUrlIs(...$urlPatterns);
	}
}

if (!function_exists('isRoute')) {
	/**
	 * Checks if the current route matches the given route. If the route matches,
	 * the function will return `true`. Otherwise, it will return `false`.
	 *
	 * @param string $route The route to check against.
	 *
	 * @return bool
	 *
	 * @see isFullUrl()
	 * @see isUrl()
	 */
	function isRoute(string $route): bool
	{
		return Route::currentRouteName() === $route;
	}
}

if (!function_exists('wss')) {
	/**
	 * Generates a string of wss URLs for the given URLs. The URLs should be
	 * passed as arguments to the function. If no URLs are passed, an empty
	 * string will be returned.
	 *
	 * @param string ...$urls The URLs to convert to wss.
	 *
	 * @return string
	 */
	function wss(string ...$urls): string
	{
		$toRet = '';

		foreach ($urls as $url) {
			$toRet .= 'wss://' . preg_replace('/^https?:\/\//', '', $url) . ' ';
		}

		return trim(preg_replace('/\s{2,}/', ' ', $toRet));
	}
}
