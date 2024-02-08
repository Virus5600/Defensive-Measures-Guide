<?php
namespace App\CSP_Policies;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policies\Policy;

class Base extends Policy
{
	public function configure() {

		$this
			// BASIC DIRECTIVES
			->addDirective(Directive::DEFAULT, Keyword::NONE)
			->addDirective(Directive::BASE, Keyword::SELF)
			->addDirective(Directive::CONNECT, Keyword::SELF)
			->addDirective(Directive::DEFAULT, Keyword::SELF)
			->addDirective(Directive::FORM_ACTION, Keyword::SELF)
			->addDirective(Directive::IMG, "self data:")
			->addDirective(Directive::MEDIA, Keyword::SELF)
			->addDirective(Directive::OBJECT, Keyword::NONE)
			->addDirective(Directive::FONT, "self data:")

			// FRAME DIRECTIVES
			->addDirective(Directive::FRAME_ANCESTORS, "self")
			->addDirective(Directive::FRAME, "self https://www.facebook.com/")

			// SCRIPTS AND STYLES
			->addDirective(Directive::SCRIPT, "self unsafe-eval")
			->addDirective(Directive::SCRIPT_ELEM, "self")
			->addDirective(Directive::STYLE, Keyword::UNSAFE_INLINE)
			->addDirective(Directive::STYLE_ELEM, "self")

			// MUST HAVE NONCE
			->addNonceForDirective(Directive::SCRIPT)
			->addNonceForDirective(Directive::SCRIPT_ELEM)
			->addNonceForDirective(Directive::STYLE_ELEM);

		if (config("app.env") == "local")
			$this->reportOnly();
	}

	public function shouldBeApplied(Request $request, Response $response): bool {
		if (config('app.debug') && ($response->isClientError() || $response->isServerError())) {
			return false;
		}

		return parent::shouldBeApplied($request, $response);
	}
}
