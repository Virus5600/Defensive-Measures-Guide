<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class PageController extends Controller
{
	// HOME PAGE
	public function index(): View
	{
		return view('index');
	}
}
