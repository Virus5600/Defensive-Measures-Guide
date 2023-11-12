<div class="sidebar collapse-horizontal bg-dark shadow-lg w-lg-auto" id="sidebar" aria-labelledby="sidebar-toggler" aria-expanded="false">
	{{-- Navigatiopn Bar (SIDE) --}}
	<div class="sidebar-content d-flex flex-column py-3 px-0 overflow-y-auto bg-body-secondary bg-opacity-50">
		{{-- DASHBOARD --}}
		@if (Request::is('admin/dashboard'))
		<span class="bg-secondary"><i class="fas fa-tachometer-alt me-2 col-2"></i>Dashboard</span>
		@elseif (Request::is('admin/dashboard*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.dashboard') }}" aria-hidden="false" aria-label="Dashboard"><i class="fas fa-tachometer-alt me-2 col-2"></i>Dashboard</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.dashboard') }}" aria-hidden="false" aria-label="Dashboard"><i class="fas fa-tachometer-alt me-2 col-2"></i>Dashboard</a>
		@endif

		{{-- WRITER CONTENT CONTROLS --}}
		<hr>
		<small class="ms-3"><small>Writer's Area</small></small>

		{{-- Versions --}}
		@if (Request::is('admin/versions'))
		<span class="bg-secondary"><i class="fas fa-code-pull-request me-2 col-2"></i>Versions</span>
		@elseif (Request::is('admin/versions*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.versions.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-code-pull-request me-2 col-2"></i>Versions</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.versions.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-code-pull-request me-2 col-2"></i>Versions</a>
		@endif

		{{-- DM CONTENT CONTROLS --}}
		<hr>
		<small class="ms-3"><small>DM Content</small></small>

		{{-- Items --}}
		@if (Request::is('admin/items'))
		<span class="bg-secondary"><i class="fas fa-cube me-2 col-2"></i>Items</span>
		@elseif (Request::is('admin/items*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.items.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-cube me-2 col-2"></i>Items</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.items.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-cube me-2 col-2"></i>Items</a>
		@endif

		{{-- Recipes --}}
		@if (Request::is('admin/recipes'))
		<span class="bg-secondary"><i class="fas fa-scroll me-2 col-2"></i>Recipes</span>
		@elseif (Request::is('admin/recipes*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.recipes.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-scroll me-2 col-2"></i>Recipes</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.recipes.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-scroll me-2 col-2"></i>Recipes</a>
		@endif

		{{-- Entities --}}
		@if (Request::is('admin/entities'))
		<span class="bg-secondary"><i class="fas fa-crosshairs me-2 col-2"></i>Entities</span>
		@elseif (Request::is('admin/entities*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.entities.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-crosshairs me-2 col-2"></i>Entities</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.entities.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-crosshairs me-2 col-2"></i>Entities</a>
		@endif

		{{-- ADMIN CONTROLS --}}
		<hr>
		<small class="ms-3"><small>Admin Controls</small></small>

		{{-- Users --}}
		@if (Request::is('admin/users'))
		<span class="bg-secondary"><i class="fas fa-users me-2 col-2"></i>Users</span>
		@elseif (Request::is('admin/users*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.users.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-users me-2 col-2"></i>Users</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.users.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-users me-2 col-2"></i>Users</a>
		@endif

		{{-- User Types --}}
		@if (Request::is('admin/user-types'))
		<span class="bg-secondary"><i class="fas fa-circle-user me-2 col-2"></i>User Types</span>
		@elseif (Request::is('admin/user-types*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.user-types.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-circle-user me-2 col-2"></i>User Types</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.user-types.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-circle-user me-2 col-2"></i>User Types</a>
		@endif

		{{-- Permissions --}}
		@if (Request::is('admin/permissions'))
		<span class="bg-secondary"><i class="fas fa-lock me-2 col-2"></i>Permissions</span>
		@elseif (Request::is('admin/permissions*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.permissions.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-lock me-2 col-2"></i>Permissions</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.permissions.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-lock me-2 col-2"></i>Permissions</a>
		@endif

		{{-- Activity Log --}}
		@if (Request::is('admin/activity-log'))
		<span class="bg-secondary"><i class="fas fa-book me-2 col-2"></i>Activity Log</span>
		@elseif (Request::is('admin/activity-log*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.activity-log.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-book me-2 col-2"></i>Activity Log</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.activity-log.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-book me-2 col-2"></i>Activity Log</a>
		@endif

		{{-- Settings --}}
		@if (Request::is('admin/settings'))
		<span class="bg-secondary"><i class="fas fa-gear me-2 col-2"></i>Settings</span>
		@elseif (Request::is('admin/settings*'))
		<a class="text-decoration-none bg-secondary aria-link" href="{{ route('admin.settings.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-gear me-2 col-2"></i>Settings</a>
		@else
		<a class="text-decoration-none aria-link" href="{{ route('admin.settings.index') }}" aria-hidden="false" aria-label="Items"><i class="fa fa-gear me-2 col-2"></i>Settings</a>
		@endif
	</div>
</div>
