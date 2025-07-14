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
		Schema::create('users', function (Blueprint $table) {
			$table->id();
			$table->string('username')->unique();
			$table->string('first_name');
			$table->string('middle_name')->nullable();
			$table->string('last_name');
			$table->string('suffix')->nullable();
			$table->string('email')->unique();
			$table->foreignId('user_type_id')->nullable()->constrained('user_types')->nullOnDelete();
			$table->tinyInteger('login_attempts')->default(0);
			$table->boolean('is_verified')->default(false);
			$table->boolean('locked')->default(false);
			$table->ipAddress('locked_by')->nullable();
			$table->string('password');
			$table->dateTime('last_auth')->nullable();
			$table->rememberToken();
			$table->softDeletes();
			$table->timestamps();
		});

		Schema::create('password_reset_tokens', function (Blueprint $table) {
			$table->string('email')->primary();
			$table->string('token')->nullable();
			$table->dateTime('expires_at')->nullable();
			$table->timestamp('created_at')->nullable();

			$table->foreign('email')->references('email')->on('users')->onDelete('cascade');
		});

		Schema::create('sessions', function (Blueprint $table) {
			$table->string('id')->primary();
			$table->foreignId('user_id')->nullable()->index();
			$table->string('ip_address', 45)->nullable();
			$table->text('user_agent')->nullable();
			$table->longText('payload');
			$table->integer('last_activity')->index();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('users');
		Schema::dropIfExists('password_reset_tokens');
		Schema::dropIfExists('sessions');
	}
};
