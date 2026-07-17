<?php

declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;

// Check database availability.
Database::getConnection();

ApiResponse::success(
    message: 'API and database are operational.'
);