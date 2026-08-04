<?php

$file = basename($_GET['file'] ?? '');

$path = dirname(__DIR__, 2)
    . "/uploads/profiles/$file";

if (!file_exists($path)) {
    http_response_code(404);
    exit;
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
header("Content-Type: " . finfo_file($finfo, $path));
readfile($path);