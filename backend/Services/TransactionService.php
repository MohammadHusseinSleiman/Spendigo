<?php

declare(strict_types=1);

namespace App\Services;

use PDO;
use Throwable;
use RuntimeException;

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

            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            throw $exception;
        }
    }

    // Get all user transactions
    public function list(
        int $userId,
        array $filters = []
    ): array {

        $query = "
            SELECT
                t.id,
                t.description,
                t.amount,
                t.type,
                t.transaction_date,
                c.name AS category,
                c.color AS category_color
            FROM transactions t
            INNER JOIN categories c
                ON c.id = t.category_id
            WHERE t.user_id = ?
        ";

        $params = [
            $userId
        ];

        // Search filter
        if (!empty($filters['search'])) {

            $query .= "
                AND t.description LIKE ?
            ";

            $params[] =
                "%" . $filters['search'] . "%";
        }

        // Type filter
        if (
            !empty($filters['type']) &&
            in_array(
                $filters['type'],
                ['income', 'expense'],
                true
            )
        ) {

            $query .= "
                AND t.type = ?
            ";

            $params[] =
                $filters['type'];
        }

        // Category filter
        if (
            !empty($filters['category_id'])
        ) {

            $query .= "
                AND t.category_id = ?
            ";

            $params[] =
                $filters['category_id'];
        }

        // Month filter
        if (!empty($filters['month'])) {

            $query .= "
                AND DATE_FORMAT(
                    t.transaction_date,
                    '%Y-%m'
                ) = ?
            ";

            $params[] =
                $filters['month'];
        }

        // Order
        $query .= "
            ORDER BY
                t.transaction_date DESC,
                t.id DESC
        ";

        $stmt = $this->db->prepare(
            $query
        );

        $stmt->execute(
            $params
        );

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );
    }

    // Get a single transaction
    public function find(
        int $userId,
        int $transactionId
    ): ?array {

        $stmt = $this->db->prepare(
            "
            SELECT
                id,
                category_id,
                type,
                description,
                amount,
                transaction_date
            FROM transactions
            WHERE
                id = ?
                AND user_id = ?
            LIMIT 1
            "
        );

        $stmt->execute([
            $transactionId,
            $userId
        ]);

        $transaction = $stmt->fetch(
            PDO::FETCH_ASSOC
        );

        return $transaction ?: null;
    }

    // Update transaction
    public function update(
        int $userId,
        int $transactionId,
        array $data
    ): void {

        $this->db->beginTransaction();

        try {

            // Validate transaction ownership
            $transaction = $this->find(
                $userId,
                $transactionId
            );

            if (!$transaction) {

                throw new RuntimeException(
                    'Transaction not found.'
                );

            }

            // Validate category ownership
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

                throw new RuntimeException(
                    'Invalid category.'
                );

            }

            // Update transaction
            $stmt = $this->db->prepare(
                "
                UPDATE transactions
                SET
                    category_id = ?,
                    type = ?,
                    description = ?,
                    amount = ?,
                    transaction_date = ?
                WHERE
                    id = ?
                    AND user_id = ?
                "
            );

            $stmt->execute([
                $data['category_id'],
                $category['type'],
                trim($data['description']),
                (float)$data['amount'],
                $data['transaction_date'],
                $transactionId,
                $userId
            ]);

            $this->db->commit();

        } catch (Throwable $exception) {

            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            throw $exception;

        }
    }

    // Delete transaction
    public function delete(
        int $userId,
        int $transactionId
    ): void {

        $stmt = $this->db->prepare(
            "
            DELETE FROM transactions
            WHERE
                id = ?
                AND user_id = ?
            "
        );

        $stmt->execute([
            $transactionId,
            $userId
        ]);

        if ($stmt->rowCount() === 0) {

            throw new RuntimeException(
                'Transaction not found.'
            );

        }
    }

    // Get categories by transaction type
    // Get user categories
    public function categories(
        int $userId,
        ?string $type = null
    ): array {

        $query = "
            SELECT
                id,
                name,
                color,
                type
            FROM categories
            WHERE user_id = ?
        ";

        $params = [
            $userId
        ];

        // Filter by type only when provided.
        if (
            $type !== null &&
            $type !== ''
        ) {

            $query .= "
                AND type = ?
            ";

            $params[] = $type;

        }

        $query .= "
            ORDER BY name ASC
        ";

        $stmt = $this->db->prepare(
            $query
        );

        $stmt->execute(
            $params
        );

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );

    }
}