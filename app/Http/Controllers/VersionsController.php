<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Version;

use DB;
use Exception;
use File;
use Image;
use Log;
use Validator;

class VersionsController extends Controller
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
		$versions = Version::query();

		// Version filter
		$typeIndex = $req->type ?? [0];
		$selectedTypes = [];
		foreach ($typeIndex as $i) {
			array_push($selectedTypes, $types[$i]);
		}

		if (!in_array('all', $selectedTypes)) {
			$versions->whereIn('version', $selectedTypes);
		}


		// Search filter
		if ($req->has('search')) {
			$search = $req->search;
			$versions->where(function($q) use ($search) {
				$q->where('version', 'like', "%$search%")
					->orWhere('description', 'like', "%$search%")
					->orWhereConcat(['v', 'major_version', '.', 'minor_version', '.', 'patch_version', '-', 'version'], 'like', "%$search%");
			});
		}

		// Status filter
		if ($req->has('stat')) {
			$stat = $req->stat;
			$active = false;
			$inactive = false;

			if (in_array('1', $stat)) $active = true;
			if (in_array('2', $stat)) $inactive = true;

			if ($active && $inactive) $versions->withTrashed();
			else if ($inactive) $versions->onlyTrashed();
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
				$versions->orderBy("release_date->{$platform}", $dir);
			}
			else if ($sort === 'website_release_date') {
				$versions->orderBy('created_at', $dir);
			}
			else {
				$sortDefault = true;
			}
		}

		if ($sortDefault) {
			$dir = $req->sortDir ?? 'desc';
			$sort = ['version', '-', 'major_version', '.', 'minor_version', '.', 'patch_version'];
			$versions->orderByConcat($sort, $dir);
		}

		$versions = $versions->paginate(10)
			->withQueryString();

		// PERM DATA
		$user = auth()->user();
		$permissions = (object) [
			'access' => $user->hasPermission("versions_tab_access"),
			'create' => $user->hasPermission("versions_tab_create"),
			'edit' => $user->hasPermission("versions_tab_edit"),
			'delete' => $user->hasPermission("versions_tab_delete"),
		];

		// Filters
		$filters = (object) [
			'search' => $req->search ?? '',
			'type' => $req->type ?? [],
			'stat' => $req->stat ?? [],
			'sortBy' => $req->sortBy ?? 'version',
			'sortDir' => $req->sortDir ?? 'desc',
		];

		return view('admin.versions.index', [
			'types' => $types,
			'perms' => $permissions,
			'versions' => $versions,
			'filters' => $filters,
		]);
	}

	protected function create() {
		$devVer = Version::getReleaseTypes();

		$defaultBanner = Version::getDefaultBanner();

		return view('admin.versions.create', [
			'devVersions' => $devVer,
			'defaultBanner' => $defaultBanner,
		]);
	}

	protected function store(Request $req) {
		$validator = Validator::make(
			$req->all(),
			Version::getValidationRules(),
			Version::getValidationMessages()
		);

		if ($validator->fails()) {
			return redirect()->back()
				->withErrors($validator)
				->withInput($req->all());
		}

		$cleanData = (object) $validator->validated();

		try {
			DB::beginTransaction();

			// BANNER HANDLER
			if ($req->has('banner')) {
				$bannerName = "v{$cleanData->majorVersion}.{$cleanData->minorVersion}.{$cleanData->patchVersion}-{$cleanData->devVersion}.webp";
				$destinationPath = "uploads/versions";

				$bannerImg = Image::make($cleanData->banner);
				$bannerImg->encode('webp', 75)
					->save("{$destinationPath}/{$bannerName}");

				$cleanData->banner = $bannerName;
			}

			// CHANGELOG HANDLER
			$cleanData->changelog = json_encode([
				'add' => $cleanData->add,
				'mod' => $cleanData->mod,
				'rem' => $cleanData->rem,
			]);
			unset($cleanData->add);
			unset($cleanData->mod);
			unset($cleanData->rem);

			// COMPATIBILITY HANDLER
			$cleanData->compatibility = json_encode([
				'bedrock' => $cleanData->bedrock,
				'java' => $cleanData->java,
			]);
			unset($cleanData->bedrock);
			unset($cleanData->java);

			// DOWNLOAD LINKS HANDLER
			$bdl = [];
			$jl = [];

			foreach ($cleanData->bedrockDL as $k => $v) {
				$bdl[$cleanData->bedrockDLW[$k]] = $v;
			}

			foreach ($cleanData->javaDL as $k => $v) {
				$jl[$cleanData->javaDLW[$k]] = $v;
			}

			$cleanData->bedrock_link = json_encode($bdl);
			$cleanData->java_link = json_encode($jl);
			unset($cleanData->bedrockDL);
			unset($cleanData->bedrockDLW);
			unset($cleanData->javaDL);
			unset($cleanData->javaDLW);

			// RELEASE DATE HANDLER
			$cleanData->release_date = json_encode([
				'bedrock' => $cleanData->bedrockRD,
				'java' => $cleanData->javaRD,
			]);
			unset($cleanData->bedrockRD);
			unset($cleanData->javaRD);

			Version::create([
				'banner' => $cleanData->banner,
				'version' => $cleanData->devVersion,
				'major_version' => $cleanData->majorVersion,
				'minor_version' => $cleanData->minorVersion,
				'patch_version' => $cleanData->patchVersion,
				'description' => $cleanData->description,
				'description' => $cleanData->description,
				'changelog' => $cleanData->changelog,
				'compatibility' => $cleanData->compatibility,
				'release_date' => $cleanData->release_date,
				'bedrock_link' => $cleanData->bedrock_link,
				'java_link' => $cleanData->java_link,
			]);

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error($e);

			return redirect()->back()
				->withInput()
				->with('flash_error', 'An error occurred while creating the version. Please report this to the site administrator.');
		}

		return redirect()
			->route('admin.versions.index')
			->with('flash_success', 'Version created successfully!');
	}

	protected function show(Request $req, $id) {
		$version = Version::findOrFail($id);

		return view('admin.versions.show', [
			'version' => $version,
		]);
	}

	protected function edit($id) {
		$version = Version::findOrFail($id);

		$devVer = Version::getReleaseTypes();

		$defaultBanner = Version::getDefaultBanner();

		return view('admin.versions.edit', [
			'version' => $version,
			'devVersions' => $devVer,
			'defaultBanner' => $defaultBanner,
		]);
	}

	protected function update(Request $req, $id) {
		$version = Version::findOrFail($id);

		$validator = Validator::make(
			$req->all(),
			Version::getValidationRules(),
			Version::getValidationMessages()
		);

		if ($validator->fails()) {
			return redirect()->back()
				->withErrors($validator)
				->withInput($req->all());
		}

		$cleanData = (object) $validator->validated();

		try {
			DB::beginTransaction();

			// BANNER HANDLER
			$hasBanner = $req->has('banner');
			if ($hasBanner) {
				// OLD BANNER DELETION
				if ($version->banner != Version::getDefaultBanner(false))
					File::delete(public_path() . "/uploads/versions/{$version->banner}");

				$bannerName = "v{$cleanData->majorVersion}.{$cleanData->minorVersion}.{$cleanData->patchVersion}-{$cleanData->devVersion}.webp";
				$destinationPath = "uploads/versions";

				$bannerImg = Image::make($cleanData->banner);
				$bannerImg->encode('webp', 75)
					->save("{$destinationPath}/{$bannerName}");

				$cleanData->banner = $bannerName;
			}

			// CHANGELOG HANDLER
			$cleanData->changelog = json_encode([
				'add' => $cleanData->add,
				'mod' => $cleanData->mod,
				'rem' => $cleanData->rem,
			]);
			unset($cleanData->add);
			unset($cleanData->mod);
			unset($cleanData->rem);

			// COMPATIBILITY HANDLER
			$cleanData->compatibility = json_encode([
				'bedrock' => $cleanData->bedrock,
				'java' => $cleanData->java,
			]);
			unset($cleanData->bedrock);
			unset($cleanData->java);

			// DOWNLOAD LINKS HANDLER
			$bdl = [];
			$jl = [];

			foreach ($cleanData->bedrockDL as $k => $v) {
				$bdl[$cleanData->bedrockDLW[$k]] = $v;
			}

			foreach ($cleanData->javaDL as $k => $v) {
				$jl[$cleanData->javaDLW[$k]] = $v;
			}

			$cleanData->bedrock_link = json_encode($bdl);
			$cleanData->java_link = json_encode($jl);
			unset($cleanData->bedrockDL);
			unset($cleanData->bedrockDLW);
			unset($cleanData->javaDL);
			unset($cleanData->javaDLW);

			// RELEASE DATE HANDLER
			$cleanData->release_date = json_encode([
				'bedrock' => $cleanData->bedrockRD,
				'java' => $cleanData->javaRD,
			]);
			unset($cleanData->bedrockRD);
			unset($cleanData->javaRD);

			if ($hasBanner)
				$version->update(['banner' => $cleanData->banner]);

			$version->update([
				'version' => $cleanData->devVersion,
				'major_version' => $cleanData->majorVersion,
				'minor_version' => $cleanData->minorVersion,
				'patch_version' => $cleanData->patchVersion,
				'description' => $cleanData->description,
				'changelog' => $cleanData->changelog,
				'compatibility' => $cleanData->compatibility,
				'release_date' => $cleanData->release_date,
				'bedrock_link' => $cleanData->bedrock_link,
				'java_link' => $cleanData->java_link,
			]);

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error($e);

			return redirect()->back()
				->withInput()
				->with('flash_error', 'An error occurred while updating the version. Please report this to the site administrator.');
		}

		return redirect()->route('admin.versions.index')
			->with('flash_success', 'Version updated successfully!');
	}

	protected function archive($id) {
		$version = Version::findOrFail($id);

		$version->delete();

		return redirect()->back()
			->with('flash_success', 'Version archived successfully!');
	}

	protected function unarchive($id) {
		$version = Version::onlyTrashed()->findOrFail($id);

		$version->restore();

		return redirect()->back()
			->with('flash_success', 'Version activated successfully!');
	}

	protected function delete($id) {
		$version = Version::withTrashed()->findOrFail($id);

		// OLD BANNER DELETION
		if ($version->banner != Version::getDefaultBanner(false))
			File::delete(public_path() . "/uploads/versions/{$version->banner}");

		$version->forceDelete();

		return redirect()->back()
			->with('flash_success', 'Version deleted successfully!');
	}
}
