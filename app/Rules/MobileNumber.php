<?php

namespace App\Rules;

use Closure;
use Log;

class MobileNumber extends CallableNumber
{

	const MESSAGE = 'The :attribute is not a valid mobile number.';

	public $implicit = true;

	public function validate(string $attribute, mixed $value, Closure $fail): void
	{
		if (!$this->isMobileNumber($value)) $fail(self::MESSAGE);
	}

	public function pass(string $attribute, mixed $value, array $params): bool
	{
		return $this->isMobileNumber($value);
	}
}
