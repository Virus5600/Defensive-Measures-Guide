<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['namespace' => "App\Http\Controllers"], function() {
	////////////////////////
	// AUTHENTICATED SIDE //
	////////////////////////
	Route::group(['middleware' => ['auth']], function() {
		////////////////
		// ADMIN SIDE //
		////////////////
		Route::group(['prefix' => 'admin'], function() {
			// SETTINGS
			Route::group(['prefix' => 'settings', 'middleware' => ['permissions:settings_tab_access']], function() {
				// RESET
				Route::group(['prefix' => 'reset', 'middleware' => ['permissions:settings_tab_edit']], function() {
					Route::patch('/{type}', 'SettingsController@reset')->name('admin.settings.reset.favicon');
				});
			});
		});
	});
});