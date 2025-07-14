<?php

namespace App\Enums\Types;

use DeviceDetector\DeviceDetector;

use App\Models\User;
use App\Services\ApiService;
use App\Traits\BaseEnumTraits;

enum NotificationType: string
{
	use BaseEnumTraits;

	case PASSWORD_RESET = "passwordReset";

	/**
	 * Returns a string title for the type of notification. This allows
	 * different titles to be displayed in the email template depending on
	 * what kind of notification is being sent.
	 *
	 * @return string
	 */
	function getTitle(): string
	{
		return match ($this) {
			self::PASSWORD_RESET => "Your " . \App\Models\Settings::getValue("web-name") . " password has been updated."
		};
	}

	/**
	 * Returns a string message for the type of notification. This allows
	 * different messages to be displayed in the email template depending on
	 * what kind of notification is being sent.
	 *
	 * Some messages has placeholders that will be replaced with the actual
	 * values when the email is being sent.
	 *
	 * For the list of placeholders for each type of notification, see the
	 * documentation for `getMsgPlaceholders` method.
	 *
	 * @return string
	 *
	 * @see getMsgPlaceholders
	 */
	function getMessage(): string
	{
		return match ($this) {
			self::PASSWORD_RESET => "
				<p>Your password has been successfully updated!</p>
				<p>Here's some details about the update:</p>

				<ul>
					<li><strong>Time:</strong> :time</li>
					<li><strong>Device:</strong> :device</li>
					<li><strong>IP Address:</strong> :ip</li>
					<li><strong>Location:</strong> :location</li>
				</ul>

				<p>
					If this wasn't you, <span>reset your password immediately</span>
					and please contact us through the following:
				</p>

				<ul>
					<li>Email: <a href='mailto::supportEmail'>:supportEmail</a></li>
					:additionalContacts
				</ul>
				"
		};
	}

	function getSubject(): string
	{
		return match ($this) {
			self::PASSWORD_RESET => "Your Password Has Been Updated"
		};
	}

	/**
	 * Returns an array of additional tags for the type of notification. This tags
	 * will be used by the mailer to categorize the email.
	 *
	 * @return array
	 */
	function getAdditonalTags(): array
	{
		return match ($this) {
			self::PASSWORD_RESET => [
				'password-reset',
				'account',
				'password',
				'reset',
				'update'
			]
		};
	}

	/**
	 * Returns an array of placeholders that will be replaced with the actual
	 * values when the email is being sent.
	 *
	 * ---
	 *
	 * **`PASSWORD_RESET`:**
	 * - `:time`: The time the password was reset.
	 * - `:device`: The device used to reset the password.
	 * - `:ip`: The IP address of the device.
	 * - `:location`: The location of the device.
	 * - `:supportEmail`: The support's email address.
	 * - `:additionalContacts`: Additional contacts to reach out to. Must be in this format: ```<li>Key: Value</li>``` (Optional)
	 *
	 * @return array
	 */
	function getMsgPlaceholders(): array
	{
		return match ($this) {
			self::PASSWORD_RESET => [
				':time' => configNowTZ(),
				':device' => function (?string $userAgent) {
					$dd = new DeviceDetector($userAgent);
					$dd->parse();
					return ucfirst($dd->getDeviceName()) . "({$dd->getOs()["name"]} - {$dd->getClient()["name"]})";
				},
				':ip' => User::getIP(),
				':location' => (new ApiService())->getGeolocation(User::getIP(), "country"),
				':supportEmail' => '',
				':additionalContacts' => '',
			]
		};
	}
}
