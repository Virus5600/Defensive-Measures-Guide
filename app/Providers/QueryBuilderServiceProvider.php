<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\ServiceProvider;

use App\Database\Macros\WhereConcat;
use App\Database\Macros\OrderByConcat;

class QueryBuilderServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services
	 */
	public function register(): void
	{
		$this->registerWhereConcat();
		$this->registerOrderByConcat();
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

	/**
	 * Register the rankings method for collections
	 */
	private function registerOrderByConcat() {
		Builder::macro('orderByConcat', function ($columns, $direction = 'asc') {
			return OrderByConcat::orderByConcat($this, $columns, $direction);
		});

		Builder::macro('orderByDescConcat', function ($columns) {
			return OrderByConcat::orderByDescConcat($this, $columns);
		});

		EloquentBuilder::macro('orderByConcat', function ($columns, $direction = 'asc') {
			return OrderByConcat::orderByConcat($this, $columns, $direction);
		});

		EloquentBuilder::macro('orderByDescConcat', function ($columns) {
			return OrderByConcat::orderByDescConcat($this, $columns);
		});
	}
}
