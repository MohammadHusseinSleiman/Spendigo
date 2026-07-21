<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\TransactionService;

// Only allow DELETE requests.
if (Request::method() !== 'DELETE') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );

}

// Authenticate user.
$userId = AuthMiddleware::handle();

// Validate transaction id.
$id = (int) Request::query('id');

if ($id <= 0) {

    ApiResponse::validation([
        'id' => 'Invalid transaction.'
    ]);

}

try {

    $service = new TransactionService(
        Database::getConnection()
    );

    $service->delete(
        $userId,
        $id
    );

    ApiResponse::success(
        [],
        'Transaction deleted successfully.'
    );

} catch (RuntimeException $exception) {

    ApiResponse::notFound(
        $exception->getMessage()
    );

} catch (Throwable $exception) {

    ApiResponse::error(
        'Failed to delete transaction.',
        500
    );

}