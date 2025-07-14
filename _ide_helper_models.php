<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PasswordReset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PasswordReset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PasswordReset query()
 */
	class PasswordReset extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $parent_permission
 * @property string $name
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereParentPermission($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereUpdatedAt($value)
 */
	class Permission extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $value
 * @property string $default_value
 * @property int $is_file
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings whereDefaultValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings whereIsFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Settings whereValue($value)
 */
	class Settings extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $website
 * @property string $url
 * @property string $icon
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks whereWebsite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialLinks withoutTrashed()
 */
	class SocialLinks extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $username
 * @property string $first_name
 * @property string|null $middle_name
 * @property string $last_name
 * @property string|null $suffix
 * @property string $email
 * @property int|null $user_type_id
 * @property int $login_attempts
 * @property bool $is_verified
 * @property bool $locked
 * @property string|null $locked_by
 * @property string $password
 * @property \Illuminate\Support\Carbon|null $last_auth
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserPermission> $userPerm
 * @property-read int|null $user_perm_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Permission> $userPerms
 * @property-read int|null $user_perms_count
 * @property-read \App\Models\UserType|null $userType
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLastAuth($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLocked($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLockedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLoginAttempts($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereMiddleName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereSuffix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUserTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutTrashed()
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\Authenticatable, \Illuminate\Contracts\Auth\Access\Authorizable, \Illuminate\Contracts\Auth\CanResetPassword {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $permission_id
 * @property-read \App\Models\Permission $permission
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPermission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPermission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPermission query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPermission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPermission wherePermissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPermission whereUserId($value)
 */
	class UserPermission extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserType withoutTrashed()
 */
	class UserType extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_type_id
 * @property int $permission_id
 * @property-read \App\Models\Permission $permission
 * @property-read \App\Models\UserType $userType
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTypePermission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTypePermission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTypePermission query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTypePermission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTypePermission wherePermissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTypePermission whereUserTypeId($value)
 */
	class UserTypePermission extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $tag
 * @property string $version
 * @property int $major_version
 * @property int $minor_version
 * @property int $patch_version
 * @property string $description
 * @property array<array-key, mixed> $changelog
 * @property array<array-key, mixed> $compatibility
 * @property array<array-key, mixed> $release_date
 * @property array<array-key, mixed>|null $bedrock_link
 * @property array<array-key, mixed>|null $java_link
 * @property string $banner
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereBedrockLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereChangelog($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereCompatibility($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereJavaLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereMajorVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereMinorVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version wherePatchVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version whereVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Version withoutTrashed()
 */
	class Version extends \Eloquent {}
}

