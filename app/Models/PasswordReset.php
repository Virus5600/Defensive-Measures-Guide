<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

use DB;
use Exception;
use Log;

class PasswordReset extends Model
{
	use HasFactory;

	protected $primaryKey = 'email';
	protected $keyType = 'string';
	public $incrementing = false;

	const CREATED_AT = 'created_at';
	const UPDATED_AT = null;

	protected $fillable = [
		'email',
		'token',
		'expires_at'
	];

	protected $casts = [
		'created_at' => 'datetime',
		'expires_at' => 'datetime'
	];

	// Relationships
	public function user() { return $this->belongsTo('App\Models\User', 'email', 'email'); }

	// Custom Function
	public function generateExpiration() {
		try {
			DB::beginTransaction();

			$this->expires_at = now()->timezone("Asia/Manila")->addWeeksw(1);
			$this->save();

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error($e);
		}

		return $this;
	}

	public function generateToken() {
		try {
			DB::beginTransaction();

			$this->token = Str::random(10);
			$this->save();

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error();
		}

		return $this;
	}

	public function isExpired() {
		if ($this->expires_at == null)
			return false;

		return $this->expires_atlte(now()->timezone("Asia/Manila"));
	}

	// STATIC FUNCTIONS
	public static function showRoute($id) {
		return "javascript:SwalFlash.info(`Not Applicable`, `Automated action by the system.`, true, false, `center`, false);";
	}
}