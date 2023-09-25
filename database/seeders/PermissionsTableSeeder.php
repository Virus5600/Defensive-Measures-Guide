<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// SETTINGS
		$settingsPerm = Permission::create([
			'name' => 'Settings Tab Access',
			'slug' => 'settings_tab_access'
		]);

		Permission::create([
			'parent_permission' => $settingsPerm->id,
			'name' => 'Settings Tab Edit',
			'slug' => 'settings_tab_edit'
		]);
	}
}