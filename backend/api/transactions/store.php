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

// Validate request.
$errors = [];

if (
    !isset($data['category_id']) ||
    !is_numeric($data['category_id'])
) {
    $errors['category_id'] = 'Category is required.';
}

if (
    !isset($data['amount']) ||
    !is_numeric($data['amount']) ||
    (float)$data['amount'] <= 0
) {
    $errors['amount'] = 'Amount must be greater than zero.';
}

if (
    !Validator::required(
        $data['description'] ?? ''
    )
) {
    $errors['description'] = 'Description is required.';
}

if (
    !Validator::required(
        $data['transaction_date'] ?? ''
    )
) {
    $errors['transaction_date'] = 'Transaction date is required.';
}

if (!empty($errors)) {
    ApiResponse::validation(
        $errors
    );
}

try {

    $service = new TransactionService(
        Database::getConnection()
    );

    $transactionId = $service->create(
        $userId,
        $data
    );

    ApiResponse::created(
        [
            'transaction_id' =>
                $transactionId
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