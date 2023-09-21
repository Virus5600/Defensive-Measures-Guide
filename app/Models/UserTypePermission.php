<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTypePermission extends Model
{
	protected $fillable = [
		'user_type_id',
		'permission_id'
	];

	// Relationship Functions
	public function userType() { return $this->belongsTo('App\Models\UserType'); }
	public function permission() { return $this->belongsTo('App\Models\Permission'); }
}