<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Core\Validator;
use App\Middleware\AuthMiddleware;
use App\Services\TransactionService;

// Only allow POST requests.
if (Request::method() !== 'POST') {

    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Authenticate user.
$userId = AuthMiddleware::handle();

// Get request body.
$data = Request::json();

$categoryId = $data['category_id'] ?? null;
$amount = $data['amount'] ?? null;

$description = trim(
    $data['description'] ?? ''
);

$transactionDate = trim(
    $data['transaction_date'] ?? ''
);

// Validate request.
$errors = [];

if (
    $categoryId === null ||
    !is_numeric($categoryId) ||
    (int) $categoryId <= 0
) {
    $errors['category_id'] = 'Category is required.';
}

if (
    $amount === null ||
    !is_numeric($amount) ||
    (float) $amount <= 0
) {
    $errors['amount'] = 'Amount must be greater than zero.';
}

if (!Validator::required($description)) {
    $errors['description'] = 'Description is required.';
}

if (mb_strlen($description) > 500) {
    $errors['description'] = 'Description is too long.';
}

if (!Validator::required($transactionDate)) {
    $errors['transaction_date'] = 'Transaction date is required.';
}

if (!empty($errors)) {
    ApiResponse::validation($errors);
}

try {

    $service = new TransactionService(
        Database::getConnection()
    );

    $transactionId = $service->create(
        $userId,
        [
            'category_id' => (int) $categoryId,
            'amount' => (float) $amount,
            'description' => $description,
            'transaction_date' => $transactionDate,
        ]
    );

    ApiResponse::created(
        [
            'transaction_id' => $transactionId
        ],
        'Transaction created successfully.'
    );

} catch (RuntimeException $exception) {
    ApiResponse::error(
        $exception->getMessage(),
        400
    );
} catch (Throwable $exception) {
    ApiResponse::error(
        'Failed to create transaction.',
        500
    );
}