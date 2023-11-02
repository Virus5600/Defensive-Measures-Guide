<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('updates', function (Blueprint $table) {
			$table->id();
			$table->enum('version', ['alpha', 'beta', 'release'])->default('release');
			$table->unsignedInteger('major_version');
			$table->unsignedInteger('minor_version');
			$table->unsignedInteger('patch_version');
			$table->longText('description');
			$table->json('changelog');
			$table->json('compatibility');
			$table->json('release_date');
			$table->json('bedrock_link')->nullable();
			$table->json('java_link')->nullable();
			$table->string('banner')->default('default.webp');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('updates');
	}
};
