<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
	protected $fillable = [
		'parent_permission',
		'name',
		'slug'
	];

	// Relationships
	public function userTypes() { return $this->belongsToMany('App\Model\UserType'); }
	public function users() { return $this->belongsToMany('App\Model\User'); }

	// Custom Functions
	public function childPermissions() {
		return Permission::where('id', '=', $this->id)->get();
	}

	public function parentPermission() {
		return Permission::where('id', '=', $this->parent_permission)->first();
	}

	public function allUsers() {
		$typeIds = array();
		foreach ($this->types as $d)
			array_push($typeIds, $d->id);

		$userIds = array();
		foreach ($this->users as $u)
			array_push($userIds, $u->id);

		$users = User::whereIn('user_type_id', $typeIds)
			->whereIn('id', $userIds, 'or');

		return $users->get();
	}

	// STATIC FUNCTIONS
	public static function showRoute($id) {
		$permission = Permission::find($id);

		if ($permission == null)
			return "javascript:SwalFlash.info(`Cannot Find Item`, `Item may already be deleted or an anonymous user.`, true, false, `center`, false);";
		return route('admin.permissions.show', [$permission->slug]);
	}
}