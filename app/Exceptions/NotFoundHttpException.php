<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException as NFHException;
use Throwable;

class NotFoundHttpException extends NFHException
{
	public function __construct(
		string|Throwable $message = 'Page not found or does not exist',
		int $code = 404,
		Throwable $previous = null,
		array $headers = [],
	) {
		if (($e = $message) instanceof Throwable) {
			$message = $e->getMessage();
			$code = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : $e->getCode();
			$previous = $e->getPrevious();
			$headers = $e->getHeaders();
		} elseif ($previous instanceof NFHException) {
			$message = $previous->getMessage();
			$code = $previous->getStatusCode();
			$headers = $previous->getHeaders();
			$previous = $previous->getPrevious();
		}

		parent::__construct($message, $previous, $code, $headers);
	}

	public function render(Request $request): RedirectResponse|Response|bool
	{
		if ($request->expectsJson() || $request->is('api/*')) {
			if ($this->getPrevious()->getPrevious() instanceof ModelNotFoundException) {
				$this->message = 'The item either does not exist or is already deleted';
			}

			return response([
				'error' => 'Not Found',
				'message' => $this->message,
			], 404);
		}

		return redirect()
			->back()
			->withInput($request->except('_token'))
			->with('flash_error', $this->message)
			->with('has_icon', 'true');
	}
}
