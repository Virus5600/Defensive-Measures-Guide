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
		Schema::create('password_reset_tokens', function (Blueprint $table) {
			$table->string('email')->unique();
			$table->string('token')->nullable();
			$table->dateTime('expires_at')->nullable();
			$table->timestamp('created_at')->nullable();

			$table->foreign('email')->references('email')->on('users')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('password_reset_tokens');
	}
};