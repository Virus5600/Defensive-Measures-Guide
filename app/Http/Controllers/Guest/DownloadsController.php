<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Version;

use DB;
use Exception;
use Log;
use Validator;

class DownloadsController extends Controller
{
    protected function index(Request $req) {
		$validator = Validator::make(
			$req->only('search', 'type', 'sortBy', 'sortDir'),
			[],
			[]
		);

		$variants = [
			'java',
			'bedrock'
		];

		$downloads = Version::all();

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
