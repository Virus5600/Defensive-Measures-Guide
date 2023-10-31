<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use awizemann\metascraper\Facades\MetaScraper;

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
		// META DATA
		$webLogo = Settings::getInstance("web-logo")->getImage(!Settings::getInstance("web-logo")->is_file);
		$webLogoName = Settings::getValue("web-logo");
		$webName = Settings::getValue("web-name");
		$webDesc = Settings::getValue("web-desc");

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
			"url.*" => ['sometimes', 'required', 'string', 'max:255'],
		], [
			"web-name.required" => "Website Name is required",
			"web-name.string" => "Website Name should be a string of characters",
			"web-name.max" => "Website Name should not exceed 16,777,215 characters",
			"web-desc.required" => "Website Description is required",
			"web-desc.string" => "Website Description should be a string of characters",
			"web-desc.max" => "Website Description should not exceed 16,777,215 characters",
			"web-logo.max" => "Image should be below 5MB",
			"web-logo.mimes" => "Selected file doesn\'t match the allowed image formats",
		]);

		if ($validator->fails()) {
			return redirect()
				->back()
				->withInput()
				->withErrors($validator);
		}

		try {
			DB::beginTransaction();

			foreach ($req->except("_token") as $k => $v) {
				if ($k == "contacts" || $k == "emails" || $k == "day-schedule") {
					$v = implode(",", $v);
				}
				else if ($k == "web-logo") {
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
