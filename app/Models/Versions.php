<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Validation\Rule;

class Versions extends Model
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

	protected function bedrock_link(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => json_decode($value, true),
			set: fn ($value) => json_encode($value)
		);
	}

	protected function java_link(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => json_decode($value, true),
			set: fn ($value) => json_encode($value)
		);
	}

	// CUSTOM METHODS
	/**
	 * Retrieves the semantic formatted version of this version entry.
	 *
	 * @param bool $includeV Whether to include the "v" prefix or not.
	 *
	 * @return string The semantic formatted version of this version entry.
	 */
	public function getVersion($includeV = true): string
	{
		return ($includeV ? 'v' : '') . "{$this->major_version}.{$this->minor_version}.{$this->patch_version}-{$this->version}";
	}

	/**
	 * Retrieves the banner of the version.
	 *
	 * @param bool $useDefault Whether to use the default banner or not.
	 * @param bool $getFull Whether to get the full path or not.
	 * @param bool $isUrl Whether to return the banner as a URL or as an <img> tag.
	 * @param string $customClasses Custom CSS classes to add to the <img> tag.
	 *
	 * @return string The banner of the version. If `$isUrl` is true, it will return the URL of the banner. Otherwise, it will return the `<img>` tag.
	 */
	public function getBanner($useDefault=false, $getFull=true, $isUrl=true, $customClasses=""): string
	{
		$bannerF = $this->banner;
		$bannerU = asset('/uploads/versions/'.$this->banner);
		$bannerD = static::getDefaultBanner();
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
	/**
	 * Fetches the standard release types.
	 */
	public static function getReleaseTypes(): array
	{
		return static::$releaseTypes;
	}

	/**
	 * Fetches the default banner.
	 *
	 * @param bool $asAsset Whether to return the banner as an asset or not.
	 *
	 * @return string The default banner. It could be a URL or an asset depending on the value of `$asAsset`.
	 */
	public static function getDefaultBanner($asAsset = true): string
	{
		return $asAsset ? asset('/uploads/versions/default.webp') : 'default.webp';
	}

	/**
	 * Fetches the validation rules for the Versions model.
	 *
	 * @param array $list The list of rules to fetch. If empty, it will fetch all rules.
	 *
	 * @return array The validation rules for the Versions model.
	 */
	public static function getValidationRules($list = []): array
	{
		$rules = [
			"banner" => ['file', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5120'],
			"majorVersion" => ['required', 'numeric', 'min:0'],
			"minorVersion" => ['required', 'numeric', 'min:0'],
			"patchVersion" => ['required', 'numeric', 'min:0'],
			"devVersion" => ['required', 'string', Rule::in(Versions::getReleaseTypes())],
			"description" => ['required', 'string'],
			"add" => ['array'],
			"add.*" => ['sometimes', 'required_with:add', 'string'],
			"mod" => ['array'],
			"mod.*" => ['sometimes', 'required_with:mod', 'string'],
			"rem" => ['array'],
			"rem.*" => ['sometimes', 'required_with:rem', 'string'],
			"bedrock" => ['required_with:bedrockRD', 'array', 'min:1'],
			"bedrock.*" => ['sometimes', 'required_with:bedrock', 'string', 'distinct', 'regex:/(^\\d{1,3})(\\.)(\\d{1,3})(\\.(?=\\d{1,3})\\d{1,3})?$/'],
			"java" => ['required_with:javaRD', 'array', 'min:1'],
			"java.*" => ['sometimes', 'required_with:java', 'string', 'distinct', 'regex:/(^\\d{1,3})(\\.)(\\d{1,3})(\\.(?=\\d{1,3})\\d{1,3})?$/'],
			"bedrockRD" => ['required_with:bedrockDL', 'date'],
			"javaRD" => ['required_with:javaDL', 'date'],
			"bedrockDL" => ['required_with:bedrockRD', 'array'],
			"bedrockDL.*" => ['sometimes', 'required_with:bedrockDL', 'string', 'url', 'distinct'],
			"bedrockDLW" => ['required_with:bedrockRD', 'array'],
			"bedrockDLW.*" => ['sometimes', 'required_with:bedrockDLW', 'string'],
			"javaDL" => ['required_with:javaRD', 'array'],
			"javaDL.*" => ['sometimes', 'required_with:javaDL', 'string', 'url', 'distinct'],
			"javaDLW" => ['required_with:bedrockRD', 'array'],
			"javaDLW.*" => ['sometimes', 'required_with:bedrockDLW', 'string'],
		];

		if (count($list) > 0) {
			$toRet = [];
			foreach ($list as $key) {
				$toRet[$key] = $rules[$key];
			}
			return $toRet;
		}

		return $rules;
	}

	/**
	 * Fetches the validation messages for the Versions model. All messages are to be returned regardless
	 * of what rules are provided as `Validator` will only use the messages that are relevant to the rules.
	 *
	 * @return array The validation messages for the Versions model.
	 */
	public static function getValidationMessages(): array
	{
		return [
			"banner.file" => "Please provide a valid file",
			"banner.image" => "Please provide a valid image",
			"banner.mimes" => "Please provide a valid image (jpeg, png, jpg, gif, svg)",
			"banner.max" => "Please provide an image that is less than or equals to 5MB",
			"majorVersion.required" => "Major version is required",
			"majorVersion.numeric" => "Major version must be a number",
			"majorVersion.min" => "Major version must be a positive number",
			"minorVersion.required" => "Minor version is required",
			"minorVersion.numeric" => "Minor version must be a number",
			"minorVersion.min" => "Minor version must be a positive number",
			"patchVersion.required" => "Patch version is required",
			"patchVersion.numeric" => "Patch version must be a number",
			"patchVersion.min" => "Patch version must be a positive number",
			"devVersion.required" => "Development version is required",
			"devVersion.string" => "Development version must be a string",
			"devVersion.in" => "Development version must be one of the following: " . implode(", ", static::getReleaseTypes()),
			"description.required" => "A description is required",
			"description.string" => "The description must be a valid string",
			"add.array" => "Please refrain from modifying the webpage",
			"add.*.required_with" => "This log is required",
			"add.*.string" => "This log must be a string",
			"mod.array" => "Please refrain from modifying the webpage",
			"mod.*.required_with" => "This log is required",
			"mod.*.string" => "This log must be a string",
			"rem.array" => "Please refrain from modifying the webpage",
			"rem.*.required_with" => "This log is required",
			"rem.*.string" => "This log must be a string",
			"bedrock.required_with" => "A compatibility list is required",
			"bedrock.array" => "Please refrain from modifying the webpage",
			"bedrock.min" => "Please add at least one version",
			"bedrock.*.required_with" => "This version is required",
			"bedrock.*.string" => "Please provide a valid string",
			"bedrock.*.distinct" => "A same version cannot be added twice",
			"bedrock.*.regex" => "Please provide a semantic version (x.x.x or x.x)",
			"java.required_with" => "A compatibility list is required",
			"java.array" => "Please refrain from modifying the webpage",
			"java.min" => "Please add at least one version",
			"java.*.required_with" => "This version is required",
			"java.*.string" => "Please provide a valid string",
			"java.*.distinct" => "A same version cannot be added twice",
			"java.*.regex" => "Please provide a semantic version (x.x.x or x.x)",
			"bedrockRD.required_with" => "A release date is required",
			"bedrockRD.date" => "Please provide a valid date",
			"javaRD.required_with" => "A release date is required",
			"javaRD.date" => "Please provide a valid date",
			"bedrockDL.required_with" => "Please provide a download link",
			"bedrockDL.array" => "Please refrain from modifying the webpage",
			"bedrockDL.*.required_with" => "A download link is required",
			"bedrockDL.*.string" => "Please provide a valid string",
			"bedrockDL.*.url" => "Please provide a valid URL",
			"bedrockDL.*.distinct" => "A same download link cannot be added twice",
			"bedrockDLW.required_with" => "Please provide the download link's website",
			"bedrockDLW.array" => "Please refrain from modifying the webpage",
			"bedrockDLW.*.required_with" => "Please provide the download link's website",
			"bedrockDLW.*.string" => "Please provide a valid string",
			"javaDL.required_with" => "Please provide a download link",
			"javaDL.array" => "Please refrain from modifying the webpage",
			"javaDL.*.required_with" => "Please provide a download link",
			"javaDL.*.string" => "Please provide a valid string",
			"javaDL.*.url" => "Please provide a valid URL",
			"javaDL.*.distinct" => "A same download link cannot be added twice",
			"javaDLW.required_with" => "Please provide the download link's website",
			"javaDLW.array" => "Please refrain from modifying the webpage",
			"javaDLW.*.required_with" => "Please provide the download link's website",
			"javaDLW.*.string" => "Please provide a valid string",
		];
	}
}
