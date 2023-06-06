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