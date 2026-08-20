<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\CategoryService;

// Only allow POST requests.
if (Request::method() !== 'POST') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );

}

$userId = AuthMiddleware::handle();

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

$errors = [];

if (mb_strlen($name) > 100) {
    $errors['name'] = 'Category name is too long.';
}

if (mb_strlen($color) > 20) {
    $errors['color'] = 'Invalid color value.';
}

if ($name === '') {

    $errors['name'] = 'Category name is required.';

}

if (
    !in_array(
        $type,
        ['income', 'expense'],
        true
    )
) {

    $errors['type'] = 'Invalid category type.';

}

if ($color === '') {

    $errors['color'] = 'Category color is required.';

}

if (!empty($errors)) {

    ApiResponse::validation($errors);

}

$service = new CategoryService(
    Database::getConnection()
);

if (
    !$service->create(
        $userId,
        $name,
        $type,
        $color
    )
) {

    ApiResponse::error(
        'Category already exists.',
        409
    );

}

ApiResponse::success(
    null,
    'Category created successfully.'
);