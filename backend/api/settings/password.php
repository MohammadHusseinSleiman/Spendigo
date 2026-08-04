<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\SettingsService;

// Allow only PUT
if (Request::method() !== 'PUT') {

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

$data = Request::json();

$errors = [];

if (empty($data['current_password'])) {
    $errors['current_password'] =
        'Current password is required.';
}

if (empty($data['new_password'])) {
    $errors['new_password'] =
        'New password is required.';
}

if (
    strlen($data['new_password'] ?? '') < 8
) {
    $errors['new_password'] =
        'Password must be at least 8 characters.';
}

if (
    ($data['new_password'] ?? '') !==
    ($data['confirm_password'] ?? '')
) {
    $errors['confirm_password'] =
        'Passwords do not match.';
}

if (!empty($errors)) {
    ApiResponse::validation($errors);
}

if (
    !$service->verifyPassword(
        $userId,
        $data['current_password']
    )
) {

    ApiResponse::validation([
        'current_password' =>
            'Current password is incorrect.',
    ]);
}

$service->changePassword(
    $userId,
    $data['new_password']
);

ApiResponse::success(
    null,
    'Password updated successfully.'
);