<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
	protected function login(Request $req) {
		return view("login");
	}
}
