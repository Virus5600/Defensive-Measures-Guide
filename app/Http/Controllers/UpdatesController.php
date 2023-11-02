<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Updates;

class UpdatesController extends Controller
{
	protected function index(Request $req) {
		// RELEASE FILTER HANDLER
		$types = Updates::getReleaseTypes();
		array_unshift($types, 'all');

		if ($req->has('type')) {
			$num = intval($req->type);
			if ($num < 0 || $num > count($types)-1) {
				$req->merge(['type' => 0]);
			}
		}

		$typeIndex = $req->type ?? 0;
		$type = ucwords($types[$typeIndex]);

		// FETCH UPDATES (VERSIONS)
		$updates = Updates::query();

		if ($typeIndex > 0) {
			$updates->where('release_type', '=', $type);
		}

		$updates = $updates->get();

		// PERM DATA
		$user = auth()->user();
		$permissions = (object) [
			'access' => $user->hasPermission("updates_tab_access"),
			'create' => $user->hasPermission("updates_tab_create"),
			'edit' => $user->hasPermission("updates_tab_edit"),
			'delete' => $user->hasPermission("updates_tab_delete"),
		];

		return view('admin.updates.index', [
			'type' => $type,
			'perms' => $permissions,
			'updates' => $updates,
		]);
	}
}
