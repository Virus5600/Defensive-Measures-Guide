<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PermissionsController extends Controller
{
	protected function index(Request $req) {
		return view('admin.permissions.index');
	}
}