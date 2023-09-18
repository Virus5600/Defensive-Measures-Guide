<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Models\User;

use Artisan;
use Log;
use Mail;

class AccountNotification implements ShouldQueue
{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	private User $user;
	private $type, $args;

	/**
	 * Create a new job instance.
	 * 
	 * @return void
	 */
	public function __construct(User $user, $type, $args) {
		$this->user = $user;
		$this->type = $type;
		$this->args = $args;
	}

	/**
	 * Execute the job.
	 * 
	 * @return void
	 */
	public function handle(): void {
		// Sets the subject
		if (!isset($this->args['subject']))
			$this->args['subject'] = "Account Update";
		else
			$this->args['subject'] = ($this->args['subject'] == null) ? "Account Update" : $this->args['subject'];

		// Sends the email to every single one of the recipients
		foreach ($this->args['recipients'] as $r) {
			Mail::send(
				"layouts.emailos.account.{$this->type}",
				[
					'user' => $this->user,
					'args' => $this->args,
					'recipient' => $r
				],
				function ($m) use ($r) {
					$m->to($r, $r)
						->subject($this->args['subject']);
				}
			);

			// Logs the sent mail
			activity('mailer')
				->byAnonymous()
				->on($this->user)
				->event('mail-sent')
				->withProperties([
					'subject' => $this->args["subject"],
					'recipients' => $this->args["recipients"],
					'email' => $this->args["email"],
					'type' => $this->type,
				])
				->log("Account mail notification sent to {$this->user->getName()}");
		}
	}

	public function __destruct() {
		Log::info("[AccountNotification] Running Queue");

		Artisan::call('queue:work', [
			'--stop-when-empty' => true,
			'--tries' => 3
		]);
	}
}
