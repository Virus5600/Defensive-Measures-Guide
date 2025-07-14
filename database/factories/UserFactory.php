<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\UserType;

use InvalidArgumentException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
	/**
	 * The current password being used by the factory.
	 */
	protected static ?string $password;

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		$userTypeIds = UserType::pluck('id')->toArray();
		$locked = fake()->boolean(80);
		$lockedBy = $locked ? fake()->ipv4() : null;

		return [
			'username' => fake()->unique()->userName(),
			'first_name' => fake()->firstName(),
			'middle_name' => fake()->optional()->lastName(),
			'last_name' => fake()->lastName(),
			'suffix' => fake()->optional()->suffix(),
			'email' => fake()->unique()->safeEmail(),
			'user_type_id' => fake()->optional()->randomElement($userTypeIds),
			'is_verified' => fake()->boolean(),
			'locked' => $locked,
			'locked_by' => $lockedBy,
			'password' => static::$password ??= Hash::make('password'),
			'remember_token' => Str::random(10),
		];
	}

	/**
	 * Provides a user with a specific username.
	 *
	 * @param string $username The username to be used.
	 */
	public function username(string $username): static
	{
		return $this->state(fn(array $attributes) => [
			'username' => $username,
		]);
	}

	/**
	 * Provides a user with a specific first name.
	 *
	 * @param string $firstName The first name to be used.
	 */
	public function firstName(string $firstName): static
	{
		return $this->state(fn(array $attributes) => [
			'first_name' => $firstName,
		]);
	}

	/**
	 * Provides a user with a specific middle name.
	 *
	 * @param string $middleName The middle name to be used.
	 */
	public function middleName(string $middleName): static
	{
		return $this->state(fn(array $attributes) => [
			'middle_name' => $middleName,
		]);
	}

	/**
	 * Provides a user with a specific last name.
	 *
	 * @param string $lastName The last name to be used.
	 */
	public function lastName(string $lastName): static
	{
		return $this->state(fn(array $attributes) => [
			'last_name' => $lastName,
		]);
	}

	/**
	 * Provides a user with a specific suffix.
	 *
	 * @param string $suffix The suffix to be used.
	 */
	public function suffix(string $suffix): static
	{
		return $this->state(fn(array $attributes) => [
			'suffix' => $suffix,
		]);
	}

	/**
	 * Provides a user with a specific email address.
	 *
	 * @param string $email The email address to be used.
	 */
	public function email(string $email): static
	{
		return $this->state(fn(array $attributes) => [
			'email' => $email,
		]);
	}

	/**
	 * Provides a user with a specific user type.
	 *
	 * The `$userType` is based on the `user_types`. On the other hand, the `$forTest`
	 * parameter is used to determine if the user type is for testing purposes.
	 *
	 * If the `$forTest` parameter is set to `true`, the failsafe will be turned off
	 * to prevent checks on whether the user type exists or not.
	 *
	 * @param int $userType The user type to be used.
	 * @param bool $forTest Indicates if the user type is for testing purposes. Defaults to `false`.
	 */
	public function userType(int $userType, bool $forTest = false): static
	{
		if ($forTest) {
			if ($userType < 1) {
				throw new InvalidArgumentException("{$userType} is not a valid mock ID.");
			}
		} else {
			if ($userType < 1 || $userType > UserType::count()) {
				throw new InvalidArgumentException("{$userType} is not a valid user type.");
			}
		}

		return $this->state(function (array $attributes) use ($userType) {
			$toRet = ['user_type_id' => $userType];
			return $toRet;
		});
	}

	/**
	 * Provides a user with a specific password credential.
	 *
	 * @param string $password The password to be used.
	 * @param bool $isHashed Indicates if the password is already hashed. Defaults to `false`.
	 */
	public function password(string $password, bool $isHashed = false): static
	{
		if (!$isHashed)
			$password = Hash::make($password);

		return $this->state(fn(array $attributes) => [
			'password' => $password,
		]);
	}

	/**
	 * Indicate that the model's email address should be unverified.
	 */
	public function unverified(): static
	{
		return $this->state(fn(array $attributes) => [
			'is_verified' => 0,
		]);
	}

	/**
	 * Indicate that the model's email address should be verified.
	 */
	public function verified(): static
	{
		return $this->state(fn(array $attributes) => [
			'is_verified' => 1,
		]);
	}

	/**
	 * Indicate that the model's email address should be randomly verified.
	 */
	public function randomVerified(): static
	{
		return $this->state(fn(array $attributes) => [
			'is_verified' => rand(0, 1),
		]);
	}
}
