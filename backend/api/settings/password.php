<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\RateLimitService;
use App\Services\SettingsService;

// Allow only PUT requests.
if (Request::method() !== 'PUT') {

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

$data = Request::json();

$errors = [];

// Validate current password.
if (empty($data['current_password'])) {
    $errors['current_password'] = 'Current password is required.';
}

// Validate new password.
if (empty($data['new_password'])) {
    $errors['new_password'] = 'New password is required.';
}

// Validate password length.
if (
    strlen($data['new_password'] ?? '') < 8
) {
    $errors['new_password'] = 'Password must be at least 8 characters.';
}

// Validate password confirmation.
if (
    ($data['new_password'] ?? '') !==
    ($data['confirm_password'] ?? '')
) {
    $errors['confirm_password'] =
        'Passwords do not match.';
}

// Validation errors should NOT consume
// rate-limit attempts.
if (!empty($errors)) {
    ApiResponse::validation($errors);
}

// Rate-limit key for the authenticated user.
$rateLimitKey = sprintf(
    'change-password:user:%d',
    $userId
);

// Allow 5 failed attempts within 15 minutes.
// Block for another 15 minutes once the limit is reached.
RateLimitService::check(
    $rateLimitKey,
    5,
    900,
    900,
    'Too many password change attempts. Please try again later.'
);

// Verify current password.
if (
    !$service->verifyPassword(
        $userId,
        $data['current_password']
    )
) {
    RateLimitService::recordFailure(
        $rateLimitKey,
        900
    );
    ApiResponse::validation([
        'current_password' => 'Current password is incorrect.',
    ]);
}

// Change password.
$service->changePassword(
    $userId,
    $data['new_password']
);

// Password changed successfully.
// Clear previous failed attempts.
RateLimitService::clear(
    $rateLimitKey
);

ApiResponse::success(
    null,
    'Password updated successfully.'
);