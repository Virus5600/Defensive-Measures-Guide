<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Version;

class DownloadsController extends Controller
{
    protected function index(Request $req) {
		// RELEASE FILTER HANDLER
		$types = Version::getReleaseTypes();
		array_unshift($types, 'all');

		if ($req->has('type')) {
			$num = intval($req->type);
			if ($num < 0 || $num > count($types)-1) {
				$req->merge(['type' => [0]]);
			}
		}

		// FETCH VERSIONS
		$downloads = Version::query();

		// Version filter
		$typeIndex = $req->type ?? [0];
		$selectedTypes = [];
		foreach ($typeIndex as $i) {
			array_push($selectedTypes, $types[$i]);
		}

		if (!in_array('all', $selectedTypes)) {
			$downloads->whereIn('version', $selectedTypes);
		}


		// Search filter
		if ($req->has('search')) {
			$search = $req->search;
			$downloads->where(function($q) use ($search) {
				$q->where('version', 'like', "%$search%")
					->orWhere('description', 'like', "%$search%")
					->orWhereConcat(['v', 'major_version', '.', 'minor_version', '.', 'patch_version', '-', 'version'], 'like', "%$search%");
			});
		}

		// Sort by filter
		$sortDefault = true;
		if ($req->has('sortBy')) {
			$sort = $req->sortBy ?? 'version';
			$dir = $req->sortDir ?? 'desc';
			$sortDefault = false;

			if ($sort === 'version') {
				$sortDefault = true;
			}
			else if ($sort === 'java_release_date' || $sort === 'bedrock_release_date') {
				$platform = explode('_', $sort)[0];
				$downloads->orderBy("release_date->{$platform}", $dir);
			}
			else if ($sort === 'website_release_date') {
				$downloads->orderBy('created_at', $dir);
			}
			else {
				$sortDefault = true;
			}
		}

		if ($sortDefault) {
			$dir = $req->sortDir ?? 'desc';
			$sort = ['version', '-', 'major_version', '.', 'minor_version', '.', 'patch_version'];
			$downloads->orderByConcat($sort, $dir);
		}

		$downloads = $downloads->paginate(10)
			->withQueryString();

		// Filters
		$filters = (object) [
			'search' => $req->search ?? '',
			'type' => $req->type ?? [],
			'sortBy' => $req->sortBy ?? 'version',
			'sortDir' => $req->sortDir ?? 'desc',
		];

		return view('downloads.index', [
			'downloads' => $downloads,
			'filters' => $filters,
		]);
	}
}
