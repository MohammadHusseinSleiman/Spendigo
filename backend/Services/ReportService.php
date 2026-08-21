<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

final class ReportService {
    public function __construct( private readonly PDO $db ) {}

    // Get report summary and user's currency
    public function summary(int $userId): array {
        $stmt = $this->db->prepare("
            SELECT
                u.currency,
                COALESCE(
                    SUM(
                        CASE
                            WHEN t.type = 'income'
                            THEN t.amount
                            ELSE 0
                        END
                    ),
                    0
                ) AS income,
                COALESCE(
                    SUM(
                        CASE
                            WHEN t.type = 'expense'
                            THEN t.amount
                            ELSE 0
                        END
                    ),
                    0
                ) AS expenses,
                COUNT(t.id) AS transactions
            FROM users u
            LEFT JOIN transactions t
                ON t.user_id = u.id
            WHERE u.id = ?
            GROUP BY u.id, u.currency
            LIMIT 1
        ");

        $stmt->execute([
            $userId
        ]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return [
                'currency' => 'USD',
                'balance' => 0,
                'income' => 0,
                'expenses' => 0,
                'transactions' => 0,
            ];
        }

        $income = (float) $row['income'];
        $expenses = (float) $row['expenses'];

        return [
            'currency' => $row['currency'],
            'balance' => $income - $expenses,
            'income' => $income,
            'expenses' => $expenses,
            'transactions' => (int) $row['transactions'],
        ];
    }

    // Get all transactions for export
    public function transactions(int $userId): array {
        $stmt = $this->db->prepare("
            SELECT
                t.transaction_date,
                t.description,
                c.name AS category,
                t.type,
                t.amount
            FROM transactions t
            INNER JOIN categories c
                ON c.id = t.category_id
                AND c.user_id = t.user_id
            WHERE t.user_id = ?
            ORDER BY
                t.transaction_date DESC,
                t.id DESC
        ");

        $stmt->execute([
            $userId
        ]);

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );
    }

    // Get user's currency
    public function currency(int $userId): string {
        $stmt = $this->db->prepare("
            SELECT currency
            FROM users
            WHERE id = ?
            LIMIT 1
        ");

        $stmt->execute([
            $userId
        ]);

        return (string) (
            $stmt->fetchColumn() ?: 'USD'
        );
    }
}