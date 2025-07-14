<?php

namespace App\CSP_Policies;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policies\Policy;

use App\Providers\AppServiceProvider;

class Base extends Policy
{
	public function configure()
	{
		$baseUrl = config('app.url');
		$viteDevUrl = "{$baseUrl}:" . config('app.vite_dev_port');
		$tunnelUrl = config('app.tunnel_url');
		$webSocketUrl = wss($baseUrl, $viteDevUrl, $tunnelUrl);

		$urls = $this->trimExcessWhiteSpace("self {$baseUrl} {$tunnelUrl} {$viteDevUrl}");

		$this
			// BASIC DIRECTIVES
			->addDirective(Directive::DEFAULT, Keyword::NONE)
			->addDirective(Directive::BASE, Keyword::SELF)
			->addDirective(Directive::CONNECT, "{$urls} {$webSocketUrl}")
			->addDirective(Directive::DEFAULT, Keyword::SELF)
			->addDirective(Directive::FORM_ACTION, $urls)
			->addDirective(Directive::IMG, "self data: https://*")
			->addDirective(Directive::MEDIA, Keyword::SELF)
			->addDirective(Directive::OBJECT, Keyword::NONE)
			->addDirective(Directive::FONT, "data: {$urls}")

			// FRAME DIRECTIVES
			->addDirective(Directive::FRAME_ANCESTORS, "none")
			->addDirective(Directive::FRAME, "self https://www.facebook.com/ *.google.com")

			// SCRIPTS AND STYLES
			->addDirective(Directive::SCRIPT, $urls)
			->addDirective(Directive::SCRIPT_ELEM, $urls)
			->addDirective(Directive::STYLE, Keyword::UNSAFE_INLINE)
			->addDirective(Directive::STYLE_ELEM, $urls)

			// MUST HAVE NONCE
			->addNonceForDirective(Directive::SCRIPT)
			->addNonceForDirective(Directive::SCRIPT_ELEM)
			->addNonceForDirective(Directive::STYLE_ELEM);

		// REPORT ONLY IN DEVELOPMENT ENVIRONMENTS
		if (config('app.debug') && in_array(config('app.env'), AppServiceProvider::DEV_ENV)) {
			$this->reportOnly();
		}
	}

	/**
	 * Determines if the policy should be applied to the given request and response.
	 *
	 * @param Request $request The request
	 * @param Response $response The response
	 * @return bool True if the policy should be applied, false otherwise
	 */
	public function shouldBeApplied(Request $request, Response $response): bool
	{
		if (config('app.debug') && ($response->isClientError() || $response->isServerError())) {
			return false;
		}

		return parent::shouldBeApplied($request, $response);
	}

	/**
	 * Trims excess white space from a string. This includes any white space that is more than one space,
	 * and any white space at the beginning or end of the string.
	 *
	 * @param string $str The string to trim
	 * @return string The trimmed string
	 */
	private function trimExcessWhiteSpace(string $str): string
	{
		return preg_replace("/\s{2,}/", " ", $str);
	}
}
