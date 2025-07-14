<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\SocialLinks;

class SocialLinksTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$icons = SocialLinks::getSupportedWebsites();

		$links = [
			"Facebook" => "https://www.facebook.com/virus5600",
			"GitHub" => "https://github.com/Virus5600/",
			"Twitter" => "https://twitter.com/satchnotsnatch",
			"YouTube" => "https://www.youtube.com/@virus5600",
			"Ko-Fi" => "https://ko-fi.com/virus5600",
			"Modrinth" => "https://modrinth.com/user/Virus5600",
			"CurseForge" => "https://www.curseforge.com/members/virus5600",
			"PlanetMinecraft" => "https://www.planetminecraft.com/member/virus5600/",
		];

		foreach ($links as $site => $link) {
			SocialLinks::create([
				"website" => $site,
				"url" => $link,
				"icon" => in_array(strtolower($site), array_keys($icons)) ? strtolower($site) : "globe",
			]);
		}
	}
}
