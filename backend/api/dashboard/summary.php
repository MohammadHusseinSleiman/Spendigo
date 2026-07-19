<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\DashboardService;

// Only allow GET requests.
if (Request::method() !== 'GET') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate the user.
$userId = AuthMiddleware::handle();

// Create dashboard service.
$service = new DashboardService(
    Database::getConnection()
);

// Get dashboard summary.
$data = $service->summary(
    $userId
);

// Return response.
ApiResponse::success(
    $data,
    'Dashboard summary retrieved successfully.'
);