<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

use App\Models\UserType;

class UserTypesTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$userTypes = [
			'Master Admin',
			'Admin',
			'Editor',
			'Writer'
		];

		foreach ($userTypes as $ut) {
			UserType::create([
				'name' => $ut,
				'slug' => Str::of(strtolower($ut))->slug('_')
			]);
		}
	}
}
