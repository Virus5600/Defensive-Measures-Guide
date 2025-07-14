<?php

namespace App\Enums\Lists;

use ArchTech\Enums\Metadata;
use ArchTech\Enums\Meta\Meta;

use App\Traits\BaseEnumTraits;
use App\Enums\Metadata\ParentData;

use Str;

/**
 * @method Permissions parent()
 */
#[Meta(ParentData::class)]
enum Permissions: string
{
	use BaseEnumTraits, Metadata;

	#[ParentData(null)]
	case ADMIN_DASHBOARD = "admin_dashboard";

	#[ParentData(Permissions::ADMIN_DASHBOARD)]
	case ADMIN_GRAPHS = "admin_graphs";

	/**
	 * Returns the name of the permissions.
	 *
	 * @return string
	 */
	public function getName(): string
	{
		return Str::of($this())
			->replace('_', ' ')
			->title();
	}

	/**
	 * Returns the description of the permissions.
	 */
	public function getDescription(): string
	{
		return match ($this) {
			self::ADMIN_DASHBOARD => "Grants access to the admin dashboard.",
			self::ADMIN_GRAPHS => "Shows the graphs in the admin dashboard.",
			default => null
		};
	}

	/**
	 * Returns all direct child permissions of this permission.
	 *
	 * @return array An array consisting of all its direct child permission. Empty array if none.
	 */
	public function getChildren(): array
	{
		foreach (self::values() as $slug) {
			$perm = Permissions::tryFromValue($slug);
			$children = [];

			if ($perm->parent() == $this)
				array_push($children, $perm);

			return $children;
		}

		return [];
	}

	/**
	 * Returns a grouped permissions either as an object or an array. Returns an object by default.
	 *
	 * @param array $permissions The list of permissions to group.
	 * @param bool $asArr Determines whether the group will be returned as an `array` or `object`.
	 *
	 * @return object|array
	 */
	public static function grouped(array $permissions, bool $asArr = false): object|array
	{
		$groupedArr = ParentData::grouped($permissions);
		$groupedObj = $asArr ? [] : (object) [];

		array_walk(
			$groupedArr,
			function ($v, $k) use (&$groupedObj, $asArr) {
				$perm = Permissions::tryFromValue($k);
				if ($perm == null && $k !== "PARENT") return;

				$values = null;
				if ($k === "PARENT") {
					$values = collect(array_map([Permissions::class, "getData"], $v));
				} else {
					$values = [
						"name" => $perm->getName(),
						"slug" => $perm(),
						"description" => $perm->getDescription(),
						"children" => collect(array_map([Permissions::class, "getData"], $v))
					];
				}

				if ($asArr)
					$groupedObj[$k] = $values;
				else
					$groupedObj->{$k} = (object) $values;
			}
		);

		return $groupedObj;
	}

	/**
	 * Gets the data of the given permission, returning the following as an object:
	 * - `name` - The name of the permission
	 * - `slug` - The snake-case name of the permission
	 * - `description` - The description of the permission. If none was given, this field will be `null`
	 * - `children` - An array containing the children of this permission (if there are any)
	 */
	public static function getData($permission): object
	{
		return (object) [
			"name" => $permission->getName(),
			"slug" => $permission(),
			"description" => $permission->getDescription(),
			"children" => $permission->getChildren(),
		];
	}
}
