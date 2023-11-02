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
		// UPDATES
		$updatesPerm = Permission::create([
			'name' => 'Updates Tab Access',
			'slug' => 'updates_tab_access'
		]);

		Permission::create([
			'parent_permission' => $updatesPerm->id,
			'name' => 'Updates Tab Create',
			'slug' => 'updates_tab_create'
		]);

		Permission::create([
			'parent_permission' => $updatesPerm->id,
			'name' => 'Updates Tab Edit',
			'slug' => 'updates_tab_edit'
		]);

		Permission::create([
			'parent_permission' => $updatesPerm->id,
			'name' => 'Updates Tab Delete',
			'slug' => 'updates_tab_delete'
		]);

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
