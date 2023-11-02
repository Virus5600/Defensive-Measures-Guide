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

	// Downloads
	Route::group(['prefix' => 'downloads'], function() {
		Route::get('/', 'DownloadsController@index')->name('downloads.index');
	});

	// Installations
	Route::group(['prefix' => 'installations'], function() {
		Route::get('/', 'InstallationsController@index')->name('installations.index');
	});

	// Contents
	Route::group(['prefix' => 'contents'], function() {
		Route::get('/', 'ContentsController@index')->name('contents.index');
	});

	//////////////////
	// AUTH RELATED //
	//////////////////
	Route::group(['middleware' => ['guest', 'check.admin']], function() {
		// Login
		Route::get('/login', 'AuthenticationController@login')->name('login');

		// Authenticate
		Route::post('/authenticate', 'AuthenticationController@authenticate')->name('authenticate');
	});

	////////////////////////
	// AUTHENTICATED SIDE //
	////////////////////////
	Route::group(['middleware' => ['auth', 'check.admin', 'permissions:sanctum']], function() {
		// LOGOUT
		Route::post('/logout', 'AuthenticationController@logout')->name('logout');

		////////////////
		// ADMIN SIDE //
		////////////////
		Route::group(['prefix' => 'admin'], function() {
			// Dashboard
			Route::permanentRedirect('/', '/dashboard')->name('admin.dashboard');
			Route::get('/dashboard', 'PageController@dashboard')->name('admin.dashboard');

			/// WRITER'S AREA ///
			Route::group(['prefix' => 'updates'], function() {
				// Index
				Route::get('/', 'UpdatesController@index')->name('admin.updates.index');
			});

			/// DM CONTENTS ///

			// ITEMS
			Route::group(['prefix' => 'items'], function() {
				// Index
				Route::get('/', 'ItemsController@index')->name('admin.items.index');
			});

			// RECIPES
			Route::group(['prefix' => 'recipes'], function() {
				// Index
				Route::get('/', 'RecipesController@index')->name('admin.recipes.index');
			});

			// ENTITIES
			Route::group(['prefix' => 'entities'], function() {
				// Index
				Route::get('/', 'EntitiesController@index')->name('admin.entities.index');
			});

			/// ADMIN AREA ///

			// USERS
			Route::group(['prefix' => 'users'], function() {
				// Index
				Route::get('/', 'UsersController@index')->name('admin.users.index');
			});

			// USER TYPES
			Route::group(['prefix' => 'user-types'], function() {
				// Index
				Route::get('/', 'UserTypesController@index')->name('admin.user-types.index');
			});

			// PERMISSIONS
			Route::group(['prefix' => 'permissions'], function() {
				// Index
				Route::get('/', 'PermissionsController@index')->name('admin.permissions.index');
			});

			// ACTIVITY LOG
			Route::group(['prefix' => 'activity-log'], function() {
				// Index
				Route::get('/', 'ActivityLogController@index')->name('admin.activity-log.index');
			});

			// SETTINGS
			Route::group(['prefix' => 'settings', 'middleware' => ['permissions:settings_tab_access']], function() {
				// Index
				Route::get('/', 'SettingsController@index')->name('admin.settings.index');

				// Update
				Route::put('/update', 'SettingsController@update')->name('admin.settings.update');
			});
		});
	});
});
