<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Exception;

class Settings extends Model
{
	protected $fillable = [
		"name",
		"value",
		"default_value",
		"is_file",
	];

	// CUSTOM FUNCTIONS
	public static function getInstance($key = null)
	{
		if ($key == null)
			return Settings::get();
		return Settings::where("name", "=", $key)->first();
	}

	public static function valueToJSON($key)
	{
		$setting = Settings::where("name", "=", $key)->first();

		if ($setting == null)
			return null;

		$toRet = array();
		foreach (preg_split("/\,\s*/", $setting->value) as $v)
			array_push($toRet, array("value" => trim($v)));

		return json_encode($toRet);
	}

	public static function getValue($key)
	{
		$setting = Settings::getInstance($key);

		if ($setting == null)
			return null;
		return $setting->value ?? $setting->default_value;
	}

	public static function getFile($key = 0)
	{
		$setting = Settings::getInstance($key);

		if ($setting->is_file)
			return storageAsset("uploads", "settings/{$setting->value}");
		return $setting->value;
	}

	public function getImage($useDefault = false, $getFull = true)
	{
		if ($this->is_file == false)
			throw new Exception("The setting with the key '{$this->name}' is not a file.");

		$file = $this->value;
		if ($useDefault)
			$file = "default.png";

		if ($getFull)
			return storageAsset("uploads", "settings/{$file}");
		return $file;
	}

	// STATIC FUNCTIONS
	public static function showRoute()
	{
		return route("admin.settings.index");
	}
}
