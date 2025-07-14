<?php

namespace App\Enums\Types;

use App\Traits\BaseEnumTraits;

enum EmailVerificationType: string
{
	use BaseEnumTraits;

	/**
	 * For when an account just needs verification.
	 */
	case ACCOUNT_VERIFICATION = 'account_verification';

	/**
	 * For when an account is created and needs verification purposes.
	 */
	case ACCOUNT_CREATION = 'account_creation';

	/**
	 * For when an account is deactivated.
	 */
	case ACCOUNT_DEACTIVATION = 'account_deactivation';

	/**
	 * For when an account is re-activated.
	 */
	case ACCOUNT_REACTIVATION = 'account_reactivation';

	/**
	 * For when an account is locked.
	 */
	case ACCOUNT_LOCKED = 'locked';

	/**
	 * For when an email is updated.
	 */
	case EMAIL_UPDATE = 'email_update';

	/**
	 * For when a request for password reset is sent.
	 */
	case PASSWORD_RESET = 'password_reset';

	/**
	 * For when a password is successfully updated.
	 */
	case PASSWORD_UPDATE = 'password_update';

	/**
	 * Get the email subject for the type.
	 */
	function getEmailSubject(): string
	{
		return match ($this) {
			self::ACCOUNT_CREATION,
			self::ACCOUNT_VERIFICATION => 'Account Verification',
			self::ACCOUNT_DEACTIVATION => 'Your Account Has Been De-Activated',
			self::ACCOUNT_REACTIVATION => 'Account Re-Activation',
			self::ACCOUNT_LOCKED => 'Your Account Has Been Locked',
			self::EMAIL_UPDATE => 'Email Update Verification',
			self::PASSWORD_RESET => 'Password Reset Verification',
			self::PASSWORD_UPDATE => 'Password Update Verification',
		};
	}

	/**
	 * Get the email view for the type.
	 */
	function getEmailView(): string
	{
		return match ($this) {
			self::ACCOUNT_CREATION => 'account_creation',
			self::ACCOUNT_DEACTIVATION => 'account_deactivation',
			self::ACCOUNT_REACTIVATION,
			self::ACCOUNT_VERIFICATION => 'verification',
			self::ACCOUNT_LOCKED => 'locked',
			self::EMAIL_UPDATE => 'email_update',
			self::PASSWORD_RESET => 'password_reset',
			self::PASSWORD_UPDATE => 'password_update',
		};
	}
}
