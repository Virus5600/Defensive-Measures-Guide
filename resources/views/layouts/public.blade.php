<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}" class="scroll-smooth custom-scrollbar apply-to-all" dir="ltr">

	<head>
		{{-- META STACK --}}
		@stack("meta")

		{{-- GLOBAL HEAD CONTENT --}}
		@include("templates.head-content", ["title" => $title ?? ""])
		@vite(["resources/scss/app.scss"])

		{{-- STYLE STACK --}}
		@stack("styles")
	</head>

	{{-- TODO: Continue Body --}}

	<body class="max-w-[100vw] min-h-screen flex flex-col relative">
		{{-- HEADER --}}
		<header id="mainHeader">
		</header>

		{{-- MAIN CONTENT --}}
		@php($noPad = app()->view->getSections()["noPad"] ?? false)
		<main id="mainBody" class="flex flex-col items-stretch my-auto js-only{{ isset($noPad) && $noPad ? "" : " p-4 pt-0" }}">
			@yield("content")
		</main>

		{{-- FOOTER --}}
		@include("templates.footer")
	</body>

</html>
