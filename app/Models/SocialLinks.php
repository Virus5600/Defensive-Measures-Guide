<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLinks extends Model
{
	protected $fillable = [
		"website",
		"url",
		"icon"
	];

	private static $supportedWebsites = [
		"bilibili" => "Bilibili",
		"blogger" => "Blogger",
		"discord" => "Discord",
		"facebook" => "Facebook",
		"github" => "GitHub",
		"gitlab" => "GitLab",
		"instagram" => "Instagram",
		"linkedin" => "LinkedIn",
		"medium" => "Medium",
		"mixer" => "Mixer",
		"patreon" => "Patreon",
		"reddit" => "Reddit",
		"telegram" => "Telegram",
		"tiktok" => "TikTok",
		"twitter" => "Twitter",
		"x-twitter" => "X",
		"youtube" => "YouTube",
	];

	// CUSTOM METHODS
	public function drawIcon(): string
	{
		return '<i class="fa' . ($this->icon === "globe" ? "s" : "b") . ' fa-' . $this->icon . '"></i>';
	}

	public function isSelected($website): bool
	{
		if (in_array($website, array_keys(static::$supportedWebsites)))
			return static::$supportedWebsites[$website] === $this->website;
		return false;
	}

	public static function getSupportedWebsites(): array
	{
		return static::$supportedWebsites;
	}
}
