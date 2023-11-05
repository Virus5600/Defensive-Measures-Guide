<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Updates;

use DB;
use Exception;
use Log;
use Validator;

class UpdatesController extends Controller
{
	protected function index(Request $req) {
		// RELEASE FILTER HANDLER
		$types = Updates::getReleaseTypes();
		array_unshift($types, 'all');

		if ($req->has('type')) {
			$num = intval($req->type);
			if ($num < 0 || $num > count($types)-1) {
				$req->merge(['type' => [0]]);
			}
		}

		// FETCH UPDATES (VERSIONS)
		$updates = Updates::query();

		// Version filter
		$typeIndex = $req->type ?? [0];
		$selectedTypes = [];
		foreach ($typeIndex as $i) {
			array_push($selectedTypes, $types[$i]);
		}

		if (!in_array('all', $selectedTypes)) {
			$updates->whereIn('version', $selectedTypes);
		}


		// Search filter
		if ($req->has('search')) {
			$search = $req->search;
			$updates->where(function($q) use ($search) {
				$q->where('version', 'like', "%$search%")
					->orWhere('description', 'like', "%$search%")
					->orWhereConcat(['v', 'major_version', '.', 'minor_version', '.', 'patch_version', '-', 'version'], 'like', "%$search%");
			});
		}

		$updates = $updates->paginate(10)
			->withQueryString();

		// PERM DATA
		$user = auth()->user();
		$permissions = (object) [
			'access' => $user->hasPermission("updates_tab_access"),
			'create' => $user->hasPermission("updates_tab_create"),
			'edit' => $user->hasPermission("updates_tab_edit"),
			'delete' => $user->hasPermission("updates_tab_delete"),
		];

		// Filters
		$filters = (object) [
			'search' => $req->search ?? ''
		];

		return view('admin.updates.index', [
			'types' => $types,
			'perms' => $permissions,
			'updates' => $updates,
			'filters' => $filters,
		]);
	}
}
