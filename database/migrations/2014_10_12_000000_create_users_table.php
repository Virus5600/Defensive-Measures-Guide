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
			$table->string('avatar')->default('default.png');
			$table->foreignId('user_type_id')->unsigned();
			$table->tinyInteger('login_attempts')->default(0);
			$table->tinyInteger('locked')->default(0);
			$table->ipAddress('locked_by')->nullable();
			$table->string('password');
			$table->dateTime('last_auth')->nullable();
			$table->rememberToken();
			$table->softDeletes();
			$table->timestamps();

			$table->foreign('user_type_id')->references('id')->on('user_types')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('users');
	}
};