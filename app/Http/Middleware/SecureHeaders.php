<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Closure;

class SecureHeaders
{
	// Enumerate unwanted headers
	private $unwantedHeaderList = [
		'X-Powered-By',
		'Server',
		'Access-Control-Allow-Origin',
	];

	private $wantedHeaderList = [
		'X-XSS-Protection' => '1; mode=block',
	];

	/**
	 * Handle an incoming request.
	 *
	 * @param  Request  $request
	 * @param  Closure  $next
	 * @return Response
	 */
	public function handle(Request $request, Closure $next) {
		$response = $next($request);

		if (!headers_sent()) {
			// SETTER
			foreach ($this->wantedHeaderList as $header => $value) {
				header("{$header}:{$value}");
				$response->headers->set($header, $value, true);
			}

			// REMOVER
			foreach ($this->unwantedHeaderList as $header)
				header_remove($header);
		}

		return $response;
	}
}
