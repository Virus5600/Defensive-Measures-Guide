<?php
$files = glob(__DIR__ . '/{*.php,/**/*.php}', GLOB_BRACE);

foreach ($files as $file)
	require_once $file;
