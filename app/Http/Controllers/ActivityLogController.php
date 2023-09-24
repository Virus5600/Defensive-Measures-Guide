<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
	protected function index(Request $req) {
		return view('admin.activity-log.index');
	}
}