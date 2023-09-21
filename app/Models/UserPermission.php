<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Log;

class UserPermission extends Model
{
	protected $fillable = [
		'user_id',
		'permission_id'
	];

	// Relationship Functions
	public function user() { return $this->belongsTo('App\Models\User'); }
	public function permission() { return $this->belongsTo('App\Models\Permission'); }

	// Custom Functions
	public function isDuplicate($permission = null) {
		if ($permission === null)
			$permission = $this->id;

		return UserPermission::isDuplicatePermission($permission, $this->id);
	}

	// STATIC FUNCTIONS
	public static function isDuplicatePermission($permission, $user) {
		// Permission checking
		if ($permission instanceof Permission) {
			$permission = $permission0->id;
		}
		else if (gettype($permission) != 'integer') {
			Log::warning('Inserted $user not an ID nor an instance of User...');
			return false;
		}

		// User checking
		if ($user instanceof User) {
			$user = $user->id;
		}
		else if (gettype($user) != 'integer') {
			Log::warning('Inserted $user not an ID nor an instance of User...');
			return false;
		}

		return UserPermission::where('user_id', '=', $user)
			->where('permission_id', '=', $permission)
			->first() != null;
	}
}