<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\RateLimitService;
use App\Services\SettingsService;

// Only allow DELETE requests
if (Request::method() !== 'DELETE') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate user
$userId = AuthMiddleware::handle();

// Read request body
$data = Request::json();

$password = $data['password'] ?? '';

// Validate password presence first
if (empty($password)) {
    ApiResponse::validation([
        'password' => 'Password is required.',
    ]);
}

// Rate-limit account deletion attempts
// Maximum 3 failed attempts within 15 minutes
// After reaching the limit, block further attempts for another 15 minutes.
$rateLimitKey = 'delete-account:' . $userId;

RateLimitService::check(
    $rateLimitKey,
    3,
    900,
    900
);

// Create settings service
$service = new SettingsService(
    Database::getConnection()
);

// Verify password
if (
    !$service->verifyPassword(
        $userId,
        $password
    )
) {
    // Record only failed password attempts
    RateLimitService::recordFailure(
        $rateLimitKey
    );
    ApiResponse::validation([
        'password' => 'Incorrect password.',
    ]);
}

// Password is correct
// Delete the account
$service->deleteAccount($userId);

// Account no longer exists, so there is no need to clear the rate-limit record.
ApiResponse::success(
    null,
    'Account deleted successfully.'
);