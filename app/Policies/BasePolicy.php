<?php

namespace App\Policies;

abstract class BasePolicy
{
	// CONSTANTS //
	/**
	 * The default deny message for all policies.
	 *
	 * This message has two bindings:
	 * - :action: The action being performed.
	 * - :resource: The resource being acted upon.
	 *
	 * This constant serves as a backup when the deny message should be reset to its default value
	 * using the `setDefaultDenyMessage()` method.
	 *
	 * @var string
	 *
	 * @see BasePolicy::$denyMessage
	 * @see BasePolicy::setDefaultDenyMessage()
	 * @see BasePolicy::denyMessage(string, string)
	 * @see BasePolicy::rawDenyMessage()
	 */
	private const DEFAULT_DENY_MESSAGE = "You are not authorized to :action this :resource.";

	// PROPERTIES //
	/**
	 * The deny message for this policy.
	 *
	 * This can be accessed by subclasses and other classes through
	 * the `denyMessage(string, string)` and `rawDenyMessage()` methods.
	 *
	 * The default deny message is `BasePolicy::DEFAULT_DENY_MESSAGE`.
	 *
	 * @var string
	 *
	 * @see BasePolicy::DEFAULT_DENY_MESSAGE
	 * @see BasePolicy::denyMessage(string, string)
	 * @see BasePolicy::rawDenyMessage()
	 * @see BasePolicy::setDefaultDenyMessage()
	 * @see BasePolicy::setDenyMessage(string)
	 */
	private string $denyMessage = self::DEFAULT_DENY_MESSAGE;

	// METHODS //
	/**
	 * Sets the deny message to the default `BasePolicy::DEFAULT_DENY_MESSAGE` value.
	 *
	 * This method is used to reset the deny message to its default value as the default value is
	 * set to be a private constant.
	 *
	 * @return void
	 *
	 * @see BasePolicy::DEFAULT_DENY_MESSAGE
	 */
	protected function setDefaultDenyMessage(): void
	{
		$this->denyMessage = self::DEFAULT_DENY_MESSAGE;
	}

	/**
	 * Sets a new deny message for this policy.
	 *
	 * Developers can provide bindings in the message that will be replaced with the action and resource
	 */
	protected function setDenyMessage(string $denyMessage): void
	{
		$this->denyMessage = $denyMessage;
	}

	/**
	 * Returns the unparsed deny message without the bindings.
	 *
	 * The returned message depends whether if the deny message was changed in a subclass or not.
	 *
	 * @return string
	 */
	public function rawDenyMessage(): string
	{
		return $this->denyMessage;
	}

	/**
	 * Returns a parsed deny message with bindings replaced.
	 *
	 * Unknown bindings are ignored and not replaced while bindings with no values are replaced
	 * with an empty string.
	 *
	 * @param array $bindings An array of key-value pairs defining the bindings to replace in the deny message.
	 *
	 * @return string
	 *
	 * @see BasePolicy::$denyMessage
	 */
	public function denyMessage(array $bindings): string
	{
		$denyMsg = $this->rawDenyMessage();
		foreach ($bindings as $key => $value) {
			// Unknown bindings are ignored
			if (strpos($denyMsg, ":{$key}") === false) {
				continue;
			}

			$denyMsg = str_replace(":{$key}", $value, $denyMsg);
		}

		// Remove any unused bindings from the deny message before returning
		return preg_replace("/\:\w+/", "", $denyMsg);
	}
}
