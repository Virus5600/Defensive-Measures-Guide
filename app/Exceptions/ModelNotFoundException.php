<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException as MNFException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class ModelNotFoundException extends MNFException
{
	public function __construct(
		string|Throwable $message,
		int $code = 0,
		Throwable $previous = null
	) {
		if (($e = $message) instanceof Throwable) {
			$message = $e->getMessage();
			$code = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : $e->getCode();
			$previous = $e->getPrevious();
		} elseif ($previous instanceof MNFException) {
			$message = $previous->getMessage();
			$code = $previous->getCode();
			$previous = $previous->getPrevious();
		}

		parent::__construct($message, $code, $previous);
	}

	public function render(Request $request): RedirectResponse|Response|bool
	{
		$this->message = 'The item either does not exists or is already deleted';

		if ($request->expectsJson() || $request->is('api/*')) {
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
