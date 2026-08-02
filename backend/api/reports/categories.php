<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Middleware\AuthMiddleware;
use App\Services\ReportService;

$userId = AuthMiddleware::handle();

$service = new ReportService(
    Database::getConnection()
);

ApiResponse::success(
    $service->expensesByCategory(
        $userId
    )
);