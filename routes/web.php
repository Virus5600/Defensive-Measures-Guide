<?php

use Illuminate\Support\Facades\Route;

// //////////////////////// //
// NON-AUTHENTICATED ROUTES //
// //////////////////////// //
Route::group(['namespace' => 'App\Http\Controllers'], function () {
	// ////////////// //
	// NEUTRAL ROUTES //
	// ////////////// //

	// Landing/Home Page
	Route::get('/', 'PageController@index')->name('home');
});
