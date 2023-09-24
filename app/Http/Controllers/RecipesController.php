<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RecipesController extends Controller
{
	private static $TYPES = ['all', 'vanilla', 'dma'];

	protected function index(Request $req) {
		if ($req->has('type'))
			if ($req->type < 0 || $req->type > count(static::$TYPES)-1)
				$req->merge(['type' => 0]);

		$typeIndex = $req->type ?? 0;
		$type = ucwords(static::$TYPES[$typeIndex]);

		if ($typeIndex == 2)
			$type = strtoupper($type);

		return view('admin.recipes.index', [
			'type' => $type
		]);
	}
}