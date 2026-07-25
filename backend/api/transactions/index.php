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

// Read filters.
$filters = [

    'search' => trim(
        Request::query('search', '')
    ),

    'type' => trim(
        Request::query('type', '')
    ),

    'category_id' => (int)
    Request::query('category_id', 0),

    'month' => trim(
        Request::query('month', '')
    ),

];

// Create service.
$service = new TransactionService(
    Database::getConnection()
);

// Get transactions.
$transactions = $service->list(
    $userId,
    $filters
);

// Return response.
ApiResponse::success(
    $transactions,
    'Transactions retrieved successfully.'
);