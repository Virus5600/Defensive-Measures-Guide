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
	Route::group(['middleware' => ['auth:sanctum']], function() {
		////////////////
		// ADMIN SIDE //
		////////////////
		Route::group(['prefix' => 'admin'], function() {
			// SETTINGS
			Route::group(['prefix' => 'settings', 'middleware' => ['permissions:settings_tab_access']], function() {
				Route::group(['middleware' => ['permissions:settings_tab_edit']], function() {
					// RESET
					Route::patch('/reset', 'SettingsController@reset')->name('api.admin.settings.reset');

					// GET SUPPORTED WEBSITES LIST
					Route::get('/supported-websites', 'SettingsController@getSupportedWebsites')->name('api.admin.settings.supported-websites');
				});
			});
		});
	});
});
