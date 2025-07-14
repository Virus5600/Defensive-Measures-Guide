<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Closure;
use Config;
use URL;

class TunnelAssets
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 */
	public function handle(Request $request, Closure $next): Response
	{
		if ($request->headers->has('X-Forwarded-Host')) {
			$tunnelHost = $request->headers->get('X-Forwarded-Host');
			$scheme = $request->secure() ? 'https' : 'http';

			$fullTunnelUrl = "{$scheme}://{$tunnelHost}";

			Config::set('app.url', $fullTunnelUrl);
			Config::set('app.asset_url', $fullTunnelUrl);

			URL::useOrigin($fullTunnelUrl);
		}

		return $next($request);
	}
}
