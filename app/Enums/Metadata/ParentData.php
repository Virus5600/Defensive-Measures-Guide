<?php

namespace App\Enums\Metadata;

use ArchTech\Enums\Meta\MetaProperty;
use Attribute;

/**
 * A metadata class for an enum, allowing values to designate a parent.
 */
#[Attribute]
class ParentData extends MetaProperty
{
	public static function method(): string
	{
		return "parent";
	}

	/**
	 * Groups the permissions by parent.
	 *
	 * When the `$permission` variable contains a child with no parent, it will
	 * not be added to the group. Thus, the parent should also be included in the
	 * passed array in order to group the said child item.
	 *
	 * @param array $permissions The list of permissions to group.
	 *
	 * @return array
	 */
	public static function grouped(array $permissions): array
	{
		$parentPerm = array_map(
			fn($p) => $p->parent() == null ? $p : null,
			$permissions
		);
		$parentPerm = array_filter(
			$parentPerm,
			fn($p) => $p != null
		);

		$groupedPerm = [];
		array_walk(
			$permissions,
			function ($p) use (&$groupedPerm, $parentPerm) {
				if (!in_array($p, $parentPerm)) {
					$key = $p->parent()();

					if (!key_exists($key, $groupedPerm)) {
						$groupedPerm[$key] = [];
					}

					array_push($groupedPerm[$key], $p);
				}
			}
		);

		// ADD THE PARENTS
		$groupedPerm["PARENT"] = $parentPerm;
		return $groupedPerm;
	}
}
