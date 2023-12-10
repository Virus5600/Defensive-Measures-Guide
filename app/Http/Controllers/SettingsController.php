<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Settings;
use App\Models\SocialLinks;

use DB;
use Exception;
use File;
use Log;
use Validator;

class SettingsController extends Controller
{
	protected function index() {
		$settings = Settings::get(["name", "value"])->keyBy("name")->toArray();
		// META DATA
		$webLogo = Settings::getInstance("web-logo")->getImage(!Settings::getInstance("web-logo")->is_file);
		$webLogoName = $settings["web-logo"]["value"];
		$webName = $settings["web-name"]["value"];
		$webDesc = $settings["web-desc"]["value"];

		// PERM DATA
		$editSettingsPerm = auth()->user()->hasPermission("settings_tab_edit");

		// SOCIAL LINKS
		$socialLinks = SocialLinks::get();
		$sites = SocialLinks::getSupportedWebsites();

		return view("admin.settings", [
			"webLogo" => $webLogo,
			"webLogoName" => $webLogoName,
			"webName" => $webName,
			"webDesc" => $webDesc,
			"editSettingsPerm" => $editSettingsPerm,
			"socialLinks" => $socialLinks,
			"sites" => $sites
		]);
	}

	protected function update(Request $req) {
		// Removes the empty variables for easier validation FFS.
		if (empty($req->website)) {
			$req->request->remove("website");
		}
		if (empty($req->url)) {
			$req->request->remove("url");
		}

		// Validates the inputs
		$validator = Validator::make($req->all(), [
			"web-name" => ['required', 'string', 'max:16777215'],
			"web-desc" => ['required', 'string', 'max:16777215'],
			"web-logo" => ['max:5120', 'mimes:jpeg,jpg,png,webp', 'nullable'],
			"website" => ['sometimes', 'required', 'array'],
			"website.*" => ['sometimes', 'required', 'string', 'max:255'],
			"url" => ['sometimes', 'required', 'array'],
			"url.*" => ['sometimes', 'required', 'string', 'max:255', 'regex:/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i'],
		], [
			"web-name.required" => "Website Name is required",
			"web-name.string" => "Website Name should be a string of characters",
			"web-name.max" => "Website Name should not exceed 16,777,215 characters",
			"web-desc.required" => "Website Description is required",
			"web-desc.string" => "Website Description should be a string of characters",
			"web-desc.max" => "Website Description should not exceed 16,777,215 characters",
			"web-logo.max" => "Image should be below 5MB",
			"web-logo.mimes" => "Selected file doesn\'t match the allowed image formats",
			"website.required" => "A website entry is required",
			"website.array" => "Please refrain from tampering the website's input",
			"website.*.required" => "A website name is required",
			"website.*.string" => "Website name should be a string of characters",
			"website.*.max" => "Website name should not exceed 255 characters",
			"url.required" => "A URL entry is required",
			"url.array" => "Please refrain from tampering the URL's input",
			"url.*.required" => "A URL is required",
			"url.*.string" => "URL should be a string of characters",
			"url.*.max" => "URL should not exceed 255 characters",
			"url.*.regex" => "URL should be a valid URL",
		]);

		if ($validator->fails()) {
			return redirect()
				->back()
				->withInput()
				->withErrors($validator);
		}

		try {
			DB::beginTransaction();

			// SETTINGS UPDATE
			foreach ($req->except(["_token", "_method", "website", "url"]) as $k => $v) {
				if ($k == "web-logo") {
					if ($req->has($k)) {
						$setting = Settings::where("name", "=", $k)->first();

						if ($setting->value != "default.png")
							File::delete(public_path() . "/uploads/settings/{$setting->value}");

						$destination = "uploads/settings";
						$fileType = $req->file($k)->getClientOriginalExtension();
						$v = "favicon.{$fileType}";
						$req->file($k)->move($destination, $v);
					}
					else
						continue;
				}

				$setting = Settings::where("name", "=", $k)->first();

				if ($setting != null) {
					$setting->value = $v;
					$setting->save();
				}
			}

			// SOCIAL LINKS UPDATE
			$icons = SocialLinks::getSupportedWebsites();
			$iconValues = array_values($icons);

			for ($i = 0; $i < count($req->website); $i++) {
				$website = $req->website[$i];
				$url = $req->url[$i];
				$icon = in_array($website, $iconValues) ? array_keys($icons, $website)[0] : "globe";

				SocialLinks::updateOrCreate([
					'url' => $url,
				], [
					'website' => $website,
					'icon' => $icon,
				]);
			}

			$old = SocialLinks::get(["url"])->toArray();
			$new = $req->url;
			$removed = [];
			foreach ($old as $o) {
				if (!in_array($o["url"], $new)) {
					array_push($removed, $o["url"]);
				}
			}

			SocialLinks::whereIn("url", $removed)->delete();

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error($e);

			return redirect()
				->route("admin.settings.index")
				->withInput()
				->with("flash_error", "Something went wrong, please try again later");
		}

		return redirect()
			->route("admin.settings.index")
			->with("flash_success", "Successfully updated settings");
	}

	protected function reset(Request $req) {
		$success = true;
		$msg = "Successfully reset " . ($type ?? "all settings") . " to default value(s)";

		if ($req->type) {
			$validator = Validator::make($req->all(), [
				"type" => ["required", "string", "max:255", "exists:settings,name"],
			], [
				"type.required" => "Type is required",
				"type.string" => "Type should be a string of characters",
				"type.max" => "Type should not exceed 255 characters",
				"type.exists" => "There's no such option as {$req->type}",
			]);

			if ($validator->fails()) {
				return response()
					->json([
						"success" => false,
						"errors" => json_encode($validator->errors()->toArray())
					]);
			}
		}

		try {
			DB::beginTransaction();

			if ($req->type) {
				$settings = Settings::where("name", "=", $req->type)->first();

				$settings->value = $settings->default_value;
				$settings->save();
			}
			else {
				$settings = Settings::all();

				foreach ($settings as $s) {
					if ($s->name == "web-logo") {
						if ($s->value != "default.png")
							File::delete(public_path() . "/uploads/settings/{$s->value}");
					}

					$s->value = $s->default_value;
					$s->save();
				}
			}

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error($e);

			$success = false;
			$msg = "Something went wrong, please try again later";
		}

		return response()
			->json([
				"success" => $success,
				"message" => $msg,
				"settings" => json_encode(Settings::select(["name", "value"])->get()->toArray()),
			]);
	}

	protected function getSupportedWebsites() {
		$websites = SocialLinks::getSupportedWebsites();

		return response()
			->json([
				"success" => true,
				"websites" => json_encode($websites),
			]);
	}
}
