<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;

// Only allow GET requests.
if (Request::method() !== 'GET') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate user.
$userId = AuthMiddleware::handle();

$db = Database::getConnection();

// Get authenticated user data.
$stmt = $db->prepare(
    "
    SELECT
        id,
        full_name,
        email,
        photo,
        bio,
        currency,
        dark_mode,
        created_at
    FROM users
    WHERE id = ?
    LIMIT 1
    "
);

$stmt->execute([
    $userId
]);

$user = $stmt->fetch();

if (!$user) {
    ApiResponse::notFound(
        'User not found.'
    );
}

ApiResponse::success(
    $user,
    'User profile retrieved successfully.'
);