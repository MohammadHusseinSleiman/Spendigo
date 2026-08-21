<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\TransactionService;

// Only allow GET requests
if (Request::method() !== 'GET') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate user
$userId = AuthMiddleware::handle();

// Read query parameters
$search = trim(
    Request::query('search', '')
);

$type = trim(
    Request::query('type', '')
);

$categoryId = (int) Request::query(
    'category_id',
    0
);

$month = trim(
    Request::query('month', '')
);

// "all" means no type filter
if ($type === 'all') {
    $type = '';
}

// Validate transaction type
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

// Validate category ID
if ($categoryId < 0) {
    ApiResponse::validation([
        'category_id' => 'Invalid category.'
    ]);
}

// Validate month format
if (
    $month !== '' &&
    !preg_match(
        '/^\d{4}-(0[1-9]|1[0-2])$/',
        $month
    )
) {
    ApiResponse::validation([
        'month' =>
            'Invalid month format. Use YYYY-MM.'
    ]);
}

// Create service
$service = new TransactionService(
    Database::getConnection()
);

// Get transactions
$transactions = $service->list(
    $userId,
    [
        'search' => $search,
        'type' => $type,
        'category_id' => $categoryId,
        'month' => $month,
    ]
);

// Return response
ApiResponse::success(
    $transactions,
    'Transactions retrieved successfully.'
);