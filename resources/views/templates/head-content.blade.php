{{-- META DATA --}}
<meta http-equiv="Content-Type" content="text/html">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta http-equiv="Content-Language" content="en-US" />
<meta name="csp-nonce" content="{{ csp_nonce() }}">

{{-- SITE META --}}
<meta name="type" content="website">
<meta name="title" content="{{ $webName }}">
<meta name="description" content="{{ $webDesc }}">
<meta name="image" content="{{ storageAsset("uploads", "settings/meta-banner.png") }}">
<meta name="keywords" content="{{ env("APP_KEYWORDS") }}">
<meta name="application-name" content="{{ $webName }}">

{{-- TWITTER META --}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $webName }}">
<meta name="twitter:description" content="{{ $webDesc }}">
<meta name="twitter:image" content="{{ storageAsset("uploads", "settings/meta-banner.png") }}">

{{-- OG META --}}
<meta property="og:url" name="og:url" content="{{ Request::url() }}">
<meta property="og:type" name="og:type" content="website">
<meta property="og:title" name="og:title" content="{{ $webName }}">
<meta property="og:description" name="og:description" content="{{ $webDesc }}">
<meta property="og:image" name="og:image" content="{{ storageAsset("uploads", "settings/meta-banner.png") }}">

{{-- FAVICON --}}
<link rel="icon" href="{{ $webLogo }}">
<link rel="shortcut icon" href="{{ $webLogo }}">
<link rel="apple-touch-icon" href="{{ $webLogo }}">
<link rel="mask-icon" href="{{ $webLogo }}">

{{-- TITLE --}}
<title>{{ $webName }} | @yield("title")</title>
