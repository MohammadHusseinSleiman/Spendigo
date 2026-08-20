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

// Authenticate user
$userId = AuthMiddleware::handle();

$service = new SettingsService(
    Database::getConnection()
);

// Validate uploaded file
if (
    !isset($_FILES['photo']) ||
    $_FILES['photo']['error'] !== UPLOAD_ERR_OK
) {
    ApiResponse::validation([
        'photo' => 'Photo is required.',
    ]);
}

$file = $_FILES['photo'];

// Maximum file size: 2 MB.
if ($file['size'] > 2 * 1024 * 1024) {
    ApiResponse::validation([
        'photo' => 'Maximum size is 2 MB.',
    ]);
}

// Detect the real MIME type
// Do not trust $_FILES['photo']['type']
$mimeType = mime_content_type(
    $file['tmp_name']
);

$allowedMimeTypes = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
];

if (
    $mimeType === false ||
    !isset($allowedMimeTypes[$mimeType])
) {
    ApiResponse::validation([
        'photo' => 'Invalid image type.',
    ]);
}

// Make sure PHP recognizes the file as an actual image.
$imageInfo = @getimagesize(
    $file['tmp_name']
);

if ($imageInfo === false) {
    ApiResponse::validation([
        'photo' => 'Uploaded file is not a valid image.',
    ]);
}

// Generate a server-side filename
// Never use the original filename
$extension = $allowedMimeTypes[$mimeType];

$fileName =
    bin2hex(random_bytes(16))
    . '.'
    . $extension;

// Upload directory
$uploadDirectory =
    dirname(__DIR__, 2)
    . '/uploads/profiles/';

// Create directory if it does not exist
if (!is_dir($uploadDirectory)) {

    if (
        !mkdir(
            $uploadDirectory,
            0755,
            true
        )
    ) {
        ApiResponse::error(
            'Unable to create upload directory.',
            500
        );
    }
}

$destination =
    $uploadDirectory
    . $fileName;

// Move uploaded file
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

// Path stored in database
$photoPath =
    'uploads/profiles/'
    . $fileName;

try {
    // Update database.
    $service->updatePhoto(
        $userId,
        $photoPath
    );

} catch (Throwable $exception) {

    // Remove uploaded file if database update fails
    if (file_exists($destination)) {
        unlink($destination);
    }

    ApiResponse::error(
        'Unable to save profile photo.',
        500
    );
}

ApiResponse::success(
    [
        'photo' => $photoPath,
    ],
    'Photo uploaded successfully.'
);