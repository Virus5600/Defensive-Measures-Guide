<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

use App\Models\BaseModel as Model;

use ValueError;

class User extends Model implements
	AuthenticatableContract,
	AuthorizableContract,
	CanResetPasswordContract
{
	use Notifiable,
		HasFactory,
		SoftDeletes,
		Authenticatable,
		Authorizable,
		CanResetPassword,
		MustVerifyEmail;

	protected $fillable = [
		'username',
		'first_name',
		'middle_name',
		'last_name',
		'suffix',
		'email',
		'user_type_id',
		'password',
	];

	protected $hidden = [
		'password',
		'remember_token',
		'permissions',
	];

	protected $with = [
		'userType.permissions',
		'userPerm'
	];

	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
		'permissions' => 'array',
		'is_verified' => 'boolean',
		'locked' => 'boolean',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
		'deleted_at' => 'datetime',
		'last_auth' => 'datetime',
	];

	// Relationships
	public function userType(): BelongsTo
	{
		return $this->belongsTo(UserType::class);
	}
	protected function passwordReset(): BelongsTo
	{
		return $this->belongsTo(PasswordReset::class);
	}
	public function userPerm(): HasMany
	{
		return $this->hasMany(UserPermission::class);
	}
	public function userPerms(): BelongsToMany
	{
		return $this->belongsToMany(Permission::class, 'user_permissions');
	}

	// Custom Functions
	/**
	 * Fetches the permissions of this user. This automatically checks where to look
	 * by first checking if the user has individual permissions attached to them. If they
	 * do, then user permissions will be returned. Otherwise, the permissions of the user
	 * type will be returned.
	 *
	 * @param bool $grouped If `true`, returns the permissions grouped by parent. (Default: `false`)
	 * @param bool $asArr If `true`, returns an array. Returns an object otherwise. (Default: `false`)
	 *
	 * @return object|array
	 */
	public function permissions(bool $grouped = false, bool $asArr = false): object|array
	{
		$perms = $this->userType->permissions($grouped, $asArr);

		if (!$this->isUsingTypePermissions()) {
			$perms = array_map(
				fn($p) => Permissions::tryFromValue($p),
				$this->permissions
			);

			if ($grouped) {
				$perms = Permissions::grouped($perms, $asArr);
			} else {
				$perms = array_map([Permissions::class, "getData"], $perms);
			}
		}

		return $perms;
	}

	public function isUsingTypePermissions(): bool
	{
		return $this->userType && $this->userType->permissions->isNotEmpty();
	}

	/**
	 * Checks if the user has the specified permission(s) granted to them. If all permissions are found, it will return `true`.
	 *
	 * @param Permissions|array $permissions The permissions to check for.
	 *
	 * @return bool `true` if all permissions are found, `false` otherwise.
	 *
	 * @throws ValueError if the permission is not found.
	 */
	public function hasPermission(Permissions|array ...$permissions): bool
	{
		$matches = 0;
		$perms = $this->permissions();

		if (is_array($permissions[0]))
			$permissions = $permissions[0];

		foreach ($perms as $p) {
			$actualPermission = $p;

			// Convert the permission to an enum if it is a string
			if (is_string($p))
				$p = Permissions::tryFromValue($p);

			// Throws an exception if the permission is not found
			if ($p == null)
				throw new ValueError("No such permission found: '{$actualPermission}'");

			// Check if the permission is in the list of permissions
			if (in_array($p(), $permissions))
				$matches += 1;
		}

		return $matches == count($permissions);
	}

	/**
	 * Checks if the user has some permissions granted to them. If at least 1 permission is found, it will return `true`.
	 *
	 * @param Permissions|array $permissions The permissions to check for.
	 *
	 * @return bool `true` if at least 1 permission is found, `false` otherwise.
	 *
	 * @throws ValueError if the permission is not found.
	 */
	public function hasSomePermission(Permissions|array ...$permissions): bool
	{
		$perms = $this->permissions();

		if (is_array($permissions[0]))
			$permissions = $permissions[0];

		foreach ($perms as $p) {
			$actualPermission = $p;

			// Convert the permission to an enum if it is a string
			if (is_string($p))
				$p = Permissions::tryFromValue($p);

			// Throws an exception if the permission is not found
			if ($p == null)
				throw new ValueError("No such permission found: '{$actualPermission}'");

			// Check if the permission is in the list of permissions
			if (in_array($p(), $permissions)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Gets the name of the user. If `$includeMiddle` is set to `true`, the middle name will also be included in the name.
	 *
	 * @param bool $includeMiddle Whether to include the middle name in the name. By default, it is set to `false`.
	 * @param bool $middleInitial Whether to include the middle name as an initial. By default, it is set to `false`.
	 *
	 * @return string The name of the user.
	 */
	public function getName($includeMiddle = false, $middleInitial = false): string
	{
		$middleName = $includeMiddle ? (" {$this->middle_name} ") : " ";
		$suffix = empty($this->suffix) ? "" : (", {$this->suffix}");

		if ($middleInitial) {
			foreach (explode(" ", trim($this->middle_name)) as $name) {
				$middleName .= strtoupper($name[0]) . ". ";
			}
		}

		return $this->first_name . $middleName . $this->last_name . $suffix;
	}

	/**
	 * Fetches the user's last online status time. This works by checking if the
	 * `last_out` field is `null` or not. If it's not, then it will use that datetime.
	 * If it is, then just show "currently online".
	 *
	 * @return string
	 */
	public function getLastOnline(): string
	{
		if ($this->last_out) {
			return Carbon::parse($this->last_out)
				->diffForHumans();
		}

		return "Currently online";
	}

	/**
	 * Gets the current IP address of the user accessing the website.
	 */
	public function getUserIP()
	{
		return self::getIP();
	}

	// STATIC FUNCTIONS
	public static function getIP()
	{
		$ip = request()->ip();

		if (!empty($_SERVER['HTTP_CLIENT_IP']))
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else
			$ip = $_SERVER['REMOTE_ADDR'];

		return $ip;
	}

	public static function showRoute($id)
	{
		$user = User::withTrashed()->find($id);

		if ($user == null)
			return "javascript:SwalFlash.info(`Cannot Find Item`, `Item may already be deleted or an anonymous user.`, true, false, `center`, false);";
		return route('admin.users.show', [$id]);
	}

	// VALIDATOR RELATED FUNCTIONS
	/**
	 * @inheritdoc
	 *
	 * ## Field Options:
	 * - `first_name`: The user's first name.
	 * - `middle_name`: The user's middle name.
	 * - `last_name`: The user's last name.
	 * - `suffix`: The user's suffix.
	 * - `gender`: The user's gender.
	 * - `username`: The user's username. Has unique rules.
	 * - `email`: The user's email. Has unique rules.
	 * - `password`: The user's password. Has unique rules.
	 *
	 * ---
	 * ## Unique Rules:
	 * ### `username`
	 * - `forgot-password`: The username must exist in the database.
	 * - `register`: The username must be unique in the database.
	 * - `update`: The username must be unique in the database, except for the current user.
	 *
	 * ### `email`
	 * - `register`: The email must be unique in the database.
	 * - `update`: The email must be unique in the database, except for the current user.
	 *
	 * ### `current_password` (Does not exist in the common rules)
	 * - `update`: The current password must match the user's current password.
	 *
	 * ### `password`
	 * - `update`: The password must be confirmed.
	 */
	public static function getValidationRules(...$fields): array
	{
		$uniqueRules = [
			'username' => [
				'forgot-password' => ['exists:users,username'],
				'register' => ['unique:users,username'],
				'update' => Rule::unique('users', 'username')->ignore(auth()->user()?->id ?? 0),
			],
			'email' => [
				'register' => ['unique:users,email'],
				'update' => Rule::unique('users', 'email')->ignore(auth()->user()?->id ?? 0),
			],
			'current_password' => [
				'update' => ['required', 'passwordMatch:users,current_password'],
			],
			'password' => [
				'update' => 'confirmed',
			]
		];

		$rules = [
			'first_name' => ['required', 'string'],
			'middle_name' => ['string', 'nullable'],
			'last_name' => ['required', 'string'],
			'suffix' => ['string', 'max:50', 'nullable'],
			'gender' => ['required', 'string', Rule::in(['male', 'female', 'others'])],
			'username' => ['required', 'string'],
			'email' => ['required', 'email'],
			'password' => ['required', 'string', 'min:8'],
		];

		return BaseModel::getSpecificRules($rules, $fields, $uniqueRules);
	}

	public static function getValidationMessages(): array
	{
		return [
			'first_name.required' => 'First name is required',
			'first_name.string' => 'First name must be a string',
			'middle_name.string' => 'Middle name must be a string',
			'last_name.required' => 'Last name is required',
			'last_name.string' => 'Last name must be a string',
			'suffix.string' => 'Suffix must be a string',
			'suffix.max' => 'Suffix must not exceed 50 characters',
			'gender.required' => 'Gender is required',
			'gender.string' => 'Please select a valid choice',
			'gender.in' => 'Please select a valid choice',
			'username.required' => 'Username is required',
			'username.unique' => 'Username is already taken',
			'username.string' => 'Username must be a string',
			'username.exists' => 'Username is not registered',
			'email.required' => 'Email is required',
			'email.unique' => 'Email is already taken',
			'email.email' => 'Email must be a valid email address',
			'password.required' => 'Password is required',
			'password.string' => 'Password must be a string',
			'password.min' => 'Password must be at least 8 characters long',
			'password.confirmed' => 'Passwords do not match',
		];
	}
}
