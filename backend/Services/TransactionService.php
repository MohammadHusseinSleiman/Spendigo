<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

// Handles all transaction operations
final class TransactionService
{
    public function __construct(
        private readonly PDO $db
    ) {
    }

    // Create a new transaction
    public function create(
        int $userId,
        array $data
    ): int {
        return 0;
    }

    // Get all user transactions
    public function list(
        int $userId,
        array $filters = []
    ): array {
        return [];
    }

    // Get a single transaction
    public function find(
        int $userId,
        int $transactionId
    ): ?array {
        return null;
    }

    // Update transaction
    public function update(
        int $userId,
        int $transactionId,
        array $data
    ): bool {
        return false;
    }

    // Delete transaction
    public function delete(
        int $userId,
        int $transactionId
    ): bool {
        return false;
    }

    // Get categories by transaction type
    public function categories(
        int $userId,
        string $type
    ): array {
        return [];
    }
}