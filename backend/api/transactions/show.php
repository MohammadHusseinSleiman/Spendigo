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

// Validate id.
$id = (int)Request::query('id');

if ($id <= 0) {

    ApiResponse::validation([
        'id' => 'Invalid transaction.'
    ]);

}

$service = new TransactionService(
    Database::getConnection()
);

$transaction = $service->find(
    $userId,
    $id
);

if (!$transaction) {

    ApiResponse::notFound(
        'Transaction not found.'
    );

}

ApiResponse::success(
    $transaction,
    'Transaction retrieved successfully.'
);