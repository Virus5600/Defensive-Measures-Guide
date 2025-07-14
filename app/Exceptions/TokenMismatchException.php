<?php

namespace App\Exceptions;

use Illuminate\Http\Request;
use Illuminate\Session\TokenMismatchException as TMException;
use Throwable;

class TokenMismatchException extends TMException
{
	public function __construct(
		string|Throwable $message = 'The CSRF token is invalid or has expired.',
		int $code = 419,
		Throwable $previous = null,
		array $headers = []
	) {
		if (($e = $message) instanceof Throwable) {
			$message = $e->getMessage();
			$code = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : $e->getCode();
			$previous = $e->getPrevious();
			$headers = $e->getHeaders();
		} elseif ($previous instanceof TMException) {
			$message = $previous->getMessage();
			$code = $previous->getCode();
			$headers = $previous->getHeaders();
			$previous = $previous->getPrevious();
		}

		parent::__construct($message, $code, $previous, $headers);
	}

	public function render(Request $request)
	{
		$this->message = 'The item either does not exists or is already deleted';

		return redirect()
			->back()
			->withInput($request->except('_token'))
			->with('flash_error', $this->message)
			->with('has_icon', 'true');
	}
}
