<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\CategoryService;

if (Request::method() !== 'PUT') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );

}

$userId = AuthMiddleware::handle();

$id = (int) (
    Request::query('id') ?? 0
);

$data = Request::json();

$service = new CategoryService(
    Database::getConnection()
);

$service->update(
    $userId,
    $id,
    $data
);

ApiResponse::success(
    null,
    'Category updated successfully.'
);