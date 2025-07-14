<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\UserType;

class UsersTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// Master Admin User - Owner
		User::create([
			'username' => config('master-admin.username'),
			'first_name' => config('master-admin.first_name'),
			'middle_name' => config('master-admin.middle_name'),
			'last_name' => config('master-admin.last_name'),
			'email' => config('master-admin.email'),
			'user_type_id' => config('master-admin.user_type_id'),
			'password' => config('master-admin.password'),
		]);

		// Admin User (Dev) & User Types (Only in development Environment)
		if (in_array(config("app.env"), ["local", "local-testing", "testing", "development", "staging", "dev"])) {
			User::create([
				'username' => 'Virus5600',
				'first_name' => 'Karl Satchi',
				'middle_name' => 'Esguerra',
				'last_name' => 'Navida',
				'email' => 'satchinavida@gmail.com',
				'user_type_id' => 2,
				'password' => 'password',
				'is_verified' => 1,
			]);

			$userTypes = UserType::whereIn('slug', [
				'admin',
				'editor',
				'writer'
			])->pluck('slug', 'id')->toArray();

			if (in_array(config('app.env'), ['local', 'testing', 'local-testing', 'development'])) {
				foreach ($userTypes as $id => $ut) {
					User::factory()
						->count(1)
						->username(ucwords($ut))
						->userType($id)
						->password("1{$ut}!")
						->verified()
						->create();
				}
			}
		}
	}
}
