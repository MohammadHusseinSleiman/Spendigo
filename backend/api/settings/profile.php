<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\SettingsService;

// Authenticate user.
$userId = AuthMiddleware::handle();

// Create service.
$service = new SettingsService(
    Database::getConnection()
);

if (Request::method() === 'GET') {

    ApiResponse::success(
        $service->getProfile($userId),
        'Profile retrieved successfully.'
    );
}

if (Request::method() === 'PUT') {

    $data = Request::json();

    $errors = [];

    if (empty(trim($data['full_name'] ?? ''))) {
        $errors['full_name'] = 'Full name is required.';
    }

    if (
        empty($data['email']) ||
        !filter_var($data['email'], FILTER_VALIDATE_EMAIL)
    ) {
        $errors['email'] = 'A valid email is required.';
    }

    if (empty(trim($data['currency'] ?? ''))) {
        $errors['currency'] = 'Currency is required.';
    }

    if (!empty($errors)) {
        ApiResponse::validation($errors);
    }

    if (
        $service->emailExists(
            $data['email'],
            $userId
        )
    ) {

        ApiResponse::validation([
            'email' => 'Email is already in use.',
        ]);
    }

    $service->updateProfile(
        $userId,
        $data
    );

    ApiResponse::success(
        null,
        'Profile updated successfully.'
    );
}

ApiResponse::error(
    'Method not allowed.',
    405
);