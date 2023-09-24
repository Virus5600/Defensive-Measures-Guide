<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UsersController extends Controller
{
	protected function index(Request $req) {
		return view('admin.users.index');
	}
}