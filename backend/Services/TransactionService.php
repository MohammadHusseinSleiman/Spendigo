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

        try {

            $this->db->beginTransaction();

            // Validate category ownership
            // The category must belong to the authenticated user
            $stmt = $this->db->prepare(
                "
                SELECT
                    id,
                    type
                FROM categories
                WHERE
                    id = ?
                    AND user_id = ?
                LIMIT 1
                "
            );

            $stmt->execute([
                $data['category_id'],
                $userId
            ]);

            $category = $stmt->fetch(
                PDO::FETCH_ASSOC
            );

            if (!$category) {
                throw new \RuntimeException(
                    'Invalid category.'
                );
            }

            // Create transaction
            $stmt = $this->db->prepare(
                "
                INSERT INTO transactions
                (
                    user_id,
                    category_id,
                    type,
                    description,
                    amount,
                    transaction_date
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
                "
            );

            $stmt->execute([
                $userId,
                $data['category_id'],
                $category['type'],
                $data['description'],
                $data['amount'],
                $data['transaction_date']
            ]);

            $transactionId = (int)$this->db->lastInsertId();

            $this->db->commit();

            return $transactionId;

        } catch (\Throwable $exception) {

            $this->db->rollBack();
            throw $exception;
        }
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

        $stmt = $this->db->prepare(
            "
            SELECT
                id,
                name,
                color
            FROM categories
            WHERE
                user_id = ?
                AND type = ?
            ORDER BY name ASC
            "
        );

        $stmt->execute([
            $userId,
            $type
        ]);

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );

    }
}