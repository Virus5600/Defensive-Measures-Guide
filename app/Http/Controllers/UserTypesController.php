<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserTypesController extends Controller
{
	protected function index(Request $req) {
		return view('admin.user-types.index');
	}
}