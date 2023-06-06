<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['namespace' => "App\Http\Controllers"], function() {
	///////////////
	// USER SIDE //
	///////////////
	
	// Home Page
	Route::get('/', 'PageController@index')->name('home');

	////////////////
	// ADMIN SIDE //
	////////////////
	Route::group(['prefix' => 'admin'], function() {
		// SETTINGS
		Route::group(['prefix' => 'settings'], function() {
			// Index
			Route::get('/', 'SettingsController@index')->name('admin.settings.index');
		});
	});
});