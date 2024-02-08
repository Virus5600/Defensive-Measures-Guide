@extends('layouts.admin')

@section('title', 'Edit Version')

@section('content')
<div class="card floating-header rounded my-5">
	{{-- HEADER --}}
	<h2 class="card-header header-center header-lg-start border border-secondary bg-body rounded">
		<button type="button" data-return="{{ route('admin.versions.index') }}" class="remove-button-style text-light">
			<i class="fas fa-share fa-flip-horizontal me-3"></i>Edit Version
		</button>
	</h2>

	{{-- FORM --}}
	<form action="{{ route('admin.versions.update', [$version->id]) }}" method="POST" class="card-body px-3 px-lg-4 needs-validation" enctype="multipart/form-data" id="form-content" data-dos-show-validity>
		@csrf
		@method('PUT')

		{{-- VERSION GROUP --}}
		<div class="card floating-header rounded my-5 border">
			<h4 class="card-header header-center header-lg-start border-0 bg-body required">Version</h4>

			<div class="card-body">
				<div class="form-group">
					<label for="devVersion" class="form-label d-none">Development Version</label>
					<label for="majorVersion" class="form-label d-none">Major Version</label>
					<label for="minorVersion" class="form-label d-none">Minor Version</label>

					<div class="input-group">
						<span class="input-group-text">v</span>

						{{-- MAJOR VERSION --}}
						<input type="number" min="0" class="form-control" id="majorVersion" name="majorVersion" value="{{ $version->major_version }}" required>
						<span class="input-group-text">.</span>

						{{-- MINOR VERSION --}}
						<input type="number" min="0" class="form-control" id="minorVersion" name="minorVersion" value="{{ $version->minor_version }}" required>
						<span class="input-group-text">.</span>

						{{-- PATCH VERSION --}}
						<input type="number" min="0" class="form-control" id="patchVersion" name="patchVersion" value="{{ $version->patch_version }}" required>
						<span class="input-group-text">-</span>

						{{-- DEV VERSION --}}
						<select class="form-select d-inline-block w-auto" id="devVersion" name="devVersion" required>
							@foreach ($devVersions as $dv)
							<option value="{{ $dv }}" {{ $version->version == $dv ? 'selected' : '' }}>{{ $dv }}</option>
							@endforeach
						</select>
					</div>
				</div>

				{{-- VERSION ERROR MESSAGES --}}
				@if ($errors->has('majorVersion') || $errors->has('minorVersion') || $errors->has('patchVersion') || $errors->has('devVersion'))
				<div class="text-danger">{{ $errors->first('majorVersion') ?? $errors->first('minorVersion') ?? $errors->first('patchVersion') ?? $errors->first('devVersion') }}</div>
				@endif
			</div>
		</div>

		{{-- UPDATE INFO GROUP --}}
		<div class="card floating-header rounded my-5 border">
			<h4 class="card-header header-center header-lg-start border-0 bg-body">Version Info</h4>

			<div class="card-body">
				{{-- BANNER --}}
				<div class="form-group">
					@php($banner = $version->getBanner() ?? $defaultBanner)

					{{-- IMAGE INPUT --}}
					<div class="card floating-header rounded my-5 border">
						<label class="card-header header-center header-lg-start border-0 bg-body" for="banner">Banner</label>

						<div class="card-body px-1 px-lg-5">
							<div class="image-input-scope h-100" id="banner-scope" data-settings="#image-input-settings" data-fallback-img="{{ $defaultBanner }}">
								{{-- FILE IMAGE --}}
								<div class="h-100 pb-3 pb-lg-0 text-center image-input collapse show avatar_holder" id="banner-image-input-wrapper">
									<div class="h-100 row rounded py-2 mx-0 mx-lg-1">
										<div class="col-12 justify-content-center px-0 px-lg-2">
											<div class="hover-cam mx-auto rounded overflow-hidden border border-lg-0 w-auto">
												<img src="{{ $banner }}" class="hover-zoom img-fluid h-auto" id="banner-container" alt="Version Banner" data-default-src="{{ $defaultBanner }}">
												<span class="icon text-center image-input-float" id="banner" tabindex="0">
													<i class="fas fa-camera text-white hover-icon-2x"></i>
												</span>
											</div>
											<input type="file" name="banner" class="d-none" accept=".jpg,.jpeg,.png,.webp" data-role="image-input" data-target-image-container="#banner-container" data-target-name-container="#banner-name" >
											<h6 id="banner-name" class="text-truncate w-100 w-lg-50 mx-auto text-center" data-default-name="Banner">{{ $version->banner }}</h6>
										</div>

										{{-- BANNER REQUIREMENTS --}}
										<div class="col-12 {{ $errors->has('banner') ? 'col-lg-6 text-center text-lg-end' : 'text-center' }}">
											<small class="text-muted pb-0 mb-0">
												<b>FORMATS ALLOWED:</b>
												<br>JPEG, JPG, PNG, WEBP
											</small><br>
											<small class="text-muted pt-0 mt-0"><b>MAX SIZE:</b> 5MB</small><br>
										</div>

										{{-- LOGO ERROR --}}
										@if ($errors->has('banner'))
										<div class="col-12 col-lg-6 text-center text-lg-start">
											<span class="text-danger small">{{ $errors->first('banner') }}</span>
										</div>
										@endif
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>

				{{-- DESCRIPTION --}}
				<div class="form-group">
					<label for="description" class="form-label required">Description</label>
					<textarea name="description" id="description_hidden" class="form-control not-resizable d-block d-lg-none" required>{{ $version->description }}</textarea>
					<div id="description" class="form-control font-minecraftia d-none d-lg-block"></div>

					{{-- DESCRIPTION ERROR MESSAGE --}}
					@if ($errors->has('description'))
					@endif
				</div>

				{{-- CHANGELOGS --}}
				<label class="mt-3 required">Changelogs</label>
				<div class="row">
					{{-- ADDED --}}
					<div class="col-12 col-lg-4">
						<div class="card floating-header rounded my-5 border">
							<h5 class="card-header border-0 bg-body"><i class="fas fa-circle text-success me-2"></i>Added</h5>

							<div class="card-body px-3" id="add">
								{{-- OLD ADD --}}
								@foreach (json_decode($version->changelog)->add as $k => $v)
								<div class="row my-3 justify-content-center">
									<div class="col-1 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style log-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-10">
										<input type="text" class="form-control" name="add[]" value="{{ $v }}" required>
									</div>

									@if ($errors->has("add.$k"))
									<div class="col-12 mt-2">{{ $errors->first("add.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- NEW ADD --}}
								@foreach (old('add') ?? [] as $k => $v)
								<div class="row my-3 justify-content-center">
									<div class="col-1 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style log-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-10">
										<input type="text" class="form-control" name="add[]" value="{{ $v }}" required>
									</div>

									@if ($errors->has("add.$k"))
									<div class="col-12 mt-2">{{ $errors->first("add.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- CHANGELOG - ADD ERROR MESSAGE --}}
								@if ($errors->has('add'))
								<div class="text-danger">{{ $errors->first('add') }}</div>
								@endif
							</div>

							<div class="card-footer d-flex justify-content-center">
								<button type="button" class="btn btn-outline-light btn-sm" id="addAdd">Add Log</button>
							</div>
						</div>
					</div>

					{{-- UPDATE/MODIFIED/FIXED --}}
					<div class="col-12 col-lg-4">
						<div class="card floating-header rounded my-5 border">
							<h5 class="card-header border-0 bg-body"><i class="fas fa-circle text-warning me-2"></i>Updates & Fixes</h5>

							<div class="card-body px-3" id="mod">
								{{-- OLD MOD --}}
								@foreach (json_decode($version->changelog)->mod as $k => $v)
								<div class="row my-3 justify-content-center">
									<div class="col-1 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style log-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-10">
										<input type="text" class="form-control" name="mod[]" value="{{ $v }}" required>
									</div>

									@if ($errors->has("mod.$k"))
									<div class="col-12 mt-2">{{ $errors->first("mod.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- NEW MOD --}}
								@foreach (old('mod') ?? [] as $k => $v)
								<div class="row my-3 justify-content-center">
									<div class="col-1 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style log-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-10">
										<input type="text" class="form-control" name="mod[]" value="{{ $v }}" required>
									</div>

									@if ($errors->has("mod.$k"))
									<div class="col-12 mt-2">{{ $errors->first("mod.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- CHANGELOG - MODIFIED ERROR MESSAGE --}}
								@if ($errors->has('mod'))
								<div class="text-danger">{{ $errors->first('mod') }}</div>
								@endif
							</div>

							<div class="card-footer d-flex justify-content-center">
								<button type="button" class="btn btn-outline-light btn-sm" id="addMod">Add Log</button>
							</div>
						</div>
					</div>

					{{-- REMOVED --}}
					<div class="col-12 col-lg-4">
						<div class="card floating-header rounded my-5 border">
							<h5 class="card-header border-0 bg-body"><i class="fas fa-circle text-danger me-2"></i>Removed</h5>

							<div class="card-body" id="rem">
								{{-- OLD REM --}}
								@foreach (json_decode($version->changelog)->rem as $k => $v)
								<div class="row my-3 justify-content-center">
									<div class="col-1 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style log-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-10">
										<input type="text" class="form-control" name="rem[]" value="{{ $v }}" required>
									</div>

									@if ($errors->has("rem.$k"))
									<div class="col-12 mt-2">{{ $errors->first("rem.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- NEW REM --}}
								@foreach (old('rem') ?? [] as $k => $v)
								<div class="row my-3 justify-content-center">
									<div class="col-1 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style log-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-10">
										<input type="text" class="form-control" name="rem[]" value="{{ $v }}" required>
									</div>

									@if ($errors->has("rem.$k"))
									<div class="col-12 mt-2">{{ $errors->first("rem.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- CHANGELOG - REMOVED ERROR MESSAGE --}}
								@if ($errors->has('rem'))
								<div class="text-danger">{{ $errors->first('rem') }}</div>
								@endif
							</div>

							<div class="card-footer d-flex justify-content-center">
								<button type="button" class="btn btn-outline-light btn-sm" id="addRem">Add Log</button>
							</div>
						</div>
					</div>

				</div>

				{{-- COMPATIBILITY --}}
				<label class="mt-3 required">Compatibility</label>
				<div class="row">
					{{-- BEDROCK --}}
					<div class="col-12 col-lg-6">
						<div class="card floating-header rounded my-5 border">
							<h5 class="card-header border-0 bg-body">Bedrock</h5>

							<div class="card-body row" id="bedrock">
								{{-- OLD COMPATIBILITY BEDROCK --}}
								@foreach (json_decode($version->compatibility)->bedrock ?? [] as $k => $v)
								<div class="col-6 col-lg-4 py-3 version-entry">
									<div class="input-group">
										<button type="button" class="btn btn-danger entry-remover d-flex justify-content-center align-items-center" title="Remove Entry">
											<i class="fas fa-minus"></i>
										</button>

										<input type="text" class="form-control" name="bedrock[]" value="{{ $v }}" required pattern="(^\d{1,3})(\.)(\d{1,3})(\.(?=\d{1,3})\d{1,3})?$">
									</div>

									@if ($errors->has("bedrock.$k"))
									<div class="col-12 mt-2">{{ $errors->first("bedrock.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- NEW COMPATIBILITY BEDROCK --}}
								@foreach (old('bedrock') ?? [] as $k => $v)
								<div class="col-6 col-lg-4 py-3 version-entry">
									<div class="input-group">
										<button type="button" class="btn btn-danger entry-remover d-flex justify-content-center align-items-center" title="Remove Entry">
											<i class="fas fa-minus"></i>
										</button>

										<input type="text" class="form-control" name="bedrock[]" value="{{ $v }}" required pattern="(^\d{1,3})(\.)(\d{1,3})(\.(?=\d{1,3})\d{1,3})?$">
									</div>

									@if ($errors->has("bedrock.$k"))
									<div class="col-12 mt-2">{{ $errors->first("bedrock.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- COMPATIBILITY - BEDROCK ERROR MESSAGE --}}
								@if ($errors->has('bedrock'))
								<div class="text-danger">{{ $errors->first('bedrock') }}</div>
								@endif
							</div>

							<div class="card-footer d-flex justify-content-center">
								<button type="button" class="btn btn-outline-light btn-sm" id="addBedrock">Add Version</button>
							</div>
						</div>
					</div>

					{{-- JAVA --}}
					<div class="col-12 col-lg-6">
						<div class="card floating-header rounded my-5 border">
							<h5 class="card-header border-0 bg-body">Java</h5>

							<div class="card-body row" id="java">
								{{-- OLD COMPATIBILITY JAVA --}}
								@foreach (json_decode($version->compatibility)->java ?? [] as $k => $v)
								<div class="col-6 col-lg-4 py-3 version-entry">
									<div class="input-group">
										<button type="button" class="btn btn-danger entry-remover d-flex justify-content-center align-items-center" title="Remove Entry">
											<i class="fas fa-minus"></i>
										</button>

										<input type="text" class="form-control" name="java[]" value="{{ $v }}" required pattern="(^\d{1,3})(\.)(\d{1,3})(\.(?=\d{1,3})\d{1,3})?$">
									</div>

									@if ($errors->has("java.$k"))
									<div class="col-12 mt-2">{{ $errors->first("java.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- NEW COMPATIBILITY JAVA --}}
								@foreach (old('java') ?? [] as $k => $v)
								<div class="col-6 col-lg-4 py-3 version-entry">
									<div class="input-group">
										<button type="button" class="btn btn-danger entry-remover d-flex justify-content-center align-items-center" title="Remove Entry">
											<i class="fas fa-minus"></i>
										</button>

										<input type="text" class="form-control" name="java[]" value="{{ $v }}" required pattern="(^\d{1,3})(\.)(\d{1,3})(\.(?=\d{1,3})\d{1,3})?$">
									</div>

									@if ($errors->has("java.$k"))
									<div class="col-12 mt-2">{{ $errors->first("java.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- COMPATIBILITY - JAVA ERROR MESSAGE --}}
								@if ($errors->has('java'))
								<div class="text-danger">{{ $errors->first('java') }}</div>
								@endif
							</div>

							<div class="card-footer d-flex justify-content-center">
								<button type="button" class="btn btn-outline-light btn-sm" id="addJava">Add Version</button>
							</div>
						</div>
					</div>
				</div>

				{{-- RELEASE DATE --}}
				<div class="card floating-header rounded my-5 border">
					<label class="card-header header-center header-lg-start border-0 bg-body required">Release Dates</label>

					<div class="card-body">
						<div class="row">
							{{-- BEDROCK --}}
							<div class="col-12 col-lg-6">
								<div class="form-group">
									<label for="bedrock_rd" class="form-label">Bedrock</label>
									<input type="date" class="form-control" name="bedrockRD" id="bedrock_rd" value="{{ json_decode($version->release_date)->bedrock ?? '' }}">
									{{-- ERROR MESSAGE --}}
									<span class="text-danger">{{ $errors->first('bedrockRD') }}</span>
								</div>
							</div>

							{{-- JAVA --}}
							<div class="col-12 col-lg-6">
								<div class="form-group">
									<label for="javaRD" class="form-label">Java</label>
									<input type="date" class="form-control" name="javaRD" id="java_rd" value="{{ json_decode($version->release_date)->java ?? '' }}">
									{{-- ERROR MESSAGE --}}
									<span class="text-danger">{{ $errors->first('javaRD') }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		{{-- DOWNLOAD GROUP --}}
		<div class="card floating-header rounded my-5 border">
			<h4 class="card-header header-center header-lg-start border-0 bg-body">Download Links</h4>

			<div class="card-body">
				{{-- BEDROCK --}}
				<div class="row">
					<div class="col-12">
						<div class="card floating-header rounded my-5 border">
							<h5 class="card-header border-0 bg-body">Bedrock</h5>

							<div class="card-body" id="bedrockDL">
								{{-- OLD LINKS --}}
								@php($link_index = 0)
								@foreach (json_decode($version->bedrock_link) as $k => $v)
								<div class="row my-3">
									<div class="col-2 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style link-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="bedrockDL[]" value="{{ $v }}" placeholder="URL" required>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="bedrockDLW[]" value="{{ $k }}" placeholder="Website" required>
									</div>

									@if ($errors->has("bedrockDL.$link_index") && $errors->has("bedrockDLW.$link_index"))
									<div class="col-6 mt-2">{{ $errors->first("bedrockDL.$link_index") }}</div>
									<div class="col-6 mt-2">{{ $errors->first("bedrockDL.$link_index") }}</div>
									@elseif ($errors->has("bedrockDL.$link_index"))
									<div class="col-6 mt-2">{{ $errors->first("bedrockDL.$link_index") }}</div>
									<div class="col-6 mt-2"></div>
									@elseif ($errors->has("bedrockDLW.$link_index"))
									<div class="col-6 mt-2"></div>
									<div class="col-6 mt-2">{{ $errors->first("bedrockDLW.$link_index") }}</div>
									@endif

									@php($link_index++)
								</div>
								@endforeach

								{{-- NEW LINKS --}}
								@foreach (old('bedrockDL') ?? [] as $k => $v)
								<div class="row my-3">
									<div class="col-2 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style link-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="bedrockDL[]" value="{{ $v }}" placeholder="URL" required>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="bedrockDLW[]" value="{{ old("bedrockDLW.$k") }}" placeholder="Website" required>
									</div>

									@if ($errors->has("bedrockDL.$k") && $errors->has("bedrockDLW.$k"))
									<div class="col-6 mt-2">{{ $errors->first("bedrockDL.$k") }}</div>
									<div class="col-6 mt-2">{{ $errors->first("bedrockDL.$k") }}</div>
									@elseif ($errors->has("bedrockDL.$k"))
									<div class="col-6 mt-2">{{ $errors->first("bedrockDL.$k") }}</div>
									<div class="col-6 mt-2"></div>
									@elseif ($errors->has("bedrockDLW.$k"))
									<div class="col-6 mt-2"></div>
									<div class="col-6 mt-2">{{ $errors->first("bedrockDLW.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- DOWNLOAD LINKS - BEDROCK ERROR MESSAGE --}}
								@if ($errors->has('bedrockDL'))
								<div class="text-danger">{{ $errors->first('bedrockDL') }}</div>
								@endif
							</div>

							<div class="card-footer d-flex justify-content-center">
								<button type="button" class="btn btn-outline-light btn-sm" id="addBedrockLink">Add Link</button>
							</div>
						</div>
					</div>
				</div>

				{{-- JAVA --}}
				<div class="row">
					<div class="col-12">
						<div class="card floating-header rounded my-5 border">
							<h5 class="card-header border-0 bg-body">Java</h5>

							<div class="card-body" id="javaDL">
								{{-- OLD LINKS --}}
								@php($link_index = 0)
								@foreach (json_decode($version->java_link) as $k => $v)
								<div class="row my-3">
									<div class="col-2 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style link-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="javaDL[]" value="{{ $v }}" placeholder="URL" required>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="javaDLW[]" value="{{ $k }}" placeholder="Website" required>
									</div>

									@if ($errors->has("javaDL.$link_index") && $errors->has("javaDLW.$link_index"))
									<div class="col-6 mt-2">{{ $errors->first("javaDL.$link_index") }}</div>
									<div class="col-6 mt-2">{{ $errors->first("javaDL.$link_index") }}</div>
									@elseif ($errors->has("javaDL.$link_index"))
									<div class="col-6 mt-2">{{ $errors->first("javaDL.$link_index") }}</div>
									<div class="col-6 mt-2"></div>
									@elseif ($errors->has("javaDLW.$link_index"))
									<div class="col-6 mt-2"></div>
									<div class="col-6 mt-2">{{ $errors->first("javaDLW.$link_index") }}</div>
									@endif

									@php($link_index++)
								</div>
								@endforeach

								{{-- NEW LINKS --}}
								@foreach (old('javaDL') ?? [] as $k => $v)
								<div class="row my-3">
									<div class="col-2 d-flex justify-content-center align-items-center">
										<button type="button" class="remove-button-style link-remover" title="Remove Entry">
											<i class="fas fa-circle-minus text-danger"></i>
										</button>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="javaDL[]" value="{{ $v }}" placeholder="URL" required>
									</div>

									<div class="col-5">
										<input type="text" class="form-control" name="javaDLW[]" value="{{ old("javaDLW.$k") }}" placeholder="Website" required>
									</div>

									@if ($errors->has("javaDL.$k") && $errors->has("javaDLW.$k"))
									<div class="col-6 mt-2">{{ $errors->first("javaDL.$k") }}</div>
									<div class="col-6 mt-2">{{ $errors->first("javaDL.$k") }}</div>
									@elseif ($errors->has("javaDL.$k"))
									<div class="col-6 mt-2">{{ $errors->first("javaDL.$k") }}</div>
									<div class="col-6 mt-2"></div>
									@elseif ($errors->has("javaDLW.$k"))
									<div class="col-6 mt-2"></div>
									<div class="col-6 mt-2">{{ $errors->first("javaDLW.$k") }}</div>
									@endif
								</div>
								@endforeach

								{{-- COMPATIBILITY - JAVA ERROR MESSAGE --}}
								@if ($errors->has('javaDL'))
								<div class="text-danger">{{ $errors->first('javaDL') }}</div>
								@endif
							</div>

							<div class="card-footer d-flex justify-content-center">
								<button type="button" class="btn btn-outline-light btn-sm" id="addJavaLink">Add Link</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		{{-- FORM CONTROLS --}}
		<div class="row mt-3">
			<div class="col-12 d-flex justify-content-center">
				<button type="submit" class="btn btn-success mx-2">Submit</button>
				<button type="reset" class="btn btn-secondary mx-2">Reset</button>
				<button type="button" data-return="{{ route('admin.versions.index') }}" class="btn btn-danger mx-2">Cancel</button>
			</div>
		</div>
	</form>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="{{ mix('css/widget/card-widget.css') }}">
<link rel="stylesheet" type="text/css" href="{{ mix('css/util/image-input.css') }}">
@endsection

@section('scripts')
<script type="text/javascript" src="{{ mix('js/util/reloaded.js') }}" nonce="{{ csp_nonce() }}" defer></script>
<script type="text/javascript" src="{{ mix('js/util/image-input.js') }}" nonce="{{ csp_nonce() }}" defer></script>
<script type="text/javascript" src="{{ mix('views/admin/versions/create.js') }}" nonce="{{ csp_nonce() }}" defer></script>
@endsection
