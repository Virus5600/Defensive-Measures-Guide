{{-- Removes the code that shows up when script is disabled/not allowed/blocked --}}
<script type="text/javascript" id="for-js-disabled-js" nonce="{{ csp_nonce() }}">$('head').append('<style id="for-js-disabled" nonce="{{ csp_nonce() }}">#js-disabled { display: none; }</style>');$(document).ready(function() {$('#js-disabled').remove();$('#for-js-disabled').remove();$('#for-js-disabled-js').remove();});</script>

{{-- SHOWS THIS INSTEAD WHEN JAVASCRIPT IS DISABLED --}}
<div style="position: absolute; height: 100vh; width: 100vw; background-color: #ccc;" id="js-disabled" nonce="{{ csp_nonce() }}">
	<style type="text/css" nonce="{{ csp_nonce() }}">
		/* Make the element disappear if JavaScript isn't allowed */
		.js-only {
			display: none!important;
		}
	</style>
	<div class="row h-100">
		<div class="col-12 col-md-4 offset-md-4 py-5 my-auto">
			<div class="card shadow-lg my-auto">
				<h4 class="card-header card-title text-center">Javascript is Disabled</h4>

				<div class="card-body">
					<p class="card-text">This website required <b>JavaScript</b> to run. Please allow/enable JavaScript and refresh the page.</p>
					<p class="card-text">If the JavaScript is enabled or allowed, please check your firewall as they might be the one disabling JavaScript.</p>
				</div>
			</div>
		</div>
	</div>
</div>
