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
						<div class="h-100 pb-3 pb-lg-0 text-center image-input collapse show avatar_holder" id="web-logo-image-input-wrapper">
							<div class="h-100 row border rounded py-2 mx-1">
								<div class="col-12 col-lg-6 justify-content-start">
									<div class="hover-cam mx-auto input-avatar rounded overflow-hidden border border-lg-0">
										<img src="{{ $webLogo }}" class="hover-zoom img-fluid input-avatar" id="web-logo-container" alt="Website Logo" data-default-src="{{ asset('uploads/settings/default.png') }}">
										<span class="icon text-center image-input-float" id="web-logo" tabindex="0">
											<i class="fas fa-camera text-white hover-icon-2x"></i>
										</span>
									</div>
									<input type="file" name="web-logo" class="d-none" accept=".jpg,.jpeg,.png,.webp" data-role="image-input" data-target-image-container="#web-logo-container" data-target-name-container="#web-logo-name" >
									<h6 id="web-logo-name" class="text-truncate w-50 mx-auto text-center" data-default-name="{{ $webLogoName }}">{{ $webLogoName }}</h6>
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
						<span class="text-danger small">{{ $errors->first('web-logo') }}</span>
					</div>
				</div>

				<div class="col-12 col-lg-6">
					{{-- APP NAME --}}
					<div class="form-group">
						<label class="form-label">Website Name</label>
						<input type="text" name="web-name" class="form-control" value="{{ $webName }}" required />
						<span class="text-danger small">{{ $errors->first('web-name') }}</span>
					</div>

					{{-- APP DESCRIPTION --}}
					<div class="form-group text-counter-parent">
						<label for="web-desc" class="form-label">Website Description</label>
						<textarea name="web-desc" id="web-desc" class="form-control not-resizable text-counter-input" rows="5" data-max="255" data-warn-at="10" required>{{ $webDesc }}</textarea>
						<span class="text-counter small">255</span>
						<span class="text-danger small">{{ $errors->first('web-desc') }}</span>
					</div>
				</div>
			</div>

			{{-- DIVIDER --}}
			<hr class="hr-thick-100 my-5">

			<h3 class="text-center fw-bold mb-5">Reaching Out</h3>

			{{-- SOCIAL LINKS --}}
			<div class="row">
				<div class="col-12" id="socialLinks">
					<div class="border rounded table-responsive-container">
						<div class="table-responsive">
							<table class="table table-striped table-hover table-sm my-2">
								<thead>
									<tr>
										<th class="p-3" scope="col"></th>
										<th class="p-3" scope="col">Website</th>
										<th class="p-3" scope="col">URL</th>
									</tr>
								</thead>

								<tbody class="table-group-divider" id="socialLinkList">
									@php
									$i = 0;
									@endphp

									@forelse ($socialLinks as $sl)
									<tr class="slideFromLeft delay-animation" style="--anim-delay: {{ $i }}s;">
										{{-- REMOVE --}}
										<td class="align-middle p-3">
											<div class="d-flex w-100 h-100 justify-content-center align-items-center">
												<i class="fas fa-circle-minus fa-xs btn btn-outline-danger btn-sm p-1 rounded-circle remove-sl"></i>
											</div>
										</td>

										{{-- WEBSITE --}}
										<td class="align-middle p-3">
											<div class="input-group flex-nowrap">
												<span class="input-group-text">
													{!! $sl->drawIcon() !!}
												</span>

												<select class="form-select form-control w-auto website-input {{ $errors->has("website." . ($i * 4)) ? 'is-invalid' : '' }}" {{ $sl->isSelected("Other") ? '' : 'name=website[]' }} autocomplete="off" title="Website">
													@foreach ($sites as $site => $siteName)
														<option data-icon="fab fa-{{ $site }}" value="{{ $siteName }}" {{ $sl->isSelected($site) ? "selected" : "" }}>{{ $siteName }}</option>
													@endforeach
													<option data-icon="fas fa-globe" value="Other" {{ $sl->isSelected("Other") ? "selected" : "" }}>Other</option>
												</select>

												{{-- Invisible input for when the selected website is "Others" --}}
												<input type="text" class="form-control small w-auto {{ $sl->isSelected("Other") ? '' : 'd-none' }} website-input-alt {{ $errors->has("website." . ($i * 4)) ? 'is-invalid' : '' }}" {{ $sl->isSelected("Other") ? 'name=website[]' : '' }} value="{{ $sl->website }}">
											</div>
										</td>

										{{-- URL --}}
										<td class="align-middle p-3">
											<input type="text" class="form-control w-auto w-lg-100 {{ $errors->has("url." . ($i * 4)) ? 'is-invalid' : '' }}" name="url[]" value="{{ $sl->url }}">
											<span class="text-danger small d-block">{{ $errors->first("url." . ($i * 4)) }}</span>
										</td>
									</tr>
									@php
									$i += .25;
									@endphp
									@empty
									<tr colspan="3">
										Nothing to show <i class="fas fa-wind"></i>
									</tr>
									@endforelse
								</tbody>

							</table>
						</div>

						{{-- ADD BUTTON --}}
						<div class="d-flex">
							<button class="btn btn-outline-secondary border-style-dashed border-3 w-75 mx-auto my-2" type="button" id="addSocialLink">
								<i class="fas fa-circle-plus"></i>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="d-flex justify-content-center my-3">
				<button type="submit" class="btn btn-success mx-3">Submit</button>
				<button type="button" class="btn btn-danger mx-3" id="revert">Revert to Default</button>
			</div>
		</form>
	</div>
</div>
@endsection

@section('meta')
<meta name="bearer" content="{{ session('bearer') }}">
<meta name="xsrf" content="{{ csrf_token() }}">
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="{{ mix('css/util/image-input.css') }}">
<link rel="stylesheet" type="text/css" href="{{ mix('css/util/text-counter.css') }}">
@endsection

@section('scripts')
<script type="text/javascript" src="{{ mix('views/admin/settings/settings.js') }}" defer></script>
<script type="text/javascript" src="{{ mix('js/util/image-input.js') }}" defer></script>
<script type="text/javascript" nonce="{{ csp_nonce() }}" data-remove-script>
	@if ($editSettingsPerm)
	const API = {
		home: `{{ route("home") }}`,
		reset: `{{ route("api.admin.settings.reset") }}`,
		sites: `{{ route("api.admin.settings.supported-websites") }}`,
	}
	@else
	$(() => {
		$.each($('form').find('input, textarea'), (k, v) => {
			$(v).prop('readonly', true);
		});
	});
	@endif
</script>
<script type="text/javascript" src="{{ mix('js/util/remove-script.js') }}" data-remove-script defer></script>
@endsection

@php
// TODO: Continue Settings
// + Social Links
// + Facebook Refresh?
@endphp
