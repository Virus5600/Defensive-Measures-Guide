<?php

namespace App\View\Composers;

use Illuminate\View\View;

class PermissionsComposer
{
	public function compose(View $view)
	{
		if (auth()->check()) {
			$user = auth()->user();
			$permissions = $user->permissions();

			view()->share("userPerms", $permissions);
		}
	}
}
