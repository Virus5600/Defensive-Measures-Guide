<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException as OGAuthorizationException;
use Illuminate\Http\Request;

class AuthorizationException extends OGAuthorizationException
{
	public function render(Request $request)
	{
		return redirect()
			->back()
			->withInput($request->except('_token'))
			->with('flash_error', $this->message)
			->with('has_icon', 'true');
	}
}
