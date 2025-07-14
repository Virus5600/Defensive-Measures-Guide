<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;

use Closure;
use Log;

class CallableNumber implements ValidationRule
{
	/**
	 * Defines the pattern for a landline number. The pattern looks complicated and could
	 * be confusing despite being simpler than its mobile counterpart. Here's a breakdown
	 * of the pattern:
	 *
	 * 1) The first capturing group checks if there's an area code number
	 * that may or may not be enclosed in parentheses at the start of the string.
	 *
	 * 2) The second capturing group checks if there's a space or a hyphen after
	 * the area code number. This can be zero or more characters.
	 *
	 * 3) The third capturing group checks the first part of the local number which can be
	 * 3 or 4 digits long.
	 *
	 * 4) Followed by either a space or a hyphen which can be zero or more characters, this
	 * represents the 4th capturing group.
	 *
	 * 5) The 5th and last capturing group checks the last part of the local number
	 * which is 4 digits long at the end of the string.
	 *
	 * If used as a replace pattern, the following format can be used:
	 * ```
	 * $num = (02) 8284-- 4794
	 * $num = trim(preg_replace(
	 * 	$landlinePattern,
	 * 	"$1 $3 $5",
	 * 	$num
	 * ));
	 *
	 * // Output: (02) 8284 4794
	 * ```
	 *
	 * @var string
	 */
	const LANDLINE_PATTERN = "/(^\(?\d{2}\)?)([\s-]*)(\d{3,4})([\s-]*)(\d{4}$)/";
	/**
	 * Defines the pattern for a mobile number. This pattern is more complex and more
	 * confusing so here's a breakdown of the pattern:
	 *
	 * 1) The first capturing group checks if the opening numbers are local network
	 * numbers or the country code followed by the network number.
	 *
	 * 2) The second capturing group checks within the 1st capturing group if the
	 * country code is present. Otherwise, it moves to the 3rd capturing group.
	 *
	 * 3) The third capturing group checks if there's a space or a hyphen after
	 * the area code number. This can be zero or more characters.
	 *
	 * 4) The fourth capturing group checks if the next part is composed of 3 digits with 9 as
	 * the first digit, which is the next part of the local mobile number after the network
	 * number.
	 *
	 * 4) The second capturing group checks if there's a space or a hyphen after
	 * the area code number. This can be zero or more characters.
	 *
	 * 5) The 5th capturing group is only the alternate checker of the 4th capturing group
	 * so that even if the country code is not present, the pattern will still match.
	 *
	 * 6) The sixth capturing group checks for another space or hyphen after the network number.
	 *
	 * 7) The seventh capturing group checks the first part of the local number, which is
	 * 3 digits long.
	 *
	 * 8) The eighth capturing group checks for the space or hypen after the
	 * first part of the local number.
	 *
	 * 9) The ninth and last capturing group checks the last part of the mobile number
	 * which is 4 digits long at the end of the string.
	 *
	 * If used as a replace pattern, the following format can be used:
	 * ```
	 * $num = +63- 922  880- -7282
	 * $num = trim(preg_replace(
	 * 	$mobilePattern,
	 * 	"$2 $4$5 $7 $9",
	 * 	$num
	 * ));
	 *
	 * // Output: +63 922 880 7282
	 * ```
	 *
	 * ```
	 * $num = 0998---220 5844
	 * $num = trim(preg_replace(
	 * 	$mobilePattern,
	 * 	"$2 $4$5 $7 $9",
	 * 	$num
	 * ));
	 *
	 * // Output: 0998 220 5844
	 * ```
	 *
	 * **NOTE:** The `trim()` function is used to remove the leading space from the string.
	 * The leading string only appears on numbers that does not have a country code due to the
	 * `$2 $4$5` pattern, resulting to ` 0998` where the leading space is due to the space
	 * between `$2` and `$4`.
	 *
	 * @var string
	 */
	const MOBILE_PATTERN = "/^((\+63)([\s-]*)(9\d{2})|(09\d{2}))([\s-]*)(\d{3})([\s-]*)(\d{4}$)/";
	const MESSAGE = 'The :attribute is not a valid callable number.';

	public $implicit = true;

	public function validate(string $attribute, mixed $value, Closure $fail): void
	{
		$mode = $this->parameters[0] ?? null;
		if (is_null($mode)) $mode = "and";
		if (!in_array(strtolower($mode), ["and", "or", "mobile", "landline"])) $mode = "and";

		if ($this->pass($attribute, $value, [$mode])) return;

		$fail(self::MESSAGE)->translate([
			'attribute' => $attribute,
			'value' => $value,
			'mode' => $mode === "and" ? "callable" : $mode
		]);
	}

	public function pass(string $attribute, mixed $value, array $params): bool
	{
		$mode = $params[0] ?? null;
		if (is_null($mode)) $mode = "or";
		if (!in_array(strtolower($mode), ["and", "or", "mobile", "landline"])) $mode = "and";

		Log::info([$attribute, $value, $mode]);
		$result = match (strtolower($mode)) {
			"and" => $this->isMobileNumber($value) && $this->isLandlineNumber($value),
			"or" => $this->isMobileNumber($value) || $this->isLandlineNumber($value),
			"mobile" => $this->isMobileNumber($value),
			"landline" => $this->isLandlineNumber($value)
		};

		return $result;
	}

	protected function isMobileNumber(string $value): bool
	{
		return preg_match(self::MOBILE_PATTERN, $value);
	}

	protected function isLandlineNumber(string $value): bool
	{
		return preg_match(self::LANDLINE_PATTERN, $value);
	}
}
