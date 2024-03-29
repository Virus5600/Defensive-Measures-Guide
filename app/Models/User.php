<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Laravel\Sanctum\HasApiTokens;

use DB;
use Exception;
use Log;

class User extends Authenticatable
{
	use Notifiable, SoftDeletes, HasApiTokens;

	protected $fillable = [
		'username',
		'first_name',
		'middle_name',
		'last_name',
		'suffix',
		'email',
		'avatar',
		'user_type_id',
		'login_attempts',
		'locked',
		'locked_by',
		'password',
		'last_auth',
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
		'deleted_at' => 'datetime',
		'last_auth' => 'datetime',
	];

	protected $with = [
		'userType.permissions',
		'userPerm'
	];

	// Relationships
	public function userType() { return $this->belongsTo('App\Models\UserType'); }
	protected function passwordReset() { return $this->belongsTo('App\Models\PasswordReset'); }
	public function userPerm() { return $this->hasMany('App\Models\UserPermission'); }
	public function userPerms() { return $this->belongsToMany('App\Models\Permission', 'user_permissions'); }

	// Custom Functions
	public function permissions() {
		if ($this->userPerm->count() <= 0)
			$perms = $this->userType->permissions;

		return $perms ?? $this->userPerm;
	}

	public function isUsingTypePermissions() {
		return $this->userPerm->count() <= 0;
	}

	public function hasPermission(...$permissions) {
		$matches = 0;
		$usingTypePermissions = $this->isUsingTypePermissions();
		$perms = $this->permissions();

		if (is_array($permissions[0]))
			$permissions = $permissions[0];

		foreach ($perms as $p) {
			if ($usingTypePermissions) {
				if (in_array($p->slug, $permissions)) {
					$matches += 1;
				}
			}
			else {
				if (in_array($p->permission->slug, $permissions)) {
					$matches += 1;
				}
			}
		}

		return $matches == count($permissions);
	}

	public function hasSomePermission(...$permissions) {
		$usingTypePermissions = $this->isUsingTypePermissions();
		$perms = $this->permissions();

		if (is_array($permissions[0]))
			$permissions = $permissions[0];

		foreach ($perms as $p) {
			if ($usingTypePermissions) {
				if (in_array($p->slug, $permissions)) {
					return true;
				}
			}
			else {
				if (in_array($p->permission->slug, $permissions)) {
					return true;
				}
			}
		}
	}

	public function getAvatar($useDefault=false, $getFull=true, $isUrl=true) {
		$avatarF = $this->avatar;
		$avatarU = asset('/uploads/users/'.$this->avatar);
		$avatarD = asset('/uploads/users/default.png');
		$toRet = null;

		if ($useDefault) {
			if ($getFull)
				return $avatarD;
			else
				return 'default.png';
		}
		else {
			if ($getFull) {
				$toRet = $avatarU;
			}
			else {
				$toRet = $avatarF;
			}
		}

		if ($isUrl)
			return $toRet;
		return "<img src=\"" . asset($toRet) . "\" class=\"avatar avatar-3 rounded-circle\">";
	}

	public function getName($include_middle = false) {
		return $this->first_name . ($include_middle ? (' ' . $this->middle_name . ' ') : ' ') . $this->last_name;
	}

	// STATIC FUNCTIONS
	public static function getIP() {
		$ip = request()->ip();

		if (!empty($_SERVER['HTTP_CLIENT_IP']))
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else
			$ip = $_SERVER['REMOTE_ADDR'];

		return $ip;
	}

	public static function showRoute($id) {
		$user = User::withTrashed()->find($id);

		if ($user == null)
			return "javascript:SwalFlash.info(`Cannot Find Item`, `Item may already be deleted or an anonymous user.`, true, false, `center`, false);";
		return route('admin.users.show', [$id]);
	}
}
