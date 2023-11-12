<?php

namespace App\Http\Controllers;

use App\Models\Versions;
use Illuminate\Http\Request;

use Facebook\Facebook;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Exceptions\FacebookResponseException;

use DB;
use Exception;
use Log;

class PageController extends Controller
{
	private $fb;
	private $APP_ID;
	private $APP_SECRET;
	private $DEFAULT_GRAPH_VERSION;
	private $ACCESS_TOKEN;

	// CONSTRUCTOR
	public function __construct() {
		$this->APP_ID = config('services.facebook.app_id');
		$this->APP_SECRET = config('services.facebook.app_secret');
		$this->DEFAULT_GRAPH_VERSION = config('services.facebook.default_graph_version');
		$this->ACCESS_TOKEN = config('services.facebook.access_token');

		$this->fb = new Facebook([
			'app_id' => $this->APP_ID,
			'app_secret' => $this->APP_SECRET,
			'default_graph_version' => $this->DEFAULT_GRAPH_VERSION,
			'default_access_token' => $this->ACCESS_TOKEN,
		]);
	}

	////////////////
	// GUEST SIDE //
	////////////////
	protected function index() {
		$videos = array();
		try {
			// Fetches the Virus5600 page
			$pages = json_decode($this->fb->get("/me/accounts")->getBody());
			$page = null;
			foreach ($pages->data as $p) {
				if ($p->name == "Virus5600") {
					$page = $p;
					break;
				}
			}

			// Throws an error if the page isn't found.
			if ($page == null)
				throw Exception("Virus5600 Page not Found");

			// Fetches the video lists then find the id of the target list
			$videoList = json_decode($this->fb->get("/{$page->id}/video_lists")->getBody())->data;

			$vl_id = array_filter($videoList, function($vl) {
				if ($vl->title == "Defensive Measures (Minecraft)") {
					return $vl;
				}
			});

			$vl_id = $vl_id[array_keys($vl_id)[0]]->id;

			// Finally, fetch the page's videos
			$videos = json_decode($this->fb->get("/{$vl_id}/videos?fields=embed_html,title,created_time,description")->getBody())
				->data;

			$videos = collect($videos)->sortByDesc("created_time")->chunk(3)[0];
		} catch (FacebookSDKException $e) {
			Log::error($e);
		} catch (FacebookResponseException $e) {
			Log::error($e);
		} catch (Exception $e) {
			Log::error($e);
		}

		///////////////////////////////////
		// ALL OTHER UNCOMPLICATED TASKS //
		///////////////////////////////////

		// Fetch the latest version...
		$latestVersion = Versions::latest()
			->first();

		return view('index', [
			'latestVersion' => $latestVersion,
			'videos' => $videos
		]);
	}

	////////////////
	// ADMIN SIDE //
	////////////////
	protected function dashboard(Request $req) {
		return view('admin.dashboard');
	}
}
