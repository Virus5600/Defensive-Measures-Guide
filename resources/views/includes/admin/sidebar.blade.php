<div class="d-flex flex-row dark-shadow position-absolute position-lg-relative h-100 w-100 w-lg-auto" style="overflow: hidden;">
	{{-- Navigatiopn Bar (SIDE) --}}
	<div class="sidebar shadow d-flex flex-column py-3 px-0 collapse-horizontal overflow-y-auto h-100 bg-body-secondary bg-opacity-50" id="sidebar" aria-labelledby="sidebar-toggler" aria-expanded="false">
		{{-- DASHBOARD --}}
		@if (\Request::is('admin/dashboard'))
		<span class="bg-secondary text-white"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</span>
		@elseif (\Request::is('admin/dashboard*'))
		<a class="text-decoration-none bg-secondary text-white aria-link" href="{{ route('admin.dashboard') }}" aria-hidden="false" aria-label="Dashboard"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a>
		@else
		<a class="text-decoration-none text-dark aria-link" href="{{ route('admin.dashboard') }}" aria-hidden="false" aria-label="Dashboard"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a>
		@endif
	</div>
</div>