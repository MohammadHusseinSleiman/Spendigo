<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\SettingsService;

// Only allow POST requests.
if (Request::method() !== 'POST') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

$userId = AuthMiddleware::handle();

$service = new SettingsService(
    Database::getConnection()
);


// Validate uploaded file.
if (
    !isset($_FILES['photo']) ||
    $_FILES['photo']['error'] !== UPLOAD_ERR_OK
) {

    ApiResponse::validation([
        'photo' => 'Photo is required.',
    ]);
}

$file = $_FILES['photo'];

$allowed = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

if (
    !in_array(
        mime_content_type($file['tmp_name']),
        $allowed,
        true
    )
) {

    ApiResponse::validation([
        'photo' => 'Invalid image type.',
    ]);
}

if ($file['size'] > 2 * 1024 * 1024) {

    ApiResponse::validation([
        'photo' => 'Maximum size is 2 MB.',
    ]);
}


// Generate unique file name and move uploaded file.
$extension = pathinfo(
    $file['name'],
    PATHINFO_EXTENSION
);

$fileName =
    uniqid('profile_', true)
    . '.'
    . $extension;

$uploadDirectory =
    dirname(__DIR__, 2)
    . '/uploads/profiles/';

if (!is_dir($uploadDirectory)) {

    mkdir(
        $uploadDirectory,
        0777,
        true
    );
}

$destination =
    $uploadDirectory
    . $fileName;


// Save user's profile photo in the database.
if (
    !move_uploaded_file(
        $file['tmp_name'],
        $destination
    )
) {

    ApiResponse::error(
        'Unable to upload image.',
        500
    );
}


// Update database.
$service->updatePhoto(
    $userId,
    'uploads/profiles/' . $fileName
);

ApiResponse::success(
    [
        'photo' => 'uploads/profiles/' . $fileName,
    ],
    'Photo uploaded successfully.'
);