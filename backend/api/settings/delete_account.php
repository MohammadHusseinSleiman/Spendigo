<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\SettingsService;

// Only allow DELETE requests.
if (Request::method() !== 'DELETE') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate user.
$userId = AuthMiddleware::handle();

$service = new SettingsService(
    Database::getConnection()
);

// Read request body.
$data = Request::json();

// Validate password.
if (empty($data['password'])) {

    ApiResponse::validation([
        'password' => 'Password is required.',
    ]);
}

// Verify password.
if (
    !$service->verifyPassword(
        $userId,
        $data['password']
    )
) {

    ApiResponse::validation([
        'password' => 'Incorrect password.',
    ]);
}

// Delete account.
$service->deleteAccount($userId);

// Success.
ApiResponse::success(
    null,
    'Account deleted successfully.'
);