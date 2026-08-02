<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

final class ReportService {

    public function __construct(
        private PDO $db
    ) {
    }

    public function summary(
        int $userId
    ): array {

        return [];
    }

}