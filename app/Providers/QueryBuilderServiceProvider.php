<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\ServiceProvider;

use App\Database\Macros\WhereConcat;

class QueryBuilderServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services
	 */
	public function register(): void
	{
		$this->registerWhereConcat();
	}

	/**
	 * Bootstrap any application services
	 */
	public function boot(): void
	{
		//
	}

	/**
	 * Register the rankings method for collections
	 *
	 * @return void
	 */
	private function registerWhereConcat() {
		Builder::macro('whereConcat', function ($columns, $operator = '=', $value = null) {
			return WhereConcat::whereConcat($this, $columns, $operator, $value);
		});

		Builder::macro('orWhereConcat', function ($columns, $operator = '=', $value = null) {
			return WhereConcat::orWhereConcat($this, $columns, $operator, $value);
		});

		EloquentBuilder::macro('whereConcat', function ($columns, $operator = '=', $value = null) {
			return WhereConcat::whereConcat($this, $columns, $operator, $value);
		});

		EloquentBuilder::macro('orWhereConcat', function ($columns, $operator = '=', $value = null) {
			return WhereConcat::orWhereConcat($this, $columns, $operator, $value);
		});
	}
}
