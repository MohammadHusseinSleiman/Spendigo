<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\CategoryService;

if (Request::method() !== 'DELETE') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );

}

$userId = AuthMiddleware::handle();

$id = (int) (
    Request::query('id') ?? 0
);

$service = new CategoryService(
    Database::getConnection()
);

$service->delete(
    $userId,
    $id
);

ApiResponse::success(
    null,
    'Category deleted successfully.'
);