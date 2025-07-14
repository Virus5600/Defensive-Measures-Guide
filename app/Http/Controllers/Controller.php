<?php

namespace App\Http\Controllers;

use App\Enums\Types\EmailVerificationType;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Validation\Validator as Validated;
use Exception;
use InvalidArgumentException;

class Controller extends BaseController
{
	use AuthorizesRequests, ValidatesRequests;

	const ADMIN_QUERY_PARAMS = ['search', 'sort', 'direction', 'page'];
	const EXCEPT = ['_token', '_method', 'bearer', 'search', 'sort', 'direction', 'page'];

	/**
	 * Format the errors from the validator into a format that allows
	 * XHR requests to easily parse the errors.
	 *
	 * @param Validated $validator
	 * @return array
	 */
	protected function formatErrors(Validated $validator): array
	{
		$errors = $validator->errors()->getMessages();
		$obj = $validator->failed();
		$result = [];
		foreach ($obj as $input => $rules) {
			$i = 0;
			foreach ($rules as $rule => $ruleInfo) {
				$rule = $input . '[' . strtolower($rule) . ']';
				$result[$rule] = $errors[$input][$i];
				$i++;
			}
		}
		return $result;
	}

	/**
	 * Include the parameters from the request that are in the list of
	 * parameter names.
	 *
	 * @param array $paramNames The list of parameter names to include.
	 * @param bool $handleNonExistence Whether to handle non-existent parameters. (Optional)
	 * @param bool $extractPreviousUrlParams Whether to extract the query parameters from the previous URL. (Optional)
	 *
	 * @return array
	 */
	protected function includeParams(array $paramNames, bool $handleNonExistence = true, $extractPreviousUrlParams = false): array
	{
		$params = [];
		foreach ($paramNames as $paramName)
			$params[$paramName] = request()->{$paramName} ?? ($handleNonExistence ? '' : null);

		if ($extractPreviousUrlParams)
			$params = array_merge(
				$params,
				extractQueryParams(url()->previous())
			);

		return $params;
	}

	/**
	 * Fetches the parameters from the request that are included in the `Controller::ADMIN_QUERY_PARAMS`
	 * constant. If the parameter does not exist, it will be set to `null` (by default) unless the
	 * `handleEmpty` parameter is set to `false`.
	 *
	 * By default, this method will filter out any parameters that are `null`. To disable this, set
	 * the `filter` parameter to `false`. Furthermore, this method will also extract the query parameters
	 * from the previous URL if the `usePrevParams` parameter by default unless set to `false`.
	 *
	 * @param bool $handleEmpty Whether to handle empty parameters. (Optional)
	 * @param bool $usePrevParams Whether to extract the query parameters from the previous URL. (Optional)
	 * @param bool $filter Whether to filter out `null` parameters. (Optional)
	 *
	 * @return array The fetched parameters.
	 */
	protected function fetchAdminParams(bool $handleEmpty = true, bool $usePrevParams = true, bool $filter = true): array
	{
		$array = $this->includeParams(
			paramNames: self::ADMIN_QUERY_PARAMS,
			handleNonExistence: $handleEmpty,
			extractPreviousUrlParams: $usePrevParams
		);

		return $filter
			? array_filter($array, fn($v) => $v != null)
			: $array;
	}

	/**
	 * Provides the redirection after a delete action has been performed.
	 *
	 * @param string $fallback The fallback route to redirect to if the previous route is not viable.
	 * @param string $showRouteName The name of the **`show`** route of the said feature.
	 * @param string $showRouteParams The parameters of the **`show`** route. (Optional)
	 */
	protected function redirectAfterDelete(string $fallback, string $showRouteName, array $showRouteParams = [])
	{
		$referrer = request()->header('referer');

		return $redirect = $referrer && $referrer == route($showRouteName, $showRouteParams)
			? redirect()->route($fallback)
			: redirect()->back();
	}

	/**
	 * Updates the account to require verification again. This will make the user unverified
	 * and unable to do anything unless the account is verified.
	 *
	 * This method will also send an email to the user to verify their account.
	 *
	 * For ease of use, this method will automatically get the authenticated user if no user
	 * is provided. Furthermore, this method will automatically generate a new token if the
	 * user does not have an existing token.
	 *
	 * In addition to that, the email arguments will be merged with the additional arguments
	 * to allow for more customization. The default arguments are:
	 * - subject: The subject of the email.
	 * - user: The user data.
	 * - email: The email of the user.
	 * - recipients: The recipients of the email.
	 * - code: The verification code.
	 *
	 * ***These arguments cannot be overridden.***
	 *
	 * @param EmailVerificationType|string $type The type of account to re-verify. Allowed values are provided by the `EmailVerificationType` enum.
	 * @param Illuminate/Validation/Validator $validator The validator instance.
	 * @param User $user The user to re-verify. Defaults to the authenticated user. (Optional but recommended)
	 * @param array $args Additional arguments to pass to the email view. (Optional)
	 *
	 * @throws Exception
	 */
	protected function reVerifyAccount(EmailVerificationType|string $type, \Illuminate\Validation\Validator $validator, User $user = null, array $args = []): void
	{
		if ($user == null) {
			if (auth()->check())
				$user = auth()->user();
			else
				throw new Exception('No user provided and no authenticated user found.');
		}

		if (!$type instanceof EmailVerificationType) {
			$type = EmailVerificationType::tryFromValue($type) ?? EmailVerificationType::ACCOUNT_VERIFICATION;
		}

		$cleanData = (object) $validator->validated();
		if (!property_exists($cleanData, 'email') || $cleanData->email == null)
			$cleanData->email = $user->email;

		$user->is_verified = 0;
		$user->save();
		if ($user->accountVerification()->count() <= 0) {
			$user->accountVerification()->create([
				'token' => substr(bin2hex(random_bytes(32)), 0, 16),
				'expires_at' => now()->addDay()
			]);
		} else {
			$user->accountVerification->generateToken();
		}

		// MAILER
		$args = array_merge($args, [
			'subject' => $type->getEmailSubject(),
			'user' => $user,
			'email' => $cleanData->email,
			'recipients' => [$cleanData->email],
			'code' => $user->accountVerification->token
		]);

		// TDOO: Uncomment this when the AccountNotification is implemented.
		\Log::info("Re-verification email sent to {$cleanData->email}. (TESTING)");
		// AccountNotification::dispatchAfterResponse(
		// 	user: $user,
		// 	type: $type,
		// 	args: $args,
		// 	callOnDestruct: true
		// )->onQueue($type());
	}

