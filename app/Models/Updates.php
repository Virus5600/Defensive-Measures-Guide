<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Updates extends Model
{
	use HasFactory, SoftDeletes;

	protected $fillable = [
		'version',
		'major_version',
		'minor_version',
		'patch_version',
		'description',
		'changelog',
		'compatibility',
		'release_date',
		'bedrock_link',
		'java_link',
		'banner',
	];

	private static $releaseTypes = [
		'alpha',
		'beta',
		'release'
	];

	// ATTRIBUTE MORPHERS
	protected function changelog(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => json_decode($value, true),
			set: fn ($value) => json_encode($value)
		);
	}

	protected function compatibility(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => json_decode($value, true),
			set: fn ($value) => json_encode($value)
		);
	}

	protected function release_date(): Attribute
	{
		return Attribute::make(
			get: function($val) {
				$obj = json_decode($val, true);
				$dates = [];

				foreach ($obj as $k => $v) {
					$dates[$k] = date('Y-m-d', strtotime($v));
				}
				return (object) $dates;
			},
			set: fn ($val) => json_encode($val)
		);
	}

	// CUSTOM METHODS
	public function getVersion(): string
	{
		return "v{$this->major_version}.{$this->minor_version}.{$this->patch_version}-{$this->version}";
	}

	/**
	 * Retrieves the banner of the update.
	 *
	 * @param bool $useDefault Whether to use the default banner or not.
	 * @param bool $getFull Whether to get the full path or not.
	 * @param bool $isUrl Whether to return the banner as a URL or as an <img> tag.
	 * @param string $customClasses Custom CSS classes to add to the <img> tag.
	 */
	public function getBanner($useDefault=false, $getFull=true, $isUrl=true, $customClasses=""): string
	{
		$bannerF = $this->banner;
		$bannerU = asset('/uploads/versions/'.$this->banner);
		$bannerD = asset('/uploads/versions/default.webp');
		$toRet = null;

		if ($useDefault) {
			if ($getFull)
				return $bannerD;
			else
				return 'default.webp';
		}
		else {
			if ($getFull) {
				$toRet = $bannerU;
			}
			else {
				$toRet = $bannerF;
			}
		}

		if ($isUrl)
			return $toRet;
		return "<img src=\"" . asset($toRet) . "\" class=\"img-fluid {$customClasses}\">";
	}

	// STATIC METHODS
	public static function getReleaseTypes(): array
	{
		return static::$releaseTypes;
	}
}
