@php
use App\Models\Settings;

$editSettingsPerm = auth()->user()->hasPermission('settings_tab_edit');
@endphp

@extends('layouts.admin')

@section('title', 'Settings')

@section('content')
<div class="d-flex flex-column h-100">
	<div class="row">
		<div class="col-12 col-lg-4 col-lg mt-3">
			<div class="row">
				{{-- HEADER --}}
				<div class="col-12 text-center text-lg-start">
					<h1 class="fs-2 my-0">Settings</h1>
				</div>
			</div>
		</div>
	</div>
	
	<hr class="border-3 my-4">

	<div class="card shadow-lg py-2 px-3 mb-3" id="inner-content">
		@if ($editSettingsPerm)
		<form method="POST" action="{{ route('admin.settings.update') }}" class="form" enctype="multipart/form-data">
			@csrf
			@method('PUT')
		@else
		<form class="form" readonly>
		@endif

			<h3 class="text-center fw-bold mb-5">Website Related</h3>

			<div class="row">
				{{-- WEB LOGO --}}
				<div class="col-12 col-lg-6">
					{{-- IMAGE INPUT --}}
					<div class="image-input-scope h-100" id="web-logo-scope" data-settings="#image-input-settings" data-fallback-img="{{ asset('uploads/settings/default.png') }}">
						{{-- FILE IMAGE --}}
						<div class="h-100 pb-3 text-center image-input collapse show avatar_holder" id="web-logo-image-input-wrapper">
							<div class="h-100 row border rounded border-secondary-light py-2 mx-1">
								<div class="col-12 col-lg-6 justify-content-start">
									<div class="hover-cam mx-auto input-avatar rounded overflow-hidden">
										<img src="{{ Settings::getInstance('web-logo')->getImage(!Settings::getInstance('web-logo')->is_file) }}" class="hover-zoom img-fluid input-avatar" id="web-logo-container" alt="Website Logo" data-default-src="{{ asset('uploads/settings/default.png') }}">
										<span class="icon text-center image-input-float" id="web-logo" tabindex="0">
											<i class="fas fa-camera text-white hover-icon-2x"></i>
										</span>
									</div>
									<input type="file" name="web-logo" class="d-none" accept=".jpg,.jpeg,.png,.webp" data-role="image-input" data-target-image-container="#web-logo-container" data-target-name-container="#web-logo-name" >
									<h6 id="web-logo-name" class="text-truncate w-50 mx-auto text-center" data-default-name="{{ Settings::getInstance('web-logo')->getImage(!Settings::getInstance('web-logo')->is_file, false) }}">{{ Settings::getInstance('web-logo')->getImage(!Settings::getInstance('web-logo')->is_file, false) }}</h6>
								</div>

								<div class="col-12 col-lg-6 text-lg-start">
									<label class="form-label fw-bold" for="web-logo">Website Logo</label><br>
									<small class="text-muted pb-0 mb-0">
										<b>FORMATS ALLOWED:</b>
										<br>JPEG, JPG, PNG, WEBP
									</small><br>
									<small class="text-muted pt-0 mt-0"><b>MAX SIZE:</b> 5MB</small><br>
								</div>
							</div>
						</div>
					</div>

					{{-- LOGO ERROR --}}
					<div class="text-center">
						<span class="text-danger small">{{$errors->first('web-logo')}}</span>
					</div>
				</div>

				<div class="col-12 col-lg-6">
					{{-- APP NAME --}}
					<div class="form-group">
						<label class="form-label">Website Name</label>
						<input type="text" name="web-name" class="form-control" value="{{ Settings::getValue('web-name') == null ? 'Party Color' : Settings::getValue('web-name') }}" required />
						<span class="text-danger small">{{$errors->first('web-name')}}</span>
					</div>

					{{-- APP DESCRIPTION --}}
					<div class="form-group text-counter-parent">
						<label for="web-desc" class="form-label">Website Description</label>
						<textarea name="web-desc" id="web-desc" class="form-control not-resizable text-counter-input" rows="3" data-max="255" data-warn-at="10" required>{{ Settings::getValue('web-desc') == null ? 'The official website of Taytay Municipal' : Settings::getValue('web-desc') }}</textarea>
						<span class="text-counter small">255</span>
						<span class="text-danger small">{{$errors->first('web-desc')}}</span>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="{{ mix('css/util/image-input.css') }}">
<link rel="stylesheet" type="text/css" href="{{ mix('css/util/text-counter.css') }}">
@endsection

@section('scripts')
<script type="text/javascript" src="{{ mix('js/util/image-input.js') }}"></script>
<script type="text/javascript" src="{{ mix('js/util/text-counter.js') }}"></script>

<script type="text/javascript">
	$(document).ready(() => {
		@if ($editSettingsPerm)
		$('#revert').on('click', (e) => {
			location.reload();
		});
		@else
		$.each($('form').find('input, textarea'), (k, v) => {
			$(v).prop('readonly', true);
		});

		$('div.tag .tag-i').remove();
		@endif
	});
</script>
@endsection

@php
// TODO: Continue Settings
// + Social Links
// + Facebook Refresh?
@endphp
