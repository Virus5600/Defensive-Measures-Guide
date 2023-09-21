<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;

class UsersTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// Master Admin User - Owner
		User::create([
			'username' => 'Virus5600',
			'first_name' => 'Karl Satchi',
			'middle_name' => 'Esguerra',
			'last_name' => 'Navida',
			'email' => 'satchi5600@gmail.com',
			'avatar' => 'virus5600.png',
			'user_type_id' => '1',
			'password' => '$2y$10$5n6JGWWiBfHR.bgLHUiWb.1jElQdAqT.P0QK1QD.ERvbM3KE48SfC'
		]);
	}
}
