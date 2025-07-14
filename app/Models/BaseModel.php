<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BaseModelTraits;

/**
 * The base class for all models that will be used. Having this base
 * allows for easier management of all models that will be used. General
 * settings, configurations, properties, and functions can be placed here
 * and this will be inherited by all models.
 *
 * @package App\Models
 */
abstract class BaseModel extends Model
{
	// Use the BaseModelTraits. This was done so that even the User model can use the BaseModelTraits
	use BaseModelTraits;

	/**
	 * Get the validation rules for the specified fields. If no fields are specified,
	 * all fields will be returned.
	 *
	 * @param string $fields The fields to get the validation rules for. If not specified, all fields will be returned.
	 *
	 * @return array The validation rules for the specified fields.
	 *
	 * ---
	 *
	 * Some fields have unique rules that are dependent on the action being performed. Some
	 * of which are the `username` and `email` fields, with both having `register` and `update`
	 * unique rules, and an additional `forgot-password` unique rule for the `username` field.
	 *
	 * To include the unique rules, add the action as an option to the field. For example, to
	 * get the unique rules for the `username` field for the `register` action, you would call
	 * the function like so: `getValidationRules('username:register')`. In this manner, the rules
	 * for the `username` field for the `register` action will be returned, along with the common
	 * rules for the `username` field. Also, multiple unique rules can be added to a field by separating them with a comma.
	 *
	 * ## Example:
	 * ```php
	 * // Without unique rules:
	 * $rules = User::getValidationRules('username');
	 * // Output: ['username' => ['required', 'string']]
	 *
	 * // With unique a rule:
	 * $rules = User::getValidationRules('username:register');
	 * // Output: ['username' => ['required', 'string', 'unique:users,username']]
	 *
	 * // With multiple unique rules:
	 * $rules = User::getValidationRules('username:register,forgot-password');
	 * // Output: ['username' => ['required', 'string', 'unique:users,username', 'exists:users,username']]
	 * ```
	 */
	abstract public static function getValidationRules(...$fields): array;

	/**
	 * Get the validation messages for all the fields.
	 *
	 * When overriding this function, ensure that the keys are in the format of `field.rule`
	 * where `field` is the name of the field and `rule` is the name of the rule. For
	 * example, the message for the `required` rule for the `username` field would be
	 * `username.required`.
	 *
	 * Additionally, when writing the message, you can use placeholders to insert values
	 * related to the validation rule. For a more details, see
	 * {@link https://laravel.com/docs/11.x/validation#manual-customizing-the-error-messages
	 * Laravel documentation}.
	 *
	 * @return array The validation messages for all the fields.
	 */
	abstract public static function getValidationMessages(): array;

	////////////////////////////////////
	// PROTECTED FUNCTIONS AS HELPERS //
	////////////////////////////////////
	/**
	 * Get the specific rules for the fields that may or may not have unique rules.
	 *
	 * @param array $rules The rules for all the fields.
	 * @param array $fields The fields to get the specific rules for.
	 * @param array $uniqueRules The unique rules for the fields. Optional.
	 *
	 * @return array The specific rules for the fields.
	 */
	protected static function getSpecificRules(array $rules, array $fields, array $uniqueRules = []): array
	{
		if ($fields == null || count($fields) <= 0)
			return $rules;

		$toRet = [];
		foreach ($fields as $field) {
			// Check if the field has options
			$fieldOpt = preg_split('/[:]/', $field, -1, PREG_SPLIT_NO_EMPTY);
			$field = $fieldOpt[0];
			$fieldOpt = preg_split('/[,]/', $fieldOpt[1] ?? '', -1, PREG_SPLIT_NO_EMPTY);

			// Update the unique rule for the a field that's present in the uniqueRules array
			if (array_key_exists($field, $uniqueRules)) {
				foreach ($fieldOpt as $opt) {
					if (array_key_exists($opt, $uniqueRules[$field])) {
						# Run a check first if the rule is already in the array. If
						# it is not, then add it.
						if (!key_exists($field, $rules))
							$rules[$field] = [];

						$rules[$field] = array_diff($rules[$field], $uniqueRules[$field][$opt]);
					}
				}
			}

			if (array_key_exists($field, $rules))
				$toRet[$field] = $rules[$field];
		}

		return $toRet;
	}
}
