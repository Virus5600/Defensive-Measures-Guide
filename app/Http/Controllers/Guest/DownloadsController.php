<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Version;

class DownloadsController extends Controller
{
    protected function index(Request $req) {
		$versions = Version::all();

		return view('downloads.index', [
			'downloads' => $versions
		]);
	}
}
