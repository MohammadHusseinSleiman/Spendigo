<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\CategoryService;

// Only allow PUT requests.
if (Request::method() !== 'PUT') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate user
$userId = AuthMiddleware::handle();

// Validate category ID
$id = (int) (Request::query('id') ?? 0);

if ($id <= 0) {
    ApiResponse::validation([
        'id' => 'Invalid category.'
    ]);
}

// Get request body
$data = Request::json();

$name = trim(
    $data['name'] ?? ''
);

$type = trim(
    $data['type'] ?? ''
);

$color = trim(
    $data['color'] ?? ''
);

// Validate name
$errors = [];

if ($name === '') {
    $errors['name'] = 'Category name is required.';
}

// Validate type
if (
    !in_array(
        $type,
        ['income', 'expense'],
        true
    )
) {
    $errors['type'] = 'Invalid category type.';
}

// Validate color
if ($color === '') {
    $errors['color'] = 'Category color is required.';
}

if (!empty($errors)) {
    ApiResponse::validation($errors);
}

try {

    $service = new CategoryService(
        Database::getConnection()
    );

    $service->update(
        $userId,
        $id,
        [
            'name' => $name,
            'type' => $type,
            'color' => $color,
        ]
    );

    ApiResponse::success(
        null,
        'Category updated successfully.'
    );

} catch (RuntimeException $exception) {

    ApiResponse::error(
        $exception->getMessage(),
        400
    );

} catch (Throwable $exception) {

    ApiResponse::error(
        'Failed to update category.',
        500
    );
}