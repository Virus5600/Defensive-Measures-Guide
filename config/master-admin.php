<?php

/*
|--------------------------------------------------------------------------
| Master Admin
|--------------------------------------------------------------------------
|
| This file is for storing the master admin credentials. All the values here
| identifies the master admin account and will be used to create the master
| admin account if it does not exist.
|
*/
return [

	/*
	|--------------------------------------------------------------------------
	| Master Admin Credentials
	|--------------------------------------------------------------------------
	|
	| These values determines the master admin credentials that will be used to
	| create the master admin account. Make sure to update these when updating
	| the master admin's account lest a new account with these credentials will
	| be created.
	|
	*/
	'username' => env('MASTER_ADMIN_USERNAME', 'masteradmin'),
	'first_name' => env('MASTER_ADMIN_FIRSTNAME', 'Master'),
	'middle_name' => env('MASTER_ADMIN_MIDDLENAME', null),
	'last_name' => env('MASTER_ADMIN_LASTNAME', 'Admin'),
	'email' => env('MASTER_ADMIN_EMAIL', 'satchi5600@gmail.com'),
	'user_type_id' => env('MASTER_ADMIN_USER_TYPE_ID', '1'),
	'password' => env('MASTER_ADMIN_PASSWORD', 'A really long password!'),
];
