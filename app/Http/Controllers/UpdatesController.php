<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UpdatesController extends Controller
{
	private static $TYPES = ['all', 'alpha', 'beta', 'release'];

	protected function index(Request $req) {
		if ($req->has('type'))
			if ($req->type < 0 || $req->type > count(static::$TYPES)-1)
				$req->merge(['type' => 0]);

		$typeIndex = $req->type ?? 0;
		$type = ucwords(static::$TYPES[$typeIndex]);

		if ($typeIndex == 2)
			$type = strtoupper($type);

		return view('admin.updates.index', [
			'type' => $type
		]);
	}
}