<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Middleware\AuthMiddleware;
use App\Services\AnalyticsService;

$userId = AuthMiddleware::handle();

$service = new AnalyticsService(
    Database::getConnection()
);

ApiResponse::success(
    $service->monthlyNetCashFlow($userId)
);