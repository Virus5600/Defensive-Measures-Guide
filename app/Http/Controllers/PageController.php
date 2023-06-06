<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Facebook\Facebook;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Exceptions\FacebookResponseException;

use Exception;
use Log;

class PageController extends Controller
{
	private $fb;
	private $APP_ID;
	private $APP_SECRET;

	// CONSTRUCTOR
	public function __construct(Facebook $fb) {
		$this->APP_ID = config('services.facebook.client_id');
		$this->APP_SECRET = config('services.facebook.client_secret');

		$this->fb = $fb;
		$this->fb->setDefaultAccessToken(config('services.facebook.access_token'));
	}

	protected function index(Facebook $fb) {
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
		
		return view('index', [
			'videos' => $videos
		]);
	}
}