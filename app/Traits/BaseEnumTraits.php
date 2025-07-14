<?php

namespace App\Traits;

use ArchTech\Enums\Comparable;
use ArchTech\Enums\From;
use ArchTech\Enums\InvokableCases;
use ArchTech\Enums\Names;
use ArchTech\Enums\Values;

use Exception;

trait BaseEnumTraits
{
	use InvokableCases, Names, Values, From, Comparable;

	/**
	 * Gets the Enum by value.
	 *
	 * @throws Exception
	 */
	public static function fromValue(string $value): static
	{
		$cases = array_filter(
			static::cases(),
			fn($c) => $c->value === $value
		);

		return array_values($cases)[0] ?? throw new Exception('"' . $value . '" is not a valid value for enum ' . static::class . '');
	}

	/**
	 * Gets the Enum by value, if it exists.
	 */
	public static function tryFromValue(string $value): ?static
	{
		$cases = array_filter(
			static::cases(),
			fn($c) => $c->value === $value
		);

		return array_values($cases)[0] ?? null;
	}
}