	/**
	 * Queries the provided model class using the ORM using the given defined values
	 * for query. This allows the query to be reused multiple times without rewriting
	 * the ORM query.
	 *
	 * The function returns an array containing the column to be sorted, the direction
	 * of the sort, the queried model, and the columns allowed for sorting.
	 *
	 * @param Request $req The current request.
	 * @param string $class The model class using the magic `::class`.
	 *
	 * @return array An array containing the following in order:
	 * - Sort column
	 * - Sort direction
	 * - Sortable columns
	 * - Queried model with aliases
	 *
	 * @throws InvalidArgumentException	when the `$class` does not exists.
	 *
	 * @see Controller::setAliases()	Alias setter.
	 */
	protected function adminQuery(Request $req, string $class): array
	{
		if (!class_exists($class))
			throw new InvalidArgumentException("'{$class}' does not exists.");

		// Sortable Columns
		$sortable = $class::SORTABLE ?? [];
		$colAlias = $class::COLUMN_ALIAS ?? [];
		$tableName = (new $class)->getTable();

		// Sort Column Target
		if ($req->has('sort') && in_array($req->sort, $sortable)) {
			$sort = $req->sort;
		} else {
			$sort = "{$tableName}.created_at";
		}

		// Sort Direction
		if ($req->has('direction') && in_array($req->direction, ['asc', 'desc'])) {
			$direction = $req->direction;
		} else {
			$direction = 'desc';
		}

		// Sets the builder
		$builder = count($colAlias) > 0
			? self::setAliases($class, $colAlias)
			: $class::query();

		return [
			$sort,
			$direction,
			$sortable,
			$builder
		];
	}

	/**
	 * Sets the aliases for the table columns. This method will set the aliases for the
	 * columns, equations, and functions provided in the `$aliases` array. The `$builder`
	 * parameter can either be a `Model`'s subclass, or an instance of `Builder`
	 * while the `$aliases` parameter should be a key-value pair (map) wherein the
	 * ***key*** is the alias name while the ***value*** defines what the alias's value
	 * will be.
	 *
	 * Example Usage:
	 * ```php
	 * $aliases = [
	 * 	"full_name" => "CONCAT(users.first_name, \" \", users.last_name)",
	 * 	"users.created_at" => "user_creation_date"
	 * ];
	 * setAliases(User::class, $aliases);
	 * setAliases(User::query(), $aliases);
	 * ```
	 *
	 * This example will create a new property called `full_name` with both the user's
	 * first and last name concatenated together. The `users.created_at` column will
	 * also now have an alias called `user_creation_date`.
	 *
	 * The advantage of this over the normal aliasing is that the alias here could be
	 * used within `WHERE` statements since the aliases are made in the sub-select
	 * function.
	 *
	 * ---
	 *
	 * @param string|Builder $builder The eloquent model class or instance where the query will be done.
	 * @param array $aliases A map of an SQL functions, columns, and/or equations.
	 * @param bool $toRawSql Whether to return the raw SQL query. (Optional)
	 *
	 * @return Builder|String an Eloquent Builder or if `$toRawSql` is set to `true`, the raw SQL query.
	 *
	 * @throws InvalidArgumentException when the provided `$builder` value is not the proper type.
	 */
	protected function setAliases(string|Builder $builder, array $aliases, bool $toRawSql = false): Builder|String
	{
		$tableName = null;
		if (is_string($builder)) {
			$builder = (new $builder)::query();
		} else if ($builder instanceof Builder) {
			$builder = $builder;
		} else {
			throw new InvalidArgumentException('Invalid table type provided. Needed string or Builder instance but instead, got ' . get_class($builder) . ' is provided');
		}

		$tableName = $builder->getModel()->getTable();

		$builder->from(
			function ($q) use ($aliases, $tableName) {
				$q
					->from($tableName)
					->select("{$tableName}.*");

				foreach ($aliases as $col => $alias)
					$q->selectRaw("{$col} AS {$alias}");
			},
			$tableName
		);

		if ($toRawSql)
			return $builder->toRawSql();
		return $builder;
	}
}
