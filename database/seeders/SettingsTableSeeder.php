<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Settings;

class SettingsTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// FAVICON/LOGO
		Settings::create([
			'name' => 'web-logo',
			'value' => 'default.png',
			'is_file' => true
		]);

		// WEB NAME
		Settings::create([
			'name' => 'web-name',
			'value' => 'Defensive Measures Guide'
		]);

		// DESCRIPTION
		Settings::create([
			'name' => 'web-desc',
			'value' => 'A Guide dedicated to Defensive Measures developed by Virus5600. Contains all details needed to know in Defensive Measures, ranging from installation, up to the updates released by the add-on and mod.'
		]);
	}
}