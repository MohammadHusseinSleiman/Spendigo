<?php

$file = basename(
    $_GET['file'] ?? ''
);

$path = dirname(__DIR__, 2)
    . "/uploads/profiles/$file";

if (
    $file === '' ||
    !file_exists($path)
) {
    http_response_code(404);
    exit;
}

// Detect the image MIME type.
$imageInfo = @getimagesize($path);

if ($imageInfo === false) {
    http_response_code(404);
    exit;
}

$allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

$mimeType = $imageInfo['mime'] ?? null;

if (!in_array($mimeType, $allowedMimeTypes, true)) {
    http_response_code(404);
    exit;
}

header(
    "Content-Type: " . $mimeType
);

header(
    "Content-Length: " . filesize($path)
);

readfile($path);
exit;