<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Version;

class VersionsTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// v0.1.0-alpha
		Version::create([
			'tag' => 'v0.1.0-alpha',
			'version' => 'alpha',
			'major_version' => 0,
			'minor_version' => 1,
			'patch_version' => 0,
			'description' => "An initial release with the basics of the basic features of the mod.",
			'changelog' => "{
				\"add\": [
					\"Added Cannon Turret\",
					\"Added Cannon Turret related items\"
				],
				\"mod\": [],
				\"rem\": []
			}",
			'compatibility' => "{
				\"bedrock\": [\"1.16.100\"],
				\"java\": [\"1.19.2\"]
			}",
			'release_date' => "{
				\"bedrock\": \"2020-12-11\",
				\"java\": \"2022-11-10\"
			}",
			'bedrock_link' => "{
			}",
			'java_link' => "{
				\"GitHub\": \"https://github.com/Virus5600/Defensive-Measures-Mod/releases/tag/v0.1.0-alpha\",
				\"Modrinth\": \"https://modrinth.com/mod/defensive-measures/version/0.1.0-alpha-1.19.2\",
				\"CurseForge\": \"https://www.curseforge.com/minecraft/mc-mods/defensive-measures/files/4077594\"
			}",
			'banner' => "default.webp",
		]);

		// v0.2.0-alpha
		Version::create([
			'tag' => 'v0.2.0-alpha',
			'version' => 'alpha',
			'major_version' => 0,
			'minor_version' => 2,
			'patch_version' => 0,
			'description' => "Progress lads! Cannon Turret is now fully functional and can be used in-game. New animation and effects are now also visible for the turret so you can feel the cannon's wrath befalling a hostile! Also added a new tool called Turret Remover to remove the placed turrets.",
			'changelog' => "{
				\"add\": [
					\"Cannon Turret fully functional\",
					\"Added Turret Remover\"
				],
				\"mod\": [
					\"Cannon Turret now has PFX and SFX\",
					\"Cannon Turret now has a crafting recipe (so you can now acquire it in Survival).\",
					\"Some optimization in the animations\"
				],
				\"rem\": []
			}",
			'compatibility' => "{
				\"bedrock\": [\"1.16.100\"]
			}",
			'release_date' => "{
				\"bedrock\": \"2020-12-14\"
			}",
			'bedrock_link' => "{
			}",
			'java_link' => "{
			}",
			'banner' => "default.webp",
		]);

		// v1.0.0-beta
		Version::create([
			'tag' => 'v1.0.0-beta',
			'version' => 'beta',
			'major_version' => 1,
			'minor_version' => 0,
			'patch_version' => 0,
			'description' => "Finally! After some months working on the some new turrets, we now have reached the v1.0.0-beta version and this marks the end of Alpha Phase! I proudly announce that this is now officially in public beta and will continue to have Versions albeit very slow.",
			'changelog' => "{
				\"add\": [
					\"Added Ballista Turret, a cheap starter turret!\",
					\"Added Ballista related items so you can craft it.\",
					\"Added Ballista crafting recipe for those survival enthusiasts!\",
					\"Added MG Turret, the first modern turret which shoots a barrage of bullets that deals relatively high damage.\",
					\"Added MG Turret related items, of course, to craft it.\",
					\"Added MG Turret crafting recipe so peeps can use them in their survival worlds!\",
					\"Added Arrowhead trap block which damages anyone who steps on it! Cheap but weak damage~\"
				],
				\"mod\": [],
				\"rem\": []
			}",
			'compatibility' => "{
				\"bedrock\": [\"1.16.100\"],
				\"java\": [\"1.19.2\"]
			}",
			'release_date' => "{
				\"bedrock\": \"2020-12-15\",
				\"java\": \"2022-11-13\"
			}",
			'bedrock_link' => "{
				\"Mediafire (Mobile)\": \"https://www.mediafire.com/file/ec6zag61hoqhdp9/Defensive_Measures_Add-on_%2528Mobile%2529.zip/file\",
				\"Mediafire (Win10)\": \"https://www.mediafire.com/file/6n5kf5h8ow7b84p/Defensive_Measures_Add-on_%2528Win10%2529.zip/file\"
			}",
			'java_link' => "{
				\"GitHub\": \"https://github.com/Virus5600/Defensive-Measures-Mod/releases/tag/v1.0.0-beta\",
				\"Modrinth\": \"https://modrinth.com/mod/defensive-measures/version/1.0.0-beta-1.19.2\",
				\"CurseForge\": \"https://www.curseforge.com/minecraft/mc-mods/defensive-measures/files/4082767\"
			}",
			'banner' => "default.webp",
		]);

		// v1.0.1-beta
		Version::create([
			'tag' => 'v1.0.1-beta',
			'version' => 'beta',
			'major_version' => 1,
			'minor_version' => 0,
			'patch_version' => 1,
			'description' => "Server compatibility patch. This allows the mod to be played within servers or even on multiplayer LAN games. This also fixes the issue where the mod is not working on servers.",
			'changelog' => "{
				\"add\": [],
				\"mod\": [
					\"\"
				],
				\"rem\": []
			}",
			'compatibility' => "{
				\"bedrock\": [\"1.16.100\", \"1.17\", \"1.18\", \"1.19\", \"1.20\"],
				\"java\": [\"1.19.2\"]
			}",
			'release_date' => "{
				\"bedrock\": \"2020-12-18\",
				\"java\": \"2023-01-30\"
			}",
			'bedrock_link' => "{
				\"Mediafire (Mobile)\": \"https://www.mediafire.com/file/0asm32n3hlzgxd4/Defensive_Measures_Add-on_v1.0.1-beta_%2528Mobile%2529.zip/file\",
				\"Mediafire (Win10)\": \"https://www.mediafire.com/file/u6qrpi2jxjdyy6i/Defensive_Measures_Add-on_v1.0.1-beta_%2528Win10%2529.zip/file\"
			}",
			'java_link' => "{
				\"GitHub\": \"https://github.com/Virus5600/Defensive-Measures-Mod/releases/tag/v1.0.1-beta\",
				\"Modrinth\": \"https://modrinth.com/mod/defensive-measures/version/1.0.1-beta-1.19.2\",
				\"CurseForge\": \"https://www.curseforge.com/minecraft/mc-mods/defensive-measures/files/4373514\"
			}",
			'banner' => "default.webp",
		]);

		// v1.0.2-beta
		Version::create([
			'tag' => 'v1.0.2-beta',
			'version' => 'beta',
			'major_version' => 1,
			'minor_version' => 0,
			'patch_version' => 2,
			'description' => "Some quality of life (QoL) update and bug fixes.",
			'changelog' => "{
				\"add\": [
					\"Added sound events for when the turrets are fixed (healed).\"
				],
				\"mod\": [
					\"Fixed a bug where an item won't get consumed and tools used to repair the turrets won't get damaged.\"
				],
				\"rem\": []
			}",
			'compatibility' => "{
				\"java\": [\"1.19.2\"]
			}",
			'release_date' => "{
				\"java\": \"2023-04-07\"
			}",
			'bedrock_link' => "{
			}",
			'java_link' => "{
				\"GitHub\": \"https://github.com/Virus5600/Defensive-Measures-Mod/releases/tag/v1.0.2-beta-1.19.2\",
				\"Modrinth\": \"https://modrinth.com/mod/defensive-measures/version/1.0.2-beta-1.19.2\",
				\"CurseForge\": \"https://www.curseforge.com/minecraft/mc-mods/defensive-measures/files/4478218\"
			}",
			'banner' => "default.webp",
		]);
	}
}
