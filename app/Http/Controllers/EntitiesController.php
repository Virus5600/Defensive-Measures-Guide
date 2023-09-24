<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EntitiesController extends Controller
{
	protected function index(Request $req) {
		return view('admin.entities.index');
	}
}