<?php

namespace App\Enums\Types;

use App\Models\PasswordReset;
use App\Traits\BaseEnumTraits;

enum PasswordResetType: string
{
	use BaseEnumTraits;

	case FORGOT_PASSWORD = "forgotPassword";
	case ACCOUNT_LOCKED = "accountLocked";
	case CHANGE_PASSWORD = "changePassword";

	/**
	 * Returns a string message for the type of password reset. This allows
	 * different messages to be displayed in the email template depending on
	 * what kind of password reset is being performed.
	 *
	 * @return string
	 */
	function getMessage(): string
	{
		return match ($this) {
			self::FORGOT_PASSWORD => "
				<p>It seems you forgot your password. Don't worry, we've got you covered.</p>
				<p>
					The requested password reset link will only be valid for a single day but
					if this is not you, you can check your activity or reset your password.
				</p>
				",
			self::ACCOUNT_LOCKED => "
				<p><b>Your account got locked!</b></p>
				<p>
					Someone tried accessing your account and failed five times. With the repeated failed
					attempts, we decided to lock your account until you update your password.
				</p>
				<p>This is done to prevent the perpetrator from brute forcing their way into your account.</p>

				<p>Is this you?</p>
				<ul>
					<li><b>IP Address:</b> :ip</li>
					<li><b>Location:</b> :location</li>
				</ul>
			",
			self::CHANGE_PASSWORD => "
				<p>Your account just updated its password!</p>
				<p><b>:ip</b> was used to change your password. If this wasn't you, please contact us immediately.</p>
				",
		};
	}

	function getSubject(): string
	{
		return match ($this) {
			self::FORGOT_PASSWORD => "Password Reset Request",
			self::ACCOUNT_LOCKED => "Account Locked",
			self::CHANGE_PASSWORD => "Your Password Has Been Updated",
		};
	}

	function getMsgPlaceholders(): array
	{
		return match ($this) {
			self::ACCOUNT_LOCKED => [
				":ip" => fn(PasswordReset $pr) => $pr->ip,
				":location" => fn(PasswordReset $pr) => $pr->geolocation
			]
		};
	}
}
