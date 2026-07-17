<?php

declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

use App\Core\ApiResponse;

ApiResponse::success(
    message: 'Spendigo API is running.'
);