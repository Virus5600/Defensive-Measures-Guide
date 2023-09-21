<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Permission;
use App\Models\UserType;
use App\Models\UserTypePermission;

class UserTypePermissionsTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// Master Admin
		$typeID = UserType::where('slug', '=', 'master_admin')->first();
		$perms = Permission::get();
		$this->insertEntries($typeID, $perms);

		// Admin
		$typeID = UserType::where('slug', '=', 'admin')->first();
		$perms = [
		];

		// Editor
		$typeID = UserType::where('slug', '=', 'editor')->first();
		$perms = [
		];

		// Writer
		$typeID = UserType::where('slug', '=', 'writer')->first();
		$perms = [
		];
	}

	private function insertEntries($typeID, $perms = []): void
	{
		for ($i = 1; $i <= count($perms); $i++) {
			UserTypePermission::insert([
				'type_id' => $typeID,
				'permission_id' => $i
			]);
		}
	}
}