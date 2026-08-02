<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\CategoryService;

// Only allow GET requests.
if (Request::method() !== 'GET') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );

}

// Authenticate user.
$userId = AuthMiddleware::handle();

// Create service.
$service = new CategoryService(
    Database::getConnection()
);

// Get categories.
$categories = $service->list(
    $userId
);

// Return response.
ApiResponse::success(
    $categories,
    'Categories retrieved successfully.'
);