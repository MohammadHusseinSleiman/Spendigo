<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\SettingsService;

// Create service.
$service = new SettingsService(
    Database::getConnection()
);

// Authenticate user.
$userId = AuthMiddleware::handle();


// Get preferences.
if (Request::method() === 'GET') {

    ApiResponse::success(
        $service->getPreferences($userId),
        'Preferences retrieved successfully.'
    );
}


// Update preferences.
if (Request::method() === 'PUT') {

    $data = Request::json();

    $service->updatePreferences(
        $userId,
        [
            'currency' => $data['currency'],
            'dark_mode' => $data['dark_mode'],
        ]
    );

    ApiResponse::success(
        null,
        'Preferences updated successfully.'
    );
}


// Method not allowed.
ApiResponse::error(
    'Method not allowed.',
    405
);