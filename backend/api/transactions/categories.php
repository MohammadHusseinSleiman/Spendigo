<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\TransactionService;

// Only allow GET requests.
if (Request::method() !== 'GET') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );

}

// Authenticate user.
$userId = AuthMiddleware::handle();

// Transaction type is optional.
$type = trim(
    Request::query('type', '')
);

// Validate type only if it is provided.
if (
    $type !== '' &&
    !in_array(
        $type,
        ['income', 'expense'],
        true
    )
) {

    ApiResponse::validation([
        'type' => 'Invalid transaction type.'
    ]);

}

// Create service.
$service = new TransactionService(
    Database::getConnection()
);

// Get categories.
$categories = $service->categories(
    $userId,
    $type === '' ? null : $type
);

// Return response.
ApiResponse::success(
    $categories,
    'Categories retrieved successfully.'
);