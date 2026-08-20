<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\CategoryService;

// Only allow DELETE requests.
if (Request::method() !== 'DELETE') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate user.
$userId = AuthMiddleware::handle();

// Validate category ID.
$id = (int) (Request::query('id') ?? 0);

if ($id <= 0) {
    ApiResponse::validation([
        'id' => 'Invalid category.'
    ]);
}

try {

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

} catch (RuntimeException $exception) {

    ApiResponse::error(
        $exception->getMessage(),
        400
    );

} catch (Throwable $exception) {

    ApiResponse::error(
        'Failed to delete category.',
        500
    );
}