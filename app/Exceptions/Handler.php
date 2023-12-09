<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
	/**
	 * The list of the inputs that are never flashed to the session on validation exceptions.
	 *
	 * @var array<int, string>
	 */
	protected $dontFlash = [
		'current_password',
		'password',
		'password_confirmation',
	];

	/**
	 * Register the exception handling callbacks for the application.
	 */
	public function register(): void
	{
		$this->reportable(function (Throwable $e) {
			//
		});
	}

	/**
	 * Render an exception into an HTTP response.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Throwable  $exception
	 * @return \Symfony\Component\HttpFoundation\Response
	 *
	 * @throws \Throwable
	 */
	public function render($request, Throwable $exception)
	{
		if ($exception instanceof TokenMismatchException) {
			return redirect()
				->back()
				->withInput($request->except('_token'))
				->with('flash_message', "Oops! Seems you couldn't submit the form for a long time. Please try again.")
				->with('has_icon', 'true');
		}
		else if ($exception instanceof ModelNotFoundException) {
			return redirect()
				->back()
				->withInput($request->except('_token'))
				->with('flash_error', "The item either does not exists or is already deleted")
				->with('has_icon', 'true');
		}

		return parent::render($request, $exception);
	}
}
